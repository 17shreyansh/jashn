import { Box, Container, SxProps } from '@mui/material'
import { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | false
  sx?: SxProps
  bgcolor?: string
}

export default function Section({ children, maxWidth = 'xl', sx, bgcolor }: SectionProps) {
  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 }, bgcolor, ...sx }}>
      <Container maxWidth={maxWidth}>
        {children}
      </Container>
    </Box>
  )
}
