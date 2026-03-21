import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for theuaecareer.com — how we handle your data, cookies, and third-party services.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="hero" style={{ padding: 'var(--space-2xl) 0' }}>
        <div className="container hero-content">
          <h1>Privacy <span>Policy</span></h1>
          <p>Last updated: March 2026</p>
        </div>
      </section>

      <section className="section">
        <div className="container container-narrow">
          <div className="prose">
            <h2>1. Introduction</h2>
            <p>
              theuaecareer.com (&quot;we&quot;, &quot;us&quot;, or &quot;the site&quot;) is committed to
              protecting your privacy. This Privacy Policy explains how we collect, use, and share
              information when you visit our website.
            </p>

            <h2>2. Information We Collect</h2>
            <h3>Information you provide:</h3>
            <ul>
              <li><strong>Contact form submissions</strong> — name, email, and message content</li>
              <li><strong>Newsletter subscriptions</strong> — email address only</li>
              <li><strong>CV Maker tool</strong> — personal information entered into the CV form (not stored on our servers; used only to generate the PDF)</li>
            </ul>

            <h3>Information collected automatically:</h3>
            <ul>
              <li><strong>Google Analytics 4</strong> — anonymous usage data including pages visited, time on site, device type, and approximate location. No personally identifiable information is collected by Google Analytics.</li>
              <li><strong>Cookies</strong> — We use cookies for site functionality, analytics, and advertising (see Cookies section below).</li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <ul>
              <li>To respond to your contact form submissions</li>
              <li>To send you job alert newsletters (if subscribed)</li>
              <li>To improve our website based on anonymous usage patterns</li>
              <li>To display relevant advertisements through Google AdSense</li>
            </ul>

            <h2>4. Cookies</h2>
            <p>We use the following types of cookies:</p>
            <ul>
              <li><strong>Essential cookies</strong> — required for site functionality (admin authentication)</li>
              <li><strong>Analytics cookies</strong> — Google Analytics 4 uses cookies to track anonymous site usage</li>
              <li><strong>Advertising cookies</strong> — Google AdSense may use cookies to display personalised ads</li>
            </ul>
            <p>You can manage cookie preferences through your browser settings.</p>

            <h2>5. Third-Party Services</h2>
            <ul>
              <li><strong>Google Analytics 4</strong> — web analytics (<a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">Google Privacy Policy</a>)</li>
              <li><strong>Google AdSense</strong> — advertising (<a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer">Google Ad Policy</a>)</li>
              <li><strong>Disqus</strong> — article comments (<a href="https://disqus.com/privacy-policy/" target="_blank" rel="noopener noreferrer">Disqus Privacy Policy</a>)</li>
              <li><strong>Brevo / Mailchimp</strong> — email newsletters</li>
            </ul>

            <h2>6. Data Security</h2>
            <p>
              We use HTTPS encryption for all pages. We do not store personal data from the CV
              Maker tool — all data is processed in-memory and discarded after PDF generation. API
              keys and credentials are stored securely and are never exposed to the frontend.
            </p>

            <h2>7. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Request deletion of your personal data</li>
              <li>Unsubscribe from newsletters at any time</li>
              <li>Opt out of Google Analytics tracking</li>
            </ul>

            <h2>8. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at{' '}
              <a href="mailto:info@theuaecareer.com">info@theuaecareer.com</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
