import Link from 'next/link';
import { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  type?: 'button' | 'submit';
  target?: string;
  rel?: string;
}

const styles: Record<Variant, string> = {
  primary: 'bg-[#111] text-white hover:bg-[#333] shadow-sm hover:shadow-md',
  secondary: 'bg-white text-[#111] border border-[#ddd] hover:border-[#111]',
  ghost: 'bg-transparent text-[#111] border border-[#111] hover:bg-[#111] hover:text-white',
};

export function Button({ children, href, onClick, variant = 'primary', className = '', type = 'button', target, rel }: ButtonProps) {
  const base = `inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${styles[variant]} ${className}`;

  if (href) {
    return <Link href={href} className={base} target={target} rel={rel}>{children}</Link>;
  }
  return <button type={type} onClick={onClick} className={base}>{children}</button>;
}
