'use client'

import { Box } from '@mui/material'
import Image from 'next/image'

export default function Loading() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, var(--color-accent2) 0%, #ffffff 50%, rgba(255, 222, 222, 0.2) 100%)'
      }}
    >
      <Image src="/logo.png" alt="Jashn Logo" width={150} height={150} priority />
    </Box>
  )
}
