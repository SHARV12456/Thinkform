'use client';

import Link from 'next/link';

export default function TermsPage() {
  return (
    <div className="pt-32 pb-24 px-6 md:px-8 bg-[#f7f4ee] min-h-screen">
      <div className="max-w-5xl mx-auto">
        <div className="mb-20">
          <Link href="/" className="inline-block text-sm font-bold text-[var(--accent)] hover:text-[#171717] transition-all mb-8">
            ← Back to ThinkForm
          </Link>
          <h1 className="text-5xl md:text-6xl font-black tracking-tight leading-tight mb-6">
            Terms of Service
          </h1>
          <p className="text-lg md:text-xl text-[#756f68] font-medium max-w-2xl">
            These terms govern your use of the ThinkForm site and services.
          </p>
        </div>

        <div className="space-y-10 text-[#171717]">
          <section>
            <h2 className="text-3xl font-bold mb-4">Use of the site</h2>
            <p className="text-base leading-relaxed">
              By using ThinkForm, you agree to use the site in a lawful and respectful manner. You may not misuse the service or attempt to interfere with normal operation.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Bookings and payments</h2>
            <p className="text-base leading-relaxed">
              Bookings are made through the site and are subject to the pricing and availability shown at the time of purchase.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Intellectual property</h2>
            <p className="text-base leading-relaxed">
              All content on ThinkForm is owned or licensed by us. You may not reproduce or redistribute any content without permission.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-4">Contact</h2>
            <p className="text-base leading-relaxed">
              For questions about these terms, please contact us via the contact page.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
