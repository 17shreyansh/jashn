import { connectDB } from '@/lib/db/mongodb'
import { Package } from '@/lib/db/models'
import Image from 'next/image'
import Link from 'next/link'
import { Box, Typography, Container, Button } from '@mui/material'
import Card from '@/components/ui-new/Card'
import { notFound } from 'next/navigation'

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
    <Box sx={{ py: { xs: 6, md: 10 }, bgcolor: 'rgba(255, 240, 203, 0.3)' }}>
      <Container maxWidth="lg">
        <Typography variant="h2" sx={{ mb: 2, fontSize: { xs: '3rem', md: '4rem' }, fontFamily: 'var(--font-playfair)' }}>{pkg.title}</Typography>
        <Typography variant="h5" color="primary.main" sx={{ mb: 4 }}>{pkg.duration}</Typography>
        
        {pkg.images?.length > 0 && (
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 2, mb: 4 }}>
            {pkg.images.slice(0, 4).map((img: string, i: number) => (
              <Box key={i} sx={{ position: 'relative', height: 320, borderRadius: 2, overflow: 'hidden' }}>
                <Image src={img} alt={pkg.title} fill style={{ objectFit: 'cover' }} />
              </Box>
            ))}
          </Box>
        )}

        <Typography variant="h6" sx={{ mb: 6, fontSize: '1.25rem', color: 'text.secondary' }}>{pkg.description}</Typography>

        {pkg.itinerary?.length > 0 && (
          <Box sx={{ mb: 6 }}>
            <Typography variant="h3" sx={{ mb: 4, fontFamily: 'var(--font-playfair)' }}>Itinerary</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {pkg.itinerary.map((day: any, i: number) => (
                <Card key={i} sx={{ p: 3 }}>
                  <Typography variant="h5" color="primary.main" sx={{ mb: 1, fontFamily: 'var(--font-playfair)' }}>Day {day.day}: {day.title}</Typography>
                  <Typography color="text.secondary">{day.description}</Typography>
                </Card>
              ))}
            </Box>
          </Box>
        )}

        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 4, mb: 6 }}>
          {pkg.included?.length > 0 && (
            <Card sx={{ p: 3 }}>
              <Typography variant="h5" color="primary.main" sx={{ mb: 2, fontFamily: 'var(--font-playfair)' }}>Included</Typography>
              <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
                {pkg.included.map((item: string, i: number) => (
                  <Box component="li" key={i} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <Typography color="primary.main">✓</Typography>
                    <Typography>{item}</Typography>
                  </Box>
                ))}
              </Box>
            </Card>
          )}

          {pkg.excluded?.length > 0 && (
            <Card sx={{ p: 3 }}>
              <Typography variant="h5" sx={{ mb: 2, fontFamily: 'var(--font-playfair)', opacity: 0.6 }}>Excluded</Typography>
              <Box component="ul" sx={{ pl: 0, listStyle: 'none' }}>
                {pkg.excluded.map((item: string, i: number) => (
                  <Box component="li" key={i} sx={{ display: 'flex', gap: 1, mb: 1 }}>
                    <Typography sx={{ opacity: 0.4 }}>✗</Typography>
                    <Typography>{item}</Typography>
                  </Box>
                ))}
              </Box>
            </Card>
          )}
        </Box>

        {pkg.pricingEnabled && pkg.price ? (
          <Card sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h2" color="primary.main" sx={{ fontWeight: 700, mb: 3 }}>₹{pkg.price.toLocaleString()}</Typography>
            <Link href="/contact"><Button variant="contained" size="large" fullWidth>Book This Package</Button></Link>
          </Card>
        ) : (
          <Card sx={{ p: 4, textAlign: 'center', background: 'linear-gradient(135deg, #a7ba42, #95ccba)', color: 'white' }}>
            <Typography variant="h4" sx={{ mb: 2, fontFamily: 'var(--font-playfair)' }}>Custom Quote</Typography>
            <Typography sx={{ mb: 3 }}>Contact us for personalized pricing</Typography>
            <Link href="/contact"><Button variant="outlined" size="large" sx={{ borderColor: 'white', color: 'white', '&:hover': { bgcolor: 'white', color: 'primary.main' } }}>Get Quote</Button></Link>
          </Card>
        )}
      </Container>
    </Box>
  )
}
