import BlogListingClient from '@/components/BlogListingClient';
import { getAllPublicArticles } from '@/lib/content';

export const revalidate = 300;

export default async function BlogListingPage() {
  const articles = await getAllPublicArticles();

  return <BlogListingClient initialArticles={articles} />;
}
