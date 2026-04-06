import Link from 'next/link';
import {
  FiArrowRight,
  FiCalendar,
  FiClock,
  FiFileText,
  FiMapPin,
  FiRepeat,
  FiSearch,
  FiTool,
} from 'react-icons/fi';
import { COUNTRIES, JOB_TYPES } from '@/lib/constants';
import { formatDisplayDate } from '@/lib/format';
import { getArticles, getJobs } from '@/lib/content';

export const revalidate = 300;

function getWalkInLabel(summary?: string, date?: string, time?: string): string {
  if (summary) {
    return summary;
  }
  return [date ? formatDisplayDate(date) : '', time].filter(Boolean).join(' | ') || 'Walk-in details available on the listing page';
}

export default async function HomePage() {
  const [latestArticles, latestJobs, walkInJobs] = await Promise.all([
    getArticles({ limit: 3, status: 'published' }),
    getJobs({ limit: 3 }),
    getJobs({ limit: 2, walkIn: true, sort: 'walk-in' }),
  ]);
  const toolCards = [
    {
      href: '/tools/gratuity-calculator',
      icon: <FiTool />,
      title: 'Gratuity Calculator',
      description:
        'Instantly estimate your end-of-service gratuity using a UAE-focused calculator with a downloadable breakdown.',
      cta: 'Calculate Now',
    },
    {
      href: '/tools/cv-maker',
      icon: <FiFileText />,
      title: 'CV Builder',
      description:
        'Build a Gulf-ready resume, enhance your experience bullets, choose a template, and export it as a polished PDF.',
      cta: 'Create My CV',
    },
    {
      href: '/tools/currency-converter',
      icon: <FiRepeat />,
      title: 'Currency Converter',
      description:
        'Check the latest market reference for popular Gulf remittance corridors like AED to INR, SAR to PHP, and QAR to NPR.',
      cta: 'Check Rates',
    },
  ];

  return (
    <>
      <section className="hero-modern">
        <div className="hero-gradient-blob"></div>
        <div className="hero-gradient-blob-2"></div>

        <div className="container hero-content-modern">
          <h1 className="hero-title-modern" style={{ fontSize: 'clamp(2.4rem, 8vw, 3.5rem)', marginBottom: '1.25rem' }}>
            Find Your <span style={{ color: 'var(--accent)' }}>Future</span> in the Gulf.
          </h1>
          <p
            style={{
              fontSize: '1.25rem',
              color: 'var(--text-secondary)',
              marginBottom: '3rem',
              maxWidth: '700px',
              lineHeight: '1.6',
            }}
          >
            Curated jobs, walk-in interviews, and practical career tools built for UAE job seekers.
          </p>

          <form className="search-pill-modern" action="/jobs/" method="get">
            <div className="search-input-wrapper">
              <FiSearch
                style={{
                  color: 'var(--text-muted)',
                  marginRight: '16px',
                  fontSize: '1.25rem',
                }}
              />
              <input type="text" name="search" placeholder="Job title, keywords, or company..." />
            </div>

            <select
              name="country"
              className="form-select"
              style={{
                width: '160px',
                border: 'none',
                background: 'transparent',
                color: 'var(--text-secondary)',
              }}
              defaultValue=""
            >
              <option value="">All countries</option>
              {COUNTRIES.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>

            <select
              name="jobType"
              className="form-select"
              style={{
                width: '160px',
                border: 'none',
                background: 'transparent',
                color: 'var(--text-secondary)',
              }}
              defaultValue=""
            >
              <option value="">All job types</option>
              {JOB_TYPES.map((jobType) => (
                <option key={jobType} value={jobType}>
                  {jobType}
                </option>
              ))}
            </select>

            <button type="submit" className="search-btn-modern">
              Search Jobs
            </button>
          </form>

          <div className="popular-jobs-modern" style={{ gap: '0.75rem' }}>
            <span className="label" style={{ fontWeight: 600, marginRight: '8px' }}>
              Quick Filters:
            </span>
            <Link
              href="/jobs/?country=UAE"
              className="badge"
              style={{
                background: 'var(--bg-alt)',
                border: '1px solid var(--border)',
                padding: '6px 16px',
                color: 'var(--text-secondary)',
                fontSize: '0.8125rem',
              }}
            >
              UAE
            </Link>
            <Link
              href="/jobs/?country=Saudi%20Arabia"
              className="badge"
              style={{
                background: 'var(--bg-alt)',
                border: '1px solid var(--border)',
                padding: '6px 16px',
                color: 'var(--text-secondary)',
                fontSize: '0.8125rem',
              }}
            >
              SAUDI
            </Link>
            <Link
              href="/jobs/walk-in/"
              className="badge"
              style={{
                background: 'var(--bg-alt)',
                border: '1px solid var(--border)',
                padding: '6px 16px',
                color: 'var(--text-secondary)',
                fontSize: '0.8125rem',
              }}
            >
              WALK-IN
            </Link>
            <Link
              href="/jobs/?jobType=Full-time"
              className="badge"
              style={{
                background: 'var(--bg-alt)',
                border: '1px solid var(--border)',
                padding: '6px 16px',
                color: 'var(--text-secondary)',
                fontSize: '0.8125rem',
              }}
            >
              FULL-TIME
            </Link>
          </div>
        </div>
      </section>

      {/* Walk-in Interviews */}
      <section className="section hp-walkin">
        <div className="container">
          <div className="hp-section-head">
            <div>
              <span className="hp-label hp-label--live">
                <span className="hp-pulse" /> This Week
              </span>
              <h2 className="hp-heading">Walk-in Interviews</h2>
            </div>
            <Link href="/jobs/walk-in/" className="hp-link">
              All walk-ins <FiArrowRight />
            </Link>
          </div>

          <div className="hp-grid hp-grid--2">
            {walkInJobs.items.map((job) => (
              <Link href={`/jobs/${job.slug}/`} key={job._id} className="hp-walkin-card">
                <div className="hp-walkin-card__top">
                  <h3 className="hp-walkin-card__title">{job.title}</h3>
                  <p className="hp-walkin-card__company">{job.companyName} &middot; {job.location.city}</p>
                </div>
                <div className="hp-walkin-card__details">
                  <span><FiCalendar /> {getWalkInLabel(job.walkInDetails?.summary, job.walkInDetails?.date, job.walkInDetails?.time)}</span>
                  {job.walkInDetails?.venue && <span><FiMapPin /> {job.walkInDetails.venue}</span>}
                </div>
                <span className="hp-walkin-card__cta">View details <FiArrowRight /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Jobs */}
      <section className="section hp-jobs">
        <div className="container">
          <div className="hp-section-head">
            <div>
              <h2 className="hp-heading">Latest Opportunities</h2>
              <p className="hp-subtext">Fresh listings from employers across the Gulf.</p>
            </div>
            <Link href="/jobs/" className="hp-link">
              Browse all jobs <FiArrowRight />
            </Link>
          </div>

          <div className="hp-grid hp-grid--3">
            {latestJobs.items.map((job) => (
              <Link href={`/jobs/${job.slug}/`} key={job._id} className="hp-job-card">
                <div className="hp-job-card__icon">{job.companyName.charAt(0)}</div>
                <div className="hp-job-card__body">
                  <h3 className="hp-job-card__title">{job.title}</h3>
                  <p className="hp-job-card__meta">{job.companyName} &middot; {job.jobType}</p>
                  <div className="hp-job-card__tags">
                    <span><FiMapPin /> {job.location.city}, {job.location.country}</span>
                    <span><FiClock /> {formatDisplayDate(job.postedDate)}</span>
                    {job.isWalkIn && <span className="hp-tag--walkin">Walk-in</span>}
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="hp-center">
            <Link href="/jobs/" className="hp-btn-primary">
              Explore all {latestJobs.pagination.total}+ jobs <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Career Insights */}
      <section className="section hp-articles">
        <div className="container">
          <div className="hp-section-head">
            <div>
              <h2 className="hp-heading">Career Insights</h2>
              <p className="hp-subtext">Practical advice for navigating the UAE job market.</p>
            </div>
            <Link href="/blog/" className="hp-link">
              All articles <FiArrowRight />
            </Link>
          </div>

          <div className="hp-grid hp-grid--3">
            {latestArticles.items.map((article) => (
              <Link href={`/blog/${article.slug}/`} key={article._id} className="hp-article-card">
                <span className="hp-article-card__cat">{article.category}</span>
                <h3 className="hp-article-card__title">{article.title}</h3>
                <div className="hp-article-card__foot">
                  <span><FiClock /> {article.readTime} min read</span>
                  <span className="hp-article-card__read">Read <FiArrowRight /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Career Tools */}
      <section className="section hp-tools">
        <div className="container">
          <div className="hp-section-head hp-section-head--center">
            <h2 className="hp-heading">Free Career Tools</h2>
            <p className="hp-subtext">Built for Gulf job seekers &mdash; gratuity calculator, CV builder, and currency converter.</p>
          </div>

          <div className="hp-grid hp-grid--3">
            {toolCards.map((tool) => (
              <Link key={tool.href} href={tool.href} className="hp-tool-card">
                <div className="hp-tool-card__icon">{tool.icon}</div>
                <h3 className="hp-tool-card__title">{tool.title}</h3>
                <p className="hp-tool-card__desc">{tool.description}</p>
                <span className="hp-tool-card__cta">{tool.cta} <FiArrowRight /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        /* ===== Homepage sections ===== */
        .hp-walkin { background: #fff; }
        .hp-jobs { background: #f9fafb; }
        .hp-articles { background: #fff; }
        .hp-tools { background: #f9fafb; }

        .hp-section-head {
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
          flex-wrap: wrap;
          gap: 12px;
          margin-bottom: 2.5rem;
        }
        .hp-section-head--center {
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .hp-heading {
          font-size: 2rem;
          font-weight: 800;
          color: var(--primary);
          letter-spacing: -0.5px;
          line-height: 1.2;
        }
        .hp-subtext {
          color: var(--text-secondary);
          font-size: 1rem;
          margin-top: 6px;
          margin-bottom: 0;
        }

        .hp-label {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: 8px;
          color: var(--text-muted);
        }
        .hp-label--live { color: #dc2626; }
        .hp-pulse {
          width: 7px; height: 7px;
          background: #dc2626;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        .hp-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-decoration: none;
          transition: color 0.15s;
        }
        .hp-link:hover { color: var(--primary); }

        .hp-center { text-align: center; margin-top: 2.5rem; }

        .hp-btn-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 14px 32px;
          background: var(--primary);
          color: #fff;
          font-weight: 600;
          font-size: 0.9375rem;
          border-radius: 10px;
          text-decoration: none;
          transition: background 0.15s, transform 0.15s;
        }
        .hp-btn-primary:hover { background: #1e293b; transform: translateY(-1px); color: #fff; }

        /* Grids */
        .hp-grid { display: grid; gap: 20px; }
        .hp-grid--2 { grid-template-columns: repeat(2, 1fr); }
        .hp-grid--3 { grid-template-columns: repeat(3, 1fr); }
        @media (max-width: 900px) {
          .hp-grid--3 { grid-template-columns: 1fr; }
          .hp-grid--2 { grid-template-columns: 1fr; }
        }

        /* Walk-in cards */
        .hp-walkin-card {
          display: flex;
          flex-direction: column;
          padding: 28px;
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 12px;
          text-decoration: none;
          color: inherit;
          transition: box-shadow 0.2s, border-color 0.2s;
        }
        .hp-walkin-card:hover {
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          border-color: rgba(0,0,0,0.14);
        }
        .hp-walkin-card__top { margin-bottom: 16px; }
        .hp-walkin-card__title {
          font-size: 1.125rem;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 4px;
          line-height: 1.35;
        }
        .hp-walkin-card__company {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin: 0;
        }
        .hp-walkin-card__details {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 0.8125rem;
          color: var(--text-secondary);
          margin-bottom: 20px;
          flex: 1;
        }
        .hp-walkin-card__details span {
          display: flex;
          align-items: flex-start;
          gap: 6px;
        }
        .hp-walkin-card__details svg { flex-shrink: 0; margin-top: 2px; color: var(--text-muted); }
        .hp-walkin-card__cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--accent);
        }

        /* Job cards */
        .hp-job-card {
          display: flex;
          gap: 16px;
          padding: 24px;
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 12px;
          text-decoration: none;
          color: inherit;
          transition: box-shadow 0.2s, border-color 0.2s;
        }
        .hp-job-card:hover {
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          border-color: rgba(0,0,0,0.14);
        }
        .hp-job-card__icon {
          width: 44px; height: 44px;
          background: var(--primary);
          color: #fff;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.125rem;
          font-weight: 800;
          flex-shrink: 0;
        }
        .hp-job-card__body { min-width: 0; }
        .hp-job-card__title {
          font-size: 1rem;
          font-weight: 700;
          color: var(--primary);
          margin-bottom: 2px;
          line-height: 1.35;
        }
        .hp-job-card__meta {
          font-size: 0.8125rem;
          color: var(--text-secondary);
          margin: 0 0 12px;
        }
        .hp-job-card__tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          font-size: 0.75rem;
          color: var(--text-muted);
        }
        .hp-job-card__tags span {
          display: inline-flex;
          align-items: center;
          gap: 4px;
        }
        .hp-tag--walkin {
          background: #ecfdf5;
          color: #059669;
          padding: 2px 8px;
          border-radius: 4px;
          font-weight: 600;
        }

        /* Article cards */
        .hp-article-card {
          display: flex;
          flex-direction: column;
          padding: 28px;
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 12px;
          text-decoration: none;
          color: inherit;
          transition: box-shadow 0.2s, border-color 0.2s;
        }
        .hp-article-card:hover {
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          border-color: rgba(0,0,0,0.14);
        }
        .hp-article-card__cat {
          font-size: 0.6875rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          color: var(--accent);
          margin-bottom: 12px;
        }
        .hp-article-card__title {
          font-size: 1.0625rem;
          font-weight: 700;
          color: var(--primary);
          line-height: 1.45;
          flex: 1;
          margin-bottom: 20px;
        }
        .hp-article-card__foot {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.75rem;
          color: var(--text-muted);
          border-top: 1px solid var(--border);
          padding-top: 14px;
        }
        .hp-article-card__foot span { display: inline-flex; align-items: center; gap: 4px; }
        .hp-article-card__read { font-weight: 600; color: var(--accent); }

        /* Tool cards */
        .hp-tool-card {
          display: flex;
          flex-direction: column;
          padding: 32px;
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 12px;
          text-decoration: none;
          color: inherit;
          transition: box-shadow 0.2s, border-color 0.2s;
        }
        .hp-tool-card:hover {
          box-shadow: 0 4px 20px rgba(0,0,0,0.06);
          border-color: rgba(0,0,0,0.14);
        }
        .hp-tool-card__icon {
          width: 48px; height: 48px;
          background: var(--accent-light);
          color: var(--accent);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.25rem;
          margin-bottom: 20px;
        }
        .hp-tool-card__title {
          font-size: 1.25rem;
          font-weight: 800;
          color: var(--primary);
          margin-bottom: 8px;
        }
        .hp-tool-card__desc {
          font-size: 0.875rem;
          color: var(--text-secondary);
          line-height: 1.65;
          flex: 1;
          margin-bottom: 20px;
        }
        .hp-tool-card__cta {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8125rem;
          font-weight: 600;
          color: var(--accent);
        }
      `}} />
    </>
  );
}
