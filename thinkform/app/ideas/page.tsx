'use client';
import Link from 'next/link';
import { useState } from 'react';

const ideas = [
  {
    slug: 'case-study-service-to-productized',
    category: 'Case Study',
    title: 'Case Study: From overworked agency to high-margin productized service.',
    preview: 'How a 5-person design agency in Mumbai stopped charging hourly, packaged their services, and doubled their profit margins in 90 days without adding new clients.'
  },
  {
    slug: 'boring-business-makes-money',
    category: 'Business Ideas',
    title: 'A boring business can still make money.',
    preview: 'Everyone wants to build the next tech unicorn, but there is incredible leverage in applying slight modern advantages to extremely traditional, "boring" services.'
  },
  {
    slug: 'idea-doesnt-need-to-be-original',
    category: 'Positioning',
    title: "Your idea doesn't need to be original. Your angle does.",
    preview: 'Originality is overrated. Most successful businesses are just taking something that already exists and repositioning it for a specific, underserved audience.'
  },
  {
    slug: 'product-instead-of-problem',
    category: 'Strategy',
    title: 'Why most people start with the product instead of the problem.',
    preview: 'Building is fun. Selling is hard. So people build first and try to find a problem later. Reverse it. Find the burning problem, then build the simplest solution.'
  },
  {
    slug: 'ideas-hiding-in-ordinary-problems',
    category: 'Opportunities',
    title: 'The best business ideas are sometimes hiding inside ordinary problems.',
    preview: 'Pay attention to what you complain about on a Tuesday. The friction in your daily life is usually the exact friction someone else is willing to pay to remove.'
  },
  {
    slug: 'dont-build-first-think-first',
    category: 'Creative Thinking',
    title: "Don't build first. Think first.",
    preview: 'The cost of thinking for 10 hours is zero. The cost of building the wrong thing for 10 months is devastating. Take the time to challenge the premise.'
  }
];

const categories = ['All', 'Case Study', 'Business Ideas', 'Creative Thinking', 'Strategy', 'Opportunities'];

export default function Ideas() {
  const [active, setActive] = useState('All');

  const filtered = active === 'All' ? ideas : ideas.filter(i => i.category === active);

  return (
    <div className="pt-32 pb-24 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8">Ideas & Thinking.</h1>
        <p className="text-xl md:text-2xl text-[#555] font-medium leading-relaxed mb-16 max-w-2xl">
          Short essays and strategic thoughts on building businesses differently.
        </p>

        {/* Filter Tabs */}
        <div className="flex flex-wrap gap-3 mb-16 border-b border-[#e8e8e5] pb-8">
          {categories.map(c => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                active === c
                  ? 'bg-[#111] text-white scale-105 shadow-sm'
                  : 'bg-[#e8e8e5] text-[#555] hover:bg-[#d8d8d8]'
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Count */}
        <p className="text-sm font-bold text-[#888] uppercase tracking-widest mb-8">
          {filtered.length} {filtered.length === 1 ? 'thought' : 'thoughts'}{active !== 'All' ? ` in ${active}` : ''}
        </p>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.length > 0 ? filtered.map((idea) => (
            <Link
              key={idea.slug}
              href={`/ideas/${idea.slug}`}
              className="group p-10 border border-[#e8e8e5] rounded-[2rem] bg-white hover:shadow-xl hover:border-[#111] transition-all duration-300 flex flex-col"
            >
              <div className="text-xs font-bold text-[#888] uppercase tracking-widest mb-4">{idea.category}</div>
              <h2 className="text-2xl md:text-3xl font-black tracking-tight mb-4 leading-tight">{idea.title}</h2>
              <p className="text-[#555] font-medium leading-relaxed mb-8 flex-1">{idea.preview}</p>
              <div className="text-sm font-bold text-[#111] inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                Read thought <span className="group-hover:translate-x-1 transition-transform inline-block">→</span>
              </div>
            </Link>
          )) : (
            <div className="md:col-span-2 text-center py-20 text-[#888] font-medium">
              No thoughts in this category yet.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
