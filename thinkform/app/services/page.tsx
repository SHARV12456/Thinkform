import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function Services() {
  const services = [
    {
      id: 'idea-session',
      title: 'IDEA SESSION',
      price: '₹3,999',
      duration: '60-minute 1:1 session',
      forWho: 'For people who have an idea but don\'t know whether it is worth pursuing.',
      includes: ['Idea exploration', 'Business model thinking', 'Opportunity identification', 'Target customer thinking', 'Differentiation', 'Monetization possibilities', 'Next-step recommendation']
    },
    {
      id: 'business-brainstorm',
      title: 'BUSINESS BRAINSTORM',
      price: '₹5,999',
      duration: '60-minute 1:1 session',
      forWho: 'For people who want fresh business opportunities.',
      includes: ['Multiple business directions', 'Creative concepts', 'Market opportunities', 'Revenue possibilities', 'Strength-based ideas', 'Concept comparison']
    },
    {
      id: 'business-reset',
      title: 'BUSINESS RESET',
      price: '₹12,999',
      duration: 'Deep business review + 1:1 session',
      forWho: 'For existing businesses that feel stuck.',
      includes: ['Current business analysis', 'Offer evaluation', 'Positioning', 'Customer perspective', 'New revenue opportunities', 'Creative growth directions']
    },
    {
      id: 'strategy-session',
      title: '1:1 STRATEGY SESSION',
      price: '₹7,999',
      duration: '90-minute strategy session',
      forWho: 'A deeper private conversation around a specific business challenge.',
      includes: ['Deep dive into a specific problem', 'Strategic problem solving', 'Custom frameworks', 'Direct feedback', 'Action plan']
    }
  ];

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8">Services.</h1>
        <p className="text-xl md:text-2xl text-[#555] font-medium leading-relaxed mb-20 max-w-2xl">
          Focused, strategic 1:1 sessions designed to give you clarity and direction.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          {services.map(s => (
            <div key={s.id} className="bg-white border border-[#e8e8e5] rounded-[2rem] p-10 flex flex-col hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-black tracking-tight">{s.title}</h2>
                  <p className="text-sm font-bold text-[#888] uppercase tracking-widest mt-1">{s.duration}</p>
                </div>
                <div className="text-2xl font-black tracking-tighter">{s.price}</div>
              </div>
              <p className="text-[#111] font-medium text-lg leading-relaxed mb-8">{s.forWho}</p>
              
              <div className="mb-10 flex-1">
                <div className="text-xs font-bold text-[#888] uppercase tracking-widest mb-4">Includes:</div>
                <ul className="space-y-3">
                  {s.includes.map((inc, i) => (
                    <li key={i} className="flex items-start gap-3 text-[#555] font-medium text-sm">
                      <span className="text-[#111]">→</span> {inc}
                    </li>
                  ))}
                </ul>
              </div>

              <Link 
                href={`/services/${s.id}`}
                className="w-full block py-4 text-center bg-[#F5F5F3] text-[#111] font-bold rounded-full hover:bg-[#111] hover:text-white transition-colors"
              >
                Explore {s.title.split(' ')[0]}
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center bg-[#111] text-white p-12 rounded-[2rem]">
          <h2 className="text-3xl font-black tracking-tight mb-4">Not sure which one you need?</h2>
          <Button href="/book" variant="secondary" className="px-8 py-4">Tell me what you're working on →</Button>
        </div>
      </div>
    </div>
  );
}
