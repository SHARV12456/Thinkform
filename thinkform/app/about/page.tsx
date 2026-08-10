export default function About() {
  return (
    <div className="pt-32 pb-24 px-6 bg-[#111] text-white min-h-screen">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-12">
          I like figuring out why something could work.
        </h1>
        
        <div className="space-y-8 text-lg md:text-xl text-[#ccc] font-medium leading-relaxed mb-20">
          <p>
            I've always been obsessed with how businesses are put together. Not the corporate spreadsheets or the generic SaaS templates, but the mechanics of a good idea.
          </p>
          <p>
            Most people have decent ideas, but they get stuck in the execution phase because they look at what everyone else is doing and try to copy it.
          </p>
          <p>
            My strength is naturally creative thinking. I see business opportunities where others see constraints. I question conventional approaches, connect seemingly unrelated ideas, and help people find alternative business models that actually fit their strengths.
          </p>
          <p className="text-white font-bold text-2xl border-l-4 border-white pl-6 my-12">
            "You don't need me to tell you what everyone else is doing.<br/>
            You need me to ask why you couldn't do it differently."
          </p>
          <p>
            This consultancy isn't about giving you a generic framework. It's about sitting down 1:1, looking at your messy, half-formed thought, and stripping it down to its core to see if there's a real business hiding inside.
          </p>
        </div>

        <div className="border-t border-[#333] pt-12">
          <h2 className="text-sm font-bold text-[#888] uppercase tracking-widest mb-6">Core Focus Areas</h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {['Unconventional Positioning', 'Creative Monetization', 'Idea Validation', 'Strength-based Strategy', 'Alternative Business Models', 'Clarity & Decision Making'].map(item => (
              <li key={item} className="flex items-center gap-3 font-semibold text-[#ddd]">
                <span className="text-[#555]">✦</span> {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
