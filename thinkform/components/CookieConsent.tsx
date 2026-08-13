"use client";

import { useEffect, useState } from "react";

function readConsent(): { analytics?: boolean } | null {
  try {
    const m = document.cookie.match(/(?:^|; )tf_consent=([^;]+)/);
    if (!m) return null;
    return JSON.parse(decodeURIComponent(m[1]));
  } catch (e) {
    return null;
  }
}

function writeConsent(obj: { analytics?: boolean }) {
  const val = encodeURIComponent(JSON.stringify(obj));
  const secure = window.location.protocol === 'https:' ? '; Secure' : '';
  document.cookie = `tf_consent=${val}; Path=/; Max-Age=${60 * 60 * 24 * 365}${secure}`;
  window.dispatchEvent(new CustomEvent('tf_consent_changed', { detail: obj }));
}

export default function CookieConsent() {
  const [consent, setConsent] = useState<{ analytics?: boolean } | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const c = readConsent();
    setConsent(c);
    setVisible(!c);

    const onChange = (e: Event) => setConsent(readConsent());
    window.addEventListener('tf_consent_changed', onChange as EventListener);
    return () => window.removeEventListener('tf_consent_changed', onChange as EventListener);
  }, []);

  if (!visible) return null;

  return (
    <div className="fixed inset-x-4 md:inset-x-0 bottom-6 max-w-4xl mx-auto bg-white border border-gray-200 rounded-xl shadow-lg p-4 z-50">
      <div className="flex items-start gap-4">
        <div className="flex-1 text-sm text-gray-800">
          We use cookies to improve your experience and to run analytics. Manage your preference below. 
        </div>
        <div className="flex items-center gap-2">
          <button
            className="px-4 py-2 bg-black text-white rounded-lg text-sm font-medium"
            onClick={() => {
              writeConsent({ analytics: true });
              setVisible(false);
            }}
          >
            Accept
          </button>
          <button
            className="px-4 py-2 bg-white text-gray-800 border border-gray-200 rounded-lg text-sm"
            onClick={() => {
              writeConsent({ analytics: false });
              setVisible(false);
            }}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}
