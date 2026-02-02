'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { X, Play, Image as ImageIcon, Video as VideoIcon } from 'lucide-react'

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
    <>
      <Section className="pt-32 pb-20">
        <div className="text-center mb-12">
          <Heading level={1}>Our Gallery</Heading>
          <p className="text-xl text-textLight mt-4 max-w-2xl mx-auto">
            Explore moments from our premium events and luxury tours
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-12">
          <Button
            variant={activeTab === 'events' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('events')}
            className="px-8"
          >
            Events Gallery
          </Button>
          <Button
            variant={activeTab === 'tours' ? 'primary' : 'outline'}
            onClick={() => setActiveTab('tours')}
            className="px-8"
          >
            Tours & Travels
          </Button>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {loading ? (
              <div className="text-center py-20">
                <p className="text-textLight">Loading gallery...</p>
              </div>
            ) : (
              <>
                {/* Images Section */}
                {images.length > 0 && (
                  <div className="mb-16">
                    <div className="flex items-center gap-3 mb-6">
                      <ImageIcon className="w-6 h-6 text-primary" />
                      <h2 className="text-2xl font-serif text-textDark">Photos</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                      {images.map((item, idx) => (
                        <motion.div
                          key={item._id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <Card
                            className="overflow-hidden cursor-pointer group"
                            onClick={() => setLightbox(item)}
                          >
                            <div className="relative aspect-square">
                              <img
                                src={item.url}
                                alt={item.title}
                                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                  <h3 className="text-white font-semibold">{item.title}</h3>
                                  {item.description && (
                                    <p className="text-white/80 text-sm mt-1 line-clamp-2">
                                      {item.description}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Videos Section */}
                {videos.length > 0 && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <VideoIcon className="w-6 h-6 text-primary" />
                      <h2 className="text-2xl font-serif text-textDark">Videos</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {videos.map((item, idx) => (
                        <motion.div
                          key={item._id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: idx * 0.05 }}
                        >
                          <Card
                            className="overflow-hidden cursor-pointer group"
                            onClick={() => setLightbox(item)}
                          >
                            <div className="relative aspect-video">
                              <video
                                src={item.url}
                                className="w-full h-full object-cover"
                                poster={item.thumbnail}
                              />
                              <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                                <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                                  <Play className="w-8 h-8 text-primary ml-1" fill="currentColor" />
                                </div>
                              </div>
                            </div>
                            <div className="p-4">
                              <h3 className="font-semibold text-textDark">{item.title}</h3>
                              {item.description && (
                                <p className="text-sm text-textLight mt-1 line-clamp-2">
                                  {item.description}
                                </p>
                              )}
                            </div>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}

                {images.length === 0 && videos.length === 0 && (
                  <div className="text-center py-20">
                    <p className="text-textLight text-lg">
                      No {activeTab} gallery items yet. Check back soon!
                    </p>
                  </div>
                )}
              </>
            )}
          </motion.div>
        </AnimatePresence>
      </Section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="max-w-6xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {lightbox.mediaType === 'image' ? (
                <img
                  src={lightbox.url}
                  alt={lightbox.title}
                  className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
                />
              ) : (
                <video
                  src={lightbox.url}
                  controls
                  autoPlay
                  className="w-full h-auto max-h-[85vh] rounded-lg"
                />
              )}
              <div className="mt-4 text-center">
                <h3 className="text-white text-xl font-semibold">{lightbox.title}</h3>
                {lightbox.description && (
                  <p className="text-white/70 mt-2">{lightbox.description}</p>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
