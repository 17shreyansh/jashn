'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Box, Typography, Container, Button } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { themeConfig } from '@/lib/config/theme';

const MotionBox = motion(Box);

export default function AboutSection() {
  return (
    <Box sx={{ py: { xs: 12, md: 20 }, bgcolor: '#faf9f7', position: 'relative' }}>
      <Container maxWidth="lg">
        <Box sx={{ maxWidth: '800px', mx: 'auto', textAlign: 'center' }}>
          
          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Typography 
              variant="overline" 
              sx={{ 
                color: themeConfig.colors.primary, 
                letterSpacing: '0.15em', 
                fontWeight: 600, 
                mb: 3, 
                display: 'block',
                fontSize: '0.75rem'
              }}
            >
              ABOUT JASHN PLANNERS
            </Typography>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            sx={{ mb: 4 }}
          >
            <Typography 
              variant="h2" 
              sx={{ 
                fontFamily: themeConfig.fonts.heading, 
                fontSize: { xs: '2rem', md: '3rem' }, 
                lineHeight: 1.2,
                color: themeConfig.colors.textDark,
                mb: 2
              }}
            >
              Events & Holidays
            </Typography>
            <Typography 
              variant="h3" 
              sx={{ 
                fontFamily: themeConfig.fonts.heading, 
                fontSize: { xs: '1.5rem', md: '2rem' }, 
                lineHeight: 1.3,
                color: themeConfig.colors.textLight,
                fontWeight: 400
              }}
            >
              Crafted with Passion, Celebrated with Joy
            </Typography>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Typography 
              sx={{ 
                color: themeConfig.colors.textLight, 
                fontSize: { xs: '1rem', md: '1.125rem' }, 
                lineHeight: 1.8, 
                mb: 5,
                maxWidth: '700px',
                mx: 'auto'
              }}
            >
              At Jashn Planners, we specialize in creating unforgettable experiences. From dream weddings to luxury holiday packages, we bring your vision to life with meticulous attention to detail and personalized service.
            </Typography>
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            sx={{ 
              display: 'flex', 
              flexWrap: 'wrap',
              gap: 4, 
              justifyContent: 'center',
              mb: 6
            }}
          >
            {[
              { label: 'Premium Events', value: '500+' },
              { label: 'Happy Clients', value: '1000+' },
              { label: 'Destinations', value: '50+' }
            ].map((stat, i) => (
              <Box key={i} sx={{ textAlign: 'center', minWidth: '120px' }}>
                <Typography 
                  sx={{ 
                    fontSize: { xs: '2rem', md: '2.5rem' }, 
                    fontWeight: 700, 
                    color: themeConfig.colors.primary,
                    fontFamily: themeConfig.fonts.heading
                  }}
                >
                  {stat.value}
                </Typography>
                <Typography sx={{ fontSize: '0.875rem', color: themeConfig.colors.textLight, letterSpacing: '0.05em' }}>
                  {stat.label}
                </Typography>
              </Box>
            ))}
          </MotionBox>

          <MotionBox
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link href="/about" style={{ textDecoration: 'none' }}>
              <Button
                endIcon={<ArrowForwardIcon />}
                sx={{
                  bgcolor: themeConfig.colors.primary,
                  color: themeConfig.colors.white,
                  px: 4,
                  py: 1.5,
                  fontSize: '0.875rem',
                  letterSpacing: '0.1em',
                  borderRadius: '4px',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                  '&:hover': {
                    bgcolor: themeConfig.colors.primary,
                    opacity: 0.9
                  }
                }}
              >
                Learn More
              </Button>
            </Link>
          </MotionBox>

        </Box>
      </Container>
    </Box>
  );
}