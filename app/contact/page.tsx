'use client';

import { useState } from 'react';
import { FiSend, FiMail, FiUser, FiMessageSquare } from 'react-icons/fi';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error('Failed to send message');
      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch {
      setStatus('error');
      setErrorMsg('Failed to send message. Please try again.');
    }
  };

  return (
    <>
      <section className="hero" style={{ padding: 'var(--space-2xl) 0' }}>
        <div className="container hero-content">
          <h1>Contact <span>Us</span></h1>
          <p>Have a question or feedback? We&apos;d love to hear from you.</p>
        </div>
      </section>

      <section className="section">
        <div className="container container-narrow">
          {status === 'success' ? (
            <div className="card" style={{ textAlign: 'center', padding: 'var(--space-3xl)' }}>
              <div style={{ fontSize: '3rem', marginBottom: 'var(--space-lg)' }}>✅</div>
              <h2>Message Sent!</h2>
              <p>Thank you for contacting us. We will get back to you within 24-48 hours.</p>
              <button className="btn btn-primary mt-lg" onClick={() => setStatus('idle')}>
                Send Another Message
              </button>
            </div>
          ) : (
            <div className="card" style={{ padding: 'var(--space-2xl)' }}>
              {status === 'error' && (
                <div style={{ background: 'var(--danger-light)', color: 'var(--danger)', padding: 'var(--space-md)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--space-lg)' }}>
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label"><FiUser style={{ marginRight: 4 }} /> Your Name *</label>
                    <input className="form-input" placeholder="John Doe" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                  </div>
                  <div className="form-group">
                    <label className="form-label"><FiMail style={{ marginRight: 4 }} /> Your Email *</label>
                    <input type="email" className="form-input" placeholder="john@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input className="form-input" placeholder="What is this about?" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} />
                </div>

                <div className="form-group">
                  <label className="form-label"><FiMessageSquare style={{ marginRight: 4 }} /> Your Message *</label>
                  <textarea className="form-textarea" rows={6} placeholder="Write your message here..." value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
                </div>

                <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'loading'}>
                  <FiSend /> {status === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
