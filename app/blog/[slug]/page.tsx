'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FiClock, FiCalendar, FiChevronRight, FiShare2, FiTwitter, FiFacebook } from 'react-icons/fi';
import AdPlaceholder from '@/components/AdPlaceholder';
import { ARTICLE_CATEGORIES } from '@/lib/constants';
import ClientDate from '@/components/ClientDate';
import React from 'react';

// A mock "related articles" component
const RelatedArticles = () => (
  <div className="grid-2 mt-xl">
    <div className="article-card">
      <div className="article-card-body">
        <span className="article-card-category">Career Guides</span>
        <h3 className="article-card-title"><Link href="#">Top 10 Resume Mistakes</Link></h3>
        <p className="article-card-excerpt">Avoid these common resume mistakes when applying for jobs in Dubai.</p>
      </div>
    </div>
    <div className="article-card">
      <div className="article-card-body">
        <span className="article-card-category">Interview Tips</span>
        <h3 className="article-card-title"><Link href="#">How to nail your UAE walk-in interview</Link></h3>
        <p className="article-card-excerpt">A comprehensive guide to standing out during a busy walk-in interview.</p>
      </div>
    </div>
  </div>
);

export default function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const resolvedParams = React.use(params);

  useEffect(() => {
    async function fetchArticle() {
      try {
        console.log('Fetching', `/api/articles/${resolvedParams.slug}`);
        const res = await fetch(`/api/articles/${resolvedParams.slug}`);
        console.log('Response status:', res.status);
        if (!res.ok) {
          if (res.status === 404) return notFound();
          throw new Error('Failed to fetch status ' + res.status);
        }
        const data = await res.json();
        console.log('Data fetched:', data);
        setArticle(data.article || data); // Just in case it's wrapped!
      } catch (error) {
        console.error('Fetch error:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchArticle();
  }, [resolvedParams.slug]);

  if (loading) {
    return <div className="container section" style={{ textAlign: 'center' }}>Loading article...</div>;
  }

  if (!article) return notFound();

  // Split content into paragraphs to inject ads in the middle (simulated approach)
  // For production, a proper HTML parser might be better.
  const injectAdsIntoHtml = (html: string) => {
    const splitIndex = Math.floor(html.length / 2);
    // Rough insertion — finding a closing paragraph tag near the middle
    const insertPoint = html.indexOf('</p>', splitIndex);
    
    if (insertPoint !== -1) {
      const part1 = html.substring(0, insertPoint + 4);
      const part2 = html.substring(insertPoint + 4);
      return (
        <>
          <div dangerouslySetInnerHTML={{ __html: part1 }} />
          <div style={{ margin: 'var(--space-2xl) 0' }}>
            <AdPlaceholder format="fluid" label="In-Article Native Ad" />
          </div>
          <div dangerouslySetInnerHTML={{ __html: part2 }} />
        </>
      );
    }
    
    // Fallback if no <p> tag found
    return <div dangerouslySetInnerHTML={{ __html: html }} />;
  };

  return (
    <>
      <div className="container" style={{ marginTop: 'var(--space-xl)' }}>
        <AdPlaceholder format="leaderboard" label="Top Leaderboard Ad (728x90)" />
      </div>

      <section className="section" style={{ paddingTop: 'var(--space-xl)' }}>
        <div className="container blog-layout">
          {/* Main Article Content */}
          <main className="blog-main">
            {/* Breadcrumb */}
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 'var(--space-lg)' }}>
              <Link href="/">Home</Link> <FiChevronRight style={{ display: 'inline', margin: '0 4px' }} /> 
              <Link href="/blog">Blog</Link> <FiChevronRight style={{ display: 'inline', margin: '0 4px' }} /> 
              {article.category}
            </div>

            <article className="card" style={{ padding: 'var(--space-2xl)' }}>
              <span className="badge badge-primary" style={{ marginBottom: 'var(--space-md)' }}>
                {article.category}
              </span>
              
              <h1 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-lg)' }}>
                {article.title}
              </h1>

              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-lg)', color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: 'var(--space-2xl)', paddingBottom: 'var(--space-lg)', borderBottom: '1px solid var(--border)' }}>
                <span><strong style={{ color: 'var(--text)' }}>By {article.author}</strong></span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FiCalendar /> <ClientDate date={article.publishDate} /></span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}><FiClock /> {article.readTime} min read</span>
              </div>

              {/* Tiptap Article Content with In-content Ad Injection */}
              <div className="prose">
                {injectAdsIntoHtml(article.content)}
              </div>

              {/* Tags */}
              {Array.isArray(article.tags) && article.tags.length > 0 && (
                <div style={{ marginTop: 'var(--space-2xl)', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  <span style={{ fontSize: '0.875rem', fontWeight: 600, marginRight: '8px', alignSelf: 'center' }}>Tagged with:</span>
                  {article.tags.map((tag: string) => (
                    <span key={tag} className="tag">#{tag}</span>
                  ))}
                </div>
              )}

              {/* Share actions */}
              <div style={{ marginTop: 'var(--space-2xl)', paddingTop: 'var(--space-xl)', borderTop: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ fontSize: '1.25rem' }}>Share this article</h3>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button className="btn btn-secondary btn-sm" title="Share on Twitter" onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(article.title)}`, '_blank')}><FiTwitter /> Tweet</button>
                  <button className="btn btn-secondary btn-sm" title="Share on Facebook" onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`, '_blank')}><FiFacebook /> Share</button>
                  <button className="btn btn-secondary btn-sm" title="Copy Link" onClick={() => { try { navigator.clipboard.writeText(window.location.href); } catch { prompt('Copy this link:', window.location.href); } }}><FiShare2 /> Copy</button>
                </div>
              </div>
            </article>

            {/* Bottom Ad */}
            <div style={{ marginTop: 'var(--space-2xl)' }}>
              <AdPlaceholder format="leaderboard" label="Bottom Article Ad (728x90)" />
            </div>

            {/* Related Articles */}
            <h2 style={{ fontSize: '1.75rem', marginTop: 'var(--space-3xl)' }}>Related Articles</h2>
            <RelatedArticles />
            
            {/* Embedded Comments Section (Placeholder for Disqus) */}
            <div className="card mt-2xl" id="comments">
              <h3 style={{ marginBottom: 'var(--space-md)' }}>Comments</h3>
              <div style={{ padding: '2rem', textAlign: 'center', background: 'var(--bg-alt)', borderRadius: 'var(--radius-md)' }}>
                <p style={{ color: 'var(--text-muted)' }}>Disqus Comments Embed Placeholder</p>
                <p style={{ fontSize: '0.8125rem', marginTop: '8px' }}>Comments are configured to load when visitor scrolls to this section.</p>
              </div>
            </div>
          </main>

          {/* Sticky Sidebar */}
          <aside className="blog-sidebar">
            {/* Sidebar Ad 1 */}
            <AdPlaceholder format="rectangle" label="Sidebar Ad 1 (300x250)" />
            
            <div className="card">
              <h3 style={{ fontSize: '1.125rem', marginBottom: 'var(--space-lg)' }}>Popular Categories</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {ARTICLE_CATEGORIES.map((cat, idx) => (
                  <li key={cat} style={{ borderBottom: idx !== ARTICLE_CATEGORIES.length - 1 ? '1px solid var(--border)' : 'none', paddingBottom: idx !== ARTICLE_CATEGORIES.length - 1 ? '12px' : '0' }}>
                    <Link href={`/blog?category=${encodeURIComponent(cat)}`} style={{ color: 'var(--text)', fontWeight: 500, display: 'flex', justifyContent: 'space-between' }}>
                      {cat} <FiChevronRight style={{ color: 'var(--text-muted)' }} />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Sidebar Ad 2 - Sticky Skyscraper */}
            <AdPlaceholder format="skyscraper" label="Sticky Skyscraper Ad (300x600)" />
            
            <div className="card">
              <h3 style={{ fontSize: '1.125rem', marginBottom: 'var(--space-md)' }}>Subscribe</h3>
              <p style={{ fontSize: '0.875rem', marginBottom: 'var(--space-md)' }}>Get the latest Gulf career tips sent to your inbox.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <input type="email" placeholder="Email address" className="form-input" style={{ width: '100%' }} />
                <button className="btn btn-primary btn-full">Subscribe</button>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
