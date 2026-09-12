'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function AdminForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    setStatus('');

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      setStatus(data.message || 'If that email is registered, a reset link has been sent.');
    } catch {
      setStatus('If that email is registered, a reset link has been sent.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-off-white)', padding: '2rem' }}>
      <div style={{ maxWidth: 420, width: '100%', background: 'var(--color-white)', padding: '2.5rem 2rem', border: '1px solid var(--color-light-grey)', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>Reset Password</h1>
        <p style={{ color: 'var(--color-grey)', marginBottom: '1.5rem' }}>
          Enter the email associated with your admin account.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontWeight: 600 }}>
            Email address
            <input
              type="email"
              value={email}
              onChange={event => setEmail(event.target.value)}
              className="input"
              placeholder="name@company.com"
              required
            />
          </label>

          {status && (
            <div style={{ padding: '0.75rem', background: '#f8fafc', border: '1px solid #dbeafe', color: '#1e3a8a', fontSize: '0.8125rem' }}>
              {status}
            </div>
          )}

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ justifyContent: 'center', width: '100%' }}>
            {loading ? 'Sending...' : 'Send reset link'}
          </button>
        </form>

        <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <Link href="/admin/login" style={{ color: 'var(--color-mid-grey)', textDecoration: 'underline', fontSize: '0.8rem' }}>
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
