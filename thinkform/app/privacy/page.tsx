'use client';

import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-8 bg-[#f7f4ee] min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="mb-20">
          <Link href="/" className="inline-block text-sm font-bold text-[#b66a4a] hover:text-[#171717] transition-all mb-8">
            ← Back to ThinkForm
          </Link>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-tight mb-6">
            Privacy Policy
          </h1>
          <p className="text-lg md:text-xl text-[#756f68] font-medium max-w-2xl">
            We respect your privacy and are committed to protecting your personal information.
          </p>
        </div>

        <div className="space-y-10 text-[#171717]">
          <section>
            <h2 className="text-3xl font-bold mb-4">Information we collect</h2>
            <p className="text-base leading-relaxed">
              We collect information you provide directly, including your name, email, and any details you share when booking a session or contacting us. We also collect usage data to improve the site.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">How we use it</h2>
            <p className="text-base leading-relaxed">
              Your information is used to manage bookings, communicate with you, and improve the ThinkForm experience. We do not sell your personal data to third parties.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Security</h2>
            <p className="text-base leading-relaxed">
              We implement reasonable technical and organizational measures to help protect your information from unauthorized access.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Contact</h2>
            <p className="text-base leading-relaxed">
              If you have questions about this policy, please reach out through the contact page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
