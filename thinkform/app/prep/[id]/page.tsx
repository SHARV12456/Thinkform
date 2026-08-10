'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

const sessionData: Record<string, { name: string; sessionType: string; date: string }> = {
  sess_001: { name: 'Arjun Mehta',  sessionType: 'Idea Session',        date: 'August 14, 2026' },
  sess_002: { name: 'Priya Sharma', sessionType: 'Business Reset',      date: 'August 16, 2026' },
  sess_003: { name: 'Karan Lal',    sessionType: 'Business Brainstorm', date: 'August 19, 2026' },
  sess_004: { name: 'Meera Iyer',   sessionType: 'Strategy Session',    date: 'August 10, 2026' },
};

// Default questions per session type — same as admin builder
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

export default function ClientPrepForm() {
  const params = useParams();
  const id = params.id as string;
  const session = sessionData[id];

  const [questions, setQuestions] = useState<string[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Try to load admin-customised questions first, fall back to defaults
    const stored = localStorage.getItem(`tf_prep_${id}`);
    if (stored) {
      setQuestions(JSON.parse(stored));
    } else if (session) {
      setQuestions(defaultTemplates[session.sessionType] ?? defaultTemplates['Idea Session']);
    }
  }, [id, session]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Format Q&A for the email body
    let emailBody = `Here is the prep questionnaire for ${session?.name} (${session?.sessionType} on ${session?.date}):\n\n`;
    questions.forEach((q, i) => {
      emailBody += `Q${i + 1}: ${q}\n`;
      emailBody += `A: ${answers[i] || 'No answer provided.'}\n\n`;
    });

    // Create mailto link
    const mailtoLink = `mailto:hello@thinkform.studio?subject=${encodeURIComponent(
      `Prep Questionnaire: ${session?.name}`
    )}&body=${encodeURIComponent(emailBody)}`;

    // Open email client
    window.location.href = mailtoLink;

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  };

  if (!session) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6 text-center">
        <div>
          <p className="text-4xl mb-4">🔍</p>
          <h1 className="text-2xl font-black tracking-tight mb-2">Link not found.</h1>
          <p className="text-[#555] font-medium">This questionnaire link may have expired. Please contact your consultant.</p>
        </div>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#111] flex items-center justify-center px-6">
        <div className="text-center text-white max-w-md">
          <div className="text-6xl mb-8">✦</div>
          <h1 className="text-4xl font-black tracking-tighter mb-4">Perfect.</h1>
          <p className="text-[#888] text-lg font-medium leading-relaxed mb-8">
            I have your answers. I'll review everything before we speak on {session.date}. See you then.
          </p>
          <div className="text-sm font-bold text-[#555] uppercase tracking-widest">THINKFORM</div>
        </div>
      </div>
    );
  }

  const inputBase = "w-full px-4 py-4 bg-[#F5F5F3] border border-[#e8e8e5] rounded-xl text-[#111] text-sm font-medium placeholder:text-[#aaa] focus:outline-none focus:border-[#111] transition-colors resize-none";

  return (
    <div className="min-h-screen bg-white px-6 py-20">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <div className="font-black text-xl tracking-tighter mb-6">
            THINK<span className="font-light text-[#888]">FORM</span>
          </div>
          <div className="text-xs font-bold text-[#888] uppercase tracking-widest mb-3">
            {session.sessionType} · {session.date}
          </div>
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-[#111] mb-4">
            Before we speak, {session.name.split(' ')[0]}.
          </h1>
          <p className="text-lg text-[#555] font-medium leading-relaxed">
            Take 10–15 minutes to answer these questions honestly. There are no right answers. The more specific you are, the more useful our session will be.
          </p>
        </div>

        <div className="h-px bg-[#e8e8e5] mb-12" />

        <form onSubmit={handleSubmit} className="space-y-10">
          {questions.map((q, i) => (
            <div key={i}>
              <label className="block mb-3">
                <span className="text-xs font-bold text-[#888] uppercase tracking-widest">Question {i + 1}</span>
                <p className="text-lg font-bold text-[#111] mt-1 leading-snug">{q}</p>
              </label>
              <textarea
                rows={4}
                required
                value={answers[i] ?? ''}
                onChange={e => setAnswers(a => ({ ...a, [i]: e.target.value }))}
                placeholder="Your answer..."
                className={inputBase}
              />
            </div>
          ))}

          <div className="border-t border-[#e8e8e5] pt-10">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-[#111] text-white text-base font-bold rounded-full hover:bg-[#333] transition-colors disabled:opacity-60 flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Submitting...
                </>
              ) : 'Submit My Answers →'}
            </button>
            <p className="text-center text-xs text-[#aaa] font-medium mt-4">
              Your answers are shared only with your THINKFORM consultant.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
