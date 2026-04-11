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
  getHelpfulJobsForArticle,
  getRelatedArticles,
} from '@/lib/content';
import {
  buildSeoDescription,
  buildSeoTitle,
  getPublicImagePath,
  normalizeComparableTitle,
  stripBrandSuffix,
} from '@/lib/seo-metadata';
import {
  buildArticleTakeaways,
  decorateArticleHtml,
  deriveArticleTargeting,
  getSeoPathwaysForTargeting,
} from '@/lib/seo-targeting';

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

function stripExternalArticleImages(html: string): string {
  return html
    .replace(
      /<figure[^>]*>\s*<img[^>]+src=["']https?:\/\/[^"']+["'][^>]*>\s*(?:<figcaption[\s\S]*?<\/figcaption>\s*)?<\/figure>/gi,
      ''
    )
    .replace(/<img[^>]+src=["']https?:\/\/[^"']+["'][^>]*>/gi, '');
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

  const allArticles = await getAllPublicArticles();
  const baseTitle = stripBrandSuffix(article.metaTitle || article.title);
  const matchingTitleArticles = allArticles.filter(
    (item) =>
      normalizeComparableTitle(item.metaTitle || item.title) === normalizeComparableTitle(baseTitle)
  );
  const preferredSlug = [...matchingTitleArticles]
    .sort((left, right) => right.slug.length - left.slug.length || left.slug.localeCompare(right.slug))[0]?.slug;
  const isPreferredVariant = !preferredSlug || article.slug === preferredSlug;
  const seoTitle = buildSeoTitle(
    isPreferredVariant ? baseTitle : `${baseTitle} (Legacy)`,
    60
  );
  const seoDescription = buildSeoDescription(
    article.metaDescription || article.excerpt,
    'Read this Gulf career guide with practical advice for job seekers in the UAE, Saudi Arabia, and Qatar.'
  );
  const ogImage = getPublicImagePath(article.featuredImage) || `${SITE_URL}/og-default.png`;
  const canonicalSlug = preferredSlug || article.slug;

  return {
    title: { absolute: seoTitle },
    description: seoDescription,
    alternates: {
      canonical: `/blog/${canonicalSlug}/`,
    },
    robots: isPreferredVariant ? undefined : { index: false, follow: true },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      url: `/blog/${canonicalSlug}/`,
      type: 'article',
      publishedTime: article.publishDate,
      modifiedTime: article.lastUpdatedDate || article.publishDate,
      authors: [article.author],
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: article.coverAlt || article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: seoTitle,
      description: seoDescription,
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
  const helpfulJobs = await getHelpfulJobsForArticle(article, 3);
  const shareUrl = new URL(`/blog/${article.slug}/`, SITE_URL).toString();
  const articleTargeting = deriveArticleTargeting(article);
  const articleTakeaways = buildArticleTakeaways(article);
  const decoratedArticle = decorateArticleHtml(stripExternalArticleImages(article.content));
  const { firstHalf, secondHalf } = splitArticleHtml(decoratedArticle.html);
  const articleImage = getPublicImagePath(article.featuredImage) || `${SITE_URL}/og-default.png`;
  const articlePathways = getSeoPathwaysForTargeting(articleTargeting, {
    surface: 'blog',
    limit: 4,
    excludeHrefs: [`/blog/${article.slug}/`],
  });
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
        item: `${SITE_URL}/blog/`,
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
              <Link href="/blog/">Blog</Link> <FiChevronRight style={{ display: 'inline', margin: '0 4px' }} />
              {article.title}
            </div>

            <article className="card article-detail-card article-shell">
              <header className="article-hero">
                <div className="article-hero-topline">
                  <span className="badge badge-primary article-hero-badge">{article.category}</span>
                  <span className="article-hero-date">{formatDisplayDate(article.publishDate)}</span>
                </div>
                <h1 className="article-detail-title article-hero-title">{article.title}</h1>
                <ArticleCover article={article} variant="hero" className="article-hero-cover" />
                <p className="article-hero-excerpt">{article.excerpt}</p>
                <div className="article-hero-meta">
                  <span className="article-hero-meta-item">
                    <strong>By {article.author}</strong>
                  </span>
                  <span className="article-hero-meta-item">
                    <FiClock /> {article.readTime} min read
                  </span>
                  <span className="article-hero-meta-item">
                    <FiCalendar /> Updated {formatDisplayDate(article.lastUpdatedDate || article.publishDate)}
                  </span>
                </div>
              </header>

              {decoratedArticle.headings.length > 1 && (
                <section className="article-insight-card article-sections-card" style={{ marginBottom: 'var(--space-2xl)' }}>
                  <p className="article-insight-label">Jump to sections</p>
                  <div className="article-sections-list">
                    {decoratedArticle.headings.map((heading) => (
                      <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        className={`article-section-link article-section-link-level-${heading.level}`}
                      >
                        {heading.title}
                      </a>
                    ))}
                  </div>
                </section>
              )}

              <div className="prose">
                <div dangerouslySetInnerHTML={{ __html: firstHalf }} />
                {secondHalf && <AdSlot slot={articleInlineAdSlot} className="mt-xl" minHeight={280} />}
                {secondHalf && <div dangerouslySetInnerHTML={{ __html: secondHalf }} />}
              </div>

              {articleTakeaways.length > 0 && (
                <section className="article-insight-card article-takeaways-card" style={{ marginTop: 'var(--space-2xl)' }}>
                  <p className="article-insight-label">Key takeaways</p>
                  <ul className="article-takeaways-list">
                    {articleTakeaways.map((takeaway) => (
                      <li key={takeaway}>{takeaway}</li>
                    ))}
                  </ul>
                </section>
              )}

              {article.tags.length > 0 && (
                <div style={{ marginTop: 'var(--space-xl)', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
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
                        <h3 className="article-card-title">{relatedArticle.title}</h3>
                        <Link
                          href={`/blog/${relatedArticle.slug}/`}
                          style={{ color: 'var(--accent)', fontWeight: 700, textDecoration: 'none' }}
                        >
                          Read {buildSeoTitle(relatedArticle.title, 42)}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {helpfulJobs.length > 0 && (
              <>
                <h2 style={{ fontSize: '1.75rem', marginTop: 'var(--space-3xl)' }}>Jobs Related To This Topic</h2>
                <div className="grid-2 mt-xl">
                  {helpfulJobs.map((job) => (
                    <div key={job._id} className="card">
                      <span className="badge badge-secondary" style={{ marginBottom: '12px' }}>
                        {job.categoryLabel || job.category}
                      </span>
                      <h3 style={{ fontSize: '1.125rem', marginBottom: '8px', lineHeight: 1.4 }}>
                        {job.title}
                      </h3>
                      <p style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>
                        {job.companyName} | {job.location.city}, {job.location.country}
                      </p>
                      <Link href={`/jobs/${job.slug}/`} className="btn btn-secondary btn-sm">
                        Open {buildSeoTitle(job.title, 36)}
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            )}

          </main>

          <aside className="blog-sidebar">
            <div className="card">
              <AdSlot slot={articleSidebarAdSlot} minHeight={320} />
            </div>
            <div className="card">
              <h3 style={{ fontSize: '1.125rem', marginBottom: 'var(--space-lg)' }}>Popular Categories</h3>
              <form action="/blog/" method="get">
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {ARTICLE_CATEGORIES.map((category, index) => (
                    <li
                      key={category}
                      style={{
                        borderBottom: index !== ARTICLE_CATEGORIES.length - 1 ? '1px solid var(--border)' : 'none',
                        paddingBottom: index !== ARTICLE_CATEGORIES.length - 1 ? '12px' : '0',
                      }}
                    >
                      <button
                        type="submit"
                        name="category"
                        value={category}
                        style={{
                          color: 'var(--text)',
                          fontWeight: 500,
                          display: 'flex',
                          justifyContent: 'space-between',
                          width: '100%',
                          background: 'transparent',
                          border: 'none',
                          padding: 0,
                          cursor: 'pointer',
                          textAlign: 'left',
                        }}
                      >
                        {category} <FiChevronRight style={{ color: 'var(--text-muted)' }} />
                      </button>
                    </li>
                  ))}
                </ul>
              </form>
            </div>

            <div className="card">
              <h3 style={{ fontSize: '1.125rem', marginBottom: 'var(--space-md)' }}>Subscribe</h3>
              <p style={{ fontSize: '0.875rem', marginBottom: 'var(--space-md)' }}>
                Get the latest Gulf career tips and hiring updates by email.
              </p>
              <NewsletterForm source={`article:${article.slug}`} compact />
            </div>

            <div className="card">
              <h3 style={{ fontSize: '1.125rem', marginBottom: 'var(--space-md)' }}>Next best pages</h3>
              <div style={{ display: 'grid', gap: '14px' }}>
                {articlePathways.map((link) => (
                  <div
                    key={link.href}
                    style={{
                      display: 'grid',
                      gap: '4px',
                      paddingBottom: '14px',
                      borderBottom: '1px solid var(--border)',
                    }}
                  >
                    <span style={{ color: 'var(--text)', fontWeight: 700 }}>{link.title}</span>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.55, margin: 0 }}>
                      {link.description}
                    </p>
                    <Link
                      href={link.href}
                      style={{ color: 'var(--accent)', fontWeight: 700, textDecoration: 'none' }}
                    >
                      Open {buildSeoTitle(link.title, 38)}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <div className="container" style={{ marginTop: 'var(--space-xl)' }}>
          <CommentsSection articleSlug={article.slug} articleTitle={article.title} />
        </div>
      </section>
    </>
  );
}
