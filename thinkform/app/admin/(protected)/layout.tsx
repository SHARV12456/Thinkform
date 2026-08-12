import { isAdminAuthenticated } from '@/lib/auth';
import { LoginForm } from '@/components/admin/LoginForm';

export default async function ProtectedAdminLayout({ children }: { children: React.ReactNode }) {
  const hasSession = await isAdminAuthenticated();

  if (!hasSession) {
    return <LoginForm />;
  }

  return <>{children}</>;
}