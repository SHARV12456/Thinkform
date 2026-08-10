'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const ADMIN_PASSWORD = 'thinkform2024';

// Mock client sessions - in real usage these would come from a DB
const mockSessions = [
  { id: 'sess_001', name: 'Arjun Mehta', email: 'arjun@example.com', sessionType: 'Idea Session', date: '2026-08-14', status: 'upcoming', idea: 'A subscription box for regional Indian snacks targeting the diaspora.' },
  { id: 'sess_002', name: 'Priya Sharma', email: 'priya@example.com', sessionType: 'Business Reset', date: '2026-08-16', status: 'upcoming', idea: 'Running a boutique yoga studio for 2 years. Growth has completely stalled.' },
  { id: 'sess_003', name: 'Karan Lal', email: 'karan@example.com', sessionType: 'Business Brainstorm', date: '2026-08-19', status: 'upcoming', idea: 'Not sure what to start. Background in finance and data analytics.' },
  { id: 'sess_004', name: 'Meera Iyer', email: 'meera@example.com', sessionType: 'Strategy Session', date: '2026-08-10', status: 'completed', idea: 'Freelance UX designer wanting to move into product strategy consulting.' },
];

const statusStyle: Record<string, string> = {
  upcoming: 'bg-[#e8f5e9] text-[#2e7d32]',
  completed: 'bg-[#e8e8e5] text-[#888]',
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (sessionStorage.getItem('tf_admin') === '1') setAuthed(true);
  }, []);

  const login = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('tf_admin', '1');
      setAuthed(true);
    } else {
      setError('Incorrect password.');
    }
  };

  if (!authed) {
    return (
      <div className="min-h-screen bg-[#F5F5F3] flex items-center justify-center px-6">
        <div className="w-full max-w-sm bg-white border border-[#e8e8e5] rounded-[2rem] p-10 shadow-sm">
          <div className="font-black text-xl tracking-tighter mb-2">THINK<span className="font-light">FORM</span></div>
          <p className="text-xs font-bold text-[#888] uppercase tracking-widest mb-8">Internal Access</p>
          <form onSubmit={login} className="space-y-4">
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
            <button type="submit" className="w-full py-3.5 bg-[#111] text-white rounded-xl font-bold text-sm hover:bg-[#333] transition-colors">
              Enter Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F3] px-6 py-16">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="font-black text-2xl tracking-tighter">THINK<span className="font-light text-[#888]">FORM</span></div>
            <p className="text-xs font-bold text-[#888] uppercase tracking-widest mt-1">Internal Dashboard</p>
          </div>
          <button
            onClick={() => { sessionStorage.removeItem('tf_admin'); setAuthed(false); }}
            className="text-xs font-bold text-[#888] hover:text-[#111] transition-colors"
          >
            Sign Out
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            { label: 'Total Sessions', value: mockSessions.length },
            { label: 'Upcoming', value: mockSessions.filter(s => s.status === 'upcoming').length },
            { label: 'Completed', value: mockSessions.filter(s => s.status === 'completed').length },
            { label: 'Pending Prep', value: mockSessions.filter(s => s.status === 'upcoming').length },
          ].map(stat => (
            <div key={stat.label} className="bg-white border border-[#e8e8e5] rounded-2xl p-6">
              <div className="text-3xl font-black tracking-tighter text-[#111] mb-1">{stat.value}</div>
              <div className="text-xs font-bold text-[#888] uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Sessions */}
        <div className="bg-white border border-[#e8e8e5] rounded-[2rem] overflow-hidden">
          <div className="px-8 py-6 border-b border-[#e8e8e5] flex items-center justify-between">
            <h2 className="text-lg font-black tracking-tight">Client Sessions</h2>
            <span className="text-xs font-bold text-[#888] uppercase tracking-widest">Prep Questionnaires</span>
          </div>
          <div className="divide-y divide-[#f0f0ee]">
            {mockSessions.map(s => (
              <div key={s.id} className="px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="font-black text-[#111] text-lg">{s.name}</span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-widest ${statusStyle[s.status]}`}>
                      {s.status}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-[#888] uppercase tracking-widest mb-2">
                    {s.sessionType} · {s.date}
                  </div>
                  <p className="text-sm text-[#555] font-medium leading-relaxed max-w-lg">{s.idea}</p>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <Link
                    href={`/admin/prep/${s.id}`}
                    className="px-5 py-2.5 bg-[#111] text-white text-sm font-bold rounded-full hover:bg-[#333] transition-colors text-center"
                  >
                    Build Questionnaire
                  </Link>
                  <Link
                    href={`/prep/${s.id}`}
                    target="_blank"
                    className="px-5 py-2.5 bg-white border border-[#e8e8e5] text-[#555] text-sm font-bold rounded-full hover:border-[#111] hover:text-[#111] transition-colors text-center"
                  >
                    Preview Client Link ↗
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
