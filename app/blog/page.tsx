import type { Metadata } from 'next';
import BlogListingClient from '@/components/BlogListingClient';
import { SITE_URL } from '@/lib/constants';
import { getAllPublicArticles } from '@/lib/content';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'UAE Career Blog & Guides',
  description:
    'Read practical Gulf career guides on UAE salaries, visa steps, safer applications, walk-in interviews, and interview prep for Gulf job seekers.',
  alternates: {
    canonical: '/blog/',
  },
  openGraph: {
    title: 'UAE Career Blog & Guides',
    description:
      'Read practical Gulf career guides on UAE salaries, visa steps, safer applications, walk-in interviews, and interview prep for Gulf job seekers.',
    url: '/blog/',
  },
};

export default async function BlogListingPage() {
  const articles = await getAllPublicArticles();
  const blogCollectionJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Career Blog',
    description:
      'Career guides, salary explainers, visa articles, and hiring updates for Gulf job seekers.',
    url: `${SITE_URL}/blog/`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: articles.slice(0, 12).map((article, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE_URL}/blog/${article.slug}/`,
        name: article.title,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogCollectionJsonLd) }}
      />
      <BlogListingClient initialArticles={articles} />
    </>
  );
}
