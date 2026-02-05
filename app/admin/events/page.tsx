import { getEvents } from '@/lib/services/events'
import { Box, Typography, Button, Chip, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar } from '@mui/material'
import Card from '@/components/ui-new/Card'
import { Add, Edit, Visibility } from '@mui/icons-material'
import { themeConfig } from '@/lib/config/theme'

export default async function AdminEventsPage() {
  const events = await getEvents()

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography sx={{ fontSize: '1.75rem', fontWeight: 700, color: themeConfig.colors.textDark, mb: 0.5 }}>Events</Typography>
          <Typography sx={{ color: themeConfig.colors.textLight }}>Manage your event portfolio</Typography>
        </Box>
        <Button href="/admin/events/new" variant="contained" startIcon={<Add />} sx={{ bgcolor: themeConfig.colors.black, '&:hover': { bgcolor: themeConfig.colors.primary } }}>Create Event</Button>
      </Box>

      {events.length === 0 ? (
        <Card sx={{ p: 8, textAlign: 'center', bgcolor: 'white', border: '1px solid #e5e7eb' }}>
          <Typography sx={{ fontSize: '1.125rem', fontWeight: 600, color: themeConfig.colors.textDark, mb: 1 }}>No events yet</Typography>
          <Typography sx={{ color: themeConfig.colors.textLight, mb: 3 }}>Create your first event to get started</Typography>
          <Button href="/admin/events/new" variant="contained" startIcon={<Add />} sx={{ bgcolor: themeConfig.colors.black }}>Create Event</Button>
        </Card>
      ) : (
        <Card sx={{ bgcolor: 'white', border: '1px solid #e5e7eb', borderRadius: 3, overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                  <TableCell sx={{ fontWeight: 600, color: themeConfig.colors.textDark }}>Event</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: themeConfig.colors.textDark }}>Tags</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: themeConfig.colors.textDark }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: themeConfig.colors.textDark }}>Pricing</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, color: themeConfig.colors.textDark }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.map((event) => (
                  <TableRow key={event._id.toString()} sx={{ '&:hover': { bgcolor: '#f8f9fa' }, transition: 'all 0.2s' }}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar src={event.images[0]} variant="rounded" sx={{ width: 56, height: 56 }} />
                        <Box>
                          <Typography sx={{ fontWeight: 600, fontSize: '0.9375rem', color: themeConfig.colors.textDark }}>{event.title}</Typography>
                          <Typography sx={{ fontSize: '0.8125rem', color: themeConfig.colors.textLight }}>{event.shortDescription.slice(0, 50)}...</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                        {event.tags.slice(0, 2).map((tag) => <Chip key={tag} label={tag} size="small" sx={{ fontSize: '0.75rem' }} />)}
                        {event.tags.length > 2 && <Chip label={`+${event.tags.length - 2}`} size="small" sx={{ fontSize: '0.75rem' }} />}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip label={event.featured ? 'Featured' : 'Active'} size="small" sx={{ bgcolor: event.featured ? '#fef3c7' : '#f3f4f6', color: event.featured ? '#92400e' : themeConfig.colors.textLight, fontWeight: 600 }} />
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ color: themeConfig.colors.textLight, fontSize: '0.875rem' }}>Custom</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                        <IconButton size="small" href={`/events/${event.slug}`} target="_blank" sx={{ bgcolor: '#f8f9fa' }}>
                          <Visibility fontSize="small" />
                        </IconButton>
                        <IconButton size="small" href={`/admin/events/${event._id}`} sx={{ bgcolor: `${themeConfig.colors.primary}15`, color: themeConfig.colors.primary }}>
                          <Edit fontSize="small" />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}
    </Box>
  )
}
