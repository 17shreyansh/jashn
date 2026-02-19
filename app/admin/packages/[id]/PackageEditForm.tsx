'use client'

import { useState, useEffect } from 'react'
import { updatePackage, deletePackage } from '@/lib/actions/packages'
import { useRouter } from 'next/navigation'
import { Box, TextField, Typography, Stack, IconButton, Alert, Switch, FormControlLabel, MenuItem, Chip } from '@mui/material'
import { Button } from '@/components/ui/Button'
import { themeConfig } from '@/lib/config/theme'
import { Delete, CloudUpload, Close, Add, Remove } from '@mui/icons-material'
import Card from '@/components/ui-new/Card'
import { compressImage } from '@/lib/utils/imageCompression'
import { fileToBase64 } from '@/lib/utils/base64'

export default function PackageEditForm({ pkg }: { pkg: any }) {
  const router = useRouter()
  const [uploading, setUploading] = useState(false)
  const [images, setImages] = useState<string[]>(pkg.images || [])
  const [included, setIncluded] = useState<string[]>(pkg.included || [])
  const [excluded, setExcluded] = useState<string[]>(pkg.excluded || [])
  const [includeInput, setIncludeInput] = useState('')
  const [excludeInput, setExcludeInput] = useState('')
  const [pricingEnabled, setPricingEnabled] = useState(pkg.pricingEnabled || false)
  const [cities, setCities] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('/api/cities').then(r => r.json()).then(d => setCities(d.data || []))
  }, [])

  async function uploadImage(file: File) {
    setUploading(true)
    setError('')
    try {
      const res = await fetch('/api/cloudinary/signature', { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ folder: 'jashn/packages' })
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

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files || [])
    for (const file of files) {
      const url = await uploadImage(file)
      if (url) setImages(prev => [...prev, url])
    }
  }

  function addIncluded() {
    if (includeInput.trim()) {
      setIncluded([...included, includeInput.trim()])
      setIncludeInput('')
    }
  }

  function addExcluded() {
    if (excludeInput.trim()) {
      setExcluded([...excluded, excludeInput.trim()])
      setExcludeInput('')
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    formData.set('images', images.join(','))
    formData.set('included', included.join(','))
    formData.set('excluded', excluded.join(','))
    formData.set('pricingEnabled', pricingEnabled.toString())
    await updatePackage(pkg._id, formData)
    router.push('/admin/packages')
  }

  async function handleDelete() {
    if (confirm('Delete this package?')) {
      await deletePackage(pkg._id)
      router.push('/admin/packages')
    }
  }

  return (
    <Card sx={{ p: 4, bgcolor: 'white', border: '1px solid #e5e7eb' }}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {error && <Alert severity="error">{error}</Alert>}

          <TextField name="title" label="Package Title" required defaultValue={pkg.title} fullWidth />
          <TextField name="slug" label="Slug" required defaultValue={pkg.slug} fullWidth helperText="URL-friendly name" />
          
          <TextField name="cityId" label="City" select required defaultValue={pkg.cityId} fullWidth>
            <MenuItem value="">Select City</MenuItem>
            {cities.map((city: any) => (
              <MenuItem key={city._id} value={city._id}>{city.name}</MenuItem>
            ))}
          </TextField>

          <TextField name="duration" label="Duration" defaultValue={pkg.duration} fullWidth placeholder="e.g., 3 Days 2 Nights" />
          <TextField name="description" label="Description" multiline rows={5} defaultValue={pkg.description} fullWidth />

          <Box>
            <Typography sx={{ fontWeight: 600, mb: 1, color: themeConfig.colors.textDark }}>Package Images</Typography>
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
            <Typography sx={{ fontWeight: 600, mb: 1, color: themeConfig.colors.textDark }}>Included</Typography>
            <Stack spacing={1} sx={{ mb: 2 }}>
              {included.map((item, idx) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1.5, bgcolor: '#f9fafb', borderRadius: 1 }}>
                  <Typography sx={{ flex: 1, fontSize: '0.875rem' }}>{item}</Typography>
                  <IconButton size="small" onClick={() => setIncluded(included.filter((_, i) => i !== idx))}>
                    <Remove fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Stack>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField size="small" fullWidth value={includeInput} onChange={(e) => setIncludeInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addIncluded())} placeholder="Add inclusion" />
              <Button type="button" variant="outline" onClick={addIncluded}><Add /></Button>
            </Box>
          </Box>

          <Box>
            <Typography sx={{ fontWeight: 600, mb: 1, color: themeConfig.colors.textDark }}>Excluded</Typography>
            <Stack spacing={1} sx={{ mb: 2 }}>
              {excluded.map((item, idx) => (
                <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1.5, bgcolor: '#f9fafb', borderRadius: 1 }}>
                  <Typography sx={{ flex: 1, fontSize: '0.875rem' }}>{item}</Typography>
                  <IconButton size="small" onClick={() => setExcluded(excluded.filter((_, i) => i !== idx))}>
                    <Remove fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Stack>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField size="small" fullWidth value={excludeInput} onChange={(e) => setExcludeInput(e.target.value)} onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addExcluded())} placeholder="Add exclusion" />
              <Button type="button" variant="outline" onClick={addExcluded}><Add /></Button>
            </Box>
          </Box>

          <Box>
            <FormControlLabel control={<Switch checked={pricingEnabled} onChange={(e) => setPricingEnabled(e.target.checked)} />} label="Enable Pricing" />
            {pricingEnabled && (
              <TextField name="price" label="Price" type="number" defaultValue={pkg.price} fullWidth sx={{ mt: 2 }} />
            )}
          </Box>

          <Box sx={{ display: 'flex', gap: 2, pt: 2 }}>
            <Button type="submit" variant="primary">Update Package</Button>
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
