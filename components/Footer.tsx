'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import NewsletterForm from '@/components/NewsletterForm';

export default function Footer() {
  const pathname = usePathname();

  if (pathname?.startsWith('/admin') || pathname?.startsWith('/studio')) {
    return null;
  }

  return (
    <footer className="footer">
      <div className="footer-gradient-bg"></div>

      <div className="container" style={{ position: 'relative', zIndex: 5 }}>
        <div className="footer-card">
          <div className="footer-grid">
            <div className="footer-brand-col">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1.5rem' }}>
                <div
                  style={{
                    width: '36px',
                    height: '36px',
                    background: '#0f172a',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <div
                    style={{
                      width: '18px',
                      height: '18px',
                      border: '2.5px solid white',
                      borderRadius: '50%',
                    }}
                  ></div>
                </div>
                <strong style={{ fontSize: '1.375rem', color: '#0f172a', letterSpacing: '-0.5px' }}>
                  theuaecareer
                </strong>
              </div>

              <p
                style={{
                  color: '#4b5563',
                  fontSize: '1rem',
                  fontWeight: 500,
                  marginBottom: '1.25rem',
                  lineHeight: 1.5,
                }}
              >
                Sign up to receive career updates.
              </p>

              <NewsletterForm source="footer" buttonLabel="Join Newsletter" compact />

              <p
                style={{
                  marginTop: '1.5rem',
                  fontSize: '0.8125rem',
                  color: '#9ca3af',
                  lineHeight: 1.6,
                  maxWidth: '300px',
                }}
              >
                By subscribing you agree with our Privacy Policy and consent to receive career updates.
              </p>
            </div>

            <div className="footer-links-row">
              <div>
                <h4 className="footer-col-title">Quick Links</h4>
                <ul className="footer-col-list">
                  <li>
                    <Link href="/jobs" className="footer-link-new">
                      Search Jobs
                    </Link>
                  </li>
                  <li>
                    <Link href="/jobs/walk-in" className="footer-link-new">
                      Walk-Ins
                    </Link>
                  </li>
                  <li>
                    <Link href="/blog" className="footer-link-new">
                      Articles
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="footer-col-title">Tools</h4>
                <ul className="footer-col-list">
                  <li>
                    <Link href="/tools/cv-maker" className="footer-link-new">
                      CV Builder
                    </Link>
                  </li>
                  <li>
                    <Link href="/tools/gratuity-calculator" className="footer-link-new">
                      Gratuity Calc
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="footer-col-title">Company</h4>
                <ul className="footer-col-list">
                  <li>
                    <Link href="/about" className="footer-link-new">
                      About Us
                    </Link>
                  </li>
                  <li>
                    <Link href="/contact" className="footer-link-new">
                      Contact Us
                    </Link>
                  </li>
                </ul>
              </div>

              <div>
                <h4 className="footer-col-title">Legal</h4>
                <ul className="footer-col-list">
                  <li>
                    <Link href="/privacy-policy" className="footer-link-new">
                      Privacy Policy
                    </Link>
                  </li>
                  <li>
                    <Link href="/terms-of-service" className="footer-link-new">
                      Terms &amp; Conditions
                    </Link>
                  </li>
                  <li>
                    <Link href="/disclaimer" className="footer-link-new">
                      Disclaimer
                    </Link>
                  </li>
                  <li>
                    <Link href="/sitemap.xml" className="footer-link-new">
                      Sitemap
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div style={{ textAlign: 'center', paddingBottom: '1.5rem' }}>
          <p style={{ margin: 0, fontSize: '0.875rem', color: '#6b7280', fontWeight: 500 }}>
            (c) {new Date().getFullYear()} theuaecareer. All rights reserved.
          </p>
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .footer-col-title {
          color: #111827;
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 1.25rem;
        }
        .footer-col-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
          list-style: none;
          padding: 0;
          margin: 0;
        }
        .footer-link-new {
          color: #6b7280;
          text-decoration: none;
          font-size: 0.9375rem;
          font-weight: 500;
          transition: color 0.2s;
        }
        .footer-link-new:hover {
          color: #111827;
        }
        @media (max-width: 1024px) {
          .footer-card { padding: 2rem 1.5rem 1.75rem; border-radius: 20px; }
          .footer-grid { flex-direction: column; }
          .footer-brand-col {
            min-width: 0;
            width: 100%;
            max-width: 100%;
            border-right: none;
            border-bottom: 1px solid #e5e7eb;
            padding-right: 0;
            padding-bottom: 2rem;
            margin-right: 0;
            margin-bottom: 2rem;
          }
          .footer-links-row { grid-template-columns: repeat(2, 1fr); gap: 2rem; }
        }
        @media (max-width: 640px) {
          .footer-card { padding: 1.5rem 1.25rem; margin: 3rem 0 1.5rem; }
          .footer-links-row { grid-template-columns: 1fr; gap: 1.5rem; }
        }
      `,
        }}
      />
    </footer>
  );
}
