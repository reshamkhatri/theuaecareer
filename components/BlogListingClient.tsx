'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FiArrowRight, FiClock, FiSearch } from 'react-icons/fi';
import AdSlot from '@/components/AdSlot';
import ArticleCover from '@/components/ArticleCover';
import { ARTICLE_CATEGORIES } from '@/lib/constants';
import { formatDisplayDate } from '@/lib/format';
import type { ArticleRecord } from '@/lib/types';

const blogListAdSlot = process.env.NEXT_PUBLIC_ADSENSE_BLOG_LIST_SLOT?.trim();

function buildBlogHref(
  current: Record<string, string>,
  overrides: Record<string, string | undefined>
): string {
  const params = new URLSearchParams();

  Object.entries({ ...current, ...overrides }).forEach(([key, value]) => {
    if (value && value.trim()) {
      params.set(key, value);
    }
  });

  const query = params.toString();
  return query ? `/blog/?${query}` : '/blog/';
}

function matchesSearch(article: ArticleRecord, search: string): boolean {
  const haystack = [article.title, article.excerpt, article.content, article.category, article.tags.join(' ')]
    .join(' ')
    .toLowerCase();

  return haystack.includes(search.toLowerCase());
}

export default function BlogListingClient({
  initialArticles,
}: {
  initialArticles: ArticleRecord[];
}) {
  return (
    <Suspense fallback={<BlogListingView initialArticles={initialArticles} currentCategory="" currentSearch="" />}>
      <BlogListingSearchParams initialArticles={initialArticles} />
    </Suspense>
  );
}

function BlogListingSearchParams({
  initialArticles,
}: {
  initialArticles: ArticleRecord[];
}) {
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category')?.trim() || '';
  const currentSearch = searchParams.get('search')?.trim() || '';

  return (
    <BlogListingView
      initialArticles={initialArticles}
      currentCategory={currentCategory}
      currentSearch={currentSearch}
    />
  );
}

function BlogListingView({
  initialArticles,
  currentCategory,
  currentSearch,
}: {
  initialArticles: ArticleRecord[];
  currentCategory: string;
  currentSearch: string;
}) {
  const filteredArticles = initialArticles.filter((article) => {
    if (currentCategory && article.category !== currentCategory) {
      return false;
    }

    if (currentSearch && !matchesSearch(article, currentSearch)) {
      return false;
    }

    return true;
  });

  const currentFilters = {
    category: currentCategory,
    search: currentSearch,
  };

  return (
    <>
      <section
        style={{
          background: 'var(--primary)',
          color: 'white',
          padding: 'var(--space-3xl) 0',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div style={{ position: 'absolute', right: 0, bottom: 0, opacity: 0.1, pointerEvents: 'none' }}>
          <svg width="600" height="400" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M500 400V250H530V400" fill="white" />
            <path d="M450 400V150H480V400" fill="white" />
            <path d="M400 400V200H430V400" fill="white" />
            <path d="M350 400V100H380V400" fill="white" />
            <path d="M300 400V280H330V400" fill="white" />
            <path d="M550 400V220H580V400" fill="white" />
          </svg>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <h1 style={{ fontSize: 'clamp(2.1rem, 7vw, 3rem)', color: 'white', marginBottom: 'var(--space-md)', maxWidth: '600px', lineHeight: 1.2 }}>
            Expert Career Insights
            <br />
            for the Emirates
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.8)', marginBottom: 'var(--space-xl)', maxWidth: '600px' }}>
            Guides, salary explainers, hiring updates, and practical advice for Gulf job seekers.
          </p>

          <form
            className="blog-search-form"
            action="/blog/"
            method="get"
            style={{
              background: 'white',
              borderRadius: 'var(--radius-md)',
              padding: '12px 20px',
              display: 'flex',
              alignItems: 'center',
              maxWidth: '560px',
              gap: '12px',
            }}
          >
            <FiSearch style={{ color: 'var(--text-muted)', fontSize: '1.25rem' }} />
            <input
              type="text"
              name="search"
              defaultValue={currentSearch}
              placeholder="Search guides, visas, or salaries..."
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                width: '100%',
                color: 'var(--text)',
                fontSize: '1rem',
              }}
            />
            {currentCategory && <input type="hidden" name="category" value={currentCategory} />}
            <button type="submit" className="btn btn-primary btn-sm">
              Search
            </button>
          </form>
        </div>
      </section>

      <section style={{ padding: 'var(--space-xl) 0 var(--space-md)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link
            href={buildBlogHref(currentFilters, { category: undefined })}
            className="badge"
            style={{
              background: currentCategory === '' ? 'var(--primary)' : 'var(--bg-alt)',
              color: currentCategory === '' ? 'white' : 'var(--text-secondary)',
              padding: '8px 20px',
              fontSize: '0.875rem',
              fontWeight: 600,
              border: '1px solid var(--border)',
            }}
          >
            All Articles
          </Link>
          {ARTICLE_CATEGORIES.map((category) => (
            <Link
              key={category}
              href={buildBlogHref(currentFilters, { category })}
              className="badge"
              style={{
                background: currentCategory === category ? 'var(--primary)' : 'var(--bg-alt)',
                color: currentCategory === category ? 'white' : 'var(--text-secondary)',
                padding: '8px 20px',
                fontSize: '0.875rem',
                fontWeight: 600,
                border: '1px solid var(--border)',
              }}
            >
              {category}
            </Link>
          ))}
        </div>
      </section>

      <section className="section" style={{ paddingTop: 'var(--space-xl)' }}>
        <div className="container">
          {filteredArticles.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
              <p>No articles found.</p>
              <Link href="/blog/" className="btn btn-primary mt-md">
                View All
              </Link>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 'var(--space-lg)',
              }}
            >
              {filteredArticles.map((article, index) => {
                const isFeatured = index === 0;

                return (
                  <FragmentWithAd
                    key={article._id}
                    article={article}
                    index={index}
                    isFeatured={isFeatured}
                  />
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}

function FragmentWithAd({
  article,
  index,
  isFeatured,
}: {
  article: ArticleRecord;
  index: number;
  isFeatured: boolean;
}) {
  const shouldRenderAd = Boolean(blogListAdSlot && (index + 1) % 6 === 0);

  return (
    <>
      <div
        className={`article-card ${isFeatured ? 'blog-featured-card' : ''}`}
        style={{
          gridColumn: isFeatured ? '1 / span 2' : 'auto',
          display: 'flex',
          flexDirection: isFeatured ? 'row' : 'column',
          minHeight: isFeatured ? '360px' : 'auto',
        }}
      >
        <ArticleCover
          article={article}
          variant={isFeatured ? 'feature' : 'card'}
          className={isFeatured ? 'blog-featured-media' : ''}
          style={{
            width: isFeatured ? '50%' : '100%',
            height: isFeatured ? '100%' : '220px',
            flexShrink: 0,
          }}
        />

        <div
          className="article-card-body"
          style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 'var(--space-xl)' }}
        >
          {!isFeatured && (
            <span
              style={{
                fontSize: '0.75rem',
                color: 'var(--accent)',
                fontWeight: 700,
                textTransform: 'uppercase',
                marginBottom: '8px',
              }}
            >
              {article.category}
            </span>
          )}

          {isFeatured && (
            <div
              style={{
                fontSize: '0.75rem',
                color: 'var(--text-muted)',
                fontWeight: 700,
                textTransform: 'uppercase',
                marginBottom: '8px',
                display: 'flex',
                gap: '8px',
                alignItems: 'center',
              }}
            >
              <span style={{ color: 'var(--accent)' }}>Updated</span> {formatDisplayDate(article.publishDate)}
            </div>
          )}

          <h3
            style={{
              fontSize: isFeatured ? '2rem' : '1.25rem',
              marginBottom: 'var(--space-md)',
              lineHeight: 1.3,
              flex: 1,
            }}
          >
            <Link href={`/blog/${article.slug}`} style={{ color: 'var(--text)' }}>
              {article.title}
            </Link>
          </h3>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderTop: isFeatured ? 'none' : '1px solid var(--border-light)',
              paddingTop: isFeatured ? '0' : '16px',
              marginTop: 'auto',
            }}
          >
            <span
              style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: 'var(--text-muted)' }}
            >
              <FiClock /> {article.readTime} min read
            </span>

            {!isFeatured && (
              <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                {formatDisplayDate(article.publishDate)}
              </div>
            )}

            {isFeatured && (
              <Link href={`/blog/${article.slug}`} style={{ color: 'var(--text)', fontSize: '1.25rem' }}>
                <FiArrowRight />
              </Link>
            )}
          </div>
        </div>
      </div>

      {shouldRenderAd && (
        <div
          className="card"
          style={{
            gridColumn: '1 / -1',
            padding: 'var(--space-lg)',
          }}
        >
          <AdSlot slot={blogListAdSlot} minHeight={250} />
        </div>
      )}
    </>
  );
}
