import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for theuaecareer.com - how we handle messages, newsletter requests, CV builder inputs, cookies, and optional third-party services.',
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="hero" style={{ padding: 'var(--space-2xl) 0' }}>
        <div className="container hero-content">
          <h1>
            Privacy <span>Policy</span>
          </h1>
          <p>Last updated: March 2026</p>
        </div>
      </section>

      <section className="section">
        <div className="container container-narrow">
          <div className="prose">
            <h2>1. Introduction</h2>
            <p>
              theuaecareer.com (&quot;we&quot;, &quot;us&quot;, or &quot;the site&quot;) is
              committed to protecting your privacy. This policy explains how we collect, use, and
              store information when you use the site.
            </p>

            <h2>2. Information We Collect</h2>
            <h3>Information you provide</h3>
            <ul>
              <li>
                <strong>Contact messages</strong> - name, email address, subject, and message
                content when you email us directly or submit a connected contact form
              </li>
              <li>
                <strong>Newsletter requests</strong> - email address and signup source when you use
                a connected newsletter form or email us to subscribe
              </li>
              <li>
                <strong>CV builder inputs</strong> - information you enter into the tool to build
                and export your CV
              </li>
            </ul>

            <h3>Information collected automatically</h3>
            <ul>
              <li>
                <strong>Basic technical logs</strong> - limited request, caching, and error
                information may be recorded by our hosting, CDN, or connected service providers
              </li>
              <li>
                <strong>Cookies</strong> - when enabled by connected third-party services such as
                comments, analytics, or advertising
              </li>
            </ul>

            <h2>3. How We Use Your Information</h2>
            <ul>
              <li>To respond to messages you send through the contact form</li>
              <li>To send newsletter or job-update emails when you subscribe</li>
              <li>To improve site performance and understand product usage</li>
              <li>To operate advertising or comment features when those are enabled</li>
            </ul>

            <h2>4. Storage and Security</h2>
            <p>
              theuaecareer.com is published as a static website. Contact messages and newsletter
              requests may be sent through your own email app or through connected third-party form
              providers, depending on how the site is configured at the time. We do not rely on a
              public user account system for normal access to the site.
            </p>
            <p>
              CV-builder content is not published publicly. It stays in your browser during normal
              use and is used only to generate the on-screen preview or export requested by the
              user.
            </p>

            <h2>5. Cookies</h2>
            <p>We may use the following categories of cookies:</p>
            <ul>
              <li>
                <strong>Essential cookies</strong> - required by hosting, security, or embedded
                service providers
              </li>
              <li>
                <strong>Analytics cookies</strong> - only if analytics is enabled on the site
              </li>
              <li>
                <strong>Advertising cookies</strong> - only if AdSense or similar advertising is
                enabled
              </li>
            </ul>

            <h2>6. Optional Third-Party Services</h2>
            <p>
              Some third-party services may be enabled in the future or in certain deployments of
              the site. When enabled, they may collect information according to their own privacy
              policies.
            </p>
            <ul>
              <li>
                <strong>Google Analytics</strong> - optional web analytics
              </li>
              <li>
                <strong>Google AdSense</strong> - optional advertising
              </li>
              <li>
                <strong>Disqus</strong> - optional comments on article pages
              </li>
              <li>
                <strong>Email platforms</strong> - optional newsletter delivery providers
              </li>
            </ul>

            <h2>7. Your Rights</h2>
            <p>You may contact us to:</p>
            <ul>
              <li>Request deletion of personal data processed through our connected contact or newsletter services</li>
              <li>Unsubscribe from newsletter emails at any time</li>
              <li>Ask questions about how your information is being used</li>
            </ul>

            <h2>8. Contact</h2>
            <p>
              If you have questions about this policy, email us at{' '}
              <a href="mailto:info@theuaecareer.com">info@theuaecareer.com</a>.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
