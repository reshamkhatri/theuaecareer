import Link from 'next/link';

const studioUrl = process.env.NEXT_PUBLIC_SANITY_STUDIO_URL?.trim() || '';

export const metadata = {
  title: 'Content Admin | theuaecareer.com',
  robots: {
    index: false,
    follow: false,
  },
};

export default function AdminPage() {
  return (
    <main
      style={{
        minHeight: '100vh',
        display: 'grid',
        placeItems: 'center',
        padding: '2rem',
        background:
          'linear-gradient(160deg, rgba(15,23,42,1) 0%, rgba(15,118,110,0.95) 100%)',
      }}
    >
      <div
        style={{
          width: 'min(100%, 760px)',
          background: 'rgba(255,255,255,0.96)',
          color: '#0f172a',
          borderRadius: '24px',
          padding: '2rem',
          boxShadow: '0 25px 60px rgba(15,23,42,0.24)',
        }}
      >
        <p
          style={{
            margin: 0,
            color: '#0f766e',
            fontWeight: 800,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            fontSize: '0.8rem',
          }}
        >
          Static Site Admin
        </p>
        <h1 style={{ margin: '0.75rem 0 1rem', fontSize: 'clamp(2rem, 5vw, 2.6rem)' }}>
          Content now lives in Sanity Studio
        </h1>
        <p style={{ margin: 0, color: '#334155', lineHeight: 1.7 }}>
          The public website is now optimized for Cloudflare Pages static hosting. Manage jobs and
          articles in Sanity Studio, publish there, then trigger a rebuild for the live site.
        </p>

        <div style={{ marginTop: '1.5rem', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          {studioUrl ? (
            <Link href={studioUrl} className="btn btn-primary" target="_blank">
              Open Sanity Studio
            </Link>
          ) : (
            <div
              style={{
                padding: '0.9rem 1rem',
                borderRadius: '14px',
                background: '#f8fafc',
                border: '1px solid #e2e8f0',
                color: '#334155',
              }}
            >
              Set `NEXT_PUBLIC_SANITY_STUDIO_URL` after running `npm run sanity:deploy`.
            </div>
          )}
          <Link href="/" className="btn btn-secondary">
            Back to website
          </Link>
        </div>

        <div
          style={{
            marginTop: '1.5rem',
            padding: '1rem',
            borderRadius: '16px',
            background: '#f8fafc',
            border: '1px solid #e2e8f0',
            fontFamily: 'monospace',
            fontSize: '0.95rem',
            lineHeight: 1.7,
          }}
        >
          npm run sanity:deploy
          <br />
          NEXT_PUBLIC_SANITY_STUDIO_URL=https://your-studio-url
        </div>
      </div>
    </main>
  );
}
