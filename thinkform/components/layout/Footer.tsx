import Link from 'next/link';

const footerLinks = {
  Services: [
    { label: 'Quick Think', href: '/book' },
    { label: 'Deep Dive', href: '/book' },
    { label: 'Strategy Sprint', href: '/book' },
  ],
  Explore: [
    { label: 'How It Works', href: '/#how-it-works' },
    { label: 'FAQ', href: '/faq' },
    { label: 'About', href: '/about' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-[#f9f9f7] border-t border-[#e8e8e5]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16 md:py-20">
        {/* Top */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-16 mb-12 md:mb-16">
          <div className="md:col-span-1">
            <div className="font-black text-lg tracking-tight mb-4">
              THINK<span className="font-light text-[#999]">FORM</span>
            </div>
            <p className="text-[#999] text-sm leading-relaxed font-medium">
              Premium 1:1 thinking sessions for clarity and direction.
            </p>
          </div>
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <div className="text-xs font-bold text-[#999] uppercase tracking-widest mb-6">{title}</div>
              <ul className="space-y-3">
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
        <div className="h-px bg-[#e8e8e5] mb-8 md:mb-10"></div>

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
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
