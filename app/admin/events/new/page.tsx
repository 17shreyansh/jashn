'use client'

import { useState } from 'react'
import { createEvent } from '@/lib/actions/events'
import { useRouter } from 'next/navigation'
import { Box, TextField, Typography, Stack, IconButton, Alert, Chip, Switch, FormControlLabel } from '@mui/material'
import { Button } from '@/components/ui/Button'
import { themeConfig } from '@/lib/config/theme'
import { CloudUpload, Close } from '@mui/icons-material'
import Card from '@/components/ui-new/Card'
import { fileToBase64 } from '@/lib/utils/base64'
import { compressImage } from '@/lib/utils/imageCompression'
import { uploadToCloudinary } from '@/lib/utils/cloudinary-upload'

export default function NewEventPage() {
  const router = useRouter()
  const [uploading, setUploading] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [tags, setTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')
  const [pricingEnabled, setPricingEnabled] = useState(false)
  const [error, setError] = useState('')

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    setUploading(true)
    setError('')
    try {
      for (const file of files) {
        const cloudinaryResult = await uploadToCloudinary(file, 'events', 'image')
        if (cloudinaryResult) {
          setImages(prev => [...prev, cloudinaryResult.url])
        } else {
          const sizeMB = file.size / 1024 / 1024
          const processedFile = sizeMB > 1 ? await compressImage(file, 1) : file
          const base64 = await fileToBase64(processedFile)
          setImages(prev => [...prev, base64])
        }
      }
    } catch (err) {
      setError('Upload failed')
    } finally {
      setUploading(false)
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
    await createEvent(formData)
    router.push('/admin/events')
  }

  return (
    <Box>
      <Typography sx={{ fontSize: '1.75rem', fontWeight: 700, color: themeConfig.colors.textDark, mb: 4 }}>Add New Event</Typography>
      
      <Card sx={{ p: 4, bgcolor: 'white', border: '1px solid #e5e7eb' }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {error && <Alert severity="error">{error}</Alert>}

            <TextField name="title" label="Event Title" required fullWidth />
            <TextField name="slug" label="Slug" required fullWidth helperText="URL-friendly name" />
            <TextField name="shortDescription" label="Short Description" fullWidth />
            <TextField name="description" label="Description" multiline rows={5} fullWidth />

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
              <Box component="label">
                <Button variant="secondary" disabled={uploading}>
                  <CloudUpload sx={{ mr: 1 }} /> {uploading ? 'Uploading...' : 'Add Images'}
                </Button>
                <input type="file" hidden accept="image/*" multiple onChange={handleImageUpload} />
              </Box>
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
                <TextField name="basePrice" label="Base Price" type="number" fullWidth sx={{ mt: 2 }} />
              )}
            </Box>

            <Box sx={{ display: 'flex', gap: 2, pt: 2 }}>
              <Button type="submit" variant="primary">Create Event</Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
            </Box>
          </Stack>
        </form>
      </Card>
    </Box>
  )
}
