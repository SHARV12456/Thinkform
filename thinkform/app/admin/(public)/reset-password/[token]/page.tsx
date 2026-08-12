'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function ResetPasswordPage() {
  const router = useRouter();
  const { token } = useParams() as { token: string };
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const passwordRequirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /\d/.test(password),
    special: /[!@#$%^&*]/.test(password),
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!password || !confirmPassword) {
      setError('Both password fields are required');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 8) {
      setError('Password must be at least 8 characters');
      return;
    }

    if (!Object.values(passwordRequirements).every(Boolean)) {
      setError('Password must meet all requirements');
      return;

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f7f4ee]">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-lg border border-[#e8e3da] p-10 md:p-12 text-center">
            <div className="text-[#b66a4a] text-5xl mb-6">✓</div>
            <h2 className="text-2xl font-black text-[#171717] mb-4">Password updated</h2>
            <p className="text-[#756f68] mb-8">
              Your password has been reset successfully. Redirecting to login...
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f4ee] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg border border-[#e8e3da] p-10 md:p-12">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-2xl font-black tracking-tight mb-2">
              THINK<span className="font-light text-[#9a9186]">FORM</span>
            </h1>
            <p className="text-sm font-bold text-[#9a9186] tracking-widest uppercase">Create new password</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50/50 border border-red-200/50 text-red-700 px-4 py-3 rounded-lg text-sm font-medium">
                {error}
              </div>
            )}

            {/* New Password */}
            <div>
              <label className="block text-sm font-bold text-[#171717] mb-3">New password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-[#e8e3da] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b66a4a] focus:border-transparent text-sm bg-white"
                  placeholder="Enter new password"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-3 text-sm text-[#9a9186] hover:text-[#171717] font-medium"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-bold text-[#171717] mb-3">Confirm password</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-[#e8e3da] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#b66a4a] focus:border-transparent text-sm bg-white"
                  placeholder="Confirm new password"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-3 text-sm text-[#9a9186] hover:text-[#171717] font-medium"
                >
                  {showConfirmPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            {/* Password Requirements */}
            <div className="bg-[#faf8f5] p-4 rounded-lg border border-[#e8e3da]">
              <p className="text-xs font-bold text-[#9a9186] tracking-widest uppercase mb-3">Password requirements</p>
              <ul className="space-y-2">
                {[
                  { key: 'length', label: '8+ characters', met: passwordRequirements.length },
                  { key: 'uppercase', label: 'Uppercase letter', met: passwordRequirements.uppercase },
                  { key: 'lowercase', label: 'Lowercase letter', met: passwordRequirements.lowercase },
                  { key: 'number', label: 'Number', met: passwordRequirements.number },
                  { key: 'special', label: 'Special character (!@#$%^&*)', met: passwordRequirements.special },
                ].map((req) => (
                  <li key={req.key} className="flex items-center gap-2 text-sm">
                    <span className={`font-bold ${req.met ? 'text-[#b66a4a]' : 'text-[#d5cfc3]'}`}>
                      {req.met ? '✓' : '○'}
                    </span>
                    <span className={req.met ? 'text-[#171717] font-medium' : 'text-[#9a9186]'}>
                      {req.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !Object.values(passwordRequirements).every(Boolean)}
              className="w-full bg-[#171717] text-white py-3 rounded-lg font-bold hover:bg-[#2a2a2a] disabled:bg-[#d5cfc3] disabled:cursor-not-allowed transition-all text-sm"
            >
              {loading ? 'Resetting...' : 'Reset password'}
            </button>
          </form>

          {/* Back to Login */}
          <div className="mt-8 pt-8 border-t border-[#e8e3da] text-center">
            <p className="text-sm text-[#756f68]">
              <Link href="/admin/login" className="font-bold text-[#b66a4a] hover:text-[#171717] transition-all">
                Back to login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
