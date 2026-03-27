import { existsSync } from 'node:fs';
import path from 'node:path';
import { JSDOM } from 'jsdom';
import { createClient } from 'next-sanity';
import type { PortableTextBlock } from 'sanity';
import dbConnect, { isDatabaseConfigured } from '../lib/mongodb.ts';
import { articles as launchArticles, jobs as launchJobs } from '../lib/launch-content.ts';
import Article from '../lib/models/Article.ts';
import Job from '../lib/models/Job.ts';
import { SITE_DESCRIPTION, SITE_NAME, SITE_TAGLINE } from '../lib/constants.ts';

type PortableTextSpan = {
  _type: 'span';
  _key: string;
  text: string;
  marks: string[];
};

type PortableTextLinkMark = {
  _key: string;
  _type: 'link';
  href: string;
};

type PortableTextBlockWithLists = PortableTextBlock & {
  _key: string;
  style: string;
  children: PortableTextSpan[];
  markDefs: PortableTextLinkMark[];
  listItem?: 'bullet' | 'number';
  level?: number;
};

type SourceMode = 'auto' | 'launch' | 'database';
type SanityImportDocument = {
  _id: string;
  _type: string;
  [key: string]: unknown;
};

type RawArticle = {
  _id?: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  content?: string;
  featuredImage?: string;
  category?: string;
  tags?: string[];
  status?: string;
  publishDate?: string | Date;
  lastUpdatedDate?: string | Date;
  readTime?: number;
  author?: string;
  metaTitle?: string;
  metaDescription?: string;
};

type RawJob = {
  _id?: string;
  title?: string;
  companyName?: string;
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
  } | string;
  experienceRequired?: string;
  category?: string;
  description?: string;
  howToApply?: string;
  postedDate?: string | Date;
  expiryDate?: string | Date;
  isWalkIn?: boolean;
  walkInDetails?: {
    date?: string | Date;
    time?: string;
    venue?: string;
    summary?: string;
  } | string;
  slug?: string;
  status?: string;
  metaTitle?: string;
  metaDescription?: string;
};

const textReplacements: Array<[string, string]> = [
  ['Ã¢â‚¬â€', '-'],
  ['Ã¢â‚¬â€œ', '-'],
  ['Ã¢â‚¬Â¢', '-'],
  ['Ã¢â‚¬â„¢', "'"],
  ['Ã¢â‚¬Å“', '"'],
  ['Ã¢â‚¬\u009d', '"'],
  ['Ã¢â‚¬"', '"'],
  ['Ã‚Â©', '(c)'],
  ['Ã¢Å“â€¦', 'Success'],
  ['Ã¢â‚¬Æ’', ''],
];

const sourceArg = process.argv.find((argument) => argument.startsWith('--source='));
const sourceMode = (sourceArg?.split('=')[1] || 'auto') as SourceMode;
const dryRun = process.argv.includes('--dry-run');

loadEnvFiles();

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production';
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2026-03-27';
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID. Add it to .env.local before importing.');
}

if (!token && !dryRun) {
  throw new Error('Missing SANITY_API_WRITE_TOKEN. Create a write token in Sanity manage and add it to .env.local.');
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

  const candidates = ['.env.local', '.env'];
  for (const candidate of candidates) {
    const resolved = path.resolve(process.cwd(), candidate);
    if (existsSync(resolved) && processWithLoader.loadEnvFile) {
      processWithLoader.loadEnvFile(resolved);
    }
  }
}

function createKey(): string {
  return crypto.randomUUID().replace(/-/g, '').slice(0, 12);
}

function normalizeText(value: unknown): string {
  if (typeof value !== 'string') {
    return '';
  }

  return textReplacements.reduce(
    (current, [search, replacement]) => current.split(search).join(replacement),
    value
  ).trim();
}

function stripHtml(value: string): string {
  return normalizeText(value.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function slugifyValue(value: string): string {
  return normalizeText(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96);
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

function parseSalaryRange(value: RawJob['salaryRange']) {
  if (!value) {
    return undefined;
  }

  if (typeof value === 'object') {
    return {
      min: typeof value.min === 'number' ? value.min : undefined,
      max: typeof value.max === 'number' ? value.max : undefined,
      currency: normalizeText(value.currency) || 'AED',
      label: normalizeText(value.label) || undefined,
    };
  }

  const label = normalizeText(value);
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

function parseWalkInDetails(value: RawJob['walkInDetails']) {
  if (!value) {
    return undefined;
  }

  if (typeof value === 'object') {
    const date = toIsoDate(value.date);
    const time = normalizeText(value.time);
    const venue = normalizeText(value.venue);
    const summary =
      normalizeText(value.summary) ||
      [date ? formatDisplayDate(date) : '', time, venue].filter(Boolean).join(' | ');

    return {
      date,
      time: time || undefined,
      venue: venue || undefined,
      summary: summary || undefined,
    };
  }

  const summary = normalizeText(value);
  if (!summary) {
    return undefined;
  }

  return { summary };
}

function formatDisplayDate(
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

function textNodeToSpan(text: string, marks: string[]): PortableTextSpan | null {
  const normalized = text.replace(/\s+/g, ' ');
  if (!normalized.trim()) {
    return null;
  }

  return {
    _type: 'span',
    _key: createKey(),
    text: normalized,
    marks,
  };
}

function collectInlineContent(
  node: Node,
  marks: string[],
  spans: PortableTextSpan[],
  markDefs: PortableTextLinkMark[]
) {
  if (node.nodeType === node.TEXT_NODE) {
    const span = textNodeToSpan(node.textContent || '', marks);
    if (span) {
      spans.push(span);
    }
    return;
  }

  if (node.nodeType !== node.ELEMENT_NODE) {
    return;
  }

  const element = node as Element;
  const tagName = element.tagName.toLowerCase();

  if (tagName === 'br') {
    const span = textNodeToSpan('\n', marks);
    if (span) {
      spans.push(span);
    }
    return;
  }

  let nextMarks = marks;

  if (tagName === 'strong' || tagName === 'b') {
    nextMarks = [...marks, 'strong'];
  } else if (tagName === 'em' || tagName === 'i') {
    nextMarks = [...marks, 'em'];
  } else if (tagName === 'code') {
    nextMarks = [...marks, 'code'];
  } else if (tagName === 'a') {
    const href = normalizeText(element.getAttribute('href'));
    if (href) {
      const existing = markDefs.find((markDef) => markDef.href === href);
      const linkKey = existing?._key || createKey();

      if (!existing) {
        markDefs.push({
          _key: linkKey,
          _type: 'link',
          href,
        });
      }

      nextMarks = [...marks, linkKey];
    }
  }

  for (const child of element.childNodes) {
    collectInlineContent(child, nextMarks, spans, markDefs);
  }
}

function createTextBlock(
  element: Element,
  style: string,
  options: Pick<PortableTextBlockWithLists, 'listItem' | 'level'> = {}
): PortableTextBlockWithLists | null {
  const spans: PortableTextSpan[] = [];
  const markDefs: PortableTextLinkMark[] = [];

  for (const child of element.childNodes) {
    collectInlineContent(child, [], spans, markDefs);
  }

  if (spans.length === 0) {
    const fallbackText = normalizeText(element.textContent);
    if (!fallbackText) {
      return null;
    }

    spans.push({
      _type: 'span',
      _key: createKey(),
      text: fallbackText,
      marks: [],
    });
  }

  return {
    _type: 'block',
    _key: createKey(),
    style,
    children: spans,
    markDefs,
    ...(options.listItem ? { listItem: options.listItem } : {}),
    ...(options.level ? { level: options.level } : {}),
  };
}

function appendBlocksFromNode(node: Node, blocks: PortableTextBlockWithLists[], level = 1) {
  if (node.nodeType === node.TEXT_NODE) {
    const text = normalizeText(node.textContent);
    if (text) {
      blocks.push({
        _type: 'block',
        _key: createKey(),
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: createKey(),
            text,
            marks: [],
          },
        ],
        markDefs: [],
      });
    }
    return;
  }

  if (node.nodeType !== node.ELEMENT_NODE) {
    return;
  }

  const element = node as Element;
  const tagName = element.tagName.toLowerCase();

  if (tagName === 'p') {
    const block = createTextBlock(element, 'normal');
    if (block) {
      blocks.push(block);
    }
    return;
  }

  if (tagName === 'h1' || tagName === 'h2' || tagName === 'h3' || tagName === 'h4') {
    const block = createTextBlock(element, tagName);
    if (block) {
      blocks.push(block);
    }
    return;
  }

  if (tagName === 'blockquote') {
    const block = createTextBlock(element, 'blockquote');
    if (block) {
      blocks.push(block);
    }
    return;
  }

  if (tagName === 'ul' || tagName === 'ol') {
    const listItem = tagName === 'ol' ? 'number' : 'bullet';
    for (const child of element.children) {
      if (child.tagName.toLowerCase() !== 'li') {
        continue;
      }

      const block = createTextBlock(child, 'normal', {
        listItem,
        level,
      });

      if (block) {
        blocks.push(block);
      }

      for (const nestedChild of child.children) {
        const nestedTag = nestedChild.tagName.toLowerCase();
        if (nestedTag === 'ul' || nestedTag === 'ol') {
          appendBlocksFromNode(nestedChild, blocks, level + 1);
        }
      }
    }
    return;
  }

  for (const child of element.childNodes) {
    appendBlocksFromNode(child, blocks, level);
  }
}

function htmlToPortableText(html: string): PortableTextBlockWithLists[] {
  const normalizedHtml = normalizeText(html);
  if (!normalizedHtml) {
    return [];
  }

  const dom = new JSDOM(`<body>${normalizedHtml}</body>`);
  const blocks: PortableTextBlockWithLists[] = [];

  for (const child of dom.window.document.body.childNodes) {
    appendBlocksFromNode(child, blocks, 1);
  }

  return blocks;
}

function normalizeArticleSource(source: RawArticle): SanityImportDocument {
  const title = normalizeText(source.title);
  const contentHtml = normalizeText(source.content);
  const excerpt = normalizeText(source.excerpt) || stripHtml(contentHtml).slice(0, 160);
  const publishDate = toIsoDate(source.publishDate) || new Date().toISOString();
  const slug = normalizeText(source.slug) || slugifyValue(title);
  const status = normalizeText(source.status) === 'archived' ? 'archived' : 'published';

  return {
    _id: `article.${slug}`,
    _type: 'article',
    title,
    slug: {
      _type: 'slug',
      current: slug,
    },
    excerpt,
    category: normalizeText(source.category) || 'Career Guides',
    tags: Array.isArray(source.tags)
      ? source.tags.map((tag) => normalizeText(tag)).filter(Boolean)
      : [],
    status,
    publishDate,
    lastUpdatedDate: toIsoDate(source.lastUpdatedDate) || publishDate,
    author: normalizeText(source.author) || 'Editorial Team',
    metaTitle: normalizeText(source.metaTitle) || `${title} | theuaecareer.com`,
    metaDescription: normalizeText(source.metaDescription) || excerpt,
    content: htmlToPortableText(contentHtml),
    legacyReadTime:
      typeof source.readTime === 'number' && source.readTime > 0
        ? source.readTime
        : calculateReadTime(contentHtml),
  };
}

function normalizeJobSource(source: RawJob): SanityImportDocument {
  const title = normalizeText(source.title);
  const companyName = normalizeText(source.companyName) || 'Confidential Company';
  const categoryInfo = mapJobCategory(normalizeText(source.category));
  const descriptionHtml = normalizeText(source.description);
  const howToApplyHtml = normalizeText(source.howToApply);
  const slug =
    normalizeText(source.slug) || slugifyValue(`${title}-${companyName}-${source.location?.city || 'job'}`);
  const postedDate = toIsoDate(source.postedDate) || new Date().toISOString();
  const expiryDate = toIsoDate(source.expiryDate);
  const salaryRange = parseSalaryRange(source.salaryRange);
  const isWalkIn = Boolean(source.isWalkIn);
  const walkInDetails = parseWalkInDetails(source.walkInDetails);
  const status =
    normalizeText(source.status) === 'expired' ||
    (expiryDate ? new Date(expiryDate).getTime() < Date.now() : false)
      ? 'expired'
      : 'active';

  return {
    _id: `job.${slug}`,
    _type: 'job',
    title,
    companyName,
    slug: {
      _type: 'slug',
      current: slug,
    },
    location: {
      city: normalizeText(source.location?.city) || 'Dubai',
      country: normalizeText(source.location?.country) || 'UAE',
    },
    jobType: normalizeText(source.jobType) || 'Full-time',
    salaryRange,
    experienceRequired: normalizeText(source.experienceRequired) || 'Not specified',
    category: categoryInfo.category,
    categoryLabel: categoryInfo.categoryLabel,
    description: htmlToPortableText(descriptionHtml),
    howToApply: htmlToPortableText(howToApplyHtml),
    postedDate,
    expiryDate,
    isWalkIn,
    walkInDetails,
    status,
    metaTitle:
      normalizeText(source.metaTitle) ||
      `${title} in ${normalizeText(source.location?.city) || 'Dubai'} | theuaecareer.com`,
    metaDescription:
      normalizeText(source.metaDescription) || stripHtml(descriptionHtml).slice(0, 160),
  };
}

function dedupeBySlug<T extends { slug?: string }>(items: T[]): T[] {
  const map = new Map<string, T>();

  for (const item of items) {
    const slug = normalizeText(item.slug);
    if (slug) {
      map.set(slug, item);
    }
  }

  return [...map.values()];
}

async function getDatabaseContent() {
  if (!isDatabaseConfigured()) {
    return { articles: [] as RawArticle[], jobs: [] as RawJob[], enabled: false };
  }

  try {
    await dbConnect();
    const [articles, jobs] = await Promise.all([
      Article.find({}).sort({ publishDate: -1 }).lean<RawArticle[]>(),
      Job.find({}).sort({ postedDate: -1 }).lean<RawJob[]>(),
    ]);

    return {
      articles,
      jobs,
      enabled: true,
    };
  } catch (error) {
    console.warn('Could not read MongoDB content, falling back to launch content.');
    console.warn(error);
    return { articles: [] as RawArticle[], jobs: [] as RawJob[], enabled: false };
  }
}

async function resolveContentSources(mode: SourceMode) {
  const launch = {
    articles: launchArticles as RawArticle[],
    jobs: launchJobs as RawJob[],
  };

  if (mode === 'launch') {
    return {
      sourceLabel: 'launch content only',
      articles: launch.articles,
      jobs: launch.jobs,
    };
  }

  const database = await getDatabaseContent();

  if (mode === 'database') {
    return {
      sourceLabel: database.enabled ? 'database only' : 'launch fallback (database unavailable)',
      articles: database.enabled ? database.articles : launch.articles,
      jobs: database.enabled ? database.jobs : launch.jobs,
    };
  }

  if (database.enabled && (database.articles.length > 0 || database.jobs.length > 0)) {
    return {
      sourceLabel: 'database merged over launch content',
      articles: dedupeBySlug([...launch.articles, ...database.articles]),
      jobs: dedupeBySlug([...launch.jobs, ...database.jobs]),
    };
  }

  return {
    sourceLabel: 'launch fallback (no database content found)',
    articles: launch.articles,
    jobs: launch.jobs,
  };
}

async function main() {
  const { sourceLabel, articles, jobs } = await resolveContentSources(sourceMode);
  const articleDocs = articles.map(normalizeArticleSource);
  const jobDocs = jobs.map(normalizeJobSource);
  const siteSettingsDoc: SanityImportDocument = {
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteTitle: SITE_NAME,
    siteTagline: SITE_TAGLINE,
    siteDescription: SITE_DESCRIPTION,
    metaTitle: `${SITE_NAME} | ${SITE_TAGLINE}`,
    metaDescription: SITE_DESCRIPTION,
  };

  console.log(`Sanity import source: ${sourceLabel}`);
  console.log(`Articles prepared: ${articleDocs.length}`);
  console.log(`Jobs prepared: ${jobDocs.length}`);
  console.log(`Dry run: ${dryRun ? 'yes' : 'no'}`);

  if (dryRun) {
    console.log('First article preview:', JSON.stringify(articleDocs[0], null, 2));
    console.log('First job preview:', JSON.stringify(jobDocs[0], null, 2));
    return;
  }

  const allDocuments: SanityImportDocument[] = [...articleDocs, ...jobDocs, siteSettingsDoc];
  const batchSize = 20;

  for (let index = 0; index < allDocuments.length; index += batchSize) {
    const batch = allDocuments.slice(index, index + batchSize);
    let transaction = sanityClient.transaction();

    for (const document of batch) {
      transaction = transaction.createOrReplace(document);
    }

    await transaction.commit();
    console.log(`Imported ${Math.min(index + batch.length, allDocuments.length)} of ${allDocuments.length}`);
  }

  console.log('Sanity import finished successfully.');
}

main().catch((error) => {
  console.error('Sanity import failed.');
  console.error(error);
  process.exit(1);
});
