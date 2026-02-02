'use server'

import { connectDB } from '@/lib/db/mongodb'
import { Package } from '@/lib/db/models'
import { revalidatePath } from 'next/cache'

export async function createPackage(formData: FormData) {
  await connectDB()
  
  const data = {
    title: formData.get('title'),
    slug: formData.get('slug'),
    cityId: formData.get('cityId'),
    description: formData.get('description'),
    duration: formData.get('duration'),
    images: formData.get('images') ? (formData.get('images') as string).split(',').map(s => s.trim()) : [],
    pricingEnabled: formData.get('pricingEnabled') === 'true',
    price: formData.get('price') ? Number(formData.get('price')) : undefined,
    included: formData.get('included') ? (formData.get('included') as string).split(',').map(s => s.trim()) : [],
    excluded: formData.get('excluded') ? (formData.get('excluded') as string).split(',').map(s => s.trim()) : [],
  }

  await Package.create(data)
  revalidatePath('/packages')
  revalidatePath('/tours')
  revalidatePath('/admin/packages')
  return { success: true }
}

export async function updatePackage(id: string, formData: FormData) {
  await connectDB()
  
  const data = {
    title: formData.get('title'),
    slug: formData.get('slug'),
    cityId: formData.get('cityId'),
    description: formData.get('description'),
    duration: formData.get('duration'),
    images: formData.get('images') ? (formData.get('images') as string).split(',').map(s => s.trim()) : [],
    pricingEnabled: formData.get('pricingEnabled') === 'true',
    price: formData.get('price') ? Number(formData.get('price')) : undefined,
    included: formData.get('included') ? (formData.get('included') as string).split(',').map(s => s.trim()) : [],
    excluded: formData.get('excluded') ? (formData.get('excluded') as string).split(',').map(s => s.trim()) : [],
  }

  await Package.findByIdAndUpdate(id, data)
  revalidatePath('/packages')
  revalidatePath(`/packages/${data.slug}`)
  revalidatePath('/tours')
  revalidatePath('/admin/packages')
  return { success: true }
}

export async function deletePackage(id: string) {
  await connectDB()
  await Package.findByIdAndDelete(id)
  revalidatePath('/packages')
  revalidatePath('/tours')
  revalidatePath('/admin/packages')
  return { success: true }
}
