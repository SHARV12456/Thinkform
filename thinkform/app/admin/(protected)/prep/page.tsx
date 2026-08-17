'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Booking {
  id: string;
  name: string;
  email: string;
  sessionType?: string;
  preferredDate?: string;
  scheduledDate?: string;
  scheduledTime?: string;
  status: string;
  workingOn: string;
  createdAt: string;
}

const statusBadge: Record<string, string> = {
  APPROVED:  'bg-green-100 text-green-700',
  SCHEDULED: 'bg-purple-100 text-purple-700',
  COMPLETED: 'bg-gray-100 text-gray-600',
  NEW:       'bg-blue-100 text-blue-700',
  REVIEWING: 'bg-yellow-100 text-yellow-700',
};

export default function AdminPrepPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading]   = useState(true);
  const [filter, setFilter]     = useState<'upcoming' | 'all'>('upcoming');

  useEffect(() => {
    fetch('/api/admin/bookings?limit=100')
      .then(r => r.json())
      .then(d => {
        setBookings(d.data ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const shown = filter === 'upcoming'
    ? bookings.filter(b => ['APPROVED', 'SCHEDULED'].includes(b.status))
    : bookings;

  const displayDate = (b: Booking) => {
    const raw = b.scheduledDate || b.preferredDate;
    if (!raw) return null;
    return new Date(raw).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-white border border-[#e8e8e5] rounded-[2rem] p-8 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-[#111] mb-1">Client Prep</h1>
            <p className="text-sm text-[#888] font-medium">
              Build & send pre-session questionnaires to approved clients.
            </p>
          </div>
          <div className="flex gap-2">
            {(['upcoming', 'all'] as const).map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest transition-colors ${
                  filter === f
                    ? 'bg-[#111] text-white'
                    : 'bg-[#f5f5f3] text-[#888] hover:text-[#111]'
                }`}
              >
                {f === 'upcoming' ? 'Upcoming' : 'All Sessions'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {loading ? (
        <div className="bg-white border border-[#e8e8e5] rounded-[2rem] p-12 text-center text-[#888] text-sm font-medium">
          Loading sessions…
        </div>
      ) : shown.length === 0 ? (
        <div className="bg-white border border-[#e8e8e5] rounded-[2rem] p-12 text-center">
          <div className="text-4xl mb-4">📋</div>
          <p className="text-[#888] font-medium text-sm">
            {filter === 'upcoming'
              ? 'No approved or scheduled sessions yet. Approve a booking first.'
              : 'No bookings found.'}
          </p>
        </div>
      ) : (
        <div className="bg-white border border-[#e8e8e5] rounded-[2rem] overflow-hidden">
          <div className="px-8 py-5 border-b border-[#e8e8e5] flex items-center justify-between">
            <h2 className="text-sm font-black uppercase tracking-widest text-[#111]">Sessions</h2>
            <span className="text-xs text-[#aaa] font-medium">{shown.length} session{shown.length !== 1 ? 's' : ''}</span>
          </div>
          <div className="divide-y divide-[#f0f0ee]">
            {shown.map(b => (
              <div key={b.id} className="px-8 py-6 flex items-start justify-between gap-6 hover:bg-[#fafaf8] transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-black text-[#111] text-base">{b.name}</span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-widest ${statusBadge[b.status] ?? 'bg-gray-100 text-gray-500'}`}>
                      {b.status}
                    </span>
                  </div>
                  <div className="text-xs font-bold text-[#aaa] uppercase tracking-widest mb-2">
                    {b.email}
                    {b.sessionType && ` · ${b.sessionType}`}
                    {displayDate(b) && ` · ${displayDate(b)}`}
                    {b.scheduledTime && ` at ${b.scheduledTime}`}
                  </div>
                  <p className="text-sm text-[#666] font-medium leading-relaxed line-clamp-2 max-w-xl">{b.workingOn}</p>
                </div>
                <Link
                  href={`/admin/prep/${b.id}`}
                  className="shrink-0 px-5 py-2.5 bg-[#111] text-white text-sm font-bold rounded-full hover:bg-[#333] transition-colors whitespace-nowrap"
                >
                  Build Prep →
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Info card */}
      <div className="mt-6 bg-[#fafaf8] border border-[#e8e8e5] rounded-2xl p-6">
        <p className="text-xs font-bold text-[#888] uppercase tracking-widest mb-2">How it works</p>
        <ol className="space-y-1 text-sm text-[#666] font-medium list-decimal list-inside">
          <li>Click <strong>Build Prep</strong> on any session to open the questionnaire builder.</li>
          <li>Customise the questions for that client and save.</li>
          <li>Copy the client link and share it — they fill it out before the session.</li>
        </ol>
      </div>
    </div>
  );
}
