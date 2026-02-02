'use client'

import { updateEvent, deleteEvent } from '@/lib/actions/events'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'

export default function EventEditForm({ event }: { event: any }) {
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    await updateEvent(event._id, formData)
    router.push('/admin/events')
  }

  async function handleDelete() {
    if (confirm('Delete this event?')) {
      await deleteEvent(event._id)
      router.push('/admin/events')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-md max-w-3xl">
      <div className="space-y-6">
        <div>
          <label className="block font-medium mb-2">Title</label>
          <input
            type="text"
            name="title"
            required
            defaultValue={event.title}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Slug</label>
          <input
            type="text"
            name="slug"
            required
            defaultValue={event.slug}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Short Description</label>
          <input
            type="text"
            name="shortDescription"
            defaultValue={event.shortDescription}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Description</label>
          <textarea
            name="description"
            rows={5}
            defaultValue={event.description}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Images (comma-separated URLs)</label>
          <input
            type="text"
            name="images"
            defaultValue={event.images?.join(', ')}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Tags (comma-separated)</label>
          <input
            type="text"
            name="tags"
            defaultValue={event.tags?.join(', ')}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="pricingEnabled"
              value="true"
              defaultChecked={event.pricingEnabled}
            />
            <span>Enable Pricing</span>
          </label>
        </div>

        <div>
          <label className="block font-medium mb-2">Base Price</label>
          <input
            type="number"
            name="basePrice"
            defaultValue={event.basePrice}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit">Update Event</Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <button
            type="button"
            onClick={handleDelete}
            className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </form>
  )
}
