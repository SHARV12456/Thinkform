import Link from 'next/link';
import { useMemo } from 'react';
import { ReactNode } from 'react';

type Variant = 'primary' | 'secondary' | 'tertiary' | 'text';

interface ButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  target?: string;
  rel?: string;
  disabled?: boolean;
}

const styles: Record<Variant, string> = {
  primary: 'btn-base btn-primary',
  secondary: 'btn-base btn-secondary',
  tertiary: 'btn-base btn-tertiary',
  text: 'btn-text',
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
  disabled = false,
}: ButtonProps) {
  const base = `${styles[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`.trim();
  const showArrow = variant === 'primary' || variant === 'secondary';

  const content = useMemo(
    () => (
      <>
        <span className="btn-copy">{children}</span>
        {showArrow && <span className="btn-arrow" aria-hidden="true">→</span>}
      </>
    ),
    [children, showArrow]
  );

  const handlePointerMove = (event: React.PointerEvent<HTMLAnchorElement | HTMLButtonElement>) => {
    const target = event.currentTarget as HTMLElement;
    const rect = target.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    target.style.setProperty('--pointer-x', `${x}px`);
    target.style.setProperty('--pointer-y', `${y}px`);
  };

  const buttonProps = {
    className: base,
    onPointerMove: handlePointerMove,
    onClick,
    target,
    rel,
    'data-disabled': disabled ? 'true' : 'false',
  } as const;

  if (href) {
    return (
      <Link href={href} {...buttonProps}>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} disabled={disabled} {...buttonProps}>
      {content}
    </button>
  );
}
