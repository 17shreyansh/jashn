import { HTMLAttributes, ReactNode } from 'react'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'luxury'
  children: ReactNode
}

export function Badge({ variant = 'primary', children, className = '', ...props }: BadgeProps) {
  const variants = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    secondary: 'bg-secondary/10 text-secondary border-secondary/20',
    accent: 'bg-accent1/50 text-text-dark border-accent1',
    luxury: 'bg-luxury/10 text-luxury border-luxury/30',
  }

  return (
    <span
      className={`inline-block px-3 py-1 text-sm font-medium rounded-full border ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}
