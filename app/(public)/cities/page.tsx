import Link from 'next/link'
import Image from 'next/image'
import { getCities } from '@/lib/services/cities'
import { Card } from '@/components/ui/Card'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'

export const revalidate = 3600

export const metadata = {
  title: 'Destinations - Jashn Planners',
  description: 'Explore our luxury travel destinations',
}

export default async function CitiesPage() {
  const cities = await getCities()

  return (
    <>
      <section className="relative h-[40vh] flex items-center justify-center bg-gradient-to-br from-secondary/30 to-primary/20">
        <div className="container-custom text-center">
          <Heading level={1} className="mb-4">Our Destinations</Heading>
          <p className="text-xl text-text-light">Discover breathtaking locations around the world</p>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cities.map((city) => (
            <Link key={city._id.toString()} href={`/cities/${city.slug}`}>
              <Card className="overflow-hidden h-full group">
                {city.bannerImage && (
                  <div className="relative h-80">
                    <Image
                      src={city.bannerImage}
                      alt={city.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="font-serif text-3xl font-semibold">{city.name}</h3>
                    </div>
                  </div>
                )}
                <div className="p-6">
                  <p className="text-text-light line-clamp-3">{city.description}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {cities.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-light text-lg">No destinations available at the moment.</p>
          </div>
        )}
      </Section>
    </>
  )
}
