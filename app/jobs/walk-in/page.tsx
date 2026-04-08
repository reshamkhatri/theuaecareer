import type { Metadata } from 'next';
import Link from 'next/link';
import { FiBriefcase, FiCheckCircle, FiMapPin } from 'react-icons/fi';
import { SITE_URL } from '@/lib/constants';
import { formatDisplayDate } from '@/lib/format';
import { getJobs } from '@/lib/content';

export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Walk-in Interviews in UAE 2026 - Dubai & Abu Dhabi Hiring Events',
  description:
    'Explore the latest walk-in interview opportunities in Dubai, Abu Dhabi, Sharjah, and across the UAE. Get direct hiring event details and quick-apply guidance.',
  alternates: {
    canonical: '/jobs/walk-in/',
  },
  openGraph: {
    title: 'Walk-in Interviews in UAE 2026 - Dubai & Abu Dhabi Hiring Events',
    description:
      'Explore the latest walk-in interview opportunities in Dubai, Abu Dhabi, Sharjah, and across the UAE.',
    url: '/jobs/walk-in/',
  },
};

function renderWalkInSchedule(summary?: string, date?: string, time?: string): string {
  if (summary) {
    return summary;
  }
  return [date ? formatDisplayDate(date) : '', time].filter(Boolean).join(' | ');
}

export default async function WalkInJobsPage() {
  const jobs = await getJobs({
    walkIn: true,
    sort: 'walk-in',
    limit: 100,
  });
  const walkInJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Walk-in Interviews in UAE',
    description:
      'Direct hiring events and walk-in interviews across Dubai, Abu Dhabi, Sharjah, and the wider UAE.',
    url: `${SITE_URL}/jobs/walk-in/`,
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: jobs.items.slice(0, 12).map((job, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        url: `${SITE_URL}/jobs/${job.slug}/`,
        name: job.title,
      })),
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(walkInJsonLd) }}
      />
      <section className="section" style={{ paddingBottom: '1rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
            <h1>
              Walk-in <span style={{ color: 'var(--success)' }}>Interviews</span>
            </h1>
            <p style={{ fontSize: '1.125rem', marginTop: 'var(--space-sm)' }}>
              Direct hiring events across the UAE, sorted for fast action.
            </p>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container blog-layout">
          <div className="blog-main">
            {jobs.items.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                <p>No active walk-in interviews found right now. Check back soon.</p>
                <Link href="/jobs" className="btn btn-primary mt-md">
                  View All Jobs
                </Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
                {jobs.items.map((job) => (
                  <div key={job._id}>
                    <div className="job-card job-card-walkin" style={{ borderLeft: '4px solid var(--success)' }}>
                      <div className="job-card-header">
                        <div>
                          <h3 className="job-card-title">
                            <Link href={`/jobs/${job.slug}/`}>{job.title}</Link>
                          </h3>
                          <div className="job-card-company">{job.companyName}</div>
                        </div>
                        <span className="badge badge-walkin">Walk-in</span>
                      </div>

                      <div className="job-card-meta">
                        <div className="job-card-meta-item">
                          <FiMapPin /> {job.location.city}, {job.location.country}
                        </div>
                        <div className="job-card-meta-item">
                          <FiBriefcase /> {job.jobType}
                        </div>
                      </div>

                      {job.walkInDetails && (
                        <div
                          style={{
                            marginTop: '1rem',
                            background: 'var(--bg-alt)',
                            padding: '1rem',
                            borderRadius: 'var(--radius-md)',
                          }}
                        >
                          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '8px', fontSize: '0.875rem' }}>
                            <div>
                              <strong>Schedule:</strong>{' '}
                              {renderWalkInSchedule(job.walkInDetails.summary, job.walkInDetails.date, job.walkInDetails.time)}
                            </div>
                            {job.walkInDetails.venue && (
                              <div>
                                <strong>Venue:</strong> {job.walkInDetails.venue}
                              </div>
                            )}
                          </div>
                        </div>
                      )}

                      <div className="job-card-footer">
                        <Link href={`/jobs/${job.slug}/`} className="btn btn-sm btn-dark">
                          View Details
                        </Link>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}
          </div>

          <aside className="blog-sidebar">
            <div className="card" style={{ background: '#F0FDF4', border: '1px solid #BBF7D0' }}>
              <h3
                style={{
                  fontSize: '1.125rem',
                  marginBottom: 'var(--space-md)',
                  color: '#166534',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <FiCheckCircle /> Walk-in Tips
              </h3>
              <ul
                style={{
                  paddingLeft: '20px',
                  fontSize: '0.875rem',
                  color: '#15803D',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                <li>Arrive 15 minutes early</li>
                <li>Dress professionally</li>
                <li>Bring multiple CV copies</li>
                <li>Carry your Emirates ID or passport copy</li>
              </ul>
            </div>

            <div className="card">
              <h3 style={{ fontSize: '1.125rem', marginBottom: 'var(--space-md)' }}>Useful Next Steps</h3>
              <div style={{ display: 'grid', gap: '14px' }}>
                {[
                  {
                    href: '/tools/cv-maker/',
                    title: 'Update your CV first',
                    description: 'Prepare a cleaner, role-ready resume before you arrive at the venue.',
                  },
                  {
                    href: '/resources/interview-question-bank/',
                    title: 'Practice short interview answers',
                    description: 'Review common Gulf-sector questions for quick walk-in screening rounds.',
                  },
                  {
                    href: '/jobs/',
                    title: 'Compare other live jobs',
                    description: 'If the walk-in timing does not fit, switch to the broader jobs listing.',
                  },
                ].map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    style={{
                      display: 'grid',
                      gap: '4px',
                      paddingBottom: '14px',
                      borderBottom: '1px solid var(--border)',
                      textDecoration: 'none',
                    }}
                  >
                    <span style={{ color: 'var(--text)', fontWeight: 700 }}>{link.title}</span>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.55 }}>
                      {link.description}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
