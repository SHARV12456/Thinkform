'use client';
import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { pdf } from '@react-pdf/renderer';
import { PremiumPDF } from './PremiumPDF';

interface ReportData {
  sessionDate: string;
  sessionType: string;
  clientName: string;
  clientEmail: string;
  summary: string;
  keyInsights: string;
  actionItems: string;
  recommendations: string;
  nextSteps: string;
  consultantNotes: string;
  exclusiveOffer: string;
  qaPairs: { q: string; a: string }[];
}

const EMPTY_REPORT: ReportData = {
  sessionDate: '',
  sessionType: '',
  clientName: '',
  clientEmail: '',
  summary: '',
  keyInsights: '',
  actionItems: '',
  recommendations: '',
  nextSteps: '',
  consultantNotes: '',
  exclusiveOffer: '',
  qaPairs: [],
};

export default function SessionReportPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;

  const [report, setReport] = useState<ReportData>(EMPTY_REPORT);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [bookingSession, setBookingSession] = useState('');
  const [isGeneratingAI, setIsGeneratingAI] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch booking details
        const bookingRes = await fetch(`/api/admin/bookings/${id}`);
        if (bookingRes.status === 401) { router.push('/admin'); return; }
        const bookingData = await bookingRes.json();
        if (bookingData.success) {
          const b = bookingData.data;
          setBookingName(b.name || '');
          setBookingEmail(b.email || '');
          setBookingSession(b.sessionType || '');

          // Pre-fill basics
          setReport(prev => ({
            ...prev,
            clientName: b.name || '',
            clientEmail: b.email || '',
            sessionType: b.sessionType || '',
            sessionDate: b.scheduledDate
              ? new Date(b.scheduledDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })
              : new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' }),
          }));
        }

        // Fetch existing report if any
        const reportRes = await fetch(`/api/admin/bookings/${id}/report`);
        const reportData = await reportRes.json();
        if (reportData.success && reportData.data) {
          setReport(prev => ({ ...prev, ...reportData.data }));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleAIAutofill = async () => {
    setIsGeneratingAI(true);
    
    // Simulate AI thinking delay for UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const sType = report.sessionType || bookingSession || 'Strategy Session';
    const cName = report.clientName || bookingName || 'Client';
    const fName = cName.split(' ')[0];

    let newReport: Partial<ReportData> = {};

    if (sType.toLowerCase().includes('idea')) {
      newReport = {
        summary: `During our Idea Session, ${fName} presented a concept for a new digital platform aimed at streamlining creative workflows. We discussed the core problem the idea solves, current market gaps, and early indications of product-market fit. The session focused heavily on validating the core assumption before building.`,
        keyInsights: `1. The initial target audience is too broad; narrowing down to freelance designers will significantly lower acquisition costs.\n2. The proposed pricing model might face resistance without a clear ROI calculator.\n3. There is a strong unique selling proposition in the speed of the workflow, which should be the focal point of the marketing.`,
        actionItems: `• Conduct 5 customer discovery interviews with freelance designers.\n• Outline a landing page highlighting the "speed" value proposition.\n• Create a simple ROI calculator spreadsheet to test the pricing logic.`,
        recommendations: `Before investing in any code, I strongly recommend building a 'painted door' test—a simple landing page explaining the product with an email waitlist. This will validate true demand. Keep the feature set minimal for V1 to ensure you launch quickly and gather real user feedback.`,
        nextSteps: `Review the results of the 5 customer interviews in two weeks. If the feedback is positive, move towards building a low-fidelity prototype.`,
        consultantNotes: `Client is very passionate but tends to get distracted by secondary features. Need to keep them strictly focused on the MVP. Has a good grasp of the industry but needs help with go-to-market strategy.`,
        qaPairs: [
          { q: 'What is the biggest risk right now?', a: 'Building too many features before validating that users actually want the core solution.' },
          { q: 'How should I price this initially?', a: 'Start with a one-time lifetime deal for early adopters to get quick cash flow and dedicated beta testers.' }
        ],
        exclusiveOffer: `Because you are at the crucial validation stage, I am offering you an exclusive 20% discount on my "MVP Blueprint" package. We will spend 4 weeks building out the exact wireframes and go-to-market plan for your idea, so you don't waste money on developers. Valid for the next 48 hours.`
      };
    } else if (sType.toLowerCase().includes('brainstorm')) {
      newReport = {
        summary: `The Business Brainstorm session centered around finding new revenue streams for ${fName}'s existing consultancy. We mapped out their current intellectual property and explored ways to productize their services to decouple their income from their time.`,
        keyInsights: `1. There is a massive opportunity to turn their most popular 1:1 framework into an async course or toolkit.\n2. Current lead flow is strong, but the bottleneck is entirely on fulfillment.\n3. By introducing a 'group coaching' tier, they can serve clients who can't afford the 1:1 rate while still increasing effective hourly revenue.`,
        actionItems: `• Map out the modules for the proposed async toolkit.\n• Draft an email to the existing waitlist gauging interest in a beta group coaching cohort.\n• Identify 3 tasks currently done manually that can be delegated to a virtual assistant.`,
        recommendations: `Your immediate focus should be shifting from 'doing the work' to 'building the system'. Introduce the group cohort as a pilot program next month to test the curriculum. Once validated, this can become your primary scalable offering.`,
        nextSteps: `Launch the pilot group cohort to a max of 10 people. We will reconvene next month to review the cohort's performance and feedback.`,
        consultantNotes: `Client is experiencing classic agency burnout. Extremely capable but struggling to let go of control. Emphasized the importance of delegation.`,
        qaPairs: [
          { q: 'How much should I charge for the group cohort?', a: 'Price it at roughly 30% of your 1:1 rate to make it a no-brainer for your waitlist.' },
          { q: 'What if no one signs up?', a: 'Then we learn the positioning is wrong before you spent 3 months recording an async course. It is a risk-free test.' }
        ],
        exclusiveOffer: `To help you launch your group cohort flawlessly, I'd like to invite you into my "Scale & Systematize" sprint. We will build your entire curriculum and marketing funnel together over 6 weeks. Since we already laid the groundwork today, I can offer this at a special rate of $4,500 (usually $6,000). Let me know if you are ready to scale.`
      };
    } else if (sType.toLowerCase().includes('reset')) {
      newReport = {
        summary: `We conducted a deep Business Reset for ${fName}, evaluating the stagnation in their current agency model. The discussion covered profit margins, team structure, and client acquisition channels. The goal was to identify where the business is leaking energy and capital.`,
        keyInsights: `1. The current pricing model has not been updated in 3 years, leading to shrinking margins against rising costs.\n2. There is a high reliance on a single lead channel (referrals), making revenue unpredictable.\n3. The service offering is too customized; standardizing the core packages will improve delivery speed by 40%.`,
        actionItems: `• Increase prices on all new proposals by 20% immediately.\n• Productize the top 3 most requested custom services into fixed-scope, fixed-price packages.\n• Dedicate 2 hours per week to outbound lead generation or content marketing on LinkedIn.`,
        recommendations: `Stop customizing every proposal. You are an expert, and your clients should buy your standardized process, not dictate it. By productizing your services, you regain control of your margins and your team's time. Implement the 20% price increase—your current clients already trust you, and new clients won't know the difference.`,
        nextSteps: `Finalize the standardized service packages. Schedule a follow-up session in 30 days to review the new outbound marketing pipeline.`,
        consultantNotes: `They were hesitant about raising prices, fearing client loss. I need to hold them accountable to this in the next session. The agency has great potential if they can just streamline operations.`,
        qaPairs: [
          { q: 'Will I lose clients if I raise my prices?', a: 'You might lose the most price-sensitive (and usually most difficult) clients. This frees up capacity for better clients at higher margins.' }
        ],
        exclusiveOffer: `You have the talent, but your operations are holding you back. I am offering you a spot in my "Agency Operations Audit". I will personally review your proposals, pricing structure, and team workflows for 30 days. Let's fix the leaks in your business. Exclusive price: $3,000 for action-takers.`
      };
    } else {
      newReport = {
        summary: `In this Strategy Session, ${fName} and I focused on their overarching brand positioning and how to differentiate their offering in a crowded market. We analyzed their current messaging and identified a need for a stronger, more polarizing brand voice.`,
        keyInsights: `1. The current brand messaging is too safe and blends in with competitors.\n2. ${fName} has a unique contrarian viewpoint on the industry that is currently hidden from their marketing.\n3. The website copy focuses too much on 'what' they do rather than 'why' the client should care.`,
        actionItems: `• Rewrite the website homepage headline to reflect the new, bolder positioning.\n• Draft 3 LinkedIn posts expressing the contrarian industry viewpoint discussed.\n• Update the 'About' page to highlight the specific, unique methodology used.`,
        recommendations: `Do not be afraid to polarize. The goal of your marketing shouldn't be to attract everyone, but to deeply resonate with your specific target audience while actively repelling those who aren't a fit. Lean into your unique perspective—it is your biggest competitive advantage right now.`,
        nextSteps: `Review the new homepage headline and the drafted LinkedIn posts via email next week.`,
        consultantNotes: `Client has brilliant ideas but lacks the confidence to put them out publicly. The strategy is solid, the bottleneck is purely execution and confidence.`,
        qaPairs: [
          { q: 'Is it dangerous to be polarizing?', a: 'It is far more dangerous to be completely forgettable. Polarization creates loyal advocates.' }
        ],
        exclusiveOffer: `To ensure you execute on this new brand positioning, I'd like to offer you a 3-month Retainer package where I personally review and edit all of your key marketing copy before it goes live. This ensures you maintain the strong, polarizing voice we discussed. Available for $2,000/month if signed by Friday.`
      };
    }

    setReport(prev => ({ ...prev, ...newReport }));
    setIsGeneratingAI(false);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch(`/api/admin/bookings/${id}/report`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(report),
      });
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  const handleGeneratePDF = async () => {
    setGenerating(true);
    try {
      // Generate PDF blob using @react-pdf/renderer
      const blob = await pdf(<PremiumPDF report={report} bookingName={bookingName} bookingSession={bookingSession} />).toBlob();
      
      // Create object URL and trigger download
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const cName = report.clientName || bookingName || 'Client';
      link.download = `THINKFORM-Strategy-${cName.replace(/\s+/g, '-')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to generate PDF:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setGenerating(false);
    }
  };

  const whatsappLink = `https://wa.me/?text=${encodeURIComponent(`Hi ${report.clientName || bookingName},\n\nThank you for your THINKFORM session! I've prepared a detailed report summarising everything we discussed, including your key insights, action items, and next steps.\n\nI'll send it to you shortly.\n\n— THINKFORM`)}`;

  const emailShareHref = (() => {
    const subject = encodeURIComponent(`Your THINKFORM Session Report — ${report.sessionType || bookingSession}`);
    const body = encodeURIComponent(
      `Hi ${report.clientName || bookingName},\n\nThank you for a great session! I've put together your personalised session report which includes everything we discussed, your key insights, action items, and recommended next steps.\n\nPlease find it attached to this email.\n\nLooking forward to seeing you take this forward!\n\nWarm regards,\n— THINKFORM\nhttps://thinkform.in`
    );
    return `mailto:${bookingEmail}?subject=${subject}&body=${body}`;
  })();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F5F5F3] flex items-center justify-center">
        <p className="text-[#888] font-medium">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F3] pb-32">
      {/* Top Navigation */}
      <div className="bg-[#111] text-white px-6 py-4 sticky top-0 z-10 shadow-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div>
            <Link href={`/admin/bookings/${id}`} className="text-xs font-bold text-white/50 hover:text-white transition-colors flex items-center gap-2 mb-1">
              <span>←</span> Back to Booking
            </Link>
            <h1 className="text-xl font-black tracking-tight">Session Strategy Report</h1>
          </div>
          <div className="text-right">
            <p className="text-sm font-medium text-white">{bookingName}</p>
            <p className="text-xs text-white/50 font-bold tracking-widest uppercase">{bookingSession || 'No session type'}</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Share & Actions Bar */}
        <div className="bg-white rounded-2xl p-5 mb-8 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4 border border-[#e8e8e5]">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="text-xs font-bold text-[#888] uppercase tracking-widest">Share Final PDF</span>
            <a
              href={emailShareHref}
              className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 text-[#111] text-sm font-bold rounded-xl transition-colors border border-gray-200"
            >
              ✉️ Email
            </a>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#F0FDF4] hover:bg-[#DCFCE7] text-[#166534] text-sm font-bold rounded-xl transition-colors border border-[#BBF7D0]"
            >
              💬 WhatsApp
            </a>
          </div>
          <p className="text-xs text-[#aaa] font-medium">Remember to attach the PDF first.</p>
        </div>

        {/* Report form container */}
        <div className="space-y-8">
          {/* Metadata Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e8e8e5]">
              <label className="block text-xs font-bold text-[#888] uppercase tracking-widest mb-2">Session Date</label>
              <input
                type="text"
                value={report.sessionDate}
                onChange={e => setReport(p => ({ ...p, sessionDate: e.target.value }))}
                placeholder="e.g. 11 August 2026"
                className="w-full text-base font-bold text-[#111] bg-transparent border-b-2 border-transparent focus:border-[#111] transition-colors outline-none pb-1 placeholder-[#ccc]"
              />
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-[#e8e8e5]">
              <label className="block text-xs font-bold text-[#888] uppercase tracking-widest mb-2">Session Type</label>
              <input
                type="text"
                value={report.sessionType}
                onChange={e => setReport(p => ({ ...p, sessionType: e.target.value }))}
                placeholder="e.g. Idea Session"
                className="w-full text-base font-bold text-[#111] bg-transparent border-b-2 border-transparent focus:border-[#111] transition-colors outline-none pb-1 placeholder-[#ccc]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <ReportField
              label="Session Summary"
              subtitle="The overarching theme and high-level context of the discussion."
              value={report.summary}
              onChange={v => setReport(p => ({ ...p, summary: v }))}
              rows={5}
              accent="border-[#3B82F6]"
            />
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ReportField
                label="Key Insights"
                subtitle="The critical 'aha' moments and discoveries."
                value={report.keyInsights}
                onChange={v => setReport(p => ({ ...p, keyInsights: v }))}
                rows={6}
                accent="border-[#10B981]"
              />
              <ReportField
                label="Action Items"
                subtitle="Immediate tactical tasks the client must execute."
                value={report.actionItems}
                onChange={v => setReport(p => ({ ...p, actionItems: v }))}
                rows={6}
                accent="border-[#F59E0B]"
              />
            </div>

            <ReportField
              label="Strategic Recommendations"
              subtitle="Your expert advice on their core business strategy."
              value={report.recommendations}
              onChange={v => setReport(p => ({ ...p, recommendations: v }))}
              rows={5}
              accent="border-[#8B5CF6]"
            />

            <ReportField
              label="Next Steps"
              subtitle="How do we proceed from here? Any follow-up sessions required?"
              value={report.nextSteps}
              onChange={v => setReport(p => ({ ...p, nextSteps: v }))}
              rows={4}
              accent="border-[#14B8A6]"
            />

            {/* Q&A Section */}
            <div className="bg-white shadow-sm border border-[#e8e8e5] rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <label className="block text-xs font-black text-[#111] uppercase tracking-widest mb-1 flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full border-2 border-pink-500 bg-white inline-block"></span>
                    Session Q&A (Optional)
                  </label>
                  <p className="text-[11px] text-[#888] font-medium">Record specific questions the client asked and your answers.</p>
                </div>
                <button
                  onClick={() => setReport(p => ({ ...p, qaPairs: [...(p.qaPairs || []), { q: '', a: '' }] }))}
                  className="px-3 py-1.5 bg-gray-100 text-gray-700 text-xs font-bold rounded-lg hover:bg-gray-200 transition-colors"
                >
                  + Add Q&A
                </button>
              </div>

              <div className="space-y-4">
                {report.qaPairs?.map((qa, index) => (
                  <div key={index} className="flex flex-col gap-2 p-4 bg-gray-50 border border-gray-200 rounded-xl relative group">
                    <button
                      onClick={() => setReport(p => ({ ...p, qaPairs: p.qaPairs.filter((_, i) => i !== index) }))}
                      className="absolute top-4 right-4 text-red-400 hover:text-red-600 font-bold text-xs opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      Remove
                    </button>
                    <input
                      type="text"
                      placeholder="Question..."
                      value={qa.q}
                      onChange={e => {
                        const newQa = [...report.qaPairs];
                        newQa[index].q = e.target.value;
                        setReport(p => ({ ...p, qaPairs: newQa }));
                      }}
                      className="w-full text-[14px] font-bold text-[#111] bg-transparent border-none outline-none placeholder-[#ccc]"
                    />
                    <textarea
                      placeholder="Answer..."
                      rows={2}
                      value={qa.a}
                      onChange={e => {
                        const newQa = [...report.qaPairs];
                        newQa[index].a = e.target.value;
                        setReport(p => ({ ...p, qaPairs: newQa }));
                      }}
                      className="w-full text-[14px] text-[#555] bg-transparent border-none outline-none resize-y placeholder-[#ccc]"
                    />
                  </div>
                ))}
                {(!report.qaPairs || report.qaPairs.length === 0) && (
                  <div className="text-center py-6 border-2 border-dashed border-gray-200 rounded-xl text-gray-400 text-xs font-medium">
                    No questions added yet.
                  </div>
                )}
              </div>
            </div>

            <ReportField
              label="Exclusive Offer (Upsell)"
              subtitle="Pitch a personalized next-step package or discount directly in the PDF."
              value={report.exclusiveOffer || ''}
              onChange={v => setReport(p => ({ ...p, exclusiveOffer: v }))}
              rows={4}
              accent="border-black"
            />

            <ReportField
              label="Consultant Notes (Private)"
              subtitle="Internal notes for your eyes only. Will NOT appear on the PDF."
              value={report.consultantNotes}
              onChange={v => setReport(p => ({ ...p, consultantNotes: v }))}
              rows={3}
              accent="border-[#6B7280]"
              isPrivate
            />
          </div>
        </div>
      </div>

      {/* Sticky Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-[#e8e8e5] p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-20">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <p className="text-xs font-bold text-[#888] uppercase tracking-widest hidden sm:block">
            {report.summary.trim() ? "Ready to generate" : "Summary required to generate PDF"}
          </p>
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={handleAIAutofill}
              disabled={isGeneratingAI}
              className="flex-1 sm:flex-none px-6 py-3.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white text-sm font-bold rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:shadow-[0_0_20px_rgba(99,102,241,0.6)] disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isGeneratingAI ? '✨ Thinking...' : '✨ AI Magic Fill'}
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 sm:flex-none px-6 py-3.5 bg-[#f5f5f3] text-[#111] text-sm font-bold rounded-xl hover:bg-[#e8e8e5] transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save Draft'}
            </button>
            <button
              onClick={handleGeneratePDF}
              disabled={generating || !report.summary.trim()}
              className="flex-1 sm:flex-none px-8 py-3.5 bg-[#111] text-white text-sm font-bold rounded-xl hover:bg-[#333] transition-colors disabled:opacity-40 flex items-center justify-center gap-2"
            >
              {generating ? 'Building PDF...' : '⬇ Download Final PDF'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Reusable field component ──────────────────────────────────────────────────
function ReportField({
  label,
  subtitle,
  value,
  onChange,
  rows,
  accent,
  isPrivate = false,
}: {
  label: string;
  subtitle: string;
  value: string;
  onChange: (v: string) => void;
  rows: number;
  accent: string;
  isPrivate?: boolean;
}) {
  return (
    <div className={`bg-white shadow-sm border border-[#e8e8e5] rounded-2xl overflow-hidden flex flex-col group transition-all duration-300 focus-within:ring-2 focus-within:ring-black/5 focus-within:shadow-md ${isPrivate ? 'bg-gray-50' : ''}`}>
      <div className={`px-6 py-4 border-b border-[#e8e8e5] flex justify-between items-center bg-gray-50/50`}>
        <div>
          <label className="block text-xs font-black text-[#111] uppercase tracking-widest mb-1 flex items-center gap-2">
            <span className={`w-2.5 h-2.5 rounded-full border-2 ${accent} bg-white inline-block`}></span>
            {label}
          </label>
          <p className="text-[11px] text-[#888] font-medium">{subtitle}</p>
        </div>
        {isPrivate && (
          <span className="text-[10px] font-bold tracking-widest uppercase bg-gray-200 text-gray-600 px-2 py-1 rounded">Hidden</span>
        )}
      </div>
      <textarea
        rows={rows}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={`Write your ${label.toLowerCase()} here...`}
        className={`w-full p-6 text-[15px] text-[#111] bg-transparent border-none outline-none resize-y placeholder-[#ccc] leading-relaxed ${isPrivate ? 'bg-gray-50' : ''}`}
      />
    </div>
  );
}
