'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import {
  Box,
  Button,
  Container,
  Typography
} from '@mui/material'
import { themeConfig } from '@/lib/config/theme'

/* ANIMATION VARIANTS */
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 }
  }
}

const itemVariants = {
  hidden: { y: 30, opacity: 0, filter: 'blur(10px)' },
  visible: {
    y: 0,
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 1, ease: [0.22, 1, 0.36, 1] as const }
  }
}

export default function HeroSection() {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  // Parallax: Background moves slower than text
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '40%'])

  return (
    <Box
      ref={ref}
      sx={{
        position: 'relative',
        height: '100vh',
        minHeight: 800,
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#1a0505', // Deep brown fallback
        color: '#fff' // FORCE ALL TEXT WHITE BY DEFAULT
      }}
    >
      {/* 1. PARALLAX BACKGROUND IMAGE */}
      <motion.div
        style={{
          y: backgroundY,
          position: 'absolute',
          inset: -20,
          zIndex: 0
        }}
      >
        <Image
          src="/taj.png"
          alt="Taj Mahal Silhouette"
          fill
          priority
          quality={100}
          style={{
            objectFit: 'cover',
            objectPosition: 'center 60%'
          }}
        />
      </motion.div>

      {/* 2. CINEMATIC OVERLAYS */}
      
      {/* Layer A: Dark gradient from bottom up to make text readable */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(60, 20, 10, 0.2) 40%, rgba(20, 5, 5, 0.9) 100%)'
        }}
      />

      {/* Layer B: Vignette */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          background: 'radial-gradient(circle at center, transparent 20%, rgba(0,0,0,0.5) 100%)'
        }}
      />

      {/* 3. CONTENT */}
      <Container
        maxWidth="lg"
        sx={{
          position: 'relative',
          zIndex: 10,
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center'
        }}
      >
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ 
            width: '100%', 
            maxWidth: 950,
            y: textY 
          }}
        >
          
          {/* SUPERTITLE */}
          <motion.div variants={itemVariants}>
            <Typography
              variant="subtitle1"
              sx={{
                color: '#FFD700', // Gold Text
                fontSize: 'clamp(14px, 2vw, 18px)',
                letterSpacing: '0.4em',
                fontWeight: 700,
                textTransform: 'uppercase',
                mb: 3,
                textShadow: '0 2px 20px rgba(0,0,0,0.9)',
                display: 'inline-block',
                borderBottom: '1px solid rgba(255, 215, 0, 0.6)',
                pb: 1
              }}
            >
              Events & Holidays
            </Typography>
          </motion.div>

          {/* MAIN HEADLINE */}
          <motion.h1
            variants={itemVariants}
            style={{
              margin: 0,
              fontFamily: themeConfig?.fonts?.heading || 'serif',
              fontWeight: 800,
              fontSize: 'clamp(56px, 13vw, 130px)',
              lineHeight: 1,
              letterSpacing: '-0.03em',
              color: '#fff',
              marginBottom: '32px',
              textShadow: '0 4px 30px rgba(0,0,0,0.7)' // Heavy shadow for contrast against sun
            }}
          >
            {/* Gradient Text for "Jashn" - White to Gold */}
            <span style={{ 
              background: 'linear-gradient(180deg, #FFFFFF 30%, #FFC107 100%)', 
              WebkitBackgroundClip: 'text', 
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.5))'
            }}>
              Jashn
            </span>{' '}
            <span style={{ fontStyle: 'italic', fontWeight: 300, opacity: 0.95 }}>
              Planners
            </span>
          </motion.h1>

          {/* SUBTEXT */}
          <motion.p
            variants={itemVariants}
            style={{
              fontSize: 'clamp(18px, 2.5vw, 24px)',
              fontWeight: 400,
              color: '#fff', // Pure White
              maxWidth: 680,
              margin: '0 auto 56px auto',
              lineHeight: 1.6,
              textShadow: '0 2px 10px rgba(0,0,0,0.9)' // Strong shadow ensures readability
            }}
          >
            Crafting royal celebrations and unforgettable journeys amidst the world&apos;s timeless wonders.
          </motion.p>

          {/* ACTION BUTTONS */}
          <motion.div
            variants={itemVariants}
            style={{
              display: 'flex',
              gap: 24,
              justifyContent: 'center',
              flexWrap: 'wrap'
            }}
          >
            {/* PRIMARY BUTTON - Deep Maroon with White Text */}
            <Link href="/events" passHref style={{ textDecoration: 'none' }}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  borderRadius: 50,
                  px: 6,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  textTransform: 'none',
                  // Deep Royal Red/Maroon Gradient
                  background: 'linear-gradient(135deg, #8B0000 0%, #580808 100%)', 
                  color: '#fff', // White Text
                  border: '1px solid rgba(255, 215, 0, 0.3)', // Subtle gold border
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                    boxShadow: '0 15px 40px rgba(139, 0, 0, 0.4)',
                    background: 'linear-gradient(135deg, #A52A2A 0%, #800000 100%)', 
                  }
                }}
              >
                Plan My Event
              </Button>
            </Link>

            {/* SECONDARY BUTTON - Glass with White Text */}
            <Link href="/tours" passHref style={{ textDecoration: 'none' }}>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderRadius: 50,
                  px: 6,
                  py: 2,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  textTransform: 'none',
                  color: '#fff', // White Text
                  borderColor: 'rgba(255,255,255,0.5)',
                  backdropFilter: 'blur(12px)',
                  backgroundColor: 'rgba(255,255,255,0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#fff',
                    backgroundColor: 'rgba(255,255,255,0.2)',
                    transform: 'translateY(-3px)',
                  }
                }}
              >
                Explore Tours
              </Button>
            </Link>
          </motion.div>

        </motion.div>
      </Container>
    </Box>
  )
}