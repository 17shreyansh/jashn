import { Metadata } from 'next'
import GalleryClient from './GalleryClient'

export const metadata: Metadata = {
  title: 'Gallery | Jashn Planners - Events & Tours',
  description: 'Explore our stunning gallery of premium events and luxury tours. View photos and videos from weddings, corporate events, and travel experiences.',
  keywords: 'event gallery, tour gallery, wedding photos, event videos, luxury tours, travel gallery',
}

export default function GalleryPage() {
  return <GalleryClient />
}
