import type { MetadataRoute } from 'next';
import { getAllPublicArticles, getAllPublicJobs } from '@/lib/content';
import { SITE_URL } from '@/lib/constants';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, jobs] = await Promise.all([getAllPublicArticles(), getAllPublicJobs()]);
  const staticRoutes: MetadataRoute.Sitemap = [
    { path: '/', lastModified: '2026-04-22', changeFrequency: 'daily', priority: 1 },
    { path: '/about/', lastModified: '2026-04-09', changeFrequency: 'monthly', priority: 0.5 },
    { path: '/blog/', lastModified: '2026-04-22', changeFrequency: 'daily', priority: 0.9 },
    { path: '/contact/', lastModified: '2026-04-09', changeFrequency: 'monthly', priority: 0.4 },
    { path: '/jobs/', lastModified: '2026-04-22', changeFrequency: 'daily', priority: 0.9 },
    { path: '/jobs/walk-in/', lastModified: '2026-04-22', changeFrequency: 'daily', priority: 0.9 },
    { path: '/privacy-policy/', lastModified: '2026-04-09', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/resources/', lastModified: '2026-04-15', changeFrequency: 'weekly', priority: 0.7 },
    { path: '/resources/interview-question-bank/', lastModified: '2026-04-15', changeFrequency: 'weekly', priority: 0.7 },
    { path: '/terms-of-service/', lastModified: '2026-04-09', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/disclaimer/', lastModified: '2026-04-09', changeFrequency: 'yearly', priority: 0.3 },
    { path: '/tools/cv-maker/', lastModified: '2026-04-15', changeFrequency: 'monthly', priority: 0.8 },
    { path: '/tools/currency-converter/', lastModified: '2026-04-15', changeFrequency: 'monthly', priority: 0.7 },
    { path: '/tools/gratuity-calculator/', lastModified: '2026-04-15', changeFrequency: 'monthly', priority: 0.7 },
  ].map(({ path, lastModified, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(lastModified),
    changeFrequency: changeFrequency as MetadataRoute.Sitemap[number]['changeFrequency'],
    priority,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
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
