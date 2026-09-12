'use client';
import Link from 'next/link';
import TrustBar from './TrustBar';

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
    { label: 'Commercial', href: '/commercial' },
    { label: 'Mumbai', href: '/mumbai' },
    { label: 'Home', href: '/' },
  ],
};

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="taas-footer">
      <TrustBar variant="light" />

      <div className="taas-footer-inner">
        <div className="taas-footer-top">
          <div className="taas-footer-brand">
            <Link href="/" className="taas-brand">TAAS<span>®</span></Link>
            <p>Design decision support for homes and businesses before the build, spend or commitment.</p>
          </div>

          {Object.entries(footerGroups).map(([group, links]) => (
            <div key={group} className="taas-footer-links">
              <h4>{group}</h4>
              {links.map((link) => (
                <Link key={`${group}-${link.href}`} href={link.href}>{link.label}</Link>
              ))}
            </div>
          ))}
        </div>

        <div className="taas-footer-bottom">
          <span>© {year} TAAS</span>
          <span>Mumbai, India</span>
        </div>
      </div>
    </footer>
  );
}
