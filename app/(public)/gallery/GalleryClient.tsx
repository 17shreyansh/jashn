'use client'

import { useState, useEffect } from 'react'
import { Box, Typography, Button, Container, Tabs, Tab, Dialog, IconButton, CircularProgress } from '@mui/material'
import Card from '@/components/ui-new/Card'
import CloseIcon from '@mui/icons-material/Close'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import ImageIcon from '@mui/icons-material/Image'
import VideocamIcon from '@mui/icons-material/Videocam'

interface GalleryItem {
  _id: string
  title: string
  type: 'events' | 'tours'
  mediaType: 'image' | 'video'
  url: string
  thumbnail?: string
  description?: string
  featured: boolean
}

export default function GalleryClient() {
  const [activeTab, setActiveTab] = useState<'events' | 'tours'>('events')
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null)

  useEffect(() => {
    fetchItems()
  }, [activeTab])

  const fetchItems = async () => {
    setLoading(true)
    try {
      const res = await fetch(`/api/gallery?type=${activeTab}`)
      const data = await res.json()
      if (data.success) setItems(data.data)
    } catch (error) {
      console.error('Failed to fetch gallery:', error)
    } finally {
      setLoading(false)
    }
  }

  const images = items.filter(item => item.mediaType === 'image')
  const videos = items.filter(item => item.mediaType === 'video')

  return (
    <Box>
      <Box sx={{ minHeight: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, #fff0cb, #ffdede)', py: 8 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h2" sx={{ mb: 2 }}>Our Gallery</Typography>
          <Typography variant="h5" color="text.secondary">Explore moments from our premium events and luxury tours</Typography>
        </Box>
      </Box>

      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 6 }}>
            <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)}>
              <Tab label="Events Gallery" value="events" />
              <Tab label="Tours & Travels" value="tours" />
            </Tabs>
          </Box>

          {loading ? (
            <Box sx={{ textAlign: 'center', py: 10 }}><CircularProgress /></Box>
          ) : (
            <>
              {images.length > 0 && (
                <Box sx={{ mb: 8 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                    <ImageIcon color="primary" />
                    <Typography variant="h4" sx={{ fontFamily: 'var(--font-playfair)' }}>Photos</Typography>
                  </Box>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 3 }}>
                    {images.map((item) => (
                      <Card key={item._id} hover sx={{ cursor: 'pointer' }} onClick={() => setLightbox(item)}>
                        <Box sx={{ position: 'relative', paddingTop: '100%', overflow: 'hidden', '&:hover img': { transform: 'scale(1.1)' } }}>
                          <img src={item.url} alt={item.title} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s' }} />
                        </Box>
                      </Card>
                    ))}
                  </Box>
                </Box>
              )}

              {videos.length > 0 && (
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                    <VideocamIcon color="primary" />
                    <Typography variant="h4" sx={{ fontFamily: 'var(--font-playfair)' }}>Videos</Typography>
                  </Box>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 3 }}>
                    {videos.map((item) => (
                      <Card key={item._id} hover sx={{ cursor: 'pointer' }} onClick={() => setLightbox(item)}>
                        <Box sx={{ position: 'relative', paddingTop: '56.25%', overflow: 'hidden', bgcolor: 'black' }}>
                          <video src={item.url} poster={item.thumbnail} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                          <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Box sx={{ width: 64, height: 64, borderRadius: '50%', bgcolor: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <PlayArrowIcon sx={{ fontSize: 32, color: 'primary.main', ml: 0.5 }} />
                            </Box>
                          </Box>
                        </Box>
                        <Box sx={{ p: 2 }}>
                          <Typography variant="h6" sx={{ fontWeight: 600 }}>{item.title}</Typography>
                          {item.description && <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>{item.description}</Typography>}
                        </Box>
                      </Card>
                    ))}
                  </Box>
                </Box>
              )}

              {images.length === 0 && videos.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 10 }}>
                  <Typography variant="h6" color="text.secondary">No {activeTab} gallery items yet. Check back soon!</Typography>
                </Box>
              )}
            </>
          )}
        </Container>
      </Box>

      <Dialog open={!!lightbox} onClose={() => setLightbox(null)} maxWidth="lg" fullWidth>
        {lightbox && (
          <Box sx={{ position: 'relative', bgcolor: 'black', p: 2 }}>
            <IconButton onClick={() => setLightbox(null)} sx={{ position: 'absolute', top: 8, right: 8, color: 'white', bgcolor: 'rgba(255,255,255,0.1)', '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' } }}>
              <CloseIcon />
            </IconButton>
            {lightbox.mediaType === 'image' ? (
              <img src={lightbox.url} alt={lightbox.title} style={{ width: '100%', maxHeight: '85vh', objectFit: 'contain' }} />
            ) : (
              <video src={lightbox.url} controls autoPlay style={{ width: '100%', maxHeight: '85vh' }} />
            )}
            <Box sx={{ mt: 2, textAlign: 'center', color: 'white' }}>
              <Typography variant="h5">{lightbox.title}</Typography>
              {lightbox.description && <Typography variant="body2" sx={{ mt: 1, color: 'rgba(255,255,255,0.7)' }}>{lightbox.description}</Typography>}
            </Box>
          </Box>
        )}
      </Dialog>
    </Box>
  )
}
