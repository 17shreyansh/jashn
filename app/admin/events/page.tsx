import Link from 'next/link'
import { getEvents } from '@/lib/services/events'
import { Card } from '@/components/ui/Card'
import { Heading } from '@/components/ui/Heading'
import { Button } from '@/components/ui/Button'

export default async function AdminEventsPage() {
  const events = await getEvents()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <Heading level={1}>Events</Heading>
        <Link href="/admin/events/new">
          <Button>+ Add Event</Button>
        </Link>
      </div>

      <Card className="overflow-hidden">
        <table className="w-full">
          <thead className="bg-accent2/50">
            <tr>
              <th className="text-left p-4 font-semibold">Title</th>
              <th className="text-left p-4 font-semibold">Slug</th>
              <th className="text-left p-4 font-semibold">Tags</th>
              <th className="text-left p-4 font-semibold">Featured</th>
              <th className="text-left p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event._id.toString()} className="border-t border-luxury/20">
                <td className="p-4 font-medium">{event.title}</td>
                <td className="p-4 text-text-light">{event.slug}</td>
                <td className="p-4 text-sm text-text-light">{event.tags.join(', ')}</td>
                <td className="p-4">{event.featured ? '⭐' : '-'}</td>
                <td className="p-4">
                  <Link href={`/admin/events/${event._id}`}>
                    <Button size="sm" variant="outline">Edit</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {events.length === 0 && (
          <div className="p-12 text-center text-text-light">
            No events yet. Create your first event!
          </div>
        )}
      </Card>
    </div>
  )
}
