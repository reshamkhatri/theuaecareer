'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import type { CommentRecord } from '@/lib/types';

interface CommentApiResponse {
  comments?: CommentRecord[];
  message?: string;
  comment?: CommentRecord;
  likeCount?: number;
}

interface CommentFormState {
  name: string;
  email: string;
  message: string;
  website: string;
}

const dateFormatter = new Intl.DateTimeFormat('en', {
  dateStyle: 'medium',
});

const initialFormState: CommentFormState = {
  name: '',
  email: '',
  message: '',
  website: '',
};

function buildLikeStorageKey(commentId: string) {
  return `theuaecareer-comment-liked:${commentId}`;
}

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
  const [feedback, setFeedback] = useState('');
  const [form, setForm] = useState<CommentFormState>(initialFormState);
  const [replyingToId, setReplyingToId] = useState('');
  const [replyForm, setReplyForm] = useState<CommentFormState>(initialFormState);
  const [replySubmitting, setReplySubmitting] = useState(false);
  const [likedComments, setLikedComments] = useState<Record<string, boolean>>({});
  const endpoint = useMemo(() => `/api/comments?slug=${encodeURIComponent(articleSlug)}`, [articleSlug]);

  const loadComments = useCallback(
    async (signal?: AbortSignal) => {
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
    },
    [endpoint]
  );

  useEffect(() => {
    const controller = new AbortController();
    void loadComments(controller.signal);

    return () => controller.abort();
  }, [loadComments]);

  useEffect(() => {
    const likedState = comments.reduce<Record<string, boolean>>((accumulator, comment) => {
      if (typeof window !== 'undefined' && window.localStorage.getItem(buildLikeStorageKey(comment._id)) === '1') {
        accumulator[comment._id] = true;
      }

      return accumulator;
    }, {});

    setLikedComments(likedState);
  }, [comments]);

  const submitComment = useCallback(
    async (payload: {
      parentCommentId?: string;
      authorName: string;
      authorEmail: string;
      message: string;
      website: string;
    }) => {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          articleSlug,
          articleTitle,
          parentCommentId: payload.parentCommentId,
          authorName: payload.authorName,
          authorEmail: payload.authorEmail,
          message: payload.message,
          website: payload.website,
          sourceUrl: window.location.href,
        }),
      });

      const data = (await response.json()) as CommentApiResponse;

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit your comment.');
      }

      setFeedback(data.message || 'Thanks. Your comment is live now.');

      if (data.comment) {
        setComments((current) => [...current, data.comment as CommentRecord]);
      } else {
        await loadComments();
      }
    },
    [articleSlug, articleTitle, loadComments]
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setFeedback('');
    setError('');

    try {
      await submitComment({
        authorName: form.name,
        authorEmail: form.email,
        message: form.message,
        website: form.website,
      });
      setForm(initialFormState);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Failed to submit your comment.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReplySubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!replyingToId) {
      return;
    }

    setReplySubmitting(true);
    setFeedback('');
    setError('');

    try {
      await submitComment({
        parentCommentId: replyingToId,
        authorName: replyForm.name,
        authorEmail: replyForm.email,
        message: replyForm.message,
        website: replyForm.website,
      });
      setReplyForm(initialFormState);
      setReplyingToId('');
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Failed to submit your reply.');
    } finally {
      setReplySubmitting(false);
    }
  };

  const handleLike = async (commentId: string) => {
    if (likedComments[commentId]) {
      return;
    }

    setError('');

    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          action: 'like',
          commentId,
        }),
      });

      const data = (await response.json()) as CommentApiResponse;

      if (!response.ok) {
        throw new Error(data.message || 'Failed to like this comment.');
      }

      if (typeof window !== 'undefined') {
        window.localStorage.setItem(buildLikeStorageKey(commentId), '1');
      }

      setLikedComments((current) => ({ ...current, [commentId]: true }));
      setComments((current) =>
        current.map((comment) =>
          comment._id === commentId
            ? { ...comment, likeCount: typeof data.likeCount === 'number' ? data.likeCount : (comment.likeCount || 0) + 1 }
            : comment
        )
      );
    } catch (likeError) {
      setError(likeError instanceof Error ? likeError.message : 'Failed to like this comment.');
    }
  };

  const commentsByParent = useMemo(() => {
    return comments.reduce<Record<string, CommentRecord[]>>((accumulator, comment) => {
      const key = comment.parentCommentId || 'root';
      if (!accumulator[key]) {
        accumulator[key] = [];
      }
      accumulator[key].push(comment);
      return accumulator;
    }, {});
  }, [comments]);

  const rootComments = commentsByParent.root || [];

  const renderCommentThread = (comment: CommentRecord, depth = 0): React.ReactNode => {
    const replies = commentsByParent[comment._id] || [];
    const isReplyingHere = replyingToId === comment._id;
    const likeCount = comment.likeCount || 0;

    return (
      <article
        key={comment._id}
        style={{
          borderTop: depth === 0 ? '1px solid var(--border)' : '1px solid rgba(148, 163, 184, 0.2)',
          paddingTop: 'var(--space-lg)',
          marginLeft: depth > 0 ? 'clamp(1rem, 3vw, 2rem)' : 0,
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
          <strong style={{ color: 'var(--text)' }}>
            {comment.authorName}
            {depth > 0 && (
              <span style={{ color: 'var(--text-muted)', fontWeight: 500, marginLeft: '8px', fontSize: '0.875rem' }}>
                replied
              </span>
            )}
          </strong>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
            {dateFormatter.format(new Date(comment.submittedAt))}
          </span>
        </div>

        <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{comment.message}</p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            flexWrap: 'wrap',
            marginTop: '12px',
          }}
        >
          <button
            type="button"
            onClick={() => handleLike(comment._id)}
            disabled={Boolean(likedComments[comment._id])}
            aria-label={likedComments[comment._id] ? `Liked comment. ${likeCount} likes.` : `Like comment. ${likeCount} likes.`}
            style={{
              border: 'none',
              background: 'transparent',
              color: likedComments[comment._id] ? 'var(--accent-dark)' : 'var(--text-secondary)',
              cursor: likedComments[comment._id] ? 'default' : 'pointer',
              padding: 0,
              fontWeight: 600,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
            }}
          >
            <span aria-hidden="true" style={{ fontSize: '1rem', lineHeight: 1 }}>
              👍
            </span>
            <span>{likedComments[comment._id] ? 'Liked' : 'Like'}</span>
            <span style={{ color: 'var(--text-muted)' }}>{likeCount > 0 ? `(${likeCount})` : ''}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setFeedback('');
              setError('');
              setReplyingToId(isReplyingHere ? '' : comment._id);
              setReplyForm(initialFormState);
            }}
            style={{
              border: 'none',
              background: 'transparent',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              padding: 0,
              fontWeight: 600,
            }}
          >
            {isReplyingHere ? 'Cancel reply' : 'Reply'}
          </button>
        </div>

        {isReplyingHere && (
          <form
            onSubmit={handleReplySubmit}
            style={{
              marginTop: 'var(--space-md)',
              display: 'grid',
              gap: '12px',
              padding: '1rem',
              borderRadius: 'var(--radius-md)',
              background: 'var(--surface-alt)',
              border: '1px solid var(--border)',
            }}
          >
            <div className="form-row">
              <div className="form-group">
                <label className="form-label" htmlFor={`reply-name-${comment._id}`}>
                  Name *
                </label>
                <input
                  id={`reply-name-${comment._id}`}
                  className="form-input"
                  value={replyForm.name}
                  onChange={(event) => setReplyForm((current) => ({ ...current, name: event.target.value }))}
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label" htmlFor={`reply-email-${comment._id}`}>
                  Email
                </label>
                <input
                  id={`reply-email-${comment._id}`}
                  type="email"
                  className="form-input"
                  value={replyForm.email}
                  onChange={(event) => setReplyForm((current) => ({ ...current, email: event.target.value }))}
                  placeholder="you@example.com"
                />
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
              <label htmlFor={`reply-website-${comment._id}`}>Website</label>
              <input
                id={`reply-website-${comment._id}`}
                tabIndex={-1}
                autoComplete="off"
                value={replyForm.website}
                onChange={(event) => setReplyForm((current) => ({ ...current, website: event.target.value }))}
              />
            </div>

            <div className="form-group" style={{ marginBottom: 0 }}>
              <label className="form-label" htmlFor={`reply-message-${comment._id}`}>
                Reply *
              </label>
              <textarea
                id={`reply-message-${comment._id}`}
                className="form-textarea"
                rows={4}
                value={replyForm.message}
                onChange={(event) => setReplyForm((current) => ({ ...current, message: event.target.value }))}
                placeholder={`Reply to ${comment.authorName}`}
                required
              />
            </div>

            <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              <button type="submit" className="btn btn-primary" disabled={replySubmitting}>
                {replySubmitting ? 'Replying...' : 'Post Reply'}
              </button>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                No signup required.
              </span>
            </div>
          </form>
        )}

        {replies.length > 0 && (
          <div style={{ display: 'grid', gap: 'var(--space-lg)', marginTop: 'var(--space-md)' }}>
            {replies.map((reply) => renderCommentThread(reply, depth + 1))}
          </div>
        )}
      </article>
    );
  };

  return (
    <div className="card mt-2xl" id="comments">
      <h3 style={{ marginBottom: 'var(--space-sm)' }}>Comments</h3>
      <p style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-lg)' }}>
        Join the discussion without creating an account. Readers can leave comments, reply to each other, and like helpful posts.
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
        ) : rootComments.length === 0 ? (
          <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
            No comments yet. Be the first to add one.
          </p>
        ) : (
          rootComments.map((comment) => renderCommentThread(comment))
        )}
      </div>
    </div>
  );
}
