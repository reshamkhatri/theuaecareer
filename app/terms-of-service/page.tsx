import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'theuaecareer.com Terms of Service — your agreement when using the site, our role as an information platform (not a recruitment agency), tool disclaimers, content rules, and limitation of liability.',
  alternates: {
    canonical: '/terms-of-service/',
  },
};

export default function TermsPage() {
  return (
    <>
      <section className="hero" style={{ padding: 'var(--space-2xl) 0' }}>
        <div className="container hero-content">
          <h1>
            Terms of <span>Service</span>
          </h1>
          <p>Last updated: 27 May 2026 · Effective: 27 May 2026</p>
        </div>
      </section>

      <section className="section">
        <div className="container container-narrow">
          <div className="prose">
            <h2>1. Acceptance of these terms</h2>
            <p>
              These Terms of Service (&ldquo;Terms&rdquo;) form a binding agreement between you (the
              &ldquo;user&rdquo; or &ldquo;you&rdquo;) and theuaecareer.com (&ldquo;we&rdquo;,
              &ldquo;us&rdquo;, &ldquo;our&rdquo;, the &ldquo;site&rdquo;). By accessing or using
              the site, including any of our tools, you confirm that you have read, understood, and
              agree to be bound by these Terms together with our{' '}
              <Link href="/privacy-policy/">Privacy Policy</Link> and{' '}
              <Link href="/disclaimer/">Disclaimer</Link>. If you do not agree, please do not use
              the site.
            </p>
            <p>
              These Terms apply to all visitors, registered users (where applicable), employers
              submitting listings, and any other person interacting with the site.
            </p>

            <h2>2. What theuaecareer.com is — and is not</h2>
            <p>
              theuaecareer.com is an <strong>independent editorial and information platform</strong>{' '}
              for job seekers in the United Arab Emirates, Saudi Arabia, Qatar, and the wider Gulf
              region. We publish:
            </p>
            <ul>
              <li>Job listings curated from public employer sources and submissions</li>
              <li>Walk-in interview event details</li>
              <li>Career guides, salary explainers, and visa-related articles</li>
              <li>Free tools (CV Maker, Gratuity Calculator, Currency Converter)</li>
            </ul>
            <p>We are explicitly NOT:</p>
            <ul>
              <li>A recruitment agency, staffing firm, or employer of record</li>
              <li>A government service or visa authority</li>
              <li>A legal, financial, immigration, or tax advisor</li>
              <li>
                A guarantor of job offers, interview outcomes, salary figures, or visa approvals
              </li>
            </ul>
            <p>
              We do not place candidates with employers, charge candidate fees, take commission
              from successful placements, or sell candidate data. Read our{' '}
              <Link href="/disclaimer/">Disclaimer</Link> for the full scope.
            </p>

            <h2>3. Eligibility</h2>
            <p>
              You must be at least 18 years old to use the site. By using theuaecareer.com you
              represent that you meet this age requirement and that you have the legal capacity to
              enter into these Terms in your jurisdiction.
            </p>

            <h2>4. Using the site</h2>
            <h3>4.1 You agree to:</h3>
            <ul>
              <li>Provide accurate information when submitting forms or using interactive tools</li>
              <li>Use the site only for lawful, personal, non-commercial job-search purposes</li>
              <li>Respect intellectual-property rights in articles, design, and code on the site</li>
              <li>Verify all job-listing details directly with the employer before acting</li>
            </ul>
            <h3>4.2 You agree NOT to:</h3>
            <ul>
              <li>
                Scrape, mirror, republish, or commercially redistribute our content without express
                written permission
              </li>
              <li>Reverse-engineer the site or attempt to bypass any security or access controls</li>
              <li>
                Upload viruses, malware, phishing payloads, or any content that disrupts the site or
                other users
              </li>
              <li>
                Use the site to harass, defraud, impersonate, or harm any person or business
              </li>
              <li>Submit fraudulent job listings, fake employer information, or scam content</li>
              <li>
                Use our contact form, comment systems, or CV Maker as a vector for spam or
                unsolicited advertising
              </li>
              <li>
                Use automated systems (bots, crawlers, scrapers) to access the site at a rate that
                degrades performance for other users
              </li>
            </ul>

            <h2>5. Job listings</h2>
            <p>
              Job listings on theuaecareer.com are published for informational purposes. They are
              sourced from employers, public hiring notices, and editorial research. While we work
              to keep listings accurate, we do not guarantee that:
            </p>
            <ul>
              <li>A listing is still active at the time you view it</li>
              <li>Salary, allowances, or benefits will match those advertised</li>
              <li>Walk-in dates, times, and venues remain unchanged</li>
              <li>The advertised employer will hire you, or any candidate, at all</li>
            </ul>
            <p>
              You are solely responsible for verifying a listing directly with the employer before
              attending an interview, sending personal documents, paying any travel or relocation
              costs, or resigning from your current role. See our{' '}
              <Link href="/blog/avoid-fake-gulf-job-offers/">guide on spotting fake job offers</Link>{' '}
              for warning signs.
            </p>

            <h2>6. Free tools (CV Maker, Calculators, Converter)</h2>
            <p>
              Our CV Maker, Gratuity Calculator, and Currency Converter are provided
              &ldquo;as is&rdquo; for convenience. They:
            </p>
            <ul>
              <li>
                Do not constitute legal, financial, or employment advice — verify any output before
                making an irreversible decision
              </li>
              <li>
                May reflect outdated rates, rules, or labour-law calculations — always
                cross-check with MOHRE, your employer, or a qualified advisor for material decisions
              </li>
              <li>
                Store your inputs in your own browser (CV Maker) or compute output locally — we do
                not retain your inputs on our servers
              </li>
            </ul>
            <p>
              We are not liable for losses arising from reliance on tool output — including but not
              limited to incorrect gratuity calculations, mistranslated currency amounts, or CV
              formatting issues with a specific employer&apos;s applicant-tracking system.
            </p>

            <h2>7. Advertising</h2>
            <p>
              theuaecareer.com may display advertising provided by Google AdSense and other ad
              networks. Ads are clearly distinguishable from editorial content. We do not endorse
              advertisers and we are not responsible for the content, accuracy, or practices of
              third-party advertisers. Clicking on an ad takes you to a third-party site governed by
              that site&apos;s own terms and privacy policy.
            </p>

            <h2>8. Intellectual property</h2>
            <p>
              All original articles, photographs (where credited to theuaecareer.com), branding,
              site design, code, the editorial structure of job listings, and the tools provided on
              this site are the property of theuaecareer.com and are protected by applicable
              copyright, trademark, and other intellectual-property laws.
            </p>
            <p>
              You may share short quotes from our articles with appropriate attribution and a link
              back. You may not republish full articles, generate derivative AI training data from
              our content, or use our branding without written permission.
            </p>

            <h2>9. Third-party links</h2>
            <p>
              The site contains links to third-party websites including employer pages, government
              portals, and reference sources. We do not control these sites and are not responsible
              for their content, accuracy, or privacy practices. Following a link takes you out of
              theuaecareer.com.
            </p>

            <h2>10. Disclaimer of warranties</h2>
            <p>
              The site, its content, tools, and any communications you receive from us are provided
              on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of
              any kind, express or implied. We do not warrant uninterrupted access, error-free
              content, or any specific outcome from using the site.
            </p>

            <h2>11. Limitation of liability</h2>
            <p>
              To the maximum extent permitted by law, theuaecareer.com and its team will not be
              liable for any indirect, incidental, special, consequential, or punitive damages
              arising from:
            </p>
            <ul>
              <li>Your use of, or inability to use, the site</li>
              <li>Reliance on a job listing, walk-in event, salary figure, or article</li>
              <li>Output from any of our tools</li>
              <li>Any third-party content, advertising, or linked service</li>
              <li>Loss of data, lost employment opportunities, or visa-related costs</li>
            </ul>
            <p>
              Our total liability for any claim arising out of these Terms or the use of the site is
              limited to the amount you paid us in the 12 months preceding the claim — which, for
              users of our free tools and free content, is zero (USD 0).
            </p>

            <h2>12. Indemnity</h2>
            <p>
              You agree to indemnify and hold theuaecareer.com harmless from any claim, loss,
              expense, or demand (including reasonable legal fees) arising from your breach of these
              Terms, your misuse of the site, or your violation of any law or third-party right.
            </p>

            <h2>13. Termination</h2>
            <p>
              We may suspend or terminate your access to the site at any time, with or without
              notice, if we reasonably believe you have violated these Terms, broken the law, or
              misused our tools. Termination does not affect provisions that are intended to survive
              (intellectual property, disclaimers, limitation of liability).
            </p>

            <h2>14. Governing law and jurisdiction</h2>
            <p>
              These Terms are governed by the laws of the United Arab Emirates. Any dispute that
              cannot be resolved informally will be submitted to the exclusive jurisdiction of the
              courts of the United Arab Emirates, except where mandatory consumer-protection law in
              your country of residence provides otherwise.
            </p>

            <h2>15. Changes to these Terms</h2>
            <p>
              We may update these Terms from time to time. When we do, we will update the
              &ldquo;Last updated&rdquo; date at the top of this page. Material changes will be
              highlighted on the site for at least 14 days. Continued use of the site after a change
              becomes effective means you accept the revised Terms.
            </p>

            <h2>16. Severability</h2>
            <p>
              If any provision of these Terms is found to be unenforceable in any jurisdiction, the
              remaining provisions will continue in full force and effect.
            </p>

            <h2>17. Contact</h2>
            <p>
              For questions about these Terms, please email{' '}
              <strong>info [at] theuaecareer.com</strong> or use the{' '}
              <Link href="/contact/">contact form</Link>. We aim to respond within 5 working days.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
