import type { MetadataRoute } from 'next';
import { getAllPublicArticles, getAllPublicJobs } from '@/lib/content';
import { SITE_URL } from '@/lib/constants';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, jobs] = await Promise.all([getAllPublicArticles(), getAllPublicJobs()]);

  const staticRoutes: MetadataRoute.Sitemap = [
    '',
    '/about',
    '/blog',
    '/contact',
    '/jobs',
    '/jobs/walk-in',
    '/privacy-policy',
    '/terms-of-service',
    '/tools/cv-maker',
    '/tools/gratuity-calculator',
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: new Date(),
    changeFrequency: path === '' ? 'daily' : 'weekly',
    priority: path === '' ? 1 : 0.7,
  }));

  const articleRoutes: MetadataRoute.Sitemap = articles.map((article) => ({
    url: `${SITE_URL}/blog/${article.slug}`,
    lastModified: article.lastUpdatedDate ? new Date(article.lastUpdatedDate) : new Date(article.publishDate),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  const jobRoutes: MetadataRoute.Sitemap = jobs.map((job) => ({
    url: `${SITE_URL}/jobs/${job.slug}`,
    lastModified: new Date(job.postedDate),
    changeFrequency: 'daily',
    priority: 0.9,
  }));

  return [...staticRoutes, ...articleRoutes, ...jobRoutes];
}
