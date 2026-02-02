'use server'

import { connectDB } from '@/lib/db/mongodb'
import { City } from '@/lib/db/models'
import { revalidatePath } from 'next/cache'

export async function createCity(formData: FormData) {
  await connectDB()
  
  const data = {
    name: formData.get('name'),
    slug: formData.get('slug'),
    description: formData.get('description'),
    bannerImage: formData.get('bannerImage'),
    gallery: formData.get('gallery') ? (formData.get('gallery') as string).split(',').map(s => s.trim()) : [],
  }

  await City.create(data)
  revalidatePath('/cities')
  revalidatePath('/tours')
  revalidatePath('/admin/cities')
  return { success: true }
}

export async function updateCity(id: string, formData: FormData) {
  await connectDB()
  
  const data = {
    name: formData.get('name'),
    slug: formData.get('slug'),
    description: formData.get('description'),
    bannerImage: formData.get('bannerImage'),
    gallery: formData.get('gallery') ? (formData.get('gallery') as string).split(',').map(s => s.trim()) : [],
  }

  await City.findByIdAndUpdate(id, data)
  revalidatePath('/cities')
  revalidatePath(`/cities/${data.slug}`)
  revalidatePath('/tours')
  revalidatePath('/admin/cities')
  return { success: true }
}

export async function deleteCity(id: string) {
  await connectDB()
  await City.findByIdAndDelete(id)
  revalidatePath('/cities')
  revalidatePath('/tours')
  revalidatePath('/admin/cities')
  return { success: true }
}
