'use server'

import { connectDB } from '@/lib/db/mongodb'
import { Event } from '@/lib/db/models'
import { revalidatePath } from 'next/cache'

export async function createEvent(formData: FormData) {
  await connectDB()
  
  const data = {
    title: formData.get('title'),
    slug: formData.get('slug'),
    description: formData.get('description'),
    shortDescription: formData.get('shortDescription'),
    images: formData.get('images') ? (formData.get('images') as string).split(',').map(s => s.trim()) : [],
    tags: formData.get('tags') ? (formData.get('tags') as string).split(',').map(s => s.trim()) : [],
    pricingEnabled: formData.get('pricingEnabled') === 'true',
    basePrice: formData.get('basePrice') ? Number(formData.get('basePrice')) : undefined,
  }

  await Event.create(data)
  revalidatePath('/events')
  revalidatePath('/admin/events')
  return { success: true }
}

export async function updateEvent(id: string, formData: FormData) {
  await connectDB()
  
  const data = {
    title: formData.get('title'),
    slug: formData.get('slug'),
    description: formData.get('description'),
    shortDescription: formData.get('shortDescription'),
    images: formData.get('images') ? (formData.get('images') as string).split(',').map(s => s.trim()) : [],
    tags: formData.get('tags') ? (formData.get('tags') as string).split(',').map(s => s.trim()) : [],
    pricingEnabled: formData.get('pricingEnabled') === 'true',
    basePrice: formData.get('basePrice') ? Number(formData.get('basePrice')) : undefined,
  }

  await Event.findByIdAndUpdate(id, data)
  revalidatePath('/events')
  revalidatePath(`/events/${data.slug}`)
  revalidatePath('/admin/events')
  return { success: true }
}

export async function deleteEvent(id: string) {
  await connectDB()
  await Event.findByIdAndDelete(id)
  revalidatePath('/events')
  revalidatePath('/admin/events')
  return { success: true }
}
