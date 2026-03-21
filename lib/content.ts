import { Types, type SortOrder } from 'mongoose';
import dbConnect, { isDatabaseConfigured } from '@/lib/mongodb';
import Article from '@/lib/models/Article';
import Job from '@/lib/models/Job';
import { articles as launchArticles, jobs as launchJobs } from '@/lib/launch-content';
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

const launchArticleRecords: ArticleRecord[] = launchArticles.map((article) =>
  normalizeArticleRecord(article)
);
const launchJobRecords: JobRecord[] = launchJobs.map((job, index) =>
  normalizeJobRecord(job, `launch-job-${index + 1}`)
);
let hasLoggedDatabaseFallback = false;

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

export function formatDisplayDate(
  value?: string | Date,
  options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: 'numeric' }
): string {
  if (!value) {
    return '';
  }

  const date = value instanceof Date ? value : new Date(value);
  if (Number.isNaN(date.getTime())) {
    return normalizeText(String(value));
  }

  return new Intl.DateTimeFormat('en-US', options).format(date);
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
        items: items.map((job) => normalizeJobRecord(job)),
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
  const dbJob = await withDatabase(async () => {
    await refreshExpiredJobs();

    const bySlug = await Job.findOne({ slug: identifier }).lean();
    if (bySlug) {
      return normalizeJobRecord(bySlug);
    }
    if (Types.ObjectId.isValid(identifier)) {
      const byId = await Job.findById(identifier).lean();
      if (byId) {
        return normalizeJobRecord(byId);
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
        items: items.map((article) => normalizeArticleRecord(article)),
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

  return paginate(filtered, page, limit);
}

export async function getArticleByIdentifier(identifier: string): Promise<ArticleRecord | null> {
  const dbArticle = await withDatabase(async () => {
    const bySlug = await Article.findOne({ slug: identifier }).lean();
    if (bySlug) {
      return normalizeArticleRecord(bySlug);
    }
    if (Types.ObjectId.isValid(identifier)) {
      const byId = await Article.findById(identifier).lean();
      if (byId) {
        return normalizeArticleRecord(byId);
      }
    }
    return null;
  });

  if (dbArticle) {
    return dbArticle;
  }

  return launchArticleRecords.find((article) => article.slug === identifier || article._id === identifier) || null;
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
