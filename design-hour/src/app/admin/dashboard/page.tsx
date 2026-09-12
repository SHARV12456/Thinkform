'use client';
import AdminSidebar from '@/components/AdminSidebar';
import StatCard from '@/components/StatCard';
import { usePathname } from 'next/navigation';
import { REVENUE_DATA, BOOKING_BREAKDOWN, MOCK_BOOKINGS, AD_SOURCE_DATA } from '@/lib/mockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';

function AdminHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <div style={{ padding: '1.5rem 2rem', background: 'var(--color-white)', borderBottom: '1px solid var(--color-light-grey)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
      <div>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 700, letterSpacing: '-0.015em' }}>{title}</h1>
        {sub && <p style={{ fontSize: '0.8125rem', color: 'var(--color-grey)', marginTop: '0.2rem' }}>{sub}</p>}
      </div>
      <div style={{ fontSize: '0.75rem', color: 'var(--color-grey)', background: 'var(--color-off-white)', padding: '0.375rem 0.75rem', border: '1px solid var(--color-light-grey)' }}>
        FRONTEND DEMO · MOCK DATA
      </div>
    </div>
  );
}

const UPCOMING = MOCK_BOOKINGS.filter(b => b.status === 'Confirmed' || b.status === 'Requested' || b.status === 'Payment Pending' || b.status === 'Payment Received').slice(0, 4);

export default function AdminDashboard() {
  const path = usePathname();
  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-off-white)' }}>
      <AdminSidebar activePath={path} />
      <div className="admin-main" style={{ flex: 1 }}>
        <AdminHeader title="Dashboard" sub="Overview of today's consultations and revenue." />
        <div style={{ padding: '2rem' }}>

          {/* Stats */}
          <div className="grid-4" style={{ marginBottom: '1.5rem' }}>
            <StatCard label="Today's Consultations" value="8" sub="vs 6 yesterday" trend="33%" trendUp />
            <StatCard label="Upcoming" value="14" sub="next 7 days" />
            <StatCard label="Revenue Today" value="₹47,988" trend="12%" trendUp sub="vs avg" />
            <StatCard label="This Month" value="₹1,84,500" trend="16%" trendUp sub="vs last month" />
          </div>

          {/* Charts row */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            {/* Revenue chart */}
            <div style={{ background: 'var(--color-white)', border: '1px solid var(--color-light-grey)', padding: '1.5rem' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-grey)', marginBottom: '1.25rem' }}>Monthly Revenue</p>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={REVENUE_DATA} barSize={28}>
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9b9a97' }} />
                  <YAxis hide />
                  <Tooltip formatter={(v: any) => [`₹${v.toLocaleString('en-IN')}`, 'Revenue']} contentStyle={{ fontSize: 12, border: '1px solid #e8e7e4' }} />
                  <Bar dataKey="revenue" fill="#1a1917" radius={[2, 2, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Breakdown pie */}
            <div style={{ background: 'var(--color-white)', border: '1px solid var(--color-light-grey)', padding: '1.5rem' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-grey)', marginBottom: '1.25rem' }}>Booking Breakdown</p>
              <ResponsiveContainer width="100%" height={150}>
                <PieChart>
                  <Pie data={BOOKING_BREAKDOWN} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={65} innerRadius={40}>
                    {BOOKING_BREAKDOWN.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                  </Pie>
                  <Tooltip contentStyle={{ fontSize: 12 }} />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: '0.5rem' }}>
                {BOOKING_BREAKDOWN.map(b => (
                  <div key={b.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8125rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: b.color, display: 'inline-block' }} />
                      {b.name}
                    </span>
                    <span style={{ fontWeight: 600 }}>{b.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Upcoming + Ad sources */}
          <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '1.5rem' }}>
            {/* Upcoming appointments */}
            <div style={{ background: 'var(--color-white)', border: '1px solid var(--color-light-grey)', padding: '1.5rem' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-grey)', marginBottom: '1.25rem' }}>Upcoming Appointments</p>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid var(--color-light-grey)' }}>
                    {['Customer', 'Service', 'Date', 'Time', 'Status'].map(h => (
                      <th key={h} style={{ textAlign: 'left', fontSize: '0.6875rem', fontWeight: 600, letterSpacing: '0.1em', color: 'var(--color-grey)', paddingBottom: '0.75rem', textTransform: 'uppercase' }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {UPCOMING.map(b => (
                    <tr key={b.id} style={{ borderBottom: '1px solid var(--color-light-grey)' }}>
                      <td style={{ padding: '0.875rem 0', fontSize: '0.875rem', fontWeight: 500 }}>{b.customer}</td>
                      <td style={{ padding: '0.875rem 0', fontSize: '0.8125rem', color: 'var(--color-charcoal-light)' }}>{b.service}</td>
                      <td style={{ padding: '0.875rem 0', fontSize: '0.8125rem', color: 'var(--color-charcoal-light)' }}>{b.date}</td>
                      <td style={{ padding: '0.875rem 0', fontSize: '0.8125rem', color: 'var(--color-charcoal-light)' }}>{b.time}</td>
                      <td style={{ padding: '0.875rem 0' }}>
                        <span className={`status-${b.status.replace(' ', '-').toLowerCase()}`} style={{ fontSize: '0.6875rem', fontWeight: 600, padding: '0.2rem 0.5rem', letterSpacing: '0.08em', whiteSpace: 'nowrap' }}>{b.status}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Ad sources */}
            <div style={{ background: 'var(--color-white)', border: '1px solid var(--color-light-grey)', padding: '1.5rem' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-grey)', marginBottom: '1.25rem' }}>Booking Sources (This Month)</p>
              {AD_SOURCE_DATA.map(src => (
                <div key={src.source} style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', marginBottom: '0.375rem' }}>
                    <span style={{ fontWeight: 500 }}>{src.source}</span>
                    <span style={{ color: 'var(--color-grey)' }}>{src.bookings} bookings</span>
                  </div>
                  <div style={{ height: 5, background: 'var(--color-light-grey)', overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: `${src.percentage}%`, background: 'var(--color-near-black)', transition: 'width 0.5s ease' }} />
                  </div>
                  <span style={{ fontSize: '0.6875rem', color: 'var(--color-grey)' }}>{src.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
