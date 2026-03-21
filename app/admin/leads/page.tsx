'use client';

import { useEffect, useState } from 'react';
import { FiMail, FiMessageSquare, FiUsers } from 'react-icons/fi';

interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
}

interface Subscriber {
  _id: string;
  email: string;
  source: string;
  createdAt: string;
}

export default function AdminLeadsPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeads() {
      try {
        const [messagesResponse, subscribersResponse] = await Promise.all([
          fetch('/api/contact'),
          fetch('/api/newsletter'),
        ]);

        const [messagesData, subscribersData] = await Promise.all([
          messagesResponse.json(),
          subscribersResponse.json(),
        ]);

        setMessages(messagesData.messages || []);
        setSubscribers(subscribersData.subscribers || []);
      } catch (error) {
        console.error('Failed to load audience inbox:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchLeads();
  }, []);

  return (
    <>
      <div className="admin-header">
        <div className="admin-header-copy">
          <span className="admin-eyebrow">Audience</span>
          <h1>Audience Inbox</h1>
          <p>Track who is subscribing, what visitors are asking, and where interest is growing.</p>
        </div>
      </div>

      <div className="admin-content">
        {loading ? (
          <div className="loading-spinner">
            <div className="spinner"></div>
          </div>
        ) : (
          <>
            <div className="admin-stats">
              <div className="admin-stat-card">
                <h3>
                  <FiUsers style={{ marginRight: 6 }} /> Subscribers
                </h3>
                <div className="stat-value">{subscribers.length}</div>
              </div>
              <div className="admin-stat-card">
                <h3>
                  <FiMessageSquare style={{ marginRight: 6 }} /> Contact Messages
                </h3>
                <div className="stat-value">{messages.length}</div>
              </div>
            </div>

            <div className="admin-card" style={{ padding: 0, overflow: 'auto', marginBottom: 'var(--space-xl)' }}>
              <div style={{ padding: 'var(--space-lg)' }}>
                <h2 style={{ fontSize: '1.125rem', marginBottom: 0 }}>Recent Subscribers</h2>
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Email</th>
                    <th>Source</th>
                    <th>Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {subscribers.length === 0 ? (
                    <tr>
                      <td colSpan={3} style={{ textAlign: 'center', padding: 'var(--space-2xl)', color: 'var(--text-muted)' }}>
                        No subscribers yet.
                      </td>
                    </tr>
                  ) : (
                    subscribers.map((subscriber) => (
                      <tr key={subscriber._id}>
                        <td>
                          <FiMail style={{ marginRight: 8 }} />
                          {subscriber.email}
                        </td>
                        <td>{subscriber.source || 'site'}</td>
                        <td>{new Date(subscriber.createdAt).toLocaleString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            <div className="admin-card" style={{ padding: 0, overflow: 'auto' }}>
              <div style={{ padding: 'var(--space-lg)' }}>
                <h2 style={{ fontSize: '1.125rem', marginBottom: 0 }}>Recent Contact Messages</h2>
              </div>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Subject</th>
                    <th>Received</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.length === 0 ? (
                    <tr>
                      <td colSpan={4} style={{ textAlign: 'center', padding: 'var(--space-2xl)', color: 'var(--text-muted)' }}>
                        No contact messages yet.
                      </td>
                    </tr>
                  ) : (
                    messages.map((message) => (
                      <tr key={message._id}>
                        <td>{message.name}</td>
                        <td>{message.email}</td>
                        <td style={{ maxWidth: '280px' }}>
                          <strong>{message.subject || 'No subject'}</strong>
                          <div style={{ color: 'var(--text-muted)', fontSize: '0.8125rem', marginTop: '6px' }}>
                            {message.message}
                          </div>
                        </td>
                        <td>{new Date(message.createdAt).toLocaleString()}</td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </>
  );
}
