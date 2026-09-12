'use client';
import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { usePathname } from 'next/navigation';
import { AD_SOURCE_DATA } from '@/lib/mockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';
import StatCard from '@/components/StatCard';

const TRAFFIC_DATA = [
  { date: '1 Aug', visitors: 120, conversions: 4 },
  { date: '5 Aug', visitors: 150, conversions: 5 },
  { date: '10 Aug', visitors: 280, conversions: 12 },
  { date: '15 Aug', visitors: 310, conversions: 14 },
  { date: '20 Aug', visitors: 450, conversions: 22 },
  { date: '25 Aug', visitors: 420, conversions: 18 },
  { date: '30 Aug', visitors: 510, conversions: 28 },
];

export default function AdminAnalytics() {
  const path = usePathname();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-off-white)' }}>
      <AdminSidebar activePath={path} />
      <div className="admin-main" style={{ flex: 1 }}>
        <div style={{ padding: '1.5rem 2rem', background: 'var(--color-white)', borderBottom: '1px solid var(--color-light-grey)' }}>
          <h1 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Analytics</h1>
          <p style={{ fontSize: '0.8125rem', color: 'var(--color-grey)', marginTop: '0.2rem' }}>Traffic, conversion, and campaign performance.</p>
        </div>
        
        <div style={{ padding: '2rem' }}>
          <div className="grid-4" style={{ marginBottom: '1.5rem' }}>
            <StatCard label="Total Visitors" value="4,821" trend="24%" trendUp sub="This month" />
            <StatCard label="Conversion Rate" value="3.2%" trend="0.5%" trendUp sub="Visitor to booking" />
            <StatCard label="Cost per Acquisition" value="₹1,240" trend="12%" trendUp={false} sub="Avg across ads" />
            <StatCard label="Return on Ad Spend" value="3.8x" trend="0.4x" trendUp sub="ROAS" />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.5rem', marginBottom: '1.5rem' }}>
            {/* Traffic trend */}
            <div style={{ background: 'var(--color-white)', border: '1px solid var(--color-light-grey)', padding: '1.5rem' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-grey)', marginBottom: '1.25rem' }}>Traffic vs Conversions</p>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={TRAFFIC_DATA}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e8e7e4" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#9b9a97' }} dy={10} />
                  <YAxis yAxisId="left" hide />
                  <YAxis yAxisId="right" orientation="right" hide />
                  <Tooltip contentStyle={{ fontSize: 12, border: '1px solid #e8e7e4' }} />
                  <Line yAxisId="left" type="monotone" dataKey="visitors" stroke="#9b9a97" strokeWidth={2} dot={false} />
                  <Line yAxisId="right" type="monotone" dataKey="conversions" stroke="#1a1917" strokeWidth={3} dot={{ r: 4, fill: '#1a1917' }} />
                </LineChart>
              </ResponsiveContainer>
              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', justifyContent: 'center' }}>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-charcoal)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: 12, height: 3, background: '#9b9a97' }}></span> Visitors
                </span>
                <span style={{ fontSize: '0.75rem', color: 'var(--color-charcoal)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span style={{ width: 12, height: 3, background: '#1a1917' }}></span> Conversions
                </span>
              </div>
            </div>

            {/* Source breakdown */}
            <div style={{ background: 'var(--color-white)', border: '1px solid var(--color-light-grey)', padding: '1.5rem' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-grey)', marginBottom: '1.25rem' }}>Traffic Sources</p>
              <ResponsiveContainer width="100%" height={220}>
                <BarChart data={AD_SOURCE_DATA} layout="vertical" margin={{ left: 0, right: 0, top: 0, bottom: 0 }}>
                  <XAxis type="number" hide />
                  <YAxis dataKey="source" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#3d3c3a' }} width={80} />
                  <Tooltip formatter={(v: any) => [`${v}%`, 'Share']} contentStyle={{ fontSize: 12 }} />
                  <Bar dataKey="percentage" fill="#3d3c3a" radius={[0, 2, 2, 0]} barSize={20} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
