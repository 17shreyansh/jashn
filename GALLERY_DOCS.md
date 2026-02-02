# Gallery System Documentation

## Overview
Complete gallery management system with separate galleries for Events and Tours & Travels.

## Features

### Admin Panel (`/admin/gallery`)
- ✅ Upload images and videos
- ✅ Separate galleries for Events and Tours
- ✅ Direct Cloudinary upload
- ✅ Mark items as featured
- ✅ Add titles and descriptions
- ✅ Delete media
- ✅ Filter by type
- ✅ Beautiful grid layout

### Public Gallery (`/gallery`)
- ✅ Tabbed interface (Events / Tours)
- ✅ Separate sections for Photos and Videos
- ✅ Lightbox for full-screen viewing
- ✅ Video playback with controls
- ✅ Smooth animations
- ✅ Responsive design
- ✅ Hover effects

## Database Schema

```typescript
interface IGallery {
  title: string              // Media title
  type: 'events' | 'tours'   // Gallery type
  mediaType: 'image' | 'video' // Media type
  url: string                // Cloudinary URL
  thumbnail?: string         // Video thumbnail
  description?: string       // Optional description
  featured: boolean          // Featured flag
  order: number             // Display order
  createdAt: Date
  updatedAt: Date
}
```

## API Endpoints

### GET `/api/gallery`
Fetch gallery items
- Query params: `?type=events` or `?type=tours`
- Returns: Array of gallery items

### POST `/api/gallery`
Create new gallery item (Admin only)
- Body: GalleryInput
- Returns: Created item

### DELETE `/api/gallery?id={id}`
Delete gallery item (Admin only)
- Query params: `id`
- Returns: Success status

### PATCH `/api/gallery`
Update gallery item (Admin only)
- Body: `{ id, ...updates }`
- Returns: Updated item

## Usage

### Admin - Upload Media

1. Go to `/admin/gallery`
2. Click "Add Media"
3. Select media type (Image/Video)
4. Upload file (auto-uploads to Cloudinary)
5. Add title and description
6. Select gallery type (Events/Tours)
7. Mark as featured (optional)
8. Submit

### Admin - Manage Media

- **Delete**: Click trash icon on any item
- **Toggle Featured**: Click star icon
- **Filter**: Use tabs to filter by type

### Public - View Gallery

1. Visit `/gallery`
2. Switch between Events and Tours tabs
3. Click any image/video for lightbox view
4. Videos play with controls in lightbox

## File Structure

```
/app
  /admin
    /gallery
      page.tsx              # Admin gallery management
  /(public)
    /gallery
      page.tsx              # Public gallery page
  /api
    /gallery
      route.ts              # Gallery CRUD API

/lib
  /db
    models.ts               # Gallery model
  /validation
    schemas.ts              # Gallery validation
```

## Styling

- Royal UI design with soft colors
- Smooth hover animations
- Glassmorphism effects
- Responsive grid layouts
- Professional lightbox

## Security

- ✅ Admin routes protected with NextAuth
- ✅ Server-side session validation
- ✅ Zod validation on inputs
- ✅ Cloudinary signed uploads

## Performance

- ✅ Optimized image loading
- ✅ Video thumbnails for previews
- ✅ Lazy loading
- ✅ Efficient database queries
- ✅ Client-side filtering

## Future Enhancements

- [ ] Bulk upload
- [ ] Drag & drop reordering
- [ ] Image editing
- [ ] Video trimming
- [ ] Gallery categories/tags
- [ ] Search functionality
- [ ] Social sharing
