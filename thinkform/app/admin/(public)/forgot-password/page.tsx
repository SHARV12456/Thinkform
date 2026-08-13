import Link from 'next/link';
import ForgotPasswordForm from '@/components/admin/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f4ee] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg border border-[#e8e3da] p-10 md:p-12">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-2xl font-black tracking-tight mb-2">
              THINK<span className="font-light text-[#9a9186]">FORM</span>
            </h1>
            <p className="text-sm font-bold text-[#9a9186] tracking-widest uppercase">Reset password</p>
          </div>

          {/* Form */}
          <ForgotPasswordForm />

          {/* Back to Login */}
          <div className="mt-8 pt-8 border-t border-[#e8e3da] text-center">
            <p className="text-sm text-[#756f68]">
              Remember your password?{' '}
              <Link href="/admin/login" className="font-bold text-[var(--accent)] hover:text-[#171717] transition-all">
                Back to login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
