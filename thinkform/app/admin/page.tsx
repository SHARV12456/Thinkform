'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface BookingRequest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  workingOn: string;
  sessionType?: string;
  preferredDate?: string;
  status: string;
  createdAt: string;
}

interface PaginatedResponse {
  success: boolean;
  data: BookingRequest[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

const statusStyle: Record<string, string> = {
  NEW: 'bg-blue-100 text-blue-700',
  REVIEWING: 'bg-yellow-100 text-yellow-700',
  APPROVED: 'bg-green-100 text-green-700',
  SCHEDULED: 'bg-purple-100 text-purple-700',
  COMPLETED: 'bg-gray-100 text-gray-700',
  CANCELLED: 'bg-red-100 text-red-700',
  REJECTED: 'bg-red-100 text-red-700',
};

const statusColor: Record<string, string> = {
  NEW: '#e8f5e9',
  REVIEWING: '#fff3e0',
  APPROVED: '#e8f5e9',
  SCHEDULED: '#f3e5f5',
  COMPLETED: '#e8e8e5',
  CANCELLED: '#ffebee',
  REJECTED: '#ffebee',
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 0 });
  const [filters, setFilters] = useState({ status: '', search: '', page: 1 });

  useEffect(() => {
    // Check if already authenticated
    if (typeof window !== 'undefined') {
      const token = document.cookie.includes('tf_auth_token');
      if (token) {
        setAuthed(true);
        fetchBookings(1);
      }
    }
  }, []);

  const fetchBookings = async (page: number = 1) => {
    try {
      setLoading(true);
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10',
        ...(filters.status && { status: filters.status }),
        ...(filters.search && { search: filters.search }),
      });

      const response = await fetch(`/api/admin/bookings?${params}`);
      
      if (response.status === 401) {
        setAuthed(false);
        return;
      }

      if (!response.ok) throw new Error('Failed to fetch bookings');
      
      const data: PaginatedResponse = await response.json();
      setBookings(data.data);
      setPagination(data.pagination);
      setError('');
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError(`Failed to load bookings: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const login = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('/api/admin/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        setError('Incorrect password.');
        return;
      }

      setAuthed(true);
      setPassword('');
      fetchBookings(1);
    } catch {
      setError('Authentication failed. Please try again.');
    }
  };

  const logout = async () => {
    await fetch('/api/admin/auth/logout', { method: 'POST' });
    setAuthed(false);
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
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div>
            <div className="font-black text-2xl tracking-tighter">THINK<span className="font-light text-[#888]">FORM</span></div>
            <p className="text-xs font-bold text-[#888] uppercase tracking-widest mt-1">Booking Requests</p>
          </div>
          <button
            onClick={logout}
            className="text-xs font-bold text-[#888] hover:text-[#111] transition-colors"
          >
            Sign Out
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-10">
          {[
            { label: 'Total', value: pagination.total },
            { label: 'New', value: bookings.filter(b => b.status === 'NEW').length },
            { label: 'Reviewing', value: bookings.filter(b => b.status === 'REVIEWING').length },
            { label: 'Approved', value: bookings.filter(b => b.status === 'APPROVED').length },
            { label: 'Scheduled', value: bookings.filter(b => b.status === 'SCHEDULED').length },
          ].map(stat => (
            <div key={stat.label} className="bg-white border border-[#e8e8e5] rounded-2xl p-4 md:p-6">
              <div className="text-2xl md:text-3xl font-black tracking-tighter text-[#111] mb-1">{stat.value}</div>
              <div className="text-xs font-bold text-[#888] uppercase tracking-widest">{stat.label}</div>
            </div>
          ))}
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium mb-6">
            {error}
          </div>
        )}

        {/* Filters */}
        <div className="bg-white border border-[#e8e8e5] rounded-[2rem] p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#888] uppercase tracking-widest mb-2">Search</label>
              <input
                type="text"
                placeholder="Name, email, service..."
                value={filters.search}
                onChange={e => setFilters({ ...filters, search: e.target.value, page: 1 })}
                onKeyUp={() => fetchBookings(1)}
                className="w-full px-4 py-2 border border-[#e8e8e5] rounded-xl text-sm font-medium focus:outline-none focus:border-[#111] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#888] uppercase tracking-widest mb-2">Status</label>
              <select
                value={filters.status}
                onChange={e => setFilters({ ...filters, status: e.target.value, page: 1 })}
                onChangeCapture={() => fetchBookings(1)}
                className="w-full px-4 py-2 border border-[#e8e8e5] rounded-xl text-sm font-medium focus:outline-none focus:border-[#111] transition-colors"
              >
                <option value="">All Statuses</option>
                <option value="NEW">New</option>
                <option value="REVIEWING">Reviewing</option>
                <option value="APPROVED">Approved</option>
                <option value="SCHEDULED">Scheduled</option>
                <option value="COMPLETED">Completed</option>
              </select>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => { setFilters({ status: '', search: '', page: 1 }); fetchBookings(1); }}
                className="w-full px-4 py-2 bg-[#e8e8e5] text-[#111] rounded-xl text-sm font-bold hover:bg-[#ddd] transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white border border-[#e8e8e5] rounded-[2rem] overflow-hidden">
          <div className="px-8 py-6 border-b border-[#e8e8e5]">
            <h2 className="text-lg font-black tracking-tight">Booking Requests</h2>
          </div>
          
          {loading ? (
            <div className="px-8 py-12 text-center text-[#888]">Loading bookings...</div>
          ) : bookings.length === 0 ? (
            <div className="px-8 py-12 text-center text-[#888]">No booking requests yet</div>
          ) : (
            <>
              <div className="divide-y divide-[#f0f0ee]">
                {bookings.map(booking => (
                  <Link
                    key={booking.id}
                    href={`/admin/bookings/${booking.id}`}
                    className="px-8 py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#F9F9F7] transition-colors"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-black text-[#111] text-lg">{booking.name}</span>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-widest ${statusStyle[booking.status]}`}>
                          {booking.status}
                        </span>
                      </div>
                      <div className="text-xs font-bold text-[#888] uppercase tracking-widest mb-2">
                        {booking.email}
                        {booking.phone && ` · ${booking.phone}`}
                        {booking.sessionType && ` · ${booking.sessionType}`}
                      </div>
                      <p className="text-sm text-[#555] font-medium leading-relaxed max-w-2xl line-clamp-2">{booking.workingOn}</p>
                      <div className="text-xs text-[#aaa] mt-2">
                        {new Date(booking.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="shrink-0 px-5 py-2.5 bg-[#111] text-white text-sm font-bold rounded-full">
                      View Details →
                    </div>
                  </Link>
                ))}
              </div>

              {/* Pagination */}
              {pagination.pages > 1 && (
                <div className="px-8 py-6 border-t border-[#e8e8e5] flex items-center justify-center gap-4">
                  <button
                    onClick={() => { const newPage = Math.max(1, pagination.page - 1); setFilters({ ...filters, page: newPage }); fetchBookings(newPage); }}
                    disabled={pagination.page === 1}
                    className="px-4 py-2 text-sm font-bold text-[#111] hover:bg-[#e8e8e5] rounded-lg disabled:opacity-50"
                  >
                    ← Previous
                  </button>
                  <span className="text-sm text-[#888]">
                    Page {pagination.page} of {pagination.pages}
                  </span>
                  <button
                    onClick={() => { const newPage = Math.min(pagination.pages, pagination.page + 1); setFilters({ ...filters, page: newPage }); fetchBookings(newPage); }}
                    disabled={pagination.page === pagination.pages}
                    className="px-4 py-2 text-sm font-bold text-[#111] hover:bg-[#e8e8e5] rounded-lg disabled:opacity-50"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
