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
    <div className="admin-sidebar-inner">
      {/* Logo */}
      <div className="admin-sidebar-header">
        <Link href="/" className="admin-logo-link">
          <span className="admin-logo">TAAS</span>
          <span className="admin-logo-sub">ADMIN</span>
        </Link>
        <button className="admin-close-btn lg:hidden" onClick={() => setMobileOpen(false)} aria-label="Close sidebar">
          <X size={18} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="admin-nav">
        {SIDEBAR_LINKS.map((link) => {
          const Icon = link.icon;
          const isActive = activePath === link.href || activePath.startsWith(link.href + '/');
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`admin-nav-link ${isActive ? 'is-active' : ''}`}
            >
              <Icon size={15} />
              {link.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom */}
      <div className="admin-sidebar-bottom">
        <button onClick={handleLogout} className="admin-logout-btn">
          <LogOut size={15} />
          Sign Out
        </button>
        <p className="admin-note">FRONTEND DEMO · DATA IS MOCK</p>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="admin-sidebar admin-hidden-mobile">
        {/* hidden by the CSS class approach; we use lg:block */}
      </aside>

      {/* Always-visible sidebar for large screens */}
      <aside className="admin-sidebar admin-desktop">
        {sidebarContent}
      </aside>

      {/* Mobile toggle button */}
      <button onClick={() => setMobileOpen(true)} className="admin-mobile-toggle" aria-label="Open admin sidebar">
        <Menu size={18} />
      </button>
    </>
  );
}
