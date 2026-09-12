'use client';
import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { usePathname } from 'next/navigation';
import { MOCK_CUSTOMERS } from '@/lib/mockData';
import { Search } from 'lucide-react';

export default function AdminCustomers() {
  const path = usePathname();
  const [search, setSearch] = useState('');

  const filtered = MOCK_CUSTOMERS.filter(c => 
    c.name.toLowerCase().includes(search.toLowerCase()) || 
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-off-white)' }}>
      <AdminSidebar activePath={path} />
      <div className="admin-main" style={{ flex: 1 }}>
        <div style={{ padding: '1.5rem 2rem', background: 'var(--color-white)', borderBottom: '1px solid var(--color-light-grey)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Customers</h1>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-grey)', marginTop: '0.2rem' }}>Manage your client database.</p>
          </div>
          <div style={{ position: 'relative', width: 280 }}>
            <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-grey)' }} />
            <input className="input" placeholder="Search customers…" value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: '2.25rem' }} />
          </div>
        </div>
        <div style={{ padding: '2rem' }}>
          <div style={{ background: 'var(--color-white)', border: '1px solid var(--color-light-grey)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 600 }}>
              <thead>
                <tr style={{ background: 'var(--color-off-white)', borderBottom: '1px solid var(--color-light-grey)' }}>
                  {['Name', 'Email', 'Bookings', 'Total Spent', 'Last Booking'].map(h => (
                    <th key={h} style={{ padding: '0.875rem 1rem', textAlign: 'left', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--color-grey)', textTransform: 'uppercase' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map(c => (
                  <tr key={c.email} style={{ borderBottom: '1px solid var(--color-light-grey)', transition: 'background 0.15s' }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = 'var(--color-off-white)'}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = 'transparent'}>
                    <td style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>{c.name}</td>
                    <td style={{ padding: '1rem', fontSize: '0.8125rem', color: 'var(--color-charcoal-light)' }}>{c.email}</td>
                    <td style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: 500 }}>{c.bookings}</td>
                    <td style={{ padding: '1rem', fontSize: '0.875rem', fontWeight: 600 }}>₹{c.totalSpent.toLocaleString('en-IN')}</td>
                    <td style={{ padding: '1rem', fontSize: '0.8125rem', color: 'var(--color-charcoal-light)' }}>{c.lastBooking}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-grey)', fontSize: '0.9375rem' }}>No customers found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
