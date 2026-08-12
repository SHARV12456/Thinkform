import Link from 'next/link';
import ForgotPasswordForm from '@/components/admin/ForgotPasswordForm';

export default function ForgotPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-2">ThinkForm</h1>
        <h2 className="text-lg font-semibold text-center mb-6 text-gray-700">
          Reset Your Password
        </h2>

        <ForgotPasswordForm />

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Remember your password?{' '}
            <Link href="/admin" className="font-semibold text-black hover:underline">
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
