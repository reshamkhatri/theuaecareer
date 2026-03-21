'use client';

import { useState } from 'react';
import { FiCheckCircle, FiMail } from 'react-icons/fi';

export default function NewsletterForm({
  source,
  buttonLabel = 'Subscribe',
  compact = false,
}: {
  source: string;
  buttonLabel?: string;
  compact?: boolean;
}) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) {
      setStatus('error');
      setMessage('Enter an email address to subscribe.');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, source }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to subscribe');
      }

      setStatus('success');
      setMessage(data.message || 'You are subscribed.');
      setEmail('');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'Failed to subscribe.');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: compact ? '10px' : '12px' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          background: 'white',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)',
          padding: compact ? '10px 12px' : '12px 14px',
          gap: '10px',
        }}
      >
        <FiMail style={{ color: 'var(--text-muted)' }} />
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          style={{
            border: 'none',
            outline: 'none',
            width: '100%',
            background: 'transparent',
            fontSize: compact ? '0.9375rem' : '1rem',
          }}
        />
      </div>
      <button className="btn btn-primary" type="submit" disabled={status === 'loading'}>
        {status === 'loading' ? 'Subscribing...' : buttonLabel}
      </button>
      {status !== 'idle' && message && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            color: status === 'success' ? '#166534' : 'var(--danger)',
            fontSize: '0.8125rem',
          }}
        >
          {status === 'success' && <FiCheckCircle />}
          <span>{message}</span>
        </div>
      )}
    </form>
  );
}
