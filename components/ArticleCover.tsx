import type { CSSProperties } from 'react';
import Image from 'next/image';
import type { IconType } from 'react-icons';
import {
  FiBookOpen,
  FiBriefcase,
  FiDollarSign,
  FiMapPin,
  FiShield,
} from 'react-icons/fi';
import { formatDisplayDate } from '@/lib/format';
import { getPublicImagePath } from '@/lib/seo-metadata';
import type { ArticleRecord } from '@/lib/types';

type ArticleCoverVariant = 'card' | 'feature' | 'hero' | 'compact';

interface ArticleTheme {
  accent: string;
  secondary: string;
  deep: string;
  soft: string;
  icon: IconType;
  kicker: string;
}

function getArticleTheme(category: string): ArticleTheme {
  const normalized = category.toLowerCase();

  if (normalized.includes('walk-in')) {
    return { accent: '#10b981', secondary: '#22d3ee', deep: '#052e2b', soft: '#d1fae5', icon: FiMapPin, kicker: 'Hiring radar' };
  }
  if (normalized.includes('salary')) {
    return { accent: '#f59e0b', secondary: '#fb7185', deep: '#431407', soft: '#fef3c7', icon: FiDollarSign, kicker: 'Market snapshot' };
  }
  if (normalized.includes('visa') || normalized.includes('pro')) {
    return { accent: '#60a5fa', secondary: '#818cf8', deep: '#172554', soft: '#dbeafe', icon: FiShield, kicker: 'Process guide' };
  }
  if (normalized.includes('career')) {
    return { accent: '#2dd4bf', secondary: '#818cf8', deep: '#0f172a', soft: '#ccfbf1', icon: FiBookOpen, kicker: 'Career playbook' };
  }
  return { accent: '#38bdf8', secondary: '#a78bfa', deep: '#0f172a', soft: '#dbeafe', icon: FiBriefcase, kicker: 'Gulf outlook' };
}

export default function ArticleCover({
  article,
  variant = 'card',
  className = '',
  style,
}: {
  article: ArticleRecord;
  variant?: ArticleCoverVariant;
  className?: string;
  style?: CSSProperties;
}) {
  const theme = getArticleTheme(article.category);
  const Icon = theme.icon;
  const featuredImage = getPublicImagePath(article.featuredImage);
  const hasImage = Boolean(featuredImage);
  const coverStyle = {
    '--article-cover-accent': theme.accent,
    '--article-cover-secondary': theme.secondary,
    '--article-cover-deep': theme.deep,
    '--article-cover-soft': theme.soft,
    ...style,
  } as CSSProperties;
  const imageLoading = variant === 'hero' ? 'eager' : 'lazy';

  return (
    <div
      className={`article-cover article-cover-${variant} ${hasImage ? 'article-cover-image' : 'article-cover-fallback'} ${className}`.trim()}
      style={coverStyle}
    >
      {hasImage ? (
        <>
          <Image
            src={featuredImage || ''}
            alt={article.title}
            fill
            className="article-cover-media"
            loading={imageLoading}
            priority={variant === 'hero'}
            sizes={
              variant === 'hero'
                ? '(max-width: 768px) 100vw, 800px'
                : variant === 'feature'
                  ? '(max-width: 900px) 100vw, 50vw'
                  : '(max-width: 768px) 100vw, 360px'
            }
          />
          {/* Only show the dark gradient overlay on hero/feature — keeps card images clean */}
          {(variant === 'hero' || variant === 'feature') && (
            <div className="article-cover-image-overlay" />
          )}
        </>
      ) : (
        <>
          <div className="article-cover-glow article-cover-glow-a" />
          <div className="article-cover-glow article-cover-glow-b" />
          <div className="article-cover-grid" />
          <div className="article-cover-content">
            <div className="article-cover-topline">
              <span className="article-cover-badge">{article.category}</span>
              <span className="article-cover-kicker">{theme.kicker}</span>
            </div>
            <div className="article-cover-icon-shell">
              <Icon />
            </div>
            <div className="article-cover-meta">
              <span>{article.readTime} min read</span>
              <span>{formatDisplayDate(article.lastUpdatedDate || article.publishDate)}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
