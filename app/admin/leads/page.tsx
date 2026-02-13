export const dynamic = 'force-dynamic'

import { getLeads } from '@/lib/services/leads'
import { Box, Typography, Chip, Avatar, Tabs, Tab } from '@mui/material'
import Card from '@/components/ui-new/Card'
import DataTable from '@/components/admin/DataTable'
import { Email, Phone, Message, CalendarToday } from '@mui/icons-material'
import { themeConfig } from '@/lib/config/theme'
import LeadsClient from './LeadsClient'

export default async function AdminLeadsPage() {
  const leads = await getLeads()
  return <LeadsClient leads={JSON.parse(JSON.stringify(leads))} />
}
