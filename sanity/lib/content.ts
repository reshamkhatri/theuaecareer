import 'server-only';
import { cache } from 'react';
import { escapeHTML, toHTML, uriLooksSafe } from '@portabletext/to-html';
import groq from 'groq';
import type { PortableTextBlock } from 'sanity';
import type {
  ArticleQueryOptions,
  ArticleRecord,
  JobQueryOptions,
  JobRecord,
  PaginatedResult,
  SalaryRange,
  WalkInDetails,
} from '@/lib/types';
import { sanitizeArticleRecord, sanitizeJobRecord } from '@/lib/content-sanitizer';
import { formatDisplayDate } from '@/lib/format';
import { isSanityConfigured } from '@/sanity/env';
import { sanityClient } from '@/sanity/lib/client';
import { urlForImage } from './client';

const SANITY_REVALIDATE_SECONDS = 300;
let hasLoggedSanityFallback = false;

interface SanityArticleDocument {
  _id: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  featuredImage?: {
    alt?: string;
    asset?: {
      _ref?: string;
      _type?: string;
    };
  };
  category?: string;
  tags?: string[];
  status?: 'published' | 'archived';
  publishDate?: string;
  lastUpdatedDate?: string;
  author?: string;
  metaTitle?: string;
  metaDescription?: string;
  content?: PortableTextBlock[];
}

interface SanityJobDocument {
  _id: string;
  title?: string;
  companyName?: string;
  slug?: string;
  location?: {
    city?: string;
    country?: string;
  };
  jobType?: string;
  salaryRange?: {
    min?: number;
    max?: number;
    currency?: string;
    label?: string;
  };
  experienceRequired?: string;
  category?: string;
  categoryLabel?: string;
  postedDate?: string;
  expiryDate?: string;
  status?: 'active' | 'expired';
  isWalkIn?: boolean;
  walkInDetails?: {
    date?: string;
    time?: string;
    venue?: string;
    summary?: string;
  };
  description?: PortableTextBlock[];
  howToApply?: PortableTextBlock[];
  metaTitle?: string;
  metaDescription?: string;
}

export interface SanityLookupResult<T> {
  collectionCount: number;
  item: T | null;
}

export interface SanityCollectionResult<T> {
  collectionCount: number;
  result: PaginatedResult<T>;
}

const allArticlesQuery = groq`*[_type == "article"] | order(coalesce(publishDate, _updatedAt) desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  featuredImage,
  category,
  tags,
  status,
  publishDate,
  lastUpdatedDate,
  author,
  metaTitle,
  metaDescription,
  content
}`;

const allJobsQuery = groq`*[_type == "job"] | order(coalesce(postedDate, _updatedAt) desc) {
  _id,
  title,
  companyName,
  "slug": slug.current,
  location,
  jobType,
  salaryRange,
  experienceRequired,
  category,
  categoryLabel,
  postedDate,
  expiryDate,
  status,
  isWalkIn,
  walkInDetails,
  description,
  howToApply,
  metaTitle,
  metaDescription
}`;

const portableTextComponents = {
  types: {
    image: ({ value }: { value: SanityArticleDocument['featuredImage'] }) => {
      const imageUrl = getSanityImageUrl(value, 1280);
      if (!imageUrl) {
        return '';
      }

      const alt = escapeHTML(normalizeText(value?.alt));
      return `<figure><img src="${escapeHTML(imageUrl)}" alt="${alt}" loading="lazy" /></figure>`;
    },
  },
  marks: {
    link: ({
      children,
      value,
    }: {
      children: string;
      value?: {
        href?: string;
      };
    }) => {
      const href = value?.href || '';

      if (!uriLooksSafe(href)) {
        return children;
      }

      const isExternal = !href.startsWith('/');
      const rel = isExternal ? ' noreferrer noopener' : '';
      const target = isExternal ? ' target="_blank"' : '';

      return `<a href="${escapeHTML(href)}"${target}${rel ? ` rel="${rel.trim()}"` : ''}>${children}</a>`;
    },
  },
};

async function withSanity<T>(callback: () => Promise<T>): Promise<T | null> {
  if (!isSanityConfigured) {
    return null;
  }

  try {
    return await callback();
  } catch (error) {
    if (!hasLoggedSanityFallback) {
      console.error('Sanity fallback triggered:', error);
      hasLoggedSanityFallback = true;
    }
    return null;
  }
}

function normalizeText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function stripHtml(value: string): string {
  return normalizeText(value.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
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

function calculateReadTime(value: string, fallback = 3): number {
  const wordCount = stripHtml(value).split(/\s+/).filter(Boolean).length;
  return Math.max(fallback, Math.ceil(wordCount / 200));
}

function getSanityImageUrl(source: unknown, width = 1600): string | undefined {
  if (!source) {
    return undefined;
  }

  try {
    return urlForImage(source).width(width).auto('format').fit('max').url();
  } catch {
    return undefined;
  }
}

function portableTextToHtml(value: PortableTextBlock[] | undefined): string {
  if (!Array.isArray(value) || value.length === 0) {
    return '';
  }

  return toHTML(value, {
    components: portableTextComponents,
    onMissingComponent: false,
  });
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

function parseSalaryRange(value: SanityJobDocument['salaryRange']): SalaryRange | undefined {
  if (!value) {
    return undefined;
  }

  const currency = normalizeText(value.currency) || 'AED';
  const min = typeof value.min === 'number' ? value.min : undefined;
  const max = typeof value.max === 'number' ? value.max : undefined;
  const label =
    normalizeText(value.label) ||
    (min || max ? `${currency} ${[min, max].filter((part) => part !== undefined).join(' - ')}` : undefined);

  if (!min && !max && !label) {
    return undefined;
  }

  return {
    min,
    max,
    currency,
    label,
  };
}

function buildWalkInSummary(details: WalkInDetails | undefined): WalkInDetails | undefined {
  if (!details) {
    return undefined;
  }

  const summary =
    details.summary ||
    [details.date ? formatDisplayDate(details.date) : '', details.time, details.venue]
      .filter(Boolean)
      .join(' | ');

  return {
    ...details,
    summary: summary || undefined,
  };
}

function mapArticleDocument(document: SanityArticleDocument): ArticleRecord {
  const content = portableTextToHtml(document.content);
  const publishDate = toIsoDate(document.publishDate) || new Date().toISOString();
  const excerpt = normalizeText(document.excerpt) || stripHtml(content).slice(0, 160);
  const title = normalizeText(document.title);

  return sanitizeArticleRecord({
    _id: document._id,
    title,
    slug: normalizeText(document.slug),
    excerpt,
    content,
    featuredImage: getSanityImageUrl(document.featuredImage),
    category: normalizeText(document.category) || 'Career Guides',
    tags: Array.isArray(document.tags)
      ? document.tags.map((tag) => normalizeText(tag)).filter(Boolean)
      : [],
    status: document.status === 'archived' ? 'archived' : 'published',
    publishDate,
    lastUpdatedDate: toIsoDate(document.lastUpdatedDate) || publishDate,
    readTime: calculateReadTime(content),
    author: normalizeText(document.author) || 'Editorial Team',
    metaTitle: normalizeText(document.metaTitle) || `${title} | theuaecareer.com`,
    metaDescription: normalizeText(document.metaDescription) || excerpt,
  });
}

function mapJobDocument(document: SanityJobDocument): JobRecord {
  const description = portableTextToHtml(document.description);
  const howToApply = portableTextToHtml(document.howToApply);
  const postedDate = toIsoDate(document.postedDate) || new Date().toISOString();
  const expiryDate = toIsoDate(document.expiryDate);
  const derivedStatus =
    document.status === 'expired' ||
    (expiryDate ? new Date(expiryDate).getTime() < Date.now() : false)
      ? 'expired'
      : 'active';

  return sanitizeJobRecord({
    _id: document._id,
    title: normalizeText(document.title),
    companyName: normalizeText(document.companyName) || 'Confidential Company',
    location: {
      city: normalizeText(document.location?.city) || 'Dubai',
      country: normalizeText(document.location?.country) || 'UAE',
    },
    jobType: normalizeText(document.jobType) || 'Full-time',
    salaryRange: parseSalaryRange(document.salaryRange),
    experienceRequired: normalizeText(document.experienceRequired) || 'Not specified',
    category: normalizeText(document.category) || 'Other',
    categoryLabel: normalizeText(document.categoryLabel) || undefined,
    description,
    howToApply,
    postedDate,
    expiryDate,
    isWalkIn: Boolean(document.isWalkIn),
    walkInDetails: buildWalkInSummary({
      date: toIsoDate(document.walkInDetails?.date),
      time: normalizeText(document.walkInDetails?.time) || undefined,
      venue: normalizeText(document.walkInDetails?.venue) || undefined,
      summary: normalizeText(document.walkInDetails?.summary) || undefined,
    }),
    slug: normalizeText(document.slug),
    status: derivedStatus,
    metaTitle: normalizeText(document.metaTitle) || undefined,
    metaDescription:
      normalizeText(document.metaDescription) || stripHtml(description).slice(0, 160),
  });
}

const getAllArticleDocuments = cache(async (): Promise<SanityArticleDocument[] | null> =>
  withSanity(async () =>
    sanityClient.fetch<SanityArticleDocument[]>(
      allArticlesQuery,
      {},
      {
        next: {
          revalidate: SANITY_REVALIDATE_SECONDS,
          tags: ['sanity', 'sanity:articles'],
        },
      }
    )
  )
);

const getAllJobDocuments = cache(async (): Promise<SanityJobDocument[] | null> =>
  withSanity(async () =>
    sanityClient.fetch<SanityJobDocument[]>(
      allJobsQuery,
      {},
      {
        next: {
          revalidate: SANITY_REVALIDATE_SECONDS,
          tags: ['sanity', 'sanity:jobs'],
        },
      }
    )
  )
);

function matchesArticleSearch(article: ArticleRecord, search: string): boolean {
  const haystack = [article.title, article.excerpt, article.content, article.category, article.tags.join(' ')]
    .join(' ')
    .toLowerCase();

  return haystack.includes(search.toLowerCase());
}

function matchesJobSearch(job: JobRecord, search: string): boolean {
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

function sortJobs(items: JobRecord[], sort: JobQueryOptions['sort'] = 'recent'): JobRecord[] {
  const copy = [...items];

  if (sort === 'walk-in') {
    return copy.sort((left, right) => {
      const leftDate = left.walkInDetails?.date
        ? new Date(left.walkInDetails.date).getTime()
        : Number.MAX_SAFE_INTEGER;
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

export async function getSanityArticles(
  options: ArticleQueryOptions = {}
): Promise<SanityCollectionResult<ArticleRecord> | null> {
  const documents = await getAllArticleDocuments();
  if (!documents) {
    return null;
  }

  const { page = 1, limit = 20, category = '', search = '', status = 'published' } = options;
  const items = documents.map(mapArticleDocument);
  const filtered = sortArticles(
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

  return {
    collectionCount: items.length,
    result: paginate(filtered, page, limit),
  };
}

export async function getSanityArticleByIdentifier(
  identifier: string
): Promise<SanityLookupResult<ArticleRecord> | null> {
  const documents = await getAllArticleDocuments();
  if (!documents) {
    return null;
  }

  const items = documents.map(mapArticleDocument);
  return {
    collectionCount: items.length,
    item: items.find((article) => article.slug === identifier || article._id === identifier) || null,
  };
}

export async function getSanityJobs(
  options: JobQueryOptions = {}
): Promise<SanityCollectionResult<JobRecord> | null> {
  const documents = await getAllJobDocuments();
  if (!documents) {
    return null;
  }

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

  const items = documents.map(mapJobDocument);
  const filtered = sortJobs(
    items.filter((job) => {
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
      if (search && !matchesJobSearch(job, search)) {
        return false;
      }

      return true;
    }),
    sort
  );

  return {
    collectionCount: items.length,
    result: paginate(filtered, page, limit),
  };
}

export async function getSanityJobByIdentifier(
  identifier: string
): Promise<SanityLookupResult<JobRecord> | null> {
  const documents = await getAllJobDocuments();
  if (!documents) {
    return null;
  }

  const items = documents.map(mapJobDocument);
  return {
    collectionCount: items.length,
    item: items.find((job) => job.slug === identifier || job._id === identifier) || null,
  };
}
