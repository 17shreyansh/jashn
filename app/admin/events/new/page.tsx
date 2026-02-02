'use client'

import { createEvent } from '@/lib/actions/events'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'

export default function NewEventPage() {
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    await createEvent(formData)
    router.push('/admin/events')
  }

  return (
    <div>
      <h1 className="text-4xl font-serif mb-8">Add New Event</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-md max-w-3xl">
        <div className="space-y-6">
          <div>
            <label className="block font-medium mb-2">Title</label>
            <input
              type="text"
              name="title"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Slug</label>
            <input
              type="text"
              name="slug"
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Short Description</label>
            <input
              type="text"
              name="shortDescription"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Description</label>
            <textarea
              name="description"
              rows={5}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Images (comma-separated URLs)</label>
            <input
              type="text"
              name="images"
              placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Tags (comma-separated)</label>
            <input
              type="text"
              name="tags"
              placeholder="Wedding, Luxury, Traditional"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          <div>
            <label className="flex items-center gap-2">
              <input type="checkbox" name="pricingEnabled" value="true" />
              <span>Enable Pricing</span>
            </label>
          </div>

          <div>
            <label className="block font-medium mb-2">Base Price</label>
            <input
              type="number"
              name="basePrice"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit">Create Event</Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
