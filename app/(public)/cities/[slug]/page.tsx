import { connectDB } from '@/lib/db/mongodb'
import { City, Package } from '@/lib/db/models'
import Image from 'next/image'
import Link from 'next/link'
import { Box, Typography, Container, Button } from '@mui/material'
import { notFound } from 'next/navigation'
import { themeConfig } from '@/lib/config/theme'

export const dynamic = 'force-dynamic'

async function getCityWithPackages(slug: string) {
  await connectDB()
  const city = await City.findOne({ slug }).lean()
  if (!city) return null
  const packages = await Package.find({ cityId: city._id }).lean()
  return { city: JSON.parse(JSON.stringify(city)), packages: JSON.parse(JSON.stringify(packages)) }
}

export default async function CityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = await getCityWithPackages(slug)
  if (!data) notFound()
  const { city, packages } = data

  return (
    <Box>
      {/* Hero Section */}
      {city.bannerImage && (
        <Box sx={{ position: 'relative', height: '70vh', minHeight: 500 }}>
          <Image src={city.bannerImage} alt={city.name} fill style={{ objectFit: 'cover' }} priority quality={90} />
          <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.5) 100%)' }} />
          <Container maxWidth="xl" sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, pb: 8, color: 'white' }}>
            <Typography sx={{ 
              fontFamily: themeConfig.fonts.heading, 
              fontSize: { xs: '3rem', md: '5rem' },
              fontWeight: 700,
              color: themeConfig.colors.white,
              lineHeight: 1.1,
              letterSpacing: '-0.02em'
            }}>{city.name}</Typography>
          </Container>
        </Box>
      )}

      {/* Description Section */}
      <Box sx={{ py: { xs: 10, md: 16 }, bgcolor: '#fafaf9' }}>
        <Container maxWidth="lg">
          <Typography sx={{ 
            fontSize: '1.25rem', 
            lineHeight: 1.8,
            color: themeConfig.colors.textLight,
            mb: 6,
            textAlign: 'center',
            maxWidth: 900,
            mx: 'auto'
          }}>{city.description}</Typography>
          
          {/* Gallery Grid */}
          {city.gallery?.length > 0 && (
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: 3 }}>
              {city.gallery.map((img: string, i: number) => (
                <Box key={i} sx={{ 
                  position: 'relative', 
                  height: 300, 
                  borderRadius: '16px', 
                  overflow: 'hidden',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'scale(1.02)' }
                }}>
                  <Image src={img} alt={city.name} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
                </Box>
              ))}
            </Box>
          )}
        </Container>
      </Box>

      {/* Packages Section */}
      {packages.length > 0 && (
        <Box sx={{ py: { xs: 10, md: 16 }, bgcolor: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
          <Box sx={{ 
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 600,
            height: 600,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${themeConfig.colors.luxury}15, transparent)`,
            filter: 'blur(100px)'
          }} />
          <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{ textAlign: 'center', mb: 10 }}>
              <Typography sx={{ 
                color: themeConfig.colors.luxury, 
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
                color: themeConfig.colors.white,
                lineHeight: 1.2
              }}>Available Packages</Typography>
            </Box>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 4 }}>
              {packages.map((pkg: any) => (
                <Link key={pkg._id} href={`/packages/${pkg.slug}`} style={{ textDecoration: 'none' }}>
                  <Box sx={{ 
                    height: '100%',
                    bgcolor: 'rgba(255,255,255,0.03)',
                    backdropFilter: 'blur(10px)',
                    borderRadius: '24px',
                    overflow: 'hidden',
                    border: `1px solid ${themeConfig.colors.luxury}30`,
                    transition: 'all 0.4s ease',
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      bgcolor: 'rgba(255,255,255,0.05)',
                      borderColor: themeConfig.colors.luxury
                    }
                  }}>
                    {pkg.images?.[0] && (
                      <Box sx={{ position: 'relative', height: 250 }}>
                        <Image src={pkg.images[0]} alt={pkg.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 33vw" />
                      </Box>
                    )}
                    <Box sx={{ p: 4 }}>
                      <Typography sx={{ 
                        fontFamily: themeConfig.fonts.heading,
                        fontSize: '1.5rem',
                        fontWeight: 600,
                        mb: 2,
                        color: themeConfig.colors.white,
                        lineHeight: 1.3
                      }}>{pkg.title}</Typography>
                      <Typography sx={{ color: 'rgba(255,255,255,0.6)', mb: 3, fontSize: '0.875rem' }}>{pkg.duration}</Typography>
                    </Box>
                  </Box>
                </Link>
              ))}
            </Box>
          </Container>
        </Box>
      )}
    </Box>
  )
}
