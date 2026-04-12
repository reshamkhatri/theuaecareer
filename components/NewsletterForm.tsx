'use client';

import { useState } from 'react';
import { FiCheckCircle, FiMail } from 'react-icons/fi';

const newsletterEndpoint = process.env.NEXT_PUBLIC_NEWSLETTER_FORM_ENDPOINT?.trim() || '';
const newsletterEmail =
  process.env.NEXT_PUBLIC_NEWSLETTER_EMAIL?.trim() ||
  process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ||
  'hello@theuaecareer.com';

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
      if (newsletterEndpoint) {
        const response = await fetch(newsletterEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({ email, source }),
        });

        if (!response.ok) {
          throw new Error('Failed to subscribe');
        }
      } else {
        const subject = `Newsletter signup from ${source}`;
        const body = `Please add this email to the newsletter list:\n\n${email}`;
        window.location.href = `mailto:${encodeURIComponent(newsletterEmail)}?subject=${encodeURIComponent(
          subject
        )}&body=${encodeURIComponent(body)}`;
      }

      setStatus('success');
      setMessage(
        newsletterEndpoint
          ? 'You are subscribed.'
          : 'Your email app was opened so you can complete the signup request.'
      );
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
          aria-label="Email address"
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
      {!newsletterEndpoint && (
        <div style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
          This opens your email app so you can request newsletter signup directly.
        </div>
      )}
    </form>
  );
}
