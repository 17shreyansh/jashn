import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth/auth'
import { getSignature } from '@/lib/cloudinary/config'

export async function POST(request: Request) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Check if Cloudinary is configured
  if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 
      !process.env.CLOUDINARY_API_KEY || 
      !process.env.CLOUDINARY_API_SECRET) {
    return NextResponse.json({ 
      error: 'Cloudinary not configured. Please add credentials to .env.local' 
    }, { status: 500 })
  }

  try {
    const body = await request.json().catch(() => ({}))
    const folder = body.folder || 'jashn'
    
    const { timestamp, signature } = await getSignature(folder)
    return NextResponse.json({
      timestamp,
      signature,
      folder,
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
    })
  } catch (error) {
    console.error('Cloudinary signature error:', error)
    return NextResponse.json({ 
      error: 'Failed to generate signature. Check server logs.' 
    }, { status: 500 })
  }
}
