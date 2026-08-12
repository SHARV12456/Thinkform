import Link from 'next/link';
import { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'tertiary';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  type?: 'button' | 'submit';
  target?: string;
  rel?: string;
  disabled?: boolean;
}

const styles: Record<Variant, string> = {
  primary: 'bg-[#111] text-white hover:bg-[#2a2a2a] active:bg-[#000] shadow-none hover:shadow-sm',
  secondary: 'bg-white text-[#111] border border-[#ddd] hover:border-[#111] hover:bg-[#f9f9f7] active:bg-white',
  ghost: 'bg-transparent text-[#111] border border-[#111] hover:bg-[#111] hover:text-white active:bg-[#000]',
  tertiary: 'bg-transparent text-[#111] hover:text-[#555] underline-hover',
};

export function Button({ 
  children, 
  href, 
  onClick, 
  variant = 'primary', 
  className = '', 
  type = 'button', 
  target, 
  rel,
  disabled = false 
}: ButtonProps) {
  const base = `inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-premium ${styles[variant]} ${
    disabled ? 'opacity-50 cursor-not-allowed' : ''
  } ${className}`;

  if (href) {
    return <Link href={href} className={base} target={target} rel={rel}>{children}</Link>;
  }
  return <button type={type} onClick={onClick} className={base} disabled={disabled}>{children}</button>;
}
