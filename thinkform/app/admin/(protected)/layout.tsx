export const dynamic = 'force-dynamic';

import { isAdminAuthenticated } from '@/lib/auth';
import { LoginForm } from '@/components/admin/LoginForm';

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

  return <>{children}</>;
}
