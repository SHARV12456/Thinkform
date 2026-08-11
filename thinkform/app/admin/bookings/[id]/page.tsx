'use client';
import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

interface BookingRequest {
  id: string;
  name: string;
  email: string;
  phone?: string;
  workingOn: string;
  challenge?: string;
  figureOut?: string;
  website?: string;
  sessionType?: string;
  preferredDate?: string;
  preferredTime?: string;
  status: string;
  adminNotes?: string;
  scheduledDate?: string;
  scheduledTime?: string;
  meetingType?: string;
  meetingLink?: string;
  createdAt: string;
  updatedAt: string;
}

const STATUS_OPTIONS = ['NEW', 'REVIEWING', 'APPROVED', 'SCHEDULED', 'COMPLETED', 'CANCELLED', 'REJECTED'];

export default function BookingDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [booking, setBooking] = useState<BookingRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  
  const [form, setForm] = useState({
    status: '',
    adminNotes: '',
    scheduledDate: '',
    scheduledTime: '',
    meetingType: '',
    meetingLink: '',
  });

  useEffect(() => {
    fetchBooking();
  }, [id]);

  const fetchBooking = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/bookings/${id}`);
      
      if (response.status === 401) {
        router.push('/admin');
        return;
      }

      if (!response.ok) throw new Error('Failed to fetch booking');
      
      const data = await response.json();
      const booking = data.data;
      setBooking(booking);
      
      // Convert Date objects to ISO strings for input fields
      const scheduledDateStr = booking.scheduledDate 
        ? new Date(booking.scheduledDate).toISOString().split('T')[0] 
        : '';
      
      setForm({
        status: booking.status,
        adminNotes: booking.adminNotes || '',
        scheduledDate: scheduledDateStr,
        scheduledTime: booking.scheduledTime || '',
        meetingType: booking.meetingType || '',
        meetingLink: booking.meetingLink || '',
      });
    } catch (err) {
      console.error('Error fetching booking:', err);
      setError('Failed to load booking details');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
      
      // Convert date string to ISO DateTime if needed
      const dataToSave = {
        ...form,
        scheduledDate: form.scheduledDate ? new Date(form.scheduledDate).toISOString() : null,
      };
      
      const response = await fetch(`/api/admin/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dataToSave),
      });

      if (!response.ok) throw new Error('Failed to save');
      
      const data = await response.json();
      setBooking(data.data);
      setEditMode(false);
    } catch (err) {
      console.error('Error saving:', err);
      setError('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F3] px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center text-[#888]">Loading...</div>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-[#F5F5F3] px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <p className="text-[#888] mb-6">Booking not found</p>
            <Link href="/admin" className="px-6 py-3 bg-[#111] text-white rounded-full font-bold">
              Back to Admin
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F3] px-6 py-16">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin" className="text-sm text-[#888] hover:text-[#111] mb-4 inline-block">
            ← Back to Bookings
          </Link>
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-4xl font-black tracking-tighter text-[#111]">{booking.name}</h1>
            <span className={`px-4 py-2 rounded-full text-sm font-bold uppercase tracking-widest ${
              booking.status === 'NEW' ? 'bg-blue-100 text-blue-700' :
              booking.status === 'REVIEWING' ? 'bg-yellow-100 text-yellow-700' :
              booking.status === 'APPROVED' ? 'bg-green-100 text-green-700' :
              booking.status === 'SCHEDULED' ? 'bg-purple-100 text-purple-700' :
              booking.status === 'COMPLETED' ? 'bg-gray-100 text-gray-700' :
              'bg-red-100 text-red-700'
            }`}>
              {booking.status}
            </span>
          </div>
          <p className="text-[#888] text-sm">{booking.email}</p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-medium mb-6">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Client Information */}
            <div className="bg-white border border-[#e8e8e5] rounded-[2rem] p-8">
              <h2 className="text-lg font-black tracking-tight mb-6">Client Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-bold text-[#888] uppercase tracking-widest mb-2">Name</p>
                  <p className="text-[#111] font-medium">{booking.name}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#888] uppercase tracking-widest mb-2">Email</p>
                  <p className="text-[#111] font-medium">{booking.email}</p>
                </div>
                {booking.phone && (
                  <div>
                    <p className="text-xs font-bold text-[#888] uppercase tracking-widest mb-2">Phone</p>
                    <p className="text-[#111] font-medium">{booking.phone}</p>
                  </div>
                )}
                {booking.website && (
                  <div>
                    <p className="text-xs font-bold text-[#888] uppercase tracking-widest mb-2">Website</p>
                    <a href={booking.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-medium hover:underline">
                      {booking.website}
                    </a>
                  </div>
                )}
              </div>
            </div>

            {/* Request Information */}
            <div className="bg-white border border-[#e8e8e5] rounded-[2rem] p-8">
              <h2 className="text-lg font-black tracking-tight mb-6">Request Details</h2>
              
              {booking.sessionType && (
                <div className="mb-6">
                  <p className="text-xs font-bold text-[#888] uppercase tracking-widest mb-2">Session Type</p>
                  <p className="text-[#111] font-medium">{booking.sessionType}</p>
                </div>
              )}

              <div className="mb-6">
                <p className="text-xs font-bold text-[#888] uppercase tracking-widest mb-2">What are you working on?</p>
                <p className="text-[#111] font-medium leading-relaxed whitespace-pre-wrap">{booking.workingOn}</p>
              </div>

              {booking.challenge && (
                <div className="mb-6">
                  <p className="text-xs font-bold text-[#888] uppercase tracking-widest mb-2">Biggest Challenge</p>
                  <p className="text-[#111] font-medium leading-relaxed whitespace-pre-wrap">{booking.challenge}</p>
                </div>
              )}

              {booking.figureOut && (
                <div className="mb-6">
                  <p className="text-xs font-bold text-[#888] uppercase tracking-widest mb-2">What to Figure Out</p>
                  <p className="text-[#111] font-medium leading-relaxed whitespace-pre-wrap">{booking.figureOut}</p>
                </div>
              )}

              {booking.preferredDate && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-xs font-bold text-[#888] uppercase tracking-widest mb-2">Preferred Date</p>
                    <p className="text-[#111] font-medium">{new Date(booking.preferredDate).toLocaleDateString()}</p>
                  </div>
                  {booking.preferredTime && (
                    <div>
                      <p className="text-xs font-bold text-[#888] uppercase tracking-widest mb-2">Preferred Time</p>
                      <p className="text-[#111] font-medium">{booking.preferredTime}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Metadata */}
            <div className="bg-white border border-[#e8e8e5] rounded-[2rem] p-6">
              <h3 className="text-sm font-black tracking-tight mb-4">Metadata</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-bold text-[#888] uppercase tracking-widest mb-1">Submitted</p>
                  <p className="text-[#111] text-sm font-medium">{new Date(booking.createdAt).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#888] uppercase tracking-widest mb-1">Last Updated</p>
                  <p className="text-[#111] text-sm font-medium">{new Date(booking.updatedAt).toLocaleString()}</p>
                </div>
              </div>
            </div>

            {/* Status & Admin Notes Editor */}
            {!editMode ? (
              <div className="bg-white border border-[#e8e8e5] rounded-[2rem] p-6">
                <h3 className="text-sm font-black tracking-tight mb-4">Admin Control</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-bold text-[#888] uppercase tracking-widest mb-2">Status</p>
                    <p className="text-[#111] font-medium text-sm">{booking.status}</p>
                  </div>
                  {booking.adminNotes && (
                    <div>
                      <p className="text-xs font-bold text-[#888] uppercase tracking-widest mb-2">Admin Notes</p>
                      <p className="text-[#111] text-sm leading-relaxed whitespace-pre-wrap">{booking.adminNotes}</p>
                    </div>
                  )}
                  {booking.scheduledDate && (
                    <div>
                      <p className="text-xs font-bold text-[#888] uppercase tracking-widest mb-2">Scheduled Date</p>
                      <p className="text-[#111] text-sm">{new Date(booking.scheduledDate).toLocaleDateString()}</p>
                    </div>
                  )}
                  {booking.meetingLink && (
                    <div>
                      <p className="text-xs font-bold text-[#888] uppercase tracking-widest mb-2">Meeting Link</p>
                      <a href={booking.meetingLink} target="_blank" rel="noopener noreferrer" className="text-blue-600 text-sm hover:underline">
                        {booking.meetingLink}
                      </a>
                    </div>
                  )}
                  <button
                    onClick={() => setEditMode(true)}
                    className="w-full py-2 bg-[#111] text-white rounded-lg font-bold text-sm hover:bg-[#333] transition-colors"
                  >
                    Edit Details
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white border border-[#e8e8e5] rounded-[2rem] p-6">
                <h3 className="text-sm font-black tracking-tight mb-4">Edit Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-bold text-[#888] uppercase tracking-widest mb-2">Status</label>
                    <select
                      value={form.status}
                      onChange={e => setForm({ ...form, status: e.target.value })}
                      className="w-full px-3 py-2 border border-[#e8e8e5] rounded-lg text-sm font-medium focus:outline-none focus:border-[#111]"
                    >
                      {STATUS_OPTIONS.map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#888] uppercase tracking-widest mb-2">Admin Notes</label>
                    <textarea
                      value={form.adminNotes}
                      onChange={e => setForm({ ...form, adminNotes: e.target.value })}
                      rows={4}
                      className="w-full px-3 py-2 border border-[#e8e8e5] rounded-lg text-sm font-medium focus:outline-none focus:border-[#111] resize-none"
                      placeholder="Private notes visible only to admins"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#888] uppercase tracking-widest mb-2">Scheduled Date</label>
                    <input
                      type="date"
                      value={form.scheduledDate}
                      onChange={e => setForm({ ...form, scheduledDate: e.target.value })}
                      className="w-full px-3 py-2 border border-[#e8e8e5] rounded-lg text-sm font-medium focus:outline-none focus:border-[#111]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#888] uppercase tracking-widest mb-2">Scheduled Time</label>
                    <input
                      type="time"
                      value={form.scheduledTime}
                      onChange={e => setForm({ ...form, scheduledTime: e.target.value })}
                      className="w-full px-3 py-2 border border-[#e8e8e5] rounded-lg text-sm font-medium focus:outline-none focus:border-[#111]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#888] uppercase tracking-widest mb-2">Meeting Type</label>
                    <input
                      type="text"
                      value={form.meetingType}
                      onChange={e => setForm({ ...form, meetingType: e.target.value })}
                      placeholder="e.g., Zoom, Google Meet, Phone"
                      className="w-full px-3 py-2 border border-[#e8e8e5] rounded-lg text-sm font-medium focus:outline-none focus:border-[#111]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#888] uppercase tracking-widest mb-2">Meeting Link</label>
                    <input
                      type="url"
                      value={form.meetingLink}
                      onChange={e => setForm({ ...form, meetingLink: e.target.value })}
                      placeholder="https://zoom.us/..."
                      className="w-full px-3 py-2 border border-[#e8e8e5] rounded-lg text-sm font-medium focus:outline-none focus:border-[#111]"
                    />
                  </div>

                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleSave}
                      disabled={saving}
                      className="flex-1 py-2 bg-[#111] text-white rounded-lg font-bold text-sm hover:bg-[#333] transition-colors disabled:opacity-50"
                    >
                      {saving ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={() => setEditMode(false)}
                      className="flex-1 py-2 bg-[#e8e8e5] text-[#111] rounded-lg font-bold text-sm hover:bg-[#ddd] transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
