'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { FiCornerDownRight, FiHeart, FiMessageCircle, FiSend } from 'react-icons/fi';
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

function getInitials(name: string) {
  return name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

const avatarColors = ['#6366f1', '#0f766e', '#b45309', '#be185d', '#1d4ed8', '#7c3aed', '#059669'];

function getAvatarColor(name: string) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return avatarColors[Math.abs(hash) % avatarColors.length];
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
  const [apiAvailable, setApiAvailable] = useState(true);
  const endpoint = useMemo(() => `/api/comments?slug=${encodeURIComponent(articleSlug)}`, [articleSlug]);

  const loadComments = useCallback(
    async (signal?: AbortSignal) => {
      setLoading(true);
      setError('');

      try {
        const response = await fetch(endpoint, {
          method: 'GET',
          headers: { Accept: 'application/json' },
          cache: 'no-store',
          signal,
        });

        const contentType = response.headers.get('content-type') || '';
        if (!contentType.includes('application/json')) {
          // API not available (local dev or static export)
          setApiAvailable(false);
          setComments([]);
          return;
        }

        if (!response.ok) {
          throw new Error('Could not load comments.');
        }

        const data = (await response.json()) as CommentApiResponse;
        setComments(Array.isArray(data.comments) ? data.comments : []);
      } catch (fetchError) {
        if (signal?.aborted) return;
        setApiAvailable(false);
        setComments([]);
      } finally {
        if (!signal?.aborted) setLoading(false);
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
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
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
      if (!response.ok) throw new Error(data.message || 'Failed to submit your comment.');

      setFeedback(data.message || 'Thanks! Your comment is live.');
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
      await submitComment({ authorName: form.name, authorEmail: form.email, message: form.message, website: form.website });
      setForm(initialFormState);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Failed to submit your comment.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReplySubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!replyingToId) return;
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
    if (likedComments[commentId]) return;
    setError('');
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ action: 'like', commentId }),
      });
      const data = (await response.json()) as CommentApiResponse;
      if (!response.ok) throw new Error(data.message || 'Failed to like.');
      if (typeof window !== 'undefined') window.localStorage.setItem(buildLikeStorageKey(commentId), '1');
      setLikedComments((current) => ({ ...current, [commentId]: true }));
      setComments((current) =>
        current.map((c) =>
          c._id === commentId ? { ...c, likeCount: typeof data.likeCount === 'number' ? data.likeCount : (c.likeCount || 0) + 1 } : c
        )
      );
    } catch (likeError) {
      setError(likeError instanceof Error ? likeError.message : 'Failed to like.');
    }
  };

  const commentsByParent = useMemo(() => {
    return comments.reduce<Record<string, CommentRecord[]>>((acc, comment) => {
      const key = comment.parentCommentId || 'root';
      if (!acc[key]) acc[key] = [];
      acc[key].push(comment);
      return acc;
    }, {});
  }, [comments]);

  const rootComments = commentsByParent.root || [];

  const renderCommentThread = (comment: CommentRecord, depth = 0): React.ReactNode => {
    const replies = commentsByParent[comment._id] || [];
    const isReplyingHere = replyingToId === comment._id;
    const likeCount = comment.likeCount || 0;
    const color = getAvatarColor(comment.authorName);

    return (
      <div key={comment._id} className={`cmt-thread ${depth > 0 ? 'cmt-reply' : ''}`}>
        <div className="cmt-item">
          <div className="cmt-avatar" style={{ background: color }}>
            {getInitials(comment.authorName)}
          </div>
          <div className="cmt-body">
            <div className="cmt-header">
              <span className="cmt-author">{comment.authorName}</span>
              {depth > 0 && <span className="cmt-reply-badge"><FiCornerDownRight /> replied</span>}
              <span className="cmt-date">{dateFormatter.format(new Date(comment.submittedAt))}</span>
            </div>
            <p className="cmt-text">{comment.message}</p>
            <div className="cmt-actions">
              <button
                type="button"
                className={`cmt-action-btn ${likedComments[comment._id] ? 'cmt-liked' : ''}`}
                onClick={() => handleLike(comment._id)}
                disabled={Boolean(likedComments[comment._id])}
              >
                <FiHeart />
                {likedComments[comment._id] ? 'Liked' : 'Like'}
                {likeCount > 0 && <span className="cmt-like-count">{likeCount}</span>}
              </button>
              <button
                type="button"
                className="cmt-action-btn"
                onClick={() => {
                  setFeedback('');
                  setError('');
                  setReplyingToId(isReplyingHere ? '' : comment._id);
                  setReplyForm(initialFormState);
                }}
              >
                <FiMessageCircle />
                {isReplyingHere ? 'Cancel' : 'Reply'}
              </button>
            </div>

            {isReplyingHere && (
              <form onSubmit={handleReplySubmit} className="cmt-reply-form">
                <div className="cmt-form-row">
                  <input
                    className="cmt-input"
                    value={replyForm.name}
                    onChange={(e) => setReplyForm((c) => ({ ...c, name: e.target.value }))}
                    placeholder="Your name *"
                    required
                  />
                  <input
                    type="email"
                    className="cmt-input"
                    value={replyForm.email}
                    onChange={(e) => setReplyForm((c) => ({ ...c, email: e.target.value }))}
                    placeholder="Email (optional)"
                  />
                </div>
                <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
                  <input tabIndex={-1} autoComplete="off" value={replyForm.website} onChange={(e) => setReplyForm((c) => ({ ...c, website: e.target.value }))} />
                </div>
                <textarea
                  className="cmt-textarea"
                  rows={3}
                  value={replyForm.message}
                  onChange={(e) => setReplyForm((c) => ({ ...c, message: e.target.value }))}
                  placeholder={`Reply to ${comment.authorName}...`}
                  required
                />
                <button type="submit" className="cmt-submit-btn" disabled={replySubmitting}>
                  <FiSend /> {replySubmitting ? 'Sending...' : 'Post Reply'}
                </button>
              </form>
            )}
          </div>
        </div>

        {replies.length > 0 && (
          <div className="cmt-replies">
            {replies.map((reply) => renderCommentThread(reply, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <div className="cmt-section" id="comments">
        <div className="cmt-section-header">
          <div className="cmt-section-icon"><FiMessageCircle /></div>
          <div>
            <h3 className="cmt-section-title">Discussion</h3>
            <p className="cmt-section-subtitle">
              Share your experience or ask a question. No account needed.
            </p>
          </div>
        </div>

        {/* Comment form */}
        <form onSubmit={handleSubmit} className="cmt-form">
          <div className="cmt-form-row">
            <input
              className="cmt-input"
              value={form.name}
              onChange={(e) => setForm((c) => ({ ...c, name: e.target.value }))}
              placeholder="Your name *"
              required
            />
            <input
              type="email"
              className="cmt-input"
              value={form.email}
              onChange={(e) => setForm((c) => ({ ...c, email: e.target.value }))}
              placeholder="Email (optional, not shown)"
            />
          </div>
          <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: '1px', height: '1px', overflow: 'hidden' }}>
            <input tabIndex={-1} autoComplete="off" value={form.website} onChange={(e) => setForm((c) => ({ ...c, website: e.target.value }))} />
          </div>
          <textarea
            className="cmt-textarea"
            rows={4}
            value={form.message}
            onChange={(e) => setForm((c) => ({ ...c, message: e.target.value }))}
            placeholder="Share your thoughts, tips, or questions..."
            required
          />
          <div className="cmt-form-footer">
            <button type="submit" className="cmt-submit-btn" disabled={submitting || !apiAvailable}>
              <FiSend /> {submitting ? 'Posting...' : 'Post Comment'}
            </button>
          </div>
        </form>

        {/* Feedback / Error */}
        {feedback && (
          <div className="cmt-feedback cmt-feedback-success">{feedback}</div>
        )}
        {error && (
          <div className="cmt-feedback cmt-feedback-error">{error}</div>
        )}

        {/* Comments list */}
        <div className="cmt-list">
          {loading ? (
            <div className="cmt-empty">Loading comments...</div>
          ) : !apiAvailable && rootComments.length === 0 ? (
            <div className="cmt-empty">
              <FiMessageCircle className="cmt-empty-icon" />
              <p>Comments will be available once the site is deployed.</p>
              <p className="cmt-empty-hint">The comment system requires the production API to load and post comments.</p>
            </div>
          ) : rootComments.length === 0 ? (
            <div className="cmt-empty">
              <FiMessageCircle className="cmt-empty-icon" />
              <p>No comments yet. Be the first to share your thoughts.</p>
            </div>
          ) : (
            rootComments.map((comment) => renderCommentThread(comment))
          )}
        </div>
      </div>

      <style
        dangerouslySetInnerHTML={{
          __html: `
            .cmt-section {
              background: #fff;
              border: 1px solid rgba(0, 0, 0, 0.06);
              border-radius: 20px;
              padding: 36px 40px;
              margin-top: 0;
              width: 100%;
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
            }

            .cmt-section-header {
              display: flex;
              align-items: flex-start;
              gap: 14px;
              margin-bottom: 24px;
              padding-bottom: 20px;
              border-bottom: 1px solid rgba(0, 0, 0, 0.06);
            }

            .cmt-section-icon {
              width: 42px;
              height: 42px;
              border-radius: 12px;
              background: var(--accent-light, #eef2ff);
              color: var(--accent-dark, #4f46e5);
              display: flex;
              align-items: center;
              justify-content: center;
              font-size: 1.1rem;
              flex-shrink: 0;
            }

            .cmt-section-title {
              font-size: 1.2rem;
              font-weight: 800;
              margin: 0 0 2px;
            }

            .cmt-section-subtitle {
              font-size: 0.88rem;
              color: var(--text-muted);
              margin: 0;
            }

            /* Form */
            .cmt-form {
              display: grid;
              gap: 12px;
              margin-bottom: 24px;
            }

            .cmt-form-row {
              display: grid;
              grid-template-columns: 1fr 1fr;
              gap: 12px;
            }

            .cmt-input {
              width: 100%;
              padding: 12px 16px;
              border: 1.5px solid rgba(0, 0, 0, 0.08);
              border-radius: 12px;
              font-size: 0.9rem;
              background: #f8fafc;
              color: var(--text);
              outline: none;
              transition: border-color 0.15s, box-shadow 0.15s;
              font-family: inherit;
            }

            .cmt-input:focus {
              border-color: var(--accent, #6366f1);
              box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.08);
              background: #fff;
            }

            .cmt-textarea {
              width: 100%;
              padding: 14px 16px;
              border: 1.5px solid rgba(0, 0, 0, 0.08);
              border-radius: 14px;
              font-size: 0.9rem;
              background: #f8fafc;
              color: var(--text);
              outline: none;
              resize: vertical;
              min-height: 100px;
              transition: border-color 0.15s, box-shadow 0.15s;
              font-family: inherit;
              line-height: 1.6;
            }

            .cmt-textarea:focus {
              border-color: var(--accent, #6366f1);
              box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.08);
              background: #fff;
            }

            .cmt-form-footer {
              display: flex;
              align-items: center;
              gap: 12px;
            }

            .cmt-submit-btn {
              display: inline-flex;
              align-items: center;
              gap: 6px;
              padding: 10px 20px;
              border-radius: 10px;
              border: none;
              background: var(--primary, #0f172a);
              color: #fff;
              font-size: 0.88rem;
              font-weight: 600;
              cursor: pointer;
              transition: opacity 0.15s, transform 0.15s;
              font-family: inherit;
            }

            .cmt-submit-btn:hover {
              opacity: 0.9;
              transform: translateY(-1px);
            }

            .cmt-submit-btn:disabled {
              opacity: 0.5;
              cursor: not-allowed;
              transform: none;
            }

            /* Feedback */
            .cmt-feedback {
              padding: 12px 16px;
              border-radius: 12px;
              font-size: 0.88rem;
              margin-bottom: 20px;
            }

            .cmt-feedback-success {
              background: #ecfdf5;
              color: #166534;
              border: 1px solid rgba(22, 101, 52, 0.12);
            }

            .cmt-feedback-error {
              background: #fef2f2;
              color: #dc2626;
              border: 1px solid rgba(220, 38, 38, 0.12);
            }

            /* Comments list */
            .cmt-list {
              display: grid;
              gap: 0;
            }

            .cmt-empty {
              text-align: center;
              padding: 32px 16px;
              color: var(--text-muted);
              font-size: 0.92rem;
            }

            .cmt-empty p {
              margin: 0 0 4px;
            }

            .cmt-empty-icon {
              font-size: 1.8rem;
              margin-bottom: 12px;
              opacity: 0.3;
            }

            .cmt-empty-hint {
              font-size: 0.82rem;
              opacity: 0.7;
            }

            /* Comment thread */
            .cmt-thread {
              padding-top: 20px;
              border-top: 1px solid rgba(0, 0, 0, 0.06);
            }

            .cmt-thread:first-child {
              border-top: none;
              padding-top: 0;
            }

            .cmt-reply {
              margin-left: clamp(16px, 4vw, 40px);
              border-top: none;
              padding-top: 16px;
              border-left: 2px solid rgba(0, 0, 0, 0.04);
              padding-left: 16px;
            }

            .cmt-item {
              display: flex;
              gap: 14px;
            }

            .cmt-avatar {
              width: 38px;
              height: 38px;
              border-radius: 10px;
              display: flex;
              align-items: center;
              justify-content: center;
              color: #fff;
              font-size: 0.72rem;
              font-weight: 800;
              letter-spacing: 0.5px;
              flex-shrink: 0;
            }

            .cmt-body {
              flex: 1;
              min-width: 0;
            }

            .cmt-header {
              display: flex;
              align-items: baseline;
              gap: 8px;
              flex-wrap: wrap;
              margin-bottom: 6px;
            }

            .cmt-author {
              font-weight: 700;
              font-size: 0.92rem;
              color: var(--text);
            }

            .cmt-reply-badge {
              display: inline-flex;
              align-items: center;
              gap: 4px;
              font-size: 0.78rem;
              color: var(--text-muted);
              font-weight: 500;
            }

            .cmt-date {
              font-size: 0.78rem;
              color: var(--text-muted);
              margin-left: auto;
            }

            .cmt-text {
              margin: 0;
              font-size: 0.92rem;
              line-height: 1.65;
              color: var(--text-secondary);
              white-space: pre-wrap;
            }

            .cmt-actions {
              display: flex;
              align-items: center;
              gap: 4px;
              margin-top: 8px;
            }

            .cmt-action-btn {
              display: inline-flex;
              align-items: center;
              gap: 5px;
              padding: 5px 10px;
              border: none;
              background: transparent;
              color: var(--text-muted);
              font-size: 0.8rem;
              font-weight: 600;
              cursor: pointer;
              border-radius: 8px;
              transition: background 0.12s, color 0.12s;
              font-family: inherit;
            }

            .cmt-action-btn:hover {
              background: rgba(0, 0, 0, 0.04);
              color: var(--text-secondary);
            }

            .cmt-action-btn.cmt-liked {
              color: #e11d48;
            }

            .cmt-action-btn.cmt-liked:hover {
              background: rgba(225, 29, 72, 0.06);
            }

            .cmt-like-count {
              color: var(--text-muted);
              font-weight: 500;
            }

            /* Reply form inline */
            .cmt-reply-form {
              display: grid;
              gap: 10px;
              margin-top: 14px;
              padding: 16px;
              background: #f8fafc;
              border-radius: 14px;
              border: 1px solid rgba(0, 0, 0, 0.04);
            }

            .cmt-replies {
              display: grid;
              gap: 0;
            }

            @media (max-width: 640px) {
              .cmt-section {
                padding: 20px;
              }

              .cmt-form-row {
                grid-template-columns: 1fr;
              }

              .cmt-avatar {
                width: 32px;
                height: 32px;
                font-size: 0.65rem;
              }

              .cmt-reply {
                margin-left: 12px;
                padding-left: 12px;
              }
            }
          `,
        }}
      />
    </>
  );
}
