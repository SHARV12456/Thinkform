import Link from 'next/link';

export default function Services() {
  const services = [
    {
      id: 'quick-think',
      title: 'Quick Think',
      price: '₹3,999',
      duration: '60 minutes',
      forWho: 'For one focused problem that needs an outside perspective.',
      benefits: [
        'One main challenge or decision',
        'Structured thinking',
        'Clear assumptions testing',
        'Next step clarity',
        'Immediate direction'
      ]
    },
    {
      id: 'deep-dive',
      title: 'Deep Dive',
      price: '₹7,999',
      duration: '90 minutes',
      forWho: 'For problems that need more time, exploration, and strategic thinking.',
      benefits: [
        'Complex situations',
        'Multiple angles explored',
        'Deeper strategic thinking',
        'Comprehensive perspective',
        'Actionable strategy'
      ],
      featured: true
    },
    {
      id: 'strategy-sprint',
      title: 'Strategy Sprint',
      price: '₹12,999',
      duration: 'Assessment + 90 min session',
      forWho: 'For complex situations requiring deep strategic direction and comprehensive thinking.',
      benefits: [
        'Pre-assessment',
        'Deep strategic analysis',
        'Complex problem solving',
        'Comprehensive clarity',
        'Full strategic direction'
      ]
    }
  ];

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <Link href="/" className="text-sm font-bold text-[#666] hover:text-[#111] transition-premium mb-8 inline-block">
            ← Back
          </Link>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-tight mb-6">
            Choose your session.
          </h1>
          <p className="text-lg md:text-xl text-[#666] font-medium leading-relaxed max-w-2xl">
            All sessions are private 1:1 thinking sessions designed to give you clarity and direction on your specific situation.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {services.map((service) => (
            <div
              key={service.id}
              className={`relative border rounded-lg transition-premium ${
                service.featured
                  ? 'border-[#111] bg-[#111] text-white ring-2 ring-[#111] md:scale-105 md:-my-6'
                  : 'border-[#e8e8e5] bg-white hover:border-[#111]'
              }`}
            >
              <div className="p-8 md:p-10 flex flex-col h-full">
                {service.featured && (
                  <div className="mb-4 text-xs font-bold tracking-widest uppercase">
                    ★ Most Popular
                  </div>
                )}

                <h2 className="text-2xl font-black mb-2">{service.title}</h2>
                <p className={`text-sm font-medium mb-6 ${service.featured ? 'text-[#ccc]' : 'text-[#666]'}`}>
                  {service.duration}
                </p>

                <p className={`text-3xl font-black mb-8 ${service.featured ? 'text-white' : 'text-[#111]'}`}>
                  {service.price}
                </p>

                <p className={`text-base font-medium mb-8 leading-relaxed ${service.featured ? 'text-[#ddd]' : 'text-[#666]'}`}>
                  {service.forWho}
                </p>

                <div className="mb-10 flex-1">
                  <p className={`text-xs font-bold uppercase tracking-widest mb-4 ${service.featured ? 'text-[#999]' : 'text-[#999]'}`}>
                    You get
                  </p>
                  <ul className="space-y-3">
                    {service.benefits.map((benefit, i) => (
                      <li key={i} className={`flex items-start gap-3 text-sm font-medium ${service.featured ? 'text-[#ccc]' : 'text-[#666]'}`}>
                        <span className={service.featured ? 'text-white' : 'text-[#111]'}>✓</span>
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href="/book"
                  className={`block text-center py-3 px-6 font-bold rounded-lg transition-premium ${
                    service.featured
                      ? 'bg-white text-[#111] hover:bg-[#f0f0f0]'
                      : 'bg-[#111] text-white hover:bg-[#333]'
                  }`}
                >
                  Choose {service.title} →
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Comparison Info */}
        <div className="p-10 bg-[#f9f9f7] border border-[#e8e8e5] rounded-lg mb-16">
          <h2 className="text-2xl font-black mb-8 text-[#111]">How to choose</h2>
          <div className="space-y-6">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-[#999] mb-2">Quick Think is best for</p>
              <p className="text-base text-[#666] font-medium">A single decision, problem, or idea you want perspective on. Focused and direct.</p>
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-[#999] mb-2">Deep Dive is best for</p>
              <p className="text-base text-[#666] font-medium">Complex situations needing time and exploration. Multiple angles, deeper thinking. This is our most popular choice.</p>
            </div>
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-[#999] mb-2">Strategy Sprint is best for</p>
              <p className="text-base text-[#666] font-medium">Situations requiring comprehensive analysis. Includes a pre-session assessment to go even deeper.</p>
            </div>
          </div>
        </div>

        {/* Next Step CTA */}
        <div className="text-center">
          <Link
            href="/book"
            className="inline-block px-8 py-4 bg-[#111] text-white font-bold rounded-lg hover:bg-[#333] transition-premium text-lg"
          >
            Book Your Session →
          </Link>
          <p className="text-sm text-[#999] font-medium mt-6">
            Questions? <Link href="/faq" className="text-[#111] font-bold hover:text-[#666] transition-premium">See our FAQ</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
