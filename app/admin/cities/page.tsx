import Link from 'next/link'
import { getCities } from '@/lib/services/cities'
import { Box, Typography, Button, Chip } from '@mui/material'
import Card from '@/components/ui-new/Card'
import Image from 'next/image'
import AddIcon from '@mui/icons-material/Add'

export default async function AdminCitiesPage() {
  const cities = await getCities()

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" sx={{ fontFamily: 'var(--font-playfair)', fontWeight: 700 }}>Cities</Typography>
        <Button href="/admin/cities/new" component={Link} variant="contained" startIcon={<AddIcon />}>Add City</Button>
      </Box>

      {cities.length === 0 ? (
        <Card><Box sx={{ p: 8, textAlign: 'center' }}><Typography variant="h6" color="text.secondary">No cities yet. Create your first city!</Typography></Box></Card>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 3 }}>
          {cities.map((city) => (
            <Card hover key={city._id.toString()}>
              {city.bannerImage && <Box sx={{ position: 'relative', height: 200, overflow: 'hidden' }}><Image src={city.bannerImage} alt={city.name} fill style={{ objectFit: 'cover' }} /></Box>}
              <Box sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  {city.featured && <Chip label="Featured" color="primary" size="small" />}
                </Box>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>{city.name}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{city.description}</Typography>
                <Button href={`/admin/cities/${city._id}`} component={Link} variant="outlined" fullWidth>Edit City</Button>
              </Box>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  )
}
