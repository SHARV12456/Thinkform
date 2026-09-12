'use client';
import { useState, useEffect, useRef, Suspense } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { usePathname, useSearchParams } from 'next/navigation';
import {
  MOCK_BOOKINGS, Booking, formatDuration, formatCurrency,
  ADMIN_SERVICES, openWhatsApp, generateOvertimeBillMessage,
} from '@/lib/mockData';
import {
  Play, Square, AlertCircle, CheckCircle2, ChevronLeft,
  Volume2, VolumeX, Clock, MessageSquare, Send,
} from 'lucide-react';
import Link from 'next/link';

type TimerState = 'NOT_STARTED' | 'ACTIVE' | 'WARNING_10' | 'WARNING_5' | 'COMPLETE' | 'OVERTIME' | 'SUMMARY';

function AdminTimerContent() {
  const path = usePathname();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');
  const booking = bookingId ? MOCK_BOOKINGS.find(b => b.id === bookingId) as Booking : null;
  const serviceConfig = booking
    ? ADMIN_SERVICES.find(s => s.name === booking.service || s.id === booking.serviceId)
    : null;

  const [timerState, setTimerState] = useState<TimerState>('NOT_STARTED');
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notes, setNotes] = useState({ recommendations: '', nextSteps: '', private: '' });
  const [billSent, setBillSent] = useState(false);

  const totalDurationSeconds = booking ? booking.duration * 60 : 0;
  const remainingSeconds = totalDurationSeconds - elapsedSeconds;
  const overtimeSeconds = elapsedSeconds > totalDurationSeconds ? elapsedSeconds - totalDurationSeconds : 0;

  // Overtime billing calculation
  const graceSecs = (serviceConfig?.gracePeriodMinutes ?? 0) * 60;
  const billableOvertimeSecs = Math.max(0, overtimeSeconds - graceSecs);
  const billableOvertimeMinutes = Math.ceil(billableOvertimeSecs / 60);
  const overtimeIntervals = Math.ceil(billableOvertimeMinutes / 30);
  const overtimeCost =
    serviceConfig?.overtimeEnabled && billableOvertimeMinutes > 0
      ? overtimeIntervals * (serviceConfig.overtimeRate ?? 0)
      : 0;
  const baseAmount = booking?.amount ?? 0;
  const totalPayable = baseAmount + overtimeCost;

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('https://actions.google.com/sounds/v1/alarms/digital_watch_alarm_long.ogg');
    audioRef.current.loop = false;
  }, []);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (
      timerState === 'ACTIVE' || timerState === 'WARNING_10' ||
      timerState === 'WARNING_5' || timerState === 'OVERTIME'
    ) {
      interval = setInterval(() => {
        setElapsedSeconds(prev => {
          const next = prev + 1;
          const remaining = totalDurationSeconds - next;
          if (remaining === 600 && timerState !== 'WARNING_10') setTimerState('WARNING_10');
          if (remaining === 300 && timerState !== 'WARNING_5') setTimerState('WARNING_5');
          if (remaining === 0) {
            setTimerState('COMPLETE');
            if (soundEnabled && audioRef.current) audioRef.current.play().catch(console.error);
          }
          return next;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerState, totalDurationSeconds, soundEnabled]);

  const startClock = () => {
    if (soundEnabled && audioRef.current) {
      audioRef.current.play().then(() => {
        audioRef.current?.pause();
        if (audioRef.current) audioRef.current.currentTime = 0;
      }).catch(console.error);
    }
    setTimerState('ACTIVE');
  };

  const endConsultation = () => {
    setTimerState('SUMMARY');
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.currentTime = 0; }
  };

  const handleSendBill = () => {
    if (!booking || !serviceConfig) return;
    const msg = generateOvertimeBillMessage({
      customerName: booking.customer,
      serviceName: booking.service,
      bookedDuration: booking.duration,
      actualDuration: elapsedSeconds,
      overtimeSeconds,
      gracePeriodMinutes: serviceConfig.gracePeriodMinutes ?? 0,
      billableOvertimeMinutes,
      overtimeRate: serviceConfig.overtimeRate ?? 0,
      overtimeCost,
      baseAmount,
      totalAmount: totalPayable,
    });
    openWhatsApp(booking.phone.replace(/\s+/g, '').replace('+', ''), msg);
    setBillSent(true);
  };

  const handleSaveCompleted = () => {
    alert('Consultation saved successfully.');
    window.location.href = '/admin/consultations';
  };

  // ── Empty state ────────────────────────────────────────────────────────────
  if (!booking) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-near-black)' }}>
        <AdminSidebar activePath={path} />
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: 'white', padding: '2rem' }}>
          <Clock size={48} style={{ opacity: 0.3, marginBottom: '1.5rem' }} />
          <p style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '0.5rem' }}>No Consultation Selected</p>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '2rem' }}>
            Please select a client from the consultations tab to start the live timer.
          </p>
          <Link href="/admin/consultations" className="btn btn-primary">View Consultations</Link>
        </div>
      </div>
    );
  }

  // ── Main timer screen ──────────────────────────────────────────────────────
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-near-black)', color: 'var(--color-white)' }}>

      {/* Top bar */}
      <div style={{ position: 'absolute', top: '1rem', left: '1rem', right: '1rem', display: 'flex', justifyContent: 'space-between', zIndex: 10 }}>
        <Link href="/admin/consultations" style={{ color: 'rgba(255,255,255,0.7)', display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.8125rem', textDecoration: 'none' }}>
          <ChevronLeft size={16} /> Back
        </Link>
        <button onClick={() => setSoundEnabled(!soundEnabled)} style={{ background: 'none', border: 'none', color: soundEnabled ? 'var(--color-white)' : 'rgba(255,255,255,0.4)', display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', fontSize: '0.75rem' }}>
          {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />} SOUND {soundEnabled ? 'ON' : 'OFF'}
        </button>
      </div>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', width: '100%' }}>

        {/* ── NOT STARTED ── */}
        {timerState === 'NOT_STARTED' && (
          <div style={{ maxWidth: 480, width: '100%', background: 'var(--color-white)', color: 'var(--color-near-black)', padding: '2.5rem', textAlign: 'center' }}>
            <p className="label-caps" style={{ color: 'var(--color-grey)', marginBottom: '1.5rem' }}>Ready to begin?</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem', textAlign: 'left', marginBottom: '2rem', background: 'var(--color-off-white)', padding: '1.5rem', border: '1px solid var(--color-light-grey)' }}>
              {[
                ['Client', booking.customer],
                ['Service', booking.service],
                ['Duration', `${booking.duration} minutes`],
                ['Scheduled', `${booking.time} — ${booking.date}`],
                ['Base Fee', formatCurrency(booking.amount)],
              ].map(([k, v]) => (
                <div key={k} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9375rem' }}>
                  <span style={{ color: 'var(--color-charcoal-light)' }}>{k}</span>
                  <span style={{ fontWeight: 600 }}>{v}</span>
                </div>
              ))}
              {serviceConfig?.overtimeEnabled && (
                <div style={{ borderTop: '1px solid var(--color-light-grey)', paddingTop: '0.875rem', fontSize: '0.8125rem', color: 'var(--color-grey)' }}>
                  Overtime: {formatCurrency(serviceConfig.overtimeRate)} per 30 min
                  {serviceConfig.gracePeriodMinutes > 0 && ` · ${serviceConfig.gracePeriodMinutes} min grace`}
                </div>
              )}
            </div>
            <button className="btn btn-primary" onClick={startClock} style={{ width: '100%', fontSize: '1rem', padding: '1.25rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem' }}>
              <Play size={18} fill="currentColor" /> START THE CLOCK
            </button>
          </div>
        )}

        {/* ── ACTIVE / WARNING / COMPLETE / OVERTIME ── */}
        {(timerState === 'ACTIVE' || timerState === 'WARNING_10' || timerState === 'WARNING_5' || timerState === 'COMPLETE' || timerState === 'OVERTIME') && (
          <div style={{ width: '100%', maxWidth: 600, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

            <div style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: 600, color: 'rgba(255,255,255,0.8)' }}>{booking.customer}</h2>
              <p style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.5)' }}>{booking.service} · {booking.duration} min</p>
            </div>

            {/* Timer digits */}
            <div style={{
              marginBottom: timerState === 'OVERTIME' ? '2rem' : '4rem',
              transition: 'all 0.3s ease',
              color:
                timerState === 'WARNING_5' || timerState === 'COMPLETE' ? '#ef4444' :
                timerState === 'WARNING_10' ? '#f59e0b' :
                timerState === 'OVERTIME' ? '#60a5fa' :
                'var(--color-white)',
            }}>
              <div style={{ fontSize: 'clamp(5rem, 15vw, 9rem)', fontWeight: 800, lineHeight: 1, letterSpacing: '-0.02em', fontVariantNumeric: 'tabular-nums' }}>
                {timerState === 'OVERTIME'
                  ? `+${formatDuration(overtimeSeconds)}`
                  : formatDuration(Math.abs(remainingSeconds))}
              </div>
              <div style={{ fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.2em', textTransform: 'uppercase', marginTop: '1rem', opacity: 0.8 }}>
                {timerState === 'OVERTIME' ? 'ADDITIONAL TIME' : timerState === 'COMPLETE' ? 'TIME COMPLETE' : 'TIME REMAINING'}
              </div>
            </div>

            {/* Live overtime cost card */}
            {timerState === 'OVERTIME' && (
              <div style={{ width: '100%', marginBottom: '2.5rem', padding: '1.5rem', background: 'rgba(96, 165, 250, 0.08)', border: '1px solid rgba(96, 165, 250, 0.25)', textAlign: 'left' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: overtimeCost > 0 ? '1.25rem' : 0 }}>
                  <div>
                    <p style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.5)', marginBottom: '0.25rem' }}>Base Fee</p>
                    <p style={{ fontSize: '1.125rem', fontWeight: 700 }}>{formatCurrency(baseAmount)}</p>
                  </div>
                  <div>
                    <p style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(255,255,255,0.5)', marginBottom: '0.25rem' }}>Overtime Cost</p>
                    <p style={{ fontSize: '1.125rem', fontWeight: 700, color: '#60a5fa' }}>
                      {overtimeCost > 0 ? formatCurrency(overtimeCost) : serviceConfig?.gracePeriodMinutes ? `Grace (${serviceConfig.gracePeriodMinutes}m)` : '—'}
                    </p>
                  </div>
                </div>
                {overtimeCost > 0 && (
                  <div style={{ borderTop: '1px solid rgba(96, 165, 250, 0.2)', paddingTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Total Payable</span>
                    <span style={{ fontSize: '1.5rem', fontWeight: 800 }}>{formatCurrency(totalPayable)}</span>
                  </div>
                )}
                <p style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.35)', marginTop: '0.75rem' }}>
                  Billed at {formatCurrency(serviceConfig?.overtimeRate ?? 0)} per 30 min block
                  {serviceConfig?.gracePeriodMinutes ? ` · ${serviceConfig.gracePeriodMinutes} min grace period` : ''}
                </p>
              </div>
            )}

            {/* Alert banners */}
            {(timerState === 'WARNING_10' || timerState === 'WARNING_5' || timerState === 'COMPLETE') && (
              <div style={{
                background: timerState === 'COMPLETE' ? 'rgba(239,68,68,0.1)' : 'rgba(245,158,11,0.1)',
                border: `1px solid ${timerState === 'COMPLETE' ? 'rgba(239,68,68,0.3)' : 'rgba(245,158,11,0.3)'}`,
                color: timerState === 'COMPLETE' ? '#f87171' : '#fbbf24',
                padding: '1rem 2rem', borderRadius: '4px', marginBottom: '2.5rem',
                display: 'flex', alignItems: 'center', gap: '0.75rem',
              }}>
                <AlertCircle size={20} />
                <span style={{ fontWeight: 600, letterSpacing: '0.1em', fontSize: '0.875rem' }}>
                  {timerState === 'WARNING_10' ? '10 MINUTES REMAINING' :
                   timerState === 'WARNING_5' ? '5 MINUTES REMAINING' :
                   'BOOKED TIME COMPLETE'}
                </span>
              </div>
            )}

            {/* Controls */}
            <div style={{ display: 'flex', gap: '1rem', width: '100%', flexDirection: 'column' }}>
              {timerState === 'COMPLETE' && (
                <button
                  onClick={() => setTimerState('OVERTIME')}
                  style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: 'white', padding: '1.25rem', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.1em', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', transition: 'all 0.2s' }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                >
                  <Play size={16} /> CONTINUE (OVERTIME)
                </button>
              )}
              <button
                onClick={endConsultation}
                style={{ background: 'var(--color-white)', border: 'none', color: 'var(--color-near-black)', padding: '1.25rem', fontSize: '0.875rem', fontWeight: 700, letterSpacing: '0.1em', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}
              >
                <Square size={16} fill="currentColor" /> END CONSULTATION
              </button>
            </div>

            <div style={{ display: 'flex', gap: '2rem', marginTop: '2.5rem', opacity: 0.4, fontSize: '0.75rem' }}>
              <span>Booked: {booking.duration}m</span>
              <span>Elapsed: {formatDuration(elapsedSeconds)}</span>
            </div>
          </div>
        )}

        {/* ── SUMMARY ── */}
        {timerState === 'SUMMARY' && (
          <div style={{ maxWidth: 660, width: '100%', background: 'var(--color-white)', color: 'var(--color-near-black)', padding: '2.5rem', border: '1px solid var(--color-light-grey)', textAlign: 'left', maxHeight: '90vh', overflowY: 'auto' }}>
            <h2 style={{ fontSize: '1.375rem', fontWeight: 800, letterSpacing: '-0.02em', marginBottom: '2rem' }}>Consultation Summary</h2>

            {/* Time breakdown */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
              {[
                { label: 'Booked', value: `${booking.duration} min` },
                { label: 'Actual', value: `${Math.floor(elapsedSeconds / 60)}m ${elapsedSeconds % 60}s` },
                { label: 'Overtime', value: overtimeSeconds > 0 ? `${Math.floor(overtimeSeconds / 60)}m ${overtimeSeconds % 60}s` : '—', highlight: overtimeSeconds > 0 },
              ].map(({ label, value, highlight }) => (
                <div key={label} style={{ padding: '1rem', background: 'var(--color-off-white)', border: `1px solid ${highlight ? '#bfdbfe' : 'var(--color-light-grey)'}` }}>
                  <p style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: highlight ? '#2563eb' : 'var(--color-grey)', marginBottom: '0.375rem' }}>{label}</p>
                  <p style={{ fontSize: '1rem', fontWeight: 700, color: highlight ? '#2563eb' : 'var(--color-near-black)' }}>{value}</p>
                </div>
              ))}
            </div>

            {/* Billing card */}
            <div style={{ marginBottom: '2rem', border: '1px solid var(--color-light-grey)' }}>
              <div style={{ background: 'var(--color-near-black)', color: 'white', padding: '0.75rem 1.25rem' }}>
                <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase' }}>BILLING SUMMARY</p>
              </div>
              <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9375rem' }}>
                  <span style={{ color: 'var(--color-charcoal-light)' }}>Base Consultation ({booking.duration} min)</span>
                  <span style={{ fontWeight: 600 }}>{formatCurrency(baseAmount)}</span>
                </div>
                {overtimeCost > 0 ? (
                  <>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9375rem' }}>
                      <span style={{ color: 'var(--color-charcoal-light)' }}>
                        Overtime — {billableOvertimeMinutes} min
                        {(serviceConfig?.gracePeriodMinutes ?? 0) > 0
                          ? ` (${serviceConfig!.gracePeriodMinutes}m grace included)`
                          : ''}
                      </span>
                      <span style={{ fontWeight: 600, color: '#2563eb' }}>{formatCurrency(overtimeCost)}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid var(--color-near-black)', paddingTop: '0.875rem', fontSize: '1.0625rem', fontWeight: 800 }}>
                      <span>TOTAL PAYABLE</span>
                      <span>{formatCurrency(totalPayable)}</span>
                    </div>
                  </>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'space-between', borderTop: '2px solid var(--color-near-black)', paddingTop: '0.875rem', fontSize: '1.0625rem', fontWeight: 800 }}>
                    <span>TOTAL PAYABLE</span>
                    <span>{formatCurrency(baseAmount)}</span>
                  </div>
                )}
              </div>
            </div>

            {/* WhatsApp bill send */}
            {overtimeCost > 0 && (
              <div style={{ marginBottom: '2rem', padding: '1.25rem', background: '#eff6ff', border: '1px solid #bfdbfe' }}>
                <p style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.375rem', color: '#1d4ed8' }}>
                  Additional ₹{overtimeCost.toLocaleString('en-IN')} is payable for overtime.
                </p>
                <p style={{ fontSize: '0.8125rem', color: '#2563eb', marginBottom: '1rem' }}>
                  Send the client an itemised bill via WhatsApp with the total amount and payment request.
                </p>
                <button
                  className="btn"
                  style={{ background: '#25d366', color: 'white', border: 'none', padding: '0.75rem 1.5rem', fontSize: '0.875rem', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.625rem', opacity: billSent ? 0.6 : 1 }}
                  onClick={handleSendBill}
                  disabled={billSent}
                >
                  <MessageSquare size={16} />
                  {billSent ? 'Bill Sent ✓' : `Send Bill — ${formatCurrency(totalPayable)} via WhatsApp`}
                </button>
              </div>
            )}

            {/* Notes */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label className="label">Key Observations & Recommendations</label>
                <textarea className="input" rows={3} value={notes.recommendations} onChange={e => setNotes({ ...notes, recommendations: e.target.value })} placeholder="What was discussed, recommended..." />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label className="label">Next Steps for Client</label>
                <textarea className="input" rows={2} value={notes.nextSteps} onChange={e => setNotes({ ...notes, nextSteps: e.target.value })} placeholder="Action items..." />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <label className="label">Private Notes <span style={{ fontWeight: 400, color: 'var(--color-grey)' }}>(Admin only)</span></label>
                <textarea className="input" rows={2} value={notes.private} onChange={e => setNotes({ ...notes, private: e.target.value })} placeholder="Internal notes, payment status..." style={{ background: '#fefce8' }} />
              </div>
            </div>

            <button className="btn btn-primary" onClick={handleSaveCompleted} style={{ width: '100%', justifyContent: 'center', padding: '1rem', fontSize: '0.9375rem' }}>
              <CheckCircle2 size={16} /> SAVE & MARK COMPLETED
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function AdminTimer() {
  return (
    <Suspense fallback={<div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-near-black)', color: 'var(--color-white)' }}>Loading...</div>}>
      <AdminTimerContent />
    </Suspense>
  );
}
