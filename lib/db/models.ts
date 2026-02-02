import mongoose, { Schema, Model, Document } from 'mongoose'

// Types
export interface IEvent extends Document {
  title: string
  slug: string
  description: string
  shortDescription: string
  images: string[]
  videos: string[]
  tags: string[]
  pricingEnabled: boolean
  basePrice?: number
  addons: { name: string; price: number }[]
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ICity extends Document {
  name: string
  slug: string
  description: string
  bannerImage: string
  gallery: string[]
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

export interface IPackage extends Document {
  title: string
  slug: string
  cityId: mongoose.Types.ObjectId
  description: string
  duration: string
  images: string[]
  pricingEnabled: boolean
  price?: number
  itinerary: { day: number; title: string; description: string }[]
  included: string[]
  excluded: string[]
  featured: boolean
  createdAt: Date
  updatedAt: Date
}

export interface ILead extends Document {
  name: string
  email: string
  phone?: string
  message?: string
  source: string
  status: 'new' | 'contacted' | 'converted' | 'closed'
  createdAt: Date
  updatedAt: Date
}

export interface IAdmin extends Document {
  email: string
  password: string
  name: string
  role: 'admin' | 'superadmin'
  createdAt: Date
  updatedAt: Date
}

export interface IGallery extends Document {
  title: string
  type: 'events' | 'tours'
  mediaType: 'image' | 'video'
  url: string
  thumbnail?: string
  description?: string
  featured: boolean
  order: number
  createdAt: Date
  updatedAt: Date
}

// Schemas
const EventSchema = new Schema<IEvent>({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  description: { type: String, required: true },
  shortDescription: { type: String, required: true, maxlength: 200 },
  images: [{ type: String }],
  videos: [{ type: String }],
  tags: [{ type: String, trim: true }],
  pricingEnabled: { type: Boolean, default: false },
  basePrice: { type: Number, min: 0 },
  addons: [{
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
  }],
  featured: { type: Boolean, default: false },
}, { timestamps: true })

const CitySchema = new Schema<ICity>({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  description: { type: String, required: true },
  bannerImage: { type: String, required: true },
  gallery: [{ type: String }],
  featured: { type: Boolean, default: false },
}, { timestamps: true })

const PackageSchema = new Schema<IPackage>({
  title: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
  cityId: { type: Schema.Types.ObjectId, ref: 'City', required: true },
  description: { type: String, required: true },
  duration: { type: String, required: true },
  images: [{ type: String }],
  pricingEnabled: { type: Boolean, default: false },
  price: { type: Number, min: 0 },
  itinerary: [{
    day: { type: Number, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
  }],
  included: [{ type: String }],
  excluded: [{ type: String }],
  featured: { type: Boolean, default: false },
}, { timestamps: true })

const LeadSchema = new Schema<ILead>({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, trim: true },
  message: { type: String },
  source: { type: String, default: 'contact_form' },
  status: { type: String, enum: ['new', 'contacted', 'converted', 'closed'], default: 'new' },
}, { timestamps: true })

const AdminSchema = new Schema<IAdmin>({
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  name: { type: String, required: true, trim: true },
  role: { type: String, enum: ['admin', 'superadmin'], default: 'admin' },
}, { timestamps: true })

const GallerySchema = new Schema<IGallery>({
  title: { type: String, required: true, trim: true },
  type: { type: String, enum: ['events', 'tours'], required: true },
  mediaType: { type: String, enum: ['image', 'video'], required: true },
  url: { type: String, required: true },
  thumbnail: { type: String },
  description: { type: String, trim: true },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true })

// Models - Safe getter functions
export const getEvent = (): Model<IEvent> => {
  if (mongoose.models?.Event) return mongoose.models.Event as Model<IEvent>
  return mongoose.model<IEvent>('Event', EventSchema)
}

export const getCity = (): Model<ICity> => {
  if (mongoose.models?.City) return mongoose.models.City as Model<ICity>
  return mongoose.model<ICity>('City', CitySchema)
}

export const getPackage = (): Model<IPackage> => {
  if (mongoose.models?.Package) return mongoose.models.Package as Model<IPackage>
  return mongoose.model<IPackage>('Package', PackageSchema)
}

export const getLead = (): Model<ILead> => {
  if (mongoose.models?.Lead) return mongoose.models.Lead as Model<ILead>
  return mongoose.model<ILead>('Lead', LeadSchema)
}

export const getAdmin = (): Model<IAdmin> => {
  if (mongoose.models?.Admin) return mongoose.models.Admin as Model<IAdmin>
  return mongoose.model<IAdmin>('Admin', AdminSchema)
}

export const getGallery = (): Model<IGallery> => {
  if (mongoose.models?.Gallery) return mongoose.models.Gallery as Model<IGallery>
  return mongoose.model<IGallery>('Gallery', GallerySchema)
}

// Legacy exports
export const Event = getEvent()
export const City = getCity()
export const Package = getPackage()
export const Lead = getLead()
export const Admin = getAdmin()
export const Gallery = getGallery()
