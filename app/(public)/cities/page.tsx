import Link from 'next/link'
import Image from 'next/image'
import { getCities } from '@/lib/services/cities'
import { Box, Typography, Container } from '@mui/material'
import Card from '@/components/ui-new/Card'
import { themeConfig } from '@/lib/config/theme'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Destinations - Jashn Planners',
  description: 'Explore our luxury travel destinations',
}

export default async function CitiesPage() {
  const cities = await getCities()

  return (
    <Box>
      <Box sx={{ minHeight: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${themeConfig.colors.accent2}50, ${themeConfig.colors.accent1}40)`, py: 8, pt: '120px' }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h2" sx={{ mb: 2, fontFamily: themeConfig.fonts.heading }}>Our Destinations</Typography>
          <Typography variant="h5" color="text.secondary">Discover breathtaking locations around the world</Typography>
        </Box>
      </Box>

      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
            {cities.map((city) => (
              <Link key={city._id.toString()} href={`/cities/${city.slug}`} style={{ textDecoration: 'none' }}>
                <Card hover sx={{ height: '100%', overflow: 'hidden' }}>
                  {city.bannerImage && (
                    <Box sx={{ position: 'relative', height: 320 }}>
                      <Image src={city.bannerImage} alt={city.name} fill style={{ objectFit: 'cover' }} />
                      <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }} />
                      <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 3, color: 'white' }}>
                        <Typography variant="h3" sx={{ fontFamily: themeConfig.fonts.heading, fontWeight: 600 }}>{city.name}</Typography>
                      </Box>
                    </Box>
                  )}
                  <Box sx={{ p: 3 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{city.description}</Typography>
                  </Box>
                </Card>
              </Link>
            ))}
          </Box>

          {cities.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 12 }}>
              <Typography variant="h6" color="text.secondary">No destinations available at the moment.</Typography>
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  )
}
