import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-[#faf8f5] border-t border-[#e8e3da]">
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
        {/* Top section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16 md:mb-20">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="font-black text-lg tracking-tight mb-4">
              THINK<span className="font-light text-[#9a9186]">FORM</span>
            </div>
            <p className="text-[#756f68] text-sm leading-relaxed font-medium mb-6 max-w-xs">
              Premium 1:1 thinking sessions for people building, deciding, or figuring something out.
            </p>
          </div>

          {/* Services */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#9a9186] mb-6 pb-4 border-b border-[#e8e3da]">Services</p>
            <ul className="space-y-3">
              {[
                { label: 'Quick Think', href: '/book', price: '₹3,999' },
                { label: 'Deep Dive', href: '/book', price: '₹7,999' },
                { label: 'Strategy Sprint', href: '/book', price: '₹12,999' }
              ].map(l => (
                <li key={l.href}>
                  <Link 
                    href={l.href}
                    className="text-sm text-[#756f68] hover:text-[#171717] transition-all flex items-center justify-between group"
                  >
                    <span className="group-hover:font-bold">{l.label}</span>
                    <span className="text-xs font-bold text-[#9a9186]">{l.price}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-[#9a9186] mb-6 pb-4 border-b border-[#e8e3da]">Explore</p>
            <ul className="space-y-3">
              {[
                { label: 'How It Works', href: '/#identify' },
                { label: 'Testimonials', href: '/testimonials' },
                { label: 'Social Proof', href: '/social-proof' }
              ].map(l => (
                <li key={l.href}>
                  <Link 
                    href={l.href}
                    className="text-sm text-[#756f68] hover:text-[#171717] transition-all font-medium"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#e8e3da] mb-8 md:mb-12"></div>

        {/* Bottom section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-xs font-medium text-[#9a9186]">
              © {new Date().getFullYear()} THINKFORM. Think better. Move forward.
            </p>
            <div className="mt-4 flex items-center gap-4">
              <Link href="/privacy" className="text-xs font-medium text-[#9a9186] hover:text-[#171717] transition-all">Privacy</Link>
              <span className="text-[#d5cfc3]">·</span>
              <Link href="/terms" className="text-xs font-medium text-[#9a9186] hover:text-[#171717] transition-all">Terms</Link>
              <span className="text-[#d5cfc3]">·</span>
              <Link href="/admin" className="text-xs font-medium text-[#9a9186] hover:text-[#171717] transition-all">Admin</Link>
            </div>
          </div>

          {/* Social links */}
          <div className="flex items-center gap-4 md:justify-end">
            <a 
              href="#" 
              className="text-xs font-medium text-[#9a9186] hover:text-[#171717] transition-all"
            >
              Instagram
            </a>
            <span className="text-[#d5cfc3]">·</span>
            <a 
              href="#" 
              className="text-xs font-medium text-[#9a9186] hover:text-[#171717] transition-all"
            >
              LinkedIn
            </a>
            <span className="text-[#d5cfc3]">·</span>
            <a 
              href="#" 
              className="text-xs font-medium text-[#9a9186] hover:text-[#171717] transition-all"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
