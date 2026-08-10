'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Ideas', href: '/ideas' },
  { label: 'Services', href: '/services' },
  { label: 'How It Works', href: '/how-it-works' },
  { label: 'Free Guide', href: '/guide' },
  { label: 'About', href: '/about' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-[#F5F5F3]/95 backdrop-blur-md border-b border-[#e8e8e5]' : 'bg-transparent'
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-black text-xl tracking-tighter text-[#111] hover:opacity-70 transition-opacity">
            THINK<span className="font-light">FORM</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map(l => (
              <Link key={l.href} href={l.href} className="text-sm font-medium text-[#555] hover:text-[#111] transition-colors underline-hover">
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111] text-white text-sm font-semibold rounded-full hover:bg-[#333] transition-colors"
            >
              Book a Session
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-px bg-[#111] transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-px bg-[#111] transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-[#111] transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-40 bg-[#F5F5F3] flex flex-col transition-all duration-500 ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="h-16 flex items-center justify-between px-6 border-b border-[#e8e8e5]">
          <Link href="/" className="font-black text-xl tracking-tighter text-[#111]" onClick={() => setOpen(false)}>
            THINK<span className="font-light">FORM</span>
          </Link>
          <button onClick={() => setOpen(false)} className="text-2xl text-[#555]">✕</button>
        </div>
        <nav className="flex flex-col px-6 pt-12 gap-6">
          {navLinks.map(l => (
            <Link
              key={l.href}
              href={l.href}
              className="text-3xl font-black tracking-tighter text-[#111] hover:text-[#555] transition-colors"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="px-6 mt-auto mb-12">
          <Link href="/book" onClick={() => setOpen(false)} className="block w-full text-center py-4 bg-[#111] text-white font-bold text-lg rounded-2xl hover:bg-[#333] transition-colors">
            Book a Session
          </Link>
        </div>
      </div>
    </>
  );
}
