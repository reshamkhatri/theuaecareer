import type { Metadata } from 'next';
import Link from 'next/link';
import { FiArrowRight, FiBookOpen, FiFileText, FiTool } from 'react-icons/fi';

export const metadata: Metadata = {
  title: 'Resources | Interview prep, guides and job-seeker tools',
  description:
    'Explore practical resources for Gulf job seekers, including the Interview Question Bank, career guides, and free planning tools.',
  alternates: {
    canonical: '/resources/',
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
    accent: '#6366f1',
    accentBg: '#eef2ff',
  },
  {
    href: '/blog',
    icon: <FiFileText />,
    eyebrow: 'Career guides',
    title: 'Articles and explainers',
    description:
      'Employer-facing application advice, hiring-page guides, and practical UAE job-market articles written for real job seekers.',
    bullets: ['Human-written articles', 'Application strategy', 'Official career-page guidance'],
    accent: '#0f766e',
    accentBg: '#ecfdf5',
  },
  {
    href: '/tools/currency-converter',
    icon: <FiTool />,
    eyebrow: 'Planning tools',
    title: 'Currency Converter',
    description:
      'Check common Gulf remittance routes like AED to INR, SAR to PHP, and QAR to NPR before you move money or compare offers.',
    bullets: ['Automatic rate updates', 'Gulf corridors', 'Built for salary planning'],
    accent: '#b45309',
    accentBg: '#fef3c7',
  },
];

export default function ResourcesPage() {
  return (
    <section className="section" style={{ background: '#f8fafc' }}>
      <div className="container" style={{ display: 'grid', gap: '2.5rem' }}>
        {/* Hero */}
        <div className="resources-hero">
          <div className="resources-hero-inner">
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'radial-gradient(circle at 80% 20%, rgba(99, 102, 241, 0.15), transparent 50%), radial-gradient(circle at 20% 80%, rgba(45, 212, 191, 0.12), transparent 40%)',
                borderRadius: 'inherit',
              }}
            />
            <div style={{ position: 'relative', zIndex: 1 }} className="resources-hero-grid">
              <div>
                <div className="resources-eyebrow">
                  Practical Gulf job-seeker library
                </div>
                <h1 className="resources-hero-title">
                  Resources that feel useful, not generic
                </h1>
                <p className="resources-hero-desc">
                  Interview practice with sample answers, readable career guides,
                  and tools that help you make better decisions before you apply, interview, or send money home.
                </p>
              </div>

              <div className="resources-hero-cards">
                <div className="resources-hero-card">
                  <span className="resources-hero-card-label">Best first stop</span>
                  <span className="resources-hero-card-title">Interview Question Bank</span>
                  <span className="resources-hero-card-desc">
                    Direct question practice and sample answer structure for Gulf roles.
                  </span>
                </div>
                <div className="resources-hero-card">
                  <span className="resources-hero-card-label">Also useful</span>
                  <span className="resources-hero-card-title">Career guides + remittance tools</span>
                  <span className="resources-hero-card-desc">
                    Plan applications and handle salary-related decisions more clearly.
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Resource cards */}
        <div className="resources-card-grid">
          {resourceCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="resources-card"
            >
              <div
                className="resources-card-icon"
                style={{ background: card.accentBg, color: card.accent }}
              >
                {card.icon}
              </div>

              <span
                className="resources-card-eyebrow"
                style={{ color: card.accent }}
              >
                {card.eyebrow}
              </span>

              <div>
                <h2 className="resources-card-title">{card.title}</h2>
                <p className="resources-card-desc">{card.description}</p>
              </div>

              <ul className="resources-card-bullets">
                {card.bullets.map((bullet) => (
                  <li key={bullet}>
                    <span className="resources-card-bullet-dot" style={{ background: card.accent }} />
                    {bullet}
                  </li>
                ))}
              </ul>

              <span className="resources-card-link">
                Explore <FiArrowRight />
              </span>
            </Link>
          ))}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .resources-hero-inner {
              position: relative;
              border-radius: 24px;
              background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
              padding: clamp(28px, 4vw, 48px);
              overflow: hidden;
            }

            .resources-hero-grid {
              display: grid;
              grid-template-columns: 1.2fr 0.8fr;
              gap: 32px;
              align-items: end;
            }

            .resources-eyebrow {
              display: inline-flex;
              align-items: center;
              gap: 6px;
              border-radius: 100px;
              padding: 5px 14px;
              background: rgba(255, 255, 255, 0.1);
              color: rgba(226, 232, 240, 0.85);
              font-weight: 700;
              font-size: 0.75rem;
              text-transform: uppercase;
              letter-spacing: 0.6px;
              margin-bottom: 18px;
            }

            .resources-hero-title {
              font-size: clamp(2rem, 5vw, 3.4rem);
              color: #fff;
              line-height: 1.08;
              margin-bottom: 16px;
              letter-spacing: -0.025em;
            }

            .resources-hero-desc {
              color: rgba(226, 232, 240, 0.72);
              font-size: 1.02rem;
              line-height: 1.7;
              max-width: 50ch;
              margin: 0;
            }

            .resources-hero-cards {
              display: grid;
              gap: 12px;
            }

            .resources-hero-card {
              border-radius: 16px;
              padding: 18px 20px;
              background: rgba(255, 255, 255, 0.06);
              border: 1px solid rgba(255, 255, 255, 0.06);
              display: grid;
              gap: 6px;
              transition: background 0.15s ease;
            }

            .resources-hero-card:hover {
              background: rgba(255, 255, 255, 0.09);
            }

            .resources-hero-card-label {
              font-size: 0.72rem;
              font-weight: 700;
              text-transform: uppercase;
              letter-spacing: 0.6px;
              color: rgba(226, 232, 240, 0.5);
            }

            .resources-hero-card-title {
              font-size: 1.05rem;
              font-weight: 800;
              color: #fff;
            }

            .resources-hero-card-desc {
              font-size: 0.88rem;
              color: rgba(226, 232, 240, 0.6);
              line-height: 1.55;
            }

            /* Resource cards */
            .resources-card-grid {
              display: grid;
              grid-template-columns: repeat(3, 1fr);
              gap: 20px;
            }

            .resources-card {
              text-decoration: none;
              color: inherit;
              background: #fff;
              border-radius: 18px;
              border: 1px solid rgba(0, 0, 0, 0.06);
              padding: 28px;
              display: grid;
              gap: 14px;
              align-content: start;
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
              transition: box-shadow 0.2s ease, transform 0.2s ease, border-color 0.2s ease;
            }

            .resources-card:hover {
              box-shadow: 0 8px 30px rgba(0, 0, 0, 0.08);
              transform: translateY(-3px);
              border-color: transparent;
            }

            .resources-card:hover .resources-card-link {
              gap: 10px;
            }

            .resources-card-icon {
              width: 48px;
              height: 48px;
              border-radius: 14px;
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1.25rem;
            }

            .resources-card-eyebrow {
              font-size: 0.72rem;
              font-weight: 800;
              text-transform: uppercase;
              letter-spacing: 0.6px;
            }

            .resources-card-title {
              font-size: 1.3rem;
              margin-bottom: 8px;
              line-height: 1.3;
            }

            .resources-card-desc {
              margin: 0;
              color: var(--text-secondary);
              font-size: 0.92rem;
              line-height: 1.65;
            }

            .resources-card-bullets {
              display: grid;
              gap: 8px;
              padding: 0;
              margin: 0;
            }

            .resources-card-bullets li {
              display: flex;
              align-items: center;
              gap: 10px;
              font-size: 0.88rem;
              color: var(--text-secondary);
            }

            .resources-card-bullet-dot {
              width: 5px;
              height: 5px;
              border-radius: 50%;
              flex-shrink: 0;
            }

            .resources-card-link {
              display: inline-flex;
              align-items: center;
              gap: 6px;
              color: var(--accent);
              font-weight: 700;
              font-size: 0.88rem;
              margin-top: 4px;
              transition: gap 0.2s ease;
            }

            @media (max-width: 980px) {
              .resources-hero-grid {
                grid-template-columns: 1fr;
              }

              .resources-card-grid {
                grid-template-columns: 1fr;
              }
            }
          `,
        }}
      />
    </section>
  );
}
