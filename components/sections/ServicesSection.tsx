'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { Box, Typography, Container } from '@mui/material'
import { themeConfig } from '@/lib/config/theme'

const MotionBox = motion(Box)

const services = [
  {
    title: 'Events Planning',
    description:
      'We architect moments that transcend time. From grand galas to intimate luxury unions, every detail is orchestrated with precision.',
    href: '/events',
    image: '/event.jpeg'
  },
  {
    title: 'Tours & Travels',
    description:
      'Journey beyond the map. Our curators design exclusive passages to the worlds most enchanting destinations.',
    href: '/cities',
    image: '/tour.jpg'
  }
]

export default function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <Box
      sx={{
        background: `linear-gradient(135deg, ${themeConfig.colors.accent2}50, ${themeConfig.colors.accent1}40)`,
        minHeight: { xs: 'auto', md: '80vh' },
        display: 'flex',
        alignItems: 'center',
        py: { xs: 8, md: 12 },
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Decorative blur */}
      <Box
        sx={{
          position: 'absolute',
          bottom: -150,
          left: -150,
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${themeConfig.colors.primary}20, transparent)`,
          filter: 'blur(80px)',
          pointerEvents: 'none'
        }}
      />

      <Container maxWidth="xl">
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            border: `1px solid ${themeConfig.colors.luxury}30`,
            bgcolor: 'rgba(255, 255, 255, 0.6)',
            backdropFilter: 'blur(20px)',
            borderRadius: { xs: 3, md: 4 },
            overflow: 'hidden',
            boxShadow: themeConfig.shadows.lifted,
            gap: { xs: 0, md: 0 }
          }}
        >
          {services.map((service, index) => (
            <MotionBox
              key={index}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => setActiveIndex(activeIndex === index ? null : index)}
              animate={{
                flex: hoveredIndex === index ? 2 : 1
              }}
              transition={{ type: 'spring', stiffness: 150, damping: 25 }}
              sx={{
                p: { xs: 5, sm: 6, md: 6, lg: 7 },
                minHeight: { xs: '350px', sm: '400px', md: '550px', lg: '600px' },
                position: 'relative',
                cursor: 'pointer',
                overflow: 'hidden',
                borderBottom: {
                  xs: index === 0 ? `1px solid ${themeConfig.colors.luxury}20` : 'none',
                  md: 'none'
                },
                borderRight: {
                  xs: 'none',
                  md: index === 0 ? `1px solid ${themeConfig.colors.luxury}20` : 'none'
                },
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                transition: 'background-color 0.5s ease'
              }}
            >
              {/* Background Image */}
              <Box
                component={motion.div}
                animate={{
                  scale: hoveredIndex === index || activeIndex === index ? 1.05 : 1
                }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                sx={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 0
                }}
              >
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  style={{
                    objectFit: 'cover',
                    objectPosition: 'center'
                  }}
                  quality={90}
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </Box>

              {/* Dark Gradient for Text Readability */}
              <Box
                sx={{
                  position: 'absolute',
                  inset: 0,
                  zIndex: 1,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.5) 100%)'
                }}
              />

              {/* Decorative Number */}
              <Typography
                sx={{
                  position: 'absolute',
                  top: { xs: 20, md: 30 },
                  right: { xs: 20, md: 30 },
                  fontFamily: themeConfig.fonts.heading,
                  fontSize: { xs: '3rem', sm: '4rem', md: '5rem', lg: '6rem' },
                  fontWeight: 700,
                  color: themeConfig.colors.luxury,
                  opacity:
                    hoveredIndex === index || activeIndex === index ? 0.4 : 0.2,
                  transition: 'opacity 0.5s ease',
                  lineHeight: 1,
                  zIndex: 2
                }}
              >
                0{index + 1}
              </Typography>

              <Box sx={{ position: 'relative', zIndex: 2 }}>
                <Typography
                  sx={{
                    fontFamily: themeConfig.fonts.heading,
                    fontSize:
                      hoveredIndex === index || activeIndex === index
                        ? { xs: '2.5rem', sm: '3rem', md: '3.5rem', lg: '4rem' }
                        : { xs: '2rem', sm: '2.5rem', md: '3rem', lg: '3.5rem' },
                    lineHeight: 1.1,
                    mb: { xs: 2, md: 3 },
                    color: themeConfig.colors.white,
                    transition: 'font-size 0.5s ease',
                    letterSpacing: '-0.02em',
                    pr: { xs: 8, md: 10 },
                    textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                    fontWeight: 800
                  }}
                >
                  {service.title.split(' ').map((word, i) => (
                    <span key={i} style={{ display: 'block' }}>
                      {word}
                    </span>
                  ))}
                </Typography>

                <AnimatePresence>
                  {(hoveredIndex === index || activeIndex === index) && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <Typography
                        sx={{
                          fontSize: { xs: '1.1rem', sm: '1.15rem', md: '1.2rem' },
                          lineHeight: 1.8,
                          color: 'rgba(255,255,255,0.9)',
                          maxWidth: { xs: '100%', md: '450px' },
                          fontWeight: 600,
                          pr: { xs: 2, md: 0 },
                          textShadow: '0 1px 5px rgba(0,0,0,0.3)'
                        }}
                      >
                        {service.description}
                      </Typography>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Box>

              <Box sx={{ mt: 'auto', pt: { xs: 3, md: 4 }, position: 'relative', zIndex: 2 }}>
                <Link href={service.href} style={{ textDecoration: 'none' }}>
                  <MotionBox
                    animate={{
                      x: hoveredIndex === index || activeIndex === index ? 8 : 0
                    }}
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: { xs: 1.5, md: 2 },
                      color: themeConfig.colors.luxury,
                      transition: 'color 0.3s ease'
                    }}
                  >
                    <Typography
                      sx={{
                        fontWeight: 700,
                        letterSpacing: { xs: '0.1em', md: '0.15em' },
                        fontSize: { xs: '0.85rem', md: '0.9rem' },
                        textTransform: 'uppercase'
                      }}
                    >
                      Discover More
                    </Typography>
                    <Box
                      sx={{
                        width:
                          hoveredIndex === index || activeIndex === index
                            ? { xs: 40, md: 50 }
                            : { xs: 25, md: 30 },
                        height: '2px',
                        bgcolor: 'currentColor',
                        transition: 'width 0.3s ease'
                      }}
                    />
                  </MotionBox>
                </Link>
              </Box>
            </MotionBox>
          ))}
        </Box>
      </Container>
    </Box>
  )
}
