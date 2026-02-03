import { getCities } from '@/lib/services/cities'
import { Box, Typography, Button, Chip, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar } from '@mui/material'
import Card from '@/components/ui-new/Card'
import { Add, Edit, Visibility } from '@mui/icons-material'
import { themeConfig } from '@/lib/config/theme'

export default async function AdminCitiesPage() {
  const cities = await getCities()

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography sx={{ fontSize: '1.75rem', fontWeight: 700, color: themeConfig.colors.textDark, mb: 0.5 }}>Cities</Typography>
          <Typography sx={{ color: themeConfig.colors.textLight }}>Manage travel destinations</Typography>
        </Box>
        <Button href="/admin/cities/new" variant="contained" startIcon={<Add />} sx={{ bgcolor: themeConfig.colors.black, '&:hover': { bgcolor: themeConfig.colors.primary } }}>Add City</Button>
      </Box>

      {cities.length === 0 ? (
        <Card sx={{ p: 8, textAlign: 'center', bgcolor: 'white', border: '1px solid #e5e7eb' }}>
          <Typography sx={{ fontSize: '1.125rem', fontWeight: 600, color: themeConfig.colors.textDark, mb: 1 }}>No cities yet</Typography>
          <Typography sx={{ color: themeConfig.colors.textLight, mb: 3 }}>Add your first destination</Typography>
          <Button href="/admin/cities/new" variant="contained" startIcon={<Add />} sx={{ bgcolor: themeConfig.colors.black }}>Add City</Button>
        </Card>
      ) : (
        <Card sx={{ bgcolor: 'white', border: '1px solid #e5e7eb', borderRadius: 3, overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                  <TableCell sx={{ fontWeight: 600, color: themeConfig.colors.textDark }}>City</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: themeConfig.colors.textDark }}>Description</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: themeConfig.colors.textDark }}>Status</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, color: themeConfig.colors.textDark }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cities.map((city) => (
                  <TableRow key={city._id.toString()} sx={{ '&:hover': { bgcolor: '#f8f9fa' }, transition: 'all 0.2s' }}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar src={city.bannerImage} variant="rounded" sx={{ width: 56, height: 56 }} />
                        <Typography sx={{ fontWeight: 600, fontSize: '0.9375rem', color: themeConfig.colors.textDark }}>{city.name}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ fontSize: '0.8125rem', color: themeConfig.colors.textLight }}>{city.description.slice(0, 80)}...</Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={city.featured ? 'Featured' : 'Active'} size="small" sx={{ bgcolor: city.featured ? '#fef3c7' : '#f3f4f6', color: city.featured ? '#92400e' : themeConfig.colors.textLight, fontWeight: 600 }} />
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                        <IconButton size="small" href={`/cities/${city.slug}`} target="_blank" sx={{ bgcolor: '#f8f9fa' }}>
                          <Visibility fontSize="small" />
                        </IconButton>
                        <IconButton size="small" href={`/admin/cities/${city._id}`} sx={{ bgcolor: `${themeConfig.colors.primary}15`, color: themeConfig.colors.primary }}>
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
