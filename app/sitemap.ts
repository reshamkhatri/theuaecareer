import type { MetadataRoute } from 'next';
import { getAllPublicArticles, getAllPublicJobs } from '@/lib/content';
import { SITE_URL } from '@/lib/constants';

export const dynamic = 'force-static';

// Old article slugs that now 301-redirect via public/_redirects. They must
// NOT appear in the sitemap — listing redirected URLs wastes Google's crawl
// budget and triggers "Page with redirect" coverage warnings in Search Console.
// Keep this list in sync with public/_redirects.
const REDIRECTED_ARTICLE_SLUGS = new Set<string>([
  'what-to-carry-for-walk-in-interview-uae',
  'top-in-demand-jobs-uae-2026',
]);

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, jobs] = await Promise.all([getAllPublicArticles(), getAllPublicJobs()]);

  // Use build-time `now` so pages that change frequently always advertise a
  // fresh lastmod to Googlebot. Pages that genuinely change less often pin to
  // an older date so we don't lie to Google about freshness.
  const now = new Date();
  const stablePolicyDate = new Date('2026-04-09'); // legal/policy pages — only update when text changes
  const stableContentDate = new Date('2026-04-15'); // long-lived tool/resource pages

  const staticRoutes: MetadataRoute.Sitemap = [
    { path: '/', lastModified: now, changeFrequency: 'daily', priority: 1 },
    { path: '/about/', lastModified: stableContentDate, changeFrequency: 'monthly', priority: 0.5 },
    { path: '/blog/', lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { path: '/contact/', lastModified: stablePolicyDate, changeFrequency: 'monthly', priority: 0.4 },
    { path: '/jobs/', lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { path: '/jobs/walk-in/', lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { path: '/privacy-policy/', lastModified: stablePolicyDate, changeFrequency: 'yearly', priority: 0.3 },
    { path: '/resources/', lastModified: stableContentDate, changeFrequency: 'weekly', priority: 0.7 },
    { path: '/resources/interview-question-bank/', lastModified: stableContentDate, changeFrequency: 'weekly', priority: 0.7 },
    { path: '/terms-of-service/', lastModified: stablePolicyDate, changeFrequency: 'yearly', priority: 0.3 },
    { path: '/disclaimer/', lastModified: stablePolicyDate, changeFrequency: 'yearly', priority: 0.3 },
    { path: '/tools/cv-maker/', lastModified: stableContentDate, changeFrequency: 'monthly', priority: 0.8 },
    { path: '/tools/currency-converter/', lastModified: stableContentDate, changeFrequency: 'monthly', priority: 0.7 },
    { path: '/tools/gratuity-calculator/', lastModified: stableContentDate, changeFrequency: 'monthly', priority: 0.7 },
  ].map(({ path, lastModified, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified,
    changeFrequency: changeFrequency as MetadataRoute.Sitemap[number]['changeFrequency'],
    priority,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles
    .filter((article) => !REDIRECTED_ARTICLE_SLUGS.has(article.slug))
    .map((article) => ({
      url: `${SITE_URL}/blog/${article.slug}/`,
      lastModified: article.lastUpdatedDate ? new Date(article.lastUpdatedDate) : new Date(article.publishDate),
      changeFrequency: 'weekly',
      priority: 0.8,
    }));

  const jobRoutes: MetadataRoute.Sitemap = jobs.map((job) => ({
    url: `${SITE_URL}/jobs/${job.slug}/`,
    lastModified: new Date(job.postedDate),
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  return [...staticRoutes, ...articleRoutes, ...jobRoutes];
}
