'use client'

import { Box, Container, Grid, Typography, IconButton, Stack, Divider } from '@mui/material'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import TwitterIcon from '@mui/icons-material/Twitter'
import Link from 'next/link'
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
          <Grid container spacing={6}>
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <Box sx={{ 
                  width: 48, 
                  height: 48, 
                  borderRadius: 3,
                  background: `linear-gradient(135deg, ${themeConfig.colors.primary}, ${themeConfig.colors.accent1})`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '1.5rem',
                  fontFamily: '"Playfair Display", serif',
                  boxShadow: `0 8px 24px ${themeConfig.colors.primary}40`
                }}>
                  J
                </Box>
                <Box>
                  <Typography sx={{ fontWeight: 700, fontSize: '1.25rem', fontFamily: '"Playfair Display", serif' }}>
                    Jashn
                  </Typography>
                  <Typography sx={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.5)', mt: -0.5 }}>
                    Planners
                  </Typography>
                </Box>
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
                      bgcolor: themeConfig.colors.luxury,
                      borderColor: themeConfig.colors.luxury,
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
                      bgcolor: themeConfig.colors.luxury,
                      borderColor: themeConfig.colors.luxury,
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
                      bgcolor: themeConfig.colors.luxury,
                      borderColor: themeConfig.colors.luxury,
                      transform: 'translateY(-2px)'
                    },
                    transition: 'all 0.3s'
                  }}
                >
                  <TwitterIcon sx={{ color: 'white', fontSize: 18 }} />
                </IconButton>
              </Stack>
            </Grid>

            <Grid item xs={6} md={2}>
              <Typography sx={{ fontWeight: 600, mb: 2.5, fontSize: '0.875rem', color: themeConfig.colors.luxury }}>
                Services
              </Typography>
              <Stack spacing={1.5}>
                <Link href="/events" style={{ textDecoration: 'none' }}>
                  <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', '&:hover': { color: themeConfig.colors.luxury }, transition: 'color 0.2s', cursor: 'pointer' }}>Event Planning</Typography>
                </Link>
                <Link href="/tours" style={{ textDecoration: 'none' }}>
                  <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', '&:hover': { color: themeConfig.colors.luxury }, transition: 'color 0.2s', cursor: 'pointer' }}>Tours & Travel</Typography>
                </Link>
                <Link href="/gallery" style={{ textDecoration: 'none' }}>
                  <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', '&:hover': { color: themeConfig.colors.luxury }, transition: 'color 0.2s', cursor: 'pointer' }}>Gallery</Typography>
                </Link>
              </Stack>
            </Grid>

            <Grid item xs={6} md={2}>
              <Typography sx={{ fontWeight: 600, mb: 2.5, fontSize: '0.875rem', color: themeConfig.colors.luxury }}>
                Company
              </Typography>
              <Stack spacing={1.5}>
                <Link href="/about" style={{ textDecoration: 'none' }}>
                  <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', '&:hover': { color: themeConfig.colors.luxury }, transition: 'color 0.2s', cursor: 'pointer' }}>About Us</Typography>
                </Link>
                <Link href="/contact" style={{ textDecoration: 'none' }}>
                  <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem', '&:hover': { color: themeConfig.colors.luxury }, transition: 'color 0.2s', cursor: 'pointer' }}>Contact</Typography>
                </Link>
              </Stack>
            </Grid>

            <Grid item xs={12} md={4}>
              <Typography sx={{ fontWeight: 600, mb: 2.5, fontSize: '0.875rem', color: themeConfig.colors.luxury }}>
                Contact Info
              </Typography>
              <Stack spacing={1.5}>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>
                  Email: hello@jashn.com
                </Typography>
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.875rem' }}>
                  Phone: +1 (555) 123-4567
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Box>

        <Divider sx={{ borderColor: 'rgba(255,255,255,0.08)' }} />

        <Box sx={{ py: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8125rem' }}>
            © {year} Jashn Planners. All rights reserved.
          </Typography>
          <Link href="https://affobe.com/" target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
            <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8125rem', '&:hover': { color: themeConfig.colors.luxury }, transition: 'color 0.2s' }}>
              Crafted with ❤️ by <Box component="span" sx={{ color: themeConfig.colors.luxury }}>AFFOBE</Box>
            </Typography>
          </Link>
          <Stack direction="row" spacing={3}>
            <Link href="#" style={{ textDecoration: 'none' }}>
              <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8125rem', '&:hover': { color: themeConfig.colors.luxury }, transition: 'color 0.2s', cursor: 'pointer' }}>Privacy</Typography>
            </Link>
            <Link href="#" style={{ textDecoration: 'none' }}>
              <Typography sx={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.8125rem', '&:hover': { color: themeConfig.colors.luxury }, transition: 'color 0.2s', cursor: 'pointer' }}>Terms</Typography>
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  )
}
