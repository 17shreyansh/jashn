import { Card as MuiCard, CardProps as MuiCardProps } from '@mui/material'
import { ReactNode } from 'react'

interface CardProps extends Omit<MuiCardProps, 'variant'> {
  children: ReactNode
  variant?: 'standard' | 'premium' | 'glass'
  hover?: boolean
}

export default function Card({ children, variant = 'standard', hover = false, sx, ...props }: CardProps) {
  const variantStyles = {
    standard: { boxShadow: 1 },
    premium: { boxShadow: 1, border: '2px solid', borderColor: 'luxury.main', borderOpacity: 0.4 },
    glass: { bgcolor: 'rgba(255, 255, 255, 0.6)', backdropFilter: 'blur(12px)', border: '1px solid rgba(242, 204, 132, 0.3)' },
  }

  return (
    <MuiCard
      sx={{
        borderRadius: 3,
        ...variantStyles[variant],
        transition: 'all 0.3s ease',
        ...(hover && { '&:hover': { transform: 'translateY(-4px)', boxShadow: 3 } }),
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiCard>
  )
}
