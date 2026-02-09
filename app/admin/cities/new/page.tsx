'use client'

import { useState } from 'react'
import { createCity } from '@/lib/actions/cities'
import { useRouter } from 'next/navigation'
import { Box, TextField, Typography, Stack, IconButton, Alert } from '@mui/material'
import { Button } from '@/components/ui/Button'
import { themeConfig } from '@/lib/config/theme'
import { CloudUpload, Close } from '@mui/icons-material'
import Card from '@/components/ui-new/Card'
import { fileToBase64 } from '@/lib/utils/base64'
import { compressImage } from '@/lib/utils/imageCompression'
import { uploadToCloudinary } from '@/lib/utils/cloudinary-upload'

export default function NewCityPage() {
  const router = useRouter()
  const [uploading, setUploading] = useState(false)
  const [bannerImage, setBannerImage] = useState('')
  const [gallery, setGallery] = useState<string[]>([])
  const [error, setError] = useState('')

  async function handleBannerUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true)
    setError('')
    try {
      const cloudinaryResult = await uploadToCloudinary(file, 'cities', 'image')
      if (cloudinaryResult) {
        setBannerImage(cloudinaryResult.url)
      } else {
        const sizeMB = file.size / 1024 / 1024
        const processedFile = sizeMB > 1 ? await compressImage(file, 1) : file
        const base64 = await fileToBase64(processedFile)
        setBannerImage(base64)
      }
    } catch (err) {
      setError('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  async function handleGalleryUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    setUploading(true)
    setError('')
    try {
      for (const file of files) {
        const cloudinaryResult = await uploadToCloudinary(file, 'cities', 'image')
        if (cloudinaryResult) {
          setGallery(prev => [...prev, cloudinaryResult.url])
        } else {
          const sizeMB = file.size / 1024 / 1024
          const processedFile = sizeMB > 1 ? await compressImage(file, 1) : file
          const base64 = await fileToBase64(processedFile)
          setGallery(prev => [...prev, base64])
        }
      }
    } catch (err) {
      setError('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.set('bannerImage', bannerImage)
    formData.set('gallery', gallery.join(','))
    await createCity(formData)
    router.push('/admin/cities')
  }

  return (
    <Box>
      <Typography sx={{ fontSize: '1.75rem', fontWeight: 700, color: themeConfig.colors.textDark, mb: 4 }}>Add New City</Typography>
      
      <Card sx={{ p: 4, bgcolor: 'white', border: '1px solid #e5e7eb' }}>
        <form onSubmit={handleSubmit}>
          <Stack spacing={3}>
            {error && <Alert severity="error">{error}</Alert>}

            <TextField name="name" label="City Name" required fullWidth />
            <TextField name="slug" label="Slug" required fullWidth helperText="URL-friendly name" />
            <TextField name="description" label="Description" multiline rows={4} fullWidth />

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
              <Button type="submit" variant="primary">Create City</Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
            </Box>
          </Stack>
        </form>
      </Card>
    </Box>
  )
}
