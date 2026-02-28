'use client'

import { useState } from 'react'
import { Box, Typography, Chip, Avatar, Tabs, Tab, Dialog, DialogTitle, DialogContent, IconButton, Divider, Snackbar, Alert, CircularProgress } from '@mui/material'
import Card from '@/components/ui-new/Card'
import DataTable from '@/components/admin/DataTable'
import { Email, CheckCircle, Phone, Message, CalendarToday, Close } from '@mui/icons-material'
import { themeConfig } from '@/lib/config/theme'
import { useRouter } from 'next/navigation'

export default function LeadsClient({ leads: initialLeads }: { leads: any[] }) {
  const router = useRouter()
  const [leads, setLeads] = useState(initialLeads)
  const [tab, setTab] = useState(0)
  const [selectedLead, setSelectedLead] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' })

  const filteredLeads = leads.filter(lead => {
    if (tab === 1) return lead.status === 'new'
    if (tab === 2) return lead.status === 'contacted'
    if (tab === 3) return lead.status === 'converted'
    return true
  })

  const columns = [
    {
      id: 'contact',
      label: 'Contact',
      render: (row: any) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, cursor: 'pointer' }} onClick={() => setSelectedLead(row)}>
          <Avatar sx={{ width: 48, height: 48, bgcolor: `${themeConfig.colors.primary}15`, color: themeConfig.colors.primary, fontWeight: 600 }}>
            {row.name[0].toUpperCase()}
          </Avatar>
          <Box>
            <Typography sx={{ fontWeight: 600, fontSize: '0.9375rem', color: themeConfig.colors.textDark, mb: 0.5 }}>{row.name}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Email sx={{ fontSize: 14, color: themeConfig.colors.textLight }} />
              <Typography sx={{ fontSize: '0.8125rem', color: themeConfig.colors.textLight }}>{row.email}</Typography>
            </Box>
          </Box>
        </Box>
      ),
    },
    {
      id: 'phone',
      label: 'Phone',
      render: (row: any) => (
        <Typography sx={{ fontSize: '0.875rem', color: themeConfig.colors.textDark }}>
          {row.phone || '-'}
        </Typography>
      ),
    },
    {
      id: 'message',
      label: 'Message',
      render: (row: any) => (
        <Typography sx={{ fontSize: '0.875rem', color: themeConfig.colors.textLight, maxWidth: 300, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', cursor: 'pointer' }} onClick={() => setSelectedLead(row)}>
          {row.message || '-'}
        </Typography>
      ),
    },
    {
      id: 'status',
      label: 'Status',
      render: (row: any) => {
        const statusColors: any = {
          new: { bg: '#fef3c7', color: '#92400e' },
          contacted: { bg: '#dbeafe', color: '#1e40af' },
          converted: { bg: '#d1fae5', color: '#065f46' },
        }
        const colors = statusColors[row.status] || statusColors.new
        return (
          <Chip
            label={row.status}
            size="small"
            sx={{ bgcolor: colors.bg, color: colors.color, fontWeight: 600, fontSize: '0.75rem', textTransform: 'capitalize', minWidth: 90 }}
          />
        )
      },
    },
    {
      id: 'date',
      label: 'Date',
      render: (row: any) => (
        <Typography sx={{ fontSize: '0.875rem', color: themeConfig.colors.textLight }}>
          {new Date(row.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </Typography>
      ),
    },
  ]

  const actions = [
    { label: 'View Details', value: 'view' },
    { label: 'Mark as Contacted', value: 'contacted' },
    { label: 'Mark as Converted', value: 'converted' },
    { label: 'Delete', value: 'delete' },
  ]

  const handleAction = async (action: string, row: any) => {
    if (action === 'view') {
      setSelectedLead(row)
      return
    }

    if (action === 'delete') {
      if (!confirm('Are you sure you want to delete this lead?')) return
      
      setLoading(true)
      try {
        const res = await fetch(`/api/leads?id=${row._id}`, { method: 'DELETE' })
        const data = await res.json()
        
        if (data.success) {
          setLeads(leads.filter(l => l._id !== row._id))
          setSnackbar({ open: true, message: 'Lead deleted successfully', severity: 'success' })
        } else {
          throw new Error(data.error)
        }
      } catch (error: any) {
        setSnackbar({ open: true, message: error.message || 'Failed to delete lead', severity: 'error' })
      } finally {
        setLoading(false)
      }
      return
    }

    if (action === 'contacted' || action === 'converted') {
      setLoading(true)
      try {
        const res = await fetch(`/api/leads?id=${row._id}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: action })
        })
        const data = await res.json()
        
        if (data.success) {
          setLeads(leads.map(l => l._id === row._id ? { ...l, status: action } : l))
          setSnackbar({ open: true, message: `Lead marked as ${action}`, severity: 'success' })
        } else {
          throw new Error(data.error)
        }
      } catch (error: any) {
        setSnackbar({ open: true, message: error.message || 'Failed to update lead', severity: 'error' })
      } finally {
        setLoading(false)
      }
    }
  }

  const newLeads = leads.filter(l => l.status === 'new').length
  const contactedLeads = leads.filter(l => l.status === 'contacted').length
  const convertedLeads = leads.filter(l => l.status === 'converted').length

  const statusColors: any = {
    new: { bg: '#fef3c7', color: '#92400e' },
    contacted: { bg: '#dbeafe', color: '#1e40af' },
    converted: { bg: '#d1fae5', color: '#065f46' },
  }

  return (
    <Box>
      <Box sx={{ mb: 5 }}>
        <Typography sx={{ fontSize: '2rem', fontWeight: 700, color: themeConfig.colors.textDark, mb: 1 }}>Leads Management</Typography>
        <Typography sx={{ color: themeConfig.colors.textLight, fontSize: '1rem' }}>Track and manage customer inquiries</Typography>
      </Box>

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, gap: 3, mb: 4 }}>
        {[
          { label: 'New Leads', value: newLeads, color: '#f59e0b', icon: Email },
          { label: 'Contacted', value: contactedLeads, color: '#3b82f6', icon: CheckCircle },
          { label: 'Converted', value: convertedLeads, color: '#10b981', icon: CheckCircle },
        ].map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} sx={{ p: 3, bgcolor: 'white', border: '1px solid #e5e7eb', borderRadius: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
                <Box sx={{ width: 48, height: 48, borderRadius: 2, bgcolor: `${stat.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Icon sx={{ color: stat.color, fontSize: 24 }} />
                </Box>
              </Box>
              <Typography sx={{ fontSize: '2rem', fontWeight: 700, color: themeConfig.colors.textDark, mb: 0.5 }}>{stat.value}</Typography>
              <Typography sx={{ fontSize: '0.875rem', color: themeConfig.colors.textLight }}>{stat.label}</Typography>
            </Card>
          )
        })}
      </Box>

      {leads.length === 0 ? (
        <Card sx={{ p: 10, textAlign: 'center', bgcolor: 'white', border: '1px solid #e5e7eb', borderRadius: 3 }}>
          <Box sx={{ width: 80, height: 80, borderRadius: '50%', bgcolor: `${themeConfig.colors.primary}10`, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 3 }}>
            <Email sx={{ fontSize: 40, color: themeConfig.colors.primary }} />
          </Box>
          <Typography sx={{ fontSize: '1.25rem', fontWeight: 600, color: themeConfig.colors.textDark, mb: 1 }}>No leads yet</Typography>
          <Typography sx={{ color: themeConfig.colors.textLight, maxWidth: 400, mx: 'auto' }}>Customer inquiries will appear here once they submit the contact form</Typography>
        </Card>
      ) : (
        <Card sx={{ bgcolor: 'white', border: '1px solid #e5e7eb', borderRadius: 3, overflow: 'hidden', p: 3 }}>
          <Tabs value={tab} onChange={(_, v) => setTab(v)} sx={{ mb: 3, '& .MuiTab-root': { textTransform: 'none', fontWeight: 600, fontSize: '0.9375rem' } }}>
            <Tab label={`All (${leads.length})`} />
            <Tab label={`New (${newLeads})`} />
            <Tab label={`Contacted (${contactedLeads})`} />
            <Tab label={`Converted (${convertedLeads})`} />
          </Tabs>
          <DataTable columns={columns} data={filteredLeads} actions={actions} onRowAction={handleAction} />
        </Card>
      )}

      <Dialog open={!!selectedLead} onClose={() => setSelectedLead(null)} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 3 } }}>
        {selectedLead && (
          <>
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 2 }}>
              <Typography sx={{ fontSize: '1.25rem', fontWeight: 600 }}>Lead Details</Typography>
              <IconButton onClick={() => setSelectedLead(null)} size="small">
                <Close />
              </IconButton>
            </DialogTitle>
            <Divider />
            <DialogContent sx={{ pt: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Avatar sx={{ width: 64, height: 64, bgcolor: `${themeConfig.colors.primary}15`, color: themeConfig.colors.primary, fontWeight: 600, fontSize: '1.5rem' }}>
                  {selectedLead.name[0].toUpperCase()}
                </Avatar>
                <Box>
                  <Typography sx={{ fontSize: '1.125rem', fontWeight: 600, mb: 0.5 }}>{selectedLead.name}</Typography>
                  <Chip label={selectedLead.status} size="small" sx={{ bgcolor: statusColors[selectedLead.status]?.bg, color: statusColors[selectedLead.status]?.color, fontWeight: 600, textTransform: 'capitalize' }} />
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Email sx={{ color: themeConfig.colors.textLight, mt: 0.5 }} />
                  <Box>
                    <Typography sx={{ fontSize: '0.75rem', color: themeConfig.colors.textLight, mb: 0.5, textTransform: 'uppercase', fontWeight: 600 }}>Email</Typography>
                    <Typography sx={{ fontSize: '0.9375rem', color: themeConfig.colors.textDark }}>{selectedLead.email}</Typography>
                  </Box>
                </Box>

                {selectedLead.phone && (
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Phone sx={{ color: themeConfig.colors.textLight, mt: 0.5 }} />
                    <Box>
                      <Typography sx={{ fontSize: '0.75rem', color: themeConfig.colors.textLight, mb: 0.5, textTransform: 'uppercase', fontWeight: 600 }}>Phone</Typography>
                      <Typography sx={{ fontSize: '0.9375rem', color: themeConfig.colors.textDark }}>{selectedLead.phone}</Typography>
                    </Box>
                  </Box>
                )}

                {selectedLead.message && (
                  <Box sx={{ display: 'flex', gap: 2 }}>
                    <Message sx={{ color: themeConfig.colors.textLight, mt: 0.5 }} />
                    <Box>
                      <Typography sx={{ fontSize: '0.75rem', color: themeConfig.colors.textLight, mb: 0.5, textTransform: 'uppercase', fontWeight: 600 }}>Message</Typography>
                      <Typography sx={{ fontSize: '0.9375rem', color: themeConfig.colors.textDark, lineHeight: 1.6 }}>{selectedLead.message}</Typography>
                    </Box>
                  </Box>
                )}

                <Box sx={{ display: 'flex', gap: 2 }}>
                  <CalendarToday sx={{ color: themeConfig.colors.textLight, mt: 0.5 }} />
                  <Box>
                    <Typography sx={{ fontSize: '0.75rem', color: themeConfig.colors.textLight, mb: 0.5, textTransform: 'uppercase', fontWeight: 600 }}>Submitted</Typography>
                    <Typography sx={{ fontSize: '0.9375rem', color: themeConfig.colors.textDark }}>
                      {new Date(selectedLead.createdAt).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </DialogContent>
          </>
        )}
      </Dialog>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      {loading && (
        <Box sx={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, bgcolor: 'rgba(0,0,0,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <CircularProgress sx={{ color: themeConfig.colors.primary }} />
        </Box>
      )}
    </Box>
  )
}
