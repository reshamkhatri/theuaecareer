import type { ArticleRecord, JobRecord } from './types.ts';

export type SeoCountry = 'UAE' | 'Saudi Arabia' | 'Qatar' | 'Gulf';
export type SeoRoleFamily =
  | 'walk-in'
  | 'hotel-hospitality'
  | 'retail'
  | 'warehouse-logistics'
  | 'driver-transport'
  | 'salary-benefits'
  | 'visa-documents'
  | 'cv-application'
  | 'job-safety'
  | 'general';
export type SeoIntentCluster =
  | 'walk-in-prep'
  | 'application-workflow'
  | 'role-interview-prep'
  | 'salary-remittance-benefits'
  | 'job-trust-safety';
export type SeoSearchStage = 'discover' | 'prepare' | 'apply' | 'compare';
export type SeoSurface = 'homepage' | 'blog' | 'jobs' | 'resources' | 'tools';

export interface SeoTargeting {
  country: SeoCountry;
  roleFamily: SeoRoleFamily;
  intentCluster: SeoIntentCluster;
  searchStage: SeoSearchStage;
}

export interface ArticleHeading {
  id: string;
  title: string;
  level: number;
}

export interface DecoratedArticleHtml {
  html: string;
  headings: ArticleHeading[];
}

export interface SeoPathwayLink {
  href: string;
  title: string;
  description: string;
  surfaces: SeoSurface[];
  countries?: SeoCountry[];
  roleFamilies?: SeoRoleFamily[];
  intentClusters?: SeoIntentCluster[];
  searchStages?: SeoSearchStage[];
  priority?: number;
}

function normalizeText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function stripHtml(value: string): string {
  return normalizeText(value.replace(/<[^>]+>/g, ' ')).replace(/\s+/g, ' ').trim();
}

function getMeaningfulTokens(value: string, limit = 12): string[] {
  return Array.from(
    new Set(
      normalizeText(value)
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .filter((token) => token.length >= 3)
    )
  ).slice(0, limit);
}

function countTokenOverlap(left: string, right: string): number {
  const leftTokens = new Set(getMeaningfulTokens(left, 18));
  const rightTokens = getMeaningfulTokens(right, 18);

  return rightTokens.reduce((score, token) => score + Number(leftTokens.has(token)), 0);
}

function detectCountry(value: string): SeoCountry {
  const lower = value.toLowerCase();

  if (lower.includes('saudi')) return 'Saudi Arabia';
  if (lower.includes('qatar') || lower.includes('doha')) return 'Qatar';
  if (
    lower.includes('uae') ||
    lower.includes('dubai') ||
    lower.includes('abu dhabi') ||
    lower.includes('sharjah')
  ) {
    return 'UAE';
  }

  return 'Gulf';
}

function detectRoleFamily(value: string): SeoRoleFamily {
  const lower = value.toLowerCase();

  if (lower.includes('walk-in')) return 'walk-in';
  if (
    lower.includes('hotel') ||
    lower.includes('hospitality') ||
    lower.includes('housekeeping') ||
    lower.includes('front office') ||
    lower.includes('f&b')
  ) {
    return 'hotel-hospitality';
  }
  if (
    lower.includes('cashier') ||
    lower.includes('retail') ||
    lower.includes('sales associate') ||
    lower.includes('merchandise')
  ) {
    return 'retail';
  }
  if (lower.includes('warehouse') || lower.includes('logistics')) return 'warehouse-logistics';
  if (lower.includes('driver') || lower.includes('transport') || lower.includes('chauffeur')) {
    return 'driver-transport';
  }
  if (
    lower.includes('salary') ||
    lower.includes('gratuity') ||
    lower.includes('remittance') ||
    lower.includes('currency')
  ) {
    return 'salary-benefits';
  }
  if (lower.includes('visa') || lower.includes('document') || lower.includes('offer')) {
    return 'visa-documents';
  }
  if (
    lower.includes('cv') ||
    lower.includes('career page') ||
    lower.includes('apply') ||
    lower.includes('application')
  ) {
    return 'cv-application';
  }
  if (lower.includes('fake') || lower.includes('fraud') || lower.includes('scam') || lower.includes('safe')) {
    return 'job-safety';
  }

  return 'general';
}

function detectIntentCluster(value: string): SeoIntentCluster {
  const lower = value.toLowerCase();

  if (lower.includes('walk-in') || lower.includes('self introduction')) return 'walk-in-prep';
  if (lower.includes('interview') || lower.includes('question')) return 'role-interview-prep';
  if (
    lower.includes('salary') ||
    lower.includes('gratuity') ||
    lower.includes('remittance') ||
    lower.includes('currency')
  ) {
    return 'salary-remittance-benefits';
  }
  if (
    lower.includes('apply') ||
    lower.includes('document') ||
    lower.includes('career page') ||
    lower.includes('cv format') ||
    lower.includes('official page')
  ) {
    return 'application-workflow';
  }

  return 'job-trust-safety';
}

function detectSearchStage(value: string): SeoSearchStage {
  const lower = value.toLowerCase();

  if (lower.includes('salary') || lower.includes('rate') || lower.includes('compare')) return 'compare';
  if (lower.includes('apply') || lower.includes('document') || lower.includes('offer') || lower.includes('cv')) {
    return 'apply';
  }
  if (lower.includes('interview') || lower.includes('walk-in') || lower.includes('question')) {
    return 'prepare';
  }

  return 'discover';
}

export function deriveArticleTargeting(article: ArticleRecord): SeoTargeting {
  const haystack = [
    article.slug,
    article.title,
    article.category,
    article.tags.join(' '),
    article.excerpt,
  ].join(' ');

  return {
    country: detectCountry(haystack),
    roleFamily: detectRoleFamily(haystack),
    intentCluster: detectIntentCluster(haystack),
    searchStage: detectSearchStage(haystack),
  };
}

export function deriveJobTargeting(job: JobRecord): SeoTargeting {
  const haystack = [
    job.title,
    job.companyName,
    job.category,
    job.categoryLabel || '',
    job.location.city,
    job.location.country,
    stripHtml(job.description),
  ].join(' ');

  const roleFamily = detectRoleFamily(haystack);

  return {
    country: detectCountry(haystack),
    roleFamily,
    intentCluster:
      roleFamily === 'salary-benefits'
        ? 'salary-remittance-benefits'
        : roleFamily === 'job-safety'
          ? 'job-trust-safety'
          : roleFamily === 'walk-in'
            ? 'walk-in-prep'
            : roleFamily === 'warehouse-logistics' ||
                roleFamily === 'visa-documents' ||
                roleFamily === 'cv-application'
              ? 'application-workflow'
              : 'role-interview-prep',
    searchStage: job.isWalkIn ? 'prepare' : 'apply',
  };
}

const pathwayCatalog: SeoPathwayLink[] = [
  {
    href: '/jobs/walk-in/',
    title: 'See live walk-in interviews',
    description: 'Start with current walk-in openings if you want the fastest route to in-person hiring.',
    surfaces: ['homepage', 'blog', 'jobs', 'resources'],
    countries: ['UAE', 'Gulf'],
    roleFamilies: ['walk-in', 'general'],
    intentClusters: ['walk-in-prep', 'application-workflow'],
    searchStages: ['discover', 'prepare', 'apply'],
    priority: 9,
  },
  {
    href: '/resources/interview-question-bank/',
    title: 'Practice interview answers',
    description: 'Use role-based Gulf interview questions and sample answers before your next screening.',
    surfaces: ['homepage', 'blog', 'jobs', 'resources', 'tools'],
    countries: ['UAE', 'Saudi Arabia', 'Qatar', 'Gulf'],
    roleFamilies: ['hotel-hospitality', 'retail', 'driver-transport', 'general'],
    intentClusters: ['walk-in-prep', 'role-interview-prep', 'application-workflow'],
    searchStages: ['discover', 'prepare', 'apply'],
    priority: 8,
  },
  {
    href: '/tools/cv-maker/',
    title: 'Upgrade your CV',
    description: 'Build a cleaner Gulf-ready CV before you send your next application.',
    surfaces: ['homepage', 'blog', 'jobs', 'resources', 'tools'],
    countries: ['UAE', 'Saudi Arabia', 'Qatar', 'Gulf'],
    roleFamilies: ['cv-application', 'general', 'hotel-hospitality', 'warehouse-logistics', 'retail'],
    intentClusters: ['walk-in-prep', 'application-workflow', 'role-interview-prep'],
    searchStages: ['discover', 'prepare', 'apply'],
    priority: 7,
  },
  {
    href: '/tools/currency-converter/',
    title: 'Compare remittance value',
    description: 'Check live Gulf remittance reference rates before you compare salary offers or send money home.',
    surfaces: ['homepage', 'blog', 'jobs', 'resources', 'tools'],
    countries: ['UAE', 'Saudi Arabia', 'Qatar', 'Gulf'],
    roleFamilies: ['salary-benefits', 'general'],
    intentClusters: ['salary-remittance-benefits'],
    searchStages: ['discover', 'compare', 'apply'],
    priority: 6,
  },
  {
    href: '/tools/gratuity-calculator/',
    title: 'Estimate gratuity',
    description: 'Use the calculator when you need the real end-of-service value of an offer or exit.',
    surfaces: ['blog', 'jobs', 'resources', 'tools'],
    countries: ['UAE', 'Gulf'],
    roleFamilies: ['salary-benefits', 'general'],
    intentClusters: ['salary-remittance-benefits'],
    searchStages: ['compare', 'apply'],
    priority: 5,
  },
  {
    href: '/blog/what-to-carry-for-walk-in-interview-in-uae/',
    title: 'Walk-in interview document checklist',
    description: 'Use a simple packing checklist before you travel for a UAE walk-in interview.',
    surfaces: ['homepage', 'blog', 'jobs', 'resources'],
    countries: ['UAE', 'Gulf'],
    roleFamilies: ['walk-in', 'general'],
    intentClusters: ['walk-in-prep'],
    searchStages: ['discover', 'prepare'],
    priority: 8,
  },
  {
    href: '/blog/self-introduction-for-walk-in-interview-in-uae/',
    title: 'Self-introduction sample for walk-ins',
    description: 'Practice a short introduction that sounds prepared without feeling memorized.',
    surfaces: ['homepage', 'blog', 'jobs', 'resources'],
    countries: ['UAE', 'Gulf'],
    roleFamilies: ['walk-in', 'general'],
    intentClusters: ['walk-in-prep'],
    searchStages: ['prepare'],
    priority: 7,
  },
  {
    href: '/blog/how-to-apply-for-dubai-hotel-jobs-through-official-career-pages-2026/',
    title: 'Apply through official hotel career pages',
    description: 'See the safer way to target Dubai hotel jobs without wasting time on recycled postings.',
    surfaces: ['homepage', 'blog', 'jobs', 'resources'],
    countries: ['UAE', 'Gulf'],
    roleFamilies: ['hotel-hospitality', 'cv-application'],
    intentClusters: ['application-workflow'],
    searchStages: ['discover', 'apply'],
    priority: 8,
  },
  {
    href: '/blog/how-to-apply-for-warehouse-jobs-in-saudi-arabia-safely/',
    title: 'Apply for Saudi warehouse jobs safely',
    description: 'Use a safer checklist before you send documents for logistics or warehouse roles in Saudi Arabia.',
    surfaces: ['homepage', 'blog', 'jobs', 'resources'],
    countries: ['Saudi Arabia', 'Gulf'],
    roleFamilies: ['warehouse-logistics', 'job-safety', 'cv-application'],
    intentClusters: ['application-workflow', 'job-trust-safety'],
    searchStages: ['discover', 'apply'],
    priority: 8,
  },
  {
    href: '/blog/documents-required-after-getting-a-saudi-job-offer/',
    title: 'Prepare documents after a Saudi job offer',
    description: 'Understand the paperwork candidates are usually asked to prepare after shortlisting or offer stage.',
    surfaces: ['blog', 'jobs', 'resources'],
    countries: ['Saudi Arabia', 'Gulf'],
    roleFamilies: ['visa-documents', 'cv-application', 'general'],
    intentClusters: ['application-workflow', 'job-trust-safety'],
    searchStages: ['apply'],
    priority: 7,
  },
  {
    href: '/blog/cashier-interview-questions-for-saudi-retail-jobs/',
    title: 'Cashier interview questions for Saudi retail jobs',
    description: 'Practice the questions employers usually ask for cashier and counter roles in Saudi retail.',
    surfaces: ['blog', 'jobs', 'resources'],
    countries: ['Saudi Arabia', 'Gulf'],
    roleFamilies: ['retail'],
    intentClusters: ['role-interview-prep'],
    searchStages: ['prepare', 'apply'],
    priority: 7,
  },
  {
    href: '/blog/housekeeping-interview-questions-for-qatar-hotel-jobs/',
    title: 'Housekeeping interview questions for Qatar hotel jobs',
    description: 'Use practical sample answers before hotel housekeeping interviews in Qatar.',
    surfaces: ['homepage', 'blog', 'jobs', 'resources'],
    countries: ['Qatar', 'Gulf'],
    roleFamilies: ['hotel-hospitality'],
    intentClusters: ['role-interview-prep'],
    searchStages: ['prepare', 'apply'],
    priority: 8,
  },
  {
    href: '/blog/driver-interview-questions-in-qatar/',
    title: 'Driver interview questions in Qatar',
    description: 'Prepare for guest transport, route knowledge, and safety questions before driver interviews in Qatar.',
    surfaces: ['homepage', 'blog', 'jobs', 'resources'],
    countries: ['Qatar', 'Gulf'],
    roleFamilies: ['driver-transport'],
    intentClusters: ['role-interview-prep'],
    searchStages: ['prepare', 'apply'],
    priority: 7,
  },
  {
    href: '/blog/cleaner-salary-in-uae/',
    title: 'Cleaner salary in UAE',
    description: 'Check what changes the real value of cleaner offers in the UAE beyond the headline number.',
    surfaces: ['homepage', 'blog', 'jobs', 'resources'],
    countries: ['UAE', 'Gulf'],
    roleFamilies: ['salary-benefits', 'general'],
    intentClusters: ['salary-remittance-benefits'],
    searchStages: ['discover', 'compare'],
    priority: 7,
  },
  {
    href: '/blog/how-to-avoid-fake-job-offers-in-uae-saudi-qatar/',
    title: 'Avoid fake job offers in the Gulf',
    description: 'Use a quick trust checklist before you pay money or share sensitive documents.',
    surfaces: ['homepage', 'blog', 'jobs', 'resources'],
    countries: ['UAE', 'Saudi Arabia', 'Qatar', 'Gulf'],
    roleFamilies: ['job-safety', 'general'],
    intentClusters: ['job-trust-safety', 'application-workflow'],
    searchStages: ['discover', 'apply'],
    priority: 8,
  },
  {
    href: '/blog/difference-between-walk-in-interview-and-online-application-in-gulf-jobs/',
    title: 'Walk-in vs online application',
    description: 'Understand when to show up in person and when an official online application is the better route.',
    surfaces: ['blog', 'jobs', 'resources'],
    countries: ['UAE', 'Saudi Arabia', 'Qatar', 'Gulf'],
    roleFamilies: ['walk-in', 'cv-application', 'general'],
    intentClusters: ['walk-in-prep', 'application-workflow', 'job-trust-safety'],
    searchStages: ['discover', 'prepare', 'apply'],
    priority: 6,
  },
  {
    href: '/blog/best-cv-format-for-uae-saudi-qatar-job-applications/',
    title: 'Best CV format for Gulf job applications',
    description: 'Use a cleaner, simpler CV structure for UAE, Saudi, and Qatar applications.',
    surfaces: ['blog', 'jobs', 'resources', 'tools'],
    countries: ['UAE', 'Saudi Arabia', 'Qatar', 'Gulf'],
    roleFamilies: ['cv-application', 'general'],
    intentClusters: ['application-workflow'],
    searchStages: ['discover', 'apply'],
    priority: 7,
  },
];

function scoreTargetingMatch(
  targeting: SeoTargeting,
  link: SeoPathwayLink,
  surface?: SeoSurface
): number {
  if (surface && !link.surfaces.includes(surface)) {
    return Number.NEGATIVE_INFINITY;
  }

  let score = link.priority ?? 0;

  if (!link.countries || link.countries.includes(targeting.country) || link.countries.includes('Gulf')) {
    score += 3;
  }
  if (!link.roleFamilies || link.roleFamilies.includes(targeting.roleFamily) || link.roleFamilies.includes('general')) {
    score += 4;
  }
  if (!link.intentClusters || link.intentClusters.includes(targeting.intentCluster)) {
    score += 5;
  }
  if (!link.searchStages || link.searchStages.includes(targeting.searchStage)) {
    score += 2;
  }

  return score;
}

export function getSeoPathwaysForTargeting(
  targeting: SeoTargeting,
  options: { limit?: number; surface?: SeoSurface; excludeHrefs?: string[] } = {}
): SeoPathwayLink[] {
  const { limit = 4, surface, excludeHrefs = [] } = options;
  const blocked = new Set(excludeHrefs.map((href) => normalizeText(href)));

  return pathwayCatalog
    .filter((link) => !blocked.has(normalizeText(link.href)))
    .map((link) => ({
      link,
      score: scoreTargetingMatch(targeting, link, surface),
    }))
    .filter(({ score }) => Number.isFinite(score))
    .sort((left, right) => {
      if (right.score !== left.score) {
        return right.score - left.score;
      }

      return left.link.title.localeCompare(right.link.title);
    })
    .slice(0, limit)
    .map(({ link }) => link);
}

export function buildArticleTakeaways(article: ArticleRecord): string[] {
  const targeting = deriveArticleTargeting(article);

  switch (targeting.intentCluster) {
    case 'walk-in-prep':
      return [
        'Carry printed CV copies, passport and visa copies, and one recent photo before you leave for the venue.',
        'Prepare a short self-introduction that names your role, experience, and availability in 20 to 30 seconds.',
        'Reach early and verify the timing, location, and employer details before you travel.',
      ];
    case 'application-workflow':
      return [
        'Apply on official employer pages whenever possible instead of relying only on reposted job-board links.',
        'Match your CV wording to the employer job description so the recruiter can see the fit quickly.',
        'Keep your documents and follow-up details organized so you can move fast after shortlisting.',
      ];
    case 'role-interview-prep':
      return [
        'Use short examples from your own experience instead of memorizing generic interview answers.',
        'Practice answers about service, safety, teamwork, and shift discipline because these themes repeat across Gulf hiring.',
        'Mirror the language of the role you want so your answers sound relevant, not vague.',
      ];
    case 'salary-remittance-benefits':
      return [
        'Compare job offers using take-home value, accommodation support, overtime, and remittance costs, not just the headline salary.',
        'Check the practical monthly value of the role before you accept or reject an offer.',
        'Use live remittance and gratuity tools to understand the real financial difference between offers.',
      ];
    default:
      return [
        'Verify the employer and role details before you share sensitive documents or travel for an interview.',
        'Keep job references, contact details, and application history in one place so you can spot inconsistencies quickly.',
        'Never pay money to get shortlisted, interviewed, or hired for a Gulf role.',
      ];
  }
}

function articleSimilarityHaystack(article: ArticleRecord): string {
  return [
    article.title,
    article.excerpt,
    article.category,
    article.tags.join(' '),
    stripHtml(article.content).slice(0, 1200),
  ].join(' ');
}

function jobSimilarityHaystack(job: JobRecord): string {
  return [
    job.title,
    job.companyName,
    job.category,
    job.categoryLabel || '',
    job.location.city,
    job.location.country,
    stripHtml(job.description).slice(0, 1000),
  ].join(' ');
}

export function scoreRelatedArticlePair(source: ArticleRecord, candidate: ArticleRecord): number {
  if (source.slug === candidate.slug) {
    return Number.NEGATIVE_INFINITY;
  }

  const sourceTargeting = deriveArticleTargeting(source);
  const candidateTargeting = deriveArticleTargeting(candidate);
  let score = 0;

  if (sourceTargeting.intentCluster === candidateTargeting.intentCluster) score += 8;
  if (sourceTargeting.roleFamily === candidateTargeting.roleFamily) score += 6;
  if (sourceTargeting.country === candidateTargeting.country) score += 4;
  if (sourceTargeting.searchStage === candidateTargeting.searchStage) score += 2;
  if (source.category === candidate.category) score += 2;

  score += countTokenOverlap(
    [source.title, source.tags.join(' '), source.excerpt].join(' '),
    [candidate.title, candidate.tags.join(' '), candidate.excerpt].join(' ')
  );

  return score;
}

export function scoreJobForArticleTargeting(article: ArticleRecord, job: JobRecord): number {
  const articleTargeting = deriveArticleTargeting(article);
  const jobTargeting = deriveJobTargeting(job);
  const articleHaystack = articleSimilarityHaystack(article);
  const jobHaystack = jobSimilarityHaystack(job);
  let score = 0;

  if (articleTargeting.intentCluster === jobTargeting.intentCluster) score += 6;
  if (articleTargeting.roleFamily === jobTargeting.roleFamily) score += 7;
  if (articleTargeting.country === jobTargeting.country || articleTargeting.country === 'Gulf') score += 4;
  if (articleTargeting.searchStage === 'prepare' && jobTargeting.searchStage === 'apply') score += 2;
  if (job.isWalkIn && articleTargeting.intentCluster === 'walk-in-prep') score += 4;

  score += countTokenOverlap(articleHaystack, jobHaystack);

  return score;
}

export function scoreArticleForJobTargeting(job: JobRecord, article: ArticleRecord): number {
  return scoreJobForArticleTargeting(article, job);
}

function slugifyHeading(value: string): string {
  return normalizeText(value)
    .toLowerCase()
    .replace(/&amp;/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function decorateArticleHtml(html: string): DecoratedArticleHtml {
  const headings: ArticleHeading[] = [];
  const seenIds = new Map<string, number>();

  const nextHtml = html.replace(
    /<h([2-4])>([\s\S]*?)<\/h\1>/gi,
    (_match, levelText: string, innerHtml: string) => {
      const title = stripHtml(innerHtml);
      const baseId = slugifyHeading(title) || `section-${headings.length + 1}`;
      const count = seenIds.get(baseId) || 0;
      const id = count === 0 ? baseId : `${baseId}-${count + 1}`;
      seenIds.set(baseId, count + 1);
      headings.push({ id, title, level: Number(levelText) });
      return `<h${levelText} id="${id}">${innerHtml}</h${levelText}>`;
    }
  );

  return {
    html: nextHtml,
    headings,
  };
}

export function mergeContentBySlug<T>(items: T[], getKey: (item: T) => string): T[] {
  const merged = new Map<string, T>();

  for (const item of items) {
    const key = normalizeText(getKey(item));
    if (key) {
      merged.set(key, item);
    }
  }

  return [...merged.values()];
}
