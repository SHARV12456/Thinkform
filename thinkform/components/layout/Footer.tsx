import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#f9f9f7] border-t border-[#e8e8e5]">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
        {/* Top section */}
        <div className="grid grid-cols-1  md:grid-cols-5 gap-12 md:gap-8 mb-16 md:mb-20">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="font-black text-lg tracking-tight mb-4">
              THINK<span className="font-light text-[#999]">FORM</span>
            </div>
            <p className="text-[#666] text-sm leading-relaxed font-medium mb-6 max-w-xs">
              Premium 1:1 thinking sessions for founders, creators, and business builders who need clarity.
            </p>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#999]">
              Think better. Move forward.
            </p>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#999] mb-6 pb-4 border-b border-[#e8e8e5]">Services</p>
            <ul className="space-y-3">
              {[
                { label: 'Quick Think', href: '/book', price: '₹3,999' },
                { label: 'Deep Dive', href: '/book', price: '₹7,999' },
                { label: 'Strategy Sprint', href: '/book', price: '₹12,999' }
              ].map(l => (
                <li key={l.href}>
                  <Link 
                    href={l.href}
                    className="text-sm text-[#666] hover:text-[#111] transition-premium flex items-center justify-between group"
                  >
                    <span className="group-hover:underline">{l.label}</span>
                    <span className="text-xs font-bold text-[#999]">{l.price}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#999] mb-6 pb-4 border-b border-[#e8e8e5]">Explore</p>
            <ul className="space-y-3">
              {[
                { label: 'How It Works', href: '/#how-it-works' },
                { label: 'Testimonials', href: '/testimonials' },
                { label: 'Social Proof', href: '/social-proof' },
                { label: 'FAQ', href: '/faq' },
                { label: 'About', href: '/about' }
              ].map(l => (
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

          {/* Admin */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#999] mb-6 pb-4 border-b border-[#e8e8e5]">Admin</p>
            <Link
              href="/admin"
              className="text-sm font-semibold text-[#666] hover:text-[#111] transition-premium hover:underline block mb-6"
            >
              Admin Login
            </Link>
            <p className="text-xs text-[#999] font-medium">
              Private access for admins only.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#e8e8e5] mb-8 md:mb-12"></div>

        {/* Bottom section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-xs font-medium text-[#999]">
              © {new Date().getFullYear()} THINKFORM. All rights reserved.
            </p>
            <div className="mt-4 flex items-center gap-4">
              <Link href="#" className="text-xs font-medium text-[#999] hover:text-[#111] transition-premium">Privacy</Link>
              <span className="text-[#ddd]">•</span>
              <Link href="#" className="text-xs font-medium text-[#999] hover:text-[#111] transition-premium">Terms</Link>
            </div>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-6 md:justify-end">
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs font-semibold text-[#999] hover:text-[#111] transition-premium uppercase tracking-widest"
            >
              Instagram
            </a>
            <span className="text-[#ddd]">•</span>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs font-semibold text-[#999] hover:text-[#111] transition-premium uppercase tracking-widest"
            >
              LinkedIn
            </a>
            <span className="text-[#ddd]">•</span>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-xs font-semibold text-[#999] hover:text-[#111] transition-premium uppercase tracking-widest"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
