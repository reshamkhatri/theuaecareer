import Link from 'next/link';
import {
  FiArrowRight,
  FiCalendar,
  FiClock,
  FiFileText,
  FiMapPin,
  FiSearch,
  FiTool,
} from 'react-icons/fi';
import { COUNTRIES, JOB_TYPES } from '@/lib/constants';
import { formatDisplayDate, getArticles, getJobs } from '@/lib/content';

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
      label: 'Legal Toolkit',
      title: 'Gratuity Calculator',
      description:
        'Instantly estimate your end-of-service gratuity using a UAE-focused calculator with a downloadable breakdown.',
      cta: 'Calculate Now',
      accent: '#2dd4bf',
      glow: 'radial-gradient(circle at top right, rgba(45,212,191,0.22), transparent 38%)',
    },
    {
      href: '/tools/cv-maker',
      icon: <FiFileText />,
      label: 'Smart Builder',
      title: 'CV Builder',
      description:
        'Build a Gulf-ready resume, enhance your experience bullets, choose a template, and export it as a polished PDF.',
      cta: 'Create My CV',
      accent: '#818cf8',
      glow: 'radial-gradient(circle at top right, rgba(129,140,248,0.24), transparent 38%)',
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

          <form className="search-pill-modern" action="/jobs" method="get">
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
              href="/jobs?country=UAE"
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
              href="/jobs?country=Saudi%20Arabia"
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
              href="/jobs/walk-in"
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
              href="/jobs?jobType=Full-time"
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

      <section
        className="section"
        style={{
          background: 'linear-gradient(180deg, #faf5ff 0%, #f5f3ff 100%)',
          borderTop: '1px solid #e9d5ff',
          borderBottom: '1px solid #e9d5ff',
        }}
      >
        <div className="container">
          <div
            className="home-section-header"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: 'var(--space-2xl)',
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#D97706',
                  fontSize: '0.875rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  marginBottom: '8px',
                  background: '#FEF3C7',
                  padding: '4px 12px',
                  borderRadius: '100px',
                }}
              >
                <div
                  style={{
                    width: '8px',
                    height: '8px',
                    background: '#EF4444',
                    borderRadius: '50%',
                    animation: 'pulse 2s infinite',
                  }}
                ></div>
                Happening This Week
              </div>
              <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)', letterSpacing: '-0.5px' }}>
                Urgent Walk-in Interviews
              </h2>
            </div>
            <Link
              href="/jobs/walk-in"
              className="btn"
              style={{ border: '2px solid var(--primary)', color: 'var(--primary)', background: 'transparent' }}
            >
              View All Walk-ins <FiArrowRight />
            </Link>
          </div>

          <div className="home-walkin-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-xl)' }}>
            {walkInJobs.items.map((job) => (
              <div
                key={job._id}
                className="card"
                style={{ borderTop: '4px solid #EF4444', padding: 'var(--space-xl)', position: 'relative', overflow: 'hidden' }}
              >
                <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '8px' }}>{job.title}</h3>
                <div style={{ color: 'var(--text-secondary)', fontWeight: 600, marginBottom: '20px' }}>
                  {job.companyName} • {job.location.city}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px', marginBottom: '24px' }}>
                  <div
                    style={{
                      display: 'flex',
                      gap: '8px',
                      alignItems: 'flex-start',
                      fontSize: '0.9375rem',
                      color: 'var(--text)',
                    }}
                  >
                    <FiCalendar style={{ color: '#EF4444', marginTop: '2px' }} />
                    {getWalkInLabel(job.walkInDetails?.summary, job.walkInDetails?.date, job.walkInDetails?.time)}
                  </div>
                  {job.walkInDetails?.venue && (
                    <div
                      style={{
                        display: 'flex',
                        gap: '8px',
                        alignItems: 'flex-start',
                        fontSize: '0.9375rem',
                        color: 'var(--text)',
                      }}
                    >
                      <FiMapPin style={{ color: '#EF4444', marginTop: '2px' }} />
                      {job.walkInDetails.venue}
                    </div>
                  )}
                </div>
                <Link
                  href={`/jobs/${job.slug}`}
                  className="btn"
                  style={{
                    width: '100%',
                    background: '#FEF2F2',
                    color: '#EF4444',
                    border: '1px solid #FECACA',
                    display: 'flex',
                    justifyContent: 'center',
                    textDecoration: 'none',
                  }}
                >
                  See Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'linear-gradient(180deg, #eef2ff 0%, #f8fafc 100%)' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)', textAlign: 'center', marginBottom: '16px', letterSpacing: '-0.5px' }}>
            Latest Opportunities
          </h2>
          <p
            style={{
              textAlign: 'center',
              color: 'var(--text-secondary)',
              fontSize: '1.125rem',
              marginBottom: 'var(--space-3xl)',
              maxWidth: '600px',
              margin: '0 auto var(--space-3xl)',
            }}
          >
            Fresh listings from employers across the UAE, Saudi Arabia, and Qatar.
          </p>

          <div className="home-jobs-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-lg)', marginBottom: 'var(--space-2xl)' }}>
            {latestJobs.items.map((job) => (
              <div key={job._id} className="card job-card">
                {job.isWalkIn && (
                  <span className="badge badge-success" style={{ position: 'absolute', top: '24px', right: '24px' }}>
                    WALK-IN
                  </span>
                )}
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    background: 'var(--primary)',
                    color: 'white',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '1.25rem',
                    fontWeight: 800,
                    marginBottom: '16px',
                  }}
                >
                  {job.companyName.charAt(0)}
                </div>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '4px' }}>{job.title}</h3>
                <div style={{ color: 'var(--text-secondary)', marginBottom: '16px', fontWeight: 500 }}>
                  {job.companyName} • {job.jobType}
                </div>
                <div
                  style={{
                    display: 'flex',
                    gap: '16px',
                    color: 'var(--text-muted)',
                    fontSize: '0.875rem',
                    marginBottom: '24px',
                    borderBottom: '1px solid var(--border)',
                    paddingBottom: '16px',
                    flexWrap: 'wrap',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <FiMapPin /> {job.location.city}, {job.location.country}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <FiClock /> {formatDisplayDate(job.postedDate)}
                  </span>
                </div>
                <Link
                  href={`/jobs/${job.slug}`}
                  className="btn"
                  style={{
                    width: '100%',
                    background: 'transparent',
                    border: '1px solid var(--border)',
                    color: 'var(--primary)',
                    display: 'flex',
                    textDecoration: 'none',
                  }}
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center' }}>
            <Link
              href="/jobs"
              className="btn btn-primary home-primary-cta"
              style={{ padding: '16px 32px', fontSize: '1.125rem', borderRadius: '100px' }}
            >
              Explore All {latestJobs.pagination.total}+ Jobs <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <section
        className="section"
        style={{
          background: 'linear-gradient(180deg, #fff7ed 0%, #fef2f2 50%, #fdf2f8 100%)',
          borderTop: '1px solid #fce7f3',
        }}
      >
        <div className="container">
          <div
            className="home-section-header"
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              flexWrap: 'wrap',
              gap: '16px',
              marginBottom: 'var(--space-2xl)',
            }}
          >
            <div>
              <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)', letterSpacing: '-0.5px' }}>
                Career Insights & Guides
              </h2>
              <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', marginTop: '8px' }}>
                Practical advice for navigating the UAE job market.
              </p>
            </div>
            <Link href="/blog" className="btn btn-secondary">
              Read All Articles <FiArrowRight />
            </Link>
          </div>

          <div className="home-articles-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-lg)' }}>
            {latestArticles.items.map((article) => (
              <Link
                href={`/blog/${article.slug}`}
                key={article._id}
                className="card"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '0',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  transition: 'transform 0.3s',
                  border: '1px solid var(--border)',
                }}
              >
                <div style={{ height: '8px', background: 'var(--accent)' }}></div>
                <div style={{ padding: 'var(--space-xl)', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <span
                    style={{
                      fontSize: '0.75rem',
                      color: 'var(--accent)',
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      marginBottom: '12px',
                    }}
                  >
                    {article.category}
                  </span>
                  <h3 style={{ fontSize: '1.25rem', color: 'var(--primary)', marginBottom: '12px', lineHeight: 1.4, flex: 1 }}>
                    {article.title}
                  </h3>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      color: 'var(--text-muted)',
                      fontSize: '0.8125rem',
                      borderTop: '1px solid var(--border-light)',
                      paddingTop: '16px',
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <FiClock /> {article.readTime} min read
                    </span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px', color: 'var(--accent)', fontWeight: 600 }}>
                      Read Article <FiArrowRight />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ background: 'white', position: 'relative', overflow: 'hidden' }}>
        <div
          style={{
            position: 'absolute',
            top: '-10%',
            left: '-5%',
            width: '400px',
            height: '400px',
            background: 'radial-gradient(circle, rgba(8,145,178,0.05) 0%, rgba(255,255,255,0) 70%)',
            zIndex: 0,
          }}
        ></div>

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ textAlign: 'center', marginBottom: 'var(--space-3xl)' }}>
            <h2 style={{ fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '16px', letterSpacing: '-0.5px' }}>
              Free Gulf Career Tools
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '1.125rem', maxWidth: '600px', margin: '0 auto' }}>
              Stand out to employers and know your rights with tools built specifically for the UAE market.
            </p>
          </div>

          <div className="home-tools-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--space-xl)' }}>
            {toolCards.map((tool) => (
              <Link key={tool.href} href={tool.href} style={{ textDecoration: 'none' }}>
                <div
                  className="card home-tool-card"
                  style={{
                    padding: '40px',
                    background: `${tool.glow}, linear-gradient(160deg, #0f172a 0%, #13233a 55%, #18314d 100%)`,
                    color: 'white',
                    borderRadius: '28px',
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%',
                    border: '1px solid rgba(148,163,184,0.18)',
                    boxShadow: '0 24px 48px rgba(15,23,42,0.12)',
                    position: 'relative',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: 'rgba(255,255,255,0.08)',
                      color: tool.accent,
                      padding: '6px 14px',
                      borderRadius: '999px',
                      fontSize: '0.72rem',
                      fontWeight: 800,
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      marginBottom: '18px',
                      alignSelf: 'flex-start',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    {tool.label}
                  </div>
                  <div
                    style={{
                      width: '68px',
                      height: '68px',
                      background: 'rgba(255,255,255,0.08)',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '2rem',
                      marginBottom: '26px',
                      color: tool.accent,
                      boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.08)',
                    }}
                  >
                    {tool.icon}
                  </div>
                  <h3 className="home-tool-card-title" style={{ fontSize: '1.85rem', marginBottom: '12px', fontWeight: 800, color: 'white' }}>{tool.title}</h3>
                  <p
                    className="home-tool-card-copy"
                    style={{
                      color: 'rgba(226,232,240,0.82)',
                      fontSize: '1.0625rem',
                      marginBottom: '32px',
                      flex: 1,
                      lineHeight: 1.7,
                    }}
                  >
                    {tool.description}
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: tool.accent,
                      fontWeight: 700,
                      textTransform: 'uppercase',
                      letterSpacing: '1px',
                      fontSize: '0.875rem',
                    }}
                  >
                    {tool.cta} <FiArrowRight />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
