# Deployment Guide - Jashn Planners

Complete guide to deploy your production-ready platform.

## Pre-Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Cloudinary account setup
- [ ] Domain name ready (optional)
- [ ] All environment variables prepared
- [ ] Admin user credentials ready
- [ ] Code pushed to GitHub

## MongoDB Atlas Setup

### 1. Create Cluster

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Sign up or log in
3. Create a new cluster (Free tier works)
4. Choose region closest to your users
5. Wait for cluster to deploy (~5 minutes)

### 2. Create Database User

1. Go to **Database Access**
2. Click **Add New Database User**
3. Choose **Password** authentication
4. Username: `jashn-admin`
5. Generate secure password
6. Database User Privileges: **Read and write to any database**
7. Save credentials securely

### 3. Whitelist IP Addresses

1. Go to **Network Access**
2. Click **Add IP Address**
3. For Vercel: Click **Allow Access from Anywhere** (0.0.0.0/0)
4. Or add specific Vercel IPs

### 4. Get Connection String

1. Go to **Database** → **Connect**
2. Choose **Connect your application**
3. Copy connection string
4. Replace `<password>` with your database user password
5. Replace `<dbname>` with `jashn`

Example:
```
mongodb+srv://jashn-admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/jashn?retryWrites=true&w=majority
```

## Cloudinary Setup

### 1. Create Account

1. Go to [Cloudinary](https://cloudinary.com)
2. Sign up for free account
3. Verify email

### 2. Get Credentials

1. Go to **Dashboard**
2. Note down:
   - Cloud Name
   - API Key
   - API Secret

### 3. Configure Upload Preset (Optional)

1. Go to **Settings** → **Upload**
2. Scroll to **Upload presets**
3. Create preset named `jashn`
4. Set folder to `jashn`
5. Mode: **Unsigned** or **Signed**

## Vercel Deployment

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit - Production ready"
git branch -M main
git remote add origin https://github.com/yourusername/jashn.git
git push -u origin main
```

### 2. Import to Vercel

1. Go to [Vercel](https://vercel.com)
2. Sign up with GitHub
3. Click **Add New Project**
4. Import your repository
5. Configure project:
   - Framework Preset: **Next.js**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `.next`

### 3. Add Environment Variables

In Vercel project settings, add:

```env
# Database
MONGODB_URI=mongodb+srv://jashn-admin:PASSWORD@cluster0.xxxxx.mongodb.net/jashn

# Auth
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# Site
NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app
```

### 4. Deploy

1. Click **Deploy**
2. Wait for build to complete
3. Visit your site URL

### 5. Create Admin User

After first deployment:

1. Connect to MongoDB Atlas using MongoDB Compass or CLI
2. Select `jashn` database
3. Insert admin document:

```javascript
db.admins.insertOne({
  email: "admin@jashnplanners.com",
  password: "$2a$10$YourBcryptHashHere",
  name: "Admin User",
  role: "admin",
  createdAt: new Date(),
  updatedAt: new Date()
})
```

Generate bcrypt hash locally:
```bash
node -e "console.log(require('bcryptjs').hashSync('your-password', 10))"
```

## Custom Domain Setup

### 1. Add Domain in Vercel

1. Go to project **Settings** → **Domains**
2. Add your domain
3. Vercel provides DNS records

### 2. Configure DNS

Add these records to your domain provider:

**For root domain (example.com):**
```
Type: A
Name: @
Value: 76.76.21.21
```

**For www subdomain:**
```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### 3. Update Environment Variables

Update `NEXTAUTH_URL` and `NEXT_PUBLIC_SITE_URL` to your custom domain:

```env
NEXTAUTH_URL=https://yourdomain.com
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
```

Redeploy after updating.

## Post-Deployment

### 1. Test Admin Login

1. Visit `https://yourdomain.com/admin/login`
2. Login with admin credentials
3. Verify dashboard loads

### 2. Add Content

1. Create test event
2. Upload images via Cloudinary
3. Verify public page displays correctly

### 3. Test Contact Form

1. Submit contact form
2. Check lead appears in admin panel
3. Verify email/phone captured correctly

### 4. Performance Check

1. Run Lighthouse audit
2. Check Core Web Vitals
3. Verify images loading from Cloudinary

### 5. Security Check

- [ ] Admin routes protected
- [ ] API routes require authentication
- [ ] No sensitive data in client
- [ ] HTTPS enabled
- [ ] Environment variables secure

## Monitoring & Maintenance

### Vercel Analytics

1. Enable in project settings
2. Monitor page views
3. Track Core Web Vitals

### MongoDB Atlas Monitoring

1. Check database size
2. Monitor connection count
3. Set up alerts for issues

### Cloudinary Usage

1. Monitor bandwidth
2. Check storage usage
3. Optimize images if needed

## Troubleshooting

### Build Fails

**Error: Cannot find module**
- Run `npm install` locally
- Commit `package-lock.json`
- Redeploy

**Error: Environment variable missing**
- Check all variables in Vercel settings
- Ensure no typos
- Redeploy after adding

### Database Connection Issues

**Error: MongoServerError**
- Verify connection string
- Check IP whitelist (0.0.0.0/0)
- Verify database user password
- Check database name is `jashn`

### Authentication Not Working

**Redirects to login repeatedly**
- Verify `NEXTAUTH_SECRET` is set
- Check `NEXTAUTH_URL` matches deployment URL
- Clear browser cookies
- Try incognito mode

### Images Not Loading

**Cloudinary images 404**
- Verify cloud name is correct
- Check API credentials
- Ensure images uploaded to correct folder
- Check image URLs in database

### Contact Form Not Submitting

**API returns 500**
- Check MongoDB connection
- Verify Zod validation
- Check browser console for errors
- Test API route directly

## Scaling Considerations

### When to Scale

- **Database**: >1GB data or >100 concurrent users
- **Cloudinary**: >25GB bandwidth/month
- **Vercel**: >100GB bandwidth/month

### Scaling Options

**Database:**
- Upgrade MongoDB Atlas tier
- Add read replicas
- Implement caching (Redis)

**Media:**
- Upgrade Cloudinary plan
- Implement lazy loading
- Use responsive images

**Hosting:**
- Upgrade Vercel plan
- Add CDN caching
- Optimize bundle size

## Backup Strategy

### Database Backups

MongoDB Atlas automatic backups:
- Daily snapshots (retained 7 days)
- Point-in-time recovery
- Manual backup before major changes

### Media Backups

Cloudinary automatic backups:
- All uploads retained
- Version history available
- Export via API if needed

### Code Backups

GitHub repository:
- All commits preserved
- Tag releases
- Branch for production

## Support

For deployment issues:
- Check Vercel logs
- Review MongoDB Atlas logs
- Contact support if needed

---

**Deployment Complete! 🎉**

Your production-ready platform is now live and scalable.
