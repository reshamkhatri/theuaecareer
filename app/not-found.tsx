import Link from 'next/link';

export default function NotFound() {
  return (
    <section className="section">
      <div className="container container-narrow">
        <div className="card" style={{ padding: 'var(--space-3xl)', textAlign: 'center' }}>
          <div
            style={{
              fontSize: '0.875rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: 'var(--space-md)',
            }}
          >
            Error 404
          </div>
          <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', marginBottom: 'var(--space-md)' }}>
            This page could not be found
          </h1>
          <p style={{ fontSize: '1.05rem', marginBottom: 'var(--space-xl)' }}>
            Try the latest jobs, walk-in interviews, or career guides instead of landing on a dead end.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <Link href="/" className="btn btn-primary">
              Go Home
            </Link>
            <Link href="/jobs" className="btn btn-secondary">
              Browse Jobs
            </Link>
            <Link href="/blog" className="btn btn-secondary">
              Read the Blog
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
