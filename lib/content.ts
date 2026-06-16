import { Types, type SortOrder } from 'mongoose';
import dbConnect, { isDatabaseConfigured } from '@/lib/mongodb';
import Article from '@/lib/models/Article';
import Job from '@/lib/models/Job';
import { formatDisplayDate } from '@/lib/format';
import { sanitizeArticleRecord, sanitizeJobRecord } from '@/lib/content-sanitizer';
import { articles as launchArticles } from '@/lib/launch-content';
import { seoSeedArticles } from '@/lib/seo-seed-content';
import { freshArticles, freshJobs } from '@/lib/fresh-content';
import {
  mergeContentBySlug,
  scoreArticleForJobTargeting,
  scoreJobForArticleTargeting,
  scoreRelatedArticlePair,
} from '@/lib/seo-targeting';
import {
  getSanityArticleByIdentifier,
  getSanityArticles,
  getSanityJobByIdentifier,
  getSanityJobs,
} from '@/sanity/lib/content';
import type {
  ArticleQueryOptions,
  ArticleRecord,
  JobQueryOptions,
  JobRecord,
  PaginatedResult,
  SalaryRange,
  WalkInDetails,
} from '@/lib/types';

const textReplacements: Array<[string, string]> = [
  ['â€”', '-'],
  ['â€“', '-'],
  ['â€¢', '-'],
  ['â€™', "'"],
  ['â€œ', '"'],
  ['â€\u009d', '"'],
  ['â€"', '"'],
  ['Â©', '(c)'],
  ['âœ…', 'Success'],
  ['â€ƒ', ''],
];

// Stock images keyed by category keyword — used when articles have no inline images
const stockImagesByCategory: Record<string, string[]> = {
  'walk-in': [
    '/article-images/what-to-carry-walk-in-hero.jpg',
    '/article-images/self-introduction-uae-hero.jpg',
    '/article-images/walk-in-vs-online-hero.jpg',
  ],
  career: [
    '/article-images/dubai-hotel-jobs-hero.jpg',
    '/article-images/gulf-cv-format-hero.svg',
    '/article-images/saudi-warehouse-jobs-hero.jpg',
  ],
  salary: [
    '/article-images/cleaner-salary-hero.jpg',
    '/article-images/driver-qatar-hero.jpg',
    '/article-images/saudi-offer-documents-hero.jpg',
  ],
  interview: [
    '/article-images/self-introduction-uae-hero.jpg',
    '/article-images/cashier-interview-saudi-hero.jpg',
    '/article-images/housekeeping-qatar-hero.jpg',
  ],
  retail: [
    '/article-images/cashier-interview-saudi-hero.jpg',
    '/article-images/what-to-carry-walk-in-hero.jpg',
    '/article-images/walk-in-vs-online-hero.jpg',
  ],
  construction: [
    '/article-images/saudi-warehouse-jobs-hero.jpg',
    '/article-images/driver-qatar-hero.jpg',
    '/article-images/what-to-carry-walk-in-hero.jpg',
  ],
  visa: [
    '/article-images/saudi-offer-documents-hero.jpg',
    '/article-images/what-to-carry-walk-in-hero.jpg',
    '/article-images/self-introduction-uae-hero.jpg',
  ],
  default: [
    '/article-images/dubai-hotel-jobs-hero.jpg',
    '/article-images/gulf-cv-format-hero.svg',
    '/article-images/walk-in-vs-online-hero.jpg',
  ],
};

// Per-slug featured images — every article gets a unique image
const slugFeaturedImages: Record<string, string> = {
  // Launch content exact matches
  'walk-in-interviews-dubai-this-week':       '/article-images/walk-in-interviews-dubai-hero.jpg',
  'hospitality-jobs-in-dubai-what-employers-want-2026': '/article-images/dubai-hotel-jobs-hero.jpg',
  'how-to-apply-for-dubai-hotel-jobs-through-official-career-pages-2026': '/article-images/dubai-hotel-jobs-inline.jpg',
  'verified-dubai-jobs-open-now-direct-employer-march-2026': '/article-images/verified-dubai-jobs-hero.jpg',
  'how-to-find-a-job-in-dubai-as-a-fresher':  '/article-images/dubai-fresher-jobs-hero.jpg',
  'top-10-in-demand-jobs-uae-2026':           '/article-images/top-10-jobs-uae-2026-hero.jpg',
  'cost-of-living-dubai-2026':                '/article-images/cost-of-living-dubai-hero.jpg',
  'how-to-write-cv-for-gulf-jobs':            '/article-images/cv-for-gulf-jobs-hero.webp',
  'uae-golden-visa-2026-guide':               '/article-images/uae-golden-visa-hero.jpg',
  'best-free-zones-dubai-2026':               '/article-images/dubai-free-zone-hero.jpg',
  'salary-guide-uae-2026':                    '/article-images/salary-guide-uae-hero.jpg',
  'uae-interview-questions-and-answers':      '/article-images/uae-interview-qa-hero.jpg',
  'abu-dhabi-vs-dubai-working-expats':        '/article-images/abu-dhabi-vs-dubai-hero.jpg',
  'best-remittance-options-uae-2026':         '/article-images/remittance-uae-hero.jpg',
  'how-to-get-uae-driving-licence-2026':      '/article-images/uae-driving-licence-hero.jpg',
  'how-to-renew-uae-work-visa-2026':          '/article-images/uae-visa-renewal-hero.jpg',
  'uae-labour-law-guide-for-expats':          '/article-images/uae-labour-law-hero.jpg',
  'driver-salary-in-uae-2026':                '/article-images/driver-salary-uae-hero.jpg',

  // SEO seed exact matches
  'what-to-carry-for-walk-in-interview-in-uae': '/article-images/what-to-carry-walk-in-hero.jpg',
  'self-introduction-for-walk-in-interview-in-uae': '/article-images/self-introduction-uae-hero.jpg',
  'cleaner-salary-in-uae':                    '/article-images/cleaner-salary-hero.jpg',
  'documents-required-after-getting-a-saudi-job-offer': '/article-images/saudi-offer-documents-hero.jpg',
  'how-to-apply-for-warehouse-jobs-in-saudi-arabia-safely': '/article-images/saudi-warehouse-jobs-hero.jpg',
  'cashier-interview-questions-for-saudi-retail-jobs': '/article-images/cashier-interview-saudi-hero.jpg',
  'housekeeping-interview-questions-for-qatar-hotel-jobs': '/article-images/housekeeping-qatar-hero.jpg',
  'driver-interview-questions-in-qatar':      '/article-images/driver-qatar-hero.jpg',
  'how-to-avoid-fake-job-offers-in-uae-saudi-qatar': '/article-images/fake-job-offers-hero.svg',
  'difference-between-walk-in-interview-and-online-application-in-gulf-jobs': '/article-images/walk-in-vs-online-hero.jpg',
  'best-cv-format-for-uae-saudi-qatar-job-applications': '/article-images/gulf-cv-format-hero.svg',
  'best-cv-maker-for-gulf-jobs-uae-saudi-qatar': '/article-images/cv-maker-app-screenshot.webp',
  'uae-gratuity-calculator-end-of-service-benefits-2026': '/article-images/gratuity-calculator-hero.webp',
  'best-uae-remittance-options-compare-exchange-rates-2026': '/article-images/remittance-guide-hero.webp',
  
  // Sanity/other new articles
  'cv-for-housekeeping-jobs-dubai-sample':    '/article-images/cv-housekeeping-dubai-hero.jpg',
  'documents-for-walk-in-interview-dubai':    '/article-images/documents-walk-in-dubai-hero.jpg',
  'dubai-free-zone-comparison-2026':          '/article-images/dubai-free-zone-comparison-hero.jpg',
  'front-office-interview-questions-dubai-hotels': '/article-images/front-office-interview-hero.jpg',
  'housekeeping-interview-questions-dubai-hotels': '/article-images/housekeeping-interview-hero.jpg',
  'room-attendant-interview-questions-dubai': '/article-images/room-attendant-interview-hero.jpg',
  'walk-in-interview-checklist-uae':          '/article-images/walk-in-interview-checklist-hero.jpg',
  'retail-sales-associate-interview-questions-uae': '/article-images/cashier-interview-saudi-hero.jpg',
  'construction-helper-interview-questions-uae': '/article-images/saudi-warehouse-jobs-inline.jpg',
  'walk-in-interview-self-introduction-sample-uae': '/article-images/self-introduction-uae-hero.jpg',
};

// Fallback pool — unique images used when slug doesn't match above
const fallbackFeaturedImages = [
  '/article-images/dubai-hotel-jobs-hero.jpg',
  '/article-images/gulf-cv-format-hero.svg',
  '/article-images/walk-in-vs-online-hero.jpg',
  '/article-images/cleaner-salary-hero.jpg',
  '/article-images/self-introduction-uae-hero.jpg',
];

function getStockFeaturedImage(slug: string): string {
  const normalizedSlug = slug.replace(/^article\./, '');
  if (slugFeaturedImages[normalizedSlug]) {
    return slugFeaturedImages[normalizedSlug];
  }

  for (const [key, url] of Object.entries(slugFeaturedImages)) {
    if (normalizedSlug.includes(key) || key.includes(normalizedSlug.split('-').slice(0, 4).join('-'))) {
      return url;
    }
  }
  // Deterministic fallback based on slug hash
  let hash = 0;
  for (let i = 0; i < slug.length; i++) hash = (hash * 31 + slug.charCodeAt(i)) >>> 0;
  return fallbackFeaturedImages[hash % fallbackFeaturedImages.length];
}

function getCategoryKey(category: string): string {
  const lower = category.toLowerCase();
  if (lower.includes('walk-in')) return 'walk-in';
  if (lower.includes('interview')) return 'interview';
  if (lower.includes('retail')) return 'retail';
  if (lower.includes('construction')) return 'construction';
  if (lower.includes('career') || lower.includes('hiring') || lower.includes('company')) return 'career';
  if (lower.includes('salary')) return 'salary';
  if (lower.includes('visa') || lower.includes('pro')) return 'visa';
  return 'default';
}

// Where in-body links to removed articles should now point. Applied at load
// time so internal links never 404 after the content cleanup — covers static
// and Sanity content from a single place. Values are full paths (a kept article,
// a tool, or a section) and already include the trailing slash.
const REMOVED_LINK_REDIRECTS: Record<string, string> = {
  'driver-salary-in-uae-2026': '/blog/driver-salary-uae-2026/',
  'nurse-salary-uae-2026': '/blog/nurse-salary-in-uae/',
  'best-cv-format-for-uae-saudi-qatar-job-applications': '/blog/best-cv-format-uae-jobs-2026/',
  'uae-golden-visa-eligibility-guide-2026': '/blog/uae-golden-visa-2026-guide/',
  'how-to-get-uae-driving-licence-2026': '/blog/convert-driving-licence-to-uae-2026/',
  'uae-labour-law-guide-for-expats': '/blog/uae-labour-law-for-expats-2026/',
  'uae-gratuity-calculator-end-of-service-benefits-2026': '/blog/uae-gratuity-calculation-guide-2026/',
  'walk-in-interview-self-introduction-sample-uae': '/blog/self-introduction-for-walk-in-interview-in-uae/',
  'what-to-carry-for-walk-in-interview-uae': '/blog/what-to-carry-for-walk-in-interview-in-uae/',
  'how-to-find-a-job-in-dubai-as-a-fresher': '/blog/how-to-find-a-job-in-dubai-as-a-fresher-2026/',
  'how-to-avoid-fake-job-offers-in-uae-saudi-qatar': '/blog/avoid-fake-gulf-job-offers/',
  'housekeeping-interview-questions-for-qatar-hotel-jobs': '/blog/housekeeping-interview-questions-dubai-hotels/',
  'cv-for-housekeeping-jobs-dubai-sample': '/blog/how-to-write-cv-for-gulf-jobs/',
  'walk-in-interview-checklist-uae': '/blog/what-to-carry-for-walk-in-interview-in-uae/',
  'documents-for-walk-in-interview-dubai': '/blog/what-to-carry-for-walk-in-interview-in-uae/',
  'walk-in-interviews-dubai-this-week': '/jobs/walk-in/',
  'walk-in-interviews-abu-dhabi-this-week': '/jobs/walk-in/',
  'walk-in-interviews-sharjah-this-week': '/jobs/walk-in/',
  'verified-dubai-jobs-open-now-direct-employer-march-2026': '/jobs/',
  'best-remittance-options-uae-2026': '/tools/currency-converter/',
  'best-uae-remittance-options-compare-exchange-rates-2026': '/tools/currency-converter/',
  'best-free-zones-dubai-2026': '/blog/mainland-vs-free-zone-jobs-uae/',
  'dubai-free-zone-comparison-2026': '/blog/mainland-vs-free-zone-jobs-uae/',
  'cleaner-salary-in-uae': '/blog/salary-guide-uae-2026/',
  'security-guard-salary-in-uae': '/blog/security-guard-jobs-dubai-2026/',
  'dubai-salary-guide-2026-by-industry': '/blog/salary-guide-uae-2026/',
  'cashier-interview-questions-for-saudi-retail-jobs': '/blog/uae-interview-questions-and-answers/',
  'driver-interview-questions-in-qatar': '/blog/uae-interview-questions-and-answers/',
  'retail-sales-associate-interview-questions-uae': '/blog/uae-interview-questions-and-answers/',
  'room-attendant-interview-questions-dubai': '/blog/housekeeping-interview-questions-dubai-hotels/',
  'emirates-airline-job-scams-how-to-apply-safely': '/blog/avoid-fake-gulf-job-offers/',
  'difference-between-walk-in-interview-and-online-application-in-gulf-jobs':
    '/blog/best-job-search-websites-in-uae-2026/',
};

function rewriteRemovedLinks(html: string): string {
  let out = html;
  for (const [from, to] of Object.entries(REMOVED_LINK_REDIRECTS)) {
    // Match the exact slug with its trailing slash so e.g. ".../as-a-fresher/"
    // is rewritten without touching ".../as-a-fresher-2026/".
    out = out.split(`/blog/${from}/`).join(to);
  }
  return out;
}

function enrichArticleWithImages(article: ArticleRecord): ArticleRecord {
  article = { ...article, content: rewriteRemovedLinks(article.content) };
  const hasInlineImages = article.content.includes('<img');
  const key = getCategoryKey(article.category);

  // Add featured image if missing — use slug-based unique image
  if (!article.featuredImage) {
    article = { ...article, featuredImage: getStockFeaturedImage(article.slug) };
  }

  // Inject inline images if none exist in content
  if (!hasInlineImages && article.content.length > 200) {
    let images = stockImagesByCategory[key] || stockImagesByCategory.default;
    
    // Inject the article's own unique inline image first if possible
    if (article.featuredImage && article.featuredImage.includes('-hero.')) {
      const inlineUnique = article.featuredImage.replace('-hero.jpg', '-inline.jpg').replace('-hero.png', '-inline.png');
      images = [inlineUnique, ...images];
    } else if (article.featuredImage && article.featuredImage.includes('-inline.')) {
      // If the featured image is ALREADY the inline image (e.g. from fallback), just use it
      images = [article.featuredImage, ...images];
    }

    const paragraphs = article.content.split('</p>');

    if (paragraphs.length > 4) {
      const insertPoints = [
        Math.floor(paragraphs.length * 0.2),
        Math.floor(paragraphs.length * 0.5),
        Math.floor(paragraphs.length * 0.78),
      ];

      const altTexts = [
        `Professional workplace scene related to ${article.category.toLowerCase()} in the UAE`,
        `Career and employment in the Gulf region`,
        `Working professionals in Dubai and the UAE`,
      ];

      let offset = 0;
      for (let i = 0; i < Math.min(images.length, insertPoints.length); i++) {
        const idx = insertPoints[i] + offset;
        if (idx < paragraphs.length) {
          const imgHtml = `</p><figure><img src="${images[i]}" alt="${altTexts[i]}" loading="lazy" /></figure>`;
          paragraphs[idx] = paragraphs[idx] + imgHtml;
          offset++;
        }
      }

      article = { ...article, content: paragraphs.join('</p>') };
    }
  }

  return article;
}

const launchArticleRecords: ArticleRecord[] = launchArticles.map((article) =>
  sanitizeArticleRecord(normalizeArticleRecord(article))
);
const seedArticleRecords: ArticleRecord[] = seoSeedArticles.map((article) =>
  sanitizeArticleRecord(normalizeArticleRecord(article))
);
const freshArticleRecords: ArticleRecord[] = freshArticles.map((article) =>
  sanitizeArticleRecord(normalizeArticleRecord(article))
);
// Fallback job source. The original launch jobs had literal "[update with
// company name]" placeholders and expiry dates that have all passed; freshJobs
// replaces them with current, honestly-labelled representative listings so the
// /jobs section is populated and JobPosting validThrough stays in the future
// even when Sanity has no active postings.
const fallbackJobRecords: JobRecord[] = freshJobs.map((job, index) =>
  sanitizeJobRecord(normalizeJobRecord(job, `fallback-job-${index + 1}`))
);
// The seed set was bootstrapped with short ~200-word stubs for a few slugs that
// also exist as full-length (1,100+ word) launch articles. Because seed wins the
// merge, those stubs were shadowing the good launch content on the live site.
// Drop the stub versions so the substantial launch articles surface instead.
const PREFER_LAUNCH_SLUGS = new Set<string>([
  'cost-of-living-dubai-2026',
  'abu-dhabi-vs-dubai-working-expats',
]);
const dedupedSeedArticleRecords = seedArticleRecords.filter(
  (article) => !PREFER_LAUNCH_SLUGS.has(article.slug)
);
const staticArticleRecords = mergeContentBySlug(
  [...launchArticleRecords, ...dedupedSeedArticleRecords, ...freshArticleRecords],
  (article) => article.slug
);

// Slugs removed during the 2026-06 content cleanup (AdSense "low value content"
// remediation). These articles were unpublished because they were duplicates of
// a stronger page, thin (<~400 words), stale time-sensitive listings, off-topic
// for a job-seeker audience, or low-value entries in an over-templated cluster.
// Filtering by slug here is the single source of truth: it drops them from the
// blog index, /blog/[slug] static params, the sitemap, and related-article
// widgets. Removing a slug from this set republishes the article (fully
// reversible). See SEO-AUDIT / cleanup notes for the per-slug rationale.
const REMOVED_ARTICLE_SLUGS = new Set<string>([
  // --- Duplicate topics (kept the stronger/longer version) ---
  'driver-salary-in-uae-2026', // dup of driver-salary-uae-2026
  'nurse-salary-uae-2026', // dup of nurse-salary-in-uae
  'best-cv-format-for-uae-saudi-qatar-job-applications', // dup of best-cv-format-uae-jobs-2026
  'uae-golden-visa-eligibility-guide-2026', // dup of uae-golden-visa-2026-guide
  'how-to-get-uae-driving-licence-2026', // dup of convert-driving-licence-to-uae-2026
  'uae-labour-law-guide-for-expats', // dup of uae-labour-law-for-expats-2026
  'uae-gratuity-calculator-end-of-service-benefits-2026', // dup of uae-gratuity-calculation-guide-2026
  'walk-in-interview-self-introduction-sample-uae', // dup of self-introduction-for-walk-in-interview-in-uae
  'what-to-carry-for-walk-in-interview-uae', // dup of what-to-carry-for-walk-in-interview-in-uae
  'how-to-find-a-job-in-dubai-as-a-fresher', // dup of how-to-find-a-job-in-dubai-as-a-fresher-2026
  'how-to-avoid-fake-job-offers-in-uae-saudi-qatar', // dup of avoid-fake-gulf-job-offers
  'housekeeping-interview-questions-for-qatar-hotel-jobs', // dup of housekeeping-interview-questions-dubai-hotels
  // --- Thin content (<~400 words) ---
  'cv-for-housekeeping-jobs-dubai-sample', // ~84 words
  'walk-in-interview-checklist-uae', // ~321 words, overlaps walk-in prep guides
  'documents-for-walk-in-interview-dubai', // ~375 words, overlaps what-to-carry guide
  // --- Stale time-sensitive listings (dated Mar/Apr 2026) ---
  'walk-in-interviews-dubai-this-week',
  'walk-in-interviews-abu-dhabi-this-week',
  'walk-in-interviews-sharjah-this-week',
  'verified-dubai-jobs-open-now-direct-employer-march-2026',
  // --- Off-topic for a job-seeker audience ---
  'best-remittance-options-uae-2026',
  'best-uae-remittance-options-compare-exchange-rates-2026',
  'best-free-zones-dubai-2026',
  'dubai-free-zone-comparison-2026',
  // --- Over-templated low-value cluster entries ---
  'cleaner-salary-in-uae',
  'security-guard-salary-in-uae',
  'dubai-salary-guide-2026-by-industry', // overlaps salary-guide-uae-2026 hub
  'cashier-interview-questions-for-saudi-retail-jobs',
  'driver-interview-questions-in-qatar',
  'retail-sales-associate-interview-questions-uae',
  'room-attendant-interview-questions-dubai', // overlaps housekeeping interview guide
  'emirates-airline-job-scams-how-to-apply-safely',
  'difference-between-walk-in-interview-and-online-application-in-gulf-jobs',
]);
let hasLoggedDatabaseFallback = false;
const isRuntimeDatabaseFallbackEnabled = process.env.ENABLE_DATABASE_FALLBACK === 'true';

export { formatDisplayDate };

function normalizeText(value: unknown): string {
  if (typeof value !== 'string') {
    return '';
  }

  return textReplacements.reduce(
    (current, [search, replacement]) => current.split(search).join(replacement),
    value
  ).trim();
}

export function stripHtml(value: string): string {
  return normalizeText(value.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

export function ensureHtml(value: string): string {
  const normalized = normalizeText(value);
  if (!normalized) {
    return '';
  }

  if (normalized.includes('<') && normalized.includes('>')) {
    return normalized;
  }

  const paragraphs = normalized
    .split(/\n{2,}/)
    .map((chunk) => chunk.trim())
    .filter(Boolean)
    .map((chunk) => `<p>${escapeHtml(chunk)}</p>`);

  return paragraphs.join('');
}

function toIsoDate(value: unknown): string | undefined {
  if (!value) {
    return undefined;
  }

  const date = value instanceof Date ? value : new Date(String(value));
  if (Number.isNaN(date.getTime())) {
    return undefined;
  }

  return date.toISOString();
}

function mapJobCategory(value: string): { category: string; categoryLabel?: string } {
  const normalized = normalizeText(value);
  const lower = normalized.toLowerCase();

  if (lower.includes('hospitality') || lower.includes('f&b') || lower.includes('hotel')) {
    return { category: 'Hospitality', categoryLabel: normalized };
  }
  if (lower.includes('it') || lower.includes('tech') || lower.includes('information')) {
    return { category: 'IT', categoryLabel: normalized };
  }
  if (lower.includes('construction')) {
    return { category: 'Construction', categoryLabel: normalized };
  }
  if (lower.includes('health')) {
    return { category: 'Healthcare', categoryLabel: normalized };
  }
  if (lower.includes('sale') || lower.includes('customer service')) {
    return { category: 'Sales', categoryLabel: normalized };
  }
  if (lower.includes('logistics') || lower.includes('warehouse') || lower.includes('transport')) {
    return { category: 'Logistics', categoryLabel: normalized };
  }
  if (lower.includes('admin') || lower.includes('reception')) {
    return { category: 'Admin', categoryLabel: normalized };
  }
  if (lower.includes('finance') || lower.includes('account')) {
    return { category: 'Finance', categoryLabel: normalized };
  }
  if (lower.includes('education')) {
    return { category: 'Education', categoryLabel: normalized };
  }
  if (lower.includes('engineer')) {
    return { category: 'Engineering', categoryLabel: normalized };
  }
  if (lower.includes('retail') || lower.includes('fmcg')) {
    return { category: 'Retail', categoryLabel: normalized };
  }

  return { category: normalized || 'Other' };
}

function parseSalaryRange(value: unknown): SalaryRange | undefined {
  if (!value) {
    return undefined;
  }

  if (typeof value === 'object' && value !== null) {
    const record = value as Record<string, unknown>;
    const currency = normalizeText(record.currency) || 'AED';
    const min = typeof record.min === 'number' ? record.min : undefined;
    const max = typeof record.max === 'number' ? record.max : undefined;
    const label =
      min || max
        ? `${currency} ${[min, max].filter((part) => part !== undefined).join(' - ')}`
        : undefined;

    return { min, max, currency, label };
  }

  const label = normalizeText(String(value));
  const currencyMatch = label.match(/\b(AED|SAR|QAR)\b/i);
  const currency = currencyMatch?.[1]?.toUpperCase() || 'AED';
  const matches = label.match(/[\d,]+/g) || [];
  const numbers = matches.map((part) => Number(part.replace(/,/g, ''))).filter(Boolean);

  return {
    min: numbers[0],
    max: numbers[1],
    currency,
    label,
  };
}

function parseWalkInDetails(value: unknown): WalkInDetails | undefined {
  if (!value) {
    return undefined;
  }

  if (typeof value === 'object' && value !== null) {
    const record = value as Record<string, unknown>;
    const date = toIsoDate(record.date);
    const time = normalizeText(record.time);
    const venue = normalizeText(record.venue);
    const summary = [date ? formatDisplayDate(date) : '', time, venue].filter(Boolean).join(' | ');

    return {
      date,
      time: time || undefined,
      venue: venue || undefined,
      summary: summary || undefined,
    };
  }

  const summary = normalizeText(String(value));
  if (!summary) {
    return undefined;
  }

  const splitMarker = summary.toLowerCase().lastIndexOf(' at ');
  if (splitMarker === -1) {
    return { summary };
  }

  return {
    time: summary.slice(0, splitMarker).trim(),
    venue: summary.slice(splitMarker + 4).trim(),
    summary,
  };
}

function calculateReadTime(value: string, fallback = 3): number {
  const plainText = stripHtml(value);
  const wordCount = plainText.split(/\s+/).filter(Boolean).length;
  return Math.max(fallback, Math.ceil(wordCount / 200));
}

function normalizeArticleRecord(source: unknown, fallbackId?: string): ArticleRecord {
  const record =
    typeof source === 'object' && source !== null ? (source as Record<string, unknown>) : {};
  const title = normalizeText(record.title);
  const content = ensureHtml(normalizeText(record.content));
  const excerpt = normalizeText(record.excerpt) || stripHtml(content).slice(0, 160);
  const publishDate = toIsoDate(record.publishDate) || new Date().toISOString();

  return {
    _id: normalizeText(record._id) || fallbackId || new Types.ObjectId().toString(),
    title,
    slug: normalizeText(record.slug),
    excerpt,
    content,
    featuredImage: normalizeText(record.featuredImage) || undefined,
    category: normalizeText(record.category) || 'Career Guides',
    tags: Array.isArray(record.tags) ? record.tags.map((tag) => normalizeText(tag)).filter(Boolean) : [],
    status: (normalizeText(record.status) as ArticleRecord['status']) || 'published',
    publishDate,
    lastUpdatedDate: toIsoDate(record.lastUpdatedDate) || publishDate,
    readTime:
      typeof record.readTime === 'number' && record.readTime > 0
        ? record.readTime
        : calculateReadTime(content),
    // Attribute articles to a named human (not "Editorial Team") so the
    // BlogPosting schema in app/blog/[slug]/page.tsx links to a real Person
    // with a bio and portfolio URL. Generic "Editorial Team" bylines are a
    // major Google E-E-A-T weakness for YMYL content (employment, salary,
    // visa, contracts) and were correlated with the 3 articles flagged
    // "Crawled - currently not indexed" in Search Console (2026-05-27).
    //
    // We coerce "Editorial Team" (legacy seed value) → "Resham KC" too, since
    // Sanity records were bootstrapped from seed and many still hold the
    // generic value. See lib/authors.ts for the available Author records.
    author: ((): string => {
      const raw = normalizeText(record.author);
      if (!raw || raw.toLowerCase() === 'editorial team') return 'Resham KC';
      return raw;
    })(),
    metaTitle: normalizeText(record.metaTitle) || `${title} | theuaecareer.com`,
    metaDescription: normalizeText(record.metaDescription) || excerpt,
  };
}

function normalizeJobRecord(source: unknown, fallbackId?: string): JobRecord {
  const record =
    typeof source === 'object' && source !== null ? (source as Record<string, unknown>) : {};
  const locationRecord =
    typeof record.location === 'object' && record.location !== null
      ? (record.location as Record<string, unknown>)
      : {};
  const categoryInfo = mapJobCategory(normalizeText(record.category));
  const description = ensureHtml(normalizeText(record.description));
  const howToApply = ensureHtml(normalizeText(record.howToApply));
  const postedDate = toIsoDate(record.postedDate) || new Date().toISOString();
  const expiryDate = toIsoDate(record.expiryDate);
  const walkInDetails = parseWalkInDetails(record.walkInDetails);
  const salaryRange = parseSalaryRange(record.salaryRange);
  const status =
    (normalizeText(record.status) as JobRecord['status']) ||
    (expiryDate && new Date(expiryDate) < new Date() ? 'expired' : 'active');

  return {
    _id: normalizeText(record._id) || fallbackId || new Types.ObjectId().toString(),
    title: normalizeText(record.title),
    companyName: normalizeText(record.companyName) || 'Confidential Company',
    location: {
      city: normalizeText(locationRecord.city) || 'Dubai',
      country: normalizeText(locationRecord.country) || 'UAE',
    },
    jobType: normalizeText(record.jobType) || 'Full-time',
    salaryRange,
    experienceRequired: normalizeText(record.experienceRequired) || 'Not specified',
    category: categoryInfo.category,
    categoryLabel: categoryInfo.categoryLabel,
    description,
    howToApply,
    postedDate,
    expiryDate,
    isWalkIn: Boolean(record.isWalkIn),
    walkInDetails,
    slug: normalizeText(record.slug),
    status,
    metaTitle: normalizeText(record.metaTitle),
    metaDescription: normalizeText(record.metaDescription) || stripHtml(description).slice(0, 160),
  };
}

function matchesSearch(job: JobRecord, search: string): boolean {
  const haystack = [
    job.title,
    job.companyName,
    job.description,
    job.location.city,
    job.location.country,
    job.categoryLabel || job.category,
  ]
    .join(' ')
    .toLowerCase();

  return haystack.includes(search.toLowerCase());
}

function matchesArticleSearch(article: ArticleRecord, search: string): boolean {
  const haystack = [article.title, article.excerpt, article.content, article.category, article.tags.join(' ')]
    .join(' ')
    .toLowerCase();

  return haystack.includes(search.toLowerCase());
}

async function withDatabase<T>(callback: () => Promise<T>): Promise<T | null> {
  if (!isRuntimeDatabaseFallbackEnabled) {
    return null;
  }

  if (!isDatabaseConfigured()) {
    return null;
  }

  try {
    await dbConnect();
    return await callback();
  } catch (error) {
    if (!hasLoggedDatabaseFallback) {
      console.error('Database fallback triggered:', error);
      hasLoggedDatabaseFallback = true;
    }
    return null;
  }
}

async function refreshExpiredJobs(): Promise<void> {
  await Job.updateMany(
    {
      status: 'active',
      expiryDate: { $lt: new Date() },
    },
    {
      $set: { status: 'expired' },
    }
  );
}

function paginate<T>(items: T[], page: number, limit: number): PaginatedResult<T> {
  const total = items.length;
  const pages = Math.max(1, Math.ceil(total / limit));
  const start = (page - 1) * limit;

  return {
    items: items.slice(start, start + limit),
    pagination: {
      page,
      limit,
      total,
      pages,
    },
  };
}

function sortJobs(jobs: JobRecord[], sort: JobQueryOptions['sort'] = 'recent'): JobRecord[] {
  const copy = [...jobs];

  if (sort === 'walk-in') {
    return copy.sort((left, right) => {
      const leftDate = left.walkInDetails?.date ? new Date(left.walkInDetails.date).getTime() : Number.MAX_SAFE_INTEGER;
      const rightDate = right.walkInDetails?.date
        ? new Date(right.walkInDetails.date).getTime()
        : Number.MAX_SAFE_INTEGER;

      if (leftDate !== rightDate) {
        return leftDate - rightDate;
      }

      return new Date(right.postedDate).getTime() - new Date(left.postedDate).getTime();
    });
  }

  return copy.sort(
    (left, right) => new Date(right.postedDate).getTime() - new Date(left.postedDate).getTime()
  );
}

function sortArticles(items: ArticleRecord[]): ArticleRecord[] {
  return [...items].sort(
    (left, right) => new Date(right.publishDate).getTime() - new Date(left.publishDate).getTime()
  );
}

function filterArticleCollection(
  items: ArticleRecord[],
  options: ArticleQueryOptions = {}
): ArticleRecord[] {
  const { category = '', search = '', status = 'published' } = options;

  return sortArticles(
    items.filter((article) => {
      if (status && article.status !== status) {
        return false;
      }
      if (category && article.category !== category) {
        return false;
      }
      if (search && !matchesArticleSearch(article, search)) {
        return false;
      }
      return true;
    })
  );
}

function buildMergedArticleCollection(sanityItems: ArticleRecord[] = []): ArticleRecord[] {
  return mergeContentBySlug([...staticArticleRecords, ...sanityItems], (article) => article.slug)
    .filter((article) => !REMOVED_ARTICLE_SLUGS.has(article.slug))
    .map(enrichArticleWithImages);
}

export async function getJobs(options: JobQueryOptions = {}): Promise<PaginatedResult<JobRecord>> {
  const {
    page = 1,
    limit = 20,
    search = '',
    country = '',
    jobType = '',
    category = '',
    walkIn = false,
    includeExpired = false,
    sort = walkIn ? 'walk-in' : 'recent',
  } = options;

  const sanityResult = await getSanityJobs(options);
  if (sanityResult && (sanityResult.result.pagination.total > 0 || sanityResult.collectionCount > 0)) {
    return sanityResult.result;
  }

  const dbResult = await withDatabase(async () => {
    await refreshExpiredJobs();

    const query: Record<string, unknown> = includeExpired ? {} : { status: 'active' };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { companyName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }
    if (country) {
      query['location.country'] = country;
    }
    if (jobType) {
      query.jobType = jobType;
    }
    if (category) {
      query.category = category;
    }
    if (walkIn) {
      query.isWalkIn = true;
    }

    const sortOption: Record<string, SortOrder> =
      sort === 'walk-in'
        ? { 'walkInDetails.date': 1, postedDate: -1 }
        : { postedDate: -1 };

    const skip = (page - 1) * limit;

    const [collectionCount, items, total] = await Promise.all([
      Job.countDocuments({}),
      Job.find(query).sort(sortOption).skip(skip).limit(limit).lean(),
      Job.countDocuments(query),
    ]);

    return {
      collectionCount,
      result: {
        items: items.map((job) => sanitizeJobRecord(normalizeJobRecord(job))),
        pagination: {
          page,
          limit,
          total,
          pages: Math.max(1, Math.ceil(total / limit)),
        },
      },
    };
  });

  if (dbResult && (dbResult.result.pagination.total > 0 || dbResult.collectionCount > 0)) {
    return dbResult.result;
  }

  const filtered = sortJobs(
    fallbackJobRecords.filter((job) => {
      if (!includeExpired && job.status === 'expired') {
        return false;
      }
      if (walkIn && !job.isWalkIn) {
        return false;
      }
      if (country && job.location.country !== country) {
        return false;
      }
      if (jobType && job.jobType !== jobType) {
        return false;
      }
      if (category && job.category !== category) {
        return false;
      }
      if (search && !matchesSearch(job, search)) {
        return false;
      }
      return true;
    }),
    sort
  );

  return paginate(filtered, page, limit);
}

export async function getJobByIdentifier(identifier: string): Promise<JobRecord | null> {
  const sanityJob = await getSanityJobByIdentifier(identifier);
  if (sanityJob?.item) {
    return sanityJob.item;
  }

  const dbJob = await withDatabase(async () => {
    await refreshExpiredJobs();

    const bySlug = await Job.findOne({ slug: identifier }).lean();
    if (bySlug) {
      return sanitizeJobRecord(normalizeJobRecord(bySlug));
    }
    if (Types.ObjectId.isValid(identifier)) {
      const byId = await Job.findById(identifier).lean();
      if (byId) {
        return sanitizeJobRecord(normalizeJobRecord(byId));
      }
    }

    return null;
  });

  if (dbJob) {
    return dbJob;
  }

  return fallbackJobRecords.find((job) => job.slug === identifier || job._id === identifier) || null;
}

export async function getArticles(
  options: ArticleQueryOptions = {}
): Promise<PaginatedResult<ArticleRecord>> {
  const {
    page = 1,
    limit = 20,
    category = '',
    search = '',
    status = 'published',
  } = options;

  const sanityResult = await getSanityArticles({
    page: 1,
    limit: 500,
    category,
    search,
    status,
  });
  if (sanityResult && (sanityResult.result.pagination.total > 0 || sanityResult.collectionCount > 0)) {
    const mergedItems = filterArticleCollection(buildMergedArticleCollection(sanityResult.result.items), {
      category,
      search,
      status,
    });
    return paginate(mergedItems, page, limit);
  }

  const dbResult = await withDatabase(async () => {
    const query: Record<string, unknown> = { status };

    if (category) {
      query.category = category;
    }
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { excerpt: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } },
      ];
    }

    const skip = (page - 1) * limit;

    const [collectionCount, items, total] = await Promise.all([
      Article.countDocuments({}),
      Article.find(query).sort({ publishDate: -1 }).skip(skip).limit(limit).lean(),
      Article.countDocuments(query),
    ]);

    return {
      collectionCount,
      result: {
        items: items.map((article) => enrichArticleWithImages(sanitizeArticleRecord(normalizeArticleRecord(article)))),
        pagination: {
          page,
          limit,
          total,
          pages: Math.max(1, Math.ceil(total / limit)),
        },
      },
    };
  });

  if (dbResult && (dbResult.result.pagination.total > 0 || dbResult.collectionCount > 0)) {
    const mergedItems = filterArticleCollection(buildMergedArticleCollection(dbResult.result.items), {
      category,
      search,
      status,
    });
    return paginate(mergedItems, page, limit);
  }

  const filtered = filterArticleCollection(buildMergedArticleCollection(), {
    category,
    search,
    status,
  });
  return paginate(filtered, page, limit);
}

export async function getArticleByIdentifier(identifier: string): Promise<ArticleRecord | null> {
  if (REMOVED_ARTICLE_SLUGS.has(identifier)) {
    return null;
  }

  const sanityArticle = await getSanityArticleByIdentifier(identifier);
  if (sanityArticle?.item) {
    return enrichArticleWithImages(sanityArticle.item);
  }

  const dbArticle = await withDatabase(async () => {
    const bySlug = await Article.findOne({ slug: identifier }).lean();
    if (bySlug) {
      return sanitizeArticleRecord(normalizeArticleRecord(bySlug));
    }
    if (Types.ObjectId.isValid(identifier)) {
      const byId = await Article.findById(identifier).lean();
      if (byId) {
        return sanitizeArticleRecord(normalizeArticleRecord(byId));
      }
    }
    return null;
  });

  if (dbArticle) {
    return enrichArticleWithImages(dbArticle);
  }

  const staticArticle = staticArticleRecords.find(
    (article) => article.slug === identifier || article._id === identifier
  );
  return staticArticle ? enrichArticleWithImages(staticArticle) : null;
}

export async function getRelatedArticles(
  article: ArticleRecord,
  limit = 2
): Promise<ArticleRecord[]> {
  const articles = await getAllPublicArticles();

  return articles
    .filter((item) => item.slug !== article.slug)
    .map((item) => ({
      article: item,
      score: scoreRelatedArticlePair(article, item),
    }))
    .filter(({ score }) => Number.isFinite(score) && score > 0)
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }
      return new Date(right.article.publishDate).getTime() - new Date(left.article.publishDate).getTime();
    })
    .slice(0, limit)
    .map(({ article: item }) => item);
}

export async function getHelpfulJobsForArticle(
  article: ArticleRecord,
  limit = 3
): Promise<JobRecord[]> {
  const jobs = await getAllPublicJobs();

  return jobs
    .map((job) => ({
      job,
      score: scoreJobForArticleTargeting(article, job),
    }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }
      return new Date(right.job.postedDate).getTime() - new Date(left.job.postedDate).getTime();
    })
    .slice(0, limit)
    .map(({ job }) => job);
}

export async function getRelatedJobs(job: JobRecord, limit = 3): Promise<JobRecord[]> {
  const jobs = await getAllPublicJobs();

  return jobs
    .filter((item) => item.slug !== job.slug)
    .sort((left, right) => {
      const leftScore =
        Number(left.category === job.category) * 3 +
        Number(left.location.country === job.location.country) +
        Number(left.location.city === job.location.city) +
        Number(left.isWalkIn === job.isWalkIn);
      const rightScore =
        Number(right.category === job.category) * 3 +
        Number(right.location.country === job.location.country) +
        Number(right.location.city === job.location.city) +
        Number(right.isWalkIn === job.isWalkIn);

      if (rightScore !== leftScore) {
        return rightScore - leftScore;
      }

      return new Date(right.postedDate).getTime() - new Date(left.postedDate).getTime();
    })
    .slice(0, limit);
}

export async function getHelpfulArticlesForJob(
  job: JobRecord,
  limit = 3
): Promise<ArticleRecord[]> {
  const articles = await getAllPublicArticles();

  return articles
    .map((article) => ({
      article,
      score: scoreArticleForJobTargeting(job, article),
    }))
    .filter(({ score }) => score > 0)
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }
      return new Date(right.article.publishDate).getTime() - new Date(left.article.publishDate).getTime();
    })
    .slice(0, limit)
    .map(({ article }) => article);
}

export async function getAllPublicArticles(): Promise<ArticleRecord[]> {
  const result = await getArticles({
    page: 1,
    limit: 500,
    status: 'published',
  });
  return result.items;
}

export async function getAllPublicJobs(): Promise<JobRecord[]> {
  const result = await getJobs({
    page: 1,
    limit: 500,
    includeExpired: false,
  });
  return result.items;
}
