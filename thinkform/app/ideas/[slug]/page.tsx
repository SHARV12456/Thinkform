import Link from 'next/link';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return ideas.map(i => ({ slug: i.slug }));
}

const ideas = [
  {
    slug: 'case-study-service-to-productized',
    category: 'Case Study',
    title: 'Case Study: From overworked agency to high-margin productized service.',
    readTime: '5 min read',
    content: [
      {
        type: 'body',
        text: 'A common trap for service-based businesses in Mumbai is the "hourly rate" ceiling. You trade time for money. Eventually, you run out of time. This is exactly where a 5-person boutique design agency found themselves before we did a Business Reset.'
      },
      {
        type: 'heading',
        text: 'The Problem: Custom Everything'
      },
      {
        type: 'body',
        text: 'They were doing custom branding, custom websites, custom pitch decks, and custom social media for a roster of 12 clients. Because every project was different, their processes were chaotic. Client approvals took weeks. They were exhausted, working 60-hour weeks, but their profit margins were stuck at 15%.'
      },
      {
        type: 'quote',
        text: '"When you sell custom work, you aren\'t just selling the deliverable. You are selling the exhausting process of figuring out what the deliverable should be."'
      },
      {
        type: 'heading',
        text: 'The Strategy: Productize the Service'
      },
      {
        type: 'body',
        text: 'During our Deep Dive session, we looked at their past 12 months of revenue. We found that 60% of their actual profit came from just one specific type of project: B2B Pitch Decks for startups raising Seed rounds.'
      },
      {
        type: 'bullets',
        items: [
          'We killed the "custom branding" and "social media" services immediately.',
          'We created a single, fixed-price product: "The Fundable Pitch Deck".',
          'We set the price at ₹1,50,000 flat.',
          'We promised a strict 14-day turnaround time.'
        ]
      },
      {
        type: 'heading',
        text: 'The Result: 2x Profit in 90 Days'
      },
      {
        type: 'body',
        text: 'By removing the "custom" element, they created a highly repeatable system. They stopped writing custom proposals. They stopped doing endless revisions (it was capped at 2 rounds). Because they became known exclusively for Pitch Decks, startups started referring them rapidly.'
      },
      {
        type: 'body',
        text: 'Within 90 days, their profit margins went from 15% to 42%. They were working 40-hour weeks. They were no longer an "agency" — they were a productized service.'
      }
    ]
  },
  {
    slug: 'boring-business-makes-money',
    category: 'Business Ideas',
    title: 'A boring business can still make money.',
    readTime: '3 min read',
    content: [
      {
        type: 'body',
        text: 'Everyone wants to build the next tech unicorn. The next Zomato, the next CRED, something with a slick app and a viral hook. The irony is that the most reliably profitable businesses are often the most mundane ones.'
      },
      {
        type: 'body',
        text: 'Think about pest control, document digitisation for SMEs, uniform supply for corporate offices, industrial cleaning, or B2B courier services. None of these are exciting. None of them get written up in Forbes. But all of them have customers who need them constantly, predictably, and are willing to pay consistently.'
      },
      {
        type: 'quote',
        text: '"Boring businesses have boring competition. Boring competition means room to differentiate without a 50-person engineering team."'
      },
      {
        type: 'heading',
        text: 'Why boring works.'
      },
      {
        type: 'body',
        text: 'When everyone is chasing the exciting opportunity, the unglamorous problem gets neglected. The competition gets lazy. Customer expectations stay low. And then someone comes along — someone slightly more organised, slightly more reliable, slightly better at communication — and suddenly they own the market.'
      },
      {
        type: 'body',
        text: 'The trap is thinking that for a business to be worth building, it has to be worth talking about at a dinner party. It doesn\'t. It just has to solve a real problem for a real customer who has budget and urgency.'
      },
      {
        type: 'heading',
        text: 'What to look for.'
      },
      {
        type: 'bullets',
        items: [
          'Industries with low NPS scores and high customer complaints',
          'Services where the dominant players are old and slow-moving',
          'Problems that happen repeatedly and predictably (not one-time)',
          'Categories where "professional" is not the baseline expectation — yet'
        ]
      },
      {
        type: 'body',
        text: 'The goal is not to find the sexiest market. The goal is to find a market where you can be meaningfully better than the current standard — and where being better is actually rewarded with money.'
      },
    ]
  },
  {
    slug: 'idea-doesnt-need-to-be-original',
    category: 'Positioning',
    title: 'Your idea doesn\'t need to be original. Your angle does.',
    readTime: '4 min read',
    content: [
      {
        type: 'body',
        text: 'Originality is one of the most overrated concepts in entrepreneurship. Most people use "originality" as a reason to stall — waiting for an idea so novel that nobody has ever thought of it before. That idea almost never arrives. And if it does, the market usually isn\'t ready for it.'
      },
      {
        type: 'body',
        text: 'Look at what actually works. Zomato was not the first food delivery company. Swiggy was not the first either. OYO did not invent budget hospitality. Zepto did not invent quick commerce. What each of them did was find a specific angle — a unique approach, a tighter focus, a better execution for a specific customer — and push it harder than anyone else was willing to.'
      },
      {
        type: 'quote',
        text: '"The market rewards execution with a specific angle. Not originality for its own sake."'
      },
      {
        type: 'heading',
        text: 'What "angle" actually means.'
      },
      {
        type: 'body',
        text: 'The angle is not what you sell. The angle is who you sell it to, how you frame it, and what you choose to be obsessive about that your competitors are not.'
      },
      {
        type: 'bullets',
        items: [
          'Same product, different customer segment (premium vs mass market)',
          'Same category, different delivery format (online vs in-person)',
          'Same service, different personality and positioning (clinical vs human)',
          'Same offering, different promise (speed vs quality vs access)'
        ]
      },
      {
        type: 'body',
        text: 'Two businesses can sell identical things and have completely different outcomes purely because of how they are positioned in the customer\'s mind.'
      },
      {
        type: 'heading',
        text: 'The practical test.'
      },
      {
        type: 'body',
        text: 'Look at three competitors in your space. Write down how they describe themselves. Now find the gap — the thing none of them are claiming, the customer none of them are speaking to, the problem none of them are owning. That gap is your angle.'
      },
    ]
  },
  {
    slug: 'product-instead-of-problem',
    category: 'Strategy',
    title: 'Why most people start with the product instead of the problem.',
    readTime: '3 min read',
    content: [
      {
        type: 'body',
        text: 'Building is fun. Designing a logo is satisfying. Writing a landing page feels like progress. Selling is uncomfortable. Listening to people tell you your idea needs changing is genuinely painful. So people build first — and try to find a problem later.'
      },
      {
        type: 'body',
        text: 'This is completely understandable. It is also one of the most reliably expensive mistakes in early-stage business.'
      },
      {
        type: 'quote',
        text: '"The cost of thinking for 10 hours is zero. The cost of building the wrong thing for 10 months is devastating."'
      },
      {
        type: 'heading',
        text: 'The sequence that actually works.'
      },
      {
        type: 'bullets',
        items: [
          'Identify a problem that real people actively complain about',
          'Find people who have this problem AND have money AND have urgency',
          'Understand exactly what they are already doing to solve it',
          'Build the smallest version that does it better',
          'Sell it before you build the full version'
        ]
      },
      {
        type: 'body',
        text: 'Notice that "build" appears last. The validation — proving that people will pay, proving that your solution fits — that all comes before you invest serious time and money into the product.'
      },
      {
        type: 'body',
        text: 'Most founders get the sequence backwards because selling before building feels dishonest. It is not. It is the smartest thing you can do for yourself and your future customers.'
      },
    ]
  },
  {
    slug: 'ideas-hiding-in-ordinary-problems',
    category: 'Opportunities',
    title: 'The best business ideas are sometimes hiding inside ordinary problems.',
    readTime: '3 min read',
    content: [
      {
        type: 'body',
        text: 'Pay attention to what you complain about on a regular Tuesday. Not the big abstract problems — the small, specific, daily friction. The thing that takes you 40 minutes that should take 5. The thing you have tried 3 different services for and still cannot get right. The thing you wish existed.'
      },
      {
        type: 'body',
        text: 'That friction is usually the exact friction someone else is willing to pay to remove. And because it is so ordinary — so embedded in daily life — most people dismiss it as "just how things are" and move on.'
      },
      {
        type: 'quote',
        text: '"The best opportunities are not the ones everyone is excited about. They are the ones everyone has accepted as unchangeably inconvenient."'
      },
      {
        type: 'heading',
        text: 'Where to look.'
      },
      {
        type: 'bullets',
        items: [
          'Processes that still happen over WhatsApp or spreadsheets in 2025',
          'Services where follow-up and reliability are the main complaint',
          'Industries where "good enough" is the accepted standard',
          'Things people pay for reluctantly because there is no better alternative'
        ]
      },
      {
        type: 'body',
        text: 'The question is not "is this a big enough problem?" The question is "how many people have this problem, and how much does it cost them — in time, money, or frustration — to deal with it every time?"'
      },
      {
        type: 'body',
        text: 'If the number is meaningful and the frequency is high, you have a business sitting inside an ordinary Tuesday.'
      },
    ]
  },
  {
    slug: 'dont-build-first-think-first',
    category: 'Creative Thinking',
    title: 'Don\'t build first. Think first.',
    readTime: '4 min read',
    content: [
      {
        type: 'body',
        text: 'There is a specific kind of excitement that comes right after you have a good business idea. It is intoxicating. You can see it clearly — the product, the customers, the success. And then the instinct hits: start building immediately before the feeling goes away.'
      },
      {
        type: 'body',
        text: 'This is the moment that determines whether the next six months will be useful or expensive.'
      },
      {
        type: 'quote',
        text: '"Every hour you spend building something that doesn\'t need to exist is an hour you cannot get back."'
      },
      {
        type: 'heading',
        text: 'What thinking first actually looks like.'
      },
      {
        type: 'body',
        text: 'Thinking first does not mean procrastinating. It means spending the first 48–72 hours after an idea asking the uncomfortable questions before you commit any serious time or money.'
      },
      {
        type: 'bullets',
        items: [
          'Who specifically would pay for this — not "people who like X" but a real person with a name and a context?',
          'What is the one core assumption this entire idea rests on, and how would you test it cheaply?',
          'What does the competitive landscape actually look like — have you spent 2 hours genuinely looking?',
          'What is the most direct path from zero to first rupee, without building anything?'
        ]
      },
      {
        type: 'heading',
        text: 'The output of good thinking.'
      },
      {
        type: 'body',
        text: 'If you spend two or three days genuinely stress-testing an idea and it still holds up, you build with significantly more confidence. You build the right things. You avoid the features that seemed important but were never what the customer actually needed.'
      },
      {
        type: 'body',
        text: 'And if the idea does not hold up? You saved yourself months of misplaced effort. That is not failure. That is the thinking doing its job.'
      },
    ]
  },
];

type Idea = typeof ideas[0];

function renderContent(block: Idea['content'][0], idx: number) {
  switch (block.type) {
    case 'body':
      return (
        <p key={idx} className="text-lg text-[#555] font-medium leading-relaxed mb-6">
          {block.text}
        </p>
      );
    case 'quote':
      return (
        <blockquote key={idx} className="border-l-4 border-[#111] pl-6 my-10">
          <p className="text-xl md:text-2xl font-bold text-[#111] leading-snug italic">
            {block.text}
          </p>
        </blockquote>
      );
    case 'heading':
      return (
        <h2 key={idx} className="text-2xl font-black tracking-tight text-[#111] mt-10 mb-4">
          {block.text}
        </h2>
      );
    case 'bullets':
      return (
        <ul key={idx} className="space-y-3 my-6">
          {'items' in block && block.items!.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-[#555] font-medium">
              <span className="text-[#111] mt-1 shrink-0">→</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    default:
      return null;
  }
}

export default async function IdeaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const idea = ideas.find(i => i.slug === slug);
  if (!idea) return notFound();

  const currentIdx = ideas.findIndex(i => i.slug === slug);
  const next = ideas[currentIdx + 1];
  const prev = ideas[currentIdx - 1];

  return (
    <div className="pt-32 pb-24 px-6 bg-white min-h-screen">
      <div className="max-w-2xl mx-auto">
        {/* Back */}
        <Link href="/ideas" className="inline-flex items-center gap-2 text-sm font-bold text-[#888] hover:text-[#111] transition-colors mb-12 group">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> All Thoughts
        </Link>

        {/* Header */}
        <div className="mb-12">
          <div className="text-xs font-bold text-[#888] uppercase tracking-widest mb-4">{idea.category} · {idea.readTime}</div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter leading-tight text-[#111]">{idea.title}</h1>
        </div>

        {/* Divider */}
        <div className="h-px bg-[#e8e8e5] mb-12" />

        {/* Content */}
        <article>
          {idea.content.map((block, i) => renderContent(block, i))}
        </article>

        {/* CTA */}
        <div className="mt-16 bg-[#F5F5F3] border border-[#e8e8e5] rounded-[2rem] p-10 text-center">
          <p className="text-sm font-bold text-[#888] uppercase tracking-widest mb-3">Want to apply this to your idea?</p>
          <h3 className="text-2xl font-black tracking-tight mb-6">Let's think it through together.</h3>
          <Link href="/book" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#111] text-white rounded-full text-sm font-bold hover:bg-[#333] transition-colors">
            Book a 1:1 Session
          </Link>
        </div>

        {/* Prev / Next */}
        {(prev || next) && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-[#e8e8e5] pt-12">
            {prev && (
              <Link href={`/ideas/${prev.slug}`} className="group p-6 border border-[#e8e8e5] rounded-2xl hover:border-[#111] transition-colors">
                <div className="text-xs font-bold text-[#888] uppercase tracking-widest mb-2">← Previous</div>
                <div className="font-black text-[#111] tracking-tight leading-snug">{prev.title}</div>
              </Link>
            )}
            {next && (
              <Link href={`/ideas/${next.slug}`} className={`group p-6 border border-[#e8e8e5] rounded-2xl hover:border-[#111] transition-colors ${!prev ? 'md:col-start-2' : ''}`}>
                <div className="text-xs font-bold text-[#888] uppercase tracking-widest mb-2">Next →</div>
                <div className="font-black text-[#111] tracking-tight leading-snug">{next.title}</div>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
