import Link from 'next/link'
import Image from 'next/image'
import { getCities } from '@/lib/services/cities'
import { getPackages } from '@/lib/services/packages'
import { Card } from '@/components/ui/Card'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'

export const revalidate = 3600

export const metadata = {
  title: 'Tours & Travel - Jashn Planners',
  description: 'Explore luxury destinations and curated tour packages',
}

export default async function ToursPage() {
  const [cities, packages] = await Promise.all([
    getCities(),
    getPackages(),
  ])

  return (
    <>
      <section className="relative h-[50vh] flex items-center justify-center bg-gradient-to-br from-secondary/30 to-primary/20">
        <div className="container-custom text-center">
          <Heading level={1} className="mb-4">Tours & Travel</Heading>
          <p className="text-xl text-text-light">Discover breathtaking destinations and curated experiences</p>
        </div>
      </section>

      <Section>
        <div className="text-center mb-12">
          <Heading level={2} decorative centered>Popular Destinations</Heading>
          <p className="text-text-light mt-4">Explore our handpicked locations</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {cities.map((city) => (
            <Link key={city._id.toString()} href={`/cities/${city.slug}`}>
              <Card className="overflow-hidden h-full group cursor-pointer">
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
          <div className="text-center py-12 mb-16">
            <p className="text-text-light text-lg">No destinations available at the moment.</p>
          </div>
        )}

        <div className="text-center mb-12">
          <Heading level={2} decorative centered>Tour Packages</Heading>
          <p className="text-text-light mt-4">Curated experiences for every traveler</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <Link key={pkg._id.toString()} href={`/packages/${pkg.slug}`}>
              <Card variant="premium" className="overflow-hidden h-full cursor-pointer">
                {pkg.images[0] && (
                  <div className="relative h-64">
                    <Image
                      src={pkg.images[0]}
                      alt={pkg.title}
                      fill
                      className="object-cover"
                    />
                    {pkg.featured && (
                      <Badge variant="luxury" className="absolute top-4 right-4">Featured</Badge>
                    )}
                  </div>
                )}
                <div className="p-6">
                  <Badge variant="luxury" className="mb-3">{pkg.duration}</Badge>
                  <h3 className="font-serif text-2xl font-semibold mb-2">{pkg.title}</h3>
                  <p className="text-text-light line-clamp-3 mb-4">{pkg.description}</p>
                  {pkg.pricingEnabled && pkg.price && (
                    <p className="text-primary font-bold text-xl mb-4">₹{pkg.price.toLocaleString()}</p>
                  )}
                  <Button className="w-full" size="sm">View Details</Button>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {packages.length === 0 && (
          <div className="text-center py-12">
            <p className="text-text-light text-lg">No packages available at the moment.</p>
          </div>
        )}
      </Section>
    </>
  )
}
