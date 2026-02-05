import { Chip, ChipProps } from '@mui/material'

interface BadgeProps extends Omit<ChipProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'luxury'
}

export default function Badge({ variant = 'primary', ...props }: BadgeProps) {
  const colorMap: Record<string, 'primary' | 'secondary' | 'default'> = {
    primary: 'primary',
    secondary: 'secondary',
    luxury: 'default',
  }

  return (
    <Chip
      color={colorMap[variant]}
      sx={{
        fontWeight: 500,
        fontSize: '0.875rem',
        px: 1,
        ...(variant === 'luxury' && { bgcolor: '#f2cc84', color: '#000' }),
        ...props.sx,
      }}
      {...props}
    />
  )
}
