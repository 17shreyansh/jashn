'use client'

import { useState } from 'react'
import { Box, Typography, TextField, Button, Alert, Container, Stack } from '@mui/material'
import Card from '@/components/ui-new/Card'
import SendIcon from '@mui/icons-material/Send'

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (data.success) {
        setSuccess(true)
        setFormData({ name: '', email: '', phone: '', message: '' })
      } else {
        setError(data.error || 'Something went wrong')
      }
    } catch (err) {
      setError('Failed to submit form')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box>
      <Box sx={{ minHeight: '40vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(135deg, rgba(167, 186, 66, 0.2), rgba(149, 204, 186, 0.2))', py: 8 }}>
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="h2" sx={{ mb: 2 }}>Get In Touch</Typography>
          <Typography variant="h5" color="text.secondary">Let's create something extraordinary together</Typography>
        </Box>
      </Box>

      <Box sx={{ py: { xs: 6, md: 10 } }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', lg: '1fr 1fr' }, gap: 6 }}>
            <Card>
              <Box sx={{ p: 4 }}>
                <Typography variant="h4" sx={{ mb: 4, fontFamily: 'var(--font-playfair)', fontWeight: 600 }}>Send Us a Message</Typography>
                <Box component="form" onSubmit={handleSubmit}>
                  <Stack spacing={3}>
                    <TextField label="Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required fullWidth />
                    <TextField type="email" label="Email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required fullWidth />
                    <TextField type="tel" label="Phone (Optional)" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} fullWidth />
                    <TextField label="Message" value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} multiline rows={5} fullWidth />
                    {success && <Alert severity="success">Thank you! We'll get back to you soon.</Alert>}
                    {error && <Alert severity="error">{error}</Alert>}
                    <Button type="submit" variant="contained" size="large" fullWidth disabled={loading} endIcon={<SendIcon />}>{loading ? 'Sending...' : 'Send Message'}</Button>
                  </Stack>
                </Box>
              </Box>
            </Card>

            <Stack spacing={3}>
              <Card>
                <Box sx={{ p: 4 }}>
                  <Typography variant="h5" sx={{ mb: 3, fontFamily: 'var(--font-playfair)', fontWeight: 600 }}>Contact Information</Typography>
                  <Stack spacing={3}>
                    <Box><Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>Email</Typography><Typography variant="body1" sx={{ fontWeight: 500 }}>info@jashnplanners.com</Typography></Box>
                    <Box><Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>Phone</Typography><Typography variant="body1" sx={{ fontWeight: 500 }}>+91 98765 43210</Typography></Box>
                    <Box><Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>Address</Typography><Typography variant="body1" sx={{ fontWeight: 500 }}>123 Event Street, Mumbai, India</Typography></Box>
                  </Stack>
                </Box>
              </Card>

              <Card>
                <Box sx={{ p: 4 }}>
                  <Typography variant="h5" sx={{ mb: 3, fontFamily: 'var(--font-playfair)', fontWeight: 600 }}>Business Hours</Typography>
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Typography color="text.secondary">Monday - Friday</Typography><Typography sx={{ fontWeight: 500 }}>9:00 AM - 6:00 PM</Typography></Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Typography color="text.secondary">Saturday</Typography><Typography sx={{ fontWeight: 500 }}>10:00 AM - 4:00 PM</Typography></Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}><Typography color="text.secondary">Sunday</Typography><Typography sx={{ fontWeight: 500 }}>Closed</Typography></Box>
                  </Stack>
                </Box>
              </Card>
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  )
}
