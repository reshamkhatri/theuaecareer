'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FiArrowRight, FiClock, FiSearch, FiTag } from 'react-icons/fi';
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
    if (currentCategory && article.category !== currentCategory) return false;
    if (currentSearch && !matchesSearch(article, currentSearch)) return false;
    return true;
  });

  const currentFilters = {
    category: currentCategory,
    search: currentSearch,
  };

  const featured = filteredArticles[0];
  const secondary = filteredArticles.slice(1, 3);
  const rest = filteredArticles.slice(3);

  return (
    <>
      {/* Hero header */}
      <section className="blg-hero">
        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <p className="blg-hero-eyebrow">Career Intelligence</p>
          <h1 className="blg-hero-title">
            Guides, salaries & hiring updates
            <br />
            <span style={{ color: 'rgba(255,255,255,0.5)', fontWeight: 400 }}>for Gulf job seekers</span>
          </h1>

          <form
            className="blg-search"
            action="/blog/"
            method="get"
          >
            <FiSearch className="blg-search-icon" />
            <input
              type="text"
              name="search"
              defaultValue={currentSearch}
              placeholder="Search articles..."
              className="blg-search-input"
            />
            {currentCategory && <input type="hidden" name="category" value={currentCategory} />}
            <button type="submit" className="blg-search-btn">
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Category filters */}
      <section className="blg-filters">
        <div className="container">
          <div className="blg-filter-row">
            <Link
              href={buildBlogHref(currentFilters, { category: undefined })}
              className={`blg-filter-chip ${currentCategory === '' ? 'active' : ''}`}
            >
              All
            </Link>
            {ARTICLE_CATEGORIES.map((category) => (
              <Link
                key={category}
                href={buildBlogHref(currentFilters, { category })}
                className={`blg-filter-chip ${currentCategory === category ? 'active' : ''}`}
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Articles */}
      <section className="blg-content">
        <div className="container">
          {filteredArticles.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '16px' }}>No articles match your search.</p>
              <Link href="/blog/" className="btn btn-primary">View All Articles</Link>
            </div>
          ) : (
            <>
              {/* Featured + secondary row */}
              {featured && (
                <div className="blg-top-row">
                  {/* Main featured card */}
                  <Link href={`/blog/${featured.slug}/`} className="blg-featured">
                    <ArticleCover
                      article={featured}
                      variant="feature"
                      className="blg-featured-cover"
                    />
                    <div className="blg-featured-overlay">
                      <span className="blg-cat-badge">{featured.category}</span>
                      <h2 className="blg-featured-title">{featured.title}</h2>
                      <p className="blg-featured-excerpt">{featured.excerpt}</p>
                      <div className="blg-featured-meta">
                        <span><FiClock style={{ marginRight: '4px' }} />{featured.readTime} min</span>
                        <span>{formatDisplayDate(featured.publishDate)}</span>
                      </div>
                    </div>
                  </Link>

                  {/* Secondary cards */}
                  {secondary.length > 0 && (
                    <div className="blg-secondary-col">
                      {secondary.map((article) => (
                        <Link key={article._id} href={`/blog/${article.slug}/`} className="blg-secondary-card">
                          <ArticleCover
                            article={article}
                            variant="card"
                            className="blg-secondary-cover"
                          />
                          <div className="blg-secondary-body">
                            <span className="blg-cat-badge small">{article.category}</span>
                            <h3 className="blg-secondary-title">{article.title}</h3>
                            <div className="blg-secondary-meta">
                              <FiClock size={12} /> {article.readTime} min &middot; {formatDisplayDate(article.publishDate)}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Divider */}
              {rest.length > 0 && (
                <div className="blg-divider">
                  <FiTag style={{ color: 'var(--accent)' }} />
                  <span>Latest articles</span>
                  <div className="blg-divider-line" />
                </div>
              )}

              {/* Grid of remaining articles */}
              {rest.length > 0 && (
                <div className="blg-grid">
                  {rest.map((article, index) => (
                    <ArticleGridCard
                      key={article._id}
                      article={article}
                      index={index}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: blogStyles }} />
    </>
  );
}

function ArticleGridCard({ article, index }: { article: ArticleRecord; index: number }) {
  const shouldRenderAd = Boolean(blogListAdSlot && (index + 1) % 6 === 0);

  return (
    <>
      <Link href={`/blog/${article.slug}/`} className="blg-card">
        <ArticleCover
          article={article}
          variant="card"
          className="blg-card-cover"
        />
        <div className="blg-card-body">
          <span className="blg-cat-badge small">{article.category}</span>
          <h3 className="blg-card-title">{article.title}</h3>
          <p className="blg-card-excerpt">{article.excerpt}</p>
          <div className="blg-card-footer">
            <span className="blg-card-meta">
              <FiClock size={13} /> {article.readTime} min
            </span>
            <span className="blg-card-date">{formatDisplayDate(article.publishDate)}</span>
            <FiArrowRight className="blg-card-arrow" />
          </div>
        </div>
      </Link>

      {shouldRenderAd && (
        <div style={{ gridColumn: '1 / -1', padding: 'var(--space-lg)' }}>
          <AdSlot slot={blogListAdSlot} minHeight={250} />
        </div>
      )}
    </>
  );
}

const blogStyles = `
  /* ── Hero ── */
  .blg-hero {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 60%, #0f172a 100%);
    padding: 60px 0 48px;
    position: relative;
    overflow: hidden;
  }
  .blg-hero::before {
    content: '';
    position: absolute;
    top: -40%;
    right: -10%;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%);
    pointer-events: none;
  }
  .blg-hero-eyebrow {
    font-size: 0.78rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    color: #818cf8;
    margin-bottom: 12px;
  }
  .blg-hero-title {
    font-size: clamp(1.8rem, 5vw, 2.75rem);
    line-height: 1.2;
    color: #fff;
    font-weight: 800;
    letter-spacing: -0.02em;
    margin-bottom: 28px;
    max-width: 620px;
  }

  /* ── Search bar ── */
  .blg-search {
    display: flex;
    align-items: center;
    background: rgba(255,255,255,0.07);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px;
    padding: 6px 6px 6px 16px;
    max-width: 480px;
    gap: 10px;
    backdrop-filter: blur(8px);
    transition: border-color 0.2s;
  }
  .blg-search:focus-within {
    border-color: rgba(129,140,248,0.5);
  }
  .blg-search-icon {
    color: rgba(255,255,255,0.4);
    font-size: 1.1rem;
    flex-shrink: 0;
  }
  .blg-search-input {
    flex: 1;
    border: none;
    background: transparent;
    outline: none;
    color: #fff;
    font-size: 0.95rem;
  }
  .blg-search-input::placeholder {
    color: rgba(255,255,255,0.35);
  }
  .blg-search-btn {
    background: #6366f1;
    color: #fff;
    border: none;
    border-radius: 8px;
    padding: 9px 20px;
    font-weight: 600;
    font-size: 0.875rem;
    cursor: pointer;
    transition: background 0.2s;
    white-space: nowrap;
  }
  .blg-search-btn:hover {
    background: #4f46e5;
  }

  /* ── Filters ── */
  .blg-filters {
    background: #fff;
    border-bottom: 1px solid var(--border);
    padding: 14px 0;
    position: sticky;
    top: 0;
    z-index: 50;
  }
  .blg-filter-row {
    display: flex;
    gap: 8px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    padding-bottom: 2px;
  }
  .blg-filter-row::-webkit-scrollbar { display: none; }
  .blg-filter-chip {
    padding: 7px 18px;
    border-radius: 100px;
    font-size: 0.82rem;
    font-weight: 600;
    white-space: nowrap;
    background: #f1f5f9;
    color: #475569;
    border: 1px solid transparent;
    transition: all 0.2s;
    text-decoration: none;
  }
  .blg-filter-chip:hover {
    background: #e2e8f0;
    color: #1e293b;
  }
  .blg-filter-chip.active {
    background: #0f172a;
    color: #fff;
    border-color: #0f172a;
  }

  /* ── Content area ── */
  .blg-content {
    padding: 40px 0 64px;
    background: #f8fafc;
  }

  /* ── Top row: featured + secondary ── */
  .blg-top-row {
    display: grid;
    grid-template-columns: 1.4fr 1fr;
    gap: 20px;
    margin-bottom: 0;
  }

  /* Featured card */
  .blg-featured {
    position: relative;
    display: block;
    border-radius: 16px;
    overflow: hidden;
    min-height: 420px;
    text-decoration: none;
    box-shadow: 0 4px 24px rgba(0,0,0,0.08);
    transition: transform 0.3s, box-shadow 0.3s;
  }
  .blg-featured:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  }
  .blg-featured-cover {
    position: absolute !important;
    inset: 0;
    width: 100% !important;
    height: 100% !important;
  }
  .blg-featured-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, transparent 100%);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 32px;
    z-index: 2;
  }
  .blg-featured-title {
    font-size: 1.65rem;
    font-weight: 800;
    color: #fff;
    line-height: 1.25;
    margin: 10px 0 8px;
    letter-spacing: -0.01em;
  }
  .blg-featured-excerpt {
    color: rgba(255,255,255,0.7);
    font-size: 0.9rem;
    line-height: 1.55;
    margin: 0 0 14px;
    max-width: 50ch;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .blg-featured-meta {
    display: flex;
    gap: 16px;
    color: rgba(255,255,255,0.55);
    font-size: 0.8rem;
    font-weight: 500;
    align-items: center;
  }

  /* Category badges */
  .blg-cat-badge {
    display: inline-block;
    padding: 4px 12px;
    border-radius: 6px;
    font-size: 0.7rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    background: rgba(99,102,241,0.15);
    color: #818cf8;
    width: fit-content;
  }
  .blg-featured .blg-cat-badge {
    background: rgba(255,255,255,0.15);
    color: #fff;
    backdrop-filter: blur(4px);
  }
  .blg-cat-badge.small {
    font-size: 0.67rem;
    padding: 3px 10px;
  }

  /* Secondary cards column */
  .blg-secondary-col {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .blg-secondary-card {
    display: flex;
    gap: 16px;
    background: #fff;
    border-radius: 14px;
    overflow: hidden;
    flex: 1;
    text-decoration: none;
    border: 1px solid rgba(0,0,0,0.06);
    transition: transform 0.25s, box-shadow 0.25s;
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
  }
  .blg-secondary-card:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0,0,0,0.08);
  }
  .blg-secondary-cover {
    width: 150px !important;
    height: 130px !important;
    min-height: 130px !important;
    flex-shrink: 0;
    border-radius: 0 !important;
  }
  .blg-secondary-body {
    padding: 20px 20px 20px 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 8px;
  }
  .blg-secondary-title {
    font-size: 1rem;
    font-weight: 700;
    color: #0f172a;
    line-height: 1.35;
    margin: 0;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .blg-secondary-meta {
    font-size: 0.75rem;
    color: #94a3b8;
    display: flex;
    align-items: center;
    gap: 5px;
  }

  /* ── Divider ── */
  .blg-divider {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 40px 0 28px;
    font-size: 0.82rem;
    font-weight: 700;
    color: #475569;
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  .blg-divider-line {
    flex: 1;
    height: 1px;
    background: #e2e8f0;
  }

  /* ── Grid cards ── */
  .blg-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 22px;
  }
  .blg-card {
    background: #fff;
    border-radius: 14px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    text-decoration: none;
    border: 1px solid rgba(0,0,0,0.06);
    box-shadow: 0 1px 4px rgba(0,0,0,0.04);
    transition: transform 0.25s ease, box-shadow 0.25s ease;
  }
  .blg-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 28px rgba(0,0,0,0.09);
  }
  .blg-card-cover {
    height: 200px !important;
    width: 100% !important;
  }
  .blg-card-body {
    padding: 20px 22px 22px;
    display: flex;
    flex-direction: column;
    flex: 1;
  }
  .blg-card-title {
    font-size: 1.05rem;
    font-weight: 700;
    color: #0f172a;
    line-height: 1.35;
    margin: 10px 0 8px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .blg-card-excerpt {
    color: #64748b;
    font-size: 0.85rem;
    line-height: 1.6;
    margin: 0 0 16px;
    flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .blg-card-footer {
    display: flex;
    align-items: center;
    gap: 12px;
    padding-top: 14px;
    border-top: 1px solid #f1f5f9;
    margin-top: auto;
  }
  .blg-card-meta {
    font-size: 0.78rem;
    color: #94a3b8;
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .blg-card-date {
    font-size: 0.78rem;
    color: #94a3b8;
  }
  .blg-card-arrow {
    margin-left: auto;
    color: #cbd5e1;
    transition: color 0.2s, transform 0.2s;
  }
  .blg-card:hover .blg-card-arrow {
    color: #6366f1;
    transform: translateX(3px);
  }

  /* ── Responsive ── */
  @media (max-width: 1024px) {
    .blg-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  @media (max-width: 820px) {
    .blg-top-row {
      grid-template-columns: 1fr;
    }
    .blg-featured {
      min-height: 320px;
    }
    .blg-secondary-col {
      flex-direction: row;
    }
    .blg-secondary-card {
      flex-direction: column;
    }
    .blg-secondary-cover {
      width: 100% !important;
      height: 160px !important;
      min-height: 160px;
    }
    .blg-secondary-body {
      padding: 16px;
    }
  }

  @media (max-width: 640px) {
    .blg-hero {
      padding: 40px 0 32px;
    }
    .blg-hero-title {
      font-size: 1.5rem;
    }
    .blg-grid {
      grid-template-columns: 1fr;
    }
    .blg-top-row {
      gap: 16px;
    }
    .blg-featured {
      min-height: 280px;
    }
    .blg-featured-title {
      font-size: 1.25rem;
    }
    .blg-featured-overlay {
      padding: 20px;
    }
    .blg-secondary-col {
      flex-direction: column;
    }
    .blg-secondary-card {
      flex-direction: row;
    }
    .blg-secondary-cover {
      width: 120px !important;
      height: auto !important;
      min-height: 100%;
    }
    .blg-secondary-body {
      padding: 14px 14px 14px 0;
    }
    .blg-filter-chip {
      padding: 6px 14px;
      font-size: 0.78rem;
    }
  }
`;
