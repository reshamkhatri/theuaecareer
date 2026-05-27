import type { Metadata } from 'next';
import Link from 'next/link';
import { FiMail, FiMapPin, FiClock, FiAlertTriangle, FiBriefcase, FiMessageSquare, FiFileText } from 'react-icons/fi';
import ContactForm from '@/components/ContactForm';

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Contact theuaecareer.com — get support, report a suspicious job listing, suggest a guide topic, or partner with us. Real human response within 48 working hours.',
  alternates: {
    canonical: '/contact/',
  },
  openGraph: {
    title: 'Contact theuaecareer.com — Real human support for Gulf job seekers',
    description:
      'Get support, report a suspicious job listing, suggest a guide topic, or partner with us. Real human response within 48 working hours.',
    url: '/contact/',
  },
};

const contactReasons = [
  {
    icon: <FiAlertTriangle />,
    title: 'Report a suspicious job listing',
    body:
      'Saw a listing that asked for upfront fees, sketchy WhatsApp numbers, or impersonates a real employer? Send us the URL and we will investigate within 24 hours.',
    accent: '#dc2626',
  },
  {
    icon: <FiBriefcase />,
    title: 'Employer / recruiter enquiry',
    body:
      'Hiring across the UAE, Saudi Arabia, or Qatar and want your roles featured? Tell us about the company, the roles, and your verification documents.',
    accent: '#0ea5e9',
  },
  {
    icon: <FiFileText />,
    title: 'Suggest a guide topic',
    body:
      'There is a UAE job-search question we have not covered yet? Tell us what you wish someone had explained to you when you arrived. We read every suggestion.',
    accent: '#7c3aed',
  },
  {
    icon: <FiMessageSquare />,
    title: 'Correction or feedback',
    body:
      'Spotted an outdated salary range, a wrong MOHRE rule, or a broken link in one of our articles? Let us know which article and what should change.',
    accent: '#16a34a',
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="hero" style={{ padding: 'var(--space-2xl) 0' }}>
        <div className="container hero-content">
          <h1>
            Contact <span>Us</span>
          </h1>
          <p>
            Real human support for Gulf job seekers. We read every message and reply within 48
            working hours.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container container-narrow">
          {/* Contact channels */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: 'var(--space-lg)',
              marginBottom: 'var(--space-2xl)',
            }}
          >
            <div className="card" style={{ padding: 'var(--space-lg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', color: 'var(--accent)', fontWeight: 700 }}>
                <FiMail /> Email
              </div>
              <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                <strong>info [at] theuaecareer.com</strong>
              </p>
              <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Best for detailed enquiries, file attachments, or screenshots.
              </p>
            </div>
            <div className="card" style={{ padding: 'var(--space-lg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', color: 'var(--accent)', fontWeight: 700 }}>
                <FiMapPin /> Location
              </div>
              <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                <strong>United Arab Emirates</strong>
              </p>
              <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Independent editorial team operating out of the UAE. No physical walk-in office.
              </p>
            </div>
            <div className="card" style={{ padding: 'var(--space-lg)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px', color: 'var(--accent)', fontWeight: 700 }}>
                <FiClock /> Response time
              </div>
              <p style={{ margin: 0, color: 'var(--text-secondary)' }}>
                <strong>Within 48 working hours</strong>
              </p>
              <p style={{ margin: '4px 0 0', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                Friday and Saturday excluded. Suspicious-job reports prioritised within 24 hours.
              </p>
            </div>
          </div>

          {/* What you can write about */}
          <div style={{ marginBottom: 'var(--space-2xl)' }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: 'var(--space-sm)' }}>
              What you can write to us about
            </h2>
            <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-xl)' }}>
              We get a lot of email. Picking the closest match below and putting it in the subject
              line helps us route your message to the right person faster.
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: 'var(--space-lg)',
              }}
            >
              {contactReasons.map((reason) => (
                <div
                  key={reason.title}
                  className="card"
                  style={{ padding: 'var(--space-lg)', borderTop: `3px solid ${reason.accent}` }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', color: reason.accent, fontWeight: 700 }}>
                    {reason.icon}
                    <span>{reason.title}</span>
                  </div>
                  <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9375rem', lineHeight: 1.65 }}>
                    {reason.body}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* What we cannot help with */}
          <div
            className="card"
            style={{
              padding: 'var(--space-xl)',
              marginBottom: 'var(--space-2xl)',
              background: '#fefce8',
              borderLeft: '4px solid #eab308',
            }}
          >
            <h3 style={{ fontSize: '1.125rem', marginBottom: '12px', color: '#854d0e' }}>
              What we cannot help with
            </h3>
            <p style={{ margin: '0 0 12px', color: '#713f12', fontSize: '0.9375rem' }}>
              theuaecareer.com is an editorial information platform, not a recruitment agency. We
              cannot:
            </p>
            <ul style={{ margin: 0, paddingLeft: '20px', color: '#713f12', fontSize: '0.9375rem', lineHeight: 1.7 }}>
              <li>Find you a specific job or place you with an employer</li>
              <li>Forward your CV to companies you saw listed on the site</li>
              <li>Sponsor your work visa, residency, or family visa</li>
              <li>Issue official MOHRE, ICP, or labour-law confirmations</li>
              <li>Recover money you have already paid to a scammer (please report directly to UAE Police)</li>
            </ul>
            <p style={{ margin: '12px 0 0', color: '#713f12', fontSize: '0.875rem' }}>
              For visa or labour-law questions, contact{' '}
              <a href="https://www.mohre.gov.ae/" target="_blank" rel="noopener noreferrer" style={{ color: '#713f12', textDecoration: 'underline' }}>
                MOHRE
              </a>{' '}
              or a licensed UAE legal advisor. For job scams already in progress, contact the UAE
              Police (999) or the Cybercrime portal.
            </p>
          </div>

          {/* The actual contact form */}
          <h2 style={{ fontSize: '1.5rem', marginBottom: 'var(--space-sm)' }}>Send a message</h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-xl)' }}>
            All fields with * are required. We never share your email address with third parties —
            see our <Link href="/privacy-policy/">Privacy Policy</Link>.
          </p>
          <ContactForm />

          {/* Privacy reassurance below form */}
          <div style={{ marginTop: 'var(--space-2xl)', color: 'var(--text-muted)', fontSize: '0.875rem', textAlign: 'center' }}>
            <p style={{ margin: 0 }}>
              By submitting this form you agree to our{' '}
              <Link href="/terms-of-service/">Terms of Service</Link> and{' '}
              <Link href="/privacy-policy/">Privacy Policy</Link>. We respond from a{' '}
              <code style={{ background: '#f1f5f9', padding: '2px 6px', borderRadius: 4 }}>
                @theuaecareer.com
              </code>{' '}
              email — if you receive a reply from any other domain claiming to be us, it is not us.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
