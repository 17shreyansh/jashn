'use client'

import { updatePackage, deletePackage } from '@/lib/actions/packages'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import { useState, useEffect } from 'react'

export default function PackageEditForm({ pkg }: { pkg: any }) {
  const router = useRouter()
  const [cities, setCities] = useState([])

  useEffect(() => {
    fetch('/api/cities').then(r => r.json()).then(d => setCities(d.data || []))
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    await updatePackage(pkg._id, formData)
    router.push('/admin/packages')
  }

  async function handleDelete() {
    if (confirm('Delete this package?')) {
      await deletePackage(pkg._id)
      router.push('/admin/packages')
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
            defaultValue={pkg.title}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Slug</label>
          <input
            type="text"
            name="slug"
            required
            defaultValue={pkg.slug}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">City</label>
          <select
            name="cityId"
            required
            defaultValue={pkg.cityId}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]"
          >
            <option value="">Select City</option>
            {cities.map((city: any) => (
              <option key={city._id} value={city._id}>{city.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-2">Duration</label>
          <input
            type="text"
            name="duration"
            defaultValue={pkg.duration}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Description</label>
          <textarea
            name="description"
            rows={5}
            defaultValue={pkg.description}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Images (comma-separated URLs)</label>
          <input
            type="text"
            name="images"
            defaultValue={pkg.images?.join(', ')}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Included (comma-separated)</label>
          <input
            type="text"
            name="included"
            defaultValue={pkg.included?.join(', ')}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>

        <div>
          <label className="block font-medium mb-2">Excluded (comma-separated)</label>
          <input
            type="text"
            name="excluded"
            defaultValue={pkg.excluded?.join(', ')}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="pricingEnabled"
              value="true"
              defaultChecked={pkg.pricingEnabled}
            />
            <span>Enable Pricing</span>
          </label>
        </div>

        <div>
          <label className="block font-medium mb-2">Price</label>
          <input
            type="number"
            name="price"
            defaultValue={pkg.price}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]"
          />
        </div>

        <div className="flex gap-4">
          <Button type="submit">Update Package</Button>
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
