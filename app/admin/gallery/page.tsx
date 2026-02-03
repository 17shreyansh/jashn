'use client'

import { useState, useEffect } from 'react'
import { Box, Typography, Button, TextField, Chip, Dialog, DialogContent, DialogTitle, IconButton, Radio, RadioGroup, FormControlLabel, Checkbox, CircularProgress } from '@mui/material'
import Card from '@/components/ui-new/Card'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import StarIcon from '@mui/icons-material/Star'
import CloseIcon from '@mui/icons-material/Close'
import ImageIcon from '@mui/icons-material/Image'
import VideocamIcon from '@mui/icons-material/Videocam'

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
          <Typography variant="h4" sx={{ fontFamily: 'var(--font-playfair)', fontWeight: 700, mb: 1 }}>Gallery Management</Typography>
          <Typography color="text.secondary">Manage images and videos for Events & Tours</Typography>
        </Box>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => setShowUpload(true)}>Add Media</Button>
      </Box>

      <Box sx={{ display: 'flex', gap: 2, mb: 4 }}>
        {['all', 'events', 'tours'].map(f => (
          <Button key={f} variant={filter === f ? 'contained' : 'outlined'} onClick={() => setFilter(f as any)}>{f.charAt(0).toUpperCase() + f.slice(1)}</Button>
        ))}
      </Box>

      <Dialog open={showUpload} onClose={() => setShowUpload(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          Add Media
          <IconButton onClick={() => setShowUpload(false)}><CloseIcon /></IconButton>
        </DialogTitle>
        <DialogContent>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3, pt: 2 }}>
            <RadioGroup row value={form.mediaType} onChange={(e) => setForm(prev => ({ ...prev, mediaType: e.target.value as any }))}>
              <FormControlLabel value="image" control={<Radio />} label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><ImageIcon fontSize="small" />Image</Box>} />
              <FormControlLabel value="video" control={<Radio />} label={<Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}><VideocamIcon fontSize="small" />Video</Box>} />
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
              <Button type="submit" variant="contained" disabled={!form.url || !form.title} fullWidth>Add to Gallery</Button>
              <Button variant="outlined" onClick={() => setShowUpload(false)} fullWidth>Cancel</Button>
            </Box>
          </Box>
        </DialogContent>
      </Dialog>

      {loading ? (
        <Box sx={{ textAlign: 'center', py: 10 }}><CircularProgress /></Box>
      ) : items.length === 0 ? (
        <Card><Box sx={{ p: 8, textAlign: 'center' }}><Typography variant="h6" color="text.secondary">No items found. Add your first media!</Typography></Box></Card>
      ) : (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' }, gap: 3 }}>
          {items.map(item => (
            <Card key={item._id}>
              <Box sx={{ position: 'relative', paddingTop: '56.25%', overflow: 'hidden' }}>
                {item.mediaType === 'image' ? <img src={item.url} alt={item.title} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} /> : <video src={item.url} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />}
                <Box sx={{ position: 'absolute', top: 8, right: 8, display: 'flex', gap: 1 }}>
                  <IconButton size="small" onClick={() => toggleFeatured(item)} sx={{ bgcolor: item.featured ? 'luxury.main' : 'rgba(255,255,255,0.8)' }}><StarIcon fontSize="small" sx={{ color: item.featured ? 'white' : 'inherit' }} /></IconButton>
                  <IconButton size="small" onClick={() => handleDelete(item._id)} sx={{ bgcolor: 'error.main', color: 'white' }}><DeleteIcon fontSize="small" /></IconButton>
                </Box>
              </Box>
              <Box sx={{ p: 2 }}>
                <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>{item.title}</Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                  <Chip label={item.type} size="small" />
                  <Chip label={item.mediaType} size="small" />
                </Box>
                {item.description && <Typography variant="body2" color="text.secondary" sx={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{item.description}</Typography>}
              </Box>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  )
}

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

  const [form, setForm] = useState({
    title: '',
    type: 'events' as 'events' | 'tours',
    mediaType: 'image' as 'image' | 'video',
    url: '',
    thumbnail: '',
    description: '',
    featured: false,
    order: 0,
  })

  useEffect(() => {
    fetchItems()
  }, [filter])

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

      const uploadRes = await fetch(
        `https://api.cloudinary.com/v1_1/${cloudName}/${type}/upload`,
        { method: 'POST', body: formData }
      )

      const data = await uploadRes.json()
      
      if (type === 'image') {
        setForm(prev => ({ ...prev, url: data.secure_url }))
      } else {
        setForm(prev => ({ 
          ...prev, 
          url: data.secure_url,
          thumbnail: data.secure_url.replace('/upload/', '/upload/so_0,w_400,h_300,c_fill/')
        }))
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
      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success) {
        setItems(prev => [data.data, ...prev])
        setShowUpload(false)
        setForm({
          title: '',
          type: 'events',
          mediaType: 'image',
          url: '',
          thumbnail: '',
          description: '',
          featured: false,
          order: 0,
        })
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
      const res = await fetch('/api/gallery', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item._id, featured: !item.featured }),
      })
      const data = await res.json()
      if (data.success) {
        setItems(prev => prev.map(i => i._id === item._id ? data.data : i))
      }
    } catch (error) {
      alert('Failed to update')
    }
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-4xl font-serif text-textDark mb-2">Gallery Management</h1>
          <p className="text-textLight">Manage images and videos for Events & Tours</p>
        </div>
        <Button onClick={() => setShowUpload(true)}>
          <Upload className="w-4 h-4 mr-2" />
          Add Media
        </Button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-6">
        {['all', 'events', 'tours'].map(f => (
          <Button
            key={f}
            variant={filter === f ? 'primary' : 'outline'}
            onClick={() => setFilter(f as any)}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </Button>
        ))}
      </div>

      {/* Upload Modal */}
      {showUpload && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-serif text-textDark">Add Media</h2>
              <button onClick={() => setShowUpload(false)}>
                <X className="w-6 h-6" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Media Type</label>
                <div className="flex gap-4">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={form.mediaType === 'image'}
                      onChange={() => setForm(prev => ({ ...prev, mediaType: 'image' }))}
                    />
                    <ImageIcon className="w-4 h-4" />
                    Image
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      checked={form.mediaType === 'video'}
                      onChange={() => setForm(prev => ({ ...prev, mediaType: 'video' }))}
                    />
                    <Video className="w-4 h-4" />
                    Video
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Upload File</label>
                <input
                  type="file"
                  accept={form.mediaType === 'image' ? 'image/*' : 'video/*'}
                  onChange={(e) => {
                    const file = e.target.files?.[0]
                    if (file) handleUpload(file, form.mediaType)
                  }}
                  className="w-full"
                  disabled={uploading}
                />
                {uploading && <p className="text-sm text-primary mt-2">Uploading...</p>}
                {form.url && (
                  <div className="mt-4">
                    {form.mediaType === 'image' ? (
                      <img src={form.url} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                    ) : (
                      <video src={form.url} controls className="w-full h-48 rounded-lg" />
                    )}
                  </div>
                )}
              </div>

              <Input
                label="Title"
                value={form.title}
                onChange={(e) => setForm(prev => ({ ...prev, title: e.target.value }))}
                required
              />

              <div>
                <label className="block text-sm font-medium mb-2">Gallery Type</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm(prev => ({ ...prev, type: e.target.value as any }))}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20"
                >
                  <option value="events">Events</option>
                  <option value="tours">Tours & Travels</option>
                </select>
              </div>

              <Textarea
                label="Description (Optional)"
                value={form.description}
                onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                rows={3}
              />

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured"
                  checked={form.featured}
                  onChange={(e) => setForm(prev => ({ ...prev, featured: e.target.checked }))}
                />
                <label htmlFor="featured" className="text-sm">Mark as Featured</label>
              </div>

              <div className="flex gap-3">
                <Button type="submit" disabled={!form.url || !form.title}>
                  Add to Gallery
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowUpload(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        </div>
      )}

      {/* Gallery Grid */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {items.map(item => (
            <Card key={item._id} className="overflow-hidden">
              <div className="relative aspect-video">
                {item.mediaType === 'image' ? (
                  <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <video src={item.url} className="w-full h-full object-cover" />
                )}
                <div className="absolute top-2 right-2 flex gap-2">
                  <button
                    onClick={() => toggleFeatured(item)}
                    className={`p-2 rounded-full ${item.featured ? 'bg-luxury' : 'bg-white/80'}`}
                  >
                    <Star className="w-4 h-4" fill={item.featured ? 'white' : 'none'} />
                  </button>
                  <button
                    onClick={() => handleDelete(item._id)}
                    className="p-2 bg-red-500 text-white rounded-full"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-textDark mb-2">{item.title}</h3>
                <div className="flex gap-2">
                  <Badge>{item.type}</Badge>
                  <Badge>{item.mediaType}</Badge>
                </div>
                {item.description && (
                  <p className="text-sm text-textLight mt-2 line-clamp-2">{item.description}</p>
                )}
              </div>
            </Card>
          ))}
        </div>
      )}

      {!loading && items.length === 0 && (
        <div className="text-center py-12">
          <p className="text-textLight">No items found. Add your first media!</p>
        </div>
      )}
    </div>
  )
}
