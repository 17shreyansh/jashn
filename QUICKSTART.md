# Quick Start Guide

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Setup Environment Variables
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```env
MONGODB_URI=mongodb://localhost:27017/jashn
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 3. Generate Auth Secret
```bash
openssl rand -base64 32
```
Copy the output to `NEXTAUTH_SECRET` in `.env.local`

### 4. Start MongoDB
Make sure MongoDB is running locally or use MongoDB Atlas.

### 5. Create Admin User
```bash
npm run seed:admin
```
This creates an admin user:
- Email: `admin@jashnplanners.com`
- Password: `admin123`

⚠️ **Change the password after first login!**

### 6. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📱 Access Points

- **Public Site**: http://localhost:3000
- **Admin Login**: http://localhost:3000/admin/login
- **Admin Dashboard**: http://localhost:3000/admin/dashboard

## 🎨 Customizing Theme

Edit `lib/config/theme.ts` to change colors:
```typescript
export const themeConfig = {
  colors: {
    primary: '#a7ba42',    // Your primary color
    secondary: '#95ccba',  // Your secondary color
    accent1: '#ffdede',    // Accent color 1
    accent2: '#fff0cb',    // Accent color 2
    luxury: '#f2cc84',     // Luxury/gold accent
  }
}
```

Colors automatically update across the entire site.

## 📤 Cloudinary Setup

1. Create account at [cloudinary.com](https://cloudinary.com)
2. Get your Cloud Name, API Key, and API Secret
3. Add to `.env.local`
4. Upload images through admin panel

## 🗄️ MongoDB Atlas (Production)

1. Create cluster at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create database user
3. Whitelist IP addresses
4. Get connection string
5. Update `MONGODB_URI` in production environment

## 🚢 Deploy to Vercel

1. Push code to GitHub
2. Import project to Vercel
3. Add environment variables
4. Deploy

## 📝 Creating Content

### Add Event
1. Login to admin panel
2. Go to Events → Add Event
3. Fill in details and upload images
4. Save

### Add City/Destination
1. Go to Cities → Add City
2. Upload banner and gallery images
3. Save

### Add Package
1. Go to Packages → Add Package
2. Select city
3. Add itinerary days
4. Add inclusions/exclusions
5. Save

## 🔒 Security Notes

- Change default admin password immediately
- Use strong passwords
- Keep environment variables secure
- Never commit `.env.local` to git
- Use HTTPS in production

## 🐛 Troubleshooting

### MongoDB Connection Error
- Check if MongoDB is running
- Verify connection string in `.env.local`

### Images Not Loading
- Check Cloudinary credentials
- Verify image URLs are valid

### Admin Login Not Working
- Run `npm run seed:admin` again
- Check MongoDB connection
- Clear browser cookies

## 📚 Project Structure

```
/app
  /(public)     - Public pages
  /admin        - Admin panel
  /api          - API routes
/components/ui  - Reusable components
/lib
  /auth         - Authentication
  /db           - Database models
  /services     - Business logic
  /validation   - Zod schemas
```

## 🤝 Support

For issues, check the main README.md or contact support.
