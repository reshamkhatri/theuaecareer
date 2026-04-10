import type { MetadataRoute } from 'next';
import { getAllPublicArticles, getAllPublicJobs } from '@/lib/content';
import { SITE_URL } from '@/lib/constants';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, jobs] = await Promise.all([getAllPublicArticles(), getAllPublicJobs()]);
  const staticLastModified = new Date('2026-04-09T00:00:00.000Z');

  const staticRoutes: MetadataRoute.Sitemap = [
    '/',
    '/about/',
    '/blog/',
    '/contact/',
    '/jobs/',
    '/jobs/walk-in/',
    '/privacy-policy/',
    '/resources/',
    '/resources/interview-question-bank/',
    '/terms-of-service/',
    '/disclaimer/',
    '/tools/cv-maker/',
    '/tools/currency-converter/',
    '/tools/gratuity-calculator/',
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: staticLastModified,
    changeFrequency: path === '/' ? 'daily' : 'weekly',
    priority: path === '/' ? 1 : 0.7,
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
