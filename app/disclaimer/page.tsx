import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description:
    'theuaecareer.com disclaimer covering job-listing accuracy, no recruitment fees, candidate verification responsibility, affiliate links, advertising, and limits of editorial content.',
  alternates: {
    canonical: '/disclaimer/',
  },
};

export default function DisclaimerPage() {
  return (
    <>
      <section className="hero" style={{ padding: 'var(--space-2xl) 0' }}>
        <div className="container hero-content">
          <h1>
            <span>Disclaimer</span>
          </h1>
          <p>Last updated: 27 May 2026</p>
        </div>
      </section>

      <section className="section">
        <div className="container container-narrow">
          <div className="prose">
            <h2>1. About this disclaimer</h2>
            <p>
              theuaecareer.com is an independent information platform for job seekers in the United
              Arab Emirates, Saudi Arabia, Qatar, and the wider Gulf region. We publish job
              listings, walk-in interview notices, salary explainers, career guides, and free tools
              such as the CV Maker, Gratuity Calculator, and Currency Converter.
            </p>
            <p>
              This disclaimer sets out the limits of the information published on this site. Please
              read it together with our <Link href="/terms-of-service/">Terms of Service</Link> and{' '}
              <Link href="/privacy-policy/">Privacy Policy</Link>.
            </p>

            <h2>2. We never charge candidates</h2>
            <p>
              theuaecareer.com does not charge job seekers any fees — ever. We will never ask you
              for payment to:
            </p>
            <ul>
              <li>View, apply to, or be shortlisted for any job</li>
              <li>Attend a walk-in interview</li>
              <li>&ldquo;Reserve&rdquo; or &ldquo;secure&rdquo; a position</li>
              <li>Process a visa, work permit, or relocation</li>
              <li>Verify your CV, credentials, or experience</li>
            </ul>
            <p>
              <strong>
                If any employer, recruiter, or person claiming to represent theuaecareer.com asks
                you for money, treat it as a scam.
              </strong>{' '}
              Under UAE Labour Law, charging candidates fees for employment is illegal. Report
              suspicious requests to{' '}
              <a
                href="https://www.mohre.gov.ae/"
                target="_blank"
                rel="noopener noreferrer"
              >
                MOHRE
              </a>{' '}
              and let us know at <strong>info [at] theuaecareer.com</strong> so we can investigate.
            </p>

            <h2>3. Job listing accuracy</h2>
            <p>
              Job listings on theuaecareer.com are sourced from public employer career pages,
              hiring notices, walk-in event posters, and editorial research. While we work to keep
              listings accurate and up to date, the live state of any opportunity can change without
              warning.
            </p>
            <p>We cannot guarantee that:</p>
            <ul>
              <li>The role you see is still open when you apply</li>
              <li>Salary, allowances, or benefit details are still current</li>
              <li>Walk-in dates, times, or venues haven&apos;t been changed by the employer</li>
              <li>
                The employer name shown is the legal hiring entity (some listings show a brand name
                while hiring is done by a holding company or third-party operator)
              </li>
              <li>The employer will hire you, or any candidate, at all</li>
            </ul>
            <p>
              <strong>Always verify a listing directly with the employer</strong> before sending
              personal documents, paying any travel or relocation cost, signing an offer letter, or
              resigning from your current job. If something feels off, read our guide on{' '}
              <Link href="/blog/how-to-verify-uae-job-offer-is-real/">
                how to verify a UAE job offer is real
              </Link>
              .
            </p>

            <h2>4. Career and salary content is informational, not advice</h2>
            <p>
              Articles on theuaecareer.com — including salary breakdowns, visa guides, labour-law
              explainers, interview prep, and CV advice — are published for general informational
              purposes only. They are based on publicly available sources, our editorial research,
              and first-hand knowledge of the Gulf job market.
            </p>
            <p>
              These articles are <strong>not</strong>:
            </p>
            <ul>
              <li>
                <strong>Legal advice.</strong> For binding legal questions about UAE Labour Law,
                consult a qualified UAE-licensed lawyer or the Ministry of Human Resources and
                Emiratisation (MOHRE).
              </li>
              <li>
                <strong>Immigration advice.</strong> For visa status, residency, sponsorship, or
                family-visa questions, consult a licensed UAE immigration consultant or the
                Federal Authority for Identity, Citizenship, Customs and Port Security (ICP/GDRFA).
              </li>
              <li>
                <strong>Financial advice.</strong> Salary, gratuity, end-of-service, or remittance
                articles describe how things commonly work — not what you should do with your
                specific finances. Consult a qualified financial advisor for personal decisions.
              </li>
              <li>
                <strong>Tax advice.</strong> The UAE&apos;s corporate tax and VAT landscape changes
                regularly. For binding tax questions, consult a Federal Tax Authority (FTA)
                registered tax agent.
              </li>
            </ul>

            <h2>5. Tools (CV Maker, Gratuity Calculator, Currency Converter)</h2>
            <p>
              The free tools on this site are provided as a convenience. They reflect general
              public formulas, current rate references, and standard formatting practice — but they
              are not certified outputs.
            </p>
            <ul>
              <li>
                <strong>CV Maker:</strong> The generated PDF is a starting point. Recruiters and
                applicant tracking systems vary; always review and customise the CV for the specific
                role before sending.
              </li>
              <li>
                <strong>Gratuity Calculator:</strong> Calculations follow UAE Labour Law as of the
                article&apos;s last update. Your actual end-of-service benefit depends on your
                signed contract, your basic salary (not gross), your tenure, and the specific reason
                for leaving. For binding figures, request a formal gratuity statement from your
                employer or use the MOHRE online calculator.
              </li>
              <li>
                <strong>Currency Converter:</strong> Rates shown are market references and not the
                rate any specific bank or remittance house will give you. Always check the
                exchange-house quote before initiating a transfer.
              </li>
            </ul>

            <h2>6. Affiliate links and recommendations</h2>
            <p>
              Some articles on theuaecareer.com may contain affiliate links to third-party services
              (banks, remittance providers, training platforms, or other relevant tools). If you
              click and complete a qualifying action, we may receive a small commission at no
              additional cost to you.
            </p>
            <p>
              <strong>We only link to services we believe are useful to Gulf job seekers.</strong>{' '}
              Affiliate revenue does not influence which products we recommend or the editorial
              opinion of our content. We do not accept payment from employers to feature or
              prioritise their job listings.
            </p>

            <h2>7. Advertising</h2>
            <p>
              theuaecareer.com displays advertising provided by Google AdSense and may include other
              ad networks in the future. Advertisements are visually distinguishable from editorial
              content. We do not endorse, control, or vouch for advertised products, services, or
              employers. Clicking an ad takes you to a third-party site governed by its own terms
              and privacy practices.
            </p>

            <h2>8. Third-party links</h2>
            <p>
              Articles on this site link to official employer career pages, government portals
              (MOHRE, ICP, GDRFA, FTA), and other reference sources. Once you follow an external
              link, you are subject to that site&apos;s own terms and privacy policy.
              theuaecareer.com is not responsible for content, accuracy, or practices on third-party
              sites.
            </p>

            <h2>9. No employment relationship</h2>
            <p>
              Reading this site, downloading a CV from our CV Maker, or applying to a listing
              published here does not create any agency, partnership, joint-venture, employment, or
              recruiter-candidate relationship between you and theuaecareer.com. We are an
              information platform — not your recruiter.
            </p>

            <h2>10. Reporting issues</h2>
            <p>
              If you see a listing that looks fraudulent, an article that contains an error, or
              advertising that violates our content policy, please email{' '}
              <strong>info [at] theuaecareer.com</strong> with the URL and a short description. We
              review reports within 5 working days and take down content that breaches our policies.
            </p>

            <h2>11. Contact</h2>
            <p>
              For any question about this disclaimer, use the{' '}
              <Link href="/contact/">contact form</Link> or email us directly.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
