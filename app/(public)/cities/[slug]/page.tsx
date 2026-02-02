import { connectDB } from '@/lib/db/mongodb'
import { City, Package } from '@/lib/db/models'
import Image from 'next/image'
import Link from 'next/link'
import { Card } from '@/components/ui/Card'
import { Section } from '@/components/ui/Section'
import { notFound } from 'next/navigation'

export const revalidate = 60

async function getCityWithPackages(slug: string) {
  await connectDB()
  const city = await City.findOne({ slug }).lean()
  if (!city) return null
  
  const packages = await Package.find({ cityId: city._id }).lean()
  return {
    city: JSON.parse(JSON.stringify(city)),
    packages: JSON.parse(JSON.stringify(packages))
  }
}

export default async function CityDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const data = await getCityWithPackages(slug)
  
  if (!data) notFound()
  
  const { city, packages } = data

  return (
    <>
      {city.bannerImage && (
        <div className="relative h-96">
          <Image src={city.bannerImage} alt={city.name} fill className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <div className="container mx-auto max-w-7xl">
              <h1 className="text-5xl md:text-6xl font-serif">{city.name}</h1>
            </div>
          </div>
        </div>
      )}

      <Section>
        <div className="max-w-4xl mx-auto">
          <p className="text-xl opacity-80 mb-8">{city.description}</p>
          
          {city.gallery?.length > 0 && (
            <div className="grid md:grid-cols-3 gap-4 mb-12">
              {city.gallery.map((img: string, i: number) => (
                <div key={i} className="relative h-64 rounded-2xl overflow-hidden">
                  <Image src={img} alt={city.name} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </div>
      </Section>

      {packages.length > 0 && (
        <Section className="bg-[var(--color-accent2)]" marble>
          <h2 className="text-4xl font-serif text-center mb-12">Available Packages</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg: any) => (
              <Link key={pkg._id} href={`/packages/${pkg.slug}`}>
                <Card hover>
                  {pkg.images?.[0] && (
                    <div className="relative h-64">
                      <Image src={pkg.images[0]} alt={pkg.title} fill className="object-cover" />
                    </div>
                  )}
                  <div className="p-6">
                    <h3 className="text-2xl font-serif mb-2">{pkg.title}</h3>
                    <p className="opacity-70 mb-4">{pkg.duration}</p>
                    {pkg.pricingEnabled && pkg.price && (
                      <div className="text-2xl font-bold text-[var(--color-primary)]">₹{pkg.price.toLocaleString()}</div>
                    )}
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </Section>
      )}
    </>
  )
}
