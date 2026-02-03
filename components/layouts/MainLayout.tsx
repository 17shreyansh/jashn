'use client'

import { Box, Container } from '@mui/material'
import { ReactNode } from 'react'
import PublicNavbar from './PublicNavbar'
import PublicFooter from './PublicFooter'

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <PublicNavbar />
      <Box component="main" sx={{ flex: 1 }}>
        {children}
      </Box>
      <PublicFooter />
    </Box>
  )
}
