import type { Metadata } from 'next';
import Link from 'next/link';
import { FiArrowRight, FiBookOpen, FiFileText, FiTool } from 'react-icons/fi';

export const metadata: Metadata = {
  title: 'Resources | Interview prep, guides and job-seeker tools',
  description:
    'Explore practical resources for Gulf job seekers, including the Interview Question Bank, career guides, and free planning tools.',
  alternates: {
    canonical: '/resources',
  },
  openGraph: {
    title: 'Resources | Interview prep, guides and job-seeker tools',
    description:
      'Explore practical resources for Gulf job seekers, including the Interview Question Bank, career guides, and free planning tools.',
    url: '/resources',
  },
};

const resourceCards = [
  {
    href: '/resources/interview-question-bank',
    icon: <FiBookOpen />,
    eyebrow: 'Interview prep',
    title: 'Interview Question Bank',
    description:
      'Sector-specific questions for Construction, Hospitality, Retail, and Oil & Gas, with sample answers you can adapt to your own experience.',
    bullets: ['Real recruiter themes', 'Sample answers included', 'Built for Gulf-facing roles'],
  },
  {
    href: '/blog',
    icon: <FiFileText />,
    eyebrow: 'Career guides',
    title: 'Articles and explainers',
    description:
      'Employer-facing application advice, hiring-page guides, and practical UAE job-market articles written for real job seekers.',
    bullets: ['Human-written articles', 'Application strategy', 'Official career-page guidance'],
  },
  {
    href: '/tools/currency-converter',
    icon: <FiTool />,
    eyebrow: 'Planning tools',
    title: 'Currency Converter',
    description:
      'Check common Gulf remittance routes like AED to INR, SAR to PHP, and QAR to NPR before you move money or compare offers.',
    bullets: ['Automatic rate updates', 'Gulf corridors', 'Built for salary planning'],
  },
];

export default function ResourcesPage() {
  return (
    <section
      className="section"
      style={{
        background:
          'linear-gradient(180deg, #f8fafc 0%, #ffffff 52%), radial-gradient(circle at top left, rgba(15,23,42,0.06), transparent 28%)',
      }}
    >
      <div className="container" style={{ display: 'grid', gap: '2rem' }}>
        <section
          className="card"
          style={{
            padding: 'clamp(1.5rem, 3vw, 2.2rem)',
            borderRadius: '32px',
            border: '1px solid rgba(148,163,184,0.16)',
            background: 'linear-gradient(135deg, #0f172a 0%, #14213d 55%, #19324d 100%)',
            color: 'white',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background:
                'radial-gradient(circle at top right, rgba(45,212,191,0.2), transparent 32%), radial-gradient(circle at bottom left, rgba(99,102,241,0.22), transparent 30%)',
            }}
          />
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'grid',
              gridTemplateColumns: '1.15fr 0.85fr',
              gap: '1.5rem',
              alignItems: 'end',
            }}
            className="resources-hero-grid"
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  borderRadius: '999px',
                  padding: '6px 14px',
                  background: 'rgba(255,255,255,0.12)',
                  color: 'rgba(226,232,240,0.92)',
                  fontWeight: 800,
                  fontSize: '0.8rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '14px',
                }}
              >
                Practical Gulf job-seeker library
              </div>
              <h1 style={{ fontSize: 'clamp(2.3rem, 7vw, 4.1rem)', marginBottom: '14px', lineHeight: 1.02, color: 'white' }}>
                Resources that feel useful, not generic
              </h1>
              <p style={{ color: 'rgba(226,232,240,0.82)', fontSize: '1.1rem', lineHeight: 1.8, maxWidth: '60ch' }}>
                Use this section for serious preparation: interview practice with sample answers, readable career guides,
                and tools that help you make better decisions before you apply, interview, or send money home.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gap: '14px',
                alignSelf: 'stretch',
              }}
            >
              <div
                style={{
                  borderRadius: '22px',
                  padding: '1.1rem 1.2rem',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div style={{ color: 'rgba(226,232,240,0.64)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>
                  Best first stop
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, marginTop: '8px' }}>Interview Question Bank</div>
                <p style={{ margin: '8px 0 0', color: 'rgba(226,232,240,0.78)', lineHeight: 1.7 }}>
                  Start there if you want direct question practice and sample answer structure.
                </p>
              </div>

              <div
                style={{
                  borderRadius: '22px',
                  padding: '1.1rem 1.2rem',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <div style={{ color: 'rgba(226,232,240,0.64)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 700 }}>
                  Also useful
                </div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, marginTop: '8px' }}>Career guides + remittance tools</div>
                <p style={{ margin: '8px 0 0', color: 'rgba(226,232,240,0.78)', lineHeight: 1.7 }}>
                  Use the guides to plan your applications and the tools to handle salary-related decisions more clearly.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section
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
                textDecoration: 'none',
                color: 'inherit',
                padding: '1.75rem',
                borderRadius: '28px',
                border: '1px solid rgba(148,163,184,0.16)',
                background: '#ffffff',
                boxShadow: '0 20px 40px rgba(15,23,42,0.05)',
                display: 'grid',
                gap: '16px',
              }}
            >
              <div
                style={{
                  width: '58px',
                  height: '58px',
                  borderRadius: '20px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#eef2ff',
                  color: '#4338ca',
                  fontSize: '1.45rem',
                }}
              >
                {card.icon}
              </div>

              <div
                style={{
                  color: 'var(--text-muted)',
                  fontWeight: 800,
                  fontSize: '0.78rem',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                }}
              >
                {card.eyebrow}
              </div>

              <div>
                <h2 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{card.title}</h2>
                <p style={{ margin: 0, color: 'var(--text-secondary)', lineHeight: 1.8 }}>{card.description}</p>
              </div>

              <ul style={{ margin: 0, paddingLeft: '1.1rem', color: 'var(--text-secondary)', lineHeight: 1.9 }}>
                {card.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>

              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--accent)',
                  fontWeight: 800,
                  fontSize: '0.92rem',
                }}
              >
                Open resource <FiArrowRight />
              </div>
            </Link>
          ))}
        </section>

        <style
          dangerouslySetInnerHTML={{
            __html: `
              @media (max-width: 980px) {
                .resources-hero-grid,
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

