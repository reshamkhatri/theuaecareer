import { Types, type SortOrder } from 'mongoose';
import dbConnect, { isDatabaseConfigured } from '@/lib/mongodb';
import Article from '@/lib/models/Article';
import Job from '@/lib/models/Job';
import { formatDisplayDate } from '@/lib/format';
import { sanitizeArticleRecord, sanitizeJobRecord } from '@/lib/content-sanitizer';
import { articles as launchArticles, jobs as launchJobs } from '@/lib/launch-content';
import { seoSeedArticles } from '@/lib/seo-seed-content';
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
    '/article-images/what-to-carry-walk-in-hero.png',
    '/article-images/self-introduction-uae-hero.png',
    '/article-images/walk-in-vs-online-hero.jpg',
  ],
  career: [
    '/article-images/dubai-hotel-jobs-hero.png',
    '/article-images/gulf-cv-format-hero.png',
    '/article-images/saudi-warehouse-jobs-hero.jpg',
  ],
  salary: [
    '/article-images/cleaner-salary-hero.jpg',
    '/article-images/driver-qatar-hero.png',
    '/article-images/saudi-offer-documents-hero.jpg',
  ],
  interview: [
    '/article-images/self-introduction-uae-hero.png',
    '/article-images/cashier-interview-saudi-hero.jpg',
    '/article-images/housekeeping-qatar-hero.jpg',
  ],
  retail: [
    '/article-images/cashier-interview-saudi-hero.jpg',
    '/article-images/what-to-carry-walk-in-hero.png',
    '/article-images/walk-in-vs-online-hero.jpg',
  ],
  construction: [
    '/article-images/saudi-warehouse-jobs-hero.jpg',
    '/article-images/driver-qatar-hero.png',
    '/article-images/what-to-carry-walk-in-hero.png',
  ],
  visa: [
    '/article-images/saudi-offer-documents-hero.jpg',
    '/article-images/what-to-carry-walk-in-hero.png',
    '/article-images/self-introduction-uae-hero.png',
  ],
  default: [
    '/article-images/dubai-hotel-jobs-hero.png',
    '/article-images/gulf-cv-format-hero.png',
    '/article-images/walk-in-vs-online-hero.jpg',
  ],
};

// Per-slug featured images — every article gets a unique image
const slugFeaturedImages: Record<string, string> = {
  // Launch content exact matches
  'walk-in-interviews-dubai-this-week':       '/article-images/walk-in-interviews-dubai-hero.jpg',
  'hospitality-jobs-in-dubai-what-employers-want-2026': '/article-images/dubai-hotel-jobs-hero.png',
  'how-to-apply-for-dubai-hotel-jobs-through-official-career-pages-2026': '/article-images/dubai-hotel-jobs-inline.png',
  'verified-dubai-jobs-open-now-direct-employer-march-2026': '/article-images/verified-dubai-jobs-hero.png',
  'how-to-find-a-job-in-dubai-as-a-fresher':  '/article-images/dubai-fresher-jobs-hero.jpg',
  'top-10-in-demand-jobs-uae-2026':           '/article-images/top-10-jobs-uae-2026-hero.jpg',
  'cost-of-living-dubai-2026':                '/article-images/cost-of-living-dubai-hero.jpg',
  'how-to-write-cv-for-gulf-jobs':            '/article-images/cv-for-gulf-jobs-hero.png',
  'uae-golden-visa-2026-guide':               '/article-images/uae-golden-visa-hero.jpg',
  'best-free-zones-dubai-2026':               '/article-images/dubai-free-zone-hero.jpg',
  'salary-guide-uae-2026':                    '/article-images/salary-guide-uae-hero.jpg',
  'uae-interview-questions-and-answers':      '/article-images/uae-interview-qa-hero.jpg',
  'abu-dhabi-vs-dubai-working-expats':        '/article-images/abu-dhabi-vs-dubai-hero.jpg',
  'best-remittance-options-uae-2026':         '/article-images/remittance-uae-hero.png',
  'how-to-get-uae-driving-licence-2026':      '/article-images/uae-driving-licence-hero.png',
  'how-to-renew-uae-work-visa-2026':          '/article-images/uae-visa-renewal-hero.jpg',
  'uae-labour-law-guide-for-expats':          '/article-images/uae-labour-law-hero.jpg',
  'driver-salary-in-uae-2026':                '/article-images/driver-salary-uae-hero.jpg',

  // SEO seed exact matches
  'what-to-carry-for-walk-in-interview-in-uae': '/article-images/what-to-carry-walk-in-hero.png',
  'self-introduction-for-walk-in-interview-in-uae': '/article-images/self-introduction-uae-hero.png',
  'cleaner-salary-in-uae':                    '/article-images/cleaner-salary-hero.jpg',
  'documents-required-after-getting-a-saudi-job-offer': '/article-images/saudi-offer-documents-hero.jpg',
  'how-to-apply-for-warehouse-jobs-in-saudi-arabia-safely': '/article-images/saudi-warehouse-jobs-hero.jpg',
  'cashier-interview-questions-for-saudi-retail-jobs': '/article-images/cashier-interview-saudi-hero.jpg',
  'housekeeping-interview-questions-for-qatar-hotel-jobs': '/article-images/housekeeping-qatar-hero.jpg',
  'driver-interview-questions-in-qatar':      '/article-images/driver-qatar-hero.png',
  'how-to-avoid-fake-job-offers-in-uae-saudi-qatar': '/article-images/fake-job-offers-hero.png',
  'difference-between-walk-in-interview-and-online-application-in-gulf-jobs': '/article-images/walk-in-vs-online-hero.jpg',
  'best-cv-format-for-uae-saudi-qatar-job-applications': '/article-images/gulf-cv-format-hero.png',
  'best-cv-maker-for-gulf-jobs-uae-saudi-qatar': '/article-images/cv-maker-guide-hero.png',
  'uae-gratuity-calculator-end-of-service-benefits-2026': '/article-images/gratuity-calculator-hero.png',
  'best-uae-remittance-options-compare-exchange-rates-2026': '/article-images/remittance-guide-hero.png',
  
  // Sanity/other new articles
  'cv-for-housekeeping-jobs-dubai-sample':    '/article-images/cv-housekeeping-dubai-hero.png',
  'documents-for-walk-in-interview-dubai':    '/article-images/documents-walk-in-dubai-hero.png',
  'dubai-free-zone-comparison-2026':          '/article-images/dubai-free-zone-comparison-hero.jpg',
  'front-office-interview-questions-dubai-hotels': '/article-images/front-office-interview-hero.png',
  'housekeeping-interview-questions-dubai-hotels': '/article-images/housekeeping-interview-hero.jpg',
  'room-attendant-interview-questions-dubai': '/article-images/room-attendant-interview-hero.jpg',
  'walk-in-interview-checklist-uae':          '/article-images/walk-in-interview-checklist-hero.png',
  'retail-sales-associate-interview-questions-uae': '/article-images/cashier-interview-saudi-hero.jpg',
  'construction-helper-interview-questions-uae': '/article-images/saudi-warehouse-jobs-inline.jpg',
  'walk-in-interview-self-introduction-sample-uae': '/article-images/self-introduction-uae-hero.png',
};

// Fallback pool — unique images used when slug doesn't match above
const fallbackFeaturedImages = [
  '/article-images/dubai-hotel-jobs-hero.png',
  '/article-images/gulf-cv-format-hero.png',
  '/article-images/walk-in-vs-online-hero.jpg',
  '/article-images/cleaner-salary-hero.jpg',
  '/article-images/self-introduction-uae-hero.png',
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

function enrichArticleWithImages(article: ArticleRecord): ArticleRecord {
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
const launchJobRecords: JobRecord[] = launchJobs.map((job, index) =>
  sanitizeJobRecord(normalizeJobRecord(job, `launch-job-${index + 1}`))
);
const staticArticleRecords = mergeContentBySlug(
  [...launchArticleRecords, ...seedArticleRecords],
  (article) => article.slug
);
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
    author: normalizeText(record.author) || 'Editorial Team',
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
  return mergeContentBySlug([...staticArticleRecords, ...sanityItems], (article) => article.slug).map(
    enrichArticleWithImages
  );
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
    launchJobRecords.filter((job) => {
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

  return launchJobRecords.find((job) => job.slug === identifier || job._id === identifier) || null;
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
