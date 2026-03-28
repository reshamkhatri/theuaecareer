'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { CommentRecord } from '@/lib/types';

interface CommentApiResponse {
  comments?: CommentRecord[];
  message?: string;
  comment?: CommentRecord;
}

const dateFormatter = new Intl.DateTimeFormat('en', {
  dateStyle: 'medium',
});

export default function CommentsSection({
  articleSlug,
  articleTitle,
}: {
  articleSlug: string;
  articleTitle: string;
}) {
  const [comments, setComments] = useState<CommentRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
    website: '',
  });
  const [feedback, setFeedback] = useState('');
  const endpoint = useMemo(() => `/api/comments?slug=${encodeURIComponent(articleSlug)}`, [articleSlug]);

  const loadComments = useCallback(async (signal?: AbortSignal) => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch(endpoint, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
        cache: 'no-store',
        signal,
      });

      if (!response.ok) {
        throw new Error('Comments are temporarily unavailable.');
      }

      const data = (await response.json()) as CommentApiResponse;
      setComments(Array.isArray(data.comments) ? data.comments : []);
    } catch (fetchError) {
      if (signal?.aborted) {
        return;
      }

      setError(fetchError instanceof Error ? fetchError.message : 'Comments are temporarily unavailable.');
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  }, [endpoint]);

  useEffect(() => {
    const controller = new AbortController();
    void loadComments(controller.signal);

    return () => controller.abort();
  }, [loadComments]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setFeedback('');
    setError('');

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          articleSlug,
          articleTitle,
          authorName: form.name,
          authorEmail: form.email,
          message: form.message,
          website: form.website,
          sourceUrl: window.location.href,
        }),
      });

      const data = (await response.json()) as CommentApiResponse;

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit your comment.');
      }

      setFeedback(
        data.message || 'Thanks. Your comment was submitted and will appear after moderation.'
      );
      setForm({ name: '', email: '', message: '', website: '' });

      if (data.comment) {
        setComments((current) => [...current, data.comment as CommentRecord]);
      } else {
        await loadComments();
      }
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Failed to submit your comment.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="card mt-2xl" id="comments">
      <h3 style={{ marginBottom: 'var(--space-sm)' }}>Comments</h3>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-lg)' }}>
        Join the discussion without creating an account. Share your thoughts with just your name and comment.
      </p>

      <form
        onSubmit={handleSubmit}
        style={{
          display: 'grid',
          gap: 'var(--space-md)',
          marginBottom: 'var(--space-xl)',
        }}
      >
        <div className="form-row">
          <div className="form-group">
            <label className="form-label" htmlFor={`comment-name-${articleSlug}`}>
              Name *
            </label>
            <input
              id={`comment-name-${articleSlug}`}
              className="form-input"
              value={form.name}
              onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
              placeholder="Your name"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label" htmlFor={`comment-email-${articleSlug}`}>
              Email
            </label>
            <input
              id={`comment-email-${articleSlug}`}
              type="email"
              className="form-input"
              value={form.email}
              onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))}
              placeholder="you@example.com"
            />
            <div style={{ color: 'var(--text-muted)', fontSize: '0.8125rem', marginTop: '8px' }}>
              Optional. It is not shown publicly.
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: '-9999px',
            width: '1px',
            height: '1px',
            overflow: 'hidden',
          }}
        >
          <label htmlFor={`comment-website-${articleSlug}`}>Website</label>
          <input
            id={`comment-website-${articleSlug}`}
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(event) => setForm((current) => ({ ...current, website: event.target.value }))}
          />
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label className="form-label" htmlFor={`comment-message-${articleSlug}`}>
            Comment *
          </label>
          <textarea
            id={`comment-message-${articleSlug}`}
            className="form-textarea"
            rows={5}
            value={form.message}
            onChange={(event) => setForm((current) => ({ ...current, message: event.target.value }))}
            placeholder="Share your thoughts, tips, or follow-up questions."
            required
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Submitting...' : 'Post Comment'}
          </button>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
            No signup required.
          </span>
        </div>

        {(feedback || error) && (
          <div
            aria-live="polite"
            style={{
              color: feedback ? '#166534' : 'var(--danger)',
              background: feedback ? 'var(--success-light)' : 'var(--danger-light)',
              border: `1px solid ${feedback ? 'rgba(22, 101, 52, 0.18)' : 'rgba(239, 68, 68, 0.18)'}`,
              borderRadius: 'var(--radius-md)',
              padding: '0.9rem 1rem',
              fontSize: '0.875rem',
            }}
          >
            {feedback || error}
          </div>
        )}
      </form>

      <div style={{ display: 'grid', gap: 'var(--space-lg)' }}>
        {loading ? (
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>Loading comments...</p>
        ) : comments.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
            No comments yet. Be the first to add one.
          </p>
        ) : (
          comments.map((comment) => (
            <article
              key={comment._id}
              style={{
                borderTop: '1px solid var(--border)',
                paddingTop: 'var(--space-lg)',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  gap: '12px',
                  flexWrap: 'wrap',
                  marginBottom: '10px',
                }}
              >
                <strong style={{ color: 'var(--text)' }}>{comment.authorName}</strong>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
                  {dateFormatter.format(new Date(comment.submittedAt))}
                </span>
              </div>
              <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{comment.message}</p>
            </article>
          ))
        )}
      </div>
    </div>
  );
}
