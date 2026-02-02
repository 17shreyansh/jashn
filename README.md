# Jashn Planners - Production-Ready Platform

A premium, scalable Next.js platform for event planning and luxury tours with royal UI design.

## ✨ Features

### Core Functionality
- **Dual Business Modules**: Events Planning + Tours & Travels
- **Dynamic Content Management**: MongoDB-powered CMS
- **SEO Optimized**: ISR with automatic revalidation
- **Secure Authentication**: NextAuth.js with JWT
- **Media Management**: Cloudinary integration
- **Lead Management**: Contact form with admin dashboard

### Premium Royal UI
- Soft marble/cream backgrounds
- Elegant serif headings + clean sans-serif body
- Large spacing, breathable layouts
- Rounded cards with layered shadows
- Thin soft-gold borders
- Subtle glassmorphism effects
- Smooth hover animations
- Fully responsive design

### Security & Performance
- Protected admin routes with middleware
- Server-side session validation
- Zod validation on client and server
- Optimized images with Next.js Image
- Static generation + ISR for public pages
- Server-rendered admin pages

## 🎨 Design System

### Color Palette (Configurable)
```typescript
// lib/config/theme.ts
primary: '#a7ba42'    // Sage Green
secondary: '#95ccba'  // Mint
accent1: '#ffdede'    // Blush
accent2: '#fff0cb'    // Cream
luxury: '#f2cc84'     // Soft Gold
```

Change colors in one file to update entire site.

### Premium Components
- Button (primary, secondary, outline, ghost)
- Card (standard, premium, glass)
- Input & Textarea with validation
- Badge for tags and status
- Section container
- Heading with decorative underline

## 🚀 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, TypeScript, Tailwind CSS
- **Database**: MongoDB + Mongoose
- **Auth**: NextAuth.js v5
- **Media**: Cloudinary
- **Validation**: Zod
- **Animation**: Framer Motion

## 📦 Installation

### Prerequisites
- Node.js 18+
- MongoDB (local or Atlas)
- Cloudinary account

### Setup Steps

1. **Install dependencies**
```bash
npm install
```

2. **Configure environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/jashn

# Auth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

3. **Generate NextAuth secret**
```bash
openssl rand -base64 32
```

4. **Create admin user**

Connect to MongoDB and run:
```javascript
use jashn

db.admins.insertOne({
  email: "admin@jashnplanners.com",
  password: "$2a$10$YourBcryptHashedPasswordHere",
  name: "Admin User",
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

To generate bcrypt hash:
```javascript
const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync('your-password', 10);
console.log(hash);
```

5. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
/app
  /(public)              # Public pages with layout
    /events              # Events listing & detail
    /cities              # Cities listing & detail
    /packages            # Packages listing & detail
    /contact             # Contact form
    /about               # About page
    layout.tsx           # Public layout (Navbar + Footer)
    page.tsx             # Homepage
  /admin                 # Admin panel
    /dashboard           # Stats overview
    /events              # Manage events
    /cities              # Manage cities
    /packages            # Manage packages
    /leads               # View leads
    /login               # Admin login
    layout.tsx           # Admin layout with sidebar
  /api                   # API routes
    /auth                # NextAuth endpoints
    /events              # Events CRUD
    /cities              # Cities CRUD
    /packages            # Packages CRUD
    /leads               # Leads management
    /cloudinary          # Upload signatures
  globals.css            # Global styles
  layout.tsx             # Root layout

/components
  /ui                    # Reusable UI components
    Button.tsx
    Card.tsx
    Input.tsx
    Textarea.tsx
    Badge.tsx
    Heading.tsx
    Section.tsx
    Navbar.tsx
    Footer.tsx

/lib
  /auth                  # Authentication
    auth.ts              # NextAuth config
    types.ts             # Auth types
  /cloudinary            # Media management
    config.ts            # Cloudinary setup
  /db                    # Database
    models.ts            # Mongoose models
    mongodb.ts           # DB connection
  /services              # Business logic
    events.ts
    cities.ts
    packages.ts
    leads.ts
  /validation            # Zod schemas
    schemas.ts
  /config                # Configuration
    theme.ts             # Theme tokens

middleware.ts            # Route protection
```

## 🔐 Authentication Flow

1. Admin visits `/admin/*` route
2. Middleware checks session
3. If no session → redirect to `/admin/login`
4. Login validates credentials with NextAuth
5. JWT stored in httpOnly cookie
6. Protected routes accessible

## 📤 Cloudinary Upload Flow

1. Admin requests signed upload URL from `/api/cloudinary/signature`
2. Server generates signature with timestamp
3. Client uploads directly to Cloudinary
4. Cloudinary returns secure URL + public_id
5. URL saved to database

## 🎯 Admin Panel Features

### Dashboard
- Total counts (events, cities, packages, leads)
- Recent leads overview
- Quick action buttons

### Events Management
- List all events
- Create new event
- Edit existing event
- Delete event
- Toggle pricing on/off
- Manage add-ons

### Cities Management
- List all cities
- Create new city
- Edit existing city
- Delete city
- Upload banner & gallery

### Packages Management
- List all packages
- Create new package
- Edit existing package
- Delete package
- Dynamic itinerary builder
- Manage inclusions/exclusions

### Leads Management
- View all contact submissions
- Filter by status
- Delete leads

## 🌐 Deployment

### Vercel (Recommended)

1. Push code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy

### Environment Variables for Production
```env
MONGODB_URI=your-production-mongodb-uri
NEXTAUTH_URL=https://yourdomain.com
NEXTAUTH_SECRET=your-production-secret
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

### MongoDB Atlas Setup
1. Create cluster
2. Add database user
3. Whitelist Vercel IPs (or use 0.0.0.0/0)
4. Get connection string
5. Add to environment variables

## 🎨 Customizing Theme

Edit `/lib/config/theme.ts`:

```typescript
export const themeConfig = {
  colors: {
    primary: '#your-color',
    secondary: '#your-color',
    accent1: '#your-color',
    accent2: '#your-color',
    luxury: '#your-color',
  }
}
```

Colors automatically update across entire site via CSS variables.

## 📊 Performance Optimizations

- **ISR**: Public pages revalidate every hour
- **Image Optimization**: Next.js Image with Cloudinary
- **Code Splitting**: Dynamic imports for heavy components
- **Server Components**: Default for data-heavy pages
- **Caching**: Automatic with Next.js App Router

## 🔒 Security Best Practices

- ✅ httpOnly cookies for sessions
- ✅ Server-side auth checks
- ✅ Zod validation on all inputs
- ✅ Protected API routes
- ✅ Bcrypt password hashing
- ✅ CSRF protection via NextAuth
- ✅ No sensitive data in client

## 📝 API Response Format

All API routes return consistent format:

**Success:**
```json
{
  "success": true,
  "data": { ... }
}
```

**Error:**
```json
{
  "success": false,
  "error": "Error message"
}
```

## 🧪 Development Tips

### Adding New Event Type
1. Update model in `lib/db/models.ts`
2. Add validation in `lib/validation/schemas.ts`
3. Create service in `lib/services/`
4. Add API route in `app/api/`
5. Create admin pages
6. Create public pages

### Debugging
- Check MongoDB connection
- Verify environment variables
- Check browser console for client errors
- Check terminal for server errors
- Use Next.js dev tools

## 📄 License

Private - All rights reserved

## 🤝 Support

For issues or questions, contact: admin@jashnplanners.com
