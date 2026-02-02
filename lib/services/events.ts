import { connectDB } from '@/lib/db/mongodb'
import { getEvent } from '@/lib/db/models'
import { EventInput } from '@/lib/validation/schemas'
import { revalidatePath } from 'next/cache'

export async function getEvents(featured?: boolean) {
  await connectDB()
  const Event = getEvent()
  const filter = featured ? { featured: true } : {}
  return await Event.find(filter).sort({ createdAt: -1 }).lean()
}

export async function getEventBySlug(slug: string) {
  await connectDB()
  const Event = getEvent()
  return await Event.findOne({ slug }).lean()
}

export async function createEvent(data: EventInput) {
  await connectDB()
  const Event = getEvent()
  const event = await Event.create(data)
  revalidatePath('/events')
  revalidatePath('/admin/events')
  return event
}

export async function updateEvent(id: string, data: Partial<EventInput>) {
  await connectDB()
  const Event = getEvent()
  const event = await Event.findByIdAndUpdate(id, data, { new: true })
  if (event) {
    revalidatePath('/events')
    revalidatePath(`/events/${event.slug}`)
    revalidatePath('/admin/events')
  }
  return event
}

export async function deleteEvent(id: string) {
  await connectDB()
  const Event = getEvent()
  const event = await Event.findByIdAndDelete(id)
  if (event) {
    revalidatePath('/events')
    revalidatePath('/admin/events')
  }
  return event
}
