import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getEventBySlug, getEvents } from '@/lib/services/events'
import { Box, Typography, Chip, Container, Button } from '@mui/material'
import Link from 'next/link'
import { themeConfig } from '@/lib/config/theme'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = await getEventBySlug(slug)
  if (!event) return {}
  return { title: `${event.title} - Jashn Planners`, description: event.shortDescription }
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = await getEventBySlug(slug)
  if (!event) notFound()

  return (
    <Box>
      {/* Hero Section with Image */}
      <Box sx={{ position: 'relative', height: '70vh', minHeight: 500 }}>
        {event.images[0] && (
          <>
            <Image src={event.images[0]} alt={event.title} fill style={{ objectFit: 'cover' }} priority quality={90} />
            <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.5) 100%)' }} />
          </>
        )}
        <Container maxWidth="xl" sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, pb: 8, color: 'white' }}>
          <Box sx={{ display: 'flex', gap: 1.5, mb: 3, flexWrap: 'wrap' }}>
            {event.tags.map((tag) => (
              <Chip 
                key={tag} 
                label={tag} 
                sx={{ 
                  bgcolor: `${themeConfig.colors.luxury}20`,
                  backdropFilter: 'blur(10px)',
                  color: themeConfig.colors.luxury,
                  border: `1px solid ${themeConfig.colors.luxury}40`,
                  fontWeight: 600,
                  fontSize: '0.875rem'
                }} 
              />
            ))}
          </Box>
          <Typography sx={{ 
            fontFamily: themeConfig.fonts.heading,
            fontSize: { xs: '2.5rem', md: '4rem' },
            fontWeight: 700,
            color: themeConfig.colors.white,
            mb: 3,
            lineHeight: 1.1,
            letterSpacing: '-0.02em'
          }}>{event.title}</Typography>
          <Typography sx={{ 
            color: 'rgba(255,255,255,0.9)', 
            fontSize: { xs: '1.1rem', md: '1.3rem' },
            maxWidth: 900,
            lineHeight: 1.7,
            fontWeight: 300
          }}>{event.shortDescription}</Typography>
        </Container>
      </Box>

      {/* Content Section */}
      <Box sx={{ py: { xs: 10, md: 16 }, bgcolor: '#fafaf9' }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 6 }}>
            {/* Main Content */}
            <Box>
              <Box sx={{ 
                p: { xs: 4, md: 6 },
                bgcolor: 'white',
                borderRadius: '24px',
                border: `1px solid ${themeConfig.colors.luxury}20`,
                boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                mb: 5
              }}>
                <Typography sx={{ 
                  fontFamily: themeConfig.fonts.heading,
                  fontSize: { xs: '2rem', md: '2.5rem' },
                  fontWeight: 600,
                  mb: 4,
                  color: themeConfig.colors.textDark
                }}>About This Event</Typography>
                <Typography sx={{ 
                  fontSize: '1.0625rem', 
                  lineHeight: 1.8,
                  color: themeConfig.colors.textLight
                }}>{event.description}</Typography>
              </Box>

              {/* Gallery */}
              {event.images.length > 1 && (
                <Box sx={{ 
                  p: { xs: 4, md: 6 },
                  bgcolor: 'white',
                  borderRadius: '24px',
                  border: `1px solid ${themeConfig.colors.luxury}20`,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.06)'
                }}>
                  <Typography sx={{ 
                    fontFamily: themeConfig.fonts.heading,
                    fontSize: '1.75rem',
                    fontWeight: 600,
                    mb: 4,
                    color: themeConfig.colors.textDark
                  }}>Gallery</Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' }, gap: 3 }}>
                    {event.images.slice(1).map((img, idx) => (
                      <Box key={idx} sx={{ 
                        position: 'relative', 
                        height: 280, 
                        borderRadius: '16px', 
                        overflow: 'hidden',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                        transition: 'transform 0.3s ease',
                        '&:hover': { transform: 'scale(1.02)' }
                      }}>
                        <Image src={img} alt={`${event.title} ${idx + 1}`} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
            </Box>

            {/* Sidebar */}
            <Box>
              <Box sx={{ 
                p: 5,
                bgcolor: themeConfig.colors.black,
                borderRadius: '24px',
                border: `1px solid ${themeConfig.colors.luxury}30`,
                boxShadow: `0 8px 30px ${themeConfig.colors.luxury}20`,
                position: 'sticky',
                top: 100
              }}>
                <Typography sx={{ 
                  fontFamily: themeConfig.fonts.heading,
                  fontSize: '1.75rem',
                  fontWeight: 600,
                  mb: 4,
                  color: themeConfig.colors.white
                }}>Get Started</Typography>
                
                <Link href="/contact" style={{ textDecoration: 'none' }}>
                  <Button 
                    variant="contained" 
                    size="large" 
                    fullWidth
                    sx={{
                      py: 2,
                      borderRadius: '999px',
                      background: `linear-gradient(135deg, ${themeConfig.colors.luxury}, ${themeConfig.colors.secondary})`,
                      color: themeConfig.colors.black,
                      fontWeight: 700,
                      fontSize: '1rem',
                      letterSpacing: '0.05em',
                      boxShadow: `0 8px 24px ${themeConfig.colors.luxury}40`,
                      '&:hover': {
                        boxShadow: `0 12px 32px ${themeConfig.colors.luxury}60`,
                        transform: 'translateY(-2px)'
                      },
                      transition: 'all 0.3s ease'
                    }}
                  >Request Quote</Button>
                </Link>
              </Box>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}
