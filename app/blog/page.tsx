import type { Metadata } from 'next';
import BlogListingClient from '@/components/BlogListingClient';
import { getAllPublicArticles } from '@/lib/content';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Career Blog | UAE Job Market Insights & Guides',
  description:
    'Read expert articles on UAE salaries, visa processes, walk-in interviews, and career advice for Gulf job seekers.',
  alternates: {
    canonical: '/blog/',
  },
  openGraph: {
    title: 'Career Blog | UAE Job Market Insights & Guides',
    description:
      'Read expert articles on UAE salaries, visa processes, walk-in interviews, and career advice for Gulf job seekers.',
    url: '/blog',
  },
};

export default async function BlogListingPage() {
  const articles = await getAllPublicArticles();

  return <BlogListingClient initialArticles={articles} />;
}
