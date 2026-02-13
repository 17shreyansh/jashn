export const dynamic = 'force-dynamic'

import { getEvents } from '@/lib/services/events'
import { getCities } from '@/lib/services/cities'
import { getPackages } from '@/lib/services/packages'
import { getLeads } from '@/lib/services/leads'
import { getGalleryStats } from '@/lib/services/gallery'
import { Box, Typography, Stack, Chip, Avatar, LinearProgress } from '@mui/material'
import Card from '@/components/ui-new/Card'
import StatsCard from '@/components/admin/StatsCard'
import { Event, LocationCity, CardTravel, PhotoLibrary, Email, ArrowForward, Visibility, Star } from '@mui/icons-material'
import { themeConfig } from '@/lib/config/theme'

export default async function DashboardPage() {
  const [events, cities, packages, leads, galleryStats] = await Promise.all([
    getEvents(),
    getCities(),
    getPackages(),
    getLeads(),
    getGalleryStats(),
  ])

  const stats = [
    { label: 'Total Events', value: events.length, icon: Event, color: themeConfig.colors.primary, change: '+12%', trend: 'up' as const },
    { label: 'Destinations', value: cities.length, icon: LocationCity, color: themeConfig.colors.secondary, change: '+8%', trend: 'up' as const },
    { label: 'Tour Packages', value: packages.length, icon: CardTravel, color: '#f59e0b', change: '+15%', trend: 'up' as const },
    { label: 'Gallery Items', value: galleryStats.total, icon: PhotoLibrary, color: themeConfig.colors.luxury, change: '+20%', trend: 'up' as const },
  ]

  const newLeads = leads.filter(l => l.status === 'new')
  const featuredEvents = events.filter(e => e.featured)

  return (
    <Box>
      <Box sx={{ mb: 5 }}>
        <Typography sx={{ fontSize: '2rem', fontWeight: 700, color: themeConfig.colors.textDark, mb: 1 }}>Dashboard Overview</Typography>
        <Typography sx={{ color: themeConfig.colors.textLight, fontSize: '1rem' }}>Welcome back! Here's your business performance at a glance.</Typography>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 3, mb: 5 }}>
        {stats.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
        ))}
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1.5fr 1fr' }, gap: 3, mb: 4 }}>
        <Card sx={{ p: 4, bgcolor: 'white', border: '1px solid #e5e7eb', borderRadius: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
            <Box>
              <Typography sx={{ fontSize: '1.25rem', fontWeight: 600, color: themeConfig.colors.textDark }}>Recent Leads</Typography>
              <Typography sx={{ fontSize: '0.875rem', color: themeConfig.colors.textLight, mt: 0.5 }}>Latest inquiries from customers</Typography>
            </Box>
            <Chip label={`${newLeads.length} New`} size="small" sx={{ bgcolor: '#ef444415', color: '#ef4444', fontWeight: 600, height: 28, fontSize: '0.8125rem' }} />
          </Box>
          <Stack spacing={0}>
            {leads.slice(0, 5).map((lead, idx) => (
              <Box key={lead._id.toString()} sx={{ py: 3, borderBottom: idx < 4 ? '1px solid #f3f4f6' : 'none', display: 'flex', gap: 2, alignItems: 'center' }}>
                <Avatar sx={{ width: 44, height: 44, bgcolor: `${themeConfig.colors.primary}15`, color: themeConfig.colors.primary, fontWeight: 600, fontSize: '1rem' }}>
                  {lead.name[0].toUpperCase()}
                </Avatar>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9375rem', color: themeConfig.colors.textDark, mb: 0.5 }}>{lead.name}</Typography>
                  <Typography sx={{ fontSize: '0.8125rem', color: themeConfig.colors.textLight, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{lead.email}</Typography>
                </Box>
                <Chip label={lead.status} size="small" sx={{ bgcolor: lead.status === 'new' ? '#fef3c7' : '#f3f4f6', color: lead.status === 'new' ? '#92400e' : themeConfig.colors.textLight, fontWeight: 600, fontSize: '0.75rem', textTransform: 'capitalize', minWidth: 70 }} />
              </Box>
            ))}
          </Stack>
          <Box component="a" href="/admin/leads" sx={{ mt: 4, pt: 3, borderTop: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', gap: 1, color: themeConfig.colors.primary, fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', textDecoration: 'none', '&:hover': { gap: 1.5 }, transition: 'all 0.2s' }}>
            View All Leads <ArrowForward sx={{ fontSize: 18 }} />
          </Box>
        </Card>

        <Card sx={{ p: 4, bgcolor: 'white', border: '1px solid #e5e7eb', borderRadius: 3 }}>
          <Typography sx={{ fontSize: '1.25rem', fontWeight: 600, color: themeConfig.colors.textDark, mb: 1 }}>Quick Actions</Typography>
          <Typography sx={{ fontSize: '0.875rem', color: themeConfig.colors.textLight, mb: 4 }}>Frequently used shortcuts</Typography>
          <Stack spacing={2}>
            {[
              { href: '/admin/events/new', label: 'Create Event', icon: Event, color: themeConfig.colors.primary },
              { href: '/admin/cities/new', label: 'Add City', icon: LocationCity, color: themeConfig.colors.secondary },
              { href: '/admin/packages/new', label: 'New Package', icon: CardTravel, color: '#f59e0b' },
              { href: '/admin/gallery', label: 'Upload Media', icon: PhotoLibrary, color: themeConfig.colors.luxury },
            ].map((action) => {
              const Icon = action.icon
              return (
                <Box key={action.href} component="a" href={action.href} sx={{ p: 3, bgcolor: '#f8f9fa', borderRadius: 2.5, display: 'flex', alignItems: 'center', gap: 2.5, transition: 'all 0.3s', '&:hover': { bgcolor: `${action.color}10`, transform: 'translateX(6px)', boxShadow: '0 4px 12px rgba(0,0,0,0.08)' }, cursor: 'pointer', textDecoration: 'none' }}>
                  <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
                    <Icon sx={{ fontSize: 22, color: action.color }} />
                  </Box>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9375rem', color: themeConfig.colors.textDark, flex: 1 }}>{action.label}</Typography>
                  <ArrowForward sx={{ fontSize: 18, color: themeConfig.colors.textLight }} />
                </Box>
              )
            })}
          </Stack>
        </Card>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' }, gap: 3 }}>
        <Card sx={{ p: 4, bgcolor: 'white', border: '1px solid #e5e7eb', borderRadius: 3 }}>
          <Typography sx={{ fontSize: '1.25rem', fontWeight: 600, color: themeConfig.colors.textDark, mb: 1 }}>Popular Events</Typography>
          <Typography sx={{ fontSize: '0.875rem', color: themeConfig.colors.textLight, mb: 4 }}>Most viewed events this month</Typography>
          <Stack spacing={3}>
            {events.slice(0, 4).map((event) => (
              <Box key={event._id.toString()} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Avatar src={event.images[0]} variant="rounded" sx={{ width: 56, height: 56 }} />
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9375rem', color: themeConfig.colors.textDark, mb: 0.5, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{event.title}</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Visibility sx={{ fontSize: 14, color: themeConfig.colors.textLight }} />
                    <Typography sx={{ fontSize: '0.8125rem', color: themeConfig.colors.textLight }}>1.2k views</Typography>
                    {event.featured && <Star sx={{ fontSize: 14, color: '#f59e0b', ml: 1 }} />}
                  </Box>
                </Box>
              </Box>
            ))}
          </Stack>
        </Card>

        <Card sx={{ p: 4, bgcolor: 'white', border: '1px solid #e5e7eb', borderRadius: 3 }}>
          <Typography sx={{ fontSize: '1.25rem', fontWeight: 600, color: themeConfig.colors.textDark, mb: 1 }}>Content Status</Typography>
          <Typography sx={{ fontSize: '0.875rem', color: themeConfig.colors.textLight, mb: 4 }}>Your content distribution</Typography>
          <Stack spacing={3}>
            {[
              { label: 'Events', value: events.length, total: 50, color: themeConfig.colors.primary },
              { label: 'Cities', value: cities.length, total: 30, color: themeConfig.colors.secondary },
              { label: 'Packages', value: packages.length, total: 40, color: '#f59e0b' },
              { label: 'Gallery', value: galleryStats.total, total: 200, color: themeConfig.colors.luxury },
            ].map((item) => (
              <Box key={item.label}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: themeConfig.colors.textDark }}>{item.label}</Typography>
                  <Typography sx={{ fontSize: '0.875rem', fontWeight: 600, color: themeConfig.colors.textLight }}>{item.value}/{item.total}</Typography>
                </Box>
                <LinearProgress variant="determinate" value={(item.value / item.total) * 100} sx={{ height: 8, borderRadius: 4, bgcolor: '#f3f4f6', '& .MuiLinearProgress-bar': { bgcolor: item.color, borderRadius: 4 } }} />
              </Box>
            ))}
          </Stack>
        </Card>
      </Box>
    </Box>
  )
}
