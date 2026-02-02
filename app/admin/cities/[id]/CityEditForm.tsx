'use client'

import { updateCity, deleteCity } from '@/lib/actions/cities'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'

export default function CityEditForm({ city }: { city: any }) {
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    await updateCity(city._id, formData)
    router.push('/admin/cities')
  }

  async function handleDelete() {
    if (confirm('Delete this city?')) {
      await deleteCity(city._id)
      router.push('/admin/cities')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-md max-w-3xl">
      <div className="space-y-6">
        <div>
          <label className="block font-medium mb-2">Name</label>
          <input
            type="text"
            name="name"
            required
            defaultValue={city.name}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Slug</label>
          <input
            type="text"
            name="slug"
            required
            defaultValue={city.slug}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Description</label>
          <textarea
            name="description"
            rows={5}
            defaultValue={city.description}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Banner Image URL</label>
          <input
            type="text"
            name="bannerImage"
            defaultValue={city.bannerImage}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Gallery Images (comma-separated URLs)</label>
          <input
            type="text"
            name="gallery"
            defaultValue={city.gallery?.join(', ')}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit">Update City</Button>
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
