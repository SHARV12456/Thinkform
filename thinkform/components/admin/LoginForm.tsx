'use client';
import { useState } from 'react';
import Link from 'next/link';
import { loginAction } from '@/app/admin/(protected)/actions';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const result = await loginAction(email, password);
    
    if (result.success) {
      window.location.reload(); // Reload to let the server layout evaluate the cookie
    } else {
      setError(result.error || 'Login failed.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F3] flex items-center justify-center px-6">
      <div className="w-full max-w-sm bg-white border border-[#e8e8e5] rounded-[2rem] p-10 shadow-sm">
        <div className="font-black text-xl tracking-tighter mb-2">THINK<span className="font-light">FORM</span></div>
        <p className="text-xs font-bold text-[#888] uppercase tracking-widest mb-8">Secure Internal Access</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-[#888] uppercase tracking-widest mb-2">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@example.com"
              className="w-full px-4 py-3.5 bg-[#F5F5F3] border border-[#e8e8e5] rounded-xl text-sm font-medium focus:outline-none focus:border-[#111] transition-colors mb-3"
            />
            <label className="block text-xs font-bold text-[#888] uppercase tracking-widest mb-2">Password</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="w-full px-4 py-3.5 pr-12 bg-[#F5F5F3] border border-[#e8e8e5] rounded-xl text-sm font-medium focus:outline-none focus:border-[#111] transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword((value) => !value)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-bold uppercase tracking-[0.14em] text-[#666] hover:text-[#111]"
              >
                {showPassword ? 'Hide' : 'Show'}
              </button>
            </div>
            <div className="mt-3 flex justify-end">
              <Link
                href="/admin/forgot-password"
                className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#111] hover:text-[#555] transition-colors underline-offset-4 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            {error && <p className="text-red-500 text-xs mt-2 font-medium">{error}</p>}
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full py-3.5 bg-[#111] text-white rounded-xl font-bold text-sm hover:bg-[#333] transition-colors disabled:opacity-60"
          >
            {loading ? 'Verifying...' : 'Enter Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}
