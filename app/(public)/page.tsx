import Link from 'next/link'
import Image from 'next/image'
import { getEvents } from '@/lib/services/events'
import { getCities } from '@/lib/services/cities'
import { getPackages } from '@/lib/services/packages'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Badge } from '@/components/ui/Badge'
import { getGalleryItems } from '@/lib/services/gallery'

export const revalidate = 3600

export default async function HomePage() {
  const [featuredEvents, featuredCities, featuredPackages, eventsGallery, toursGallery] = await Promise.all([
    getEvents(true),
    getCities(true),
    getPackages(undefined, true),
    getGalleryItems('events'),
    getGalleryItems('tours'),
  ])

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-accent2 via-accent1/30 to-secondary/20" />
        <div className="absolute inset-0 marble-bg" />
        
        <div className="relative z-10 container-custom text-center">
          <Badge variant="luxury" className="mb-6">Premium Events & Luxury Travel</Badge>
          <Heading level={1} className="mb-6 text-6xl md:text-7xl">
            Create Unforgettable
            <br />
            <span className="text-primary">Moments</span>
          </Heading>
          <p className="text-xl text-text-light max-w-2xl mx-auto mb-8">
            From dream weddings to exotic destinations, we craft experiences that last a lifetime
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/events">
              <Button size="lg">Explore Events</Button>
            </Link>
            <Link href="/tours">
              <Button size="lg" variant="outline">View Tours</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Dual Boxes - Events & Tours */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Events Box */}
          <Link href="/events">
            <Card variant="premium" className="group overflow-hidden h-[400px] relative cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-accent1/40 to-primary/30" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 mb-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-5xl">🎉</span>
                </div>
                <Heading level={2} className="mb-4 group-hover:scale-105 transition-transform">
                  Events Planning
                </Heading>
                <p className="text-text-light text-lg mb-6">
                  Weddings, Birthdays, Corporate Events & More
                </p>
                <Button variant="outline">Explore Events →</Button>
              </div>
            </Card>
          </Link>

          {/* Tours Box */}
          <Link href="/tours">
            <Card variant="premium" className="group overflow-hidden h-[400px] relative cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/40 to-accent2/30" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                <div className="w-20 h-20 mb-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                  <span className="text-5xl">✈️</span>
                </div>
                <Heading level={2} className="mb-4 group-hover:scale-105 transition-transform">
                  Tours & Travels
                </Heading>
                <p className="text-text-light text-lg mb-6">
                  Luxury Destinations, Curated Experiences
                </p>
                <Button variant="outline">View Tours →</Button>
              </div>
            </Card>
          </Link>
        </div>
      </Section>

      <Section className="bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-5xl font-bold text-primary mb-2">500+</div>
            <p className="text-text-light">Events Organized</p>
          </div>
          <div>
            <div className="text-5xl font-bold text-primary mb-2">1000+</div>
            <p className="text-text-light">Happy Clients</p>
          </div>
          <div>
            <div className="text-5xl font-bold text-primary mb-2">50+</div>
            <p className="text-text-light">Destinations</p>
          </div>
          <div>
            <div className="text-5xl font-bold text-primary mb-2">15+</div>
            <p className="text-text-light">Years Experience</p>
          </div>
        </div>
      </Section>

      {/* Events Gallery */}
      <Section>
        <div className="text-center mb-12">
          <Heading level={2} decorative centered>Events Gallery</Heading>
          <p className="text-text-light mt-4">Moments we've created</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {eventsGallery.filter(item => item.mediaType === 'image').slice(0, 12).map((item) => (
            <div key={item._id} className="relative aspect-square overflow-hidden rounded-lg group">
              <Image
                src={item.url}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/gallery">
            <Button size="lg">View Full Gallery</Button>
          </Link>
        </div>
      </Section>

      {/* About Us Section */}
      <Section className="bg-white/50">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <Badge variant="luxury" className="mb-4">About Jashn Planners</Badge>
            <Heading level={2} className="mb-6">Creating Memories Since 2009</Heading>
            <p className="text-text-light text-lg mb-4">
              We are a premium event planning and luxury travel company dedicated to turning your dreams into reality. 
              With over 15 years of experience, we've mastered the art of creating unforgettable moments.
            </p>
            <p className="text-text-light text-lg mb-6">
              From intimate gatherings to grand celebrations, from exotic getaways to cultural expeditions, 
              we handle every detail with precision and care.
            </p>
            <Link href="/about">
              <Button>Learn More About Us</Button>
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Card className="p-6 text-center">
              <div className="text-4xl mb-3">🏆</div>
              <h4 className="font-semibold mb-2">Award Winning</h4>
              <p className="text-sm text-text-light">Industry recognized excellence</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-4xl mb-3">👥</div>
              <h4 className="font-semibold mb-2">Expert Team</h4>
              <p className="text-sm text-text-light">Passionate professionals</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-4xl mb-3">💎</div>
              <h4 className="font-semibold mb-2">Luxury Focus</h4>
              <p className="text-sm text-text-light">Premium experiences only</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-4xl mb-3">🌍</div>
              <h4 className="font-semibold mb-2">Global Reach</h4>
              <p className="text-sm text-text-light">Worldwide destinations</p>
            </Card>
          </div>
        </div>
      </Section>

      {/* Tours Gallery */}
      <Section>
        <div className="text-center mb-12">
          <Heading level={2} decorative centered>Tours Gallery</Heading>
          <p className="text-text-light mt-4">Destinations that inspire</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {toursGallery.filter(item => item.mediaType === 'image').slice(0, 9).map((item) => (
            <div key={item._id} className="relative aspect-[4/3] overflow-hidden rounded-lg group">
              <Image
                src={item.url}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/gallery">
            <Button size="lg">View Full Gallery</Button>
          </Link>
        </div>
      </Section>

      <Section className="bg-gradient-to-br from-primary/10 to-secondary/10">
        <div className="max-w-3xl mx-auto text-center">
          <Heading level={2} className="mb-6">Ready to Start Planning?</Heading>
          <p className="text-text-light text-lg mb-8">
            Let's create something extraordinary together. Get in touch with our team today.
          </p>
          <Link href="/contact">
            <Button size="lg">Contact Us</Button>
          </Link>
        </div>
      </Section>
    </>
  )
}
