import Link from 'next/link';

const footerLinks = {
  Services: [
    { label: 'Idea Session', href: '/services/idea-session' },
    { label: 'Business Brainstorm', href: '/services/business-brainstorm' },
    { label: 'Business Reset', href: '/services/business-reset' },
    { label: 'Strategy Session', href: '/services/strategy-session' },
  ],
  Explore: [
    { label: 'Ideas', href: '/ideas' },
    { label: 'How It Works', href: '/how-it-works' },
    { label: 'Free Guide', href: '/guide' },
    { label: 'About', href: '/about' },
    { label: 'FAQ', href: '/faq' },
    { label: 'Contact', href: '/contact' },
    { label: 'Admin Portal', href: '/admin' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#111] text-white">
      <div className="max-w-6xl mx-auto px-6 py-20">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-2">
            <div className="font-black text-2xl tracking-tighter mb-4">
              THINK<span className="font-light text-[#888]">FORM</span>
            </div>
            <p className="text-[#888] text-sm leading-relaxed max-w-xs">
              Creative business thinking, one conversation at a time.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <div className="text-xs font-bold text-[#555] uppercase tracking-widest mb-4">{title}</div>
              <ul className="space-y-3">
                {links.map(l => (
                  <li key={l.href}>
                    <Link href={l.href} className="text-sm text-[#888] hover:text-white transition-colors underline-hover">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="border-t border-[#222] pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-xs text-[#555]">
            © {new Date().getFullYear()} THINKFORM. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-xs text-[#555] hover:text-white transition-colors">
              Instagram
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-xs text-[#555] hover:text-white transition-colors">
              LinkedIn
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-xs text-[#555] hover:text-white transition-colors">
              X / Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
