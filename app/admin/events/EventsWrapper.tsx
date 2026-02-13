export const dynamic = 'force-dynamic'

import { getEvents } from '@/lib/services/events'
import EventsClient from './EventsClient'

export default async function AdminEventsPage() {
  const events = await getEvents()
  return <EventsClient events={JSON.parse(JSON.stringify(events))} />
}
