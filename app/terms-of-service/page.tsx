import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Terms of Service for theuaecareer.com - user agreements, disclaimers, and usage terms.',
};

export default function TermsPage() {
  return (
    <>
      <section className="hero" style={{ padding: 'var(--space-2xl) 0' }}>
        <div className="container hero-content">
          <h1>
            Terms of <span>Service</span>
          </h1>
          <p>Last updated: March 2026</p>
        </div>
      </section>

      <section className="section">
        <div className="container container-narrow">
          <div className="prose">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using theuaecareer.com (&quot;the site&quot;), you agree to these
              Terms of Service. If you do not agree, please do not use the site.
            </p>

            <h2>2. Nature of the Service</h2>
            <p>
              theuaecareer.com is a <strong>job information portal</strong>. We are not a
              recruitment agency, staffing company, or employer. We publish content and tools to
              help job seekers make more informed decisions.
            </p>

            <h2>3. Job Listing Disclaimer</h2>
            <ul>
              <li>Job listings are published for informational purposes only</li>
              <li>We do not guarantee the accuracy, completeness, or availability of any listing</li>
              <li>Walk-in dates, times, venues, and salary details may change without notice</li>
              <li>Users should verify all details directly with the employer before applying</li>
            </ul>

            <h2>4. User Responsibilities</h2>
            <p>When using the site, you agree to:</p>
            <ul>
              <li>Provide accurate information when submitting forms or using tools</li>
              <li>Use the site only for lawful purposes</li>
              <li>Not attempt to access restricted areas without authorization</li>
              <li>Not scrape or republish our original content without permission</li>
            </ul>

            <h2>5. Tools Disclaimer</h2>
            <p>
              The CV builder and gratuity calculator are provided for convenience and informational
              use. Generated content and calculations should always be reviewed by the user before
              being relied on for employment or legal decisions.
            </p>

            <h2>6. Intellectual Property</h2>
            <p>
              All original content on this site, including articles, branding, design, and code, is
              the property of theuaecareer.com unless otherwise stated.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
              theuaecareer.com is not liable for losses, damages, or missed opportunities resulting
              from the use of the site, job listings, tools, or any third-party service linked from
              the site.
            </p>

            <h2>8. Changes to These Terms</h2>
            <p>
              We may update these Terms of Service from time to time. Continued use of the site
              after updates are published means you accept the revised terms.
            </p>

            <h2>9. Contact</h2>
            <p>
              For questions about these terms, contact{' '}
              <a href="mailto:info@theuaecareer.com">info@theuaecareer.com</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
