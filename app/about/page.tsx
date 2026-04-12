import type { Metadata } from 'next';
import { FiGlobe, FiMail, FiMapPin } from 'react-icons/fi';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Learn how theuaecareer.com helps UAE, Saudi Arabia, and Qatar job seekers with practical listings, career guides, interview prep, and free tools.',
  alternates: {
    canonical: '/about/',
  },
};

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
                <strong>Job Listings</strong> - curated positions across UAE, Saudi Arabia, and
                Qatar in sectors like hospitality, IT, healthcare, construction, sales, and more
              </li>
              <li>
                <strong>Walk-In Interviews</strong> - regularly updated hiring-event listings to
                help job seekers act quickly
              </li>
              <li>
                <strong>Career Guides</strong> - practical articles on labour law, visas, salary
                expectations, CV writing, and interviews
              </li>
              <li>
                <strong>Free Tools</strong> - a CV builder and a UAE gratuity calculator, both
                free to use with no public account required
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
                <strong>Accuracy</strong> - we aim to review listings before publishing and remove
                stale content promptly
              </li>
              <li>
                <strong>Accessibility</strong> - our content is written in clear English and our
                tools are designed to work well on mobile devices
              </li>
              <li>
                <strong>Transparency</strong> - we clearly explain how users should apply and what
                the platform does not do
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
          </div>
        </div>
      </section>
    </>
  );
}
