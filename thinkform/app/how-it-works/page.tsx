import { Button } from '@/components/ui/Button';

export default function HowItWorks() {
  const steps = [
    {
      num: '01',
      title: 'Bring the idea.',
      desc: 'It can be messy. You don\'t need a deck, a plan, or a spreadsheet. Just bring the thought.'
    },
    {
      num: '02',
      title: 'Talk it through.',
      desc: 'We challenge and explore it together. We look at it from angles you haven\'t considered.'
    },
    {
      num: '03',
      title: 'Find the angle.',
      desc: 'Identify what could actually make it work. Differentiation, positioning, and opportunity.'
    },
    {
      num: '04',
      title: 'Leave with direction.',
      desc: 'Know exactly what to do next. No fluff. Just clear, strategic next steps.'
    }
  ];

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8">How it works.</h1>
        <p className="text-xl md:text-2xl text-[#555] font-medium leading-relaxed mb-20 max-w-2xl">
          Four simple steps to get from a messy thought to a clear strategic direction.
        </p>

        <div className="relative border-l-2 border-[#e8e8e5] ml-4 md:ml-8 space-y-16 pb-16">
          {steps.map((step, i) => (
            <div key={i} className="relative pl-10 md:pl-16">
              <div className="absolute left-[-21px] top-1 w-10 h-10 bg-white border-2 border-[#111] rounded-full flex items-center justify-center font-black text-sm text-[#111]">
                {step.num}
              </div>
              <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-4">{step.title}</h2>
              <p className="text-lg text-[#555] font-medium leading-relaxed max-w-xl">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-[#111] text-white p-10 md:p-16 rounded-[2rem] text-center">
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter mb-6">Ready to start?</h2>
          <p className="text-[#888] font-medium text-lg mb-8 max-w-md mx-auto">
            Book a session and let's figure out the angle.
          </p>
          <Button href="/book" variant="secondary" className="px-8 py-4">Book a Session</Button>
        </div>
      </div>
    </div>
  );
}
