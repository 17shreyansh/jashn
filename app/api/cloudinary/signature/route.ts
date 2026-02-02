import { NextResponse } from 'next/server'
import { auth } from '@/lib/auth/auth'
import { getSignature } from '@/lib/cloudinary/config'

export async function POST() {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { timestamp, signature } = await getSignature()
    return NextResponse.json({
      timestamp,
      signature,
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      apiKey: process.env.CLOUDINARY_API_KEY,
    })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to generate signature' }, { status: 500 })
  }
}
