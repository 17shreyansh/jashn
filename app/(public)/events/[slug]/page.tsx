import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getEventBySlug, getEvents } from '@/lib/services/events'
import { Box, Typography, Chip, Container, Button } from '@mui/material'
import Card from '@/components/ui-new/Card'
import Link from 'next/link'

export const revalidate = 3600

export async function generateStaticParams() {
  const events = await getEvents()
  return events.map((event) => ({ slug: event.slug }))
}

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
      <Box sx={{ position: 'relative', height: '60vh' }}>
        {event.images[0] && (
          <>
            <Image src={event.images[0]} alt={event.title} fill style={{ objectFit: 'cover' }} priority />
            <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }} />
          </>
        )}
        <Container maxWidth="xl" sx={{ position: 'absolute', bottom: 0, left: 0, right: 0, pb: 6, color: 'white' }}>
          <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
            {event.tags.map((tag) => <Chip key={tag} label={tag} sx={{ bgcolor: 'luxury.main' }} />)}
          </Box>
          <Typography variant="h2" sx={{ color: 'white', mb: 2 }}>{event.title}</Typography>
          <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)', maxWidth: 800 }}>{event.shortDescription}</Typography>
        </Container>
      </Box>

      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 6 }}>
            <Box>
              <Card sx={{ p: 4, mb: 4 }}>
                <Typography variant="h4" sx={{ mb: 3, fontFamily: 'var(--font-playfair)', fontWeight: 600 }}>About This Event</Typography>
                <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.125rem', lineHeight: 1.8 }}>{event.description}</Typography>
              </Card>

              {event.images.length > 1 && (
                <Card sx={{ p: 4 }}>
                  <Typography variant="h5" sx={{ mb: 3, fontFamily: 'var(--font-playfair)', fontWeight: 600 }}>Gallery</Typography>
                  <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 2 }}>
                    {event.images.slice(1).map((img, idx) => (
                      <Box key={idx} sx={{ position: 'relative', height: 250, borderRadius: 2, overflow: 'hidden' }}>
                        <Image src={img} alt={`${event.title} ${idx + 1}`} fill style={{ objectFit: 'cover' }} />
                      </Box>
                    ))}
                  </Box>
                </Card>
              )}
            </Box>

            <Box>
              <Card variant="premium" sx={{ p: 3, position: 'sticky', top: 100 }}>
                <Typography variant="h5" sx={{ mb: 3, fontFamily: 'var(--font-playfair)', fontWeight: 600 }}>Get Started</Typography>
                {event.pricingEnabled && event.basePrice && (
                  <Box sx={{ mb: 3, pb: 3, borderBottom: '1px solid rgba(242, 204, 132, 0.3)' }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>Starting Price</Typography>
                    <Typography variant="h3" color="primary.main" sx={{ fontWeight: 700 }}>₹{event.basePrice.toLocaleString()}</Typography>
                  </Box>
                )}
                {event.addons.length > 0 && (
                  <Box sx={{ mb: 3 }}>
                    <Typography variant="body1" sx={{ fontWeight: 600, mb: 2 }}>Available Add-ons</Typography>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      {event.addons.map((addon, idx) => (
                        <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="body2" color="text.secondary">{addon.name}</Typography>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>₹{addon.price.toLocaleString()}</Typography>
                        </Box>
                      ))}
                    </Box>
                  </Box>
                )}
                <Link href="/contact"><Button variant="contained" size="large" fullWidth>Request Quote</Button></Link>
              </Card>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}
