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
    <footer className="bg-white border-t border-[#f0f0f0]">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-24">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 mb-16 md:mb-20">
          <div className="lg:col-span-2">
            <div className="font-black text-xl tracking-tight mb-6">
              THINK<span className="font-light text-[#999]">FORM</span>
            </div>
            <p className="text-[#999] text-sm leading-relaxed max-w-xs font-medium">
              Creative business thinking, one conversation at a time.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <div className="text-xs font-bold text-[#999] uppercase tracking-widest mb-8">{title}</div>
              <ul className="space-y-4">
                {links.map(l => (
                  <li key={l.href}>
                    <Link 
                      href={l.href} 
                      className="text-sm text-[#666] hover:text-[#111] transition-premium underline-hover"
                    >
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-[#f0f0f0] mb-8 md:mb-10"></div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <p className="text-xs font-medium text-[#999]">
            © {new Date().getFullYear()} THINKFORM. All rights reserved.
          </p>
          <div className="flex items-center gap-8">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs font-medium text-[#999] hover:text-[#111] transition-premium"
            >
              Instagram
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs font-medium text-[#999] hover:text-[#111] transition-premium"
            >
              LinkedIn
            </a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs font-medium text-[#999] hover:text-[#111] transition-premium"
            >
              X / Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
