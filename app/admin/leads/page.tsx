import { getLeads } from '@/lib/services/leads'
import { Card } from '@/components/ui/Card'
import { Heading } from '@/components/ui/Heading'
import { Badge } from '@/components/ui/Badge'

export default async function AdminLeadsPage() {
  const leads = await getLeads()

  return (
    <div>
      <Heading level={1} className="mb-8">Leads</Heading>

      <Card className="overflow-hidden">
        <table className="w-full">
          <thead className="bg-accent2/50">
            <tr>
              <th className="text-left p-4 font-semibold">Name</th>
              <th className="text-left p-4 font-semibold">Email</th>
              <th className="text-left p-4 font-semibold">Phone</th>
              <th className="text-left p-4 font-semibold">Message</th>
              <th className="text-left p-4 font-semibold">Status</th>
              <th className="text-left p-4 font-semibold">Date</th>
            </tr>
          </thead>
          <tbody>
            {leads.map((lead) => (
              <tr key={lead._id.toString()} className="border-t border-luxury/20">
                <td className="p-4 font-medium">{lead.name}</td>
                <td className="p-4 text-text-light">{lead.email}</td>
                <td className="p-4 text-text-light">{lead.phone || '-'}</td>
                <td className="p-4 text-sm text-text-light max-w-xs truncate">{lead.message || '-'}</td>
                <td className="p-4">
                  <Badge variant={lead.status === 'new' ? 'primary' : 'secondary'}>
                    {lead.status}
                  </Badge>
                </td>
                <td className="p-4 text-sm text-text-light">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {leads.length === 0 && (
          <div className="p-12 text-center text-text-light">
            No leads yet.
          </div>
        )}
      </Card>
    </div>
  )
}
