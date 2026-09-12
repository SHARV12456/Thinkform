'use client'

import React from 'react'
import Link from 'next/link'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  href?: string
  className?: string
}

export default function Button({ children, variant = 'primary', href, className = '', ...rest }: ButtonProps) {
  const base = `taas-btn ${variant === 'primary' ? 'taas-primary-btn' : variant === 'secondary' ? 'taas-secondary-btn' : 'taas-solid-btn'}`

  if (href) {
    return (
      <Link href={href} className={`${base} ${className}`.trim()} {...(rest as any)}>
        {children}
      </Link>
    )
  }

  return (
    <button className={`${base} ${className}`.trim()} {...rest}>
      {children}
    </button>
  )
}
