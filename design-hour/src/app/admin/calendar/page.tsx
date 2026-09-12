'use client';
import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { usePathname } from 'next/navigation';
import { MOCK_BOOKINGS } from '@/lib/mockData';
import { format, startOfMonth, endOfMonth, startOfWeek, endOfWeek, addDays, isSameDay, addMonths, subMonths } from 'date-fns';

type ViewMode = 'month' | 'week' | 'day';

const COLORS: Record<string, string> = { Confirmed: '#16a34a', Pending: '#d97706', Completed: '#6b6a68', Cancelled: '#dc2626', Rescheduled: '#7c3aed' };

export default function AdminCalendar() {
  const path = usePathname();
  const [view, setView] = useState<ViewMode>('month');
  const [current, setCurrent] = useState(new Date());
  const [selected, setSelected] = useState<typeof MOCK_BOOKINGS[0] | null>(null);

  const bookingsForDay = (day: Date) => MOCK_BOOKINGS.filter(b => {
    const bd = new Date(b.date);
    return isSameDay(bd, day);
  });

  const start = startOfWeek(startOfMonth(current), { weekStartsOn: 1 });
  const end = endOfWeek(endOfMonth(current), { weekStartsOn: 1 });
  const days: Date[] = [];
  let d = start;
  while (d <= end) { days.push(d); d = addDays(d, 1); }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-off-white)' }}>
      <AdminSidebar activePath={path} />
      <div className="admin-main" style={{ flex: 1 }}>
        <div style={{ padding: '1.5rem 2rem', background: 'var(--color-white)', borderBottom: '1px solid var(--color-light-grey)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={() => setCurrent(subMonths(current, 1))} style={{ background: 'none', border: '1px solid var(--color-light-grey)', padding: '0.375rem 0.75rem', cursor: 'pointer', fontSize: '0.875rem' }}>←</button>
            <h1 style={{ fontSize: '1.125rem', fontWeight: 700, minWidth: 180 }}>{format(current, 'MMMM yyyy')}</h1>
            <button onClick={() => setCurrent(addMonths(current, 1))} style={{ background: 'none', border: '1px solid var(--color-light-grey)', padding: '0.375rem 0.75rem', cursor: 'pointer', fontSize: '0.875rem' }}>→</button>
          </div>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            {(['month', 'week', 'day'] as ViewMode[]).map(v => (
              <button key={v} onClick={() => setView(v)} style={{ padding: '0.375rem 0.875rem', fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'capitalize', border: '1px solid', borderColor: view === v ? 'var(--color-near-black)' : 'var(--color-light-grey)', background: view === v ? 'var(--color-near-black)' : 'white', color: view === v ? 'white' : 'var(--color-charcoal)', cursor: 'pointer' }}>{v}</button>
            ))}
          </div>
        </div>

        <div style={{ padding: '2rem' }}>
          <div style={{ background: 'white', border: '1px solid var(--color-light-grey)' }}>
            {/* Day headers */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', borderBottom: '1px solid var(--color-light-grey)' }}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                <div key={d} style={{ padding: '0.75rem', textAlign: 'center', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--color-grey)', textTransform: 'uppercase' }}>{d}</div>
              ))}
            </div>
            {/* Days grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
              {days.map((day, i) => {
                const dayBookings = bookingsForDay(day);
                const isCurrentMonth = day.getMonth() === current.getMonth();
                const isToday = isSameDay(day, new Date());
                return (
                  <div key={i} style={{ minHeight: 100, padding: '0.5rem', borderRight: i % 7 !== 6 ? '1px solid var(--color-light-grey)' : 'none', borderBottom: '1px solid var(--color-light-grey)', opacity: isCurrentMonth ? 1 : 0.35, background: isToday ? '#f8f7f5' : 'white' }}>
                    <p style={{ fontSize: '0.8125rem', fontWeight: isToday ? 700 : 400, marginBottom: '0.5rem', color: isToday ? 'var(--color-near-black)' : 'var(--color-charcoal)' }}>
                      {format(day, 'd')}
                    </p>
                    {dayBookings.map(b => (
                      <button key={b.id} onClick={() => setSelected(b)}
                        style={{ display: 'block', width: '100%', textAlign: 'left', marginBottom: '2px', padding: '0.2rem 0.375rem', fontSize: '0.6875rem', fontWeight: 600, background: `${COLORS[b.status]}22`, color: COLORS[b.status], border: `1px solid ${COLORS[b.status]}44`, cursor: 'pointer', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {b.time} {b.customer.split(' ')[0]}
                      </button>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', flexWrap: 'wrap' }}>
            {Object.entries(COLORS).map(([status, color]) => (
              <span key={status} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.75rem', color: 'var(--color-charcoal-light)' }}>
                <span style={{ width: 8, height: 8, borderRadius: 1, background: color, display: 'inline-block' }} />
                {status}
              </span>
            ))}
          </div>
        </div>
      </div>

      {selected && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.4)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }} onClick={() => setSelected(null)}>
          <div style={{ background: 'white', maxWidth: 420, width: '100%', padding: '2rem' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
              <h2 style={{ fontWeight: 700, fontSize: '1rem' }}>Booking — {selected.id}</h2>
              <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem', color: 'var(--color-grey)' }}>×</button>
            </div>
            {[['Customer', selected.customer], ['Service', selected.service], ['Date', selected.date], ['Time', selected.time], ['Status', selected.status], ['Amount', `₹${selected.amount.toLocaleString('en-IN')}`]].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 0', borderBottom: '1px solid var(--color-light-grey)', fontSize: '0.875rem' }}>
                <span style={{ color: 'var(--color-grey)' }}>{k}</span>
                <span style={{ fontWeight: 500 }}>{v}</span>
              </div>
            ))}
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem' }}>
              <button className="btn btn-primary" style={{ flex: 1, fontSize: '0.75rem', padding: '0.75rem', justifyContent: 'center' }}>Reschedule</button>
              <button className="btn btn-ghost" style={{ flex: 1, fontSize: '0.75rem', padding: '0.75rem', justifyContent: 'center' }}>Block Slot</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
