'use client'

import { Box, Typography, Container, Grid, Stack } from '@mui/material'
import { motion } from 'framer-motion'
import Card from '@/components/ui-new/Card'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import StarIcon from '@mui/icons-material/Star'
import GroupsIcon from '@mui/icons-material/Groups'
import CelebrationIcon from '@mui/icons-material/Celebration'
import PublicIcon from '@mui/icons-material/Public'
import { themeConfig } from '@/lib/config/theme'

const MotionBox = motion(Box)

export default function AboutPage() {
  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ 
        minHeight: '60vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${themeConfig.colors.accent2}50, ${themeConfig.colors.accent1}40)`,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Box sx={{ 
          position: 'absolute',
          top: -100,
          right: -100,
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${themeConfig.colors.primary}20, transparent)`,
          filter: 'blur(80px)'
        }} />
        <Container maxWidth="lg">
          <MotionBox 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}
          >
            <Typography variant="overline" color="secondary" sx={{ fontWeight: 700, letterSpacing: 2, mb: 2 }}>SINCE 2009</Typography>
            <Typography variant="h1" sx={{ mb: 3, fontFamily: '"Playfair Display", serif', fontSize: { xs: '2.5rem', md: '4rem' } }}>About Jashn Planners</Typography>
            <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto', fontWeight: 300 }}>Creating unforgettable moments and extraordinary memories</Typography>
          </MotionBox>
        </Container>
      </Box>

      {/* Story Section */}
      <Box sx={{ py: { xs: 10, md: 14 }, bgcolor: 'white' }}>
        <Container maxWidth="xl">
          <Grid container spacing={8} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="overline" color="primary" sx={{ fontWeight: 700, letterSpacing: 2 }}>OUR STORY</Typography>
              <Typography variant="h2" sx={{ mb: 3, mt: 1 }}>Designing Dreams,<br/>Crafting Reality</Typography>
              <Typography color="text.secondary" sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.8 }}>
                Jashn Planners was founded with a simple vision: to transform ordinary moments into extraordinary memories. With over 15 years of experience in event planning and luxury travel, we bring creativity, precision, and passion to every project.
              </Typography>
              <Typography color="text.secondary" sx={{ mb: 4, fontSize: '1.1rem', lineHeight: 1.8 }}>
                From intimate gatherings to grand celebrations, from exotic destinations to hidden gems, we curate experiences that reflect your unique style and exceed your expectations.
              </Typography>
              
              <Stack spacing={2}>
                {[
                  'Award-winning service excellence', 
                  'Expert team of certified professionals', 
                  'Exclusive worldwide partnerships'
                ].map((text, i) => (
                  <Box key={i} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <CheckCircleIcon sx={{ color: 'secondary.main', fontSize: 24 }} />
                    <Typography variant="body1" fontWeight={500}>{text}</Typography>
                  </Box>
                ))}
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 3 }}>
                {[
                  { icon: <StarIcon fontSize="large" />, title: 'Award Winning', sub: 'Industry Leader' },
                  { icon: <GroupsIcon fontSize="large" />, title: 'Expert Team', sub: 'Dedicated Pros' },
                  { icon: <CelebrationIcon fontSize="large" />, title: 'Luxury Focus', sub: 'Premium Only' },
                  { icon: <PublicIcon fontSize="large" />, title: 'Global Reach', sub: 'Anywhere' },
                ].map((card, i) => (
                  <Card key={i} sx={{ 
                    p: 4, 
                    textAlign: 'center',
                    border: 'none',
                    bgcolor: 'neutral.100',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
                    transition: 'transform 0.3s ease',
                    '&:hover': { transform: 'translateY(-8px)' }
                  }}>
                    <Box sx={{ color: 'secondary.main', mb: 2 }}>{card.icon}</Box>
                    <Typography variant="h6" sx={{ mb: 0.5 }}>{card.title}</Typography>
                    <Typography variant="body2" color="text.secondary">{card.sub}</Typography>
                  </Card>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Why Choose Us */}
      <Box sx={{ py: { xs: 10, md: 14 }, bgcolor: 'neutral.100' }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: 'center', mb: 8 }}>
            <Typography variant="overline" color="primary" sx={{ fontWeight: 700, letterSpacing: 2 }}>EXCELLENCE</Typography>
            <Typography variant="h2" sx={{ mt: 1 }}>Why Choose Us</Typography>
          </Box>
          <Grid container spacing={4}>
            {[
              { title: 'Personalized Service', desc: 'Every event and trip is tailored to your unique preferences and requirements.' },
              { title: 'Expert Team', desc: 'Our experienced professionals handle every detail with care and precision.' },
              { title: 'Premium Quality', desc: 'We partner with the best vendors and destinations to ensure excellence.' },
              { title: 'Stress-Free Experience', desc: 'Relax and enjoy while we manage all the logistics and coordination.' },
            ].map((item, i) => (
              <Grid item xs={12} md={6} key={i}>
                <Card sx={{ 
                  p: 4, 
                  height: '100%',
                  border: `1px solid ${themeConfig.colors.luxury}30`,
                  bgcolor: 'white',
                  transition: 'all 0.3s ease',
                  '&:hover': { 
                    boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
                    borderColor: themeConfig.colors.luxury
                  }
                }}>
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <CheckCircleIcon sx={{ color: 'secondary.main', fontSize: 28, flexShrink: 0 }} />
                    <Box>
                      <Typography variant="h5" sx={{ mb: 1, fontFamily: '"Playfair Display", serif' }}>{item.title}</Typography>
                      <Typography color="text.secondary" sx={{ lineHeight: 1.8 }}>{item.desc}</Typography>
                    </Box>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  )
}
