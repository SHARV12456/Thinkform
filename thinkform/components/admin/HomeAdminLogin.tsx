'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function HomeAdminLogin() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const res = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Login failed');
      // server sets tf_admin_session cookie; navigate to admin dashboard
      router.push('/admin');
    } catch (err: any) {
      setError(err.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="fixed right-6 bottom-6 z-50 inline-flex items-center gap-2 px-4 py-2 bg-[#111] text-white rounded-full text-sm font-semibold shadow-lg hover:shadow-xl transition-premium"
        aria-expanded={open}
      >
        ⚙ Admin Login
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={() => setOpen(false)} />
          <form onSubmit={submit} className="relative bg-white p-8 rounded-2xl w-full max-w-md mx-4 shadow-lg">
            <h3 className="text-lg font-black mb-3">Admin login</h3>
            <p className="text-sm text-[#666] mb-4">Sign in to access the admin dashboard.</p>

            <label className="block text-xs font-bold text-[#888] uppercase tracking-widest mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-[#e8e8e5] rounded-lg mb-4"
              placeholder="admin@example.com"
              required
            />

            <label className="block text-xs font-bold text-[#888] uppercase tracking-widest mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-[#e8e8e5] rounded-lg mb-4"
              placeholder="Password"
              required
            />

            {error && <div className="text-sm text-red-600 mb-3">{error}</div>}

            <div className="flex items-center justify-between gap-4">
              <button
                type="submit"
                className="inline-flex items-center px-6 py-3 bg-[#111] text-white font-bold rounded-lg hover:bg-[#333] transition-premium"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-sm text-[#666] hover:text-[#111]"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
