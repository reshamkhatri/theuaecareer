import Link from 'next/link';
import { FiArrowRight, FiClock, FiSearch } from 'react-icons/fi';
import AdPlaceholder from '@/components/AdPlaceholder';
import ArticleCover from '@/components/ArticleCover';
import { ARTICLE_CATEGORIES } from '@/lib/constants';
import { formatDisplayDate, getArticles } from '@/lib/content';

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
  return query ? `/blog?${query}` : '/blog';
}

export default async function BlogListingPage({
  searchParams,
}: {
  searchParams: Promise<{
    category?: string;
    search?: string;
    page?: string;
  }>;
}) {
  const resolvedSearchParams = await searchParams;
  const currentCategory = resolvedSearchParams.category?.trim() || '';
  const currentSearch = resolvedSearchParams.search?.trim() || '';

  const articles = await getArticles({
    category: currentCategory,
    search: currentSearch,
    status: 'published',
    limit: 50,
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
            action="/blog"
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

      <div className="container" style={{ margin: 'var(--space-xl) auto 0' }}>
        <AdPlaceholder format="leaderboard" label="Top Blog Ad" />
      </div>

      <section className="section" style={{ paddingTop: 'var(--space-xl)' }}>
        <div className="container">
          {articles.items.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
              <p>No articles found.</p>
              <Link href="/blog" className="btn btn-primary mt-md">
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
              {articles.items.map((article, index) => {
                const isFeatured = index === 0;

                return (
                  <div
                    key={article._id}
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

                    <div className="article-card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 'var(--space-xl)' }}>
                      {!isFeatured && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
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

                      <h3 style={{ fontSize: isFeatured ? '2rem' : '1.25rem', marginBottom: 'var(--space-md)', lineHeight: 1.3 }}>
                        <Link href={`/blog/${article.slug}`} style={{ color: 'var(--text)' }}>
                          {article.title}
                        </Link>
                      </h3>

                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', marginBottom: 'var(--space-xl)', flex: 1 }}>
                        {article.excerpt}
                      </p>

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
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
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
                );
              })}

              <div
                className="article-card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  background: 'var(--bg-alt)',
                  border: '1px dashed var(--border)',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 'var(--space-2xl)',
                }}
              >
                <span
                  style={{
                    fontSize: '0.75rem',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    marginBottom: '16px',
                    letterSpacing: '1px',
                  }}
                >
                  Advertisement
                </span>
                <AdPlaceholder format="rectangle" label="Native Grid Ad" />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
