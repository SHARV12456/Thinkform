'use client';
import { useState, useEffect } from 'react';

export default function AdminSettingsPage() {
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('/api/admin/settings')
      .then(r => r.json())
      .then(d => {
        if (d.success && d.settings?.whatsappNumber) {
          setWhatsappNumber(d.settings.whatsappNumber);
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const save = async () => {
    setSaving(true);
    setError('');
    try {
      const res = await fetch('/api/admin/settings', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ settings: { whatsappNumber } }),
      });
      const data = await res.json();
      if (!data.success) throw new Error(data.message ?? 'Save failed');
      setSaved(true);
      setTimeout(() => setSaved(false), 2500);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="bg-white border border-[#e8e8e5] rounded-[2rem] p-8 mb-6">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-[#111] mb-1">WhatsApp Settings</h1>
            <p className="text-sm text-[#888] font-medium">Manage the WhatsApp number used for the floating button.</p>
          </div>
          <div className="flex items-center gap-3">
            {error && <span className="text-xs font-bold text-red-500">{error}</span>}
            {saved && <span className="text-xs font-bold text-green-600 uppercase tracking-widest">✓ Saved</span>}
            <button
              onClick={save}
              disabled={saving || loading}
              className="px-6 py-2.5 bg-[#111] text-white text-sm font-bold rounded-full hover:bg-[#333] transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="bg-white border border-[#e8e8e5] rounded-[2rem] p-12 text-center text-[#888] text-sm font-medium">
          Loading settings…
        </div>
      ) : (
        <div className="bg-white border border-[#e8e8e5] rounded-[2rem] overflow-hidden">
          <div className="p-8">
            <div className="max-w-md">
              <label className="block text-xs font-bold text-[#888] uppercase tracking-widest mb-2">WhatsApp Number</label>
              <input
                type="text"
                value={whatsappNumber}
                onChange={e => setWhatsappNumber(e.target.value)}
                placeholder="e.g. 7400162509"
                className="w-full px-4 py-3 bg-[#f5f5f3] border border-[#e8e8e5] rounded-xl text-sm font-medium focus:outline-none focus:border-[#111] transition-colors"
              />
              <p className="text-xs text-[#aaa] mt-2">Enter your 10-digit number. We automatically format it with the +91 country code for you.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
