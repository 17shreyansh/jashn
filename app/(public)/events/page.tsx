import Link from 'next/link'
import Image from 'next/image'
import { getEvents } from '@/lib/services/events'
import { Card } from '@/components/ui/Card'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Badge } from '@/components/ui/Badge'

export const revalidate = 3600

export const metadata = {
  title: 'Events - Jashn Planners',
  description: 'Browse our premium event planning services',
}

export default async function EventsPage() {
  const events = await getEvents()

  return (
    <>
      <section className="relative h-[40vh] flex items-center justify-center bg-gradient-to-br from-accent2 to-accent1/50">
        <div className="container-custom text-center">
          <Heading level={1} className="text-white mb-4">Our Events</Heading>
          <p className="text-xl text-white/90">Celebrations crafted to perfection</p>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {events.map((event) => (
            <Link key={event._id.toString()} href={`/events/${event.slug}`}>
              <Card className="overflow-hidden h-full">
                {event.images[0] && (
                  <div className="relative h-64">
                    <Image
                      src={event.images[0]}
                      alt={event.title}
                      fill
                      className="object-cover"
                    />
                    {event.featured && (
                      <Badge variant="luxury" className="absolute top-4 right-4">Featured</Badge>
                    )}
                  </div>
                )}
                <div className="p-6">
                  <h3 className="font-serif text-2xl font-semibold mb-2">{event.title}</h3>
                  <p className="text-text-light line-clamp-3 mb-4">{event.shortDescription}</p>
                  <div className="flex flex-wrap gap-2">
                    {event.tags.slice(0, 3).map((tag) => (
                      <Badge key={tag} variant="accent">{tag}</Badge>
                    ))}
                  </div>
                  {event.pricingEnabled && event.basePrice && (
                    <p className="text-primary font-bold text-xl mt-4">Starting at ₹{event.basePrice.toLocaleString()}</p>
                  )}
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {events.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-light text-lg">No events available at the moment.</p>
          </div>
        )}
      </Section>
    </>
  )
}
