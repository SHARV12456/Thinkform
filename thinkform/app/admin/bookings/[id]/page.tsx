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
  paymentStatus?: string;
  paymentProofUrl?: string;
  paymentAmount?: string;
  createdAt: string;
  updatedAt: string;
}

const STATUS_OPTIONS = ['NEW', 'REVIEWING', 'APPROVED', 'SCHEDULED', 'COMPLETED', 'CANCELLED', 'REJECTED'];

const paymentBadge: Record<string, { bg: string; text: string; label: string }> = {
  PENDING:   { bg: 'bg-gray-100',   text: 'text-gray-600',   label: 'Pending' },
  SUBMITTED: { bg: 'bg-blue-100',   text: 'text-blue-700',   label: 'Proof Submitted' },
  VERIFIED:  { bg: 'bg-green-100',  text: 'text-green-700',  label: 'Payment Verified ✓' },
  FAILED:    { bg: 'bg-red-100',    text: 'text-red-700',    label: 'Payment Failed' },
};

export default function BookingDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [booking, setBooking] = useState<BookingRequest | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [proofZoomed, setProofZoomed] = useState(false);

  const [form, setForm] = useState({
    status: '',
    adminNotes: '',
    scheduledDate: '',
    scheduledTime: '',
    meetingType: '',
    meetingLink: '',
  });

  useEffect(() => { fetchBooking(); }, [id]);

  const fetchBooking = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/admin/bookings/${id}`);
      if (response.status === 401) { router.push('/admin'); return; }
      if (!response.ok) throw new Error('Failed to fetch booking');
      const data = await response.json();
      const b = data.data;
      setBooking(b);
      const scheduledDateStr = b.scheduledDate
        ? new Date(b.scheduledDate).toISOString().split('T')[0] : '';
      setForm({
        status: b.status,
        adminNotes: b.adminNotes || '',
        scheduledDate: scheduledDateStr,
        scheduledTime: b.scheduledTime || '',
        meetingType: b.meetingType || '',
        meetingLink: b.meetingLink || '',
      });
    } catch (err) {
      setError('Failed to load booking details');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError(null);
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
      setError('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  const updatePaymentStatus = async (status: 'VERIFIED' | 'FAILED' | 'PENDING') => {
    try {
      setVerifying(true);
      setError(null);
      const response = await fetch(`/api/admin/bookings/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paymentStatus: status }),
      });
      if (!response.ok) throw new Error('Failed to update payment status');
      const data = await response.json();
      setBooking(data.data);
    } catch (err) {
      setError('Failed to update payment status');
    } finally {
      setVerifying(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F3] px-6 py-16">
        <div className="max-w-4xl mx-auto text-center text-[#888]">Loading...</div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-[#F5F5F3] px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#888] mb-6">Booking not found</p>
          <Link href="/admin" className="px-6 py-3 bg-[#111] text-white rounded-full font-bold">
            Back to Admin
          </Link>
        </div>
      </div>
    );
  }

  const pmStatus = booking.paymentStatus || 'PENDING';
  const pmBadge = paymentBadge[pmStatus] || paymentBadge.PENDING;
  const amount = booking.paymentAmount || 'the session fee';
  const name = booking.name;

  const verifiedMailHref = `mailto:${booking.email}?subject=${encodeURIComponent('✅ Your Session is Confirmed — THINKFORM')}&body=${encodeURIComponent(
    `Hi ${name},\n\nGreat news! Your payment of ${amount} has been verified and your session is now officially confirmed.\n\nHere's what happens next:\n\n1. You'll receive a calendar invite with your session details shortly.\n2. If you have any early thoughts or materials to share, feel free to reply to this email.\n3. Please arrive (or log in) on time so we can make the most of our time together.\n\nI'm genuinely excited to work through this with you.\n\nWarm regards,\n\n— THINKFORM\nhttps://thinkform.in`
  )}`;

  const failedMailHref = `mailto:${booking.email}?subject=${encodeURIComponent('⚠️ Action Needed: Payment Could Not Be Verified — THINKFORM')}&body=${encodeURIComponent(
    `Hi ${name},\n\nThank you for submitting your booking request. Unfortunately, we were unable to verify the payment screenshot you shared.\n\nThis can happen for a few reasons:\n• The screenshot may have been unclear or incomplete\n• The transaction amount or UPI ID did not match\n• The payment may not have gone through on your end\n\nTo secure your spot, please:\n1. Re-check your UPI app and confirm the transaction was successful\n2. Reply to this email with a fresh, full-screen screenshot of the payment\n\nIf you are still facing trouble, simply reply and we'll help you sort it out. Your interest means a lot to us and we want to make sure your session gets confirmed.\n\nWarm regards,\n\n— THINKFORM\nhttps://thinkform.in`
  )}`;

  const pendingMailHref = `mailto:${booking.email}?subject=${encodeURIComponent('📝 Complete Your Payment to Confirm Your THINKFORM Session')}&body=${encodeURIComponent(
    `Hi ${name},\n\nThank you for reaching out — I'm excited about the possibility of working together!\n\nYour booking request has been received and reviewed. To officially hold your slot, the next step is to complete the session payment of ${amount}.\n\nHow to pay:\n1. Scan the UPI QR code on the booking page: https://thinkform.in/book\n2. Take a screenshot of the successful transaction\n3. Upload it on the same page or reply to this email\n\nYour session will be confirmed within 24 hours of payment verification.\n\nIf you have any questions before paying, just hit reply — I'm happy to help.\n\nWarm regards,\n\n— THINKFORM\nhttps://thinkform.in`
  )}`;

  return (
    <div className="min-h-screen bg-[#F5F5F3] px-6 py-16">
      {/* Proof zoom overlay */}
      {proofZoomed && booking.paymentProofUrl && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
          onClick={() => setProofZoomed(false)}
        >
          <img
            src={booking.paymentProofUrl}
            alt="Payment proof"
            className="max-w-full max-h-full rounded-2xl shadow-2xl"
            onClick={e => e.stopPropagation()}
          />
          <button
            onClick={() => setProofZoomed(false)}
            className="absolute top-6 right-6 w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-[#111] hover:bg-gray-100"
          >✕</button>
        </div>
      )}

      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin" className="text-sm text-[#888] hover:text-[#111] mb-4 inline-block">
            ← Back to Bookings
          </Link>
          <div className="flex items-center justify-between mb-2 flex-wrap gap-3">
            <h1 className="text-4xl font-black tracking-tighter text-[#111]">{booking.name}</h1>
            <div className="flex items-center gap-2 flex-wrap">
              <Link
                href={`/admin/bookings/${id}/report`}
                className="px-4 py-2 bg-[#111] text-white rounded-full text-sm font-bold hover:bg-[#333] transition-colors"
              >
                📝 Session Report
              </Link>
              {/* Payment badge */}
              <span className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest ${pmBadge.bg} ${pmBadge.text}`}>
                {pmBadge.label}
              </span>
              {/* Status badge */}
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

            {/* Request Details */}
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

            {/* Payment Proof Panel */}
            <div className="bg-white border border-[#e8e8e5] rounded-[2rem] p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-black tracking-tight">Payment</h2>
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest ${pmBadge.bg} ${pmBadge.text}`}>
                  {pmBadge.label}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-xs font-bold text-[#888] uppercase tracking-widest mb-1">Amount</p>
                  <p className="text-2xl font-black text-[#111]">{booking.paymentAmount || '—'}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-[#888] uppercase tracking-widest mb-1">Status</p>
                  <p className="font-bold text-[#111]">{pmBadge.label}</p>
                </div>
              </div>

              {booking.paymentProofUrl ? (
                <div className="mb-6">
                  <p className="text-xs font-bold text-[#888] uppercase tracking-widest mb-3">Payment Screenshot</p>
                  <div
                    className="relative group cursor-zoom-in rounded-xl overflow-hidden border border-[#e8e8e5]"
                    onClick={() => setProofZoomed(true)}
                  >
                    <img
                      src={booking.paymentProofUrl}
                      alt="Payment proof screenshot"
                      className="w-full max-h-64 object-contain bg-[#f9f9f7]"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <span className="opacity-0 group-hover:opacity-100 bg-white/90 text-[#111] text-xs font-bold px-3 py-1.5 rounded-full transition-opacity">
                        Click to zoom
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-8 mb-6 text-center border-2 border-dashed border-[#e8e8e5] rounded-xl">
                  <p className="text-sm text-[#888] font-medium">No payment screenshot submitted</p>
                </div>
              )}

              {/* Verify / Reject / Email buttons */}
              {pmStatus !== 'VERIFIED' && pmStatus !== 'FAILED' && (
                <div className="flex gap-3">
                  <button
                    onClick={() => updatePaymentStatus('VERIFIED')}
                    disabled={verifying}
                    className="flex-1 py-2.5 bg-green-600 text-white font-bold text-sm rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50"
                  >
                    {verifying ? 'Updating...' : '✓ Verify Payment'}
                  </button>
                  <button
                    onClick={() => updatePaymentStatus('FAILED')}
                    disabled={verifying}
                    className="flex-1 py-2.5 bg-red-100 text-red-700 font-bold text-sm rounded-xl hover:bg-red-200 transition-colors disabled:opacity-50"
                  >
                    ✕ Mark as Failed
                  </button>
                </div>
              )}
              
              {pmStatus === 'VERIFIED' && (
                <div className="flex flex-col gap-2">
                  <div className="p-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm font-bold text-center">
                    ✓ Payment Verified
                  </div>
                  <a 
                    href={verifiedMailHref}
                    className="py-2.5 bg-[#111] text-white text-center font-bold text-sm rounded-xl hover:bg-[#333] transition-colors"
                  >
                    ✉️ Email Confirmation to Client
                  </a>
                  {/* Undo row */}
                  <div className="pt-1 border-t border-[#e8e8e5] flex gap-2">
                    <button
                      onClick={() => updatePaymentStatus('FAILED')}
                      disabled={verifying}
                      className="flex-1 py-2 bg-red-50 text-red-600 font-bold text-xs rounded-xl hover:bg-red-100 transition-colors disabled:opacity-50"
                    >
                      ↩ Switch to Failed
                    </button>
                    <button
                      onClick={() => updatePaymentStatus('PENDING')}
                      disabled={verifying}
                      className="flex-1 py-2 bg-gray-100 text-gray-600 font-bold text-xs rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
                    >
                      ↩ Reset to Pending
                    </button>
                  </div>
                </div>
              )}
              
              {pmStatus === 'FAILED' && (
                <div className="flex flex-col gap-2">
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl text-red-700 text-sm font-bold text-center">
                    Payment marked as failed
                  </div>
                  <a 
                    href={failedMailHref}
                    className="py-2.5 bg-[#111] text-white text-center font-bold text-sm rounded-xl hover:bg-[#333] transition-colors"
                  >
                    ✉️ Email Client about Failure
                  </a>
                  {/* Undo row */}
                  <div className="pt-1 border-t border-[#e8e8e5] flex gap-2">
                    <button
                      onClick={() => updatePaymentStatus('VERIFIED')}
                      disabled={verifying}
                      className="flex-1 py-2 bg-green-50 text-green-700 font-bold text-xs rounded-xl hover:bg-green-100 transition-colors disabled:opacity-50"
                    >
                      ↩ Switch to Verified
                    </button>
                    <button
                      onClick={() => updatePaymentStatus('PENDING')}
                      disabled={verifying}
                      className="flex-1 py-2 bg-gray-100 text-gray-600 font-bold text-xs rounded-xl hover:bg-gray-200 transition-colors disabled:opacity-50"
                    >
                      ↩ Reset to Pending
                    </button>
                  </div>
                </div>
              )}
              
              {pmStatus === 'PENDING' && !booking.paymentProofUrl && (
                <div className="mt-3">
                  <a 
                    href={pendingMailHref}
                    className="w-full block py-2.5 bg-blue-50 text-blue-700 text-center font-bold text-sm rounded-xl hover:bg-blue-100 transition-colors"
                  >
                    ✉️ Email Payment Link to Client
                  </a>
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

            {/* Admin Control */}
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
                      {STATUS_OPTIONS.map(s => <option key={s} value={s}>{s}</option>)}
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
                      placeholder="e.g., Zoom, Google Meet"
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
