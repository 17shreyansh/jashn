'use client'

import { HTMLAttributes, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'standard' | 'premium' | 'glass'
  hover?: boolean
  children: ReactNode
}

export function Card({ variant = 'standard', hover = true, children, className = '', ...props }: CardProps) {
  const variants = {
    standard: 'bg-white rounded-2xl shadow-soft',
    premium: 'bg-white rounded-2xl shadow-soft border-2 border-luxury/40',
    glass: 'glass rounded-2xl',
  }

  const Component = hover ? motion.div : 'div'
  const motionProps = hover ? {
    whileHover: { y: -4, boxShadow: '0 12px 40px rgba(0, 0, 0, 0.12)' },
    transition: { duration: 0.3 }
  } : {}

  return (
    <Component
      className={`${variants[variant]} ${className}`}
      {...(hover ? motionProps : {})}
      {...(props as any)}
    >
      {children}
    </Component>
  )
}
