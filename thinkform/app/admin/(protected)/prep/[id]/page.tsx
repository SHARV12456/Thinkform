'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

const sessionData: Record<string, { name: string; sessionType: string; date: string; idea: string }> = {
  sess_001: { name: 'Arjun Mehta',  sessionType: 'Idea Session',       date: '2026-08-14', idea: 'Subscription box for regional Indian snacks.' },
  sess_002: { name: 'Priya Sharma', sessionType: 'Business Reset',     date: '2026-08-16', idea: 'Boutique yoga studio with stalled growth.' },
  sess_003: { name: 'Karan Lal',    sessionType: 'Business Brainstorm', date: '2026-08-19', idea: 'Finance/data background, exploring what to start.' },
  sess_004: { name: 'Meera Iyer',   sessionType: 'Strategy Session',   date: '2026-08-10', idea: 'UX designer moving into product strategy consulting.' },
};

const defaultTemplates: Record<string, string[]> = {
  'Idea Session': [
    'Describe your idea in 2–3 sentences as you understand it today.',
    'Who do you see as the primary customer? Be as specific as possible.',
    'Have you spoken to anyone who might pay for this? What did they say?',
    'What is the one thing about this idea you are most unsure about?',
    'What do you want to leave this session knowing?',
  ],
  'Business Brainstorm': [
    'What are your top 3 professional or personal skills?',
    'What industries or problems are you most drawn to? Why?',
    'What capital, time, and risk level are you working with?',
    'Have you tried starting anything before? What happened?',
    'What would an ideal day of work look like for you?',
  ],
  'Business Reset': [
    'Describe your current business: what you offer, who you serve, and how long you have been running.',
    'What was your revenue last month versus your goal?',
    'Where do most of your clients currently come from?',
    'What has stayed the same in the business for more than 12 months?',
    'If you could change one thing tomorrow, what would it be?',
  ],
  'Strategy Session': [
    'What is the specific decision or challenge you want to think through?',
    'What have you already tried or considered?',
    'What does a successful outcome look like for you?',
    'What is stopping you from making this decision right now?',
    'Is there any context or background I should know before we speak?',
  ],
};

const STORAGE_KEY = (id: string) => `tf_prep_${id}`;

export default function AdminPrepBuilder() {
  const params = useParams();
  const id = params.id as string;
  const session = sessionData[id];

  const defaultQs = defaultTemplates[session?.sessionType] ?? defaultTemplates['Idea Session'];

  const [questions, setQuestions] = useState<string[]>([]);
  const [newQ, setNewQ] = useState('');
  const [saved, setSaved] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY(id));
    setQuestions(stored ? JSON.parse(stored) : defaultQs);
  }, [id]);

  const save = () => {
    localStorage.setItem(STORAGE_KEY(id), JSON.stringify(questions));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const addQuestion = () => {
    if (!newQ.trim()) return;
    setQuestions(q => [...q, newQ.trim()]);
    setNewQ('');
  };

  const removeQuestion = (i: number) => setQuestions(q => q.filter((_, idx) => idx !== i));

  const moveUp = (i: number) => {
    if (i === 0) return;
    setQuestions(q => { const a = [...q]; [a[i - 1], a[i]] = [a[i], a[i - 1]]; return a; });
  };

  const moveDown = (i: number) => {
    setQuestions(q => { if (i === q.length - 1) return q; const a = [...q]; [a[i], a[i + 1]] = [a[i + 1], a[i]]; return a; });
  };

  const updateQuestion = (i: number, val: string) =>
    setQuestions(q => q.map((x, idx) => (idx === i ? val : x)));

  const copyLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/prep/${id}`);
    setLinkCopied(true);
    setTimeout(() => setLinkCopied(false), 2500);
  };

  const resetToDefault = () => setQuestions([...defaultQs]);

  if (!session) return <div className="pt-32 text-center">Session not found.</div>;

  return (
    <div className="min-h-screen bg-[#F5F5F3] px-6 py-12">
      <div className="max-w-3xl mx-auto">
        {/* Back */}
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-bold text-[#888] hover:text-[#111] mb-8 group transition-colors">
          <span className="group-hover:-translate-x-1 transition-transform">←</span> Admin Dashboard
        </Link>

        {/* Header */}
        <div className="bg-white border border-[#e8e8e5] rounded-[2rem] p-8 mb-8">
          <div className="text-xs font-bold text-[#888] uppercase tracking-widest mb-2">{session.sessionType} · {session.date}</div>
          <h1 className="text-3xl font-black tracking-tight text-[#111] mb-1">
            Prep questionnaire for {session.name}
          </h1>
          <p className="text-[#555] font-medium text-sm">{session.idea}</p>
        </div>

        {/* Question Builder */}
        <div className="bg-white border border-[#e8e8e5] rounded-[2rem] p-8 mb-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-black tracking-tight">Questions ({questions.length})</h2>
            <button onClick={resetToDefault} className="text-xs font-bold text-[#888] hover:text-[#111] transition-colors underline">
              Reset to template
            </button>
          </div>

          <div className="space-y-4 mb-8">
            {questions.map((q, i) => (
              <div key={i} className="flex gap-3 items-start group">
                {/* Order number */}
                <span className="w-7 h-7 rounded-full bg-[#F5F5F3] text-[#888] text-xs font-bold flex items-center justify-center shrink-0 mt-2">
                  {i + 1}
                </span>

                {/* Editable question */}
                <textarea
                  value={q}
                  onChange={e => updateQuestion(i, e.target.value)}
                  rows={2}
                  className="flex-1 px-4 py-3 bg-[#F5F5F3] border border-transparent rounded-xl text-sm font-medium text-[#111] focus:outline-none focus:border-[#111] transition-colors resize-none"
                />

                {/* Controls */}
                <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity mt-1">
                  <button onClick={() => moveUp(i)} className="w-7 h-7 rounded-lg bg-[#F5F5F3] hover:bg-[#e8e8e5] flex items-center justify-center text-xs font-bold text-[#555]">↑</button>
                  <button onClick={() => moveDown(i)} className="w-7 h-7 rounded-lg bg-[#F5F5F3] hover:bg-[#e8e8e5] flex items-center justify-center text-xs font-bold text-[#555]">↓</button>
                  <button onClick={() => removeQuestion(i)} className="w-7 h-7 rounded-lg bg-[#F5F5F3] hover:bg-red-100 hover:text-red-500 flex items-center justify-center text-xs font-bold text-[#555]">✕</button>
                </div>
              </div>
            ))}
          </div>

          {/* Add question */}
          <div className="border-t border-[#e8e8e5] pt-6">
            <div className="text-xs font-bold text-[#888] uppercase tracking-widest mb-3">Add Custom Question</div>
            <div className="flex gap-3">
              <input
                value={newQ}
                onChange={e => setNewQ(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && addQuestion()}
                placeholder="Type your custom question..."
                className="flex-1 px-4 py-3 bg-[#F5F5F3] border border-[#e8e8e5] rounded-xl text-sm font-medium focus:outline-none focus:border-[#111] transition-colors"
              />
              <button onClick={addQuestion} className="px-5 py-3 bg-[#111] text-white text-sm font-bold rounded-xl hover:bg-[#333] transition-colors">
                + Add
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <button
            onClick={save}
            className={`flex-1 py-4 rounded-full text-sm font-bold transition-all ${saved ? 'bg-[#2e7d32] text-white' : 'bg-[#111] text-white hover:bg-[#333]'}`}
          >
            {saved ? '✓ Saved!' : 'Save Questionnaire'}
          </button>
          <button
            onClick={copyLink}
            className={`flex-1 py-4 border rounded-full text-sm font-bold transition-all ${linkCopied ? 'border-[#2e7d32] text-[#2e7d32]' : 'border-[#e8e8e5] text-[#555] hover:border-[#111] hover:text-[#111]'}`}
          >
            {linkCopied ? '✓ Link Copied!' : '🔗 Copy Client Link'}
          </button>
          <Link href={`/prep/${id}`} target="_blank" className="flex-1 py-4 bg-[#F5F5F3] border border-[#e8e8e5] text-center text-[#555] rounded-full text-sm font-bold hover:border-[#111] hover:text-[#111] transition-all">
            Preview ↗
          </Link>
        </div>
      </div>
    </div>
  );
}
