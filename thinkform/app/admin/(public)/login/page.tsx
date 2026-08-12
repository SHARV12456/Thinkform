import { LoginForm } from '@/components/admin/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7f4ee] py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg border border-[#e8e3da] p-10 md:p-12">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="text-2xl font-black tracking-tight mb-2">
              THINK<span className="font-light text-[#9a9186]">FORM</span>
            </h1>
            <p className="text-sm font-bold text-[#9a9186] tracking-widest uppercase">Private access</p>
          </div>

          {/* Login Form */}
          <LoginForm />

          {/* Footer Note */}
          <div className="mt-8 pt-8 border-t border-[#e8e3da] text-center">
            <p className="text-xs text-[#9a9186] font-medium">
              Admin login for ThinkForm team only.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
