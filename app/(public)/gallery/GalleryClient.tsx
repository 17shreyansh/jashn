'use client'

import { useState, useEffect } from 'react'
import { Box, Typography, Container, Tabs, Tab, Dialog, IconButton, CircularProgress } from '@mui/material'
import { motion } from 'framer-motion'
import CloseIcon from '@mui/icons-material/Close'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import ImageIcon from '@mui/icons-material/Image'
import VideocamIcon from '@mui/icons-material/Videocam'
import { themeConfig } from '@/lib/config/theme'

const MotionBox = motion(Box)

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
      {/* Hero Section - Dark Premium */}
      <Box sx={{ 
        minHeight: '50vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        bgcolor: themeConfig.colors.black,
        position: 'relative',
        overflow: 'hidden',
        pt: '100px'
      }}>
        <Box sx={{ 
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 50% 50%, rgba(107, 70, 193, 0.2), transparent 70%)',
          filter: 'blur(60px)'
        }} />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <MotionBox
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Typography sx={{ 
              fontFamily: themeConfig.fonts.heading, 
              fontSize: { xs: '3rem', md: '5rem' },
              fontWeight: 700,
              color: themeConfig.colors.white,
              mb: 3,
              lineHeight: 1.1,
              letterSpacing: '-0.02em'
            }}>Our Gallery</Typography>
            <Box sx={{ width: 80, height: 2, bgcolor: themeConfig.colors.luxury, mx: 'auto', mb: 4 }} />
            <Typography sx={{ 
              color: 'rgba(255,255,255,0.7)', 
              fontSize: { xs: '1.1rem', md: '1.3rem' },
              fontWeight: 300,
              lineHeight: 1.7
            }}>Explore moments from our premium events and luxury tours</Typography>
          </MotionBox>
        </Container>
      </Box>

      {/* Gallery Content */}
      <Box sx={{ py: { xs: 10, md: 16 }, bgcolor: '#fafaf9' }}>
        <Container maxWidth="xl">
          <Box sx={{ display: 'flex', justifyContent: 'center', mb: 8 }}>
            <Tabs 
              value={activeTab} 
              onChange={(e, v) => setActiveTab(v)}
              sx={{
                '& .MuiTab-root': {
                  fontSize: '1rem',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  px: 5,
                  py: 2,
                  color: themeConfig.colors.textLight,
                  '&.Mui-selected': {
                    color: themeConfig.colors.luxury
                  }
                },
                '& .MuiTabs-indicator': {
                  bgcolor: themeConfig.colors.luxury,
                  height: 3,
                  borderRadius: '3px 3px 0 0'
                }
              }}
            >
              <Tab label="Events Gallery" value="events" />
              <Tab label="Tours & Travels" value="tours" />
            </Tabs>
          </Box>

          {loading ? (
            <Box sx={{ textAlign: 'center', py: 12 }}>
              <CircularProgress sx={{ color: themeConfig.colors.luxury }} size={48} />
            </Box>
          ) : (
            <>
              {images.length > 0 && (
                <Box sx={{ mb: 12 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 6 }}>
                    <ImageIcon sx={{ color: themeConfig.colors.luxury, fontSize: 32 }} />
                    <Typography sx={{ 
                      fontFamily: themeConfig.fonts.heading,
                      fontSize: '2rem',
                      fontWeight: 600,
                      color: themeConfig.colors.textDark
                    }}>Photos</Typography>
                  </Box>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 3 }}>
                    {images.map((item) => (
                      <MotionBox
                        key={item._id}
                        whileHover={{ y: -8 }}
                        onClick={() => setLightbox(item)}
                        sx={{ 
                          cursor: 'pointer',
                          borderRadius: '16px',
                          overflow: 'hidden',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                          transition: 'box-shadow 0.3s ease',
                          '&:hover': {
                            boxShadow: `0 12px 40px ${themeConfig.colors.luxury}30`
                          }
                        }}
                      >
                        <Box sx={{ position: 'relative', paddingTop: '100%', overflow: 'hidden' }}>
                          <img 
                            src={item.url} 
                            alt={item.title} 
                            style={{ 
                              position: 'absolute', 
                              top: 0, 
                              left: 0, 
                              width: '100%', 
                              height: '100%', 
                              objectFit: 'cover', 
                              transition: 'transform 0.5s ease'
                            }} 
                          />
                        </Box>
                      </MotionBox>
                    ))}
                  </Box>
                </Box>
              )}

              {videos.length > 0 && (
                <Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 6 }}>
                    <VideocamIcon sx={{ color: themeConfig.colors.luxury, fontSize: 32 }} />
                    <Typography sx={{ 
                      fontFamily: themeConfig.fonts.heading,
                      fontSize: '2rem',
                      fontWeight: 600,
                      color: themeConfig.colors.textDark
                    }}>Videos</Typography>
                  </Box>
                  <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }, gap: 4 }}>
                    {videos.map((item) => (
                      <MotionBox
                        key={item._id}
                        whileHover={{ y: -8 }}
                        onClick={() => setLightbox(item)}
                        sx={{ 
                          cursor: 'pointer',
                          bgcolor: 'white',
                          borderRadius: '24px',
                          overflow: 'hidden',
                          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                          transition: 'box-shadow 0.3s ease',
                          '&:hover': {
                            boxShadow: `0 12px 40px ${themeConfig.colors.luxury}30`
                          }
                        }}
                      >
                        <Box sx={{ position: 'relative', paddingTop: '56.25%', overflow: 'hidden', bgcolor: 'black' }}>
                          <video src={item.url} poster={item.thumbnail} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
                          <Box sx={{ position: 'absolute', inset: 0, bgcolor: 'rgba(0,0,0,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Box sx={{ 
                              width: 72, 
                              height: 72, 
                              borderRadius: '50%', 
                              bgcolor: themeConfig.colors.luxury,
                              display: 'flex', 
                              alignItems: 'center', 
                              justifyContent: 'center',
                              boxShadow: `0 8px 24px ${themeConfig.colors.luxury}60`,
                              transition: 'transform 0.3s ease',
                              '&:hover': { transform: 'scale(1.1)' }
                            }}>
                              <PlayArrowIcon sx={{ fontSize: 36, color: themeConfig.colors.black, ml: 0.5 }} />
                            </Box>
                          </Box>
                        </Box>
                        <Box sx={{ p: 3 }}>
                          <Typography sx={{ fontWeight: 600, fontSize: '1.125rem', color: themeConfig.colors.textDark, mb: 0.5 }}>{item.title}</Typography>
                          {item.description && <Typography sx={{ fontSize: '0.875rem', color: themeConfig.colors.textLight }}>{item.description}</Typography>}
                        </Box>
                      </MotionBox>
                    ))}
                  </Box>
                </Box>
              )}

              {images.length === 0 && videos.length === 0 && (
                <Box sx={{ textAlign: 'center', py: 12 }}>
                  <Typography sx={{ fontSize: '1.25rem', color: themeConfig.colors.textLight, fontWeight: 300 }}>No {activeTab} gallery items yet. Check back soon!</Typography>
                </Box>
              )}
            </>
          )}
        </Container>
      </Box>

      {/* Lightbox Dialog */}
      <Dialog 
        open={!!lightbox} 
        onClose={() => setLightbox(null)} 
        maxWidth="lg" 
        fullWidth
        PaperProps={{
          sx: {
            bgcolor: 'transparent',
            boxShadow: 'none',
            overflow: 'visible'
          }
        }}
      >
        {lightbox && (
          <Box sx={{ position: 'relative', bgcolor: themeConfig.colors.black, borderRadius: '16px', overflow: 'hidden' }}>
            <IconButton 
              onClick={() => setLightbox(null)} 
              sx={{ 
                position: 'absolute', 
                top: 16, 
                right: 16, 
                color: themeConfig.colors.white, 
                bgcolor: 'rgba(0,0,0,0.5)',
                backdropFilter: 'blur(10px)',
                zIndex: 10,
                '&:hover': { 
                  bgcolor: 'rgba(0,0,0,0.7)',
                  transform: 'scale(1.1)'
                },
                transition: 'all 0.3s ease'
              }}
            >
              <CloseIcon />
            </IconButton>
            {lightbox.mediaType === 'image' ? (
              <img src={lightbox.url} alt={lightbox.title} style={{ width: '100%', maxHeight: '85vh', objectFit: 'contain' }} />
            ) : (
              <video src={lightbox.url} controls autoPlay style={{ width: '100%', maxHeight: '85vh' }} />
            )}
            <Box sx={{ p: 4, textAlign: 'center', color: themeConfig.colors.white }}>
              <Typography sx={{ fontFamily: themeConfig.fonts.heading, fontSize: '1.75rem', fontWeight: 600, mb: 1 }}>{lightbox.title}</Typography>
              {lightbox.description && <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '1rem' }}>{lightbox.description}</Typography>}
            </Box>
          </Box>
        )}
      </Dialog>
    </Box>
  )
}
