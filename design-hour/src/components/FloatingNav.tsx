"use client";
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function FloatingNav() {
  const [active, setActive] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setActive(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav className="taas-floating-nav" data-active={active} aria-label="Main navigation">
        <Link href="/" className="taas-floating-nav__brand">
          TAAS
        </Link>

        <div className="taas-floating-nav__links">
          <Link href="/#work">WORK</Link>
          <Link href="/#consultation">CONSULTATION</Link>
          <Link href="/#about">ABOUT</Link>
        </div>

        <Link href="/book" className="taas-floating-nav__cta">
          START A CONVERSATION →
        </Link>

        <button
          className="taas-floating-nav__hamburger"
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          type="button"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <div className={`taas-mobile-nav ${mobileOpen ? 'open' : ''}`} role="dialog" aria-modal={mobileOpen}>
        <div className="taas-mobile-nav__inner">
          <div className="taas-mobile-nav__header">
            <Link href="/" className="taas-floating-nav__brand" onClick={() => setMobileOpen(false)}>
              TAAS
            </Link>
            <button className="taas-mobile-nav__close" aria-label="Close menu" onClick={() => setMobileOpen(false)}>
              <X size={20} />
            </button>
          </div>

          <nav className="taas-mobile-nav__links">
            <Link href="/#work" onClick={() => setMobileOpen(false)}>WORK</Link>
            <Link href="/#consultation" onClick={() => setMobileOpen(false)}>CONSULTATION</Link>
            <Link href="/#about" onClick={() => setMobileOpen(false)}>ABOUT</Link>
            <Link href="/book" className="taas-mobile-nav__cta" onClick={() => setMobileOpen(false)}>
              START A CONVERSATION
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
