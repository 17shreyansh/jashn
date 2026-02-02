import { connectDB } from '@/lib/db/mongodb'
import { getCity } from '@/lib/db/models'
import { CityInput } from '@/lib/validation/schemas'
import { revalidatePath } from 'next/cache'

export async function getCities(featured?: boolean) {
  await connectDB()
  const City = getCity()
  const filter = featured ? { featured: true } : {}
  return await City.find(filter).sort({ name: 1 }).lean()
}

export async function getCityBySlug(slug: string) {
  await connectDB()
  const City = getCity()
  return await City.findOne({ slug }).lean()
}

export async function createCity(data: CityInput) {
  await connectDB()
  const City = getCity()
  const city = await City.create(data)
  revalidatePath('/cities')
  revalidatePath('/admin/cities')
  return city
}

export async function updateCity(id: string, data: Partial<CityInput>) {
  await connectDB()
  const City = getCity()
  const city = await City.findByIdAndUpdate(id, data, { new: true })
  if (city) {
    revalidatePath('/cities')
    revalidatePath(`/cities/${city.slug}`)
    revalidatePath('/admin/cities')
  }
  return city
}

export async function deleteCity(id: string) {
  await connectDB()
  const City = getCity()
  const city = await City.findByIdAndDelete(id)
  if (city) {
    revalidatePath('/cities')
    revalidatePath('/admin/cities')
  }
  return city
}
