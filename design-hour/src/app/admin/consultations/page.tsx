'use client';
import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { MOCK_BOOKINGS, Booking, WHATSAPP_CONFIG, openWhatsApp, generateConfirmationMessage, generateReminderMessage, generateFollowUpMessage, formatDate } from '@/lib/mockData';
import { Search, X, MessageSquare, FileText } from 'lucide-react';

export default function AdminConsultations() {
  const path = usePathname();
  const [search, setSearch] = useState('');
  const [notesBooking, setNotesBooking] = useState<Booking | null>(null);
  const [messageBooking, setMessageBooking] = useState<Booking | null>(null);

  const filtered = MOCK_BOOKINGS.filter(b =>
    b.customer.toLowerCase().includes(search.toLowerCase()) ||
    b.service.toLowerCase().includes(search.toLowerCase())
  );

  const messageTemplates = messageBooking ? [
    { label: 'Appointment Confirmed', body: generateConfirmationMessage(messageBooking as any) },
    { label: 'Day-of Reminder', body: generateReminderMessage(messageBooking as any) },
    { label: 'Follow-up', body: generateFollowUpMessage(messageBooking as any) },
  ] : [];

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-off-white)' }}>
      <AdminSidebar activePath={path} />
      <div className="admin-main" style={{ flex: 1 }}>
        <div style={{ padding: '1.5rem 2rem', background: 'var(--color-white)', borderBottom: '1px solid var(--color-light-grey)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Consultations</h1>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-grey)', marginTop: '0.2rem' }}>Review upcoming and past design sessions.</p>
          </div>
          <div style={{ position: 'relative', width: 280 }}>
            <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-grey)' }} />
            <input className="input" placeholder="Search sessions…" value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: '2.25rem' }} />
          </div>
        </div>
        <div style={{ padding: '2rem' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {filtered.map(b => (
              <div key={b.id} style={{ background: 'var(--color-white)', border: '1px solid var(--color-light-grey)', padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span className={`status-${b.status.replace(/ /g, '-').toLowerCase()}`} style={{ fontSize: '0.625rem', fontWeight: 700, padding: '0.2rem 0.5rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem', display: 'inline-block' }}>{b.status}</span>
                    <h2 style={{ fontSize: '1.0625rem', fontWeight: 700 }}>{b.customer}</h2>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-charcoal-light)' }}>{b.service}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>{b.date}</p>
                    <p style={{ fontSize: '0.8125rem', color: 'var(--color-grey)' }}>{b.time} ({b.duration}m)</p>
                  </div>
                </div>

                <div style={{ background: 'var(--color-off-white)', padding: '1rem', border: '1px solid var(--color-light-grey)' }}>
                  <p className="label" style={{ marginBottom: '0.25rem' }}>Project Type</p>
                  <p style={{ fontSize: '0.875rem', fontWeight: 500, marginBottom: '0.75rem' }}>{b.propertyType}</p>
                  <p className="label" style={{ marginBottom: '0.25rem' }}>Location</p>
                  <p style={{ fontSize: '0.875rem', fontWeight: 500 }}>{b.location}</p>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto', flexDirection: 'column' }}>
                  {b.status !== 'Completed' && b.status !== 'Cancelled' && (
                    <Link href={`/admin/timer?bookingId=${b.id}`} className="btn btn-primary" style={{ width: '100%', padding: '0.75rem', fontSize: '0.8125rem', justifyContent: 'center' }}>
                      START CONSULTATION
                    </Link>
                  )}
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                      className="btn btn-ghost"
                      style={{ flex: 1, padding: '0.625rem', fontSize: '0.75rem', justifyContent: 'center' }}
                      onClick={() => setNotesBooking(b)}
                    >
                      <FileText size={13} /> View Notes
                    </button>
                    <button
                      className="btn btn-secondary"
                      style={{ flex: 1, padding: '0.625rem', fontSize: '0.75rem', justifyContent: 'center' }}
                      onClick={() => setMessageBooking(b)}
                    >
                      <MessageSquare size={13} /> Message Client
                    </button>
                  </div>
                </div>
              </div>
            ))}
            {filtered.length === 0 && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', color: 'var(--color-grey)', background: 'var(--color-white)', border: '1px solid var(--color-light-grey)' }}>No consultations found.</div>
            )}
          </div>
        </div>
      </div>

      {/* View Notes Modal */}
      {notesBooking && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => setNotesBooking(null)}>
          <div style={{ background: 'white', maxWidth: 520, width: '100%', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h2 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Consultation Notes</h2>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-grey)', marginTop: '0.2rem' }}>{notesBooking.customer} — {notesBooking.service}</p>
              </div>
              <button onClick={() => setNotesBooking(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-grey)', display: 'flex', alignItems: 'center' }}><X size={20} /></button>
            </div>

            <div style={{ background: 'var(--color-off-white)', padding: '1rem', border: '1px solid var(--color-light-grey)', marginBottom: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.625rem' }}>
              {[
                ['Date', formatDate(notesBooking.date)],
                ['Time', `${notesBooking.time} IST`],
                ['Duration', `${notesBooking.duration} minutes`],
                ['Location', notesBooking.location],
                ['Property', notesBooking.propertyType],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', borderBottom: '1px solid var(--color-light-grey)', paddingBottom: '0.5rem' }}>
                  <span style={{ color: 'var(--color-grey)' }}>{k}</span>
                  <span style={{ fontWeight: 500, textAlign: 'right', maxWidth: '60%' }}>{v}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <p className="label" style={{ marginBottom: '0.5rem' }}>Client Requirement</p>
                <p style={{ fontSize: '0.875rem', lineHeight: '1.6', color: 'var(--color-charcoal)', background: 'var(--color-off-white)', padding: '0.875rem', border: '1px solid var(--color-light-grey)' }}>
                  {notesBooking.requirement || 'No requirement noted.'}
                </p>
              </div>
              {notesBooking.actualDuration && (
                <div>
                  <p className="label" style={{ marginBottom: '0.5rem' }}>Session Duration</p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--color-charcoal)', background: 'var(--color-off-white)', padding: '0.875rem', border: '1px solid var(--color-light-grey)' }}>
                    Actual: {Math.floor(notesBooking.actualDuration / 60)} min {notesBooking.actualDuration % 60} sec
                    {notesBooking.overtimeDuration && notesBooking.overtimeDuration > 0
                      ? ` · Overtime: ${Math.floor(notesBooking.overtimeDuration / 60)} min`
                      : ''}
                  </p>
                </div>
              )}
              <div>
                <p className="label" style={{ marginBottom: '0.5rem' }}>Private Notes</p>
                <p style={{ fontSize: '0.8125rem', fontStyle: 'italic', color: 'var(--color-grey)', padding: '0.875rem', background: '#fefce8', border: '1px solid #fde68a' }}>
                  No private notes saved for this session.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Message Client Modal */}
      {messageBooking && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => setMessageBooking(null)}>
          <div style={{ background: 'white', maxWidth: 520, width: '100%', padding: '2rem', maxHeight: '90vh', overflowY: 'auto' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div>
                <h2 style={{ fontSize: '1.125rem', fontWeight: 700 }}>Message Client</h2>
                <p style={{ fontSize: '0.8125rem', color: 'var(--color-grey)', marginTop: '0.2rem' }}>{messageBooking.customer} · {messageBooking.phone}</p>
              </div>
              <button onClick={() => setMessageBooking(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-grey)', display: 'flex', alignItems: 'center' }}><X size={20} /></button>
            </div>
            <p className="label" style={{ marginBottom: '1rem' }}>Select a message template to send via WhatsApp</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {messageTemplates.map(t => (
                <div key={t.label} style={{ border: '1px solid var(--color-light-grey)', padding: '1rem' }}>
                  <p style={{ fontWeight: 600, fontSize: '0.875rem', marginBottom: '0.5rem' }}>{t.label}</p>
                  <p style={{ fontSize: '0.8125rem', color: 'var(--color-grey)', whiteSpace: 'pre-line', lineHeight: '1.6', marginBottom: '0.875rem' }}>{t.body}</p>
                  <button
                    className="btn btn-primary"
                    style={{ padding: '0.625rem 1.25rem', fontSize: '0.75rem', justifyContent: 'center' }}
                    onClick={() => { openWhatsApp(messageBooking.phone.replace(/\s+/g, '').replace('+', ''), t.body); setMessageBooking(null); }}
                  >
                    <MessageSquare size={13} /> Send via WhatsApp
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
