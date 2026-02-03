'use client'

import { useState, useEffect } from 'react'
import { Box, Typography, Button, TextField, Chip, Dialog, DialogContent, DialogTitle, IconButton, Radio, RadioGroup, FormControlLabel, Checkbox, CircularProgress } from '@mui/material'
import Card from '@/components/ui-new/Card'
import { Add, Delete, Star, Close, Image as ImageIcon, Videocam } from '@mui/icons-material'
import { themeConfig } from '@/lib/config/theme'

interface GalleryItem {
  _id: string
  title: string
  type: 'events' | 'tours'
  mediaType: 'image' | 'video'
  url: string
  thumbnail?: string
  description?: string
  featured: boolean
  order: number
}

export default function AdminGalleryPage() {
  const [items, setItems] = useState<GalleryItem[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'events' | 'tours'>('all')
  const [showUpload, setShowUpload] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [form, setForm] = useState({ title: '', type: 'events' as 'events' | 'tours', mediaType: 'image' as 'image' | 'video', url: '', thumbnail: '', description: '', featured: false, order: 0 })

  useEffect(() => { fetchItems() }, [filter])

  const fetchItems = async () => {
    try {
      const url = filter === 'all' ? '/api/gallery' : `/api/gallery?type=${filter}`
      const res = await fetch(url)
      const data = await res.json()
      if (data.success) setItems(data.data)
    } catch (error) {
      console.error('Failed to fetch gallery:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleUpload = async (file: File, type: 'image' | 'video') => {
    setUploading(true)
    try {
      const signRes = await fetch('/api/cloudinary/signature')
      const { signature, timestamp, cloudName, apiKey } = await signRes.json()
      const formData = new FormData()
      formData.append('file', file)
      formData.append('signature', signature)
      formData.append('timestamp', timestamp)
      formData.append('api_key', apiKey)
      formData.append('folder', 'gallery')
      const uploadRes = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/${type}/upload`, { method: 'POST', body: formData })
      const data = await uploadRes.json()
      if (type === 'image') {
        setForm(prev => ({ ...prev, url: data.secure_url }))
      } else {
        setForm(prev => ({ ...prev, url: data.secure_url, thumbnail: data.secure_url.replace('/upload/', '/upload/so_0,w_400,h_300,c_fill/') }))
      }
    } catch (error) {
      alert('Upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/gallery', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(form) })
      const data = await res.json()
      if (data.success) {
        setItems(prev => [data.data, ...prev])
        setShowUpload(false)
        setForm({ title: '', type: 'events', mediaType: 'image', url: '', thumbnail: '', description: '', featured: false, order: 0 })
      }
    } catch (error) {
      alert('Failed to add item')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this item?')) return
    try {
      const res = await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' })
      if (res.ok) setItems(prev => prev.filter(item => item._id !== id))
    } catch (error) {
      alert('Failed to delete')
    }
  }

  const toggleFeatured = async (item: GalleryItem) => {
    try {
      const res = await fetch('/api/gallery', { method: 'PATCH', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ id: item._id, featured: !item.featured }) })
      const data = await res.json()
      if (data.success) setItems(prev => prev.map(i => i._id === item._id ? data.data : i))
    } catch (error) {
      alert('Failed to update')
    }
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box>
          <Typography sx={{ fontSize: '1.75rem', fontWeight: 700, color: themeConfig.colors.textDark, mb: 0.5 }}>Gallery</Typography>
          <Typography sx={{ color: themeConfig.colors.textLight }}>Manage media for Events & Tours</Typography>
        </Box>
        <Button variant="contained" startIcon={<Add />} onClick={() => setShowUpload(true)} sx={{ bgcolor: themeConfig.colors.black, '&:hover': { bgcolor: themeConfig.colors.primary } }}>Add Media</Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        {['all', 'events', 'tours'].map(f => (
          <Button key={f} variant={filter === f ? 'contained' : 'outlined'} onClick={() => setFilter(f as any)} sx={{ ...(filter === f && { bgcolor: themeConfig.colors.black }) }}>{f.charAt(0).toUpperCase() + f.slice(1)}</Button>
        ))}
      </Box>

      <Dialog open={showUpload} onClose={() => setShowUpload(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Add Media
          <IconButton onClick={() => setShowUpload(false)}><Close /></IconButton>
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 2 }}>
            <RadioGroup row value={form.mediaType} onChange={(e) => setForm(prev => ({ ...prev, mediaType: e.target.value as any }))}>
              <FormControlLabel value="image" control={<Radio />} label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><ImageIcon fontSize="small" />Image</Box>} />
              <FormControlLabel value="video" control={<Radio />} label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><Videocam fontSize="small" />Video</Box>} />
            </RadioGroup>
            <Button variant="outlined" component="label" disabled={uploading}>
              {uploading ? <CircularProgress size={20} /> : 'Upload File'}
              <input type="file" hidden accept={form.mediaType === 'image' ? 'image/*' : 'video/*'} onChange={(e) => { const file = e.target.files?.[0]; if (file) handleUpload(file, form.mediaType) }} />
            </Button>
            {form.url && <Box sx={{ mt: 2 }}>{form.mediaType === 'image' ? <img src={form.url} alt="Preview" style={{ width: '100%', height: 200, objectFit: 'cover', borderRadius: 8 }} /> : <video src={form.url} controls style={{ width: '100%', height: 200, borderRadius: 8 }} />}</Box>}
            <TextField label="Title" value={form.title} onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))} required fullWidth />
            <TextField select label="Gallery Type" value={form.type} onChange={(e) => setForm(prev => ({ ...prev, type: e.target.value as any }))} fullWidth SelectProps={{ native: true }}>
              <option value="events">Events</option>
              <option value="tours">Tours & Travels</option>
            </TextField>
            <TextField label="Description (Optional)" value={form.description} onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))} multiline rows={3} fullWidth />
            <FormControlLabel control={<Checkbox checked={form.featured} onChange={(e) => setForm(prev => ({ ...prev, featured: e.target.checked }))} />} label="Mark as Featured" />
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button type="submit" variant="contained" disabled={!form.url || !form.title} fullWidth sx={{ bgcolor: themeConfig.colors.black }}>Add to Gallery</Button>
              <Button variant="outlined" onClick={() => setShowUpload(false)} fullWidth>Cancel</Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      {loading ? (
        <Box sx={{ textAlign: 'center', py: 10 }}><CircularProgress /></Box>
      ) : items.length === 0 ? (
        <Card sx={{ p: 8, textAlign: 'center', bgcolor: 'white', border: '1px solid #e5e7eb' }}>
          <Typography sx={{ fontSize: '1.125rem', fontWeight: 600, color: themeConfig.colors.textDark, mb: 1 }}>No items found</Typography>
          <Typography sx={{ color: themeConfig.colors.textLight }}>Add your first media!</Typography>
        </Card>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 3 }}>
          {items.map(item => (
            <Card key={item._id} sx={{ bgcolor: 'white', border: '1px solid #e5e7eb', borderRadius: 3, overflow: 'hidden' }}>
              <Box sx={{ position: 'relative', paddingTop: '56.25%', overflow: 'hidden' }}>
                {item.mediaType === 'image' ? <img src={item.url} alt={item.title} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} /> : <video src={item.url} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />}
                <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 1 }}>
                  <IconButton size="small" onClick={() => toggleFeatured(item)} sx={{ bgcolor: item.featured ? themeConfig.colors.luxury : 'rgba(255,255,255,0.8)' }}><Star fontSize="small" sx={{ color: item.featured ? 'white' : 'inherit' }} /></IconButton>
                  <IconButton size="small" onClick={() => handleDelete(item._id)} sx={{ bgcolor: '#ef4444', color: 'white' }}><Delete fontSize="small" /></IconButton>
                </Box>
              </Box>
              <Box sx={{ p: 2 }}>
                <Typography sx={{ mb: 1, fontWeight: 600, fontSize: '0.9375rem', color: themeConfig.colors.textDark }}>{item.title}</Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                  <Chip label={item.type} size="small" sx={{ fontSize: '0.75rem' }} />
                  <Chip label={item.mediaType} size="small" sx={{ fontSize: '0.75rem' }} />
                </Box>
                {item.description && <Typography sx={{ fontSize: '0.8125rem', color: themeConfig.colors.textLight, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.description}</Typography>}
              </Box>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  )
}
