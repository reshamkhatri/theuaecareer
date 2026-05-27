import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { FiGlobe, FiMail, FiMapPin, FiExternalLink } from 'react-icons/fi';

export const metadata: Metadata = {
  // Title template in app/layout.tsx appends " | theuaecareer", so this
  // becomes "About Us | theuaecareer". Avoid repeating the brand here.
  title: 'About Us',
  description:
    'Meet the team behind theuaecareer.com — Resham KC and Nishan KC. We help expats find jobs in the UAE, Saudi Arabia, and Qatar with curated listings, career guides, and free tools.',
  alternates: {
    canonical: '/about/',
  },
  openGraph: {
    title: 'About theuaecareer.com — the team behind your Gulf job search',
    description:
      'Meet Resham KC and Nishan KC, the team building theuaecareer.com. Curated UAE, Saudi, and Qatar job listings, free career tools, and honest hiring guidance for Gulf expats.',
    url: '/about/',
    type: 'website',
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
            <p>
              We focus on the practical, on-the-ground reality of Gulf hiring — what salary you
              actually get, what walk-in interviews actually look like, which contract clauses
              actually trip people up — instead of recycling generic global career advice. Every
              guide, salary breakdown, and tool on this site exists because someone we know
              struggled to find that information when they needed it.
            </p>

            <h2>Our Story</h2>
            <p>
              theuaecareer.com was started in early 2026 by Resham KC and Nishan KC, two South-Asian
              expats with direct experience navigating the UAE job market — both as candidates and
              as people who repeatedly helped friends and family members land their first Gulf
              role.
            </p>
            <p>
              The trigger was a familiar pattern: a cousin or college friend lands in Dubai on a
              visit visa, has 60 days to find work, and ends up paying a fake recruiter AED 500 for
              a fictitious shortlist. Or accepts a hotel housekeeping offer at AED 1,200 because no
              one explained that service charge and accommodation are negotiable. Or signs a
              contract without realising the basic salary determines their gratuity. We saw enough
              of this to build the platform we wished existed when we arrived.
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
            <h2>How We Source Job Listings</h2>
            <p>
              Every job listing on theuaecareer.com goes through a manual curation step before
              going live. We do not auto-scrape Indeed, LinkedIn, or aggregator feeds. Our sources
              are:
            </p>
            <ul>
              <li>
                Public employer career pages (verified against the company&apos;s official domain
                and Trade Licence number where available)
              </li>
              <li>
                Walk-in interview notices shared on official social channels of UAE employers
              </li>
              <li>Direct submissions from HR or hiring managers we have built relationships with</li>
              <li>
                Editorial leads from our community — job seekers and employees who tip us off about
                upcoming hiring events
              </li>
            </ul>
            <p>
              Listings that show classic scam markers — vague company names, Gmail/Outlook contact
              addresses for management roles, upfront fee requests, or pressure tactics — are
              rejected at the curation step. Our running guide on{' '}
              <Link href="/blog/avoid-fake-gulf-job-offers/">how to spot fake Gulf job offers</Link>{' '}
              is built from the patterns we see in rejected submissions.
            </p>

            <h2>How We Write Articles</h2>
            <p>
              Every article on theuaecareer.com is written or reviewed by Resham KC or Nishan KC
              before publishing. We do not publish AI-generated filler content. When we use AI as a
              drafting tool, the final version is edited, fact-checked, and signed off by a named
              human author — and the article carries that human&apos;s byline, not a generic
              &ldquo;Editorial Team&rdquo; label.
            </p>
            <p>Our editorial process for any new article:</p>
            <ol>
              <li>
                <strong>Question first.</strong> We start with a real question we have heard from
                Gulf job seekers — not a keyword spreadsheet.
              </li>
              <li>
                <strong>Primary sources.</strong> Salary figures are cross-checked against MOHRE
                wage protection records (where public), employer career pages, and at least one
                first-hand conversation with someone in the role.
              </li>
              <li>
                <strong>Legal cross-check.</strong> Articles touching UAE Labour Law, visa rules, or
                gratuity are checked against the latest Federal Decree-Law text on the MOHRE and ICP
                portals.
              </li>
              <li>
                <strong>Date-stamp.</strong> Every article shows its publish date and last-updated
                date. We re-review evergreen articles at least once every 12 months and refresh
                anything affected by a regulatory change immediately.
              </li>
              <li>
                <strong>Corrections policy.</strong> If we get something wrong, we fix the article,
                note what changed, and reset the last-updated date. If you spot an error, please
                <Link href="/contact/"> let us know</Link> and we will credit you for the catch.
              </li>
            </ol>

            <h2>Editorial Independence</h2>
            <p>
              theuaecareer.com is independently owned and operated. We do not accept payment from
              employers to publish, prioritise, or favourably review their job listings. We do not
              accept payment from training providers, immigration consultants, or relocation firms
              to recommend them in our articles. We may earn advertising revenue from Google AdSense
              (this funds the site) and occasional affiliate commissions on tools we already use
              and would recommend regardless — see our <Link href="/disclaimer/">Disclaimer</Link>{' '}
              for the full picture.
            </p>

            <h2>Why Trust Us</h2>
            <ul>
              <li>
                <strong>Named human authors.</strong> Every article carries a real byline, not a
                generic editorial label.
              </li>
              <li>
                <strong>First-hand Gulf experience.</strong> Both founders live and work in the
                UAE — this is our market, not a content niche we picked because it ranks well.
              </li>
              <li>
                <strong>No paid placements.</strong> Job listings are editorial, not advertorial.
              </li>
              <li>
                <strong>Transparent corrections.</strong> When we update an article, we say so.
              </li>
              <li>
                <strong>Free tools, no signup.</strong> The CV Maker, Gratuity Calculator, and
                Currency Converter work without an account, without an email gate, and without
                selling your data.
              </li>
            </ul>

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
