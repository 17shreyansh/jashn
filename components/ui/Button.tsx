'use client'

import { ButtonHTMLAttributes, forwardRef } from 'react'
import { Button as MuiButton } from '@mui/material'
import { motion } from 'framer-motion'

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  children: React.ReactNode
  sx?: any
}

const MotionButton = motion(MuiButton)

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, children, sx, ...props }, ref) => {
    const sizes = {
      sm: { px: 4, py: 2, fontSize: '0.75rem' },
      md: { px: 6, py: 3, fontSize: '0.875rem' },
      lg: { px: 8, py: 3.5, fontSize: '0.875rem' },
    }

    const variants = {
      primary: {
        bgcolor: '#6B46C1',
        color: '#fff',
        '&:hover': { bgcolor: '#5a3aa3' }
      },
      secondary: {
        bgcolor: '#D4AF37',
        color: '#fff',
        textShadow: '0 2px 4px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)',
        '&:hover': { bgcolor: '#b89530' }
      },
      outline: {
        border: '2px solid #1a1a1a',
        color: '#1a1a1a',
        bgcolor: 'transparent',
        '&:hover': { bgcolor: '#1a1a1a', color: '#fff' }
      },
      ghost: {
        color: '#6B46C1',
        bgcolor: 'transparent',
        '&:hover': { bgcolor: 'rgba(107, 70, 193, 0.1)' }
      },
    }

    return (
      <MotionButton
        ref={ref}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        disabled={loading || props.disabled}
        sx={{
          ...sizes[size],
          ...variants[variant],
          borderRadius: '999px',
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.1em',
          transition: 'all 0.3s ease',
          ...sx,
        }}
        {...(props as any)}
      >
        {loading ? 'Loading...' : children}
      </MotionButton>
    )
  }
)

Button.displayName = 'Button'
