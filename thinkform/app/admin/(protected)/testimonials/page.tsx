'use client';
import { useState, useEffect } from 'react';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  quote: string;
  rating: number;
  visible: boolean;
  createdAt: string;
}

const STORAGE_KEY = 'tf_admin_testimonials';

const defaults: Testimonial[] = [
  {
    id: 't1',
    name: 'Arjun Mehta',
    role: 'Founder, SnackBox India',
    quote: 'One session completely changed how I was thinking about positioning. I came in with a product problem and left with a business model.',
    rating: 5,
    visible: true,
    createdAt: '2026-07-10',
  },
  {
    id: 't2',
    name: 'Priya Sharma',
    role: 'Yoga Studio Owner',
    quote: 'The clarity I got in 60 minutes was worth months of overthinking. Manaant asks the right questions and doesn\'t let you hide behind vague answers.',
    rating: 5,
    visible: true,
    createdAt: '2026-07-18',
  },
  {
    id: 't3',
    name: 'Karan Lal',
    role: 'Finance Professional',
    quote: 'I finally understand what kind of business actually suits me. The session was direct, no fluff — exactly what I needed.',
    rating: 5,
    visible: false,
    createdAt: '2026-08-01',
  },
];

function StarRating({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(s => (
        <button
          key={s}
          type="button"
          onClick={() => onChange(s)}
          className={`text-lg transition-colors ${s <= value ? 'text-[#111]' : 'text-[#ddd]'}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}

export default function AdminTestimonialsPage() {
  const [items, setItems]       = useState<Testimonial[]>([]);
  const [saved, setSaved]       = useState(false);
  const [adding, setAdding]     = useState(false);
  const [editId, setEditId]     = useState<string | null>(null);
  const [form, setForm]         = useState({ name: '', role: '', quote: '', rating: 5 });

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    setItems(stored ? JSON.parse(stored) : defaults);
  }, []);

  const persist = (next: Testimonial[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    setItems(next);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleVisible = (id: string) =>
    persist(items.map(t => t.id === id ? { ...t, visible: !t.visible } : t));

  const remove = (id: string) =>
    persist(items.filter(t => t.id !== id));

  const startAdd = () => {
    setForm({ name: '', role: '', quote: '', rating: 5 });
    setEditId(null);
    setAdding(true);
  };

  const startEdit = (t: Testimonial) => {
    setForm({ name: t.name, role: t.role, quote: t.quote, rating: t.rating });
    setEditId(t.id);
    setAdding(true);
  };

  const submitForm = () => {
    if (!form.name.trim() || !form.quote.trim()) return;
    if (editId) {
      persist(items.map(t => t.id === editId ? { ...t, ...form } : t));
    } else {
      const next: Testimonial = {
        id: `t${Date.now()}`,
        ...form,
        visible: true,
        createdAt: new Date().toISOString().slice(0, 10),
      };
      persist([...items, next]);
    }
    setAdding(false);
    setEditId(null);
  };

  const visible = items.filter(t => t.visible).length;

  return (
    <div>
      {/* Header */}
      <div className="bg-white border border-[#e8e8e5] rounded-[2rem] p-8 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-[#111] mb-1">Testimonials</h1>
            <p className="text-sm text-[#888] font-medium">
              {visible} of {items.length} showing on site · {items.filter(t => t.rating === 5).length} five-star
            </p>
          </div>
          <div className="flex items-center gap-3">
            {saved && (
              <span className="text-xs font-bold text-green-600 uppercase tracking-widest">✓ Saved</span>
            )}
            <button
              onClick={startAdd}
              className="px-5 py-2.5 bg-[#111] text-white text-sm font-bold rounded-full hover:bg-[#333] transition-colors"
            >
              + Add Testimonial
            </button>
          </div>
        </div>
      </div>

      {/* Add / Edit Form */}
      {adding && (
        <div className="bg-white border border-[#111] rounded-[2rem] p-8 mb-6">
          <h2 className="text-base font-black tracking-tight mb-6">
            {editId ? 'Edit Testimonial' : 'New Testimonial'}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-xs font-bold text-[#888] uppercase tracking-widest mb-2">Client Name</label>
              <input
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Arjun Mehta"
                className="w-full px-4 py-3 bg-[#f5f5f3] border border-[#e8e8e5] rounded-xl text-sm font-medium focus:outline-none focus:border-[#111] transition-colors"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#888] uppercase tracking-widest mb-2">Role / Company</label>
              <input
                value={form.role}
                onChange={e => setForm({ ...form, role: e.target.value })}
                placeholder="e.g. Founder, SnackBox India"
                className="w-full px-4 py-3 bg-[#f5f5f3] border border-[#e8e8e5] rounded-xl text-sm font-medium focus:outline-none focus:border-[#111] transition-colors"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-xs font-bold text-[#888] uppercase tracking-widest mb-2">Quote</label>
            <textarea
              value={form.quote}
              onChange={e => setForm({ ...form, quote: e.target.value })}
              rows={3}
              placeholder="Write the client's testimonial here…"
              className="w-full px-4 py-3 bg-[#f5f5f3] border border-[#e8e8e5] rounded-xl text-sm font-medium focus:outline-none focus:border-[#111] transition-colors resize-none"
            />
          </div>
          <div className="mb-6">
            <label className="block text-xs font-bold text-[#888] uppercase tracking-widest mb-2">Rating</label>
            <StarRating value={form.rating} onChange={r => setForm({ ...form, rating: r })} />
          </div>
          <div className="flex gap-3">
            <button
              onClick={submitForm}
              disabled={!form.name.trim() || !form.quote.trim()}
              className="px-6 py-3 bg-[#111] text-white text-sm font-bold rounded-xl hover:bg-[#333] transition-colors disabled:opacity-40"
            >
              {editId ? 'Update' : 'Add'} Testimonial
            </button>
            <button
              onClick={() => { setAdding(false); setEditId(null); }}
              className="px-6 py-3 bg-[#f5f5f3] text-[#555] text-sm font-bold rounded-xl hover:bg-[#e8e8e5] transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* List */}
      {items.length === 0 ? (
        <div className="bg-white border border-[#e8e8e5] rounded-[2rem] p-12 text-center">
          <div className="text-4xl mb-4">💬</div>
          <p className="text-[#888] font-medium text-sm">No testimonials yet. Add your first one above.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map(t => (
            <div
              key={t.id}
              className={`bg-white border rounded-[2rem] p-6 transition-all ${
                t.visible ? 'border-[#e8e8e5]' : 'border-[#e8e8e5] opacity-50'
              }`}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span className="font-black text-[#111]">{t.name}</span>
                    <span className="text-xs text-[#aaa] font-medium">{t.role}</span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-widest ${
                      t.visible ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {t.visible ? 'Visible' : 'Hidden'}
                    </span>
                  </div>
                  <div className="flex gap-0.5 mb-3">
                    {[1,2,3,4,5].map(s => (
                      <span key={s} className={`text-sm ${s <= t.rating ? 'text-[#111]' : 'text-[#e0e0e0]'}`}>★</span>
                    ))}
                  </div>
                  <p className="text-sm text-[#555] font-medium leading-relaxed italic">"{t.quote}"</p>
                  <p className="text-xs text-[#aaa] mt-2">{t.createdAt}</p>
                </div>
                <div className="flex flex-col gap-2 shrink-0">
                  <button
                    onClick={() => toggleVisible(t.id)}
                    className="px-4 py-2 bg-[#f5f5f3] text-[#555] text-xs font-bold rounded-xl hover:bg-[#e8e8e5] transition-colors"
                  >
                    {t.visible ? 'Hide' : 'Show'}
                  </button>
                  <button
                    onClick={() => startEdit(t)}
                    className="px-4 py-2 bg-[#f5f5f3] text-[#555] text-xs font-bold rounded-xl hover:bg-[#e8e8e5] transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => remove(t.id)}
                    className="px-4 py-2 bg-red-50 text-red-500 text-xs font-bold rounded-xl hover:bg-red-100 transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <p className="text-xs text-[#aaa] font-medium text-center mt-6">
        Testimonials are stored locally in this browser. To make them live on the site, update the testimonials data file.
      </p>
    </div>
  );
}
