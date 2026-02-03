import { Box } from '@mui/material'
import { getGalleryItems } from '@/lib/services/gallery'
import HeroSection from '@/components/sections/HeroSection'
import ServicesSection from '@/components/sections/ServicesSection'
import StatsSection from '@/components/sections/StatsSection'
import EventsGallerySection from '@/components/sections/EventsGallerySection'
import ToursGallerySection from '@/components/sections/ToursGallerySection'
import AboutSection from '@/components/sections/AboutSection'
import CTASection from '@/components/sections/CTASection'

export const revalidate = 3600

export default async function HomePage() {
  return (
    <Box sx={{ bgcolor: 'background.default', overflowX: 'hidden' }}>
      <HeroSection />
      <ServicesSection />
      <StatsSection />
      <EventsGallerySection />
      <AboutSection />
      <ToursGallerySection />
      <CTASection />
    </Box>
  )
}