import { ServiceCTA } from './ServiceCTA';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return [
    { id: 'idea-session' },
    { id: 'business-brainstorm' },
    { id: 'business-reset' },
    { id: 'strategy-session' },
  ];
}

const serviceDetails: Record<string, any> = {
  'idea-session': {
    title: 'Idea Session',
    price: '₹3,999',
    duration: '60-minute 1:1 session',
    forWho: 'For people who have an idea but don\'t know whether it is worth pursuing.',
    weDiscuss: ['Is the core premise viable?', 'Who is the actual customer?', 'What are the immediate red flags?', 'How can it be differentiated?'],
    youBring: 'A rough idea, some initial thoughts, and an open mind. Messy notes are fine.',
    youLeaveWith: 'A clear verdict on whether to pursue it, pivot it, or drop it, plus the exact next 3 steps to take.'
  },
  'business-brainstorm': {
    title: 'Business Brainstorm',
    price: '₹5,999',
    duration: '60-minute 1:1 session',
    forWho: 'For people who want to start something but need fresh business opportunities.',
    weDiscuss: ['Your unfair advantages and skills', 'Underserved market niches', 'Unconventional business models', 'Low-friction entry points'],
    youBring: 'An understanding of your own skills, interests, and capital constraints.',
    youLeaveWith: '3-5 concrete business directions tailored to your strengths.'
  },
  'business-reset': {
    title: 'Business Reset',
    price: '₹12,999',
    duration: 'Deep review + 1:1 session',
    forWho: 'For existing businesses that feel stuck, stagnant, or unaligned.',
    weDiscuss: ['Why growth has stalled', 'Pricing and offer restructuring', 'Positioning shifts', 'New revenue channels'],
    youBring: 'Your current business metrics, offers, and the specific bottlenecks you are facing.',
    youLeaveWith: 'A complete strategic reset plan focusing on the highest leverage changes you can make immediately.'
  },
  'strategy-session': {
    title: '1:1 Strategy Session',
    price: '₹7,999',
    duration: '90-minute strategy session',
    forWho: 'A deeper private conversation around a specific business challenge.',
    weDiscuss: ['Your specific roadblock', 'Tactical problem solving', 'Custom frameworks', 'Direct, unfiltered feedback'],
    youBring: 'A specific problem or decision you are wrestling with.',
    youLeaveWith: 'Clarity, a decision framework, and a tactical action plan to execute.'
  }
};

export default async function ServiceDetail({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const service = serviceDetails[resolvedParams.id];
  
  if (!service) return notFound();

  return (
    <div className="pt-32 pb-24 px-6 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="mb-16">
          <div className="text-sm font-bold text-[#888] uppercase tracking-widest mb-4">{service.duration} · {service.price}</div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">{service.title}.</h1>
          <p className="text-xl md:text-2xl text-[#111] font-medium leading-relaxed">{service.forWho}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div>
            <h3 className="text-lg font-black tracking-tight mb-4 border-b border-[#e8e8e5] pb-4">What we discuss</h3>
            <ul className="space-y-4">
              {service.weDiscuss.map((item: string, i: number) => (
                <li key={i} className="flex items-start gap-3 text-[#555] font-medium">
                  <span className="text-[#111]">→</span> {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="space-y-12">
            <div>
              <h3 className="text-lg font-black tracking-tight mb-4 border-b border-[#e8e8e5] pb-4">What you should bring</h3>
              <p className="text-[#555] font-medium leading-relaxed">{service.youBring}</p>
            </div>
            <div>
              <h3 className="text-lg font-black tracking-tight mb-4 border-b border-[#e8e8e5] pb-4">What you leave with</h3>
              <p className="text-[#111] font-bold leading-relaxed">{service.youLeaveWith}</p>
            </div>
          </div>
        </div>

        <div className="bg-[#F5F5F3] p-10 rounded-[2rem] text-center">
          <h2 className="text-2xl font-black tracking-tight mb-6">Ready to book this session?</h2>
          <ServiceCTA title={service.title} />
        </div>
      </div>
    </div>
  );
}
