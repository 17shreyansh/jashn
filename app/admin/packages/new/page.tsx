'use client'

import { createPackage } from '@/lib/actions/packages'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import { useState, useEffect } from 'react'

export default function NewPackagePage() {
  const router = useRouter()
  const [cities, setCities] = useState([])

  useEffect(() => {
    fetch('/api/cities').then(r => r.json()).then(d => setCities(d.data || []))
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    await createPackage(formData)
    router.push('/admin/packages')
  }

  return (
    <div>
      <h1 className="text-4xl font-serif mb-8">Add New Package</h1>

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
            <label className="block font-medium mb-2">City</label>
            <select
              name="cityId"
              required
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
              placeholder="5 Days / 4 Nights"
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
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Included (comma-separated)</label>
            <input
              type="text"
              name="included"
              placeholder="Accommodation, Breakfast, Transfers"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          <div>
            <label className="block font-medium mb-2">Excluded (comma-separated)</label>
            <input
              type="text"
              name="excluded"
              placeholder="Flights, Lunch, Personal expenses"
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
            <label className="block font-medium mb-2">Price</label>
            <input
              type="number"
              name="price"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[var(--color-primary)]"
            />
          </div>

          <div className="flex gap-4">
            <Button type="submit">Create Package</Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>
              Cancel
            </Button>
          </div>
        </div>
      </form>
    </div>
  )
}
