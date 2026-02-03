import { connectDB } from '@/lib/db/mongodb'
import { Package } from '@/lib/db/models'
import Image from 'next/image'
import Link from 'next/link'
import { Box, Typography, Container, Button } from '@mui/material'
import { notFound } from 'next/navigation'
import { themeConfig } from '@/lib/config/theme'
import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import CloseIcon from '@mui/icons-material/Close'

export const revalidate = 60

async function getPackage(slug: string) {
  await connectDB()
  const pkg = await Package.findOne({ slug }).populate('cityId').lean()
  return pkg ? JSON.parse(JSON.stringify(pkg)) : null
}

export default async function PackageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const pkg = await getPackage(slug)
  if (!pkg) notFound()

  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: themeConfig.colors.black, position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', inset: 0, background: 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.2), transparent 70%)', filter: 'blur(60px)' }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, textAlign: 'center', py: 8 }}>
          <Typography sx={{ fontFamily: themeConfig.fonts.heading, fontSize: { xs: '3rem', md: '5rem' }, fontWeight: 700, color: themeConfig.colors.white, mb: 3, lineHeight: 1.1, letterSpacing: '-0.02em' }}>{pkg.title}</Typography>
          <Box sx={{ width: 80, height: 2, bgcolor: themeConfig.colors.luxury, mx: 'auto', mb: 3 }} />
          <Typography sx={{ color: themeConfig.colors.luxury, fontSize: { xs: '1.1rem', md: '1.3rem' }, fontWeight: 600, letterSpacing: '0.1em' }}>{pkg.duration}</Typography>
        </Container>
      </Box>

      {/* Images Grid */}
      {pkg.images?.length > 0 && (
        <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: '#fafaf9' }}>
          <Container maxWidth="lg">
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 3 }}>
              {pkg.images.slice(0, 4).map((img: string, i: number) => (
                <Box key={i} sx={{ position: 'relative', height: 350, borderRadius: '24px', overflow: 'hidden', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                  <Image src={img} alt={pkg.title} fill style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
                </Box>
              ))}
            </Box>
          </Container>
        </Box>
      )}

      {/* Description */}
      <Box sx={{ py: { xs: 10, md: 16 }, bgcolor: 'white' }}>
        <Container maxWidth="lg">
          <Typography sx={{ fontSize: '1.25rem', lineHeight: 1.8, color: themeConfig.colors.textLight, textAlign: 'center', maxWidth: 900, mx: 'auto' }}>{pkg.description}</Typography>
        </Container>
      </Box>

      {/* Itinerary */}
      {pkg.itinerary?.length > 0 && (
        <Box sx={{ py: { xs: 10, md: 16 }, bgcolor: '#fafaf9' }}>
          <Container maxWidth="lg">
            <Box sx={{ textAlign: 'center', mb: 10 }}>
              <Typography sx={{ color: themeConfig.colors.primary, letterSpacing: '0.2em', fontWeight: 600, fontSize: '0.75rem', mb: 2, textTransform: 'uppercase' }}>JOURNEY</Typography>
              <Typography sx={{ fontFamily: themeConfig.fonts.heading, fontSize: { xs: '2.5rem', md: '3.5rem' }, fontWeight: 700, color: themeConfig.colors.textDark }}>Itinerary</Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
              {pkg.itinerary.map((day: any, i: number) => (
                <Box key={i} sx={{ p: 5, bgcolor: 'white', borderRadius: '24px', border: `1px solid ${themeConfig.colors.luxury}20`, boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                  <Typography sx={{ fontFamily: themeConfig.fonts.heading, fontSize: '1.75rem', fontWeight: 600, color: themeConfig.colors.luxury, mb: 2 }}>Day {day.day}: {day.title}</Typography>
                  <Typography sx={{ color: themeConfig.colors.textLight, fontSize: '1.0625rem', lineHeight: 1.8 }}>{day.description}</Typography>
                </Box>
              ))}
            </Box>
          </Container>
        </Box>
      )}

      {/* Inclusions/Exclusions */}
      <Box sx={{ py: { xs: 10, md: 16 }, bgcolor: '#0a0a0a', position: 'relative', overflow: 'hidden' }}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, height: 600, borderRadius: '50%', background: `radial-gradient(circle, ${themeConfig.colors.luxury}15, transparent)`, filter: 'blur(100px)' }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 5 }}>
            {pkg.included?.length > 0 && (
              <Box sx={{ p: 6, bgcolor: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)', borderRadius: '24px', border: `1px solid ${themeConfig.colors.luxury}30` }}>
                <Typography sx={{ fontFamily: themeConfig.fonts.heading, fontSize: '2rem', fontWeight: 600, color: themeConfig.colors.luxury, mb: 4 }}>Included</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                  {pkg.included.map((item: string, i: number) => (
                    <Box key={i} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                      <CheckCircleIcon sx={{ color: themeConfig.colors.luxury, fontSize: 24, flexShrink: 0, mt: 0.2 }} />
                      <Typography sx={{ color: 'rgba(255,255,255,0.8)', fontSize: '1rem', lineHeight: 1.6 }}>{item}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}

            {pkg.excluded?.length > 0 && (
              <Box sx={{ p: 6, bgcolor: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(10px)', borderRadius: '24px', border: `1px solid rgba(255,255,255,0.1)` }}>
                <Typography sx={{ fontFamily: themeConfig.fonts.heading, fontSize: '2rem', fontWeight: 600, color: 'rgba(255,255,255,0.6)', mb: 4 }}>Excluded</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                  {pkg.excluded.map((item: string, i: number) => (
                    <Box key={i} sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
                      <CloseIcon sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 24, flexShrink: 0, mt: 0.2 }} />
                      <Typography sx={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', lineHeight: 1.6 }}>{item}</Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            )}
          </Box>
        </Container>
      </Box>

      {/* CTA */}
      <Box sx={{ py: { xs: 10, md: 16 }, bgcolor: '#fafaf9' }}>
        <Container maxWidth="md">
          <Box sx={{ p: { xs: 5, md: 8 }, bgcolor: 'white', borderRadius: '24px', border: `1px solid ${themeConfig.colors.luxury}20`, boxShadow: '0 8px 30px rgba(0,0,0,0.08)', textAlign: 'center' }}>
            <Typography sx={{ fontFamily: themeConfig.fonts.heading, fontSize: { xs: '2rem', md: '2.5rem' }, fontWeight: 600, color: themeConfig.colors.textDark, mb: 3 }}>Ready to Book?</Typography>
            <Typography sx={{ color: themeConfig.colors.textLight, mb: 5, fontSize: '1.125rem' }}>Contact us for personalized pricing and availability</Typography>
            <Link href="/contact" style={{ textDecoration: 'none' }}>
              <Button fullWidth size="large" sx={{ py: 2.5, borderRadius: '999px', background: `linear-gradient(135deg, ${themeConfig.colors.luxury}, ${themeConfig.colors.secondary})`, color: themeConfig.colors.black, fontWeight: 700, fontSize: '1.125rem', letterSpacing: '0.05em', boxShadow: `0 8px 24px ${themeConfig.colors.luxury}40`, '&:hover': { boxShadow: `0 12px 32px ${themeConfig.colors.luxury}60`, transform: 'translateY(-2px)' }, transition: 'all 0.3s ease' }}>Get Quote</Button>
            </Link>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}
