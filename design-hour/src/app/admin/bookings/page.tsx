'use client';
import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { MOCK_BOOKINGS, TIME_SLOTS, WHATSAPP_CONFIG, getWhatsAppNumber, openWhatsApp, generatePaymentRequestMessage, generateConfirmationMessage } from '@/lib/mockData';
import { Search, Eye, MessageSquare, X, Calendar } from 'lucide-react';

const STATUSES = ['All', 'Requested', 'Payment Pending', 'Payment Received', 'Confirmed', 'Completed', 'Cancelled', 'Rescheduled'];

export default function AdminBookings() {
  const path = usePathname();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selected, setSelected] = useState<typeof MOCK_BOOKINGS[0] | null>(null);
  const [rescheduleBooking, setRescheduleBooking] = useState<typeof MOCK_BOOKINGS[0] | null>(null);
  const [rescheduleDate, setRescheduleDate] = useState('');
  const [rescheduleTime, setRescheduleTime] = useState('');

  const filtered = MOCK_BOOKINGS.filter(b => {
    const matchSearch = b.customer.toLowerCase().includes(search.toLowerCase()) || b.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-off-white)' }}>
      <AdminSidebar activePath={path} />
      <div className="admin-main" style={{ flex: 1 }}>
        <div style={{ padding: '1.5rem 2rem', background: 'var(--color-white)', borderBottom: '1px solid var(--color-light-grey)' }}>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '1rem' }}>Bookings</h1>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: 1, minWidth: 220 }}>
              <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-grey)' }} />
              <input className="input" placeholder="Search by name or ID…" value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: '2.25rem' }} />
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {STATUSES.map(s => (
                <button key={s} onClick={() => setStatusFilter(s)}
                  style={{ padding: '0.5rem 0.875rem', fontSize: '0.75rem', fontWeight: 600, border: '1px solid', borderColor: statusFilter === s ? 'var(--color-near-black)' : 'var(--color-light-grey)', background: statusFilter === s ? 'var(--color-near-black)' : 'white', color: statusFilter === s ? 'white' : 'var(--color-charcoal)', cursor: 'pointer', letterSpacing: '0.05em' }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
        <div style={{ padding: '2rem', overflowX: 'auto' }}>
          <div style={{ background: 'var(--color-white)', border: '1px solid var(--color-light-grey)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 800 }}>
              <thead>
                <tr style={{ background: 'var(--color-off-white)', borderBottom: '1px solid var(--color-light-grey)' }}>
                  {['ID', 'Customer', 'Service', 'Date', 'Time', 'Amount', 'Payment', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '0.875rem 1rem', textAlign: 'left', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--color-grey)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(b => (
                  <tr key={b.id} style={{ borderBottom: '1px solid var(--color-light-grey)', transition: 'background 0.15s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--color-off-white)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
                    <td style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-grey)', fontFamily: 'monospace' }}>{b.id}</td>
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>{b.customer}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--color-grey)' }}>{b.email}</p>
                    </td>
                    <td style={{ padding: '0.875rem 1rem', fontSize: '0.8125rem' }}>{b.service}</td>
                    <td style={{ padding: '0.875rem 1rem', fontSize: '0.8125rem', color: 'var(--color-charcoal-light)' }}>{b.date}</td>
                    <td style={{ padding: '0.875rem 1rem', fontSize: '0.8125rem', color: 'var(--color-charcoal-light)' }}>{b.time}</td>
                    <td style={{ padding: '0.875rem 1rem', fontSize: '0.875rem', fontWeight: 600 }}>₹{b.amount.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <span style={{ fontSize: '0.6875rem', fontWeight: 600, padding: '0.2rem 0.5rem', background: b.payment === 'Paid' ? '#f0fdf4' : b.payment === 'Refunded' ? '#fef2f2' : '#fffbeb', color: b.payment === 'Paid' ? '#16a34a' : b.payment === 'Refunded' ? '#dc2626' : '#d97706', border: `1px solid ${b.payment === 'Paid' ? '#bbf7d0' : b.payment === 'Refunded' ? '#fecaca' : '#fde68a'}` }}>
                        {b.payment}
                      </span>
                    </td>
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <span className={`status-${b.status.replace(' ', '-').toLowerCase()}`} style={{ fontSize: '0.6875rem', fontWeight: 600, padding: '0.2rem 0.5rem', letterSpacing: '0.06em', whiteSpace: 'nowrap' }}>{b.status}</span>
                    </td>
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <button onClick={() => setSelected(b)} style={{ background: 'none', border: '1px solid var(--color-light-grey)', padding: '0.375rem 0.625rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: 'var(--color-charcoal)' }}>
                        <Eye size={12} /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-grey)', fontSize: '0.9375rem' }}>No bookings found.</div>
            )}
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => setSelected(null)}>
          <div style={{ background: 'white', maxWidth: 500, width: '100%', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <h2 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Booking Details</h2>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer', color: 'var(--color-grey)' }}>×</button>
            </div>
            {Object.entries({ ID: selected.id, Customer: selected.customer, Email: selected.email, Phone: selected.phone, Service: selected.service, Duration: `${selected.duration} min`, Date: selected.date, Time: selected.time, Location: selected.location, 'Property Type': selected.propertyType, Amount: `₹${selected.amount.toLocaleString('en-IN')}`, Payment: selected.payment, Status: selected.status }).map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.625rem 0', borderBottom: '1px solid var(--color-light-grey)', fontSize: '0.875rem' }}>
                <span style={{ color: 'var(--color-grey)', flexShrink: 0, marginRight: '1rem' }}>{k}</span>
                <span style={{ fontWeight: 500, textAlign: 'right' }}>{v}</span>
              </div>
            ))}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', flexDirection: 'column' }}>
              <div style={{ display: 'flex', gap: '0.75rem' }}>
                <button 
                  className="btn btn-secondary" 
                  style={{ flex: 1, justifyContent: 'center', padding: '0.75rem', fontSize: '0.75rem' }}
                  onClick={() => openWhatsApp(selected.phone.replace(/[\s+]/g, ''), selected.status === 'Requested' || selected.status === 'Payment Pending' ? generatePaymentRequestMessage(selected as any) : generateConfirmationMessage(selected as any))}
                >
                  <MessageSquare size={14} /> Message Client
                </button>
                <button
                  className="btn btn-ghost"
                  style={{ flex: 1, justifyContent: 'center', padding: '0.75rem', fontSize: '0.75rem' }}
                  onClick={() => { setRescheduleBooking(selected); setSelected(null); }}
                >
                  Reschedule
                </button>
              </div>
              {selected.status === 'Confirmed' && (
                <Link href={`/admin/timer?bookingId=${selected.id}`} className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', padding: '0.75rem', fontSize: '0.75rem' }}>
                  Start Consultation
                </Link>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Reschedule Modal */}
      {rescheduleBooking && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => setRescheduleBooking(null)}>
          <div style={{ background: 'white', maxWidth: 480, width: '100%', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h2 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Reschedule Booking</h2>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-grey)', marginTop: '0.2rem' }}>{rescheduleBooking.customer} — {rescheduleBooking.service}</p>
              </div>
              <button onClick={() => setRescheduleBooking(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-grey)', display: 'flex' }}><X size={20} /></button>
            </div>

            <div style={{ background: 'var(--color-off-white)', padding: '0.875rem', border: '1px solid var(--color-light-grey)', marginBottom: '1.5rem', fontSize: '0.8125rem' }}>
              <span style={{ color: 'var(--color-grey)' }}>Current: </span>
              <strong>{rescheduleBooking.date} at {rescheduleBooking.time}</strong>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <label className="label" htmlFor="rs-date">New Date</label>
                <input
                  id="rs-date"
                  type="date"
                  className="input"
                  value={rescheduleDate}
                  onChange={e => setRescheduleDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                <label className="label">New Time</label>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                  {TIME_SLOTS.filter(s => s.available).map(slot => (
                    <button
                      key={slot.time}
                      onClick={() => setRescheduleTime(slot.time)}
                      style={{
                        padding: '0.625rem', fontSize: '0.8125rem', fontWeight: 500, cursor: 'pointer',
                        border: `1px solid ${rescheduleTime === slot.time ? 'var(--color-near-black)' : 'var(--color-light-grey)'}`,
                        background: rescheduleTime === slot.time ? 'var(--color-near-black)' : 'white',
                        color: rescheduleTime === slot.time ? 'white' : 'var(--color-near-black)',
                        transition: 'all 0.15s',
                      }}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <button
                className="btn btn-primary"
                style={{ flex: 1, justifyContent: 'center', padding: '0.875rem', fontSize: '0.8125rem' }}
                disabled={!rescheduleDate || !rescheduleTime}
                onClick={() => {
                  const msg = `Hi ${rescheduleBooking.customer}, we have rescheduled your ${rescheduleBooking.service} consultation to ${rescheduleDate} at ${rescheduleTime} IST. Please let us know if this works for you.\n— Design Hour`;
                  openWhatsApp(rescheduleBooking.phone.replace(/\s+/g, '').replace('+', ''), msg);
                  setRescheduleBooking(null);
                }}
              >
                <Calendar size={14} /> Confirm & Notify Client
              </button>
              <button className="btn btn-ghost" style={{ padding: '0.875rem 1.25rem', fontSize: '0.8125rem' }} onClick={() => setRescheduleBooking(null)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
