/**
 * Cloudflare Pages Function: POST /api/send-cv
 *
 * Accepts { email: string, pdfBase64: string, fileName: string }
 * and sends the PDF as an email attachment via Amazon SES using
 * raw SigV4-signed HTTP requests (no AWS SDK required).
 */

import { isOriginAllowed, forbiddenResponse } from '../lib/origin-guard';

interface Env {
  AWS_SES_ACCESS_KEY_ID?: string;
  AWS_SES_SECRET_ACCESS_KEY?: string;
  AWS_SES_REGION?: string;
  AWS_SES_FROM_EMAIL?: string;
}

interface RequestBody {
  email?: unknown;
  pdfBase64?: unknown;
  fileName?: unknown;
}

const jsonHeaders = { 'Content-Type': 'application/json; charset=utf-8' };

function jsonResponse(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: { ...jsonHeaders, ...init.headers },
  });
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Encode a string as hex */
async function sha256Hex(data: string | ArrayBuffer): Promise<string> {
  const buf = typeof data === 'string' ? new TextEncoder().encode(data) : data;
  const hash = await crypto.subtle.digest('SHA-256', buf);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

async function hmacSha256(key: ArrayBuffer, data: string): Promise<ArrayBuffer> {
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    key,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );
  return crypto.subtle.sign('HMAC', cryptoKey, new TextEncoder().encode(data));
}

async function getSigningKey(
  secretKey: string,
  dateStamp: string,
  region: string,
  service: string
): Promise<ArrayBuffer> {
  const kDate = await hmacSha256(new TextEncoder().encode(`AWS4${secretKey}`).buffer as ArrayBuffer, dateStamp);
  const kRegion = await hmacSha256(kDate, region);
  const kService = await hmacSha256(kRegion, service);
  return hmacSha256(kService, 'aws4_request');
}

function toHex(buf: ArrayBuffer): string {
  return Array.from(new Uint8Array(buf))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

/**
 * Build a MIME multipart email with a PDF attachment and
 * send it via the SES SendRawEmail REST API with SigV4 auth.
 */
async function sendCvEmail(
  env: Env,
  toEmail: string,
  pdfBase64: string,
  fileName: string
): Promise<void> {
  const accessKeyId = env.AWS_SES_ACCESS_KEY_ID?.trim();
  const secretAccessKey = env.AWS_SES_SECRET_ACCESS_KEY?.trim();
  const region = env.AWS_SES_REGION?.trim() || 'us-east-1';
  const fromEmail = env.AWS_SES_FROM_EMAIL?.trim();

  if (!accessKeyId || !secretAccessKey || !fromEmail) {
    throw new Error('Email service is not configured.');
  }

  const boundary = `boundary_${Date.now().toString(36)}`;
  const subject = 'Your CV from TheUAECareer';

  const mimeMessage = [
    `MIME-Version: 1.0`,
    `From: TheUAECareer <${fromEmail}>`,
    `To: ${toEmail}`,
    `Subject: ${subject}`,
    `Content-Type: multipart/mixed; boundary="${boundary}"`,
    ``,
    `--${boundary}`,
    `Content-Type: text/html; charset=UTF-8`,
    ``,
    `<html><body style="font-family:Arial,sans-serif;color:#1e293b;line-height:1.6">`,
    `<p>Hi there,</p>`,
    `<p>Your CV is attached as a PDF. Best of luck with your job search in the Gulf!</p>`,
    `<p style="margin-top:24px">`,
    `<a href="https://theuaecareer.com/jobs" style="background:#6366f1;color:#fff;padding:10px 20px;border-radius:8px;text-decoration:none;font-weight:600">Browse Jobs →</a>`,
    `</p>`,
    `<hr style="border:none;border-top:1px solid #e2e8f0;margin:32px 0">`,
    `<p style="font-size:12px;color:#94a3b8">TheUAECareer · theuaecareer.com</p>`,
    `</body></html>`,
    ``,
    `--${boundary}`,
    `Content-Type: application/pdf`,
    `Content-Transfer-Encoding: base64`,
    `Content-Disposition: attachment; filename="${fileName}"`,
    ``,
    pdfBase64,
    ``,
    `--${boundary}--`,
  ].join('\r\n');

  const rawMessageBase64 = btoa(
    encodeURIComponent(mimeMessage).replace(/%([0-9A-F]{2})/g, (_, p1) =>
      String.fromCharCode(parseInt(p1, 16))
    )
  );

  // SES SendRawEmail REST endpoint
  const service = 'ses';
  const host = `email.${region}.amazonaws.com`;
  const endpoint = `https://${host}/v2/email/outbound-emails`;

  const body = JSON.stringify({
    Content: {
      Raw: { Data: rawMessageBase64 },
    },
  });

  const now = new Date();
  const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '').slice(0, 15) + 'Z';
  const dateStamp = amzDate.slice(0, 8);

  const payloadHash = await sha256Hex(body);

  const canonicalHeaders =
    `content-type:application/json\n` +
    `host:${host}\n` +
    `x-amz-content-sha256:${payloadHash}\n` +
    `x-amz-date:${amzDate}\n`;

  const signedHeaders = 'content-type;host;x-amz-content-sha256;x-amz-date';

  const canonicalRequest = [
    'POST',
    '/v2/email/outbound-emails',
    '',
    canonicalHeaders,
    signedHeaders,
    payloadHash,
  ].join('\n');

  const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
  const stringToSign = [
    'AWS4-HMAC-SHA256',
    amzDate,
    credentialScope,
    await sha256Hex(canonicalRequest),
  ].join('\n');

  const signingKey = await getSigningKey(secretAccessKey, dateStamp, region, service);
  const signature = toHex(await hmacSha256(signingKey, stringToSign));

  const authHeader =
    `AWS4-HMAC-SHA256 Credential=${accessKeyId}/${credentialScope}, ` +
    `SignedHeaders=${signedHeaders}, Signature=${signature}`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Host: host,
      'X-Amz-Content-Sha256': payloadHash,
      'X-Amz-Date': amzDate,
      Authorization: authHeader,
    },
    body,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`SES error ${response.status}: ${text.slice(0, 200)}`);
  }
}

export async function onRequestPost(context: { request: Request; env: Env }) {
  if (!isOriginAllowed(context.request)) {
    return forbiddenResponse();
  }

  let body: RequestBody;
  try {
    body = (await context.request.json()) as RequestBody;
  } catch {
    return jsonResponse({ message: 'Invalid request body.' }, { status: 400 });
  }

  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const pdfBase64 = typeof body.pdfBase64 === 'string' ? body.pdfBase64.trim() : '';
  const fileName =
    typeof body.fileName === 'string' ? body.fileName.replace(/[^a-zA-Z0-9_.-]/g, '_') : 'CV.pdf';

  if (!email || !isValidEmail(email)) {
    return jsonResponse({ message: 'Enter a valid email address.' }, { status: 400 });
  }

  if (!pdfBase64 || pdfBase64.length < 100) {
    return jsonResponse({ message: 'Invalid PDF data.' }, { status: 400 });
  }

  // Rough size guard — base64 of 5 MB PDF ≈ 6.8 MB string
  if (pdfBase64.length > 7_000_000) {
    return jsonResponse({ message: 'CV PDF is too large to email (max ~5 MB).' }, { status: 413 });
  }

  try {
    await sendCvEmail(context.env, email, pdfBase64, fileName);
    return jsonResponse({ message: 'CV sent! Check your inbox (and spam folder).' }, { status: 200 });
  } catch (error) {
    console.error('[send-cv]', error);
    return jsonResponse(
      { message: error instanceof Error ? error.message : 'Failed to send email.' },
      { status: 500 }
    );
  }
}
