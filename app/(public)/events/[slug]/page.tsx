import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getEventBySlug, getEvents } from '@/lib/services/events'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export const revalidate = 3600

export async function generateStaticParams() {
  const events = await getEvents()
  return events.map((event) => ({ slug: event.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = await getEventBySlug(slug)
  if (!event) return {}
  
  return {
    title: `${event.title} - Jashn Planners`,
    description: event.shortDescription,
  }
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = await getEventBySlug(slug)
  
  if (!event) notFound()

  return (
    <>
      <section className="relative h-[60vh]">
        {event.images[0] && (
          <>
            <Image
              src={event.images[0]}
              alt={event.title}
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
          </>
        )}
        <div className="absolute bottom-0 left-0 right-0 container-custom pb-12 text-white">
          <div className="flex flex-wrap gap-2 mb-4">
            {event.tags.map((tag) => (
              <Badge key={tag} variant="luxury">{tag}</Badge>
            ))}
          </div>
          <Heading level={1} className="text-white mb-4">{event.title}</Heading>
          <p className="text-xl text-white/90 max-w-3xl">{event.shortDescription}</p>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2">
            <Card className="p-8 mb-8">
              <Heading level={2} className="mb-6">About This Event</Heading>
              <div className="prose prose-lg max-w-none text-text-light">
                {event.description}
              </div>
            </Card>

            {event.images.length > 1 && (
              <Card className="p-8">
                <Heading level={3} className="mb-6">Gallery</Heading>
                <div className="grid grid-cols-2 gap-4">
                  {event.images.slice(1).map((img, idx) => (
                    <div key={idx} className="relative h-64 rounded-xl overflow-hidden">
                      <Image src={img} alt={`${event.title} ${idx + 1}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              </Card>
            )}
          </div>

          <div>
            <Card variant="premium" className="p-6 sticky top-24">
              <Heading level={3} className="mb-6">Get Started</Heading>
              
              {event.pricingEnabled && event.basePrice && (
                <div className="mb-6 pb-6 border-b border-luxury/30">
                  <p className="text-text-light mb-2">Starting Price</p>
                  <p className="text-4xl font-bold text-primary">₹{event.basePrice.toLocaleString()}</p>
                </div>
              )}

              {event.addons.length > 0 && (
                <div className="mb-6">
                  <p className="font-semibold mb-3">Available Add-ons</p>
                  <div className="space-y-2">
                    {event.addons.map((addon, idx) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-text-light">{addon.name}</span>
                        <span className="font-medium">₹{addon.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <Link href="/contact">
                <Button className="w-full" size="lg">Request Quote</Button>
              </Link>
            </Card>
          </div>
        </div>
      </Section>
    </>
  )
}
