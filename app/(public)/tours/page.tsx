import Link from 'next/link'
import Image from 'next/image'
import { getCities } from '@/lib/services/cities'
import { getPackages } from '@/lib/services/packages'
import { Box, Typography, Button, Chip, Container } from '@mui/material'
import Card from '@/components/ui-new/Card'

export const revalidate = 3600

export const metadata = {
  title: 'Tours & Travel - Jashn Planners',
  description: 'Explore luxury destinations and curated tour packages',
}

export default async function ToursPage() {
  const [cities, packages] = await Promise.all([getCities(), getPackages()])

  return (
    <Box>
      <Box sx={{ minHeight: '50vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(149, 204, 186, 0.3), rgba(167, 186, 66, 0.2))', py: 8 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h2" sx={{ mb: 2 }}>Tours & Travel</Typography>
          <Typography variant="h5" color="text.secondary">Discover breathtaking destinations and curated experiences</Typography>
        </Box>
      </Box>

      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" sx={{ mb: 2, fontFamily: 'var(--font-playfair)' }}>Popular Destinations</Typography>
            <Typography variant="h6" color="text.secondary">Explore our handpicked locations</Typography>
          </Box>
          
          {cities.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8, mb: 8 }}><Typography variant="h6" color="text.secondary">No destinations available at the moment.</Typography></Box>
          ) : (
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, gap: 3, mb: 10 }}>
              {cities.map((city) => (
                <Link key={city._id.toString()} href={`/cities/${city.slug}`} style={{ textDecoration: 'none' }}>
                  <Card hover sx={{ height: '100%', cursor: 'pointer' }}>
                    {city.bannerImage && (
                      <Box sx={{ position: 'relative', height: 320, overflow: 'hidden' }}>
                        <Image src={city.bannerImage} alt={city.name} fill style={{ objectFit: 'cover' }} />
                        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }} />
                        <Box sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, p: 3, color: 'white' }}>
                          <Typography variant="h4" sx={{ fontFamily: 'var(--font-playfair)', fontWeight: 600 }}>{city.name}</Typography>
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
          )}

          <Box sx={{ textAlign: 'center', mb: 6 }}>
            <Typography variant="h3" sx={{ mb: 2, fontFamily: 'var(--font-playfair)' }}>Tour Packages</Typography>
            <Typography variant="h6" color="text.secondary">Curated experiences for every traveler</Typography>
          </Box>
          
          {packages.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}><Typography variant="h6" color="text.secondary">No packages available at the moment.</Typography></Box>
          ) : (
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
              {packages.map((pkg) => (
                <Link key={pkg._id.toString()} href={`/packages/${pkg.slug}`} style={{ textDecoration: 'none' }}>
                  <Card variant="premium" hover sx={{ height: '100%', cursor: 'pointer' }}>
                    {pkg.images[0] && (
                      <Box sx={{ position: 'relative', height: 250, overflow: 'hidden' }}>
                        <Image src={pkg.images[0]} alt={pkg.title} fill style={{ objectFit: 'cover' }} />
                        {pkg.featured && <Chip label="Featured" color="luxury" sx={{ position: 'absolute', top: 16, right: 16 }} />}
                      </Box>
                    )}
                    <Box sx={{ p: 3 }}>
                      <Chip label={pkg.duration} color="luxury" size="small" sx={{ mb: 2 }} />
                      <Typography variant="h5" sx={{ mb: 1.5, fontFamily: 'var(--font-playfair)', fontWeight: 600 }}>{pkg.title}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{pkg.description}</Typography>
                      {pkg.pricingEnabled && pkg.price && <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700, mb: 2 }}>₹{pkg.price.toLocaleString()}</Typography>}
                      <Button variant="outlined" fullWidth>View Details</Button>
                    </Box>
                  </Card>
                </Link>
              ))}
            </Box>
          )}
        </Container>
      </Box>
    </Box>
  )
}
