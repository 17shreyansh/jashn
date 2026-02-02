import Link from 'next/link'
import { getCities } from '@/lib/services/cities'
import { Card } from '@/components/ui/Card'
import { Heading } from '@/components/ui/Heading'
import { Button } from '@/components/ui/Button'

export default async function AdminCitiesPage() {
  const cities = await getCities()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <Heading level={1}>Cities</Heading>
        <Link href="/admin/cities/new">
          <Button>+ Add City</Button>
        </Link>
      </div>

      <Card className="overflow-hidden">
        <table className="w-full">
          <thead className="bg-accent2/50">
            <tr>
              <th className="text-left p-4 font-semibold">Name</th>
              <th className="text-left p-4 font-semibold">Slug</th>
              <th className="text-left p-4 font-semibold">Featured</th>
              <th className="text-left p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {cities.map((city) => (
              <tr key={city._id.toString()} className="border-t border-luxury/20">
                <td className="p-4 font-medium">{city.name}</td>
                <td className="p-4 text-text-light">{city.slug}</td>
                <td className="p-4">{city.featured ? '⭐' : '-'}</td>
                <td className="p-4">
                  <Link href={`/admin/cities/${city._id}`}>
                    <Button size="sm" variant="outline">Edit</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {cities.length === 0 && (
          <div className="p-12 text-center text-text-light">
            No cities yet. Create your first city!
          </div>
        )}
      </Card>
    </div>
  )
}
