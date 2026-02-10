import { HTMLAttributes, ReactNode } from 'react'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'luxury'
  children: ReactNode
}

export function Badge({ variant = 'primary', children, className = '', ...props }: BadgeProps) {
  const variants = {
    primary: 'bg-primary/10 text-primary border-primary/20',
    secondary: 'bg-secondary/10 text-secondary border-secondary/20 [text-shadow:0_2px_4px_rgba(0,0,0,0.3),0_1px_2px_rgba(0,0,0,0.2)]',
    accent: 'bg-accent1/50 text-text-dark border-accent1',
    luxury: 'bg-luxury/10 text-luxury border-luxury/30 [text-shadow:0_2px_4px_rgba(0,0,0,0.3),0_1px_2px_rgba(0,0,0,0.2)]',
  }

  return (
    <span
      className={`inline-block px-4 py-1.5 text-base font-bold rounded-full border ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  )
}
