'use client'

import { Box, Typography, Button, Chip, Avatar, Tabs, Tab, TextField, InputAdornment } from '@mui/material'
import Card from '@/components/ui-new/Card'
import DataTable from '@/components/admin/DataTable'
import { Add, Star, Search } from '@mui/icons-material'
import { themeConfig } from '@/lib/config/theme'
import { useState } from 'react'

export default function EventsClient({ events }: { events: any[] }) {
  const [tab, setTab] = useState(0)
  const [search, setSearch] = useState('')

  const filteredEvents = events.filter(e => {
    const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase())
    if (tab === 1) return matchesSearch && e.featured
    if (tab === 2) return matchesSearch && !e.featured
    return matchesSearch
  })

  const columns = [
    {
      id: 'event',
      label: 'Event',
      render: (row: any) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar src={row.images[0]} variant="rounded" sx={{ width: 64, height: 64 }} />
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Typography sx={{ fontWeight: 600, fontSize: '0.9375rem', color: themeConfig.colors.textDark }}>{row.title}</Typography>
              {row.featured && <Star sx={{ fontSize: 16, color: '#f59e0b' }} />}
            </Box>
            <Typography sx={{ fontSize: '0.8125rem', color: themeConfig.colors.textLight }}>{row.shortDescription.slice(0, 60)}...</Typography>
          </Box>
        </Box>
      ),
    },
    {
      id: 'tags',
      label: 'Tags',
      render: (row: any) => (
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', maxWidth: 200 }}>
          {row.tags.slice(0, 2).map((tag: string) => <Chip key={tag} label={tag} size="small" sx={{ fontSize: '0.75rem', height: 24 }} />)}
          {row.tags.length > 2 && <Chip label={`+${row.tags.length - 2}`} size="small" sx={{ fontSize: '0.75rem', height: 24 }} />}
        </Box>
      ),
    },
    {
      id: 'status',
      label: 'Status',
      render: (row: any) => (
        <Chip
          label={row.featured ? 'Featured' : 'Active'}
          size="small"
          sx={{ bgcolor: row.featured ? '#fef3c7' : '#dbeafe', color: row.featured ? '#92400e' : '#1e40af', fontWeight: 600, fontSize: '0.75rem' }}
        />
      ),
    },
    {
      id: 'created',
      label: 'Created',
      render: (row: any) => (
        <Typography sx={{ fontSize: '0.875rem', color: themeConfig.colors.textLight }}>
          {new Date(row.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </Typography>
      ),
    },
  ]

  const actions = [
    { label: 'View', value: 'view' },
    { label: 'Edit', value: 'edit' },
    { label: 'Toggle Featured', value: 'feature' },
    { label: 'Delete', value: 'delete' },
  ]

  const handleAction = (action: string, row: any) => {
    if (action === 'view') window.open(`/events/${row.slug}`, '_blank')
    if (action === 'edit') window.location.href = `/admin/events/${row._id}`
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography sx={{ fontSize: '2rem', fontWeight: 700, color: themeConfig.colors.textDark, mb: 1 }}>Events Management</Typography>
          <Typography sx={{ color: themeConfig.colors.textLight, fontSize: '1rem' }}>Manage your event portfolio and showcase</Typography>
        </Box>
        <Button href="/admin/events/new" variant="contained" startIcon={<Add />} sx={{ bgcolor: themeConfig.colors.black, px: 3, py: 1.5, fontSize: '0.9375rem', fontWeight: 600, '&:hover': { bgcolor: themeConfig.colors.primary } }}>Create Event</Button>
      </Box>

      {events.length === 0 ? (
        <Card sx={{ p: 10, textAlign: 'center', bgcolor: 'white', border: '1px solid #e5e7eb', borderRadius: 3 }}>
          <Box sx={{ width: 80, height: 80, borderRadius: '50%', bgcolor: `${themeConfig.colors.primary}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
            <Add sx={{ fontSize: 40, color: themeConfig.colors.primary }} />
          </Box>
          <Typography sx={{ fontSize: '1.25rem', fontWeight: 600, color: themeConfig.colors.textDark, mb: 1 }}>No events yet</Typography>
          <Typography sx={{ color: themeConfig.colors.textLight, mb: 4, maxWidth: 400, mx: 'auto' }}>Create your first event to start showcasing your services to potential clients</Typography>
          <Button href="/admin/events/new" variant="contained" startIcon={<Add />} sx={{ bgcolor: themeConfig.colors.black, px: 4, py: 1.5 }}>Create Your First Event</Button>
        </Card>
      ) : (
        <Card sx={{ bgcolor: 'white', border: '1px solid #e5e7eb', borderRadius: 3, overflow: 'hidden', p: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, fontSize: '0.9375rem' } }}>
              <Tab label={`All (${events.length})`} />
              <Tab label={`Featured (${events.filter(e => e.featured).length})`} />
              <Tab label={`Regular (${events.filter(e => !e.featured).length})`} />
            </Tabs>
            <TextField
              placeholder="Search events..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size="small"
              sx={{ width: 300 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <DataTable columns={columns} data={filteredEvents} actions={actions} onRowAction={handleAction} searchable={false} />
        </Card>
      )}
    </Box>
  )
}
