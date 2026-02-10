'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  Box,
  Typography,
  Button,
  Container
} from '@mui/material'
import { themeConfig } from '@/lib/config/theme'

/* ANIMATION */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.18 }
  }
}

const itemVariants = {
  hidden: { y: 40, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.9 }
  }
}

export default function HeroSection() {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  const backgroundY = useTransform(
    scrollYProgress,
    [0, 1],
    ['0%', '30%']
  )

  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        height: '100vh',
        minHeight: 720,
        overflow: 'hidden',
        color: '#fff'
      }}
    >

      {/* PARALLAX IMAGE */}

      <motion.div
        style={{ y: backgroundY, position: 'absolute', inset: 0 }}
      >
        <Image
          src="/bg.jpg"
          alt="Luxury"
          fill
          priority
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            filter: 'brightness(1.5) saturate(1.2)'
          }}
        />
      </motion.div>

      {/* DARK LUXURY OVERLAY (FIXES CONTRAST) */}

      

      {/* GOLD ACCENT GLOW */}

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `
            radial-gradient(
              circle at 20% 30%,
              rgba(212,175,55,0.18),
              transparent 40%
            )
          `
        }}
      />

      {/* CONTENT */}

      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 2,
          height: '100%',
          display: 'flex',
          alignItems: 'flex-end',
          pb: { xs: 10, md: 14 }
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ maxWidth: 650 }}
        >

          {/* TITLE */}

          <motion.h1
            variants={itemVariants}
            style={{
              fontFamily: themeConfig.fonts.heading,
              fontWeight: 900,
              fontSize: 'clamp(56px, 10vw, 110px)',
              lineHeight: 1.05,
              margin: 0,
              marginBottom: 16,
              background: 'linear-gradient(90deg, #FFD700 0%, #FFA500 25%, #FFD700 50%, #FFA500 75%, #FFD700 100%)',
              backgroundSize: '200% auto',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-1px',
              animation: 'sparkle 3s linear infinite',
              filter: 'drop-shadow(0 6px 30px rgba(255,215,0,0.8)) drop-shadow(0 2px 10px rgba(255,215,0,0.9))'
            }}
          >
            Jashn Planners
          </motion.h1>

          {/* LABEL */}

          <motion.div
            variants={itemVariants}
            style={{
              textTransform: 'uppercase',
              letterSpacing: '0.4em',
              fontSize: 22,
              fontWeight: 900,
              color: '#fff',
              marginBottom: 24,
              textShadow: '0 2px 10px rgba(0,0,0,0.5)'
            }}
          >
            Events & Holidays
          </motion.div>

          {/* TAGLINE */}

          <motion.p
            variants={itemVariants}
            style={{
              fontSize: 'clamp(22px, 3vw, 26px)',
              fontWeight: 800,
              marginBottom: 48,
              maxWidth: 560,
              color: '#fff',
              lineHeight: 1.7,
              textShadow: '0 2px 12px rgba(0,0,0,0.6)'
            }}
          >
            Crafting royal celebrations and unforgettable journeys across the globe.
          </motion.p>

          {/* BUTTONS */}

          <motion.div
            variants={itemVariants}
            style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}
          >
            <Link href="/events" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                sx={{
                  px: 6,
                  py: 2.2,
                  borderRadius: 50,
                  fontWeight: 800,
                  fontSize: 17,
                  background: '#D4AF37',
                  color: '#000',
                  boxShadow: '0 8px 30px rgba(212,175,55,0.35)',

                  '&:hover': {
                    background: '#E6C35C',
                    transform: 'translateY(-3px)'
                  }
                }}
              >
                Explore Events
              </Button>
            </Link>

            <Link href="/tours" style={{ textDecoration: 'none' }}>
              <Button
                variant="outlined"
                sx={{
                  px: 6,
                  py: 2.2,
                  borderRadius: 50,
                  fontWeight: 800,
                  fontSize: 17,
                  color: '#fff',
                  borderColor: 'rgba(255,255,255,0.7)',
                  borderWidth: 2,

                  '&:hover': {
                    borderColor: '#fff',
                    background: 'rgba(255,255,255,0.12)'
                  }
                }}
              >
                Discover Tours
              </Button>
            </Link>
          </motion.div>

        </motion.div>
      </Container>
    </Box>
  )
}
