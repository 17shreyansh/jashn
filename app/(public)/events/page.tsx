import Link from 'next/link'
import Image from 'next/image'
import { getEvents } from '@/lib/services/events'
import { Box, Typography, Chip, Container } from '@mui/material'
import { themeConfig } from '@/lib/config/theme'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Events - Jashn Planners',
  description: 'Browse our premium event planning services',
}

export default async function EventsPage() {
  const events = await getEvents()

  return (
    <Box>
      {/* Hero Section - Dark Premium */}
      <Box sx={{ 
        minHeight: '50vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        bgcolor: themeConfig.colors.black,
        position: 'relative',
        overflow: 'hidden'
      }}>
        <Box sx={{ 
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(107, 70, 193, 0.2), transparent 70%)',
          filter: 'blur(60px)'
        }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <Typography sx={{ 
            fontFamily: themeConfig.fonts.heading, 
            fontSize: { xs: '3rem', md: '5rem' },
            fontWeight: 700,
            color: themeConfig.colors.white,
            mb: 3,
            lineHeight: 1.1,
            letterSpacing: '-0.02em'
          }}>Our Events</Typography>
          <Box sx={{ width: 80, height: 2, bgcolor: themeConfig.colors.luxury, mx: 'auto', mb: 4 }} />
          <Typography sx={{ 
            color: 'rgba(255,255,255,0.7)', 
            fontSize: { xs: '1.1rem', md: '1.3rem' },
            fontWeight: 300,
            lineHeight: 1.7
          }}>Celebrations crafted to perfection</Typography>
        </Container>
      </Box>

      {/* Events Grid */}
      <Box sx={{ py: { xs: 10, md: 16 }, bgcolor: '#fafaf9' }}>
        <Container maxWidth="xl">
          {events.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 12 }}>
              <Typography sx={{ 
                fontSize: '1.25rem', 
                color: themeConfig.colors.textLight,
                fontWeight: 300
              }}>No events available at the moment.</Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 4 }}>
              {events.map((event) => (
                <Link key={event._id.toString()} href={`/events/${event.slug}`} style={{ textDecoration: 'none' }}>
                  <Box sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    bgcolor: 'white',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    border: `1px solid ${themeConfig.colors.luxury}20`,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.06)',
                    transition: 'all 0.4s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      boxShadow: `0 12px 40px ${themeConfig.colors.luxury}30`,
                      borderColor: themeConfig.colors.luxury
                    }
                  }}>
                    {event.images[0] && (
                      <Box sx={{ position: 'relative', height: 280, overflow: 'hidden' }}>
                        <Image 
                          src={event.images[0]} 
                          alt={event.title} 
                          fill 
                          style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }} 
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {event.featured && (
                          <Chip 
                            label="Featured" 
                            sx={{ 
                              position: 'absolute', 
                              top: 16, 
                              right: 16,
                              bgcolor: themeConfig.colors.luxury,
                              color: themeConfig.colors.black,
                              fontWeight: 700,
                              fontSize: '0.75rem',
                              letterSpacing: '0.05em',
                              boxShadow: `0 4px 12px ${themeConfig.colors.luxury}60`
                            }} 
                          />
                        )}
                        <Box sx={{ 
                          position: 'absolute',
                          inset: 0,
                          background: 'linear-gradient(to top, rgba(0,0,0,0.4), transparent 50%)',
                          opacity: 0,
                          transition: 'opacity 0.4s ease',
                          '.MuiBox-root:hover &': { opacity: 1 }
                        }} />
                      </Box>
                    )}
                    <Box sx={{ p: 4, flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <Typography sx={{ 
                        fontFamily: themeConfig.fonts.heading,
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        mb: 2,
                        color: themeConfig.colors.textDark,
                        lineHeight: 1.3
                      }}>{event.title}</Typography>
                      <Typography sx={{ 
                        color: themeConfig.colors.textLight, 
                        mb: 3, 
                        flex: 1,
                        fontSize: '0.9375rem',
                        lineHeight: 1.7,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>{event.shortDescription}</Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                        {event.tags.slice(0, 3).map((tag) => (
                          <Chip 
                            key={tag} 
                            label={tag} 
                            size="small" 
                            sx={{
                              borderRadius: '8px',
                              border: `1px solid ${themeConfig.colors.primary}30`,
                              bgcolor: `${themeConfig.colors.primary}10`,
                              color: themeConfig.colors.primary,
                              fontWeight: 500,
                              fontSize: '0.75rem'
                            }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </Box>
                </Link>
              ))}
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  )
}
