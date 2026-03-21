import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Terms of Service for theuaecareer.com — user agreements, disclaimers, and usage terms.',
};

export default function TermsPage() {
  return (
    <>
      <section className="hero" style={{ padding: 'var(--space-2xl) 0' }}>
        <div className="container hero-content">
          <h1>Terms of <span>Service</span></h1>
          <p>Last updated: March 2026</p>
        </div>
      </section>

      <section className="section">
        <div className="container container-narrow">
          <div className="prose">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using theuaecareer.com (&quot;the site&quot;), you agree to be bound
              by these Terms of Service. If you do not agree to these terms, please do not use the site.
            </p>

            <h2>2. Nature of Service</h2>
            <p>
              theuaecareer.com is a <strong>job information portal</strong>. We are not a
              recruitment agency, staffing company, or employer. We do not guarantee the accuracy,
              completeness, or availability of any job listing published on this site.
            </p>

            <h2>3. Job Listing Disclaimer</h2>
            <ul>
              <li>Job listings are published for informational purposes only</li>
              <li>We do not verify employers or guarantee job offers</li>
              <li>Walk-in interview dates, times, and venues may change without notice</li>
              <li>Salary ranges shown are indicative and may vary</li>
              <li>Users should verify all job details with the employer directly before applying</li>
            </ul>

            <h2>4. User Responsibilities</h2>
            <p>When using this site, you agree to:</p>
            <ul>
              <li>Provide accurate information when using our tools (CV Maker, contact form)</li>
              <li>Not misuse the site or attempt to access restricted areas</li>
              <li>Not scrape, copy, or reproduce content without written permission</li>
              <li>Use the site only for lawful purposes</li>
            </ul>

            <h2>5. Tools Disclaimer</h2>
            <p>
              The <strong>AI CV Maker</strong> uses artificial intelligence to assist in CV
              creation. The generated content is for guidance only — users should review and
              customise all content before submitting to employers.
            </p>
            <p>
              The <strong>Gratuity Calculator</strong> provides estimates based on UAE Labour Law
              formulas and is for informational purposes only. It does not constitute legal advice.
              For specific queries, consult the Ministry of Human Resources and Emiratisation (MOHRE).
            </p>

            <h2>6. Intellectual Property</h2>
            <p>
              All original content on this site — including articles, guides, design, and code — is
              the property of theuaecareer.com. You may not reproduce, distribute, or create
              derivative works without prior written consent.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
              theuaecareer.com shall not be liable for any loss, damage, or expense arising from
              the use of this site, including but not limited to losses resulting from reliance on
              job listing information, walk-in interview details, or tool outputs.
            </p>

            <h2>8. Changes to Terms</h2>
            <p>
              We reserve the right to update these Terms of Service at any time. Changes will be
              posted on this page with an updated date. Continued use of the site after changes
              constitutes acceptance.
            </p>

            <h2>9. Contact</h2>
            <p>
              For questions about these terms, contact us at{' '}
              <a href="mailto:info@theuaecareer.com">info@theuaecareer.com</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
