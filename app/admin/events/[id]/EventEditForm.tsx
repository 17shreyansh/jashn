'use client'

import { useState } from 'react'
import { updateEvent, deleteEvent } from '@/lib/actions/events'
import { useRouter } from 'next/navigation'
import { Box, TextField, Typography, Stack, IconButton, Alert, Chip, Switch, FormControlLabel } from '@mui/material'
import { Button } from '@/components/ui/Button'
import { themeConfig } from '@/lib/config/theme'
import { Delete, CloudUpload, Close } from '@mui/icons-material'
import Card from '@/components/ui-new/Card'

export default function EventEditForm({ event }: { event: any }) {
  const router = useRouter()
  const [uploading, setUploading] = useState(false)
  const [images, setImages] = useState<string[]>(event.images || [])
  const [tags, setTags] = useState<string[]>(event.tags || [])
  const [tagInput, setTagInput] = useState('')
  const [pricingEnabled, setPricingEnabled] = useState(event.pricingEnabled || false)
  const [error, setError] = useState('')

  async function uploadImage(file: File) {
    setUploading(true)
    setError('')
    try {
      const res = await fetch('/api/cloudinary/signature', { method: 'POST' })
      const { timestamp, signature, cloudName, apiKey } = await res.json()

      const formData = new FormData()
      formData.append('file', file)
      formData.append('timestamp', timestamp)
      formData.append('signature', signature)
      formData.append('api_key', apiKey)
      formData.append('folder', 'jashn')

      const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      })
      const data = await uploadRes.json()
      return data.secure_url
    } catch (err) {
      setError('Upload failed')
      return null
    } finally {
      setUploading(false)
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    for (const file of files) {
      const url = await uploadImage(file)
      if (url) setImages(prev => [...prev, url])
    }
  }

  function addTag() {
    if (tagInput.trim() && !tags.includes(tagInput.trim())) {
      setTags([...tags, tagInput.trim()])
      setTagInput('')
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.set('images', images.join(','))
    formData.set('tags', tags.join(','))
    formData.set('pricingEnabled', pricingEnabled.toString())
    await updateEvent(event._id, formData)
    router.push('/admin/events')
  }

  async function handleDelete() {
    if (confirm('Delete this event?')) {
      await deleteEvent(event._id)
      router.push('/admin/events')
    }
  }

  return (
    <Card sx={{ p: 4, bgcolor: 'white', border: '1px solid #e5e7eb' }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {error && <Alert severity="error">{error}</Alert>}

          <TextField name="title" label="Event Title" required defaultValue={event.title} fullWidth />
          <TextField name="slug" label="Slug" required defaultValue={event.slug} fullWidth helperText="URL-friendly name" />
          <TextField name="shortDescription" label="Short Description" defaultValue={event.shortDescription} fullWidth />
          <TextField name="description" label="Description" multiline rows={5} defaultValue={event.description} fullWidth />

          <Box>
            <Typography sx={{ fontWeight: 600, mb: 1, color: themeConfig.colors.textDark }}>Event Images</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: 2, mb: 2 }}>
              {images.map((img, idx) => (
                <Box key={idx} sx={{ position: 'relative', height: 140, borderRadius: 2, overflow: 'hidden' }}>
                  <img src={img} alt={`Image ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <IconButton onClick={() => setImages(images.filter((_, i) => i !== idx))} sx={{ position: 'absolute', top: 4, right: 4, bgcolor: 'white', width: 24, height: 24 }} size="small">
                    <Close sx={{ fontSize: 16 }} />
                  </IconButton>
                </Box>
              ))}
            </Box>
            <Button variant="secondary" component="label" disabled={uploading}>
              <CloudUpload sx={{ mr: 1 }} /> {uploading ? 'Uploading...' : 'Add Images'}
              <input type="file" hidden accept="image/*" multiple onChange={handleImageUpload} />
            </Button>
          </Box>

          <Box>
            <Typography sx={{ fontWeight: 600, mb: 1, color: themeConfig.colors.textDark }}>Tags</Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
              {tags.map((tag, idx) => (
                <Chip key={idx} label={tag} onDelete={() => setTags(tags.filter((_, i) => i !== idx))} />
              ))}
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField size="small" value={tagInput} onChange={(e) => setTagInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())} placeholder="Add tag" />
              <Button type="button" variant="outline" onClick={addTag}>Add</Button>
            </Box>
          </Box>

          <Box>
            <FormControlLabel control={<Switch checked={pricingEnabled} onChange={(e) => setPricingEnabled(e.target.checked)} />} label="Enable Pricing" />
            {pricingEnabled && (
              <TextField name="basePrice" label="Base Price" type="number" defaultValue={event.basePrice} fullWidth sx={{ mt: 2 }} />
            )}
          </Box>

          <Box sx={{ display: 'flex', gap: 2, pt: 2 }}>
            <Button type="submit" variant="primary">Update Event</Button>
            <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
            <Button type="button" variant="ghost" onClick={handleDelete} sx={{ ml: 'auto', color: '#ef4444' }}>
              <Delete sx={{ mr: 1 }} /> Delete
            </Button>
          </Box>
        </Stack>
      </form>
    </Card>
  )
}
