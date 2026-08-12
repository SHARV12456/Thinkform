'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [debugUrl, setDebugUrl] = useState('');
  const [debugError, setDebugError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setDebugUrl('');
    setDebugError('');

    if (!email) {
      setError('Email is required');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/admin/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok || data.success === false) {
        setError(data.error || data.message || 'If an account exists for that email, you will receive instructions shortly.');
        return;
      }

      if (data.resetUrl) {
        setDebugUrl(data.resetUrl);
      }
      if (data.emailSent === false && data.emailErrorMessage) {
        setDebugError(data.emailErrorMessage);
      }

      setSuccess(true);
    } catch (err) {
      setError('If an account exists for that email, you will receive instructions shortly.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="space-y-4">
        <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded text-sm">
          <p className="font-medium">✓ Request received</p>
          <p className="text-sm mt-2">
            If that email is registered, you’ll receive a password reset link shortly.
          </p>
        </div>
        {debugUrl && (
          <div className="bg-blue-50 border border-blue-200 text-blue-700 px-4 py-3 rounded text-sm">
            <p className="font-medium">Debug reset link</p>
            <p className="text-xs mt-1 break-all">
              <a href={debugUrl} className="underline text-blue-700" target="_blank" rel="noreferrer">
                {debugUrl}
              </a>
            </p>
          </div>
        )}
        {debugError && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded text-sm">
            <p className="font-medium">Email send error</p>
            <p className="text-xs mt-1">{debugError}</p>
          </div>
        )}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            Didn’t receive the email? Check your spam folder.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded text-sm">
          {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Email Address
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-sm"
          placeholder="admin@example.com"
          disabled={loading}
          required
        />
        <p className="text-xs text-gray-500 mt-1">
          Enter your admin email address to receive a password reset link.
        </p>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-black text-white py-2 rounded-lg font-medium hover:bg-gray-800 disabled:bg-gray-400 transition"
      >
        {loading ? 'Sending...' : 'Send Reset Link'}
      </button>

      <div className="text-center pt-4 border-t border-gray-200">
        <p className="text-sm text-gray-600">
          Know your password?{' '}
          <Link href="/admin" className="font-semibold text-black hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </form>
  );
}
