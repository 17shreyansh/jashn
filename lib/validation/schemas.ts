import { z } from 'zod'

export const eventSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/),
  description: z.string().min(20),
  shortDescription: z.string().min(10).max(200),
  images: z.array(z.string()).default([]),
  videos: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
})

export const citySchema = z.object({
  name: z.string().min(2),
  slug: z.string().min(2).regex(/^[a-z0-9-]+$/),
  description: z.string().min(20),
  bannerImage: z.string().url(),
  gallery: z.array(z.string().url()).default([]),
  featured: z.boolean().default(false),
})

export const packageSchema = z.object({
  title: z.string().min(3),
  slug: z.string().min(3).regex(/^[a-z0-9-]+$/),
  cityId: z.string().min(1),
  description: z.string().min(20),
  duration: z.string().min(1),
  images: z.array(z.string().url()).default([]),
  pricingEnabled: z.boolean().default(false),
  price: z.number().min(0).optional(),
  itinerary: z.array(z.object({
    day: z.number().min(1),
    title: z.string().min(1),
    description: z.string().min(1),
  })).default([]),
  included: z.array(z.string()).default([]),
  excluded: z.array(z.string()).default([]),
  featured: z.boolean().default(false),
})

export const leadSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().optional(),
})

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

export const gallerySchema = z.object({
  title: z.string().min(3),
  type: z.enum(['events', 'tours']),
  mediaType: z.enum(['image', 'video']),
  url: z.string().url(),
  thumbnail: z.string().url().optional(),
  description: z.string().optional(),
  featured: z.boolean().default(false),
  order: z.number().default(0),
})

export type EventInput = z.infer<typeof eventSchema>
export type CityInput = z.infer<typeof citySchema>
export type PackageInput = z.infer<typeof packageSchema>
export type LeadInput = z.infer<typeof leadSchema>
export type LoginInput = z.infer<typeof loginSchema>
export type GalleryInput = z.infer<typeof gallerySchema>
