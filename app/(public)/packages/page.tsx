import Link from 'next/link'
import Image from 'next/image'
import { getPackages } from '@/lib/services/packages'
import { Box, Typography, Chip, Container, Button } from '@mui/material'
import Card from '@/components/ui-new/Card'
import { themeConfig } from '@/lib/config/theme'

export const dynamic = 'force-dynamic'

export const metadata = {
  title: 'Tour Packages - Jashn Planners',
  description: 'Browse our curated tour packages',
}

export default async function PackagesPage() {
  const packages = await getPackages()

  return (
    <Box>
      <Box sx={{ minHeight: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(135deg, ${themeConfig.colors.accent2}50, ${themeConfig.colors.accent1}40)`, py: 8 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h2" sx={{ mb: 2, fontFamily: themeConfig.fonts.heading }}>Tour Packages</Typography>
          <Typography variant="h5" color="text.secondary">Curated experiences for every traveler</Typography>
        </Box>
      </Box>

      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
            {packages.map((pkg) => (
              <Link key={pkg._id.toString()} href={`/packages/${pkg.slug}`} style={{ textDecoration: 'none' }}>
                <Card hover sx={{ height: '100%', overflow: 'hidden' }}>
                  {pkg.images[0] && (
                    <Box sx={{ position: 'relative', height: 250 }}>
                      <Image src={pkg.images[0]} alt={pkg.title} fill style={{ objectFit: 'cover' }} />
                      {pkg.featured && <Chip label="Featured" color="secondary" sx={{ position: 'absolute', top: 16, right: 16 }} />}
                    </Box>
                  )}
                  <Box sx={{ p: 3 }}>
                    <Chip label={pkg.duration} color="secondary" size="small" sx={{ mb: 2 }} />
                    <Typography variant="h5" sx={{ mb: 1.5, fontFamily: themeConfig.fonts.heading, fontWeight: 600 }}>{pkg.title}</Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{pkg.description}</Typography>
                  </Box>
                </Card>
              </Link>
            ))}
          </Box>

          {packages.length === 0 && (
            <Box sx={{ textAlign: 'center', py: 12 }}>
              <Typography variant="h6" color="text.secondary">No packages available at the moment.</Typography>
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  )
}
