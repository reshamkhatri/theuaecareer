import Link from 'next/link';
import Image from 'next/image';
import { getAuthor } from '@/lib/authors';

interface AuthorBioProps {
  authorName: string;
}

export default function AuthorBio({ authorName }: AuthorBioProps) {
  const author = getAuthor(authorName);

  return (
    <div
      className="author-bio-box"
      style={{
        marginTop: 'var(--space-2xl)',
        padding: 'var(--space-xl)',
        borderTop: '2px solid var(--accent)',
        background: 'var(--surface)',
        borderRadius: 'var(--radius-lg)',
        display: 'flex',
        gap: 'var(--space-lg)',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
      }}
    >
      {/* Avatar — photo if available, initials fallback otherwise */}
      <div
        style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          overflow: 'hidden',
          flexShrink: 0,
          background: 'var(--accent)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.75rem',
          fontWeight: 700,
          color: '#fff',
          position: 'relative',
        }}
      >
        {author.avatar ? (
          <Image
            src={author.avatar}
            alt={`${author.name} — ${author.role}`}
            fill
            style={{ objectFit: 'cover', objectPosition: 'top center' }}
            sizes="72px"
          />
        ) : (
          author.name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .slice(0, 2)
        )}
      </div>

      {/* Text */}
      <div style={{ flex: 1, minWidth: '200px' }}>
        <p
          style={{
            fontSize: '0.75rem',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            margin: '0 0 4px',
          }}
        >
          Written by
        </p>
        <p
          style={{
            fontSize: '1.125rem',
            fontWeight: 700,
            margin: '0 0 2px',
            color: 'var(--text)',
          }}
        >
          {author.name}
        </p>
        <p
          style={{
            fontSize: '0.875rem',
            color: 'var(--text-muted)',
            margin: '0 0 var(--space-sm)',
          }}
        >
          {author.role}
        </p>
        <p
          style={{
            fontSize: '0.9375rem',
            lineHeight: 1.65,
            color: 'var(--text-secondary)',
            margin: '0 0 var(--space-md)',
          }}
        >
          {author.bio}
        </p>

        {/* Links */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <Link
            href="/about/"
            style={{
              fontSize: '0.875rem',
              fontWeight: 600,
              color: 'var(--accent)',
              textDecoration: 'none',
            }}
          >
            About theuaecareer.com →
          </Link>
          {author.portfolio && (
            <a
              href={author.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: 'var(--text-muted)',
                textDecoration: 'none',
              }}
            >
              Portfolio ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
