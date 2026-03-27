import Link from 'next/link';
import { FiBriefcase, FiCheckCircle, FiMapPin } from 'react-icons/fi';
import { formatDisplayDate } from '@/lib/format';
import { getJobs } from '@/lib/content';

export const revalidate = 300;

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

  return (
    <>
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
                            <Link href={`/jobs/${job.slug}`}>{job.title}</Link>
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
                        <Link href={`/jobs/${job.slug}`} className="btn btn-sm btn-dark">
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
          </aside>
        </div>
      </section>
    </>
  );
}
