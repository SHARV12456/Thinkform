import { FAQAccordion } from '@/components/ui/FAQAccordion';
import { Button } from '@/components/ui/Button';

export default function FAQ() {
  const faqs = [
    {
      q: 'Do I need an existing business?',
      a: 'No. You can come with a completely blank slate, a half-formed idea, or just a desire to explore what you could start based on your skills.'
    },
    {
      q: 'Do I need a complete business idea?',
      a: 'No. Actually, it is often better if you don\'t. We can shape it together before you lock yourself into a specific execution path.'
    },
    {
      q: 'Is this an AI consultation?',
      a: 'No. You are speaking directly with me. Human to human. No algorithms, no templates, no automated reports.'
    },
    {
      q: 'Do you guarantee that my idea will work?',
      a: 'No. The goal is to help you think more clearly before investing your time and money. I help you see the blind spots and the potential, but execution is up to you.'
    },
    {
      q: 'What happens after I book?',
      a: 'Your request is reviewed. If I think I can help, we schedule the session via video call. I\'ll send you a brief prep questionnaire beforehand.'
    },
    {
      q: 'Is this a business coaching program?',
      a: 'No. It is focused 1:1 strategic thinking around your specific situation. No long-term retainers required, just high-impact conversations when you need them.'
    }
  ];

  return (
    <div className="pt-32 pb-24 px-6 bg-white min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8">FAQ.</h1>
        <p className="text-xl md:text-2xl text-[#555] font-medium leading-relaxed mb-16 max-w-2xl">
          Everything you need to know before we sit down to talk.
        </p>

        <div className="mb-20">
          <FAQAccordion items={faqs} />
        </div>

        <div className="bg-[#F5F5F3] p-10 rounded-[2rem] flex flex-col md:flex-row justify-between items-center gap-6 border border-[#e8e8e5]">
          <div>
            <h2 className="text-2xl font-black tracking-tight mb-2">Still have questions?</h2>
            <p className="text-[#555] font-medium">Reach out directly and ask.</p>
          </div>
          <Button href="/contact" variant="secondary" className="w-full md:w-auto">Contact Me</Button>
        </div>
      </div>
    </div>
  );
}
