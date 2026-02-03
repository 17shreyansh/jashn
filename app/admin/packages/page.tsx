import Link from 'next/link'
import { getPackages } from '@/lib/services/packages'
import { Box, Typography, Button, Chip } from '@mui/material'
import Card from '@/components/ui-new/Card'
import Image from 'next/image'
import AddIcon from '@mui/icons-material/Add'

export default async function AdminPackagesPage() {
  const packages = await getPackages()

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontFamily: 'var(--font-playfair)', fontWeight: 700 }}>Packages</Typography>
        <Button href="/admin/packages/new" component={Link} variant="contained" startIcon={<AddIcon />}>Add Package</Button>
      </Box>

      {packages.length === 0 ? (
        <Card><Box sx={{ p: 8, textAlign: 'center' }}><Typography variant="h6" color="text.secondary">No packages yet. Create your first package!</Typography></Box></Card>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 3 }}>
          {packages.map((pkg) => (
            <Card hover key={pkg._id.toString()}>
              {pkg.images[0] && <Box sx={{ position: 'relative', height: 200, overflow: 'hidden' }}><Image src={pkg.images[0]} alt={pkg.title} fill style={{ objectFit: 'cover' }} /></Box>}
              <Box sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                  {pkg.featured && <Chip label="Featured" color="primary" size="small" />}
                  <Chip label={pkg.duration} color="luxury" size="small" />
                  {pkg.pricingEnabled && <Chip label="Pricing" color="secondary" size="small" />}
                </Box>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>{pkg.title}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{pkg.description}</Typography>
                {pkg.pricingEnabled && pkg.price && <Typography variant="h6" color="primary.main" sx={{ fontWeight: 700, mb: 2 }}>₹{pkg.price.toLocaleString()}</Typography>}
                <Button href={`/admin/packages/${pkg._id}`} component={Link} variant="outlined" fullWidth>Edit Package</Button>
              </Box>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  )
}
