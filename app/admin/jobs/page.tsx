'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';

interface Job {
  _id: string;
  title: string;
  companyName: string;
  location: { city: string; country: string };
  jobType: string;
  category: string;
  status: string;
  isWalkIn: boolean;
  postedDate: string;
  expiryDate: string;
}

export default function AdminJobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchJobs = async () => {
    try {
      const params = new URLSearchParams({ limit: '100' });
      if (search) params.set('search', search);
      const res = await fetch(`/api/jobs?${params}`);
      const data = await res.json();
      setJobs(data.jobs || []);
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchJobs(); }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job?')) return;
    try {
      await fetch(`/api/jobs/${id}`, { method: 'DELETE' });
      setJobs(jobs.filter((j) => j._id !== id));
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  const handleSearch = () => {
    setLoading(true);
    fetchJobs();
  };

  return (
    <>
      <div className="admin-header">
        <h1>Manage Jobs</h1>
        <Link href="/admin/jobs/new" className="btn btn-primary btn-sm">
          <FiPlus /> Add New Job
        </Link>
      </div>

      <div className="admin-content">
        {/* Search bar */}
        <div className="flex gap-sm mb-lg">
          <input
            className="form-input"
            placeholder="Search jobs..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            style={{ maxWidth: 400 }}
          />
          <button className="btn btn-secondary btn-sm" onClick={handleSearch}>
            <FiSearch /> Search
          </button>
        </div>

        {loading ? (
          <div className="loading-spinner"><div className="spinner"></div></div>
        ) : (
          <div className="admin-card" style={{ padding: 0, overflow: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Job Title</th>
                  <th>Company</th>
                  <th>Location</th>
                  <th>Type</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {jobs.length === 0 ? (
                  <tr>
                    <td colSpan={7} style={{ textAlign: 'center', padding: 'var(--space-2xl)', color: 'var(--text-muted)' }}>
                      No jobs found. Click &quot;Add New Job&quot; to create one.
                    </td>
                  </tr>
                ) : (
                  jobs.map((job) => (
                    <tr key={job._id}>
                      <td>
                        <strong>{job.title}</strong>
                        {job.isWalkIn && <span className="badge badge-walkin" style={{ marginLeft: 8 }}>Walk-In</span>}
                      </td>
                      <td>{job.companyName}</td>
                      <td>{job.location.city}, {job.location.country}</td>
                      <td><span className="badge badge-primary">{job.jobType}</span></td>
                      <td><span className="tag">{job.category}</span></td>
                      <td>
                        <span className={`badge ${job.status === 'active' ? 'badge-success' : 'badge-danger'}`}>
                          {job.status}
                        </span>
                      </td>
                      <td>
                        <div className="data-table-actions">
                          <Link href={`/admin/jobs/${job._id}/edit`} className="btn btn-ghost btn-sm">
                            <FiEdit2 />
                          </Link>
                          <button className="btn btn-ghost btn-sm" onClick={() => handleDelete(job._id)} style={{ color: 'var(--danger)' }}>
                            <FiTrash2 />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
