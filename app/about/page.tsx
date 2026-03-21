import type { Metadata } from 'next';
import { FiMail, FiMapPin, FiGlobe } from 'react-icons/fi';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about theuaecareer.com — your trusted source for job listings, career guides, and tools for UAE and Gulf job seekers.',
};

export default function AboutPage() {
  return (
    <>
      <section className="hero" style={{ padding: 'var(--space-2xl) 0' }}>
        <div className="container hero-content">
          <h1>About <span>theuaecareer</span>.com</h1>
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
              opportunity. We aggregate job listings, publish practical career guides, and provide
              free tools designed specifically for Gulf-based job seekers.
            </p>

            <h2>What We Do</h2>
            <p>
              We are <strong>not a recruitment agency</strong>. We are a content and information
              portal that puts useful, accurate, and timely job information at your fingertips:
            </p>
            <ul>
              <li><strong>Job Listings</strong> — Curated positions across UAE, Saudi Arabia, and Qatar in sectors like hospitality, IT, healthcare, construction, sales, and more</li>
              <li><strong>Walk-In Interviews</strong> — Updated weekly, our walk-in interview listings help you find same-week hiring events near you</li>
              <li><strong>Career Guides</strong> — Practical articles on topics like UAE labour law, visa processes, salary expectations, and interview tips</li>
              <li><strong>Free Tools</strong> — An AI-powered CV Maker and a UAE Gratuity Calculator, both free to use with no signup required</li>
            </ul>

            <h2>Who We Serve</h2>
            <p>
              Our primary audience is expatriate job seekers based in the UAE — particularly those
              from South Asia (India, Pakistan, Nepal, Philippines) who are looking for new roles
              or career guidance. We also serve job seekers exploring opportunities in Saudi Arabia
              and Qatar.
            </p>

            <h2>Our Values</h2>
            <ul>
              <li><strong>Accuracy</strong> — Every listing is reviewed before publishing. We remove expired jobs weekly.</li>
              <li><strong>Accessibility</strong> — Our content is written in clear, simple English. Our tools are free, no signup required.</li>
              <li><strong>Transparency</strong> — We clearly label how to apply for every job. No hidden fees, no misleading information.</li>
            </ul>

            <h2>Contact Us</h2>
            <p>Have questions, feedback, or a job listing to share? We&apos;d love to hear from you.</p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)', marginTop: 'var(--space-lg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                <FiMail style={{ color: 'var(--accent)' }} />
                <span>info@theuaecareer.com</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-sm)' }}>
                <FiMapPin style={{ color: 'var(--accent)' }} />
                <span>UAE</span>
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
