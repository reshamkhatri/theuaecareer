'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi';

interface Article {
  _id: string;
  title: string;
  category: string;
  status: string;
  publishDate: string;
  readTime: number;
}

export default function AdminArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchArticles() {
      try {
        // Fetch all statuses
        const [pubRes, draftRes] = await Promise.all([
          fetch('/api/articles?limit=100&status=published'),
          fetch('/api/articles?limit=100&status=draft'),
        ]);
        const pubData = await pubRes.json();
        const draftData = await draftRes.json();
        setArticles([...(pubData.articles || []), ...(draftData.articles || [])]);
      } catch (error) {
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchArticles();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this article?')) return;
    try {
      await fetch(`/api/articles/${id}`, { method: 'DELETE' });
      setArticles(articles.filter((a) => a._id !== id));
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <>
      <div className="admin-header">
        <h1>Manage Articles</h1>
        <Link href="/admin/articles/new" className="btn btn-primary btn-sm">
          <FiPlus /> New Article
        </Link>
      </div>

      <div className="admin-content">
        {loading ? (
          <div className="loading-spinner"><div className="spinner"></div></div>
        ) : (
          <div className="admin-card" style={{ padding: 0, overflow: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Status</th>
                  <th>Read Time</th>
                  <th>Published</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {articles.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center', padding: 'var(--space-2xl)', color: 'var(--text-muted)' }}>
                      No articles found. Click &quot;New Article&quot; to write one.
                    </td>
                  </tr>
                ) : (
                  articles.map((article) => (
                    <tr key={article._id}>
                      <td><strong>{article.title}</strong></td>
                      <td><span className="tag">{article.category}</span></td>
                      <td>
                        <span className={`badge ${article.status === 'published' ? 'badge-success' : 'badge-warning'}`}>
                          {article.status}
                        </span>
                      </td>
                      <td>{article.readTime} min</td>
                      <td>{new Date(article.publishDate).toLocaleDateString()}</td>
                      <td>
                        <div className="data-table-actions">
                          <Link href={`/admin/articles/${article._id}/edit`} className="btn btn-ghost btn-sm">
                            <FiEdit2 />
                          </Link>
                          <button className="btn btn-ghost btn-sm" onClick={() => handleDelete(article._id)} style={{ color: 'var(--danger)' }}>
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
