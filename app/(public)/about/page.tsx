'use client'

import { Box, Typography, Container, Stack } from '@mui/material'
import { motion } from 'framer-motion'
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
      {/* Hero Section - Dark Premium */}
      <Box sx={{ 
        minHeight: '70vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        bgcolor: themeConfig.colors.black,
        position: 'relative',
        overflow: 'hidden',
        pt: { xs: '100px', lg: '120px' }
      }}>
        <Box sx={{ 
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 30% 50%, rgba(107, 70, 193, 0.15), transparent 60%)',
          filter: 'blur(60px)'
        }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <MotionBox 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            sx={{ textAlign: 'center' }}
          >
            <Typography sx={{ 
              color: themeConfig.colors.luxury, 
              letterSpacing: '0.3em', 
              fontWeight: 800, 
              fontSize: '1rem',
              mb: 3,
              textTransform: 'uppercase'
            }}>SINCE 2009</Typography>
            <Typography sx={{ 
              fontFamily: themeConfig.fonts.heading, 
              fontSize: { xs: '3.5rem', md: '5.5rem' },
              fontWeight: 800,
              color: themeConfig.colors.white,
              mb: 3,
              lineHeight: 1.1,
              letterSpacing: '-0.02em'
            }}>About Jashn Planners</Typography>
            <Box sx={{ width: 80, height: 2, bgcolor: themeConfig.colors.luxury, mx: 'auto', mb: 4 }} />
            <Typography sx={{ 
              color: 'rgba(255,255,255,0.7)', 
              fontSize: { xs: '1.25rem', md: '1.5rem' },
              maxWidth: 700, 
              mx: 'auto', 
              fontWeight: 600,
              lineHeight: 1.7
            }}>Creating unforgettable moments and extraordinary memories</Typography>
          </MotionBox>
        </Container>
      </Box>

      {/* Story Section - Light */}
      <Box sx={{ py: { xs: 12, md: 18 }, bgcolor: '#fafaf9' }}>
        <Container maxWidth="xl">
          <Stack spacing={8}>
            <Box>
              <MotionBox
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Typography sx={{ 
                  color: themeConfig.colors.primary, 
                  letterSpacing: '0.25em', 
                  fontWeight: 800,
                  fontSize: '1rem',
                  mb: 2,
                  textTransform: 'uppercase'
                }}>OUR STORY</Typography>
                <Typography sx={{ 
                  fontFamily: themeConfig.fonts.heading,
                  fontSize: { xs: '3rem', md: '4rem' },
                  fontWeight: 800,
                  mb: 4,
                  lineHeight: 1.2,
                  color: themeConfig.colors.textDark
                }}>Designing Dreams,<br/>Crafting Reality</Typography>
                <Typography sx={{ 
                  color: themeConfig.colors.textLight, 
                  mb: 3, 
                  fontSize: '1.2rem', 
                  lineHeight: 1.8,
                  fontWeight: 600
                }}>
                  Jashn Planners was founded with a simple vision: to transform ordinary moments into extraordinary memories. With over 15 years of experience in event planning and luxury travel, we bring creativity, precision, and passion to every project.
                </Typography>
                <Typography sx={{ 
                  color: themeConfig.colors.textLight, 
                  mb: 5, 
                  fontSize: '1.2rem', 
                  lineHeight: 1.8,
                  fontWeight: 600
                }}>
                  From intimate gatherings to grand celebrations, from exotic destinations to hidden gems, we curate experiences that reflect your unique style and exceed your expectations.
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                  {[
                    'Award-winning service excellence', 
                    'Expert team of certified professionals', 
                    'Exclusive worldwide partnerships'
                  ].map((text, i) => (
                    <Box key={i} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                      <CheckCircleIcon sx={{ color: themeConfig.colors.luxury, fontSize: 24 }} />
                      <Typography sx={{ fontSize: '1.125rem', fontWeight: 700, color: themeConfig.colors.textDark }}>{text}</Typography>
                    </Box>
                  ))}
                </Box>
              </MotionBox>
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 3 }}>
              <MotionBox
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 3 }}
              >
                {[
                  { icon: <StarIcon sx={{ fontSize: 40 }} />, title: 'Award Winning', sub: 'Industry Leader' },
                  { icon: <GroupsIcon sx={{ fontSize: 40 }} />, title: 'Expert Team', sub: 'Dedicated Pros' },
                  { icon: <CelebrationIcon sx={{ fontSize: 40 }} />, title: 'Luxury Focus', sub: 'Premium Only' },
                  { icon: <PublicIcon sx={{ fontSize: 40 }} />, title: 'Global Reach', sub: 'Anywhere' },
                ].map((card, i) => (
                  <MotionBox
                    key={i}
                    whileHover={{ y: -8, scale: 1.02 }}
                    sx={{ 
                      p: 4, 
                      textAlign: 'center',
                      bgcolor: 'white',
                      borderRadius: '24px',
                      border: `1px solid ${themeConfig.colors.luxury}20`,
                      boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                      transition: 'all 0.3s ease',
                      cursor: 'default'
                    }}
                  >
                    <Box sx={{ color: themeConfig.colors.luxury, mb: 2 }}>{card.icon}</Box>
                    <Typography sx={{ fontWeight: 700, fontSize: '1.3rem', mb: 0.5, color: themeConfig.colors.textDark }}>{card.title}</Typography>
                    <Typography sx={{ fontSize: '1rem', color: themeConfig.colors.textLight, fontWeight: 600 }}>{card.sub}</Typography>
                  </MotionBox>
                ))}
              </MotionBox>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Why Choose Us - Dark Premium */}
      <Box sx={{ py: { xs: 12, md: 18 }, bgcolor: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ 
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 600,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${themeConfig.colors.luxury}15, transparent)`,
          filter: 'blur(100px)'
        }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Typography sx={{ 
              color: themeConfig.colors.luxury, 
              letterSpacing: '0.25em', 
              fontWeight: 800,
              fontSize: '1rem',
              mb: 2,
              textTransform: 'uppercase'
            }}>EXCELLENCE</Typography>
            <Typography sx={{ 
              fontFamily: themeConfig.fonts.heading,
              fontSize: { xs: '3rem', md: '4rem' },
              fontWeight: 800,
              color: themeConfig.colors.white,
              lineHeight: 1.2
            }}>Why Choose Us</Typography>
          </Box>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 4 }}>
            {[
              { title: 'Personalized Service', desc: 'Every event and trip is tailored to your unique preferences and requirements.' },
              { title: 'Expert Team', desc: 'Our experienced professionals handle every detail with care and precision.' },
              { title: 'Premium Quality', desc: 'We partner with the best vendors and destinations to ensure excellence.' },
              { title: 'Stress-Free Experience', desc: 'Relax and enjoy while we manage all the logistics and coordination.' },
            ].map((item, i) => (
              <Box key={i}>
                <MotionBox
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  whileHover={{ y: -8 }}
                  sx={{ 
                    p: 5, 
                    height: '100%',
                    borderRadius: '24px',
                    border: `1px solid ${themeConfig.colors.luxury}30`,
                    bgcolor: 'rgba(255,255,255,0.03)',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    '&:hover': { 
                      bgcolor: 'rgba(255,255,255,0.05)',
                      borderColor: themeConfig.colors.luxury
                    }
                  }}
                >
                  <Box sx={{ display: 'flex', gap: 3, alignItems: 'flex-start' }}>
                    <CheckCircleIcon sx={{ color: themeConfig.colors.luxury, fontSize: 32, flexShrink: 0, mt: 0.5 }} />
                    <Box>
                      <Typography sx={{ 
                        fontFamily: themeConfig.fonts.heading,
                        fontSize: '1.75rem',
                        fontWeight: 700,
                        mb: 2,
                        color: themeConfig.colors.white
                      }}>{item.title}</Typography>
                      <Typography sx={{ 
                        color: 'rgba(255,255,255,0.7)', 
                        lineHeight: 1.8,
                        fontSize: '1.125rem',
                        fontWeight: 600
                      }}>{item.desc}</Typography>
                    </Box>
                  </Box>
                </MotionBox>
              </Box>
            ))}
          </Box>
        </Container>
      </Box>
    </Box>
  )
}
