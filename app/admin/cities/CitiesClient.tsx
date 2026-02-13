'use client'

import { useState } from 'react'
import { Box, Typography, Button, Chip, Avatar, TextField, InputAdornment } from '@mui/material'
import Card from '@/components/ui-new/Card'
import DataTable from '@/components/admin/DataTable'
import { Add, LocationCity, Search, Star } from '@mui/icons-material'
import { themeConfig } from '@/lib/config/theme'

export default function CitiesClient({ cities }: { cities: any[] }) {
  const [search, setSearch] = useState('')

  const filteredCities = cities.filter(c => c.name.toLowerCase().includes(search.toLowerCase()))

  const columns = [
    {
      id: 'city',
      label: 'City',
      render: (row: any) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Avatar src={row.bannerImage} variant="rounded" sx={{ width: 64, height: 64 }} />
          <Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
              <Typography sx={{ fontWeight: 600, fontSize: '0.9375rem', color: themeConfig.colors.textDark }}>{row.name}</Typography>
              {row.featured && <Star sx={{ fontSize: 16, color: '#f59e0b' }} />}
            </Box>
            <Typography sx={{ fontSize: '0.8125rem', color: themeConfig.colors.textLight }}>{row.description.slice(0, 60)}...</Typography>
          </Box>
        </Box>
      ),
    },
    {
      id: 'highlights',
      label: 'Highlights',
      render: (row: any) => (
        <Typography sx={{ fontSize: '0.875rem', color: themeConfig.colors.textLight }}>
          {row.highlights?.length || 0} items
        </Typography>
      ),
    },
    {
      id: 'gallery',
      label: 'Gallery',
      render: (row: any) => (
        <Typography sx={{ fontSize: '0.875rem', color: themeConfig.colors.textLight }}>
          {row.galleryImages?.length || 0} images
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
    if (action === 'view') window.open(`/cities/${row.slug}`, '_blank')
    if (action === 'edit') window.location.href = `/admin/cities/${row._id}`
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography sx={{ fontSize: '2rem', fontWeight: 700, color: themeConfig.colors.textDark, mb: 1 }}>Cities Management</Typography>
          <Typography sx={{ color: themeConfig.colors.textLight, fontSize: '1rem' }}>Manage travel destinations and city guides</Typography>
        </Box>
        <Button href="/admin/cities/new" variant="contained" startIcon={<Add />} sx={{ bgcolor: themeConfig.colors.black, px: 3, py: 1.5, fontSize: '0.9375rem', fontWeight: 600, '&:hover': { bgcolor: themeConfig.colors.primary } }}>Add City</Button>
      </Box>

      {cities.length === 0 ? (
        <Card sx={{ p: 10, textAlign: 'center', bgcolor: 'white', border: '1px solid #e5e7eb', borderRadius: 3 }}>
          <Box sx={{ width: 80, height: 80, borderRadius: '50%', bgcolor: `${themeConfig.colors.secondary}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
            <LocationCity sx={{ fontSize: 40, color: themeConfig.colors.secondary }} />
          </Box>
          <Typography sx={{ fontSize: '1.25rem', fontWeight: 600, color: themeConfig.colors.textDark, mb: 1 }}>No cities yet</Typography>
          <Typography sx={{ color: themeConfig.colors.textLight, mb: 4, maxWidth: 400, mx: 'auto' }}>Add your first destination to showcase travel packages</Typography>
          <Button href="/admin/cities/new" variant="contained" startIcon={<Add />} sx={{ bgcolor: themeConfig.colors.black, px: 4, py: 1.5 }}>Add Your First City</Button>
        </Card>
      ) : (
        <Card sx={{ bgcolor: 'white', border: '1px solid #e5e7eb', borderRadius: 3, overflow: 'hidden', p: 3 }}>
          <Box sx={{ mb: 3 }}>
            <TextField
              placeholder="Search cities..."
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
          <DataTable columns={columns} data={filteredCities} actions={actions} onRowAction={handleAction} searchable={false} />
        </Card>
      )}
    </Box>
  )
}
