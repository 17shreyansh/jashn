import Link from 'next/link'
import Image from 'next/image'
import { getPackages } from '@/lib/services/packages'
import { Card } from '@/components/ui/Card'
import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Badge } from '@/components/ui/Badge'

export const revalidate = 3600

export const metadata = {
  title: 'Tour Packages - Jashn Planners',
  description: 'Browse our curated tour packages',
}

export default async function PackagesPage() {
  const packages = await getPackages()

  return (
    <>
      <section className="relative h-[40vh] flex items-center justify-center bg-gradient-to-br from-luxury/30 to-secondary/20">
        <div className="container-custom text-center">
          <Heading level={1} className="mb-4">Tour Packages</Heading>
          <p className="text-xl text-text-light">Curated experiences for every traveler</p>
        </div>
      </section>

      <Section>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {packages.map((pkg) => (
            <Link key={pkg._id.toString()} href={`/packages/${pkg.slug}`}>
              <Card variant="premium" className="overflow-hidden h-full">
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
                    <p className="text-primary font-bold text-xl">₹{pkg.price.toLocaleString()}</p>
                  )}
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
