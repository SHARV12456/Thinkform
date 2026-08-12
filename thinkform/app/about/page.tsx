export default function About() {
  return (
    <div className="pt-32 pb-24 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto">
        <div className="mb-16">
          <a href="/" className="text-sm font-bold text-[#666] hover:text-[#111] transition-premium">
            ← Back
          </a>
        </div>

        <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-tight mb-12">
          About ThinkForm
        </h1>
        
        <div className="space-y-8 text-lg text-[#666] font-medium leading-relaxed mb-16">
          <p>
            ThinkForm was created by someone obsessed with how people think through problems. Not the corporate consulting approach. Not generic frameworks. Just real thinking.
          </p>
          <p>
            Most people have good ideas. But they get stuck deciding whether to pursue them, how to position them, or which direction to take. They need someone to sit with them and think through it clearly.
          </p>
          <p className="text-xl text-[#111] font-bold leading-relaxed">
            Your thinking is worth something.
            <br />
            Sometimes you just need a good thinking partner.
          </p>
          <p>
            That's what ThinkForm is. Not a platform. Not a software. Not a subscription. Just a focused 1:1 session designed to help you see your situation more clearly and decide what comes next.
          </p>
        </div>

        {/* Core Values */}
        <div className="bg-[#f9f9f7] border border-[#e8e8e5] rounded-lg p-10 mb-16">
          <h2 className="text-sm font-bold text-[#999] uppercase tracking-widest mb-8">How ThinkForm Works</h2>
          <div className="space-y-6">
            {[
              {
                title: 'You bring the messy version',
                desc: 'No need to have it figured out. Bring the idea, problem or decision as it actually is.'
              },
              {
                title: 'We think through it together',
                desc: 'Challenge assumptions. Explore new angles. Test against reality. Find clarity.'
              },
              {
                title: 'You leave with direction',
                desc: 'Clear on what to do next. What actually matters. What you should stop worrying about.'
              }
            ].map((item, i) => (
              <div key={i}>
                <p className="font-bold text-[#111] mb-2">{item.title}</p>
                <p className="text-[#666]">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Why ThinkForm */}
        <div className="mb-16">
          <h2 className="text-2xl font-black mb-8 text-[#111]">Why ThinkForm exists</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#999] mb-3">NOT</p>
              <ul className="space-y-2">
                {[
                  'Generic consulting templates',
                  'One-size-fits-all advice',
                  'Unnecessary complexity',
                  'A new app or platform'
                ].map((item, i) => (
                  <li key={i} className="text-[#666] font-medium flex items-start gap-2">
                    <span className="shrink-0 text-[#ccc]">×</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-[#111] mb-3">THIS</p>
              <ul className="space-y-2">
                {[
                  'Real thinking',
                  'Your specific situation',
                  'Simplicity that works',
                  'Just a good session'
                ].map((item, i) => (
                  <li key={i} className="text-[#111] font-medium flex items-start gap-2">
                    <span className="shrink-0">→</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center pt-12 border-t border-[#e8e8e5]">
          <a
            href="/book"
            className="inline-block px-8 py-4 bg-[#111] text-white font-bold rounded-lg hover:bg-[#333] transition-premium"
          >
            Book a Session →
          </a>
        </div>
      </div>
    </div>
  );
}
