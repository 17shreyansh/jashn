# Cloudinary Setup Guide

## Quick Setup (5 minutes)

### 1. Create Free Cloudinary Account
1. Go to https://cloudinary.com/users/register_free
2. Sign up with email or Google
3. Verify your email

### 2. Get Your Credentials
1. Login to Cloudinary Dashboard: https://console.cloudinary.com/
2. You'll see your credentials on the dashboard:
   - **Cloud Name** (e.g., `dxyz123abc`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (click "Reveal" to see it)

### 3. Update .env.local
Replace the placeholder values in `.env.local`:

```env
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-actual-cloud-name
CLOUDINARY_API_KEY=your-actual-api-key
CLOUDINARY_API_SECRET=your-actual-api-secret
```

### 4. Restart Dev Server
```bash
# Stop the server (Ctrl+C)
npm run dev
```

## Testing Upload

1. Login to admin: http://localhost:3000/admin/login
2. Go to Events, Cities, Packages, or Gallery
3. Click "Add Images" or "Upload File"
4. Select an image
5. Upload should work instantly!

## Troubleshooting

### Error: "Upload failed"
- Check if credentials are correct
- Make sure you restarted the dev server after updating .env.local
- Check browser console for detailed error

### Error: "Unauthorized"
- Make sure you're logged in as admin
- Check if NEXTAUTH_SECRET is set

### Images not showing
- Check if the URL starts with `https://res.cloudinary.com/`
- Verify the image was uploaded in Cloudinary dashboard

## Cloudinary Features Used

- **Automatic optimization**: Images are compressed automatically
- **Responsive images**: Different sizes generated on-the-fly
- **CDN delivery**: Fast loading worldwide
- **Secure uploads**: Signed requests prevent unauthorized uploads
- **Free tier**: 25GB storage, 25GB bandwidth/month

## Folder Structure in Cloudinary

All uploads go to organized folders:
- `/jashn/` - Events, Cities, Packages images
- `/gallery/` - Gallery media (images & videos)

You can view/manage all uploads in your Cloudinary Media Library.
