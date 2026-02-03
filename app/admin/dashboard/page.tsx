import { getEvents } from '@/lib/services/events'
import { getCities } from '@/lib/services/cities'
import { getPackages } from '@/lib/services/packages'
import { getLeads } from '@/lib/services/leads'
import { getGalleryStats } from '@/lib/services/gallery'
import { Box, Typography, Container, Stack, Divider } from '@mui/material'
import Card from '@/components/ui-new/Card'
import Link from 'next/link'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'

export default async function DashboardPage() {
  const [events, cities, packages, leads, galleryStats] = await Promise.all([
    getEvents(),
    getCities(),
    getPackages(),
    getLeads(),
    getGalleryStats(),
  ])

  const stats = [
    { label: 'Events', value: events.length, icon: '🎉', color: '#3B82F6' },
    { label: 'Cities', value: cities.length, icon: '🏙️', color: '#8B5CF6' },
    { label: 'Packages', value: packages.length, icon: '✈️', color: '#06B6D4' },
    { label: 'Gallery', value: galleryStats.total, icon: '🖼️', color: '#10B981' },
    { label: 'New Leads', value: leads.filter(l => l.status === 'new').length, icon: '📧', color: '#F59E0B' },
  ]

  const quickActions = [
    { href: '/admin/events/new', label: 'Add Event', icon: '➕' },
    { href: '/admin/cities/new', label: 'Add City', icon: '➕' },
    { href: '/admin/packages/new', label: 'Add Package', icon: '➕' },
    { href: '/admin/gallery', label: 'Manage Gallery', icon: '🖼️' },
  ]

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>Dashboard</Typography>
        <Typography color="text.secondary">Overview of your platform</Typography>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', lg: 'repeat(5, 1fr)' }, gap: 2.5, mb: 4 }}>
        {stats.map((stat) => (
          <Card key={stat.label} sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Box sx={{ width: 44, height: 44, borderRadius: 2, bgcolor: `${stat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>{stat.icon}</Box>
              <Box>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.8125rem', mb: 0.5 }}>{stat.label}</Typography>
                <Typography variant="h5" sx={{ fontWeight: 700 }}>{stat.value}</Typography>
              </Box>
            </Box>
          </Card>
        ))}
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' }, gap: 3 }}>
        <Card sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>Recent Leads</Typography>
          <Stack spacing={0} divider={<Divider />}>
            {leads.slice(0, 5).map((lead) => (
              <Box key={lead._id.toString()} sx={{ py: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body2" sx={{ fontWeight: 500, mb: 0.5 }}>{lead.name}</Typography>
                  <Typography variant="caption" color="text.secondary">{lead.email}</Typography>
                </Box>
                <Box sx={{ px: 2, py: 0.5, borderRadius: 1.5, bgcolor: lead.status === 'new' ? 'secondary.main' : 'neutral.200', color: lead.status === 'new' ? 'white' : 'text.secondary', fontSize: '0.75rem', fontWeight: 500 }}>
                  {lead.status}
                </Box>
              </Box>
            ))}
          </Stack>
        </Card>

        <Card sx={{ p: 3, border: '1px solid', borderColor: 'divider' }}>
          <Typography variant="h6" sx={{ mb: 3, fontWeight: 600 }}>Quick Actions</Typography>
          <Stack spacing={2}>
            {quickActions.map((action) => (
              <Link key={action.href} href={action.href} style={{ textDecoration: 'none' }}>
                <Box sx={{ p: 2.5, bgcolor: 'neutral.50', borderRadius: 2, border: '1px solid', borderColor: 'divider', display: 'flex', alignItems: 'center', gap: 2, transition: 'all 0.2s', '&:hover': { bgcolor: 'neutral.100', transform: 'translateY(-1px)' }, cursor: 'pointer' }}>
                  <Box sx={{ fontSize: '1.25rem' }}>{action.icon}</Box>
                  <Typography sx={{ fontWeight: 500 }}>{action.label}</Typography>
                  <ArrowForwardIcon sx={{ ml: 'auto', fontSize: 18, color: 'text.secondary' }} />
                </Box>
              </Link>
            ))}
          </Stack>
        </Card>
      </Box>
    </Box>
  )
}
