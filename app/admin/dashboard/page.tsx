'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  FiArrowRight,
  FiBriefcase,
  FiEye,
  FiFileText,
  FiPlus,
  FiTrendingUp,
  FiUsers,
} from 'react-icons/fi';

interface Stats {
  totalJobs: number;
  activeJobs: number;
  walkInJobs: number;
  totalArticles: number;
  publishedArticles: number;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<Stats>({
    totalJobs: 0,
    activeJobs: 0,
    walkInJobs: 0,
    totalArticles: 0,
    publishedArticles: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [jobsRes, walkInRes, articlesRes] = await Promise.all([
          fetch('/api/jobs?limit=1'),
          fetch('/api/jobs?walkIn=true&limit=1'),
          fetch('/api/articles?limit=1'),
        ]);

        const jobsData = await jobsRes.json();
        const walkInData = await walkInRes.json();
        const articlesData = await articlesRes.json();

        setStats({
          totalJobs: jobsData.pagination?.total || 0,
          activeJobs: jobsData.pagination?.total || 0,
          walkInJobs: walkInData.pagination?.total || 0,
          totalArticles: articlesData.pagination?.total || 0,
          publishedArticles: articlesData.pagination?.total || 0,
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  const statCards = [
    {
      label: 'Total Jobs',
      value: stats.totalJobs,
      note: 'Everything currently loaded into the portal.',
      icon: <FiBriefcase />,
    },
    {
      label: 'Active Jobs',
      value: stats.activeJobs,
      note: 'Listings currently visible to visitors.',
      icon: <FiEye />,
    },
    {
      label: 'Walk-In Jobs',
      value: stats.walkInJobs,
      note: 'Urgent interview posts that deserve fast refreshes.',
      icon: <FiTrendingUp />,
    },
    {
      label: 'Published Articles',
      value: stats.publishedArticles,
      note: 'Editorial pieces feeding search and trust.',
      icon: <FiFileText />,
    },
  ];

  const totalAssets = stats.activeJobs + stats.publishedArticles;

  return (
    <>
      <div className="admin-header">
        <div className="admin-header-copy">
          <span className="admin-eyebrow">Control Room</span>
          <h1>Dashboard</h1>
          <p>
            Keep the hiring inventory fresh, spotlight walk-ins quickly, and manage the content engine from one place.
          </p>
        </div>

        <div className="admin-header-actions">
          <Link href="/admin/jobs/new" className="btn btn-primary btn-sm">
            <FiPlus /> Add Job
          </Link>
          <Link href="/admin/articles/new" className="btn btn-secondary btn-sm">
            <FiPlus /> Add Article
          </Link>
        </div>
      </div>

      <div className="admin-content">
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            <section className="admin-overview-card">
              <div className="admin-overview-top">
                <div>
                  <span className="admin-eyebrow">Today&apos;s Pulse</span>
                  <h2>{totalAssets} live assets are currently powering the site.</h2>
                  <p>
                    Use this space to keep the homepage current, maintain walk-in freshness, and grow the content base that drives search traffic.
                  </p>
                </div>

                <div className="admin-header-actions">
                  <Link href="/admin/jobs" className="btn btn-secondary btn-sm">
                    Manage listings <FiArrowRight />
                  </Link>
                </div>
              </div>

              <div className="admin-overview-metrics">
                <div className="admin-overview-pill">
                  <span>Active jobs</span>
                  <strong>{stats.activeJobs}</strong>
                </div>
                <div className="admin-overview-pill">
                  <span>Walk-ins to monitor</span>
                  <strong>{stats.walkInJobs}</strong>
                </div>
                <div className="admin-overview-pill">
                  <span>Published articles</span>
                  <strong>{stats.publishedArticles}</strong>
                </div>
              </div>
            </section>

            <div className="admin-stats">
              {statCards.map((card) => (
                <div key={card.label} className="admin-stat-card">
                  <div className="admin-stat-meta">
                    <h3>{card.label}</h3>
                    <div className="admin-stat-icon">{card.icon}</div>
                  </div>
                  <div className="stat-value">{card.value}</div>
                  <p className="admin-stat-note">{card.note}</p>
                </div>
              ))}
            </div>

            <div className="admin-grid-2col">
              <section className="admin-card">
                <div className="admin-section-head">
                  <div>
                    <h2>Quick Actions</h2>
                    <p>The fastest ways to keep the portal moving.</p>
                  </div>
                </div>

                <div className="admin-action-grid">
                  <Link href="/admin/jobs/new" className="admin-action-card">
                    <div>
                      <h3>Post a new job</h3>
                      <p>Add a listing with salary, expiry, and walk-in details.</p>
                    </div>
                    <span className="admin-action-icon">
                      <FiBriefcase />
                    </span>
                  </Link>

                  <Link href="/admin/jobs/import" className="admin-action-card">
                    <div>
                      <h3>Import from CSV</h3>
                      <p>Bulk-load listings when you have a batch ready to go.</p>
                    </div>
                    <span className="admin-action-icon">
                      <FiTrendingUp />
                    </span>
                  </Link>

                  <Link href="/admin/articles/new" className="admin-action-card">
                    <div>
                      <h3>Write an article</h3>
                      <p>Publish a search-friendly guide or hiring roundup.</p>
                    </div>
                    <span className="admin-action-icon">
                      <FiFileText />
                    </span>
                  </Link>

                  <Link href="/admin/leads" className="admin-action-card">
                    <div>
                      <h3>Review audience inbox</h3>
                      <p>Check subscriber growth and recent contact messages.</p>
                    </div>
                    <span className="admin-action-icon">
                      <FiUsers />
                    </span>
                  </Link>
                </div>
              </section>

              <section className="admin-card">
                <div className="admin-section-head">
                  <div>
                    <h2>Publishing Checklist</h2>
                    <p>A simple rhythm that keeps the portal feeling alive.</p>
                  </div>
                </div>

                <ul className="admin-checklist">
                  <li>Refresh walk-in listings first so time-sensitive posts never feel stale.</li>
                  <li>Add new long-tail job pages and supporting articles in the same publishing session.</li>
                  <li>Review the audience inbox regularly to spot topics people are actually asking about.</li>
                  <li>Use the import flow for batch updates, then review formatting on the public side.</li>
                </ul>
              </section>
            </div>

            {stats.totalJobs === 0 && stats.totalArticles === 0 && (
              <div className="admin-card admin-empty-state">
                <h2 style={{ marginBottom: 'var(--space-md)' }}>This workspace is ready for its first publishing sprint.</h2>
                <p>
                  Start by seeding sample content or add your first real listing. Once jobs and articles exist, this dashboard becomes much more informative.
                </p>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  The sidebar has a sample data tool if you want a quick preview before loading real content.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
