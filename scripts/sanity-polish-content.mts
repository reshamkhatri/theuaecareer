import { existsSync } from 'node:fs';
import path from 'node:path';
import { createClient } from 'next-sanity';

type Replacement = [RegExp, string];
type SanityDocument = {
  _id: string;
  _type: 'article' | 'job';
  [key: string]: unknown;
};

const articleReplacements: Replacement[] = [
  [
    /How to Prepare for a Walk-In Interview in UAE\s*\(coming soon\)/gi,
    'How to Prepare for a Walk-In Interview in the UAE',
  ],
  [
    /Business Bay,\s*Dubai\s*\(WhatsApp the number on the posting for directions\)/gi,
    'Business Bay, Dubai (check in at the business centre reception for the screening room)',
  ],
];

const jobReplacements: Replacement[] = [
  [
    /WhatsApp the number on the contact page with ["“]?Driver Application["”]? to get the depot address\.?/gi,
    'Ask for the transport hiring team at the Jebel Ali depot reception.',
  ],
  [
    /Company depot,\s*Jebel Ali\s*\(WhatsApp for exact location\)/gi,
    'Company depot, Jebel Ali Gate 5 area',
  ],
  [
    /WhatsApp ["“]?CS Application["”]? to the contact number on our contact page to receive the office address\.\s*Bring your CV and passport copy\.?/gi,
    'Bring your CV and passport copy and ask for the hiring desk at the Business Bay office reception.',
  ],
  [/Business Bay Office\s*\(WhatsApp for address\)/gi, 'Business Bay Office reception'],
  [
    /WhatsApp ["“]?Cook Application["”]? to our contact number for the exact address\.?/gi,
    'ask for the hiring manager at the Karama branch reception.',
  ],
  [
    /Restaurant premises,\s*Karama\s*\(WhatsApp for address\)/gi,
    'Restaurant premises, Karama market area',
  ],
  [
    /theuaecareer\.com\s*[\-\u2013\u2014]\s*Launch Content Pack\s*[\-\u2013\u2014]\s*Ready to Publish/gi,
    '',
  ],
];

loadEnvFiles();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-03-27';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  throw new Error('Missing Sanity environment variables. Set project id, dataset, api version, and write token.');
}

const sanityClient = createClient({
  projectId,
  dataset,
  apiVersion,
  token,
  useCdn: false,
});

function loadEnvFiles() {
  const processWithLoader = process as typeof process & {
    loadEnvFile?: (path?: string) => void;
  };

  for (const candidate of ['.env.local', '.env']) {
    const resolved = path.resolve(process.cwd(), candidate);
    if (existsSync(resolved) && processWithLoader.loadEnvFile) {
      processWithLoader.loadEnvFile(resolved);
    }
  }
}

function applyReplacements(value: string, replacements: Replacement[]): string {
  return replacements.reduce((output, [pattern, replacement]) => output.replace(pattern, replacement), value);
}

function normalizeRichTextHtml(value: string): string {
  return value
    .replace(
      /<h([1-6])>\s*•\s*([\s\S]*?)<\/h\1>/gi,
      (_match, _level, text) => `<p>${String(text).trim()}</p>`
    )
    .replace(/<p>\s*•\s*([\s\S]*?)<\/p>/gi, (_match, text) => `<p>${String(text).trim()}</p>`)
    .replace(
      /Bring your CV and passport copy and ask for the hiring desk at the Business Bay office reception\.\s*Bring your CV and passport copy\./gi,
      'Bring your CV and passport copy and ask for the hiring desk at the Business Bay office reception.'
    );
}

function deepReplaceStrings(value: unknown, replacements: Replacement[]): unknown {
  if (typeof value === 'string') {
    return normalizeRichTextHtml(applyReplacements(value, replacements));
  }

  if (Array.isArray(value)) {
    return value.map((item) => deepReplaceStrings(item, replacements));
  }

  if (!value || typeof value !== 'object') {
    return value;
  }

  return Object.fromEntries(
    Object.entries(value).map(([key, entry]) => [key, deepReplaceStrings(entry, replacements)])
  );
}

function stripSystemFields(document: SanityDocument): SanityDocument {
  const sanitized = {
    ...(document as SanityDocument & {
      _createdAt?: string;
      _rev?: string;
      _updatedAt?: string;
    }),
  };

  delete sanitized._createdAt;
  delete sanitized._rev;
  delete sanitized._updatedAt;

  return sanitized;
}

function sanitizeDocument(document: SanityDocument): SanityDocument {
  const replacements = document._type === 'article' ? articleReplacements : jobReplacements;
  const cleaned = deepReplaceStrings(stripSystemFields(document), replacements) as SanityDocument;

  if (
    cleaned._type === 'job' &&
    typeof cleaned.companyName === 'string' &&
    /^\[Retail Brand\s*[\-\u2013\u2014]\s*update with actual company name\]$/i.test(cleaned.companyName)
  ) {
    cleaned.companyName = 'Confidential Retail Brand';
  }

  return cleaned;
}

async function main() {
  const documents = await sanityClient.fetch<SanityDocument[]>(
    `*[_type in ["article", "job"]]{..., "slug": slug}`
  );

  let changed = 0;

  for (const document of documents) {
    const sanitized = sanitizeDocument(document);
    if (JSON.stringify(sanitized) === JSON.stringify(stripSystemFields(document))) {
      continue;
    }

    await sanityClient.createOrReplace(sanitized);
    changed += 1;
    console.log(`Updated ${document._type}: ${document._id}`);
  }

  console.log(`Sanity polish complete. ${changed} document(s) updated.`);
}

main().catch((error) => {
  console.error('Sanity polish failed.');
  console.error(error);
  process.exit(1);
});
