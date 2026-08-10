import { cookies } from 'next/headers';
import { LoginForm } from '@/components/admin/LoginForm';

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const cookieStore = await cookies();
  const session = cookieStore.get('tf_admin_session');

  if (!session || session.value !== 'authorized') {
    return <LoginForm />;
  }

  return <>{children}</>;
}
