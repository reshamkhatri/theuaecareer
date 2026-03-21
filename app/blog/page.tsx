'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiClock, FiSearch, FiArrowRight } from 'react-icons/fi';
import AdPlaceholder from '@/components/AdPlaceholder';
import ClientDate from '@/components/ClientDate';
import { ARTICLE_CATEGORIES } from '@/lib/constants';

interface Article {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  publishDate: string;
  readTime: number;
}

export default function BlogListingPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    async function fetchArticles() {
      setLoading(true);
      try {
        const url = activeCategory 
          ? `/api/articles?category=${encodeURIComponent(activeCategory)}` 
          : '/api/articles';
        const res = await fetch(url);
        const data = await res.json();
        setArticles(data.articles || []);
      } catch (error) {
        console.error('Failed to fetch articles:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, [activeCategory]);

  return (
    <>
      {/* Dark Theme Hero matching the uploaded layout */}
      <section style={{ background: 'var(--primary)', color: 'white', padding: 'var(--space-3xl) 0', position: 'relative', overflow: 'hidden' }}>
        {/* Subtle background overlay */}
        <div style={{ position: 'absolute', right: 0, bottom: 0, opacity: 0.1, pointerEvents: 'none' }}>
           <svg width="600" height="400" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Abstract city silhouette lines */}
              <path d="M500 400V250H530V400" fill="white"/>
              <path d="M450 400V150H480V400" fill="white"/>
              <path d="M400 400V200H430V400" fill="white"/>
              <path d="M350 400V100H380V400" fill="white"/>
              <path d="M300 400V280H330V400" fill="white"/>
              <path d="M550 400V220H580V400" fill="white"/>
           </svg>
        </div>

        <div className="container" style={{ position: 'relative', zIndex: 10 }}>
          <h1 style={{ fontSize: '3rem', color: 'white', marginBottom: 'var(--space-md)', maxWidth: '600px', lineHeight: 1.2 }}>
            Expert Career Insights<br/>for the Emirates
          </h1>
          <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.8)', marginBottom: 'var(--space-xl)', maxWidth: '600px' }}>
            Navigate the UAE job market with editorial-grade guides, salary data, and real-time walk-in interview roundups.
          </p>

          {/* Inline Search Bar inside Hero */}
          <div style={{ background: 'white', borderRadius: 'var(--radius-md)', padding: '12px 20px', display: 'flex', alignItems: 'center', maxWidth: '500px' }}>
            <FiSearch style={{ color: 'var(--text-muted)', fontSize: '1.25rem', marginRight: '12px' }} />
            <input 
              type="text" 
              placeholder="Search guides, visas, or salaries..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', color: 'var(--text)', fontSize: '1rem' }}
            />
          </div>
        </div>
      </section>

      {/* Category Pills directly below Hero */}
      <section style={{ padding: 'var(--space-xl) 0 var(--space-md)', borderBottom: '1px solid var(--border)' }}>
        <div className="container" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button 
            className="badge" 
            style={{ 
              background: activeCategory === '' ? 'var(--primary)' : 'var(--bg-alt)', 
              color: activeCategory === '' ? 'white' : 'var(--text-secondary)',
              padding: '8px 20px', fontSize: '0.875rem', fontWeight: 600, border: '1px solid var(--border)', cursor: 'pointer' 
            }}
            onClick={() => setActiveCategory('')}
          >
            All Articles
          </button>
          {ARTICLE_CATEGORIES.map(cat => (
            <button 
              key={cat}
              className="badge" 
              style={{ 
                background: activeCategory === cat ? 'var(--primary)' : 'var(--bg-alt)', 
                color: activeCategory === cat ? 'white' : 'var(--text-secondary)',
                padding: '8px 20px', fontSize: '0.875rem', fontWeight: 600, border: '1px solid var(--border)', cursor: 'pointer' 
              }}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Leaderboard Ad Before Content */}
      <div className="container" style={{ margin: 'var(--space-xl) auto 0' }}>
         <AdPlaceholder format="leaderboard" label="Top Blog Ad (728x90)" />
      </div>

      <section className="section" style={{ paddingTop: 'var(--space-xl)' }}>
        <div className="container">
          {loading ? (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>Loading insights...</div>
          ) : articles.length === 0 ? (
            <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
              <p>No articles found.</p>
              <button className="btn btn-primary mt-md" onClick={() => setActiveCategory('')}>View All</button>
            </div>
          ) : (
            // The masonry/featured grid style (3 columns on desktop, first spans 2)
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: 'var(--space-lg)' 
            }}>
              {articles.map((article, i) => {
                // First article gets span 2 on desktop
                const isFeatured = i === 0;

                return (
                  <div 
                    key={article._id} 
                    className="article-card"
                    style={{ 
                      gridColumn: isFeatured ? '1 / span 2' : 'auto',
                      display: 'flex', 
                      flexDirection: isFeatured ? 'row' : 'column',
                      minHeight: isFeatured ? '360px' : 'auto'
                    }}
                  >
                    {/* Placeholder image block */}
                    <div style={{ 
                      background: 'var(--bg-alt)', 
                      width: isFeatured ? '50%' : '100%', 
                      height: isFeatured ? '100%' : '200px',
                      position: 'relative',
                      flexShrink: 0
                    }}>
                      <span className="badge" style={{ position: 'absolute', top: '16px', left: '16px', background: 'var(--primary)', color: 'white' }}>
                        {article.category.toUpperCase()}
                      </span>
                    </div>

                    <div className="article-card-body" style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: 'var(--space-xl)' }}>
                      {!isFeatured && (
                        <span style={{ fontSize: '0.75rem', color: 'var(--accent)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px' }}>
                          {article.category}
                        </span>
                      )}
                      
                      {isFeatured && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 700, textTransform: 'uppercase', marginBottom: '8px', display: 'flex', gap: '8px', alignItems: 'center' }}>
                           <span style={{ color: 'var(--accent)' }}>///</span> LAST UPDATED <ClientDate date={article.publishDate} />
                        </div>
                      )}

                      <h3 style={{ fontSize: isFeatured ? '2rem' : '1.25rem', marginBottom: 'var(--space-md)', lineHeight: 1.3 }}>
                        <Link href={`/blog/${article.slug}`} style={{ color: 'var(--text)' }}>{article.title}</Link>
                      </h3>

                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9375rem', marginBottom: 'var(--space-xl)', flex: 1 }}>
                        {article.excerpt}
                      </p>
                      
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: isFeatured ? 'none' : '1px solid var(--border-light)', paddingTop: isFeatured ? '0' : '16px', marginTop: 'auto' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                          <FiClock /> {article.readTime} Min Read
                        </span>
                        
                        {!isFeatured && (
                          <div style={{ fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                             <ClientDate date={article.publishDate} />
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

              {/* Inject an Ad block into the grid as a native card */}
              <div className="article-card" style={{ display: 'flex', flexDirection: 'column', background: 'var(--bg-alt)', border: '1px dashed var(--border)', alignItems: 'center', justifyContent: 'center', padding: 'var(--space-2xl)' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '16px', letterSpacing: '1px' }}>Advertisement</span>
                <AdPlaceholder format="rectangle" label="Native Grid Ad (300x250)" />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
