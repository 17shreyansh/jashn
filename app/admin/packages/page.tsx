import Link from 'next/link'
import { getPackages } from '@/lib/services/packages'
import { Card } from '@/components/ui/Card'
import { Heading } from '@/components/ui/Heading'
import { Button } from '@/components/ui/Button'

export default async function AdminPackagesPage() {
  const packages = await getPackages()

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <Heading level={1}>Packages</Heading>
        <Link href="/admin/packages/new">
          <Button>+ Add Package</Button>
        </Link>
      </div>

      <Card className="overflow-hidden">
        <table className="w-full">
          <thead className="bg-accent2/50">
            <tr>
              <th className="text-left p-4 font-semibold">Title</th>
              <th className="text-left p-4 font-semibold">Duration</th>
              <th className="text-left p-4 font-semibold">Price</th>
              <th className="text-left p-4 font-semibold">Featured</th>
              <th className="text-left p-4 font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {packages.map((pkg) => (
              <tr key={pkg._id.toString()} className="border-t border-luxury/20">
                <td className="p-4 font-medium">{pkg.title}</td>
                <td className="p-4 text-text-light">{pkg.duration}</td>
                <td className="p-4">{pkg.pricingEnabled && pkg.price ? `₹${pkg.price.toLocaleString()}` : '-'}</td>
                <td className="p-4">{pkg.featured ? '⭐' : '-'}</td>
                <td className="p-4">
                  <Link href={`/admin/packages/${pkg._id}`}>
                    <Button size="sm" variant="outline">Edit</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {packages.length === 0 && (
          <div className="p-12 text-center text-text-light">
            No packages yet. Create your first package!
          </div>
        )}
      </Card>
    </div>
  )
}
