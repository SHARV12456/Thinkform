'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Calendar,
  BookOpen,
  Users,
  Settings,
  Package,
  DollarSign,
  BarChart2,
  LogOut,
  Menu,
  X,
  Megaphone,
  MessageSquare,
  MapPin,
  Search as SearchIcon,
  CreditCard,
  Clock,
} from 'lucide-react';

const SIDEBAR_LINKS = [
  { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Bookings', href: '/admin/bookings', icon: BookOpen },
  { label: 'Calendar', href: '/admin/calendar', icon: Calendar },
  { label: 'Consultations', href: '/admin/consultations', icon: MessageSquare },
  { label: 'Live Timer', href: '/admin/timer', icon: Clock },
  { label: 'Customers', href: '/admin/customers', icon: Users },
  { label: 'Services', href: '/admin/services', icon: Package },
  { label: 'Pricing', href: '/admin/pricing', icon: DollarSign },
  { label: 'Landing Page', href: '/admin/landing', icon: Megaphone },
  { label: 'Locations', href: '/admin/locations', icon: MapPin },
  { label: 'SEO Config', href: '/admin/seo', icon: SearchIcon },
  { label: 'Payments', href: '/admin/payments', icon: CreditCard },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart2 },
  { label: 'Settings', href: '/admin/settings', icon: Settings },
];

interface AdminSidebarProps {
  activePath: string;
}

export default function AdminSidebar({ activePath }: AdminSidebarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push('/admin/login');
    router.refresh();
  };

  const sidebarContent = (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflowY: 'auto',
      }}
    >
      {/* Logo */}
      <div
        style={{
          padding: '1.5rem',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span
            style={{
              fontSize: '0.9375rem',
              fontWeight: 800,
              letterSpacing: '0.1em',
              color: 'var(--color-white)',
            }}
          >
            TAAS
          </span>
          <span
            style={{
              display: 'block',
              fontSize: '0.625rem',
              letterSpacing: '0.12em',
              color: 'rgba(255,255,255,0.4)',
              marginTop: '2px',
            }}
          >
            ADMIN
          </span>
        </Link>
        <button
          className="lg:hidden"
          onClick={() => setMobileOpen(false)}
          style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}
        >
          <X size={18} />
        </button>
      </div>

      {/* Navigation */}
      <nav style={{ padding: '1rem 0', flex: 1 }}>
        {SIDEBAR_LINKS.map((link) => {
          const Icon = link.icon;
          const isActive = activePath === link.href || activePath.startsWith(link.href + '/');
          return (
            <Link
              key={link.href}
              href={link.href}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '0.625rem 1.5rem',
                fontSize: '0.8125rem',
                fontWeight: isActive ? 600 : 400,
                color: isActive ? 'var(--color-white)' : 'rgba(255,255,255,0.5)',
                textDecoration: 'none',
                background: isActive ? 'rgba(255,255,255,0.08)' : 'transparent',
                borderLeft: isActive ? '2px solid var(--color-white)' : '2px solid transparent',
                transition: 'all 0.2s ease',
              }}
            >
              <Icon size={15} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
        <button
          onClick={handleLogout}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontSize: '0.8125rem',
            color: 'rgba(255,255,255,0.4)',
            padding: '0.5rem 0',
            marginBottom: '0.5rem',
          }}
        >
          <LogOut size={15} />
          Sign Out
        </button>
        <p style={{ fontSize: '0.625rem', color: 'rgba(255,255,255,0.25)', letterSpacing: '0.08em' }}>
          FRONTEND DEMO · DATA IS MOCK
        </p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="admin-sidebar" style={{ display: 'none' }}>
        {/* hidden by the CSS class approach; we use lg:block */}
      </aside>

      {/* Always-visible sidebar for large screens */}
      <aside
        className="admin-sidebar"
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        {sidebarContent}
      </aside>

      {/* Mobile toggle button */}
      <button
        onClick={() => setMobileOpen(true)}
        style={{
          position: 'fixed',
          top: '1rem',
          left: '1rem',
          zIndex: 60,
          background: 'var(--color-black)',
          color: 'var(--color-white)',
          border: 'none',
          cursor: 'pointer',
          padding: '0.5rem',
          display: 'none',
        }}
        className="lg-hidden-mobile-menu"
        aria-label="Open admin sidebar"
      >
        <Menu size={18} />
      </button>
    </>
  );
}
