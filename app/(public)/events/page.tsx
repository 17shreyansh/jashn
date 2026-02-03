import Link from 'next/link'
import Image from 'next/image'
import { getEvents } from '@/lib/services/events'
import { Box, Typography, Chip, Container } from '@mui/material'
import Card from '@/components/ui-new/Card'

export const revalidate = 3600

export const metadata = {
  title: 'Events - Jashn Planners',
  description: 'Browse our premium event planning services',
}

export default async function EventsPage() {
  const events = await getEvents()

  return (
    <Box>
      <Box sx={{ minHeight: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #fff0cb, rgba(255, 222, 222, 0.5))', py: 8 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h2" sx={{ mb: 2, color: 'text.primary' }}>Our Events</Typography>
          <Typography variant="h5" sx={{ color: 'text.secondary' }}>Celebrations crafted to perfection</Typography>
        </Box>
      </Box>

      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="xl">
          {events.length === 0 ? (
            <Box sx={{ textAlign: 'center', py: 8 }}>
              <Typography variant="h6" color="text.secondary">No events available at the moment.</Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 4 }}>
              {events.map((event) => (
                <Link key={event._id.toString()} href={`/events/${event.slug}`} style={{ textDecoration: 'none' }}>
                  <Card hover sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    {event.images[0] && (
                      <Box sx={{ position: 'relative', height: 250, overflow: 'hidden' }}>
                        <Image src={event.images[0]} alt={event.title} fill style={{ objectFit: 'cover' }} />
                        {event.featured && <Chip label="Featured" color="luxury" sx={{ position: 'absolute', top: 16, right: 16 }} />}
                      </Box>
                    )}
                    <Box sx={{ p: 3, flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="h5" sx={{ mb: 1.5, fontFamily: 'var(--font-playfair)', fontWeight: 600 }}>{event.title}</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, flex: 1 }}>{event.shortDescription}</Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
                        {event.tags.slice(0, 3).map((tag) => <Chip key={tag} label={tag} size="small" variant="outlined" />)}
                      </Box>
                      {event.pricingEnabled && event.basePrice && (
                        <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700 }}>Starting at ₹{event.basePrice.toLocaleString()}</Typography>
                      )}
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
