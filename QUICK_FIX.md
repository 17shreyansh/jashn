# 🚀 QUICK FIX - Image Upload (5 Minutes)

## The Problem
❌ Image uploads failing → Missing Cloudinary credentials

## The Solution (3 Steps)

### Step 1: Get Cloudinary Account (2 min)
```
1. Visit: https://cloudinary.com/users/register_free
2. Sign up (free)
3. Copy from dashboard:
   - Cloud Name
   - API Key  
   - API Secret
```

### Step 2: Update .env.local (1 min)
Open: `e:\office\jashn\.env.local`

Replace these 3 lines:
```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-actual-cloud-name
CLOUDINARY_API_KEY=your-actual-api-key
CLOUDINARY_API_SECRET=your-actual-api-secret
```

### Step 3: Restart Server (30 sec)
```bash
# Stop server (Ctrl+C)
npm run dev
```

## ✅ Test It Works

Visit: http://localhost:3000/admin/cloudinary-test
Click: "Test Connection"

## 📍 Where to Upload Images

All these pages now work:
- `/admin/events` → Add images to events
- `/admin/cities` → Add banner & gallery
- `/admin/packages` → Add package images
- `/admin/gallery` → Add media library

## 🎉 Done!

Images will now upload to Cloudinary and work perfectly.

---

**Need help?** See `CLOUDINARY_SETUP.md` for detailed guide.
