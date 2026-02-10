'use client'

import { motion } from 'framer-motion'
import { Box, Typography, Button, Container } from '@mui/material'
import { themeConfig } from '@/lib/config/theme'
import Link from 'next/link'

export default function CTASection() {
  return (
    <Box sx={{ 
      py: { xs: 12, md: 16 }, 
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
      position: 'relative',
      overflow: 'hidden',
      borderTop: `1px solid ${themeConfig.colors.luxury}20`,
      borderBottom: `1px solid ${themeConfig.colors.luxury}20`
    }}>
      <Box sx={{
        position: 'absolute',
        inset: 0,
        opacity: 0.03,
        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }} />
      
      <Box
        component={motion.div}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${themeConfig.colors.luxury}, transparent)`,
          transformOrigin: 'center'
        }}
      />
      
      <Container maxWidth="md" sx={{ position: 'relative', textAlign: 'center' }}>
        <Box
          component={motion.div}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Typography 
            sx={{ 
              fontFamily: themeConfig.fonts.heading,
              fontSize: { xs: '3rem', md: '4rem' },
              fontWeight: 800,
              color: 'white',
              mb: 3,
              lineHeight: 1.2
            }}
          >
            Ready to Start Planning?
          </Typography>
          
          <Box sx={{ width: 80, height: 2, bgcolor: themeConfig.colors.luxury, mx: 'auto', mb: 4 }} />
          
          <Typography sx={{ 
            mb: 6, 
            fontSize: { xs: '1.25rem', md: '1.5rem' }, 
            color: 'rgba(255,255,255,0.8)',
            fontWeight: 600,
            maxWidth: 600,
            mx: 'auto',
            lineHeight: 1.7
          }}>
            Let's create something extraordinary together. Your journey begins with a conversation.
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 3, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" style={{ textDecoration: 'none' }}>
              <Button 
                variant="contained"
                size="large"
                sx={{ 
                  px: 8, 
                  py: 2.5, 
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  borderRadius: '999px',
                  bgcolor: themeConfig.colors.luxury,
                  color: themeConfig.colors.black,
                  boxShadow: `0 10px 40px ${themeConfig.colors.luxury}40`,
                  '&:hover': {
                    bgcolor: themeConfig.colors.secondary,
                    transform: 'translateY(-2px)',
                    boxShadow: `0 14px 50px ${themeConfig.colors.luxury}60`
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                Contact Us Today
              </Button>
            </Link>
            
            <Link href="/gallery" style={{ textDecoration: 'none' }}>
              <Button 
                variant="outlined"
                size="large"
                sx={{ 
                  px: 8, 
                  py: 2.5, 
                  fontSize: '1.25rem',
                  fontWeight: 800,
                  borderRadius: '999px',
                  borderWidth: 2,
                  borderColor: 'white',
                  color: 'white',
                  '&:hover': {
                    borderColor: themeConfig.colors.luxury,
                    bgcolor: 'rgba(255,255,255,0.05)',
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                View Gallery
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
      
      <Box
        component={motion.div}
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.2 }}
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '1px',
          background: `linear-gradient(90deg, transparent, ${themeConfig.colors.luxury}, transparent)`,
          transformOrigin: 'center'
        }}
      />
    </Box>
  )
}
