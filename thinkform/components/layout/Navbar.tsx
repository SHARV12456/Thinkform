'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'FAQ', href: '/faq' },
  { label: 'About', href: '/about' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if user has admin session cookie
  useEffect(() => {
    const checkAdminSession = () => {
      const cookies = document.cookie.split(';');
      const hasAdminSession = cookies.some(cookie => 
        cookie.trim().startsWith('tf_admin_session=')
      );
      setIsAdmin(hasAdminSession);
    };

    checkAdminSession();
    
    // Re-check when cookie changes
    const interval = setInterval(checkAdminSession, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'bg-white/95 backdrop-blur-sm border-b border-[#f0f0f0]' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="font-black text-lg tracking-tighter text-[#111] hover:opacity-60 transition-premium"
          >
            THINK<span className="font-light">FORM</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-12">
            {navLinks.map(l => (
              <Link 
                key={l.href} 
                href={l.href} 
                className="text-sm font-medium text-[#666] hover:text-[#111] transition-premium underline-hover"
              >
                {l.label}
              </Link>
            ))}
            {isAdmin && (
              <Link 
                href="/admin" 
                className="text-xs font-semibold text-[#999] hover:text-[#C8FF3D] transition-premium px-2 py-1 border border-[#e8e8e5] rounded hover:bg-[#111]/5"
                title="Admin Panel"
              >
                ⚙ Panel
              </Link>
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-[#111] text-white text-sm font-bold rounded-lg hover:bg-[#333] transition-premium"
            >
              Book a Session
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 transition-premium"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span 
              className={`block w-5 h-px bg-[#111] transition-all duration-300 ${
                open ? 'rotate-45 translate-y-2' : ''
              }`} 
            />
            <span 
              className={`block w-5 h-px bg-[#111] transition-all duration-300 ${
                open ? 'opacity-0' : ''
              }`} 
            />
            <span 
              className={`block w-5 h-px bg-[#111] transition-all duration-300 ${
                open ? '-rotate-45 -translate-y-2' : ''
              }`} 
            />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-white flex flex-col transition-all duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="h-20 flex items-center justify-between px-6 border-b border-[#f0f0f0]">
          <Link 
            href="/" 
            className="font-black text-lg tracking-tighter text-[#111]" 
            onClick={() => setOpen(false)}
          >
            THINK<span className="font-light">FORM</span>
          </Link>
          <button 
            onClick={() => setOpen(false)} 
            className="text-2xl text-[#666] hover:text-[#111] transition-premium"
          >
            ✕
          </button>
        </div>
        <nav className="flex flex-col px-6 pt-12 gap-8">
          {navLinks.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="text-2xl font-semibold tracking-tight text-[#111] hover:text-[#666] transition-premium"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          {isAdmin && (
            <Link
              href="/admin"
              className="text-lg font-semibold tracking-tight text-[#C8FF3D] hover:text-[#111] transition-premium ml-2 pt-2 border-t border-[#e8e8e5]"
              onClick={() => setOpen(false)}
            >
              ⚙ Admin Panel
            </Link>
          )}
        </nav>
        <div className="px-6 mt-auto mb-12">
          <Link 
            href="/book" 
            onClick={() => setOpen(false)} 
            className="block w-full text-center py-3.5 bg-[#111] text-white font-semibold text-base rounded-full hover:bg-[#333] transition-premium"
          >
            Book a Session
          </Link>
        </div>
      </div>
    </>
  );
}
