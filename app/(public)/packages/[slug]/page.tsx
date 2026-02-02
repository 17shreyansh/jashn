import { connectDB } from '@/lib/db/mongodb'
import { Package } from '@/lib/db/models'
import Image from 'next/image'
import { Button } from '@/components/ui/Button'
import { Section } from '@/components/ui/Section'
import { notFound } from 'next/navigation'

export const revalidate = 60

async function getPackage(slug: string) {
  await connectDB()
  const pkg = await Package.findOne({ slug }).populate('cityId').lean()
  return pkg ? JSON.parse(JSON.stringify(pkg)) : null
}

export default async function PackageDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const pkg = await getPackage(slug)
  
  if (!pkg) notFound()

  return (
    <>
      <Section className="bg-[var(--color-accent2)]" marble>
        <div className="max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-serif mb-4">{pkg.title}</h1>
          <p className="text-xl text-[var(--color-primary)] mb-8">{pkg.duration}</p>
          
          {pkg.images?.length > 0 && (
            <div className="grid md:grid-cols-2 gap-4 mb-8">
              {pkg.images.slice(0, 4).map((img: string, i: number) => (
                <div key={i} className="relative h-80 rounded-2xl overflow-hidden">
                  <Image src={img} alt={pkg.title} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}

          <p className="text-xl opacity-80 mb-12">{pkg.description}</p>

          {pkg.itinerary?.length > 0 && (
            <div className="mb-12">
              <h2 className="text-4xl font-serif mb-8">Itinerary</h2>
              <div className="space-y-6">
                {pkg.itinerary.map((day: any, i: number) => (
                  <div key={i} className="bg-white rounded-2xl p-6 shadow-md border border-[var(--color-luxury)]/20">
                    <h3 className="text-2xl font-serif text-[var(--color-primary)] mb-2">Day {day.day}: {day.title}</h3>
                    <p className="opacity-80">{day.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {pkg.included?.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-2xl font-serif mb-4 text-[var(--color-primary)]">Included</h3>
                <ul className="space-y-2">
                  {pkg.included.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-[var(--color-primary)]">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {pkg.excluded?.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-2xl font-serif mb-4 opacity-60">Excluded</h3>
                <ul className="space-y-2">
                  {pkg.excluded.map((item: string, i: number) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="opacity-40">✗</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {pkg.pricingEnabled && pkg.price ? (
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-[var(--color-luxury)]/20 text-center">
              <div className="text-5xl font-bold text-[var(--color-primary)] mb-6">₹{pkg.price.toLocaleString()}</div>
              <Button href="/contact" className="w-full text-center">Book This Package</Button>
            </div>
          ) : (
            <div className="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)] text-white rounded-2xl p-8 text-center">
              <h3 className="text-2xl font-serif mb-4">Custom Quote</h3>
              <p className="mb-6">Contact us for personalized pricing</p>
              <Button href="/contact" variant="outline" className="border-white text-white hover:bg-white hover:text-[var(--color-primary)]">
                Get Quote
              </Button>
            </div>
          )}
        </div>
      </Section>
    </>
  )
}
