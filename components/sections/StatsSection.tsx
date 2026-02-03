'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useSpring, useTransform } from 'framer-motion'
import { Box, Typography, Container } from '@mui/material'
import { themeConfig } from '@/lib/config/theme'

const MotionBox = motion(Box)
const MotionTypography = motion(Typography)

function SmoothCounter({ value }: { value: number }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  const springValue = useSpring(0, {
    stiffness: 50,
    damping: 20,
    duration: 2.5
  })

  const displayValue = useTransform(springValue, (latest) =>
    Math.floor(latest).toLocaleString()
  )

  useEffect(() => {
    if (isInView) {
      springValue.set(value)
    }
  }, [isInView, value, springValue])

  return <motion.span ref={ref}>{displayValue}</motion.span>
}

const StatBlock = ({ label, value, suffix, index, total }: any) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <MotionBox
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        position: 'relative',
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: { xs: 'center', md: 'flex-start' },
        py: { xs: 6, md: 10 },
        px: { xs: 3, md: 6 },
        borderRight: {
          xs: 'none',
          md: index !== total - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none'
        },
        borderBottom: {
          xs: index !== total - 1 ? '1px solid rgba(255,255,255,0.1)' : 'none',
          md: 'none'
        },
        cursor: 'default',
        transition: 'all 0.5s ease',
        '&:hover': {
          bgcolor: 'rgba(255,255,255,0.03)'
        }
      }}
    >
      <Typography
        variant="overline"
        sx={{
          color: isHovered ? themeConfig.colors.luxury : 'rgba(255,255,255,0.5)',
          fontWeight: 600,
          letterSpacing: '0.2em',
          mb: 2,
          fontSize: { xs: '0.7rem', md: '0.75rem' },
          transition: 'color 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          textAlign: { xs: 'center', md: 'left' }
        }}
      >
        <Box
          component="span"
          sx={{
            fontSize: '0.6em',
            opacity: 0.5,
            fontFamily: '"Playfair Display", serif'
          }}
        >
          0{index + 1}
        </Box>
        / {label}
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'baseline', overflow: 'hidden' }}>
        <MotionTypography
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontSize: { xs: '3.5rem', md: '5rem', lg: '5.5rem' },
            fontWeight: 400,
            color: '#ffffff',
            lineHeight: 1,
            letterSpacing: '-0.02em'
          }}
        >
          <SmoothCounter value={value} />
        </MotionTypography>

        <Typography
          component="span"
          sx={{
            fontSize: { xs: '2rem', md: '3rem' },
            color: themeConfig.colors.luxury,
            fontWeight: 300,
            ml: 1,
            opacity: 0.8
          }}
        >
          {suffix}
        </Typography>
      </Box>

      <MotionBox
        initial={{ width: 0 }}
        animate={{ width: isHovered ? '100%' : 0 }}
        transition={{ duration: 0.4 }}
        sx={{
          height: '2px',
          background: `linear-gradient(90deg, ${themeConfig.colors.luxury}, transparent)`,
          mt: 4,
          alignSelf: { xs: 'center', md: 'flex-start' },
          opacity: 0.6
        }}
      />
    </MotionBox>
  )
}

export default function StatsSection() {
  const stats = [
    { label: 'Events Curated', value: 500, suffix: '+' },
    { label: 'Royal Clients', value: 1000, suffix: '+' },
    { label: 'Global Destinations', value: 50, suffix: '+' },
    { label: 'Years Legacy', value: 15, suffix: '' }
  ]

  return (
    <Box
      sx={{
        bgcolor: '#0a0a0a',
        borderTop: `1px solid rgba(255,255,255,0.1)`,
        borderBottom: `1px solid rgba(255,255,255,0.1)`,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative blur */}
      <Box
        sx={{
          position: 'absolute',
          bottom: -100,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 400,
          height: 400,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${themeConfig.colors.luxury}20, transparent)`,
          filter: 'blur(80px)',
          pointerEvents: 'none'
        }}
      />

      <Container maxWidth="xl" disableGutters sx={{ position: 'relative', zIndex: 1 }}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            width: '100%'
          }}
        >
          {stats.map((stat, index) => (
            <StatBlock key={index} {...stat} index={index} total={stats.length} />
          ))}
        </Box>
      </Container>
    </Box>
  )
}