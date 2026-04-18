/**
 * Origin validation for Cloudflare Functions.
 * Blocks cross-origin POST requests (CSRF protection).
 */

const ALLOWED_ORIGINS = [
  'https://theuaecareer.com',
  'https://www.theuaecareer.com',
];

if (typeof process !== 'undefined' && process.env?.NEXT_PUBLIC_SITE_URL) {
  ALLOWED_ORIGINS.push(process.env.NEXT_PUBLIC_SITE_URL);
}

export function isOriginAllowed(request: Request): boolean {
  const origin = request.headers.get('origin')?.trim();
  const referer = request.headers.get('referer')?.trim();

  // Allow requests with no origin (same-origin navigations, curl, etc.)
  if (!origin && !referer) {
    return true;
  }

  if (origin) {
    // Allow localhost for development
    if (origin.startsWith('http://localhost:') || origin.startsWith('http://127.0.0.1:')) {
      return true;
    }
    return ALLOWED_ORIGINS.some((allowed) => origin === allowed);
  }

  if (referer) {
    // Allow localhost for development
    if (referer.startsWith('http://localhost:') || referer.startsWith('http://127.0.0.1:')) {
      return true;
    }
    return ALLOWED_ORIGINS.some((allowed) => referer.startsWith(allowed));
  }

  return false;
}

export function forbiddenResponse() {
  return new Response(
    JSON.stringify({ message: 'Forbidden: invalid origin.' }),
    {
      status: 403,
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
    }
  );
}
