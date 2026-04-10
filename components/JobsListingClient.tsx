'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { FiBriefcase, FiClock, FiFilter, FiMapPin, FiSearch } from 'react-icons/fi';
import AdSlot from '@/components/AdSlot';
import { COUNTRIES, JOB_CATEGORIES, JOB_TYPES } from '@/lib/constants';
import { formatDisplayDate } from '@/lib/format';
import { buildSeoTitle } from '@/lib/seo-metadata';
import { getSeoPathwaysForTargeting, mergeContentBySlug } from '@/lib/seo-targeting';
import type { JobRecord } from '@/lib/types';

const PAGE_SIZE = 20;
const jobListAdSlot = process.env.NEXT_PUBLIC_ADSENSE_JOB_LIST_SLOT?.trim();

function matchesSearch(job: JobRecord, search: string): boolean {
  const haystack = [
    job.title,
    job.companyName,
    job.description,
    job.location.city,
    job.location.country,
    job.categoryLabel || job.category,
  ]
    .join(' ')
    .toLowerCase();

  return haystack.includes(search.toLowerCase());
}

export default function JobsListingClient({
  initialJobs,
}: {
  initialJobs: JobRecord[];
}) {
  return (
    <Suspense
      fallback={
        <JobsListingView
          initialJobs={initialJobs}
          currentSearch=""
          currentCountry=""
          currentCategory=""
          currentJobType=""
          requestedPage={1}
        />
      }
    >
      <JobsListingSearchParams initialJobs={initialJobs} />
    </Suspense>
  );
}

function JobsListingSearchParams({
  initialJobs,
}: {
  initialJobs: JobRecord[];
}) {
  const searchParams = useSearchParams();
  const currentSearch = searchParams.get('search')?.trim() || '';
  const currentCountry = searchParams.get('country')?.trim() || '';
  const currentCategory = searchParams.get('category')?.trim() || '';
  const currentJobType =
    searchParams.get('jobType')?.trim() || searchParams.get('type')?.trim() || '';
  const requestedPage = Number(searchParams.get('page') || '1') || 1;

  return (
    <JobsListingView
      initialJobs={initialJobs}
      currentSearch={currentSearch}
      currentCountry={currentCountry}
      currentCategory={currentCategory}
      currentJobType={currentJobType}
      requestedPage={requestedPage}
    />
  );
}

function JobsListingView({
  initialJobs,
  currentSearch,
  currentCountry,
  currentCategory,
  currentJobType,
  requestedPage,
}: {
  initialJobs: JobRecord[];
  currentSearch: string;
  currentCountry: string;
  currentCategory: string;
  currentJobType: string;
  requestedPage: number;
}) {
  const filteredJobs = initialJobs.filter((job) => {
    if (currentCountry && job.location.country !== currentCountry) {
      return false;
    }
    if (currentCategory && job.category !== currentCategory) {
      return false;
    }
    if (currentJobType && job.jobType !== currentJobType) {
      return false;
    }
    if (currentSearch && !matchesSearch(job, currentSearch)) {
      return false;
    }

    return true;
  });

  const totalPages = Math.max(1, Math.ceil(filteredJobs.length / PAGE_SIZE));
  const currentPage = Math.min(Math.max(1, requestedPage), totalPages);
  const paginatedJobs = filteredJobs.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  const helperLinks = mergeContentBySlug(
    [
      ...getSeoPathwaysForTargeting(
        {
          country: currentCountry === 'Saudi Arabia' ? 'Saudi Arabia' : 'UAE',
          roleFamily: currentCategory === 'Logistics' ? 'warehouse-logistics' : 'cv-application',
          intentCluster: currentCategory === 'Logistics' ? 'application-workflow' : 'walk-in-prep',
          searchStage: 'apply',
        },
        { surface: 'jobs', limit: 2 }
      ),
      ...getSeoPathwaysForTargeting(
        {
          country: currentCountry === 'Qatar' ? 'Qatar' : 'Gulf',
          roleFamily: currentCategory === 'Hospitality' ? 'hotel-hospitality' : 'general',
          intentCluster: 'role-interview-prep',
          searchStage: 'prepare',
        },
        { surface: 'jobs', limit: 2 }
      ),
    ],
    (item) => item.href
  ).slice(0, 4);

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
        </div>
      </section>

      <section className="section" style={{ paddingTop: '1rem' }}>
        <div className="container blog-layout">
          <div className="blog-main">
            <div className="card" style={{ marginBottom: 'var(--space-xl)', padding: 'var(--space-lg)' }}>
              <form action="/jobs/" method="get" style={{ display: 'grid', gap: 'var(--space-md)' }} aria-label="Filter job listings">
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
                    <label htmlFor="jobs-search" className="visually-hidden">
                      Search jobs by title, keyword, or company
                    </label>
                    <input
                      id="jobs-search"
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
                  <Link href="/jobs/" className="btn btn-secondary" style={{ padding: '12px 16px' }}>
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
                  <div>
                    <label htmlFor="jobs-country" className="form-label">Country</label>
                    <select id="jobs-country" name="country" defaultValue={currentCountry} className="form-select">
                      <option value="">All Countries</option>
                      {COUNTRIES.map((country) => (
                        <option key={country} value={country}>
                          {country}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="jobs-category" className="form-label">Category</label>
                    <select id="jobs-category" name="category" defaultValue={currentCategory} className="form-select">
                      <option value="">All Categories</option>
                      {JOB_CATEGORIES.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="jobs-type" className="form-label">Job type</label>
                    <select id="jobs-type" name="jobType" defaultValue={currentJobType} className="form-select">
                      <option value="">All Types</option>
                      {JOB_TYPES.map((jobType) => (
                        <option key={jobType} value={jobType}>
                          {jobType}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </form>
            </div>

            {paginatedJobs.length === 0 ? (
              <div className="card" style={{ textAlign: 'center', padding: '3rem' }} role="status" aria-live="polite">
                <p>No jobs found matching your criteria.</p>
                <Link href="/jobs/" className="btn btn-primary mt-md">
                  Clear Filters
                </Link>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-lg)' }}>
                <div
                  style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: '-8px' }}
                  role="status"
                  aria-live="polite"
                >
                  Showing {paginatedJobs.length} of {filteredJobs.length} jobs
                </div>

                {paginatedJobs.map((job, index) => (
                  <JobListItem key={job._id} job={job} index={index} />
                ))}

                {totalPages > 1 && (
                  <div
                    className="card"
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      flexWrap: 'wrap',
                      gap: 'var(--space-md)',
                    }}
                  >
                    <form action="/jobs/" method="get">
                      {currentSearch && <input type="hidden" name="search" value={currentSearch} />}
                      {currentCountry && <input type="hidden" name="country" value={currentCountry} />}
                      {currentCategory && <input type="hidden" name="category" value={currentCategory} />}
                      {currentJobType && <input type="hidden" name="jobType" value={currentJobType} />}
                      <button
                        type="submit"
                        name="page"
                        value={currentPage - 1}
                        className="btn btn-secondary"
                        disabled={currentPage <= 1}
                      >
                        Previous
                      </button>
                    </form>
                    <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                      Page {currentPage} of {totalPages}
                    </span>
                    <form action="/jobs/" method="get">
                      {currentSearch && <input type="hidden" name="search" value={currentSearch} />}
                      {currentCountry && <input type="hidden" name="country" value={currentCountry} />}
                      {currentCategory && <input type="hidden" name="category" value={currentCategory} />}
                      {currentJobType && <input type="hidden" name="jobType" value={currentJobType} />}
                      <button
                        type="submit"
                        name="page"
                        value={currentPage + 1}
                        className="btn btn-secondary"
                        disabled={currentPage >= totalPages}
                      >
                        Next
                      </button>
                    </form>
                  </div>
                )}
              </div>
            )}
          </div>

          <aside className="blog-sidebar">
            <div className="card">
              <h3 style={{ fontSize: '1.125rem', marginBottom: 'var(--space-md)' }}>Browse by Country</h3>
              <form action="/jobs/" method="get">
                {currentSearch && <input type="hidden" name="search" value={currentSearch} />}
                {currentCategory && <input type="hidden" name="category" value={currentCategory} />}
                {currentJobType && <input type="hidden" name="jobType" value={currentJobType} />}
                <ul style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {COUNTRIES.map((country) => (
                    <li key={country}>
                      <button
                        type="submit"
                        name="country"
                        value={country}
                        style={{
                          color: 'var(--text-secondary)',
                          background: 'transparent',
                          border: 'none',
                          padding: 0,
                          cursor: 'pointer',
                          textAlign: 'left',
                        }}
                      >
                        Jobs in {country}
                      </button>
                    </li>
                  ))}
                </ul>
              </form>
            </div>

            <div className="card">
              <h3 style={{ fontSize: '1.125rem', marginBottom: 'var(--space-md)' }}>Useful Before You Apply</h3>
              <div style={{ display: 'grid', gap: '14px' }}>
                {helperLinks.map((link) => (
                  <div
                    key={link.href}
                    style={{
                      display: 'grid',
                      gap: '4px',
                      paddingBottom: '14px',
                      borderBottom: '1px solid var(--border)',
                    }}
                  >
                    <span style={{ color: 'var(--text)', fontWeight: 700 }}>{link.title}</span>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.55, margin: 0 }}>
                      {link.description}
                    </p>
                    <Link href={link.href} style={{ color: 'var(--accent)', fontWeight: 700, textDecoration: 'none' }}>
                      Open {buildSeoTitle(link.title, 38)}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}

function JobListItem({
  job,
  index,
}: {
  job: JobRecord;
  index: number;
}) {
  const shouldRenderAd = Boolean(jobListAdSlot && (index + 1) % 8 === 0);

  return (
    <>
      <div>
        <div className={`job-card ${job.isWalkIn ? 'job-card-walkin' : ''}`}>
          <div className="job-card-header">
            <div>
              <h3 className="job-card-title">
                <Link href={`/jobs/${job.slug}/`}>{job.title}</Link>
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
            <Link href={`/jobs/${job.slug}/`} className="btn btn-sm btn-primary">
              View Details
            </Link>
          </div>
        </div>
      </div>

      {shouldRenderAd && (
        <div className="card" style={{ padding: 'var(--space-lg)' }}>
          <AdSlot slot={jobListAdSlot} minHeight={250} />
        </div>
      )}
    </>
  );
}
