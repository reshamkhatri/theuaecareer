import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Disclaimer',
  description:
    'Read theuaecareer.com disclaimer covering job-listing accuracy, third-party employers, candidate verification, and the limits of our informational content.',
  alternates: {
    canonical: '/disclaimer/',
  },
};

export default function DisclaimerPage() {
  return (
    <section className="section">
      <div className="container container-narrow">
        <article className="card prose" style={{ padding: 'var(--space-2xl)' }}>
          <h1>Disclaimer</h1>
          <p>
            theuaecareer.com is an informational platform that publishes job listings, walk-in
            interview notices, career guides, salary insights, and tools for Gulf job seekers.
          </p>
          <h2>No Recruitment Fees</h2>
          <p>
            We do not charge candidates for job applications, interviews, shortlisting, or hiring.
            If any employer or third party asks for money, treat it as a red flag and verify the
            opportunity independently.
          </p>
          <h2>Third-Party Listings</h2>
          <p>
            Job opportunities and walk-in interview details are sourced from employers, public
            notices, and editorial research. While we aim to keep information accurate and updated,
            we cannot guarantee that every listing remains active, complete, or error-free at all
            times.
          </p>
          <h2>Verification Responsibility</h2>
          <p>
            Always confirm job details, company legitimacy, interview venue, visa requirements, and
            compensation directly with the employer before taking action. You are responsible for
            your own due diligence before applying or attending an interview.
          </p>
          <h2>Career Content</h2>
          <p>
            Career guides, salary explainers, and visa articles are published for general
            informational purposes only. They should not be treated as legal, immigration,
            financial, or professional employment advice.
          </p>
          <h2>Contact</h2>
          <p>
            If you see misleading, expired, or suspicious content, please contact us so we can
            review it.
          </p>
        </article>
      </div>
    </section>
  );
}
