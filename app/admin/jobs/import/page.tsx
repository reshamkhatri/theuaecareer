'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiArrowLeft, FiUpload } from 'react-icons/fi';

export default function ImportJobsPage() {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!file) {
      setStatus('error');
      setMessage('Choose a CSV file before importing.');
      return;
    }

    setStatus('loading');
    setMessage('');
    setErrors([]);

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/jobs/import', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to import jobs.');
      }

      setStatus('success');
      setMessage(`Imported ${data.imported} jobs. ${data.failed} rows failed.`);
      setErrors(data.errors || []);
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Failed to import jobs.');
    }
  };

  return (
    <>
      <div className="admin-header">
        <div className="admin-header-copy">
          <span className="admin-eyebrow">Bulk Upload</span>
          <div className="flex gap-md" style={{ alignItems: 'center', flexWrap: 'wrap' }}>
            <Link href="/admin/jobs" className="btn btn-ghost btn-sm">
              <FiArrowLeft />
            </Link>
            <h1>Import Jobs from CSV</h1>
          </div>
          <p>Bring in a batch of listings at once, then review the rows that need manual cleanup.</p>
        </div>
      </div>

      <div className="admin-content">
        <div className="admin-card" style={{ maxWidth: '900px' }}>
          <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-lg)' }}>
            Upload a CSV with the columns below. Missing optional fields will use sensible defaults.
          </p>

          <div
            style={{
              background: 'var(--bg-alt)',
              borderRadius: 'var(--radius-md)',
              padding: 'var(--space-lg)',
              marginBottom: 'var(--space-lg)',
              overflowX: 'auto',
              fontFamily: 'monospace',
              fontSize: '0.875rem',
            }}
          >
            title,companyName,city,country,jobType,salaryMin,salaryMax,currency,experienceRequired,category,description,howToApply,expiryDate,isWalkIn,walkInDate,walkInTime,walkInVenue
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">CSV File</label>
              <input
                type="file"
                accept=".csv,text/csv"
                className="form-input"
                onChange={(event) => setFile(event.target.files?.[0] || null)}
              />
            </div>

            <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'loading'}>
              <FiUpload /> {status === 'loading' ? 'Importing...' : 'Import Jobs'}
            </button>
          </form>

          {status !== 'idle' && (
            <div
              style={{
                marginTop: 'var(--space-lg)',
                padding: 'var(--space-md)',
                borderRadius: 'var(--radius-md)',
                background: status === 'success' ? '#ECFDF5' : '#FEF2F2',
                color: status === 'success' ? '#166534' : '#991B1B',
              }}
            >
              {message}
            </div>
          )}

          {errors.length > 0 && (
            <div className="admin-card" style={{ marginTop: 'var(--space-lg)', background: '#FFF7ED' }}>
              <h2 style={{ fontSize: '1rem', marginBottom: 'var(--space-md)' }}>Rows that need attention</h2>
              <ul style={{ paddingLeft: '20px', display: 'grid', gap: '8px' }}>
                {errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
