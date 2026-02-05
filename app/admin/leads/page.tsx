export const dynamic = 'force-dynamic'

import { getLeads } from '@/lib/services/leads'
import { Box, Typography, Chip, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import Card from '@/components/ui-new/Card'

export default async function AdminLeadsPage() {
  const leads = await getLeads()

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 4, fontFamily: 'var(--font-playfair)', fontWeight: 700 }}>Leads</Typography>

      {leads.length === 0 ? (
        <Card><Box sx={{ p: 8, textAlign: 'center' }}><Typography variant="h6" color="text.secondary">No leads yet.</Typography></Box></Card>
      ) : (
        <Card>
          <TableContainer>
            <Table>
              <TableHead sx={{ bgcolor: 'rgba(255, 240, 203, 0.5)' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Phone</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Message</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                  <TableCell sx={{ fontWeight: 600 }}>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {leads.map((lead) => (
                  <TableRow key={lead._id.toString()} sx={{ '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' } }}>
                    <TableCell sx={{ fontWeight: 500 }}>{lead.name}</TableCell>
                    <TableCell>{lead.email}</TableCell>
                    <TableCell>{lead.phone || '-'}</TableCell>
                    <TableCell sx={{ maxWidth: 300 }}>
                      <Typography variant="body2" sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {lead.message || '-'}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={lead.status} size="small" color={lead.status === 'new' ? 'primary' : 'default'} />
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(lead.createdAt).toLocaleDateString()}
                      </Typography>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}
    </Box>
  )
}
