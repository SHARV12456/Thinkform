import { cookies } from 'next/headers';
import { LoginForm } from '@/components/admin/LoginForm';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const hasSession =
    !!cookieStore.get('tf_auth_token')?.value ||
    !!cookieStore.get('tf_admin_session')?.value;

  if (!hasSession) {
    return <LoginForm />;
  }

  return <>{children}</>;
}
