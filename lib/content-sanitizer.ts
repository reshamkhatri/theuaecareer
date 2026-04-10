import type { ArticleRecord, JobRecord, WalkInDetails } from '@/lib/types';

type Replacement = [RegExp, string];

const articleTextReplacements: Replacement[] = [
  [
    /How to Prepare for a Walk-In Interview in UAE\s*\(coming soon\)/gi,
    'How to Prepare for a Walk-In Interview in the UAE',
  ],
  [
    /Business Bay,\s*Dubai\s*\(WhatsApp the number on the posting for directions\)/gi,
    'Business Bay, Dubai (check in at the business centre reception for the screening room)',
  ],
];

const jobTextReplacements: Replacement[] = [
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
];

const jobHtmlReplacements: Replacement[] = [
  [
    /<h3>\s*theuaecareer\.com\s*[\-\u2013\u2014]\s*Launch Content Pack\s*[\-\u2013\u2014]\s*Ready to Publish\s*<\/h3>/gi,
    '',
  ],
  ...jobTextReplacements,
  [/<h([1-6])>\s*<\/h\1>/gi, ''],
];

function applyReplacements(value: string, replacements: Replacement[]): string {
  return replacements.reduce((output, [pattern, replacement]) => output.replace(pattern, replacement), value).trim();
}

function normalizeInternalHrefs(value: string): string {
  return value.replace(
    /href=(["'])(\/[^"'?#]*)(\?[^"']*)?(#[^"']*)?\1/gi,
    (_match, quote, path, query = '', hash = '') => {
      const normalizedPath =
        path === '/' || path.endsWith('/') || /\.[a-z0-9]+$/i.test(path) ? path : `${path}/`;

      return `href=${quote}${normalizedPath}${query}${hash}${quote}`;
    }
  );
}

function normalizeRichTextHtml(value: string): string {
  return normalizeInternalHrefs(
    value
      .replace(
        /<figure[^>]*>\s*<img[^>]+src=["']https?:\/\/[^"']+["'][^>]*>\s*(?:<figcaption[\s\S]*?<\/figcaption>\s*)?<\/figure>/gi,
        ''
      )
      .replace(/<img[^>]+src=["']https?:\/\/[^"']+["'][^>]*>/gi, '')
      .replace(/<h1>([\s\S]*?)<\/h1>/gi, '<h2>$1</h2>')
      .replace(
        /<h([1-6])>\s*(?:•|â€¢|Ã¢â‚¬Â¢)\s*([\s\S]*?)<\/h\1>/gi,
        (_match, _level, text) => `<p>${String(text).trim()}</p>`
      )
      .replace(
        /<p>\s*(?:•|â€¢|Ã¢â‚¬Â¢)\s*([\s\S]*?)<\/p>/gi,
        (_match, text) => `<p>${String(text).trim()}</p>`
      )
      .replace(
        /Bring your CV and passport copy and ask for the hiring desk at the Business Bay office reception\.\s*Bring your CV and passport copy\./gi,
        'Bring your CV and passport copy and ask for the hiring desk at the Business Bay office reception.'
      )
  );
}

function sanitizeWalkInDetails(details?: WalkInDetails): WalkInDetails | undefined {
  if (!details) {
    return undefined;
  }

  const nextDetails: WalkInDetails = { ...details };

  if (details.summary) {
    nextDetails.summary = applyReplacements(details.summary, jobTextReplacements);
  }

  if (details.venue) {
    nextDetails.venue = applyReplacements(details.venue, jobTextReplacements);
  }

  if (details.time) {
    nextDetails.time = applyReplacements(details.time, jobTextReplacements);
  }

  return nextDetails;
}

export function sanitizeArticleRecord(article: ArticleRecord): ArticleRecord {
  return {
    ...article,
    title: applyReplacements(article.title, articleTextReplacements),
    excerpt: applyReplacements(article.excerpt, articleTextReplacements),
    content: normalizeRichTextHtml(applyReplacements(article.content, articleTextReplacements)),
    featuredImage:
      article.featuredImage && article.featuredImage.trim().startsWith('/')
        ? article.featuredImage.trim()
        : undefined,
    metaTitle: article.metaTitle
      ? applyReplacements(article.metaTitle, articleTextReplacements)
      : article.metaTitle,
    metaDescription: article.metaDescription
      ? applyReplacements(article.metaDescription, articleTextReplacements)
      : article.metaDescription,
  };
}

export function sanitizeJobRecord(job: JobRecord): JobRecord {
  const companyName =
    /^\[Retail Brand\s*[\-\u2013\u2014]\s*update with actual company name\]$/i.test(job.companyName)
      ? 'Confidential Retail Brand'
      : job.companyName;

  return {
    ...job,
    companyName,
    description: normalizeRichTextHtml(applyReplacements(job.description, jobHtmlReplacements)),
    howToApply: normalizeRichTextHtml(applyReplacements(job.howToApply, jobHtmlReplacements)),
    walkInDetails: sanitizeWalkInDetails(job.walkInDetails),
    metaTitle: job.metaTitle ? applyReplacements(job.metaTitle, jobTextReplacements) : job.metaTitle,
    metaDescription: job.metaDescription
      ? applyReplacements(job.metaDescription, jobTextReplacements)
      : job.metaDescription,
  };
}
