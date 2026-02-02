import { Section } from '@/components/ui/Section'
import { Heading } from '@/components/ui/Heading'
import { Card } from '@/components/ui/Card'

export const metadata = {
  title: 'About Us - Jashn Planners',
  description: 'Learn about our premium event planning and luxury travel services',
}

export default function AboutPage() {
  return (
    <>
      <section className="relative h-[40vh] flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
        <div className="container-custom text-center">
          <Heading level={1} className="mb-4">About Jashn Planners</Heading>
          <p className="text-xl text-text-light">Creating unforgettable moments since 2020</p>
        </div>
      </section>

      <Section>
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 mb-8">
            <Heading level={2} className="mb-6">Our Story</Heading>
            <div className="prose prose-lg text-text-light space-y-4">
              <p>
                Jashn Planners was founded with a simple vision: to transform ordinary moments into extraordinary memories. 
                With years of experience in event planning and luxury travel, we bring creativity, precision, and passion to every project.
              </p>
              <p>
                From intimate gatherings to grand celebrations, from exotic destinations to hidden gems, we curate experiences 
                that reflect your unique style and exceed your expectations.
              </p>
            </div>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 text-center">
              <div className="text-4xl mb-4">🎉</div>
              <h3 className="font-serif text-xl font-semibold mb-2">500+</h3>
              <p className="text-text-light">Events Planned</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-4xl mb-4">✈️</div>
              <h3 className="font-serif text-xl font-semibold mb-2">50+</h3>
              <p className="text-text-light">Destinations</p>
            </Card>
            <Card className="p-6 text-center">
              <div className="text-4xl mb-4">⭐</div>
              <h3 className="font-serif text-xl font-semibold mb-2">1000+</h3>
              <p className="text-text-light">Happy Clients</p>
            </Card>
          </div>

          <Card className="p-8">
            <Heading level={2} className="mb-6">Why Choose Us</Heading>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="text-2xl">✓</div>
                <div>
                  <h4 className="font-semibold mb-1">Personalized Service</h4>
                  <p className="text-text-light">Every event and trip is tailored to your unique preferences and requirements.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">✓</div>
                <div>
                  <h4 className="font-semibold mb-1">Expert Team</h4>
                  <p className="text-text-light">Our experienced professionals handle every detail with care and precision.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">✓</div>
                <div>
                  <h4 className="font-semibold mb-1">Premium Quality</h4>
                  <p className="text-text-light">We partner with the best vendors and destinations to ensure excellence.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="text-2xl">✓</div>
                <div>
                  <h4 className="font-semibold mb-1">Stress-Free Experience</h4>
                  <p className="text-text-light">Relax and enjoy while we manage all the logistics and coordination.</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Section>
    </>
  )
}
