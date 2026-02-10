'use client'

import { Box, Container, Typography, IconButton, Stack, Divider } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import Link from 'next/link'
import Image from 'next/image'
import { themeConfig } from '@/lib/config/theme'

export default function PublicFooter() {
  const year = new Date().getFullYear()

  return (
    <Box component="footer" sx={{ 
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)', 
      color: 'white', 
      mt: 'auto',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <Box sx={{
        position: 'absolute',
        inset: 0,
        opacity: 0.03,
        backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)',
        backgroundSize: '40px 40px'
      }} />
      
      <Container maxWidth="xl" sx={{ position: 'relative' }}>
        <Box sx={{ py: 8 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: 6 }}>
            <Box>
              <Box sx={{ mb: 3 }}>
                <Image src="/logo.png" alt="Jashn Planners" width={200} height={67} style={{ height: '100px', width: 'auto', mixBlendMode: 'lighten' }} />
              </Box>
              <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)', mb: 3, lineHeight: 1.8 }}>
                Creating unforgettable moments through premium event planning and luxury travel experiences.
              </Typography>
              <Stack direction="row" spacing={1.5}>
                <IconButton 
                  size="small"
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    '&:hover': { 
                      bgcolor: themeConfig.colors.luxuryL,
                      borderColor: themeConfig.colors.luxuryL,
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s'
                  }}
                >
                  <FacebookIcon sx={{ color: 'white', fontSize: 18 }} />
                </IconButton>
                <IconButton 
                  size="small"
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    '&:hover': { 
                      bgcolor: themeConfig.colors.luxuryL,
                      borderColor: themeConfig.colors.luxuryL,
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s'
                  }}
                >
                  <InstagramIcon sx={{ color: 'white', fontSize: 18 }} />
                </IconButton>
                <IconButton 
                  size="small"
                  sx={{ 
                    bgcolor: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    '&:hover': { 
                      bgcolor: themeConfig.colors.luxuryL,
                      borderColor: themeConfig.colors.luxuryL,
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s'
                  }}
                >
                  <TwitterIcon sx={{ color: 'white', fontSize: 18 }} />
                </IconButton>
              </Stack>
            </Box>

            <Box>
              <Typography sx={{ fontWeight: 700, mb: 2.5, fontSize: '1rem', color: themeConfig.colors.luxuryL }}>
                Services
              </Typography>
              <Stack spacing={1.5}>
                <Link href="/events" style={{ textDecoration: 'none' }}>
                  <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', '&:hover': { color: themeConfig.colors.luxuryL }, transition: 'color 0.2s', cursor: 'pointer', fontWeight: 600 }}>Event Planning</Typography>
                </Link>
                <Link href="/tours" style={{ textDecoration: 'none' }}>
                  <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', '&:hover': { color: themeConfig.colors.luxuryL }, transition: 'color 0.2s', cursor: 'pointer', fontWeight: 600 }}>Tours & Travel</Typography>
                </Link>
                <Link href="/gallery" style={{ textDecoration: 'none' }}>
                  <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', '&:hover': { color: themeConfig.colors.luxuryL }, transition: 'color 0.2s', cursor: 'pointer', fontWeight: 600 }}>Gallery</Typography>
                </Link>
              </Stack>
            </Box>

            <Box>
              <Typography sx={{ fontWeight: 700, mb: 2.5, fontSize: '1rem', color: themeConfig.colors.luxuryL }}>
                Company
              </Typography>
              <Stack spacing={1.5}>
                <Link href="/about" style={{ textDecoration: 'none' }}>
                  <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', '&:hover': { color: themeConfig.colors.luxuryL }, transition: 'color 0.2s', cursor: 'pointer', fontWeight: 600 }}>About Us</Typography>
                </Link>
                <Link href="/contact" style={{ textDecoration: 'none' }}>
                  <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', '&:hover': { color: themeConfig.colors.luxuryL }, transition: 'color 0.2s', cursor: 'pointer', fontWeight: 600 }}>Contact</Typography>
                </Link>
              </Stack>
            </Box>

            <Box>
              <Typography sx={{ fontWeight: 700, mb: 2.5, fontSize: '1rem', color: themeConfig.colors.luxuryL }}>
                Contact Info
              </Typography>
              <Stack spacing={1.5}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', fontWeight: 600 }}>
                  Email: hello@jashn.com
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', fontWeight: 600 }}>
                  Phone: +1 (555) 123-4567
                </Typography>
              </Stack>
            </Box>
          </Box>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

        <Box sx={{ py: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', fontWeight: 600 }}>
            © {year} Jashn Planners. All rights reserved.
          </Typography>
          <Link href="https://affobe.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', '&:hover': { color: themeConfig.colors.luxuryL }, transition: 'color 0.2s', fontWeight: 600 }}>
              Crafted with ❤️ by <Box component="span" sx={{ color: themeConfig.colors.luxuryL }}>AFFOBE</Box>
            </Typography>
          </Link>
          <Stack direction="row" spacing={3}>
            <Link href="#" style={{ textDecoration: 'none' }}>
              <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', '&:hover': { color: themeConfig.colors.luxuryL }, transition: 'color 0.2s', cursor: 'pointer', fontWeight: 600 }}>Privacy</Typography>
            </Link>
            <Link href="#" style={{ textDecoration: 'none' }}>
              <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem', '&:hover': { color: themeConfig.colors.luxuryL }, transition: 'color 0.2s', cursor: 'pointer', fontWeight: 600 }}>Terms</Typography>
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}
