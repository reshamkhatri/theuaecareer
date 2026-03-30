import type { Metadata } from 'next';
import Link from 'next/link';
import { FiArrowRight, FiBookOpen, FiFileText, FiTool } from 'react-icons/fi';

export const metadata: Metadata = {
  title: 'Resources | Interview prep, guides and job-seeker tools',
  description:
    'Explore career resources for Gulf job seekers, including the Interview Question Bank, practical blog guides, and free job-search tools.',
  alternates: {
    canonical: '/resources',
  },
  openGraph: {
    title: 'Resources | Interview prep, guides and job-seeker tools',
    description:
      'Explore career resources for Gulf job seekers, including the Interview Question Bank, practical blog guides, and free job-search tools.',
    url: '/resources',
  },
};

const resourceCards = [
  {
    href: '/resources/interview-question-bank',
    icon: <FiBookOpen />,
    label: 'Interview prep',
    title: 'Interview Question Bank',
    description:
      'Research-backed interview questions for Construction, Hospitality, Retail, and Oil & Gas roles commonly hired across the Gulf.',
    cta: 'Start preparing',
  },
  {
    href: '/blog',
    icon: <FiFileText />,
    label: 'Career guides',
    title: 'Articles & explainers',
    description:
      'Read practical guides on job applications, official career pages, CV strategy, and Gulf job-market updates.',
    cta: 'Read the blog',
  },
  {
    href: '/tools/currency-converter',
    icon: <FiTool />,
    label: 'Free tools',
    title: 'Currency Converter',
    description:
      'Check common remittance corridors like AED to INR, SAR to PHP, and QAR to NPR before you send money home.',
    cta: 'Open converter',
  },
];

export default function ResourcesPage() {
  return (
    <section
      className="section"
      style={{
        background:
          'radial-gradient(circle at top left, rgba(45,212,191,0.16), transparent 30%), radial-gradient(circle at top right, rgba(99,102,241,0.14), transparent 32%), linear-gradient(180deg, #f8fafc 0%, #ffffff 100%)',
      }}
    >
      <div className="container" style={{ display: 'grid', gap: '2rem' }}>
        <div style={{ maxWidth: '760px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              borderRadius: '999px',
              padding: '6px 14px',
              background: 'rgba(45,212,191,0.16)',
              color: '#0f766e',
              fontWeight: 800,
              fontSize: '0.8rem',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '14px',
            }}
          >
            Built for Gulf job seekers
          </div>
          <h1 style={{ fontSize: 'clamp(2.2rem, 7vw, 3.8rem)', marginBottom: '14px', lineHeight: 1.05 }}>
            Resources that help before, during, and after the interview
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.12rem', lineHeight: 1.8 }}>
            Use this section to prepare smarter: practice real interview themes, read employer-focused career guides,
            and use practical tools built around Gulf job-search needs.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '18px',
          }}
          className="resources-grid"
        >
          {resourceCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="card"
              style={{
                padding: '1.75rem',
                borderRadius: '28px',
                textDecoration: 'none',
                display: 'grid',
                gap: '16px',
                border: '1px solid rgba(148,163,184,0.18)',
                boxShadow: '0 20px 40px rgba(15,23,42,0.06)',
                background: 'linear-gradient(180deg, rgba(255,255,255,0.98), rgba(248,250,252,0.98))',
              }}
            >
              <div
                style={{
                  width: '56px',
                  height: '56px',
                  borderRadius: '20px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(99,102,241,0.12)',
                  color: '#4338ca',
                  fontSize: '1.4rem',
                }}
              >
                {card.icon}
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  width: 'fit-content',
                  padding: '6px 12px',
                  borderRadius: '999px',
                  background: 'rgba(255,255,255,0.92)',
                  border: '1px solid var(--border)',
                  color: 'var(--text-secondary)',
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                {card.label}
              </div>
              <div>
                <h2 style={{ fontSize: '1.45rem', marginBottom: '10px' }}>{card.title}</h2>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, margin: 0 }}>{card.description}</p>
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--accent)',
                  fontWeight: 800,
                  fontSize: '0.92rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                {card.cta} <FiArrowRight />
              </div>
            </Link>
          ))}
        </div>

        <style
          dangerouslySetInnerHTML={{
            __html: `
              @media (max-width: 980px) {
                .resources-grid {
                  grid-template-columns: 1fr !important;
                }
              }
            `,
          }}
        />
      </div>
    </section>
  );
}
