'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { JOB_CATEGORIES, COUNTRIES, JOB_TYPES, UAE_CITIES } from '@/lib/constants';
import { FiSave, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';

export default function EditJobPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    title: '',
    companyName: '',
    city: 'Dubai',
    country: 'UAE',
    jobType: 'Full-time',
    salaryMin: '',
    salaryMax: '',
    experienceRequired: '',
    category: 'Other',
    description: '',
    howToApply: '',
    expiryDate: '',
    isWalkIn: false,
    walkInDate: '',
    walkInTime: '',
    walkInVenue: '',
    status: 'active',
  });

  useEffect(() => {
    async function fetchJob() {
      try {
        const res = await fetch(`/api/jobs/${id}`);
        const data = await res.json();
        if (data.job) {
          const j = data.job;
          setForm({
            title: j.title || '',
            companyName: j.companyName || '',
            city: j.location?.city || 'Dubai',
            country: j.location?.country || 'UAE',
            jobType: j.jobType || 'Full-time',
            salaryMin: j.salaryRange?.min?.toString() || '',
            salaryMax: j.salaryRange?.max?.toString() || '',
            experienceRequired: j.experienceRequired || '',
            category: j.category || 'Other',
            description: j.description || '',
            howToApply: j.howToApply || '',
            expiryDate: j.expiryDate ? new Date(j.expiryDate).toISOString().split('T')[0] : '',
            isWalkIn: j.isWalkIn || false,
            walkInDate: j.walkInDetails?.date ? new Date(j.walkInDetails.date).toISOString().split('T')[0] : '',
            walkInTime: j.walkInDetails?.time || '',
            walkInVenue: j.walkInDetails?.venue || '',
            status: j.status || 'active',
          });
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch job');
      } finally {
        setFetching(false);
      }
    }
    fetchJob();
  }, [id]);

  const updateForm = (field: string, value: string | boolean) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const jobData = {
        title: form.title,
        companyName: form.companyName,
        location: { city: form.city, country: form.country },
        jobType: form.jobType,
        salaryRange: form.salaryMin || form.salaryMax ? {
          min: form.salaryMin ? parseInt(form.salaryMin) : undefined,
          max: form.salaryMax ? parseInt(form.salaryMax) : undefined,
          currency: 'AED',
        } : undefined,
        experienceRequired: form.experienceRequired,
        category: form.category,
        description: form.description,
        howToApply: form.howToApply,
        expiryDate: form.expiryDate,
        isWalkIn: form.isWalkIn,
        walkInDetails: form.isWalkIn ? {
          date: form.walkInDate,
          time: form.walkInTime,
          venue: form.walkInVenue,
        } : undefined,
        status: form.status,
      };

      const res = await fetch(`/api/jobs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(jobData),
      });

      if (!res.ok) throw new Error('Failed to update job');
      router.push('/admin/jobs');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) return <div className="admin-content"><div className="loading-spinner"><div className="spinner"></div></div></div>;

  return (
    <>
      <div className="admin-header">
        <div className="flex gap-md" style={{ alignItems: 'center' }}>
          <Link href="/admin/jobs" className="btn btn-ghost btn-sm"><FiArrowLeft /></Link>
          <h1>Edit Job</h1>
        </div>
      </div>

      <div className="admin-content">
        {error && (
          <div style={{ background: 'var(--danger-light)', color: 'var(--danger)', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-lg)' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-card">
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Job Title *</label>
              <input className="form-input" value={form.title} onChange={(e) => updateForm('title', e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">Company Name</label>
              <input className="form-input" value={form.companyName} onChange={(e) => updateForm('companyName', e.target.value)} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">City</label>
              <select className="form-select" value={form.city} onChange={(e) => updateForm('city', e.target.value)}>
                {UAE_CITIES.map((c) => <option key={c} value={c}>{c}</option>)}
                <option value="Riyadh">Riyadh</option>
                <option value="Jeddah">Jeddah</option>
                <option value="Doha">Doha</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Country</label>
              <select className="form-select" value={form.country} onChange={(e) => updateForm('country', e.target.value)}>
                {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Job Type</label>
              <select className="form-select" value={form.jobType} onChange={(e) => updateForm('jobType', e.target.value)}>
                {JOB_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="form-select" value={form.category} onChange={(e) => updateForm('category', e.target.value)}>
                {JOB_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Min Salary (AED)</label>
              <input className="form-input" type="number" value={form.salaryMin} onChange={(e) => updateForm('salaryMin', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Max Salary (AED)</label>
              <input className="form-input" type="number" value={form.salaryMax} onChange={(e) => updateForm('salaryMax', e.target.value)} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Experience Required</label>
              <input className="form-input" value={form.experienceRequired} onChange={(e) => updateForm('experienceRequired', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Expiry Date</label>
              <input className="form-input" type="date" value={form.expiryDate} onChange={(e) => updateForm('expiryDate', e.target.value)} />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Status</label>
              <select className="form-select" value={form.status} onChange={(e) => updateForm('status', e.target.value)}>
                <option value="active">Active</option>
                <option value="expired">Expired</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Job Description *</label>
            <textarea className="form-textarea" rows={8} value={form.description} onChange={(e) => updateForm('description', e.target.value)} required />
          </div>

          <div className="form-group">
            <label className="form-label">How to Apply *</label>
            <textarea className="form-textarea" rows={3} value={form.howToApply} onChange={(e) => updateForm('howToApply', e.target.value)} required />
          </div>

          {/* Walk-In Section */}
          <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-lg)', marginBottom: 'var(--space-lg)', background: form.isWalkIn ? 'var(--success-light)' : 'var(--bg)' }}>
            <label className="form-checkbox" style={{ marginBottom: 'var(--space-md)' }}>
              <input type="checkbox" checked={form.isWalkIn} onChange={(e) => updateForm('isWalkIn', e.target.checked)} />
              <strong>Walk-In Interview</strong>
            </label>
            {form.isWalkIn && (
              <div className="form-row" style={{ marginTop: 'var(--space-md)' }}>
                <div className="form-group">
                  <label className="form-label">Walk-In Date</label>
                  <input className="form-input" type="date" value={form.walkInDate} onChange={(e) => updateForm('walkInDate', e.target.value)} />
                </div>
                <div className="form-group">
                  <label className="form-label">Walk-In Time</label>
                  <input className="form-input" value={form.walkInTime} onChange={(e) => updateForm('walkInTime', e.target.value)} />
                </div>
                <div className="form-group" style={{ gridColumn: '1 / -1' }}>
                  <label className="form-label">Venue</label>
                  <input className="form-input" value={form.walkInVenue} onChange={(e) => updateForm('walkInVenue', e.target.value)} />
                </div>
              </div>
            )}
          </div>

          <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
            <FiSave /> {loading ? 'Saving...' : 'Update Job'}
          </button>
        </form>
      </div>
    </>
  );
}
