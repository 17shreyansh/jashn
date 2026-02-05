'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  Box,
  Typography,
  Button,
  Container,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { themeConfig } from '@/lib/config/theme'

/* ---------------- ANIMATION (UNCHANGED) ---------------- */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
}

const itemVariants = {
  hidden: { y: 30, opacity: 0, filter: 'blur(10px)' },
  visible: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { type: 'spring' as const, stiffness: 50, damping: 20 }
  }
}

export default function HeroSection() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '80%'])

  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        minHeight: { xs: '90vh', md: '100vh' },
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        bgcolor: themeConfig.colors.black,
        pt: '100px'
      }}
    >
      {/* ---------------- BACKGROUND ---------------- */}

      <Box
        component={motion.div}
        style={{ y: backgroundY }}
        sx={{
          position: 'absolute',
          top: -60,
          left: 0,
          right: 0,
          bottom: -60,
          zIndex: 0
        }}
      >
        <Box
          component={motion.div}
          animate={{ scale: [1, 1.15] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'easeInOut'
          }}
          sx={{ position: 'relative', width: '100%', height: '100%' }}
        >
          <Image
            src="/taj.png"
            alt="Luxury Event Background"
            fill
            priority
            quality={95}
            sizes="100vw"
            style={{
              objectFit: 'cover',
              objectPosition: 'center center'
            }}
          />
        </Box>

        <Box
          sx={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.25) 40%, rgba(0,0,0,0.75) 100%)'
          }}
        />
      </Box>

      {/* ---------------- CONTENT ---------------- */}

      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 1
        }}
      >
        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ y: textY }}
          sx={{
            textAlign: 'center',
            py: { xs: 10, md: 16 },
            maxWidth: 900,
            mx: 'auto'
          }}
        >
          {/* TITLE */}

          <Box component={motion.div} variants={itemVariants}>
            <Typography
              component="h1"
              sx={{
                fontFamily: themeConfig.fonts.heading,
                fontWeight: 700,
                lineHeight: 1.1,
                color: themeConfig.colors.white,
                letterSpacing: '-0.02em',
                textShadow: '0 10px 40px rgba(0,0,0,0.6)',
                fontSize: {
                  xs: '2.8rem',
                  sm: '3.8rem',
                  md: '5rem',
                  lg: '6rem'
                }
              }}
            >
              Jashn
            </Typography>

            <Typography
              sx={{
                fontFamily: themeConfig.fonts.heading,
                fontWeight: 400,
                color: themeConfig.colors.luxury,
                letterSpacing: '0.18em',
                mt: 1,
                fontSize: {
                  xs: '1.3rem',
                  sm: '2rem',
                  md: '2.8rem',
                  lg: '3.5rem'
                }
              }}
            >
              PLANNERS
            </Typography>
          </Box>

          {/* DIVIDER */}

          <Box component={motion.div} variants={itemVariants}>
            <Box
              sx={{
                width: { xs: 70, md: 90 },
                height: 2,
                mx: 'auto',
                my: 4,
                background: `linear-gradient(90deg, transparent, ${themeConfig.colors.luxury}, transparent)`
              }}
            />
          </Box>

          {/* SUBTITLE */}

          <Box component={motion.div} variants={itemVariants}>
            <Typography
              sx={{
                textTransform: 'uppercase',
                letterSpacing: '0.35em',
                fontWeight: 300,
                color: themeConfig.colors.white,
                opacity: 0.85,
                fontSize: { xs: 12, md: 14 }
              }}
            >
              Events & Holidays
            </Typography>
          </Box>

          {/* TAGLINE */}

          <Box component={motion.div} variants={itemVariants}>
            <Typography
              sx={{
                fontFamily: themeConfig.fonts.heading,
                fontStyle: 'italic',
                mt: 3,
                mb: 6,
                maxWidth: 640,
                mx: 'auto',
                lineHeight: 1.7,
                color: '#ffffffdd',
                fontSize: {
                  xs: '0.95rem',
                  md: '1.15rem'
                }
              }}
            >
              Crafting royal celebrations and unforgettable journeys across
              the globe
            </Typography>
          </Box>

          {/* BUTTONS */}

          <Box component={motion.div} variants={itemVariants}>
            <Box
              sx={{
                display: 'flex',
                gap: 3,
                justifyContent: 'center',
                flexDirection: { xs: 'column', sm: 'row' }
              }}
            >
              <Link href="/events" style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    px: 6,
                    py: 1.8,
                    borderRadius: '999px',
                    fontWeight: 700,
                    letterSpacing: 1,
                    color: themeConfig.colors.black,
                    background: `linear-gradient(135deg, ${themeConfig.colors.luxury}, ${themeConfig.colors.secondary})`,
                    boxShadow: `0 10px 40px ${themeConfig.colors.luxury}55`,
                    '&:hover': {
                      boxShadow: `0 14px 50px ${themeConfig.colors.luxury}80`
                    }
                  }}
                >
                  Explore Events
                </Button>
              </Link>

              <Link href="/tours" style={{ textDecoration: 'none' }}>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    px: 6,
                    py: 1.8,
                    borderRadius: '999px',
                    fontWeight: 700,
                    letterSpacing: 1,
                    borderWidth: 2,
                    color: themeConfig.colors.white,
                    borderColor: themeConfig.colors.white,
                    backdropFilter: 'blur(6px)',
                    bgcolor: 'rgba(255,255,255,0.08)',
                    '&:hover': {
                      borderColor: themeConfig.colors.luxury,
                      color: themeConfig.colors.luxury,
                      bgcolor: `${themeConfig.colors.luxury}22`
                    }
                  }}
                >
                  Discover Tours
                </Button>
              </Link>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* ---------------- SCROLL INDICATOR (UNCHANGED) ---------------- */}

      <Box
        component={motion.div}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        sx={{
          position: 'absolute',
          bottom: 30,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: { xs: 'none', md: 'flex' },
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Typography
          sx={{
            fontSize: '0.65rem',
            letterSpacing: 3,
            color: `${themeConfig.colors.white}80`,
            mb: 1.5,
            textTransform: 'uppercase'
          }}
        >
          Scroll
        </Typography>

        <Box
          sx={{
            width: '1px',
            height: 60,
            background: `${themeConfig.colors.white}33`,
            overflow: 'hidden'
          }}
        >
          <Box
            component={motion.div}
            animate={{ y: ['-100%', '100%'] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: 'linear'
            }}
            sx={{
              width: '100%',
              height: '50%',
              background: `linear-gradient(to bottom, transparent, ${themeConfig.colors.luxury})`
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}
