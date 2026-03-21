import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  FiCalendar,
  FiCheckCircle,
  FiChevronRight,
  FiFacebook,
  FiMapPin,
  FiTwitter,
} from 'react-icons/fi';
import AdPlaceholder from '@/components/AdPlaceholder';
import CopyLinkButton from '@/components/CopyLinkButton';
import { formatDisplayDate, getJobByIdentifier, getJobs, stripHtml } from '@/lib/content';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJobByIdentifier(slug);

  if (!job) {
    return {
      title: 'Job Not Found',
    };
  }

  return {
    title: job.metaTitle || `${job.title} in ${job.location.city} | theuaecareer.com`,
    description: job.metaDescription || stripHtml(job.description).slice(0, 160),
    alternates: {
      canonical: `/jobs/${job.slug}`,
    },
    openGraph: {
      title: job.metaTitle || job.title,
      description: job.metaDescription || stripHtml(job.description).slice(0, 160),
      url: `/jobs/${job.slug}`,
      type: 'article',
    },
  };
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = await getJobByIdentifier(slug);

  if (!job) {
    notFound();
  }

  const relatedJobs = (
    await getJobs({
      category: job.category,
      limit: 6,
    })
  ).items
    .filter((item) => item.slug !== job.slug)
    .slice(0, 2);

  const shareUrl = new URL(`/jobs/${job.slug}`, siteUrl).toString();
  const isExpired =
    job.status === 'expired' || (job.expiryDate ? new Date(job.expiryDate) < new Date() : false);

  const jsonLd = {
    '@context': 'https://schema.org/',
    '@type': 'JobPosting',
    title: job.title,
    description: stripHtml(job.description),
    hiringOrganization: {
      '@type': 'Organization',
      name: job.companyName || 'Confidential Company',
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location.city,
        addressCountry: job.location.country,
      },
    },
    datePosted: job.postedDate,
    validThrough: job.expiryDate,
    employmentType: job.jobType.toUpperCase().replace('-', '_'),
    ...(job.salaryRange && (job.salaryRange.min || job.salaryRange.max)
      ? {
          baseSalary: {
            '@type': 'MonetaryAmount',
            currency: job.salaryRange.currency,
            value: {
              '@type': 'QuantitativeValue',
              ...(job.salaryRange.min ? { minValue: job.salaryRange.min } : {}),
              ...(job.salaryRange.max ? { maxValue: job.salaryRange.max } : {}),
              unitText: 'MONTH',
            },
          },
        }
      : {}),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container" style={{ marginTop: 'var(--space-xl)' }}>
        <AdPlaceholder format="leaderboard" label="Top Job Details Ad" />
      </div>

      <section className="section" style={{ paddingTop: 'var(--space-xl)' }}>
        <div className="container blog-layout">
          <main className="blog-main">
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 'var(--space-lg)' }}>
              <Link href="/">Home</Link> <FiChevronRight style={{ display: 'inline', margin: '0 4px' }} />
              <Link href="/jobs">Jobs</Link> <FiChevronRight style={{ display: 'inline', margin: '0 4px' }} />
              {job.location.city}
            </div>

            <div className="card" style={{ padding: 'var(--space-2xl)', position: 'relative' }}>
              <span className="badge badge-primary" style={{ marginBottom: 'var(--space-md)' }}>
                {job.categoryLabel || job.category}
              </span>

              <h1 style={{ fontSize: '2.5rem', marginBottom: 'var(--space-lg)', lineHeight: '1.2' }}>
                {job.title}
              </h1>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: 'var(--space-lg)',
                  color: 'var(--text-muted)',
                  fontSize: '0.875rem',
                  marginBottom: 'var(--space-xl)',
                  paddingBottom: 'var(--space-md)',
                  borderBottom: '1px solid var(--border)',
                }}
              >
                <span>
                  <strong style={{ color: 'var(--text)' }}>{job.companyName}</strong>
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FiMapPin /> {job.location.city}, {job.location.country}
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FiCalendar /> Posted: {formatDisplayDate(job.postedDate)}
                </span>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginBottom: 'var(--space-2xl)', flexWrap: 'wrap' }}>
                <Link
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(job.title)}`}
                  className="btn btn-secondary btn-sm"
                  target="_blank"
                >
                  <FiTwitter /> Share
                </Link>
                <Link
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
                  className="btn btn-secondary btn-sm"
                  target="_blank"
                >
                  <FiFacebook /> Share
                </Link>
                <CopyLinkButton url={shareUrl} />
              </div>

              <div
                style={{
                  background: '#F8FAFC',
                  padding: 'var(--space-xl)',
                  borderRadius: 'var(--radius-md)',
                  marginBottom: 'var(--space-2xl)',
                  border: '1px solid #E2E8F0',
                }}
              >
                <h3 style={{ fontSize: '1.125rem', marginBottom: 'var(--space-md)', color: 'var(--primary)' }}>
                  Job Overview
                </h3>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0,
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 'var(--space-md)',
                    fontSize: '0.9375rem',
                  }}
                >
                  <li style={{ display: 'flex', borderBottom: '1px dashed #CBD5E1', paddingBottom: '8px' }}>
                    <strong style={{ minWidth: '120px', color: 'var(--text-secondary)' }}>Industry:</strong>{' '}
                    {job.categoryLabel || job.category}
                  </li>
                  <li style={{ display: 'flex', borderBottom: '1px dashed #CBD5E1', paddingBottom: '8px' }}>
                    <strong style={{ minWidth: '120px', color: 'var(--text-secondary)' }}>Job Type:</strong> {job.jobType}
                  </li>
                  <li style={{ display: 'flex', borderBottom: '1px dashed #CBD5E1', paddingBottom: '8px' }}>
                    <strong style={{ minWidth: '120px', color: 'var(--text-secondary)' }}>Experience:</strong>{' '}
                    {job.experienceRequired || 'Not specified'}
                  </li>
                  {job.salaryRange?.label && (
                    <li style={{ display: 'flex', borderBottom: '1px dashed #CBD5E1', paddingBottom: '8px' }}>
                      <strong style={{ minWidth: '120px', color: 'var(--text-secondary)' }}>Salary:</strong>{' '}
                      {job.salaryRange.label}
                    </li>
                  )}
                </ul>
              </div>

              {job.isWalkIn && job.walkInDetails && (
                <div
                  style={{
                    background: '#F0FDF4',
                    border: '1px solid #BBF7D0',
                    padding: 'var(--space-lg)',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: 'var(--space-2xl)',
                  }}
                >
                  <h3
                    style={{
                      color: '#166534',
                      marginBottom: 'var(--space-md)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <FiCheckCircle /> Walk-in Interview Details
                  </h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-sm)' }}>
                    {job.walkInDetails.summary && (
                      <div>
                        <strong>Schedule:</strong> {job.walkInDetails.summary}
                      </div>
                    )}
                    {job.walkInDetails.date && (
                      <div>
                        <strong>Date:</strong> {formatDisplayDate(job.walkInDetails.date)}
                      </div>
                    )}
                    {job.walkInDetails.time && (
                      <div>
                        <strong>Time:</strong> {job.walkInDetails.time}
                      </div>
                    )}
                    {job.walkInDetails.venue && (
                      <div>
                        <strong>Venue:</strong> {job.walkInDetails.venue}
                      </div>
                    )}
                  </div>
                </div>
              )}

              <div
                className="prose article-prose"
                dangerouslySetInnerHTML={{ __html: job.description }}
                style={{ marginBottom: 'var(--space-2xl)' }}
              />

              <AdPlaceholder format="fluid" label="In-feed Ad" />

              <div id="how-to-apply" style={{ marginTop: 'var(--space-2xl)' }}>
                <h2 style={{ fontSize: '1.75rem', marginBottom: 'var(--space-md)' }}>How to Apply</h2>
                {!isExpired ? (
                  <div
                    style={{
                      background: '#F0F9FF',
                      border: '1px solid #BAE6FD',
                      padding: 'var(--space-xl)',
                      borderRadius: 'var(--radius-lg)',
                    }}
                  >
                    <div className="prose" dangerouslySetInnerHTML={{ __html: job.howToApply }} />
                  </div>
                ) : (
                  <div
                    style={{
                      background: 'var(--bg-alt)',
                      padding: 'var(--space-xl)',
                      borderRadius: 'var(--radius-md)',
                      opacity: 0.7,
                    }}
                  >
                    <p>This job is expired. Application instructions are hidden.</p>
                  </div>
                )}

                <div
                  style={{
                    marginTop: 'var(--space-xl)',
                    background: '#FFFBEB',
                    border: '1px solid #FEF3C7',
                    padding: '1rem',
                    borderRadius: 'var(--radius-md)',
                    fontSize: '0.8125rem',
                    color: '#92400E',
                  }}
                >
                  <strong>Important Notice:</strong> theuaecareer.com is an informational platform. We do not process applications or charge any fees. Verify details with the company directly before applying.
                </div>
              </div>
            </div>

            <div style={{ marginTop: 'var(--space-2xl)' }}>
              <AdPlaceholder format="leaderboard" label="Bottom Job Ad" />
            </div>

            {relatedJobs.length > 0 && (
              <>
                <h2 style={{ fontSize: '1.75rem', marginTop: 'var(--space-3xl)' }}>Similar Jobs</h2>
                <div className="grid-2 mt-xl">
                  {relatedJobs.map((relatedJob) => (
                    <div key={relatedJob._id} className="card">
                      <h3 style={{ fontSize: '1.125rem', marginBottom: '8px' }}>
                        <Link href={`/jobs/${relatedJob.slug}`}>{relatedJob.title}</Link>
                      </h3>
                      <p style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>
                        {relatedJob.companyName} • {relatedJob.location.city}
                      </p>
                      <Link href={`/jobs/${relatedJob.slug}`} className="btn btn-secondary btn-sm">
                        View Job
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            )}
          </main>

          <aside className="blog-sidebar">
            <AdPlaceholder format="rectangle" label="Sidebar Ad" />

            {!isExpired && (
              <div className="card" style={{ background: 'var(--primary)', color: 'white', border: 'none' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: 'var(--space-md)', color: 'white' }}>Interested?</h3>
                <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.875rem', marginBottom: 'var(--space-lg)' }}>
                  Review the application steps carefully before you contact the employer.
                </p>
                <Link href="#how-to-apply" className="btn btn-primary btn-full">
                  See Application Details
                </Link>
              </div>
            )}

            <div className="card">
              <h3 style={{ fontSize: '1.125rem', marginBottom: 'var(--space-md)' }}>Free CV Builder</h3>
              <p style={{ fontSize: '0.875rem', marginBottom: 'var(--space-md)' }}>
                Build a professional Gulf-ready resume before you apply.
              </p>
              <Link href="/tools/cv-maker" className="btn btn-secondary btn-full">
                Create CV Now
              </Link>
            </div>

            <AdPlaceholder format="skyscraper" label="Sticky Sidebar Ad" />
          </aside>
        </div>
      </section>
    </>
  );
}
