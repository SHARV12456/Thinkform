'use client';

import { Suspense, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function AdminResetPasswordPage() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get('token') ?? '';
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setStatus('');
    setLoading(true);

    try {
      const response = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password, confirmPassword }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        setError(data.error || 'Unable to reset password.');
      } else {
        setStatus(data.message || 'Password updated successfully.');
        setTimeout(() => router.push('/admin/login'), 1500);
      }
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-off-white)', padding: '2rem' }}>
      <div style={{ maxWidth: 420, width: '100%', background: 'var(--color-white)', padding: '2.5rem 2rem', border: '1px solid var(--color-light-grey)', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>Create New Password</h1>
        <p style={{ color: 'var(--color-grey)', marginBottom: '1.5rem' }}>
          Choose a strong password with at least 12 characters, uppercase, lowercase, number, and symbol.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontWeight: 600 }}>
            New password
            <input
              type="password"
              value={password}
              onChange={event => setPassword(event.target.value)}
              className="input"
              placeholder="Enter a strong password"
              required
            />
          </label>

          <label style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontWeight: 600 }}>
            Confirm password
            <input
              type="password"
              value={confirmPassword}
              onChange={event => setConfirmPassword(event.target.value)}
              className="input"
              placeholder="Confirm your password"
              required
            />
          </label>

          {error && (
            <div style={{ padding: '0.75rem', background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626', fontSize: '0.8125rem' }}>
              {error}
            </div>
          )}

          {status && (
            <div style={{ padding: '0.75rem', background: '#ecfdf5', border: '1px solid #a7f3d0', color: '#065f46', fontSize: '0.8125rem' }}>
              {status}
            </div>
          )}

          <button type="submit" className="btn btn-primary" disabled={loading} style={{ justifyContent: 'center', width: '100%' }}>
            {loading ? 'Updating...' : 'Reset password'}
          </button>
        </form>
      </div>
    </div>
  );
}
