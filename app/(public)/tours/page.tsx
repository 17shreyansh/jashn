import Link from 'next/link'
import Image from 'next/image'
import { getCities } from '@/lib/services/cities'
import { getPackages } from '@/lib/services/packages'
import { Box, Typography, Button, Chip, Container } from '@mui/material'
import { themeConfig } from '@/lib/config/theme'

export const revalidate = 3600

export const metadata = {
  title: 'Tours & Travel - Jashn Planners',
  description: 'Explore luxury destinations and curated tour packages',
}

export default async function ToursPage() {
  const [cities, packages] = await Promise.all([getCities(), getPackages()])

  return (
    <Box>
      {/* Hero Section - Dark Premium */}
      <Box sx={{ 
        minHeight: '55vh', 
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
          background: 'radial-gradient(circle at 30% 70%, rgba(212, 175, 55, 0.2), transparent 60%)',
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
          }}>Tours & Travel</Typography>
          <Box sx={{ width: 80, height: 2, bgcolor: themeConfig.colors.luxury, mx: 'auto', mb: 4 }} />
          <Typography sx={{ 
            color: 'rgba(255,255,255,0.7)', 
            fontSize: { xs: '1.1rem', md: '1.3rem' },
            fontWeight: 300,
            lineHeight: 1.7,
            maxWidth: 700,
            mx: 'auto'
          }}>Discover breathtaking destinations and curated experiences</Typography>
        </Container>
      </Box>

      {/* Cities Section */}
      <Box sx={{ py: { xs: 10, md: 16 }, bgcolor: '#fafaf9' }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Typography sx={{ 
              color: themeConfig.colors.primary, 
              letterSpacing: '0.2em', 
              fontWeight: 600,
              fontSize: '0.75rem',
              mb: 2,
              textTransform: 'uppercase'
            }}>DESTINATIONS</Typography>
            <Typography sx={{ 
              fontFamily: themeConfig.fonts.heading,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              color: themeConfig.colors.textDark,
              lineHeight: 1.2
            }}>Popular Destinations</Typography>
          </Box>
          
          {cities.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 12, mb: 8 }}>
              <Typography sx={{ fontSize: '1.25rem', color: themeConfig.colors.textLight, fontWeight: 300 }}>No destinations available at the moment.</Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 4, mb: 16 }}>
              {cities.map((city) => (
                <Link key={city._id.toString()} href={`/cities/${city.slug}`} style={{ textDecoration: 'none' }}>
                  <Box sx={{ 
                    height: '100%',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    position: 'relative',
                    cursor: 'pointer',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                    transition: 'all 0.4s ease',
                    '&:hover': {
                      transform: 'translateY(-12px)',
                      boxShadow: `0 16px 48px ${themeConfig.colors.luxury}30`
                    }
                  }}>
                    {city.bannerImage && (
                      <Box sx={{ position: 'relative', height: 400 }}>
                        <Image 
                          src={city.bannerImage} 
                          alt={city.name} 
                          fill 
                          style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }} 
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        <Box sx={{ 
                          position: 'absolute', 
                          inset: 0, 
                          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.4) 100%)' 
                        }} />
                        <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 4 }}>
                          <Typography sx={{ 
                            fontFamily: themeConfig.fonts.heading, 
                            fontSize: '2rem',
                            fontWeight: 700,
                            color: themeConfig.colors.white,
                            mb: 2,
                            lineHeight: 1.2
                          }}>{city.name}</Typography>
                          <Typography sx={{ 
                            color: 'rgba(255,255,255,0.8)', 
                            fontSize: '0.9375rem',
                            lineHeight: 1.6,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}>{city.description}</Typography>
                        </Box>
                      </Box>
                    )}
                  </Box>
                </Link>
              ))}
            </Box>
          )}

          {/* Packages Section */}
          <Box sx={{ textAlign: 'center', mb: 10 }}>
            <Typography sx={{ 
              color: themeConfig.colors.primary, 
              letterSpacing: '0.2em', 
              fontWeight: 600,
              fontSize: '0.75rem',
              mb: 2,
              textTransform: 'uppercase'
            }}>EXPERIENCES</Typography>
            <Typography sx={{ 
              fontFamily: themeConfig.fonts.heading,
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              color: themeConfig.colors.textDark,
              lineHeight: 1.2
            }}>Tour Packages</Typography>
          </Box>
          
          {packages.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 12 }}>
              <Typography sx={{ fontSize: '1.25rem', color: themeConfig.colors.textLight, fontWeight: 300 }}>No packages available at the moment.</Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 4 }}>
              {packages.map((pkg) => (
                <Link key={pkg._id.toString()} href={`/packages/${pkg.slug}`} style={{ textDecoration: 'none' }}>
                  <Box sx={{ 
                    height: '100%',
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
                    {pkg.images[0] && (
                      <Box sx={{ position: 'relative', height: 280, overflow: 'hidden' }}>
                        <Image 
                          src={pkg.images[0]} 
                          alt={pkg.title} 
                          fill 
                          style={{ objectFit: 'cover', transition: 'transform 0.4s ease' }} 
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        {pkg.featured && (
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
                      </Box>
                    )}
                    <Box sx={{ p: 4 }}>
                      <Chip 
                        label={pkg.duration} 
                        sx={{ 
                          mb: 3,
                          bgcolor: `${themeConfig.colors.luxury}15`,
                          color: themeConfig.colors.luxury,
                          fontWeight: 600,
                          fontSize: '0.75rem',
                          borderRadius: '8px'
                        }} 
                      />
                      <Typography sx={{ 
                        fontFamily: themeConfig.fonts.heading,
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        mb: 2,
                        color: themeConfig.colors.textDark,
                        lineHeight: 1.3
                      }}>{pkg.title}</Typography>
                      <Typography sx={{ 
                        color: themeConfig.colors.textLight, 
                        mb: 3,
                        fontSize: '0.9375rem',
                        lineHeight: 1.7,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}>{pkg.description}</Typography>
                      <Button 
                        fullWidth
                        sx={{
                          py: 1.5,
                          borderRadius: '999px',
                          border: `2px solid ${themeConfig.colors.primary}`,
                          color: themeConfig.colors.primary,
                          fontWeight: 600,
                          fontSize: '0.875rem',
                          letterSpacing: '0.05em',
                          '&:hover': {
                            bgcolor: themeConfig.colors.primary,
                            color: themeConfig.colors.white,
                            borderColor: themeConfig.colors.primary
                          },
                          transition: 'all 0.3s ease'
                        }}
                      >View Details</Button>
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
