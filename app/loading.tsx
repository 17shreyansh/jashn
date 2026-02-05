'use client'

import { Box, CircularProgress, Typography } from '@mui/material'

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
      <Box sx={{ textAlign: 'center' }}>
        <Box sx={{ position: 'relative', display: 'inline-block', mb: 3 }}>
          <CircularProgress
            size={80}
            thickness={2}
            sx={{ color: 'var(--color-luxury)' }}
          />
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 12,
              height: 12,
              bgcolor: 'var(--color-primary)',
              borderRadius: '50%',
              animation: 'pulse 2s ease-in-out infinite',
              '@keyframes pulse': {
                '0%, 100%': { opacity: 1, transform: 'translate(-50%, -50%) scale(1)' },
                '50%': { opacity: 0.6, transform: 'translate(-50%, -50%) scale(0.8)' }
              }
            }}
          />
        </Box>
        <Typography
          variant="h4"
          sx={{
            fontFamily: 'serif',
            color: 'var(--color-text-dark)',
            mb: 1
          }}
        >
          Jashn
        </Typography>
        <Box sx={{ display: 'flex', gap: 0.5, justifyContent: 'center' }}>
          {[0, 150, 300].map((delay, i) => (
            <Box
              key={i}
              sx={{
                width: 6,
                height: 6,
                bgcolor: 'var(--color-luxury)',
                borderRadius: '50%',
                animation: 'bounce 1s ease-in-out infinite',
                animationDelay: `${delay}ms`,
                '@keyframes bounce': {
                  '0%, 100%': { transform: 'translateY(0)' },
                  '50%': { transform: 'translateY(-8px)' }
                }
              }}
            />
          ))}
        </Box>
      </Box>
    </Box>
  )
}
