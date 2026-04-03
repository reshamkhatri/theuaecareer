import { Types, type SortOrder } from 'mongoose';
import dbConnect, { isDatabaseConfigured } from '@/lib/mongodb';
import Article from '@/lib/models/Article';
import Job from '@/lib/models/Job';
import { formatDisplayDate } from '@/lib/format';
import { sanitizeArticleRecord, sanitizeJobRecord } from '@/lib/content-sanitizer';
import { articles as launchArticles, jobs as launchJobs } from '@/lib/launch-content';
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
    'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1280&q=80',
    'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1280&q=80',
    'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1280&q=80',
  ],
  career: [
    'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1280&q=80',
    'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1280&q=80',
    'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1280&q=80',
  ],
  salary: [
    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1280&q=80',
    'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1280&q=80',
    'https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?w=1280&q=80',
  ],
  visa: [
    'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1280&q=80',
    'https://images.unsplash.com/photo-1521791055366-0d553872125f?w=1280&q=80',
    'https://images.unsplash.com/photo-1577415124269-fc1140815ced?w=1280&q=80',
  ],
  default: [
    'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1280&q=80',
    'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1280&q=80',
    'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1280&q=80',
  ],
};

// Per-slug featured images — every article gets a unique image
const slugFeaturedImages: Record<string, string> = {
  'walk-in-interviews-dubai-this-week':       'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=1600&q=80',
  'hospitality-jobs-in-dubai':                'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=1600&q=80',
  'how-to-apply-dubai-hotel-jobs':            'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=1600&q=80',
  'verified-dubai-jobs-direct-employer':      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1600&q=80',
  'how-to-find-a-job-in-dubai-as-a-fresher':  'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&q=80',
  'top-10-in-demand-jobs-uae-2026':           'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1600&q=80',
  'cost-of-living-dubai-2026':                'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1600&q=80',
  'how-to-write-cv-for-gulf-jobs':            'https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=1600&q=80',
  'uae-golden-visa-2026-guide':               'https://images.unsplash.com/photo-1436491865332-7a61a109db05?w=1600&q=80',
  'best-free-zones-dubai-2026':               'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1600&q=80',
  'salary-guide-uae-2026':                    'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1600&q=80',
  'uae-interview-questions-and-answers':      'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=1600&q=80',
  'abu-dhabi-vs-dubai-working-living':        'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=1600&q=80',
  'best-remittance-options-uae-2026':         'https://images.unsplash.com/photo-1607863680198-23d4b2565df0?w=1600&q=80',
  'how-to-get-uae-driving-licence':           'https://images.unsplash.com/photo-1449965408869-ebd3fee1f2f3?w=1600&q=80',
  'how-to-renew-uae-work-visa':               'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1600&q=80',
  'uae-labour-law-guide-for-expats':          'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?w=1600&q=80',
  'driver-salary-in-uae-2026':               'https://images.unsplash.com/photo-1494515843206-f3117d3f51b7?w=1600&q=80',
};

// Fallback pool — unique images used when slug doesn't match above
const fallbackFeaturedImages = [
  'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=1600&q=80',
  'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1600&q=80',
  'https://images.unsplash.com/photo-1521791055366-0d553872125f?w=1600&q=80',
  'https://images.unsplash.com/photo-1577415124269-fc1140815ced?w=1600&q=80',
  'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1600&q=80',
];

function getStockFeaturedImage(slug: string): string {
  // Try exact slug match first (handles both dot and hyphen variants)
  const normalizedSlug = slug.replace(/^article\./, '');
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
    const images = stockImagesByCategory[key] || stockImagesByCategory.default;
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
const launchJobRecords: JobRecord[] = launchJobs.map((job, index) =>
  sanitizeJobRecord(normalizeJobRecord(job, `launch-job-${index + 1}`))
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
  if (sanityJob && sanityJob.collectionCount > 0) {
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

  const sanityResult = await getSanityArticles(options);
  if (sanityResult && (sanityResult.result.pagination.total > 0 || sanityResult.collectionCount > 0)) {
    const enriched = { ...sanityResult.result, items: sanityResult.result.items.map(enrichArticleWithImages) };
    return enriched;
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
    return dbResult.result;
  }

  const filtered = sortArticles(
    launchArticleRecords.filter((article) => {
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

  const result = paginate(filtered, page, limit);
  return { ...result, items: result.items.map(enrichArticleWithImages) };
}

export async function getArticleByIdentifier(identifier: string): Promise<ArticleRecord | null> {
  const sanityArticle = await getSanityArticleByIdentifier(identifier);
  if (sanityArticle && sanityArticle.collectionCount > 0 && sanityArticle.item) {
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

  const launch = launchArticleRecords.find((article) => article.slug === identifier || article._id === identifier);
  return launch ? enrichArticleWithImages(launch) : null;
}

export async function getRelatedArticles(
  article: ArticleRecord,
  limit = 2
): Promise<ArticleRecord[]> {
  const result = await getArticles({
    category: article.category,
    status: 'published',
    limit: 50,
  });

  return result.items.filter((item) => item.slug !== article.slug).slice(0, limit);
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
