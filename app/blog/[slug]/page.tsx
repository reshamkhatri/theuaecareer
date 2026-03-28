import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  FiCalendar,
  FiChevronRight,
  FiClock,
  FiFacebook,
  FiTwitter,
} from 'react-icons/fi';
import AdSlot from '@/components/AdSlot';
import ArticleCover from '@/components/ArticleCover';
import CommentsSection from '@/components/CommentsSection';
import CopyLinkButton from '@/components/CopyLinkButton';
import NewsletterForm from '@/components/NewsletterForm';
import { ARTICLE_CATEGORIES, SITE_URL } from '@/lib/constants';
import { formatDisplayDate } from '@/lib/format';
import {
  getAllPublicArticles,
  getArticleByIdentifier,
  getRelatedArticles,
} from '@/lib/content';

export const revalidate = 300;
const articleInlineAdSlot = process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_INLINE_SLOT?.trim();
const articleSidebarAdSlot = process.env.NEXT_PUBLIC_ADSENSE_ARTICLE_SIDEBAR_SLOT?.trim();

function splitArticleHtml(html: string): { firstHalf: string; secondHalf: string } {
  const splitIndex = Math.floor(html.length / 2);
  const insertPoint = html.indexOf('</p>', splitIndex);

  if (insertPoint === -1) {
    return { firstHalf: html, secondHalf: '' };
  }

  return {
    firstHalf: html.slice(0, insertPoint + 4),
    secondHalf: html.slice(insertPoint + 4),
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleByIdentifier(slug);

  if (!article) {
    return {
      title: 'Article Not Found',
    };
  }

  const ogImage = article.featuredImage || `${SITE_URL}/og-default.png`;

  return {
    title: article.metaTitle || `${article.title} | theuaecareer.com`,
    description: article.metaDescription || article.excerpt,
    alternates: {
      canonical: `/blog/${article.slug}`,
    },
    openGraph: {
      title: article.metaTitle || article.title,
      description: article.metaDescription || article.excerpt,
      url: `/blog/${article.slug}`,
      type: 'article',
      publishedTime: article.publishDate,
      modifiedTime: article.lastUpdatedDate || article.publishDate,
      authors: [article.author],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.metaTitle || article.title,
      description: article.metaDescription || article.excerpt,
      images: [ogImage],
    },
  };
}

export async function generateStaticParams() {
  const articles = await getAllPublicArticles();
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleByIdentifier(slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = await getRelatedArticles(article, 2);
  const shareUrl = new URL(`/blog/${article.slug}`, SITE_URL).toString();
  const { firstHalf, secondHalf } = splitArticleHtml(article.content);
  const articleImage = article.featuredImage || `${SITE_URL}/og-default.png`;
  const blogPostingJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: article.title,
    description: article.metaDescription || article.excerpt,
    image: [articleImage],
    author: {
      '@type': 'Person',
      name: article.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'theuaecareer.com',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/icon-512x512.png`,
      },
    },
    datePublished: article.publishDate,
    dateModified: article.lastUpdatedDate || article.publishDate,
    mainEntityOfPage: shareUrl,
    articleSection: article.category,
    keywords: article.tags,
    url: shareUrl,
  };
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: `${SITE_URL}/blog`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: article.title,
        item: shareUrl,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostingJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <section className="section" style={{ paddingTop: 'var(--space-xl)' }}>
        <div className="container blog-layout">
          <main className="blog-main">
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 'var(--space-lg)' }}>
              <Link href="/">Home</Link> <FiChevronRight style={{ display: 'inline', margin: '0 4px' }} />
              <Link href="/blog">Blog</Link> <FiChevronRight style={{ display: 'inline', margin: '0 4px' }} />
              {article.title}
            </div>

            <article className="card article-detail-card" style={{ padding: 'var(--space-2xl)' }}>
              <span className="badge badge-primary" style={{ marginBottom: 'var(--space-md)' }}>
                {article.category}
              </span>

              <h1 className="article-detail-title" style={{ fontSize: 'clamp(2rem, 6vw, 2.5rem)', marginBottom: 'var(--space-lg)' }}>{article.title}</h1>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-lg)',
                  color: 'var(--text-muted)',
                  fontSize: '0.875rem',
                  marginBottom: 'var(--space-2xl)',
                  paddingBottom: 'var(--space-lg)',
                  borderBottom: '1px solid var(--border)',
                  flexWrap: 'wrap',
                }}
              >
                <span>
                  <strong style={{ color: 'var(--text)' }}>By {article.author}</strong>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FiCalendar /> {formatDisplayDate(article.publishDate)}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FiClock /> {article.readTime} min read
                </span>
              </div>

              <ArticleCover article={article} variant="hero" style={{ marginBottom: 'var(--space-2xl)' }} />

              <div className="prose">
                <div dangerouslySetInnerHTML={{ __html: firstHalf }} />
                {secondHalf && <AdSlot slot={articleInlineAdSlot} className="mt-xl" minHeight={280} />}
                {secondHalf && <div dangerouslySetInnerHTML={{ __html: secondHalf }} />}
              </div>

              {article.tags.length > 0 && (
                <div style={{ marginTop: 'var(--space-2xl)', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, marginRight: '8px', alignSelf: 'center' }}>
                    Tagged with:
                  </span>
                  {article.tags.map((tag) => (
                    <span key={tag} className="tag">
                      #{tag}
                    </span>
                  ))}
                </div>
              )}

              <div
                style={{
                  marginTop: 'var(--space-2xl)',
                  paddingTop: 'var(--space-xl)',
                  borderTop: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '12px',
                }}
              >
                <h3 style={{ fontSize: '1.25rem' }}>Share this article</h3>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <Link
                    href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(article.title)}`}
                    className="btn btn-secondary btn-sm"
                    target="_blank"
                  >
                    <FiTwitter /> Share
                  </Link>
                  <Link
                    href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                    className="btn btn-secondary btn-sm"
                    target="_blank"
                  >
                    <FiFacebook /> Share
                  </Link>
                  <CopyLinkButton url={shareUrl} />
                </div>
              </div>
            </article>

            {relatedArticles.length > 0 && (
              <>
                <h2 style={{ fontSize: '1.75rem', marginTop: 'var(--space-3xl)' }}>Related Articles</h2>
                <div className="grid-2 mt-xl">
                  {relatedArticles.map((relatedArticle) => (
                    <div key={relatedArticle._id} className="article-card">
                      <ArticleCover article={relatedArticle} variant="compact" />
                      <div className="article-card-body">
                        <span className="article-card-category">{relatedArticle.category}</span>
                        <h3 className="article-card-title">
                          <Link href={`/blog/${relatedArticle.slug}`}>{relatedArticle.title}</Link>
                        </h3>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            <CommentsSection articleSlug={article.slug} articleTitle={article.title} />
          </main>

          <aside className="blog-sidebar">
            <div className="card">
              <AdSlot slot={articleSidebarAdSlot} minHeight={320} />
            </div>
            <div className="card">
              <h3 style={{ fontSize: '1.125rem', marginBottom: 'var(--space-lg)' }}>Popular Categories</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {ARTICLE_CATEGORIES.map((category, index) => (
                  <li
                    key={category}
                    style={{
                      borderBottom: index !== ARTICLE_CATEGORIES.length - 1 ? '1px solid var(--border)' : 'none',
                      paddingBottom: index !== ARTICLE_CATEGORIES.length - 1 ? '12px' : '0',
                    }}
                  >
                    <Link
                      href={`/blog?category=${encodeURIComponent(category)}`}
                      style={{ color: 'var(--text)', fontWeight: 500, display: 'flex', justifyContent: 'space-between' }}
                    >
                      {category} <FiChevronRight style={{ color: 'var(--text-muted)' }} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="card">
              <h3 style={{ fontSize: '1.125rem', marginBottom: 'var(--space-md)' }}>Subscribe</h3>
              <p style={{ fontSize: '0.875rem', marginBottom: 'var(--space-md)' }}>
                Get the latest Gulf career tips and hiring updates by email.
              </p>
              <NewsletterForm source={`article:${article.slug}`} compact />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
