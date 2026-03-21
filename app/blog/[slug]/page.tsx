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
import AdPlaceholder from '@/components/AdPlaceholder';
import CopyLinkButton from '@/components/CopyLinkButton';
import DisqusThread from '@/components/DisqusThread';
import NewsletterForm from '@/components/NewsletterForm';
import { ARTICLE_CATEGORIES } from '@/lib/constants';
import {
  formatDisplayDate,
  getArticleByIdentifier,
  getRelatedArticles,
} from '@/lib/content';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

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
    },
  };
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
  const shareUrl = new URL(`/blog/${article.slug}`, siteUrl).toString();
  const { firstHalf, secondHalf } = splitArticleHtml(article.content);
  const hasDisqus = Boolean(process.env.NEXT_PUBLIC_DISQUS_SHORTNAME);

  return (
    <>
      <div className="container" style={{ marginTop: 'var(--space-xl)' }}>
        <AdPlaceholder format="leaderboard" label="Top Article Ad" />
      </div>

      <section className="section" style={{ paddingTop: 'var(--space-xl)' }}>
        <div className="container blog-layout">
          <main className="blog-main">
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 'var(--space-lg)' }}>
              <Link href="/">Home</Link> <FiChevronRight style={{ display: 'inline', margin: '0 4px' }} />
              <Link href="/blog">Blog</Link> <FiChevronRight style={{ display: 'inline', margin: '0 4px' }} />
              {article.category}
            </div>

            <article className="card" style={{ padding: 'var(--space-2xl)' }}>
              <span className="badge badge-primary" style={{ marginBottom: 'var(--space-md)' }}>
                {article.category}
              </span>

              <h1 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-lg)' }}>{article.title}</h1>

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

              <div className="prose">
                <div dangerouslySetInnerHTML={{ __html: firstHalf }} />
                <div style={{ margin: 'var(--space-2xl) 0' }}>
                  <AdPlaceholder format="fluid" label="In-Article Ad" />
                </div>
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

            <div style={{ marginTop: 'var(--space-2xl)' }}>
              <AdPlaceholder format="leaderboard" label="Bottom Article Ad" />
            </div>

            {relatedArticles.length > 0 && (
              <>
                <h2 style={{ fontSize: '1.75rem', marginTop: 'var(--space-3xl)' }}>Related Articles</h2>
                <div className="grid-2 mt-xl">
                  {relatedArticles.map((relatedArticle) => (
                    <div key={relatedArticle._id} className="article-card">
                      <div className="article-card-body">
                        <span className="article-card-category">{relatedArticle.category}</span>
                        <h3 className="article-card-title">
                          <Link href={`/blog/${relatedArticle.slug}`}>{relatedArticle.title}</Link>
                        </h3>
                        <p className="article-card-excerpt">{relatedArticle.excerpt}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {hasDisqus && (
              <div className="card mt-2xl" id="comments">
                <h3 style={{ marginBottom: 'var(--space-md)' }}>Comments</h3>
                <DisqusThread identifier={article.slug} title={article.title} url={shareUrl} />
              </div>
            )}
          </main>

          <aside className="blog-sidebar">
            <AdPlaceholder format="rectangle" label="Sidebar Ad" />

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

            <AdPlaceholder format="skyscraper" label="Sticky Sidebar Ad" />

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
