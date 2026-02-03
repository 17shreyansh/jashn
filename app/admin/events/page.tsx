import { getEvents } from '@/lib/services/events'
import { Box, Typography, Button, Chip, Container } from '@mui/material'
import Card from '@/components/ui-new/Card'
import Link from 'next/link'
import Image from 'next/image'
import AddIcon from '@mui/icons-material/Add'

export default async function AdminEventsPage() {
  const events = await getEvents()

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontFamily: 'var(--font-playfair)', fontWeight: 700 }}>Events</Typography>
        <Button href="/admin/events/new" component={Link} variant="contained" startIcon={<AddIcon />}>Add Event</Button>
      </Box>

      {events.length === 0 ? (
        <Card><Box sx={{ p: 8, textAlign: 'center' }}><Typography variant="h6" color="text.secondary">No events yet. Create your first event!</Typography></Box></Card>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 3 }}>
          {events.map((event) => (
            <Card hover key={event._id.toString()}>
              {event.images[0] && <Box sx={{ position: 'relative', height: 200, overflow: 'hidden' }}><Image src={event.images[0]} alt={event.title} fill style={{ objectFit: 'cover' }} /></Box>}
              <Box sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  {event.featured && <Chip label="Featured" color="primary" size="small" />}
                  {event.pricingEnabled && <Chip label="Pricing" color="secondary" size="small" />}
                </Box>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>{event.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>{event.shortDescription}</Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                  {event.tags.slice(0, 3).map((tag) => <Chip key={tag} label={tag} size="small" variant="outlined" />)}
                </Box>
                <Button href={`/admin/events/${event._id}`} component={Link} variant="outlined" fullWidth>Edit Event</Button>
              </Box>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  )
}
