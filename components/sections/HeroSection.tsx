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
    transition: { staggerChildren: 0.15 }
  }
}

const itemVariants = {
  hidden: { y: 30, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8 }
  }
}

export default function HeroSection() {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])

  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        height: '100vh',
        minHeight: 720,
        overflow: 'hidden',
        color: 'white'
      }}
    >
      {/* IMAGE */}

      <motion.div
        style={{ y: backgroundY, position: 'absolute', inset: 0 }}
      >
        <Image
          src="/taj3.jpeg"
          alt="Luxury"
          fill
          priority
          style={{
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />
      </motion.div>

      {/* SUBTLE GRADIENT FOR READABILITY */}

      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(
              to top,
              rgba(0,0,0,0.55) 0%,
              rgba(0,0,0,0.25) 30%,
              transparent 60%
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
        <Box
          component={motion.div}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          maxWidth={650}
        >
          {/* TITLE */}

          <Box
            component={motion.h1}
            variants={itemVariants}
            sx={{
              fontFamily: themeConfig.fonts.heading,
              fontWeight: 700,
              fontSize: { xs: 42, md: 72 },
              lineHeight: 1.05,
              m: 0
            }}
          >
            Jashn
          </Box>

          <Box
            component={motion.div}
            variants={itemVariants}
            sx={{
              letterSpacing: '0.4em',
              color: themeConfig.colors.luxuryL,
              mb: 2
            }}
          >
            PLANNERS
          </Box>

          {/* EVENTS & HOLIDAYS */}

          <Box
            component={motion.div}
            variants={itemVariants}
            sx={{
              textTransform: 'uppercase',
              letterSpacing: '0.35em',
              fontSize: 13,
              opacity: 0.85,
              mb: 3
            }}
          >
            Events & Holidays
          </Box>

          {/* TAGLINE */}

          <Box
            component={motion.div}
            variants={itemVariants}
            sx={{
              fontSize: { xs: 16, md: 18 },
              mb: 5,
              maxWidth: 520,
              opacity: 0.9
            }}
          >
            Crafting royal celebrations and unforgettable journeys across the globe
          </Box>

          {/* BUTTONS */}

          <Box
            component={motion.div}
            variants={itemVariants}
            display="flex"
            gap={3}
            flexWrap="wrap"
          >
            <Link href="/events" style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                sx={{
                  px: 5,
                  py: 1.6,
                  borderRadius: 50,
                  fontWeight: 600,
                  background: themeConfig.colors.luxury,
                  color: '#000'
                }}
              >
                Explore Events
              </Button>
            </Link>

            <Link href="/tours" style={{ textDecoration: 'none' }}>
              <Button
                variant="outlined"
                sx={{
                  px: 5,
                  py: 1.6,
                  borderRadius: 50,
                  color: '#fff',
                  borderColor: '#fff',
                  '&:hover': {
                    borderColor: themeConfig.colors.luxury,
                    color: themeConfig.colors.luxury
                  }
                }}
              >
                Discover Tours
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  )
}
