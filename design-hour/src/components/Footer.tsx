'use client';
import Link from 'next/link';
import TrustBar from './TrustBar';
import { useState } from 'react';

const footerGroups = {
  Site: [
    { label: 'Landing', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Process', href: '/process' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '/about' },
    { label: 'Design Consultation Mumbai', href: '/design-consultation-mumbai' },
  ],
  Info: [
    { label: 'FAQ', href: '/faq' },
    { label: 'Privacy', href: '/privacy' },
    { label: 'Terms', href: '/terms' },
    { label: 'Cancellation', href: '/cancellation-policy' },
  ],
  Book: [
    { label: 'Book a session', href: '/book' },
  ],
};

const commercialLinks = [
  { label: 'Mumbai', href: '/mumbai' },
  { label: 'Home', href: '/' },
];

export default function Footer() {
  const year = new Date().getFullYear();

  const [openGroup, setOpenGroup] = useState<string | null>(null);

  const toggleGroup = (key: string) => setOpenGroup((cur) => (cur === key ? null : key));

  return (
    <footer className="taas-footer">
      <TrustBar variant="light" />

      <div className="taas-container taas-footer-inner">
        <div className="taas-footer-hero">
          <div>
            <div className="taas-footer-eyebrow">GOOD DESIGN STARTS WITH THE RIGHT QUESTION.</div>
            <h2 className="taas-footer-statement">Talk to a designer before you commit to the wrong decision.</h2>
            <Link href="/book" className="taas-cta taas-footer-cta">BOOK A SESSION ↗</Link>
          </div>

          <div className="taas-footer-brand-block">
            <Link href="/" className="taas-brand">TAAS<span>®</span></Link>
            <div className="taas-footer-description">Interior Design Consultation</div>
            <Link href="https://wa.me/919999999999" className="taas-secondary-btn" target="_blank" rel="noreferrer">WhatsApp ↗</Link>
          </div>
        </div>

        <div className="taas-footer-columns">
          <div className="taas-footer-col">
            <h4>SITE</h4>
            <nav aria-label="Site navigation">
              {footerGroups.Site.map((l) => (
                <Link key={l.href} href={l.href}>{l.label}</Link>
              ))}
            </nav>
          </div>

          <div className="taas-footer-col">
            <h4>INFO</h4>
            <nav aria-label="Info navigation">
              {footerGroups.Info.map((l) => (
                <Link key={l.href} href={l.href}>{l.label}</Link>
              ))}
            </nav>
          </div>

          <div className="taas-footer-col">
            <h4>SERVICES</h4>
            <nav aria-label="Services navigation">
              {footerGroups.Site.filter(s => s.href.includes('services') || s.href.includes('design-consultation-mumbai')).map((l) => (
                <Link key={l.href} href={l.href}>{l.label}</Link>
              ))}
              {commercialLinks.map((l) => (
                <Link key={l.href} href={l.href}>{l.label}</Link>
              ))}
            </nav>
          </div>

          <div className="taas-footer-col taas-footer-location">
            <h4>LOCATION</h4>
            <div>Mumbai · India</div>
          </div>
        </div>

        {/* Mobile accordion fallback */}
        <div className="taas-footer-accordions" aria-hidden={false}>
          {Object.entries({ SITE: footerGroups.Site, INFO: footerGroups.Info, SERVICES: [...footerGroups.Site.filter(s=>s.href.includes('services')||s.href.includes('design-consultation-mumbai')), ...commercialLinks.map(c=>({label:c.label, href:c.href}))] }).map(([key, links]) => (
            <div key={key} className="taas-footer-accordion">
              <button className="taas-footer-accordion-toggle" onClick={() => toggleGroup(key)} aria-expanded={openGroup === key} aria-controls={`footer-${key}`}>
                <span>{key}</span>
                <span aria-hidden="true">{openGroup === key ? '−' : '+'}</span>
              </button>

              <div id={`footer-${key}`} className={`taas-footer-accordion-panel ${openGroup === key ? 'is-open' : ''}`}>
                {links.map((l: any) => (
                  <Link key={l.href} href={l.href} className="taas-footer-accordion-link">{l.label}</Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="taas-footer-bottom">
          <div className="taas-footer-meta">
            <div>© {year} TAAS®</div>
            <div>All rights reserved.</div>
          </div>

          <nav className="taas-footer-legal" aria-label="Legal information">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/cancellation-policy">Cancellation</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
