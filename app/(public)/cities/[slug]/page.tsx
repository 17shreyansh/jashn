import { connectDB } from '@/lib/db/mongodb'
import { City, Package } from '@/lib/db/models'
import Image from 'next/image'
import Link from 'next/link'
import { Box, Typography, Container } from '@mui/material'
import Card from '@/components/ui-new/Card'
import { notFound } from 'next/navigation'

export const revalidate = 60

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
      {city.bannerImage && (
        <Box sx={{ position: 'relative', height: 400 }}>
          <Image src={city.bannerImage} alt={city.name} fill style={{ objectFit: 'cover' }} />
          <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }} />
          <Container maxWidth="xl" sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, pb: 4, color: 'white' }}>
            <Typography variant="h2" sx={{ fontSize: { xs: '3rem', md: '4rem' }, fontFamily: 'var(--font-playfair)' }}>{city.name}</Typography>
          </Container>
        </Box>
      )}

      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Typography variant="h6" sx={{ mb: 4, fontSize: '1.25rem', color: 'text.secondary' }}>{city.description}</Typography>
          {city.gallery?.length > 0 && (
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
              {city.gallery.map((img: string, i: number) => (
                <Box key={i} sx={{ position: 'relative', height: 250, borderRadius: 2, overflow: 'hidden' }}>
                  <Image src={img} alt={city.name} fill style={{ objectFit: 'cover' }} />
                </Box>
              ))}
            </Box>
          )}
        </Container>
      </Box>

      {packages.length > 0 && (
        <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'rgba(255, 240, 203, 0.3)' }}>
          <Container maxWidth="xl">
            <Typography variant="h3" sx={{ textAlign: 'center', mb: 6, fontFamily: 'var(--font-playfair)' }}>Available Packages</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
              {packages.map((pkg: any) => (
                <Link key={pkg._id} href={`/packages/${pkg.slug}`} style={{ textDecoration: 'none' }}>
                  <Card hover>
                    {pkg.images?.[0] && <Box sx={{ position: 'relative', height: 250 }}><Image src={pkg.images[0]} alt={pkg.title} fill style={{ objectFit: 'cover' }} /></Box>}
                    <Box sx={{ p: 3 }}>
                      <Typography variant="h5" sx={{ mb: 1, fontFamily: 'var(--font-playfair)', fontWeight: 600 }}>{pkg.title}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{pkg.duration}</Typography>
                      {pkg.pricingEnabled && pkg.price && <Typography variant="h5" color="primary.main" sx={{ fontWeight: 700 }}>₹{pkg.price.toLocaleString()}</Typography>}
                    </Box>
                  </Card>
                </Link>
              ))}
            </Box>
          </Container>
        </Box>
      )}
    </Box>
  )
}
