'use client'

import { Box, Container } from '@mui/material'
import { ReactNode } from 'react'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #fff0cb 0%, #ffdede 100%)'
    }}>
      <Container maxWidth="sm">
        {children}
      </Container>
    </Box>
  )
}
