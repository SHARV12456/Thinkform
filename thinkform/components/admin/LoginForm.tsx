'use client';
import { useState } from 'react';
import { loginAction } from '@/app/admin/actions';

export function LoginForm() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const result = await loginAction(password);
    
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
            <label className="block text-xs font-bold text-[#888] uppercase tracking-widest mb-2">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-3.5 bg-[#F5F5F3] border border-[#e8e8e5] rounded-xl text-sm font-medium focus:outline-none focus:border-[#111] transition-colors"
            />
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
