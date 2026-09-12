'use client';
import { useState } from 'react';
import AdminSidebar from '@/components/AdminSidebar';
import { usePathname } from 'next/navigation';
import { MOCK_BOOKINGS, formatCurrency } from '@/lib/mockData';
import { Search, ExternalLink, RefreshCw, AlertCircle } from 'lucide-react';

export default function AdminPayments() {
  const path = usePathname();
  const [search, setSearch] = useState('');
  
  const transactions = MOCK_BOOKINGS.filter(b => 
    b.customer.toLowerCase().includes(search.toLowerCase()) || 
    b.id.toLowerCase().includes(search.toLowerCase())
  );

  const totalRevenue = MOCK_BOOKINGS.filter(b => b.payment === 'Paid').reduce((sum, b) => sum + b.amount, 0);
  const pendingRevenue = MOCK_BOOKINGS.filter(b => b.payment === 'Pending').reduce((sum, b) => sum + b.amount, 0);

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--color-off-white)' }}>
      <AdminSidebar activePath={path} />
      <div className="admin-main" style={{ flex: 1 }}>
        <div style={{ padding: '1.5rem 2rem', background: 'var(--color-white)', borderBottom: '1px solid var(--color-light-grey)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Payments Management</h1>
            <p style={{ fontSize: '0.8125rem', color: 'var(--color-grey)', marginTop: '0.2rem' }}>Track revenue, pending payments, and refunds.</p>
          </div>
          <div style={{ position: 'relative', width: 280 }}>
            <Search size={14} style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', color: 'var(--color-grey)' }} />
            <input className="input" placeholder="Search transactions…" value={search} onChange={e => setSearch(e.target.value)} style={{ paddingLeft: '2.25rem' }} />
          </div>
        </div>

        <div style={{ padding: '2rem' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
            <div style={{ background: 'var(--color-white)', padding: '1.5rem', border: '1px solid var(--color-light-grey)' }}>
              <p className="label">Total Collected Revenue</p>
              <p style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem', color: '#16a34a' }}>{formatCurrency(totalRevenue)}</p>
            </div>
            <div style={{ background: 'var(--color-white)', padding: '1.5rem', border: '1px solid var(--color-light-grey)' }}>
              <p className="label">Pending Payments</p>
              <p style={{ fontSize: '1.75rem', fontWeight: 800, marginTop: '0.5rem', color: '#d97706' }}>{formatCurrency(pendingRevenue)}</p>
            </div>
            <div style={{ background: 'var(--color-white)', padding: '1.5rem', border: '1px solid var(--color-light-grey)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <p style={{ fontSize: '0.875rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--color-charcoal)' }}>
                <AlertCircle size={16} /> UPI Reconciliation
              </p>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-grey)', marginTop: '0.25rem' }}>All UPI payments must be manually verified in your banking app before confirming bookings.</p>
            </div>
          </div>

          <div style={{ background: 'var(--color-white)', border: '1px solid var(--color-light-grey)', overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: 800 }}>
              <thead>
                <tr style={{ background: 'var(--color-off-white)', borderBottom: '1px solid var(--color-light-grey)' }}>
                  {['Txn ID', 'Customer', 'Date', 'Amount', 'Status', 'Actions'].map(h => (
                    <th key={h} style={{ padding: '0.875rem 1rem', textAlign: 'left', fontSize: '0.6875rem', fontWeight: 700, letterSpacing: '0.1em', color: 'var(--color-grey)', textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {transactions.map(b => (
                  <tr key={b.id} style={{ borderBottom: '1px solid var(--color-light-grey)' }}>
                    <td style={{ padding: '0.875rem 1rem', fontSize: '0.75rem', fontWeight: 600, color: 'var(--color-grey)', fontFamily: 'monospace' }}>TXN-{b.id.split('-')[2]}</td>
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <p style={{ fontSize: '0.875rem', fontWeight: 600 }}>{b.customer}</p>
                      <p style={{ fontSize: '0.75rem', color: 'var(--color-grey)' }}>{b.service}</p>
                    </td>
                    <td style={{ padding: '0.875rem 1rem', fontSize: '0.8125rem', color: 'var(--color-charcoal-light)' }}>{b.date}</td>
                    <td style={{ padding: '0.875rem 1rem', fontSize: '0.875rem', fontWeight: 600 }}>{formatCurrency(b.amount)}</td>
                    <td style={{ padding: '0.875rem 1rem' }}>
                      <span style={{ fontSize: '0.6875rem', fontWeight: 600, padding: '0.2rem 0.5rem', background: b.payment === 'Paid' ? '#f0fdf4' : b.payment === 'Refunded' ? '#fef2f2' : '#fffbeb', color: b.payment === 'Paid' ? '#16a34a' : b.payment === 'Refunded' ? '#dc2626' : '#d97706', border: `1px solid ${b.payment === 'Paid' ? '#bbf7d0' : b.payment === 'Refunded' ? '#fecaca' : '#fde68a'}` }}>
                        {b.payment}
                      </span>
                    </td>
                    <td style={{ padding: '0.875rem 1rem' }}>
                      {b.payment === 'Pending' ? (
                        <button className="btn btn-primary" style={{ padding: '0.375rem 0.75rem', fontSize: '0.6875rem' }} onClick={() => alert('Marking as paid...')}>Verify Payment</button>
                      ) : b.payment === 'Paid' ? (
                        <button className="btn btn-ghost" style={{ padding: '0.375rem 0.75rem', fontSize: '0.6875rem', color: '#ef4444' }} onClick={() => alert('Initiating refund...')}>Issue Refund</button>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {transactions.length === 0 && (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--color-grey)', fontSize: '0.9375rem' }}>No transactions found.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
