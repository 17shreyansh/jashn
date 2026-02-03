import Link from 'next/link'
import Image from 'next/image'
import { Box, Typography, Button, Container, Stack } from '@mui/material'

interface GalleryItem {
  _id: string
  url: string
  title: string
  mediaType: string
}

export default function GallerySection({ items }: { items: GalleryItem[] }) {
  return (
    <Container maxWidth="xl" sx={{ py: { xs: 10, md: 14 } }}>
      <Stack alignItems="center" sx={{ mb: 8, textAlign: 'center' }}>
        <Typography variant="overline" color="secondary" sx={{ fontWeight: 700, letterSpacing: 2, mb: 1 }}>OUR PORTFOLIO</Typography>
        <Typography variant="h2" sx={{ mb: 2 }}>Captured Moments</Typography>
        <Typography color="text.secondary" sx={{ maxWidth: 500 }}>A glimpse into the unforgettable experiences we've crafted for our clients.</Typography>
      </Stack>
      
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' }, 
        gap: 3 
      }}>
        {items.filter(item => item.mediaType === 'image').slice(0, 8).map((item, i) => (
          <Box key={item._id} sx={{ 
            position: 'relative', 
            paddingTop: i === 0 || i === 3 ? '120%' : '100%',
            overflow: 'hidden', 
            borderRadius: 4,
            gridRow: i === 0 || i === 3 ? 'span 2' : 'span 1',
            boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
            '&:hover img': { transform: 'scale(1.1)' },
            '&:hover .overlay': { opacity: 1 }
          }}>
            <Image 
              src={item.url} 
              alt={item.title} 
              fill 
              style={{ objectFit: 'cover', transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }} 
            />
            <Box className="overlay" sx={{
              position: 'absolute', inset: 0, 
              background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
              opacity: 0, transition: 'opacity 0.3s',
              display: 'flex', alignItems: 'flex-end', p: 3
            }}>
              <Typography color="white" variant="subtitle1" fontWeight="600">{item.title}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
      <Box sx={{ textAlign: 'center', mt: 6 }}>
        <Link href="/gallery" style={{ textDecoration: 'none' }}>
          <Button variant="outlined" size="large" color="primary">View Full Gallery</Button>
        </Link>
      </Box>
    </Container>
  )
}
