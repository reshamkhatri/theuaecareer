import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { FiGlobe, FiMail, FiMapPin, FiExternalLink } from 'react-icons/fi';

export const metadata: Metadata = {
  title: 'About Us — theuaecareer.com',
  description:
    'Meet the team behind theuaecareer.com — Resham KC and Nishan KC. We help expats find jobs in the UAE, Saudi Arabia, and Qatar with curated listings, career guides, and free tools.',
  alternates: {
    canonical: '/about/',
  },
};

const team = [
  {
    name: 'Resham KC',
    role: 'Co-Founder & Developer',
    initials: 'RK',
    avatar: '/authors/resham-kc.png',
    bio: 'Resham is a full-stack developer and career analyst who built theuaecareer.com from the ground up. With direct experience in the Gulf job market and a background in software engineering, he designed all the free tools on this platform — the CV Maker, Gratuity Calculator, and Currency Converter — to solve real problems expat job seekers face every day.',
    portfolio: 'https://rxm.ae',
    portfolioLabel: 'rxm.ae',
  },
  {
    name: 'Nishan KC',
    role: 'Co-Founder & Career Researcher',
    initials: 'NK',
    avatar: null,
    bio: 'Nishan is a career researcher and content strategist who shapes the editorial direction of theuaecareer.com. His focus is making sure every guide, salary article, and interview tip we publish reflects how hiring actually works in the UAE — not just generic career advice. He has first-hand knowledge of how expats from South Asia navigate Gulf job searches.',
    portfolio: null,
    portfolioLabel: null,
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="about-hero">
        <div className="container about-hero-content">
          <h1>
            About <span>theuaecareer</span>.com
          </h1>
          <p>Your trusted gateway to Gulf careers</p>
        </div>
      </section>

      <section className="section">
        <div className="container container-narrow">
          <div className="prose">
            <h2>Our Mission</h2>
            <p>
              theuaecareer.com is an English-language job information portal dedicated to helping
              people living and working in the UAE, Saudi Arabia, and Qatar find their next career
              opportunity. We aggregate useful job listings, publish practical career guides, and
              provide free tools designed for Gulf-based job seekers.
            </p>

            <h2>What We Do</h2>
            <p>
              We are <strong>not a recruitment agency</strong>. We are a content and information
              platform focused on clear, useful, timely job-search support.
            </p>
            <ul>
              <li>
                <strong>Job Listings</strong> — curated positions across UAE, Saudi Arabia, and
                Qatar in sectors like hospitality, IT, healthcare, construction, sales, and more
              </li>
              <li>
                <strong>Walk-In Interviews</strong> — regularly updated hiring-event listings to
                help job seekers act quickly
              </li>
              <li>
                <strong>Career Guides</strong> — practical articles on labour law, visas, salary
                expectations, CV writing, and interviews
              </li>
              <li>
                <strong>Free Tools</strong> — a CV builder and a UAE gratuity calculator, both
                free to use with no account required
              </li>
            </ul>

            <h2>Who We Serve</h2>
            <p>
              Our primary audience is expatriate job seekers based in the UAE, especially people
              looking for practical guidance, current hiring updates, and tools that reflect the
              Gulf job market. We also support job seekers exploring opportunities in Saudi Arabia
              and Qatar.
            </p>

            <h2>Our Values</h2>
            <ul>
              <li>
                <strong>Accuracy</strong> — we review listings before publishing and remove stale
                content promptly
              </li>
              <li>
                <strong>Accessibility</strong> — our content is written in clear English and our
                tools are designed to work well on mobile devices
              </li>
              <li>
                <strong>Transparency</strong> — we clearly explain how users should apply and what
                the platform does not do
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* ── Meet the Team ─────────────────────────────── */}
      <section className="section" style={{ background: 'var(--surface)', paddingTop: 'var(--space-3xl)', paddingBottom: 'var(--space-3xl)' }}>
        <div className="container">
          <h2
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              fontWeight: 800,
              textAlign: 'center',
              marginBottom: 'var(--space-sm)',
            }}
          >
            Meet the Team
          </h2>
          <p
            style={{
              textAlign: 'center',
              color: 'var(--text-secondary)',
              marginBottom: 'var(--space-3xl)',
              maxWidth: '560px',
              margin: '0 auto var(--space-3xl)',
            }}
          >
            Two people building a better job-search resource for the Gulf.
          </p>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: 'var(--space-xl)',
              maxWidth: '900px',
              margin: '0 auto',
            }}
          >
            {team.map((member) => (
              <div
                key={member.name}
                style={{
                  background: 'var(--background)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-xl)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-md)',
                }}
              >
                {/* Avatar */}
                <div
                  style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    background: 'var(--accent)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    color: '#fff',
                    flexShrink: 0,
                    position: 'relative',
                  }}
                >
                  {member.avatar ? (
                    <Image
                      src={member.avatar}
                      alt={`${member.name}, ${member.role} at theuaecareer.com`}
                      fill
                      style={{ objectFit: 'cover', objectPosition: 'top center' }}
                      sizes="80px"
                    />
                  ) : (
                    member.initials
                  )}
                </div>

                {/* Info */}
                <div>
                  <p
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      margin: '0 0 4px',
                      color: 'var(--text)',
                    }}
                  >
                    {member.name}
                  </p>
                  <p
                    style={{
                      fontSize: '0.875rem',
                      color: 'var(--accent)',
                      fontWeight: 600,
                      margin: '0 0 var(--space-md)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {member.role}
                  </p>
                  <p
                    style={{
                      fontSize: '0.9375rem',
                      lineHeight: 1.7,
                      color: 'var(--text-secondary)',
                      margin: 0,
                    }}
                  >
                    {member.bio}
                  </p>
                </div>

                {/* Links */}
                {member.portfolio && (
                  <a
                    href={member.portfolio}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.875rem',
                      fontWeight: 600,
                      color: 'var(--accent)',
                      textDecoration: 'none',
                      marginTop: 'auto',
                    }}
                  >
                    <FiGlobe size={14} />
                    {member.portfolioLabel}
                    <FiExternalLink size={12} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Editorial Standards ───────────────────────── */}
      <section className="section">
        <div className="container container-narrow">
          <div className="prose">
            <h2>Editorial Standards</h2>
            <p>
              Every article on theuaecareer.com is written or reviewed by Resham KC or Nishan KC
              before publishing. We do not publish AI-generated filler content. Our goal is to give
              Gulf job seekers information that is accurate, specific, and practically useful.
            </p>
            <p>
              Job listings are curated from public employer sources. We verify employer identity
              where possible and remove listings that show signs of being fraudulent or expired.
              We do not charge job seekers and we do not accept payment from employers to list
              positions.
            </p>

            <h2>Contact Us</h2>
            <p>Have questions, feedback, or a listing to share? We would love to hear from you.</p>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-md)',
                marginTop: 'var(--space-lg)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                <FiMail style={{ color: 'var(--accent)' }} />
                <span>info [at] theuaecareer.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                <FiMapPin style={{ color: 'var(--accent)' }} />
                <span>United Arab Emirates</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                <FiGlobe style={{ color: 'var(--accent)' }} />
                <span>theuaecareer.com</span>
              </div>
            </div>

            <div style={{ marginTop: 'var(--space-xl)' }}>
              <Link href="/contact/" className="btn btn-primary">
                Send us a message →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
