'use client'

import { useState } from 'react'
import { Box, Typography, Button, Chip, Avatar, TextField, InputAdornment } from '@mui/material'
import Card from '@/components/ui-new/Card'
import DataTable from '@/components/admin/DataTable'
import { Add, CardTravel, Search, Star, AccessTime } from '@mui/icons-material'
import { themeConfig } from '@/lib/config/theme'

export default function PackagesClient({ packages }: { packages: any[] }) {
  const [search, setSearch] = useState('')

  const filteredPackages = packages.filter(p => p.title.toLowerCase().includes(search.toLowerCase()))

  const columns = [
    {
      id: 'package',
      label: 'Package',
      render: (row: any) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar src={row.images[0]} variant="rounded" sx={{ width: 64, height: 64 }} />
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Typography sx={{ fontWeight: 600, fontSize: '0.9375rem', color: themeConfig.colors.textDark }}>{row.title}</Typography>
              {row.featured && <Star sx={{ fontSize: 16, color: '#f59e0b' }} />}
            </Box>
            <Typography sx={{ fontSize: '0.8125rem', color: themeConfig.colors.textLight }}>{row.description.slice(0, 60)}...</Typography>
          </Box>
        </Box>
      ),
    },
    {
      id: 'duration',
      label: 'Duration',
      render: (row: any) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AccessTime sx={{ fontSize: 16, color: themeConfig.colors.textLight }} />
          <Typography sx={{ fontSize: '0.875rem', color: themeConfig.colors.textDark, fontWeight: 500 }}>{row.duration}</Typography>
        </Box>
      ),
    },
    {
      id: 'itinerary',
      label: 'Itinerary',
      render: (row: any) => (
        <Typography sx={{ fontSize: '0.875rem', color: themeConfig.colors.textLight }}>
          {row.itinerary?.length || 0} days
        </Typography>
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
  ]

  const actions = [
    { label: 'View', value: 'view' },
    { label: 'Edit', value: 'edit' },
    { label: 'Toggle Featured', value: 'feature' },
    { label: 'Delete', value: 'delete' },
  ]

  const handleAction = (action: string, row: any) => {
    if (action === 'view') window.open(`/packages/${row.slug}`, '_blank')
    if (action === 'edit') window.location.href = `/admin/packages/${row._id}`
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography sx={{ fontSize: '2rem', fontWeight: 700, color: themeConfig.colors.textDark, mb: 1 }}>Packages Management</Typography>
          <Typography sx={{ color: themeConfig.colors.textLight, fontSize: '1rem' }}>Manage tour packages and itineraries</Typography>
        </Box>
        <Button href="/admin/packages/new" variant="contained" startIcon={<Add />} sx={{ bgcolor: themeConfig.colors.black, px: 3, py: 1.5, fontSize: '0.9375rem', fontWeight: 600, '&:hover': { bgcolor: themeConfig.colors.primary } }}>Add Package</Button>
      </Box>

      {packages.length === 0 ? (
        <Card sx={{ p: 10, textAlign: 'center', bgcolor: 'white', border: '1px solid #e5e7eb', borderRadius: 3 }}>
          <Box sx={{ width: 80, height: 80, borderRadius: '50%', bgcolor: '#f59e0b15', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
            <CardTravel sx={{ fontSize: 40, color: '#f59e0b' }} />
          </Box>
          <Typography sx={{ fontSize: '1.25rem', fontWeight: 600, color: themeConfig.colors.textDark, mb: 1 }}>No packages yet</Typography>
          <Typography sx={{ color: themeConfig.colors.textLight, mb: 4, maxWidth: 400, mx: 'auto' }}>Create your first tour package to start offering travel experiences</Typography>
          <Button href="/admin/packages/new" variant="contained" startIcon={<Add />} sx={{ bgcolor: themeConfig.colors.black, px: 4, py: 1.5 }}>Create Your First Package</Button>
        </Card>
      ) : (
        <Card sx={{ bgcolor: 'white', border: '1px solid #e5e7eb', borderRadius: 3, overflow: 'hidden', p: 3 }}>
          <Box sx={{ mb: 3 }}>
            <TextField
              placeholder="Search packages..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              size="small"
              sx={{ width: 400 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search fontSize="small" />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <DataTable columns={columns} data={filteredPackages} actions={actions} onRowAction={handleAction} searchable={false} />
        </Card>
      )}
    </Box>
  )
}
