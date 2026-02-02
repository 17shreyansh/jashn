import { connectDB } from '@/lib/db/mongodb'
import { getGallery } from '@/lib/db/models'

export async function getGalleryItems(type?: 'events' | 'tours') {
  await connectDB()
  const Gallery = getGallery()
  const filter = type ? { type } : {}
  return await Gallery.find(filter).sort({ order: 1, createdAt: -1 }).lean()
}

export async function getGalleryStats() {
  await connectDB()
  const Gallery = getGallery()
  const [total, events, tours, images, videos] = await Promise.all([
    Gallery.countDocuments(),
    Gallery.countDocuments({ type: 'events' }),
    Gallery.countDocuments({ type: 'tours' }),
    Gallery.countDocuments({ mediaType: 'image' }),
    Gallery.countDocuments({ mediaType: 'video' }),
  ])
  return { total, events, tours, images, videos }
}
