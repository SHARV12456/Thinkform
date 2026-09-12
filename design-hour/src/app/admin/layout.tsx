import type { Metadata } from 'next';
import '../styles/design-system.css';

export const metadata: Metadata = {
  title: 'Admin | TAAS',
  description: 'TAAS admin dashboard',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
