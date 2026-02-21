'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Box, TextField, Typography, Stack, IconButton, Alert } from '@mui/material'
import { Button } from '@/components/ui/Button'
import { themeConfig } from '@/lib/config/theme'
import { Delete, CloudUpload, Close } from '@mui/icons-material'
import Card from '@/components/ui-new/Card'
import { compressImage } from '@/lib/utils/imageCompression'
import { fileToBase64 } from '@/lib/utils/base64'

export default function CityEditForm({ city }: { city: any }) {
  const router = useRouter()
  const [uploading, setUploading] = useState(false)
  const [bannerImage, setBannerImage] = useState(city.bannerImage || '')
  const [gallery, setGallery] = useState<string[]>(city.gallery || [])
  const [error, setError] = useState('')

  async function uploadImage(file: File) {
    setUploading(true)
    setError('')
    try {
      const res = await fetch('/api/cloudinary/signature', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folder: 'jashn/cities' })
      })
      if (!res.ok) throw new Error('Cloudinary not configured')
      
      const { timestamp, signature, cloudName, apiKey, folder } = await res.json()
      const formData = new FormData()
      formData.append('file', file)
      formData.append('timestamp', timestamp)
      formData.append('signature', signature)
      formData.append('api_key', apiKey)
      formData.append('folder', folder)

      const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      })
      const data = await uploadRes.json()
      return data.secure_url
    } catch (err) {
      const sizeMB = file.size / 1024 / 1024
      const processedFile = sizeMB > 1 ? await compressImage(file, 1) : file
      return await fileToBase64(processedFile)
    } finally {
      setUploading(false)
    }
  }

  async function handleBannerUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      const url = await uploadImage(file)
      if (url) setBannerImage(url)
    }
  }

  async function handleGalleryUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    for (const file of files) {
      const url = await uploadImage(file)
      if (url) setGallery(prev => [...prev, url])
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError('')
    try {
      const formData = new FormData(e.currentTarget)
      const payload = {
        name: formData.get('name'),
        slug: formData.get('slug'),
        description: formData.get('description'),
        bannerImage: bannerImage,
        gallery: gallery,
      }

      const res = await fetch(`/api/cities?id=${city._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const data = await res.json()
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to update city')
      
      router.push('/admin/cities')
      router.refresh()
    } catch (err: any) {
      setError(err.message || 'Failed to update city')
    }
  }

  async function handleDelete() {
    if (confirm('Delete this city?')) {
      try {
        const res = await fetch(`/api/cities?id=${city._id}`, { method: 'DELETE' })
        const data = await res.json()
        if (!res.ok || !data.success) throw new Error(data.error || 'Failed to delete')
        router.push('/admin/cities')
        router.refresh()
      } catch (err: any) {
        setError(err.message || 'Failed to delete city')
      }
    }
  }

  return (
    <Card sx={{ p: 4, bgcolor: 'white', border: '1px solid #e5e7eb' }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {error && <Alert severity="error">{error}</Alert>}

          <TextField name="name" label="City Name" required defaultValue={city.name} fullWidth />
          <TextField name="slug" label="Slug" required defaultValue={city.slug} fullWidth helperText="URL-friendly name" />
          <TextField name="description" label="Description" multiline rows={4} defaultValue={city.description} fullWidth />

          <Box>
            <Typography sx={{ fontWeight: 600, mb: 1, color: themeConfig.colors.textDark }}>Banner Image</Typography>
            {bannerImage && (
              <Box sx={{ position: 'relative', mb: 2, width: '100%', height: 200, borderRadius: 2, overflow: 'hidden' }}>
                <img src={bannerImage} alt="Banner" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <IconButton onClick={() => setBannerImage('')} sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'white' }} size="small">
                  <Close />
                </IconButton>
              </Box>
            )}
            <Box component="label">
              <Button variant="secondary" disabled={uploading}>
                <CloudUpload sx={{ mr: 1 }} /> {uploading ? 'Uploading...' : 'Upload Banner'}
              </Button>
              <input type="file" hidden accept="image/*" onChange={handleBannerUpload} />
            </Box>
          </Box>

          <Box>
            <Typography sx={{ fontWeight: 600, mb: 1, color: themeConfig.colors.textDark }}>Gallery Images</Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 2, mb: 2 }}>
              {gallery.map((img, idx) => (
                <Box key={idx} sx={{ position: 'relative', height: 120, borderRadius: 2, overflow: 'hidden' }}>
                  <img src={img} alt={`Gallery ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <IconButton onClick={() => setGallery(gallery.filter((_, i) => i !== idx))} sx={{ position: 'absolute', top: 4, right: 4, bgcolor: 'white', width: 24, height: 24 }} size="small">
                    <Close sx={{ fontSize: 16 }} />
                  </IconButton>
                </Box>
              ))}
            </Box>
            <Box component="label">
              <Button variant="secondary" disabled={uploading}>
                <CloudUpload sx={{ mr: 1 }} /> {uploading ? 'Uploading...' : 'Add Images'}
              </Button>
              <input type="file" hidden accept="image/*" multiple onChange={handleGalleryUpload} />
            </Box>
          </Box>

          <Box sx={{ display: 'flex', gap: 2, pt: 2 }}>
            <Button type="submit" variant="primary">Update City</Button>
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
