'use client';
import { useState, useEffect, useRef } from 'react';
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
  paymentStatus?: string;
  paymentAmount?: string;
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

const paymentBadge: Record<string, { bg: string; text: string; label: string }> = {
  PENDING:   { bg: 'bg-gray-100',   text: 'text-gray-500',   label: 'Pending' },
  SUBMITTED: { bg: 'bg-blue-100',   text: 'text-blue-700',   label: 'Proof Sent' },
  VERIFIED:  { bg: 'bg-green-100',  text: 'text-green-700',  label: 'Verified ✓' },
  FAILED:    { bg: 'bg-red-100',    text: 'text-red-700',    label: 'Failed' },
};

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [bookings, setBookings] = useState<BookingRequest[]>([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 0 });
  const [filters, setFilters] = useState({ status: '', search: '', page: 1 });

  // QR upload state
  const qrInputRef = useRef<HTMLInputElement>(null);
  const [qrUploading, setQrUploading] = useState(false);
  const [qrExists, setQrExists] = useState(false);
  const [qrUploadMsg, setQrUploadMsg] = useState<string | null>(null);
  const [qrCacheBust, setQrCacheBust] = useState(Date.now());

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hasSession =
        document.cookie.includes('tf_auth_token') ||
        document.cookie.includes('tf_admin_session');
      if (hasSession) {
        setAuthed(true);
        fetchBookings(1);
      }
    }
    // Check if QR exists
    fetch('/api/check-qr')
      .then(res => res.json())
      .then(data => setQrExists(data.exists))
      .catch(() => setQrExists(false));
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

  const handleQrUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setQrUploading(true);
    setQrUploadMsg(null);
    try {
      const fd = new FormData();
      fd.append('qr', file);
      const res = await fetch('/api/admin/upload-qr', { method: 'POST', body: fd });
      const data = await res.json();
      if (!data.success) throw new Error(data.message);
      setQrExists(true);
      setQrCacheBust(Date.now());
      setQrUploadMsg('QR code updated successfully!');
    } catch (err: any) {
      setQrUploadMsg(err.message || 'Upload failed');
    } finally {
      setQrUploading(false);
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
                <a
                  href="mailto:hello@thinkform.studio?subject=Admin%20Password%20Reset"
                  className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#111] hover:text-[#555] transition-colors underline-offset-4 hover:underline"
                >
                  Forgot password?
                </a>
              </div>
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
        <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
          <div>
            <div className="font-black text-2xl tracking-tighter">THINK<span className="font-light text-[#888]">FORM</span></div>
            <p className="text-xs font-bold text-[#888] uppercase tracking-widest mt-1">Booking Dashboard</p>
          </div>
          <button
            onClick={logout}
            className="text-xs font-bold text-[#888] hover:text-[#111] transition-colors"
          >
            Sign Out
          </button>
        </div>

        {/* QR Code Upload Panel */}
        <div className="bg-white border border-[#e8e8e5] rounded-[2rem] p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center gap-6">
            <div className="shrink-0">
              {qrExists ? (
                <img
                  src={`/payment-qr.png?v=${qrCacheBust}`}
                  alt="Payment QR"
                  className="w-24 h-24 object-contain rounded-xl border border-[#e8e8e5]"
                />
              ) : (
                <div className="w-24 h-24 bg-[#f5f5f3] rounded-xl border-2 border-dashed border-[#e0e0dc] flex items-center justify-center">
                  <svg className="w-8 h-8 text-[#ccc]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="font-black text-[#111] tracking-tight mb-1">Payment QR Code</h3>
              <p className="text-sm text-[#888] font-medium mb-3">
                {qrExists
                  ? 'Your UPI QR code is live. Clients will see this during booking.'
                  : 'No QR code uploaded yet. Upload your UPI / bank QR so clients can pay during booking.'}
              </p>
              {qrUploadMsg && (
                <p className={`text-xs font-bold mb-2 ${qrUploadMsg.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                  {qrUploadMsg}
                </p>
              )}
              <input
                type="file"
                accept="image/*"
                ref={qrInputRef}
                onChange={handleQrUpload}
                className="hidden"
              />
              <button
                onClick={() => qrInputRef.current?.click()}
                disabled={qrUploading}
                className="px-5 py-2.5 bg-[#111] text-white rounded-xl font-bold text-sm hover:bg-[#333] transition-colors disabled:opacity-50 flex items-center gap-2"
              >
                {qrUploading ? (
                  <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />Uploading...</>
                ) : qrExists ? 'Replace QR Code' : 'Upload QR Code'}
              </button>
            </div>
          </div>
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
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <span className="font-black text-[#111] text-lg">{booking.name}</span>
                        <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-widest ${statusStyle[booking.status]}`}>
                          {booking.status}
                        </span>
                        {booking.paymentStatus && (() => {
                          const pb = paymentBadge[booking.paymentStatus] || paymentBadge.PENDING;
                          return (
                            <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-widest ${pb.bg} ${pb.text}`}>
                              {pb.label}
                            </span>
                          );
                        })()}
                      </div>
                      <div className="text-xs font-bold text-[#888] uppercase tracking-widest mb-2">
                        {booking.email}
                        {booking.phone && ` · ${booking.phone}`}
                        {booking.sessionType && ` · ${booking.sessionType}`}
                        {booking.paymentAmount && ` · ${booking.paymentAmount}`}
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
