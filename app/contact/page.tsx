'use client';

import { useState } from 'react';
import { FiCheckCircle, FiMail, FiMessageSquare, FiSend, FiUser } from 'react-icons/fi';

const contactEndpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT?.trim() || '';
const contactEmail = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || 'hello@theuaecareer.com';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      if (contactEndpoint) {
        const response = await fetch(contactEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify(form),
        });

        if (!response.ok) {
          throw new Error('Failed to send message');
        }
      } else {
        const body = [
          `Name: ${form.name}`,
          `Email: ${form.email}`,
          '',
          form.message,
        ].join('\n');

        window.location.href = `mailto:${encodeURIComponent(contactEmail)}?subject=${encodeURIComponent(
          form.subject || 'Contact from theuaecareer.com'
        )}&body=${encodeURIComponent(body)}`;
      }

      setStatus('success');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      setStatus('error');
      setErrorMsg(error instanceof Error ? error.message : 'Failed to send message. Please try again.');
    }
  };

  return (
    <>
      <section className="hero" style={{ padding: 'var(--space-2xl) 0' }}>
        <div className="container hero-content">
          <h1>
            Contact <span>Us</span>
          </h1>
          <p>Have a question or feedback? We&apos;d love to hear from you.</p>
        </div>
      </section>

      <section className="section">
        <div className="container container-narrow">
          {status === 'success' ? (
            <div className="card" style={{ textAlign: 'center', padding: 'var(--space-3xl)' }}>
              <div style={{ fontSize: '3rem', marginBottom: 'var(--space-lg)', color: '#16A34A' }}>
                <FiCheckCircle style={{ display: 'inline-block' }} />
              </div>
              <h2>Message Sent!</h2>
              <p>Thank you for contacting us. We will get back to you within 24-48 hours.</p>
              <button className="btn btn-primary mt-lg" onClick={() => setStatus('idle')}>
                Send Another Message
              </button>
            </div>
          ) : (
            <div className="card" style={{ padding: 'var(--space-2xl)' }}>
              {status === 'error' && (
                <div
                  style={{
                    background: 'var(--danger-light)',
                    color: 'var(--danger)',
                    padding: 'var(--space-md)',
                    borderRadius: 'var(--radius-md)',
                    marginBottom: 'var(--space-lg)',
                  }}
                >
                  {errorMsg}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">
                      <FiUser style={{ marginRight: 4 }} /> Your Name *
                    </label>
                    <input
                      className="form-input"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={(event) => setForm({ ...form, name: event.target.value })}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      <FiMail style={{ marginRight: 4 }} /> Your Email *
                    </label>
                    <input
                      type="email"
                      className="form-input"
                      placeholder="john@example.com"
                      value={form.email}
                      onChange={(event) => setForm({ ...form, email: event.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Subject</label>
                  <input
                    className="form-input"
                    placeholder="What is this about?"
                    value={form.subject}
                    onChange={(event) => setForm({ ...form, subject: event.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    <FiMessageSquare style={{ marginRight: 4 }} /> Your Message *
                  </label>
                  <textarea
                    className="form-textarea"
                    rows={6}
                    placeholder="Write your message here..."
                    value={form.message}
                    onChange={(event) => setForm({ ...form, message: event.target.value })}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary btn-lg" disabled={status === 'loading'}>
                  <FiSend /> {status === 'loading' ? 'Sending...' : 'Send Message'}
                </button>
                {!contactEndpoint && (
                  <p style={{ marginTop: '12px', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    This form opens your email app so your message is sent directly to {contactEmail}.
                  </p>
                )}
              </form>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
