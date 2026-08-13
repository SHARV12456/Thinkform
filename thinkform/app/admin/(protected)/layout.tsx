export const dynamic = 'force-dynamic';
export const metadata = {
  robots: { index: false, follow: false }
};

import { isAdminAuthenticated } from '@/lib/auth';
import { LoginForm } from '@/components/admin/LoginForm';
import Link from 'next/link';

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  let hasSession = false;

  try {
    hasSession = await isAdminAuthenticated();
  } catch (error) {
    console.error('Admin layout auth check failed:', error);
  }

  if (!hasSession) {
    return <LoginForm />;
  }

  return (
    <div className="min-h-screen bg-[#F5F5F3]">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="font-black text-2xl tracking-tighter">THINK<span className="font-light text-[#888]">FORM</span></div>
            <p className="text-xs font-bold text-[#888] uppercase tracking-widest mt-1">Admin</p>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm font-medium text-[#111] hover:underline">← Back to site</Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
          <aside className="md:col-span-1 bg-white border border-[#e8e8e5] rounded-2xl p-4">
            <nav className="space-y-3">
              <Link href="/admin" className="block text-sm font-bold text-[#111]">Bookings</Link>
              <Link href="/admin/prep" className="block text-sm font-medium text-[#666]">Prep</Link>
              <Link href="/admin/testimonials" className="block text-sm font-medium text-[#666]">Testimonials</Link>
              <Link href="/admin/settings" className="block text-sm font-medium text-[#666]">Settings</Link>
            </nav>
          </aside>

          <main className="md:col-span-5">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
