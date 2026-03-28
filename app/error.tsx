'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <section className="section">
          <div className="container container-narrow">
            <div className="card" style={{ padding: 'var(--space-3xl)', textAlign: 'center' }}>
              <div
                style={{
                  fontSize: '0.875rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--danger)',
                  marginBottom: 'var(--space-md)',
                }}
              >
                Something went wrong
              </div>
              <h1 style={{ fontSize: 'clamp(2rem, 6vw, 3rem)', marginBottom: 'var(--space-md)' }}>
                We hit an unexpected error
              </h1>
              <p style={{ fontSize: '1.05rem', marginBottom: 'var(--space-xl)' }}>
                Refresh the page and try again. If the problem continues, use the contact page and
                we&apos;ll look into it.
              </p>
              <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
                <button className="btn btn-primary" onClick={() => window.location.reload()}>
                  Retry
                </button>
                <a href="/contact" className="btn btn-secondary">
                  Contact Support
                </a>
              </div>
            </div>
          </div>
        </section>
      </body>
    </html>
  );
}
