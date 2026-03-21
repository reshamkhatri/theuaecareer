import Link from 'next/link';
import { FiBriefcase, FiClock, FiFilter, FiMapPin, FiSearch } from 'react-icons/fi';
import AdPlaceholder from '@/components/AdPlaceholder';
import { COUNTRIES, JOB_CATEGORIES, JOB_TYPES } from '@/lib/constants';
import { formatDisplayDate, getJobs } from '@/lib/content';

function buildJobsHref(
  current: Record<string, string>,
  overrides: Record<string, string | number | undefined>
): string {
  const params = new URLSearchParams();

  Object.entries({ ...current, ...overrides }).forEach(([key, value]) => {
    if (value !== undefined && String(value).trim()) {
      params.set(key, String(value));
    }
  });

  const query = params.toString();
  return query ? `/jobs?${query}` : '/jobs';
}

export default async function JobsPage({
  searchParams,
}: {
  searchParams: Promise<{
    search?: string;
    country?: string;
    category?: string;
    jobType?: string;
    type?: string;
    page?: string;
  }>;
}) {
  const resolvedSearchParams = await searchParams;
  const currentSearch = resolvedSearchParams.search?.trim() || '';
  const currentCountry = resolvedSearchParams.country?.trim() || '';
  const currentCategory = resolvedSearchParams.category?.trim() || '';
  const currentJobType = resolvedSearchParams.jobType?.trim() || resolvedSearchParams.type?.trim() || '';
  const currentPage = Number(resolvedSearchParams.page || '1') || 1;

  const jobs = await getJobs({
    page: currentPage,
    limit: 20,
    search: currentSearch,
    country: currentCountry,
    category: currentCategory,
    jobType: currentJobType,
  });

  const currentFilters = {
    search: currentSearch,
    country: currentCountry,
    category: currentCategory,
    jobType: currentJobType,
  };

  return (
    <>
      <section className="section" style={{ paddingBottom: '1rem' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-xl)' }}>
            <h1>
              Find <span style={{ color: 'var(--accent)' }}>Jobs</span>
            </h1>
            <p style={{ fontSize: '1.125rem', marginTop: 'var(--space-sm)' }}>
              Browse verified job listings across the Gulf region.
            </p>
          </div>
          <AdPlaceholder format="leaderboard" label="Top Job Board Ad" />
        </div>
      </section>

      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container blog-layout">
          <div className="blog-main">
            <div className="card" style={{ marginBottom: 'var(--space-xl)', padding: 'var(--space-lg)' }}>
              <form action="/jobs" method="get" style={{ display: 'grid', gap: 'var(--space-md)' }}>
                <div style={{ display: 'flex', gap: 'var(--space-sm)', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div
                    style={{
                      flex: 1,
                      minWidth: '260px',
                      display: 'flex',
                      alignItems: 'center',
                      background: 'var(--bg-alt)',
                      borderRadius: 'var(--radius-md)',
                      padding: '0 16px',
                    }}
                  >
                    <FiSearch style={{ color: 'var(--text-muted)' }} />
                    <input
                      type="text"
                      name="search"
                      defaultValue={currentSearch}
                      placeholder="Job title, keywords, or company"
                      style={{
                        width: '100%',
                        border: 'none',
                        background: 'transparent',
                        padding: '12px',
                        fontSize: '1rem',
                        outline: 'none',
                      }}
                    />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{ padding: '12px 24px' }}>
                    <FiFilter /> Apply Filters
                  </button>
                  <Link href="/jobs" className="btn btn-secondary" style={{ padding: '12px 16px' }}>
                    Reset
                  </Link>
                </div>

                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
                    gap: 'var(--space-md)',
                  }}
                >
                  <select name="country" defaultValue={currentCountry} className="form-select">
                    <option value="">All Countries</option>
                    {COUNTRIES.map((country) => (
                      <option key={country} value={country}>
                        {country}
                      </option>
                    ))}
                  </select>
                  <select name="category" defaultValue={currentCategory} className="form-select">
                    <option value="">All Categories</option>
                    {JOB_CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <select name="jobType" defaultValue={currentJobType} className="form-select">
                    <option value="">All Types</option>
                    {JOB_TYPES.map((jobType) => (
                      <option key={jobType} value={jobType}>
                        {jobType}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
            </div>

            {jobs.items.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: '3rem' }}>
                <p>No jobs found matching your criteria.</p>
                <Link href="/jobs" className="btn btn-primary mt-md">
                  Clear Filters
                </Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '-8px' }}>
                  Showing {jobs.items.length} of {jobs.pagination.total} jobs
                </div>

                {jobs.items.map((job, index) => (
                  <div key={job._id}>
                    <div className={`job-card ${job.isWalkIn ? 'job-card-walkin' : ''}`}>
                      <div className="job-card-header">
                        <div>
                          <h3 className="job-card-title">
                            <Link href={`/jobs/${job.slug}`}>{job.title}</Link>
                          </h3>
                          <div className="job-card-company">{job.companyName}</div>
                        </div>
                        {job.isWalkIn && <span className="badge badge-walkin">Walk-in</span>}
                      </div>

                      <div className="job-card-meta">
                        <div className="job-card-meta-item">
                          <FiMapPin /> {job.location.city}, {job.location.country}
                        </div>
                        <div className="job-card-meta-item">
                          <FiBriefcase /> {job.jobType}
                        </div>
                        <div className="job-card-meta-item">
                          <FiClock /> {job.experienceRequired}
                        </div>
                      </div>

                      <div className="job-card-footer">
                        <div className="job-card-date">Posted {formatDisplayDate(job.postedDate)}</div>
                        <Link href={`/jobs/${job.slug}`} className="btn btn-sm btn-primary">
                          View Details
                        </Link>
                      </div>
                    </div>

                    {(index + 1) % 5 === 0 && <AdPlaceholder format="fluid" label="In-feed Job Ad" />}
                  </div>
                ))}

                {jobs.pagination.pages > 1 && (
                  <div
                    className="card"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      gap: 'var(--space-md)',
                    }}
                  >
                    <Link
                      href={buildJobsHref(currentFilters, { page: currentPage > 1 ? currentPage - 1 : undefined })}
                      className="btn btn-secondary"
                      aria-disabled={currentPage <= 1}
                      style={{ pointerEvents: currentPage <= 1 ? 'none' : 'auto', opacity: currentPage <= 1 ? 0.5 : 1 }}
                    >
                      Previous
                    </Link>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                      Page {jobs.pagination.page} of {jobs.pagination.pages}
                    </span>
                    <Link
                      href={buildJobsHref(currentFilters, {
                        page: currentPage < jobs.pagination.pages ? currentPage + 1 : undefined,
                      })}
                      className="btn btn-secondary"
                      aria-disabled={currentPage >= jobs.pagination.pages}
                      style={{
                        pointerEvents: currentPage >= jobs.pagination.pages ? 'none' : 'auto',
                        opacity: currentPage >= jobs.pagination.pages ? 0.5 : 1,
                      }}
                    >
                      Next
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>

          <aside className="blog-sidebar">
            <AdPlaceholder format="rectangle" label="Sidebar Ad" />

            <div className="card">
              <h3 style={{ fontSize: '1.125rem', marginBottom: 'var(--space-md)' }}>Browse by Country</h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {COUNTRIES.map((country) => (
                  <li key={country}>
                    <Link href={buildJobsHref(currentFilters, { country, page: 1 })} style={{ color: 'var(--text-secondary)' }}>
                      Jobs in {country}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <AdPlaceholder format="skyscraper" label="Sticky Sidebar Ad" />
          </aside>
        </div>
      </section>
    </>
  );
}
