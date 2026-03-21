'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { ARTICLE_CATEGORIES } from '@/lib/constants';
import { FiSave, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';

export default function EditArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState('');

  const [form, setForm] = useState({
    title: '',
    content: '',
    category: 'Career Guides',
    tags: '',
    status: 'draft',
    featuredImage: '',
    metaTitle: '',
    metaDescription: '',
  });

  useEffect(() => {
    async function fetchArticle() {
      try {
        const res = await fetch(`/api/articles/${id}`);
        const data = await res.json();
        if (data.article) {
          const a = data.article;
          setForm({
            title: a.title || '',
            content: a.content || '',
            category: a.category || 'Career Guides',
            tags: (a.tags || []).join(', '),
            status: a.status || 'draft',
            featuredImage: a.featuredImage || '',
            metaTitle: a.metaTitle || '',
            metaDescription: a.metaDescription || '',
          });
        }
      } catch (err) {
        console.error(err);
        setError('Failed to fetch article');
      } finally {
        setFetching(false);
      }
    }
    fetchArticle();
  }, [id]);

  const updateForm = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const articleData = {
        title: form.title,
        content: form.content,
        category: form.category,
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
        status: form.status,
        featuredImage: form.featuredImage,
        metaTitle: form.metaTitle || undefined,
        metaDescription: form.metaDescription || undefined,
        lastUpdatedDate: new Date(),
      };

      const res = await fetch(`/api/articles/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(articleData),
      });

      if (!res.ok) throw new Error('Failed to update article');
      router.push('/admin/articles');
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
          <Link href="/admin/articles" className="btn btn-ghost btn-sm"><FiArrowLeft /></Link>
          <h1>Edit Article</h1>
        </div>
      </div>

      <div className="admin-content">
        {error && (
          <div style={{ background: 'var(--danger-light)', color: 'var(--danger)', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-lg)' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="admin-card">
          <div className="form-group">
            <label className="form-label">Article Title *</label>
            <input className="form-input" value={form.title} onChange={(e) => updateForm('title', e.target.value)} required style={{ fontSize: '1.125rem', fontWeight: 600 }} />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="form-select" value={form.category} onChange={(e) => updateForm('category', e.target.value)}>
                {ARTICLE_CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select className="form-select" value={form.status} onChange={(e) => updateForm('status', e.target.value)}>
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="archived">Archived</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Tags (comma separated)</label>
            <input className="form-input" value={form.tags} onChange={(e) => updateForm('tags', e.target.value)} />
          </div>

          <div className="form-group">
            <label className="form-label">Featured Image URL</label>
            <input className="form-input" value={form.featuredImage} onChange={(e) => updateForm('featuredImage', e.target.value)} />
          </div>

          <div className="form-group">
            <label className="form-label">Article Content *</label>
            <textarea className="form-textarea" rows={20} value={form.content} onChange={(e) => updateForm('content', e.target.value)} required style={{ fontFamily: 'monospace', fontSize: '0.875rem' }} />
          </div>

          <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', padding: 'var(--space-lg)', marginBottom: 'var(--space-lg)', background: 'var(--bg)' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 700, marginBottom: 'var(--space-md)', color: 'var(--text-muted)', textTransform: 'uppercase' }}>SEO</h3>
            <div className="form-group">
              <label className="form-label">Meta Title</label>
              <input className="form-input" value={form.metaTitle} onChange={(e) => updateForm('metaTitle', e.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">Meta Description</label>
              <textarea className="form-textarea" rows={2} value={form.metaDescription} onChange={(e) => updateForm('metaDescription', e.target.value)} />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-lg" disabled={loading}>
            <FiSave /> {loading ? 'Saving...' : 'Update Article'}
          </button>
        </form>
      </div>
    </>
  );
}
