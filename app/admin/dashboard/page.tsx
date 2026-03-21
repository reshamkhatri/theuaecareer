'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiBriefcase, FiFileText, FiEye, FiTrendingUp, FiPlus } from 'react-icons/fi';

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

  return (
    <>
      <div className="admin-header">
        <h1>Dashboard</h1>
        <div className="flex gap-sm">
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
            <div className="admin-stats">
              <div className="admin-stat-card">
                <h3><FiBriefcase style={{ marginRight: 6 }} /> Total Jobs</h3>
                <div className="stat-value">{stats.totalJobs}</div>
              </div>
              <div className="admin-stat-card">
                <h3><FiEye style={{ marginRight: 6 }} /> Active Jobs</h3>
                <div className="stat-value">{stats.activeJobs}</div>
              </div>
              <div className="admin-stat-card">
                <h3><FiTrendingUp style={{ marginRight: 6 }} /> Walk-In Jobs</h3>
                <div className="stat-value">{stats.walkInJobs}</div>
              </div>
              <div className="admin-stat-card">
                <h3><FiFileText style={{ marginRight: 6 }} /> Published Articles</h3>
                <div className="stat-value">{stats.publishedArticles}</div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="admin-card">
              <h2 style={{ fontSize: '1.125rem', marginBottom: 'var(--space-lg)' }}>Quick Actions</h2>
              <div className="grid-2" style={{ maxWidth: 500 }}>
                <Link href="/admin/jobs/new" className="btn btn-primary">
                  <FiPlus /> Post New Job
                </Link>
                <Link href="/admin/articles/new" className="btn btn-secondary">
                  <FiPlus /> Write Article
                </Link>
                <Link href="/admin/jobs" className="btn btn-secondary">
                  <FiBriefcase /> Manage Jobs
                </Link>
                <Link href="/admin/articles" className="btn btn-secondary">
                  <FiFileText /> Manage Articles
                </Link>
              </div>
            </div>

            {/* Getting Started */}
            {stats.totalJobs === 0 && stats.totalArticles === 0 && (
              <div className="admin-card" style={{ marginTop: 'var(--space-lg)', textAlign: 'center', padding: 'var(--space-3xl)' }}>
                <h2 style={{ marginBottom: 'var(--space-md)' }}>Welcome to theuaecareer.com Admin!</h2>
                <p style={{ color: 'var(--text-muted)', marginBottom: 'var(--space-xl)' }}>
                  Your portal is ready. Start by seeding sample data or adding your first job listing.
                </p>
                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)' }}>
                  Use the <strong>Seed Sample Data</strong> button in the sidebar to populate with demo content.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
}
