'use client'

import { createCity } from '@/lib/actions/cities'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'

export default function NewCityPage() {
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    await createCity(formData)
    router.push('/admin/cities')
  }

  return (
    <div>
      <h1 className="text-4xl font-serif mb-8">Add New City</h1>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-8 shadow-md max-w-3xl">
        <div className="space-y-6">
          <div>
            <label className="block font-medium mb-2">Name</label>
            <input
              type="text"
              name="name"
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
            <label className="block font-medium mb-2">Description</label>
            <textarea
              name="description"
              rows={5}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Banner Image URL</label>
            <input
              type="text"
              name="bannerImage"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Gallery Images (comma-separated URLs)</label>
            <input
              type="text"
              name="gallery"
              placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit">Create City</Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
