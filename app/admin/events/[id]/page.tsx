export const dynamic = 'force-dynamic'

import { connectDB } from '@/lib/db/mongodb'
import { Event } from '@/lib/db/models'
import { notFound } from 'next/navigation'
import EventEditForm from './EventEditForm'

async function getEvent(id: string) {
  await connectDB()
  const event = await Event.findById(id).lean()
  return event ? JSON.parse(JSON.stringify(event)) : null
}

export default async function EditEventPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const event = await getEvent(id)
  if (!event) notFound()

  return (
    <div>
      <h1 className="text-4xl font-serif mb-8">Edit Event</h1>
      <EventEditForm event={event} />
    </div>
  )
}
