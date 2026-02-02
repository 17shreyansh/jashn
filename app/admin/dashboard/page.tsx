import { getEvents } from '@/lib/services/events'
import { getCities } from '@/lib/services/cities'
import { getPackages } from '@/lib/services/packages'
import { getLeads } from '@/lib/services/leads'
import { getGalleryStats } from '@/lib/services/gallery'
import { Card } from '@/components/ui/Card'
import { Heading } from '@/components/ui/Heading'

export default async function DashboardPage() {
  const [events, cities, packages, leads, galleryStats] = await Promise.all([
    getEvents(),
    getCities(),
    getPackages(),
    getLeads(),
    getGalleryStats(),
  ])

  const stats = [
    { label: 'Total Events', value: events.length, icon: '🎉', color: 'bg-primary' },
    { label: 'Cities', value: cities.length, icon: '🏙️', color: 'bg-secondary' },
    { label: 'Packages', value: packages.length, icon: '✈️', color: 'bg-luxury' },
    { label: 'Gallery Items', value: galleryStats.total, icon: '🖼️', color: 'bg-accent1' },
    { label: 'New Leads', value: leads.filter(l => l.status === 'new').length, icon: '📧', color: 'bg-primary/70' },
  ]

  return (
    <div>
      <Heading level={1} className="mb-8">Dashboard</Heading>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
        {stats.map((stat) => (
          <Card key={stat.label} className="p-6">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl ${stat.color} flex items-center justify-center text-2xl`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-text-light text-sm">{stat.label}</p>
                <p className="text-3xl font-bold text-text-dark">{stat.value}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="font-serif text-xl font-semibold mb-4">Recent Leads</h3>
          <div className="space-y-3">
            {leads.slice(0, 5).map((lead) => (
              <div key={lead._id.toString()} className="flex items-center justify-between py-2 border-b border-luxury/20 last:border-0">
                <div>
                  <p className="font-medium text-text-dark">{lead.name}</p>
                  <p className="text-sm text-text-light">{lead.email}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  lead.status === 'new' ? 'bg-primary/10 text-primary' : 'bg-gray-100 text-gray-600'
                }`}>
                  {lead.status}
                </span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-serif text-xl font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <a href="/admin/events/new" className="block p-4 rounded-xl bg-accent2 hover:bg-accent2/70 transition-colors">
              <p className="font-medium text-text-dark">➕ Add New Event</p>
            </a>
            <a href="/admin/cities/new" className="block p-4 rounded-xl bg-accent2 hover:bg-accent2/70 transition-colors">
              <p className="font-medium text-text-dark">➕ Add New City</p>
            </a>
            <a href="/admin/packages/new" className="block p-4 rounded-xl bg-accent2 hover:bg-accent2/70 transition-colors">
              <p className="font-medium text-text-dark">➕ Add New Package</p>
            </a>
            <a href="/admin/gallery" className="block p-4 rounded-xl bg-accent2 hover:bg-accent2/70 transition-colors">
              <p className="font-medium text-text-dark">🖼️ Manage Gallery</p>
            </a>
          </div>
        </Card>
      </div>
    </div>
  )
}
