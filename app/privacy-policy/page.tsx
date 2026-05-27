import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy Policy for theuaecareer.com — what data we collect, how we use it, how cookies and Google AdSense work on this site, and how to exercise your data-protection rights under UAE PDPL, GDPR, and CCPA.',
  alternates: {
    canonical: '/privacy-policy/',
  },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="hero" style={{ padding: 'var(--space-2xl) 0' }}>
        <div className="container hero-content">
          <h1>
            Privacy <span>Policy</span>
          </h1>
          <p>Last updated: 27 May 2026 · Effective: 27 May 2026</p>
        </div>
      </section>

      <section className="section">
        <div className="container container-narrow">
          <div className="prose">
            <h2>1. Who we are</h2>
            <p>
              This Privacy Policy explains how <strong>theuaecareer.com</strong> (&ldquo;we&rdquo;,
              &ldquo;us&rdquo;, &ldquo;our&rdquo;, or &ldquo;the site&rdquo;) collects, uses,
              stores, and shares information when you visit our website at{' '}
              <a href="https://theuaecareer.com">https://theuaecareer.com</a> or use any of our
              tools, including the CV Maker, Gratuity Calculator, and Currency Converter. It also
              explains your rights and the choices you have over your information.
            </p>
            <p>
              theuaecareer.com is operated by an independent team based in the United Arab Emirates.
              We are an editorial and information platform — not a recruitment agency, not a
              government service, and not a financial advisor. You can read more about us on our{' '}
              <Link href="/about/">About page</Link>.
            </p>
            <p>
              If you have any question about this policy or about your data, please email{' '}
              <strong>info [at] theuaecareer.com</strong> or use the{' '}
              <Link href="/contact/">contact form</Link>. We aim to respond within 5 working days.
            </p>

            <h2>2. Summary of what this policy covers</h2>
            <ul>
              <li>What information we collect and why we collect it</li>
              <li>How we use cookies, including advertising cookies for Google AdSense</li>
              <li>Which third-party services may receive your data and links to their own policies</li>
              <li>How long we keep information and how we secure it</li>
              <li>Your data-protection rights under UAE PDPL, EU/UK GDPR, and California CCPA</li>
              <li>How to opt out of personalised advertising</li>
              <li>How to contact us with a data request or complaint</li>
            </ul>

            <h2>3. Information we collect</h2>
            <h3>3.1 Information you give us directly</h3>
            <ul>
              <li>
                <strong>Contact messages.</strong> When you email us or submit a form on the{' '}
                <Link href="/contact/">Contact page</Link>, we receive your name, email address,
                subject, and the content of your message.
              </li>
              <li>
                <strong>Newsletter signup (if enabled).</strong> If a newsletter form is active, we
                collect the email address you provide and the signup source.
              </li>
              <li>
                <strong>CV Maker input.</strong> Information you enter into the CV Maker tool — name,
                contact details, work history, education, skills — is held in your browser and used
                only to render and export your CV. We do not store CV content on our servers and we
                do not transmit it to any third party.
              </li>
            </ul>

            <h3>3.2 Information collected automatically</h3>
            <ul>
              <li>
                <strong>Server and CDN logs.</strong> Our hosting provider (Cloudflare Pages) and
                our CDN may automatically log basic request information including IP address,
                user-agent string, requested URL, timestamp, and HTTP status. This is used for
                security, abuse prevention, and uptime monitoring.
              </li>
              <li>
                <strong>Analytics.</strong> We use Google Analytics 4 to understand how visitors use
                the site in aggregate. This typically includes pageviews, session duration,
                approximate location (country/region), device type, and referring source. We do not
                use Google Analytics to identify individual users.
              </li>
              <li>
                <strong>Advertising signals.</strong> When advertising is enabled on the site,
                third-party advertising partners — including Google AdSense — may collect
                information through cookies and similar technologies. See Section 5 below.
              </li>
            </ul>

            <h2>4. How we use your information</h2>
            <ul>
              <li>To reply to contact messages and support requests you send us</li>
              <li>To deliver newsletter or job-update emails to subscribers who opt in</li>
              <li>To improve site content, navigation, and performance based on aggregate analytics</li>
              <li>To detect, prevent, and respond to abuse, fraud, and security incidents</li>
              <li>To comply with legal obligations and respond to lawful government requests</li>
              <li>To serve advertising through Google AdSense and other ad partners (when enabled)</li>
            </ul>
            <p>
              We do not sell your personal information. We do not share contact-form messages with
              advertisers, recruiters, or any third party except where required by law.
            </p>

            <h2>5. Cookies and similar technologies</h2>
            <p>
              We use cookies and similar storage technologies (local storage, pixels) to operate the
              site, measure performance, and serve advertising. You can control cookies through your
              browser settings or by using the opt-out tools listed in Section 6.
            </p>
            <h3>5.1 Categories of cookies we use</h3>
            <ul>
              <li>
                <strong>Essential cookies.</strong> Required for the site and its security features
                to work. These cannot be turned off in our systems.
              </li>
              <li>
                <strong>Analytics cookies.</strong> Set by Google Analytics to measure aggregate
                usage. These help us understand which articles and tools are most useful.
              </li>
              <li>
                <strong>Advertising cookies.</strong> Set by Google AdSense and its advertising
                partners to show relevant ads, frequency-cap ads, and measure ad performance. These
                cookies may use information about your visits to this and other websites to provide
                personalised advertising.
              </li>
              <li>
                <strong>Embedded content cookies.</strong> Pages with embedded comments (Disqus, if
                enabled), embedded videos, or social media widgets may set their own cookies. We do
                not control these.
              </li>
            </ul>

            <h3>5.2 Google AdSense and third-party vendors</h3>
            <p>
              theuaecareer.com is in the process of joining the Google AdSense program. When ads are
              served on the site, Google — as a third-party vendor — uses cookies (including the
              DART cookie) to serve ads based on your prior visits to our site or other sites on the
              internet. Google&apos;s use of advertising cookies enables it and its partners to
              serve ads to you based on your visits to our sites and/or other sites on the internet.
            </p>
            <p>
              You can opt out of personalised advertising by visiting{' '}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Ads Settings
              </a>
              . You can also opt out of a third-party vendor&apos;s use of cookies for personalised
              advertising by visiting{' '}
              <a href="https://www.aboutads.info/" target="_blank" rel="noopener noreferrer">
                www.aboutads.info
              </a>{' '}
              (US) or{' '}
              <a
                href="https://www.youronlinechoices.eu/"
                target="_blank"
                rel="noopener noreferrer"
              >
                www.youronlinechoices.eu
              </a>{' '}
              (EU).
            </p>
            <p>
              Third-party vendors and ad networks that may serve ads on our site, when AdSense is
              active, include Google AdSense and members of the Google Display Network. These
              partners may use non-personally-identifiable information (such as click-stream
              information, browser type, time and date, subject of advertisements clicked or
              scrolled over) during your visits in order to provide advertisements about goods and
              services likely to be of greater interest to you.
            </p>

            <h2>6. How to opt out of personalised advertising</h2>
            <ul>
              <li>
                <strong>Google personalisation:</strong>{' '}
                <a
                  href="https://adssettings.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  adssettings.google.com
                </a>
              </li>
              <li>
                <strong>US opt-out (DAA):</strong>{' '}
                <a
                  href="https://optout.aboutads.info/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  optout.aboutads.info
                </a>
              </li>
              <li>
                <strong>EU opt-out (EDAA):</strong>{' '}
                <a
                  href="https://www.youronlinechoices.eu/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  youronlinechoices.eu
                </a>
              </li>
              <li>
                <strong>Browser-level controls:</strong> most browsers allow you to block or delete
                cookies. See your browser&apos;s help page for instructions.
              </li>
            </ul>

            <h2>7. Third-party services we may use</h2>
            <p>
              Depending on site configuration, the following third-party services may receive
              information when you visit. Each has its own privacy policy and you can review them
              directly.
            </p>
            <ul>
              <li>
                <strong>Cloudflare Pages</strong> — hosting and CDN.{' '}
                <a
                  href="https://www.cloudflare.com/privacypolicy/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy policy
                </a>
              </li>
              <li>
                <strong>Sanity.io</strong> — content management for articles and job listings.{' '}
                <a
                  href="https://www.sanity.io/legal/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy policy
                </a>
              </li>
              <li>
                <strong>Google Analytics</strong> — aggregate site analytics.{' '}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy policy
                </a>
              </li>
              <li>
                <strong>Google AdSense</strong> — advertising (when enabled).{' '}
                <a
                  href="https://policies.google.com/technologies/ads"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Advertising policies
                </a>
              </li>
              <li>
                <strong>Disqus</strong> — article comments (when enabled).{' '}
                <a
                  href="https://disqus.com/privacy-policy/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Privacy policy
                </a>
              </li>
            </ul>

            <h2>8. How long we keep your information</h2>
            <ul>
              <li>
                <strong>Contact messages:</strong> kept for up to 24 months after the last reply, or
                longer if needed to resolve an ongoing matter.
              </li>
              <li>
                <strong>Newsletter emails:</strong> kept until you unsubscribe or request deletion.
              </li>
              <li>
                <strong>Analytics data:</strong> retained in Google Analytics for up to 14 months in
                aggregated form, after which it is automatically deleted.
              </li>
              <li>
                <strong>Server logs:</strong> typically retained for up to 30 days for
                security/debugging.
              </li>
              <li>
                <strong>CV Maker inputs:</strong> stored only in your browser. Cleared when you
                clear browser data.
              </li>
            </ul>

            <h2>9. Your rights</h2>
            <p>
              Depending on where you live, you may have the following rights regarding your
              personal data:
            </p>
            <ul>
              <li>
                <strong>Access:</strong> ask for a copy of the personal data we hold about you.
              </li>
              <li>
                <strong>Rectification:</strong> ask us to correct inaccurate or incomplete data.
              </li>
              <li>
                <strong>Erasure (&ldquo;right to be forgotten&rdquo;):</strong> ask us to delete
                your data where we no longer need it.
              </li>
              <li>
                <strong>Objection:</strong> object to certain processing, including direct marketing.
              </li>
              <li>
                <strong>Restriction:</strong> ask us to limit how we use your data while we look
                into a concern.
              </li>
              <li>
                <strong>Data portability:</strong> receive your data in a structured, machine-readable
                format.
              </li>
              <li>
                <strong>Withdraw consent:</strong> withdraw consent at any time where processing is
                based on consent.
              </li>
            </ul>
            <p>
              To exercise any of these rights, email <strong>info [at] theuaecareer.com</strong>{' '}
              with a clear description of your request. We may ask you to verify your identity before
              we act on a request. We will respond within 30 days.
            </p>

            <h2>10. Regional rights</h2>
            <h3>10.1 United Arab Emirates (PDPL)</h3>
            <p>
              The UAE Personal Data Protection Law (Federal Decree-Law No. 45 of 2021, &ldquo;PDPL&rdquo;)
              gives data subjects rights similar to those in Section 9. You can also complain to the
              UAE Data Office if you believe your rights have been violated.
            </p>
            <h3>10.2 European Union and United Kingdom (GDPR)</h3>
            <p>
              EU and UK residents have the rights set out in the General Data Protection Regulation
              (Regulation (EU) 2016/679) and the UK Data Protection Act 2018. The legal bases we
              rely on are: (a) consent for newsletter signups and certain cookies, (b) legitimate
              interests for analytics and site security, (c) contract performance for tool features,
              and (d) legal obligation where applicable. EU/UK residents can complain to their local
              data-protection authority.
            </p>
            <h3>10.3 California (CCPA / CPRA)</h3>
            <p>
              California residents have the right to know what personal information we collect, to
              request deletion, to opt out of the sale or sharing of personal information, and not
              to be discriminated against for exercising any CCPA right. We do not sell personal
              information in the traditional sense, but advertising cookies may be considered
              &ldquo;sharing&rdquo; under the CPRA. To exercise CCPA rights, contact us at the email
              above with &ldquo;CCPA Request&rdquo; in the subject.
            </p>

            <h2>11. Children&apos;s privacy</h2>
            <p>
              theuaecareer.com is intended for adult job seekers (18 and older). We do not knowingly
              collect personal information from children under 16. If you believe a child has
              provided information to us, please email us and we will delete it.
            </p>

            <h2>12. International data transfers</h2>
            <p>
              The site is operated from the United Arab Emirates. Information collected through this
              site may be processed in any country where our service providers operate (including
              the United States, the European Union, and the UAE). Where required, we rely on
              standard contractual clauses or the recipient&apos;s adequacy decision.
            </p>

            <h2>13. Data security</h2>
            <p>
              We take reasonable technical and organisational measures to protect information
              processed through our site, including HTTPS encryption in transit, restricted access
              to back-end systems, and routine security review of third-party providers. No method
              of transmission over the internet is 100% secure, so we cannot guarantee absolute
              security.
            </p>

            <h2>14. Changes to this policy</h2>
            <p>
              We may update this policy from time to time. When we do, we will update the &ldquo;Last
              updated&rdquo; date at the top. Material changes will be highlighted on the homepage
              or in our newsletter for at least 14 days. Continued use of the site after a change
              means you accept the updated policy.
            </p>

            <h2>15. Contact</h2>
            <p>
              For any privacy question, complaint, or data request, contact us at{' '}
              <strong>info [at] theuaecareer.com</strong> or via the{' '}
              <Link href="/contact/">contact form</Link>. Please put &ldquo;Privacy Request&rdquo;
              in the subject line.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
