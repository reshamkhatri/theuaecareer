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
import AdSlot from '@/components/AdSlot';
import CopyLinkButton from '@/components/CopyLinkButton';
import { SITE_URL } from '@/lib/constants';
import { formatDisplayDate } from '@/lib/format';
import {
  getAllPublicJobs,
  getHelpfulArticlesForJob,
  getJobByIdentifier,
  getRelatedJobs,
  stripHtml,
} from '@/lib/content';
import { deriveJobTargeting, getSeoPathwaysForTargeting } from '@/lib/seo-targeting';

export const revalidate = 300;
const jobInlineAdSlot = process.env.NEXT_PUBLIC_ADSENSE_JOB_INLINE_SLOT?.trim();
const jobSidebarAdSlot = process.env.NEXT_PUBLIC_ADSENSE_JOB_SIDEBAR_SLOT?.trim();

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

  const ogImage = `${SITE_URL}/og-default.png`;

  return {
    title: job.metaTitle || `${job.title} in ${job.location.city} | theuaecareer.com`,
    description: job.metaDescription || stripHtml(job.description).slice(0, 160),
    alternates: {
      canonical: `/jobs/${job.slug}/`,
    },
    openGraph: {
      title: job.metaTitle || job.title,
      description: job.metaDescription || stripHtml(job.description).slice(0, 160),
      url: `/jobs/${job.slug}/`,
      type: 'article',
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: `${job.title} at ${job.companyName}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: job.metaTitle || job.title,
      description: job.metaDescription || stripHtml(job.description).slice(0, 160),
      images: [ogImage],
    },
  };
}

export async function generateStaticParams() {
  const jobs = await getAllPublicJobs();
  return jobs.map((job) => ({
    slug: job.slug,
  }));
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

  const [relatedJobs, helpfulArticles] = await Promise.all([
    getRelatedJobs(job, 3),
    getHelpfulArticlesForJob(job, 3),
  ]);

  const shareUrl = new URL(`/jobs/${job.slug}/`, SITE_URL).toString();
  const isExpired =
    job.status === 'expired' || (job.expiryDate ? new Date(job.expiryDate) < new Date() : false);
  const jobTargeting = deriveJobTargeting(job);
  const jobResourceLinks = getSeoPathwaysForTargeting(jobTargeting, {
    surface: 'jobs',
    limit: 4,
  });

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
  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SITE_URL,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Jobs',
        item: `${SITE_URL}/jobs/`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: job.title,
        item: shareUrl,
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />

      <section className="section" style={{ paddingTop: 'var(--space-xl)' }}>
        <div className="container blog-layout">
          <main className="blog-main">
            <div style={{ fontSize: '0.875rem', color: 'var(--text-muted)', marginBottom: 'var(--space-lg)' }}>
              <Link href="/">Home</Link> <FiChevronRight style={{ display: 'inline', margin: '0 4px' }} />
              <Link href="/jobs/">Jobs</Link> <FiChevronRight style={{ display: 'inline', margin: '0 4px' }} />
              {job.title}
            </div>

            <div className="card job-detail-card" style={{ padding: 'var(--space-2xl)', position: 'relative' }}>
              <span className="badge badge-primary" style={{ marginBottom: 'var(--space-md)' }}>
                {job.categoryLabel || job.category}
              </span>

              <h1 className="job-detail-title" style={{ fontSize: 'clamp(2rem, 6vw, 2.5rem)', marginBottom: 'var(--space-lg)', lineHeight: '1.2' }}>
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
                  className="job-detail-overview"
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
                  <li className="job-detail-overview-item" style={{ display: 'flex', borderBottom: '1px dashed #CBD5E1', paddingBottom: '8px' }}>
                    <strong style={{ minWidth: '120px', color: 'var(--text-secondary)' }}>Industry:</strong>{' '}
                    {job.categoryLabel || job.category}
                  </li>
                  <li className="job-detail-overview-item" style={{ display: 'flex', borderBottom: '1px dashed #CBD5E1', paddingBottom: '8px' }}>
                    <strong style={{ minWidth: '120px', color: 'var(--text-secondary)' }}>Job Type:</strong> {job.jobType}
                  </li>
                  <li className="job-detail-overview-item" style={{ display: 'flex', borderBottom: '1px dashed #CBD5E1', paddingBottom: '8px' }}>
                    <strong style={{ minWidth: '120px', color: 'var(--text-secondary)' }}>Experience:</strong>{' '}
                    {job.experienceRequired || 'Not specified'}
                  </li>
                  {job.salaryRange?.label && (
                    <li className="job-detail-overview-item" style={{ display: 'flex', borderBottom: '1px dashed #CBD5E1', paddingBottom: '8px' }}>
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
                style={{
                  background: '#F8FAFC',
                  border: '1px solid var(--border)',
                  borderRadius: 'var(--radius-lg)',
                  padding: 'var(--space-xl)',
                  marginBottom: 'var(--space-2xl)',
                }}
              >
                <p
                  style={{
                    fontSize: '0.78rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.08em',
                    color: 'var(--accent)',
                    marginBottom: '10px',
                  }}
                >
                  Before you apply
                </p>
                <div className="grid-2">
                  {jobResourceLinks.slice(0, 4).map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="card"
                      style={{
                        textDecoration: 'none',
                        display: 'grid',
                        gap: '6px',
                        padding: '16px',
                      }}
                    >
                      <span style={{ color: 'var(--text)', fontWeight: 700 }}>{link.title}</span>
                      <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6 }}>
                        {link.description}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              <div
                className="prose article-prose"
                dangerouslySetInnerHTML={{ __html: job.description }}
                style={{ marginBottom: 'var(--space-2xl)' }}
              />

              <AdSlot slot={jobInlineAdSlot} minHeight={280} className="mb-xl" />

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

            {relatedJobs.length > 0 && (
              <>
                <h2 style={{ fontSize: '1.75rem', marginTop: 'var(--space-3xl)' }}>Similar Jobs</h2>
                <div className="grid-2 mt-xl">
                  {relatedJobs.map((relatedJob) => (
                    <div key={relatedJob._id} className="card">
                      <h3 style={{ fontSize: '1.125rem', marginBottom: '8px' }}>
                        <Link href={`/jobs/${relatedJob.slug}/`}>{relatedJob.title}</Link>
                      </h3>
                      <p style={{ color: 'var(--text-secondary)', marginBottom: '12px' }}>
                        {relatedJob.companyName} • {relatedJob.location.city}
                      </p>
                      <Link href={`/jobs/${relatedJob.slug}/`} className="btn btn-secondary btn-sm">
                        View Job
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            )}

            {helpfulArticles.length > 0 && (
              <>
                <h2 style={{ fontSize: '1.75rem', marginTop: 'var(--space-3xl)' }}>Helpful Career Guides</h2>
                <div className="grid-2 mt-xl">
                  {helpfulArticles.map((article) => (
                    <div key={article._id} className="card">
                      <span className="badge badge-secondary" style={{ marginBottom: '12px' }}>
                        {article.category}
                      </span>
                      <h3 style={{ fontSize: '1.125rem', marginBottom: '8px', lineHeight: 1.4 }}>
                        <Link href={`/blog/${article.slug}/`}>{article.title}</Link>
                      </h3>
                      <p style={{ color: 'var(--text-secondary)', marginBottom: '12px', lineHeight: 1.6 }}>
                        {article.excerpt}
                      </p>
                      <Link href={`/blog/${article.slug}/`} className="btn btn-secondary btn-sm">
                        Read Guide
                      </Link>
                    </div>
                  ))}
                </div>
              </>
            )}
          </main>

          <aside className="blog-sidebar">
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
              <Link href="/tools/cv-maker/" className="btn btn-secondary btn-full">
                Create CV Now
              </Link>
            </div>

            <div className="card">
              <h3 style={{ fontSize: '1.125rem', marginBottom: 'var(--space-md)' }}>Before You Apply</h3>
              <div style={{ display: 'grid', gap: '14px' }}>
                {jobResourceLinks.map((link) => (
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

            <div className="card">
              <AdSlot slot={jobSidebarAdSlot} minHeight={320} />
            </div>
          </aside>
        </div>
      </section>
    </>
  );
}
