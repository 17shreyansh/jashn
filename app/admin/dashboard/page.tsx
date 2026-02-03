import { getEvents } from '@/lib/services/events'
import { getCities } from '@/lib/services/cities'
import { getPackages } from '@/lib/services/packages'
import { getLeads } from '@/lib/services/leads'
import { getGalleryStats } from '@/lib/services/gallery'
import { Box, Typography, Stack, Chip } from '@mui/material'
import Card from '@/components/ui-new/Card'
import { TrendingUp, Event, LocationCity, CardTravel, PhotoLibrary, Email, ArrowForward } from '@mui/icons-material'
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
    { label: 'Total Events', value: events.length, icon: Event, color: themeConfig.colors.primary, change: '+12%' },
    { label: 'Destinations', value: cities.length, icon: LocationCity, color: themeConfig.colors.secondary, change: '+8%' },
    { label: 'Tour Packages', value: packages.length, icon: CardTravel, color: themeConfig.colors.accent1, change: '+15%' },
    { label: 'Gallery Items', value: galleryStats.total, icon: PhotoLibrary, color: themeConfig.colors.luxury, change: '+20%' },
  ]

  const newLeads = leads.filter(l => l.status === 'new')

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography sx={{ fontSize: '1.75rem', fontWeight: 700, color: themeConfig.colors.textDark, mb: 0.5 }}>Dashboard</Typography>
        <Typography sx={{ color: themeConfig.colors.textLight }}>Welcome back! Here's what's happening.</Typography>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 3, mb: 4 }}>
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} sx={{ p: 3, bgcolor: 'white', border: '1px solid #e5e7eb', borderRadius: 3, transition: 'all 0.2s', '&:hover': { boxShadow: '0 4px 12px rgba(0,0,0,0.08)', transform: 'translateY(-2px)' } }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: `${stat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon sx={{ color: stat.color, fontSize: 24 }} />
                </Box>
                <Chip label={stat.change} size="small" sx={{ bgcolor: '#10b98115', color: '#10b981', fontWeight: 600, fontSize: '0.75rem', height: 24 }} icon={<TrendingUp sx={{ fontSize: 14 }} />} />
              </Box>
              <Typography sx={{ fontSize: '2rem', fontWeight: 700, color: themeConfig.colors.textDark, mb: 0.5 }}>{stat.value}</Typography>
              <Typography sx={{ fontSize: '0.875rem', color: themeConfig.colors.textLight }}>{stat.label}</Typography>
            </Card>
          )
        })}
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' }, gap: 3 }}>
        <Card sx={{ p: 3, bgcolor: 'white', border: '1px solid #e5e7eb', borderRadius: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Typography sx={{ fontSize: '1.125rem', fontWeight: 600, color: themeConfig.colors.textDark }}>Recent Leads</Typography>
            <Chip label={`${newLeads.length} New`} size="small" color="error" sx={{ fontWeight: 600 }} />
          </Box>
          <Stack spacing={0}>
            {leads.slice(0, 6).map((lead, idx) => (
              <Box key={lead._id.toString()} sx={{ py: 2.5, borderBottom: idx < 5 ? '1px solid #f3f4f6' : 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontWeight: 600, fontSize: '0.9375rem', color: themeConfig.colors.textDark, mb: 0.5 }}>{lead.name}</Typography>
                  <Typography sx={{ fontSize: '0.8125rem', color: themeConfig.colors.textLight }}>{lead.email}</Typography>
                </Box>
                <Chip label={lead.status} size="small" sx={{ bgcolor: lead.status === 'new' ? '#fef3c7' : '#f3f4f6', color: lead.status === 'new' ? '#92400e' : themeConfig.colors.textLight, fontWeight: 600, fontSize: '0.75rem', textTransform: 'capitalize' }} />
              </Box>
            ))}
          </Stack>
          <Box component="a" href="/admin/leads" sx={{ mt: 3, pt: 3, borderTop: '1px solid #f3f4f6', display: 'flex', alignItems: 'center', gap: 1, color: themeConfig.colors.primary, fontWeight: 600, fontSize: '0.875rem', cursor: 'pointer', textDecoration: 'none', '&:hover': { gap: 1.5 }, transition: 'all 0.2s' }}>
            View All Leads <ArrowForward sx={{ fontSize: 18 }} />
          </Box>
        </Card>

        <Card sx={{ p: 3, bgcolor: 'white', border: '1px solid #e5e7eb', borderRadius: 3 }}>
          <Typography sx={{ fontSize: '1.125rem', fontWeight: 600, color: themeConfig.colors.textDark, mb: 3 }}>Quick Actions</Typography>
          <Stack spacing={2}>
            {[
              { href: '/admin/events/new', label: 'Create Event', icon: Event },
              { href: '/admin/cities/new', label: 'Add City', icon: LocationCity },
              { href: '/admin/packages/new', label: 'New Package', icon: CardTravel },
              { href: '/admin/gallery', label: 'Upload Media', icon: PhotoLibrary },
            ].map((action) => {
              const Icon = action.icon
              return (
                <Box key={action.href} component="a" href={action.href} sx={{ p: 2.5, bgcolor: '#f8f9fa', borderRadius: 2, display: 'flex', alignItems: 'center', gap: 2, transition: 'all 0.2s', '&:hover': { bgcolor: `${themeConfig.colors.primary}10`, transform: 'translateX(4px)' }, cursor: 'pointer', textDecoration: 'none' }}>
                  <Box sx={{ width: 36, height: 36, borderRadius: 1.5, bgcolor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon sx={{ fontSize: 20, color: themeConfig.colors.primary }} />
                  </Box>
                  <Typography sx={{ fontWeight: 500, fontSize: '0.9375rem', color: themeConfig.colors.textDark }}>{action.label}</Typography>
                  <ArrowForward sx={{ ml: 'auto', fontSize: 18, color: themeConfig.colors.textLight }} />
                </Box>
              )
            })}
          </Stack>
        </Card>
      </Box>
    </Box>
  )
}
