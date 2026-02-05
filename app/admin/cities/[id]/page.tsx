export const dynamic = 'force-dynamic'

import { connectDB } from '@/lib/db/mongodb'
import { City } from '@/lib/db/models'
import { notFound } from 'next/navigation'
import CityEditForm from './CityEditForm'

async function getCity(id: string) {
  await connectDB()
  const city = await City.findById(id).lean()
  return city ? JSON.parse(JSON.stringify(city)) : null
}

export default async function EditCityPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const city = await getCity(id)
  if (!city) notFound()

  return (
    <div>
      <h1 className="text-4xl font-serif mb-8">Edit City</h1>
      <CityEditForm city={city} />
    </div>
  )
}
