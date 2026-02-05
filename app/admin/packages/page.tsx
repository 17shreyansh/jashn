import { getPackages } from '@/lib/services/packages'
import { Box, Typography, Button, Chip, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Avatar } from '@mui/material'
import Card from '@/components/ui-new/Card'
import { Add, Edit, Visibility } from '@mui/icons-material'
import { themeConfig } from '@/lib/config/theme'

export default async function AdminPackagesPage() {
  const packages = await getPackages()

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography sx={{ fontSize: '1.75rem', fontWeight: 700, color: themeConfig.colors.textDark, mb: 0.5 }}>Packages</Typography>
          <Typography sx={{ color: themeConfig.colors.textLight }}>Manage tour packages</Typography>
        </Box>
        <Button href="/admin/packages/new" variant="contained" startIcon={<Add />} sx={{ bgcolor: themeConfig.colors.black, '&:hover': { bgcolor: themeConfig.colors.primary } }}>Add Package</Button>
      </Box>

      {packages.length === 0 ? (
        <Card sx={{ p: 8, textAlign: 'center', bgcolor: 'white', border: '1px solid #e5e7eb' }}>
          <Typography sx={{ fontSize: '1.125rem', fontWeight: 600, color: themeConfig.colors.textDark, mb: 1 }}>No packages yet</Typography>
          <Typography sx={{ color: themeConfig.colors.textLight, mb: 3 }}>Create your first tour package</Typography>
          <Button href="/admin/packages/new" variant="contained" startIcon={<Add />} sx={{ bgcolor: themeConfig.colors.black }}>Add Package</Button>
        </Card>
      ) : (
        <Card sx={{ bgcolor: 'white', border: '1px solid #e5e7eb', borderRadius: 3, overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f8f9fa' }}>
                  <TableCell sx={{ fontWeight: 600, color: themeConfig.colors.textDark }}>Package</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: themeConfig.colors.textDark }}>Duration</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: themeConfig.colors.textDark }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: themeConfig.colors.textDark }}>Price</TableCell>
                  <TableCell align="right" sx={{ fontWeight: 600, color: themeConfig.colors.textDark }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {packages.map((pkg) => (
                  <TableRow key={pkg._id.toString()} sx={{ '&:hover': { bgcolor: '#f8f9fa' }, transition: 'all 0.2s' }}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar src={pkg.images[0]} variant="rounded" sx={{ width: 56, height: 56 }} />
                        <Box>
                          <Typography sx={{ fontWeight: 600, fontSize: '0.9375rem', color: themeConfig.colors.textDark }}>{pkg.title}</Typography>
                          <Typography sx={{ fontSize: '0.8125rem', color: themeConfig.colors.textLight }}>{pkg.description.slice(0, 50)}...</Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip label={pkg.duration} size="small" sx={{ bgcolor: `${themeConfig.colors.secondary}15`, color: themeConfig.colors.secondary, fontWeight: 600 }} />
                    </TableCell>
                    <TableCell>
                      <Chip label={pkg.featured ? 'Featured' : 'Active'} size="small" sx={{ bgcolor: pkg.featured ? '#fef3c7' : '#f3f4f6', color: pkg.featured ? '#92400e' : themeConfig.colors.textLight, fontWeight: 600 }} />
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ color: themeConfig.colors.textLight, fontSize: '0.875rem' }}>Custom</Typography>
                    </TableCell>
                    <TableCell align="right">
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                        <IconButton size="small" href={`/packages/${pkg.slug}`} target="_blank" sx={{ bgcolor: '#f8f9fa' }}>
                          <Visibility fontSize="small" />
                        </IconButton>
                        <IconButton size="small" href={`/admin/packages/${pkg._id}`} sx={{ bgcolor: `${themeConfig.colors.primary}15`, color: themeConfig.colors.primary }}>
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
