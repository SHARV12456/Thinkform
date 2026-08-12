'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const navLinks = [
  { label: 'Pricing', href: '/#identify' },
  { label: 'Testimonials', href: '/testimonials' },
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
          scrolled
            ? 'bg-white/90 backdrop-blur-md border-b border-[#e8e5df]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link 
            href="/" 
            className="font-black text-lg tracking-[-0.06em] text-[#111] hover:opacity-70 transition-premium"
          >
            THINK<span className="font-light text-[#999]">FORM</span>
          </Link>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map(l => (
              <Link 
                key={l.href} 
                href={l.href} 
                className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#666] hover:text-[#111] transition-premium underline-hover"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          <div className="hidden md:block">
            <Link
              href="/book"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#111] text-white text-[11px] font-bold uppercase tracking-[0.12em] rounded-xl hover:bg-[#333] transition-premium shadow-[0_8px_18px_rgba(17,17,17,0.12)]"
            >
              Book a Session
            </Link>
          </div>

          <button
            className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 transition-premium"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-px bg-[#111] transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-px bg-[#111] transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-[#111] transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </header>

      <div 
        className={`fixed inset-0 z-40 bg-white flex flex-col transition-all duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="h-20 flex items-center justify-between px-6 border-b border-[#f0f0f0]">
          <Link 
            href="/" 
            className="font-black text-lg tracking-[-0.06em] text-[#111]" 
            onClick={() => setOpen(false)}
          >
            THINK<span className="font-light text-[#999]">FORM</span>
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
        </nav>
        <div className="px-6 mt-auto mb-12">
          <Link 
            href="/book" 
            onClick={() => setOpen(false)} 
            className="block w-full text-center py-3.5 bg-[#111] text-white font-semibold text-base rounded-xl hover:bg-[#333] transition-premium"
          >
            Book a Session
          </Link>
        </div>
      </div>
    </>
  );
}
