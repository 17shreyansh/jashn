import { Chip, ChipProps } from '@mui/material'

interface BadgeProps extends Omit<ChipProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'luxury'
}

export default function Badge({ variant = 'primary', ...props }: BadgeProps) {
  const colorMap = {
    primary: 'primary',
    secondary: 'secondary',
    luxury: 'luxury',
  } as const

  return (
    <Chip
      color={colorMap[variant]}
      sx={{
        fontWeight: 500,
        fontSize: '0.875rem',
        px: 1,
        ...props.sx,
      }}
      {...props}
    />
  )
}
