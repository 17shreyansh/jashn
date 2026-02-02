import { NextRequest, NextResponse } from 'next/server'
import { getGallery } from '@/lib/db/models'
import { connectDB } from '@/lib/db/mongodb'
import { gallerySchema } from '@/lib/validation/schemas'
import { auth } from '@/lib/auth/auth'

export async function GET(req: NextRequest) {
  try {
    await connectDB()
    const { searchParams } = new URL(req.url)
    const type = searchParams.get('type')
    
    const Gallery = getGallery()
    const filter = type ? { type } : {}
    const items = await Gallery.find(filter).sort({ order: 1, createdAt: -1 })
    
    return NextResponse.json({ success: true, data: items })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const validated = gallerySchema.parse(body)
    
    await connectDB()
    const Gallery = getGallery()
    const item = await Gallery.create(validated)
    
    return NextResponse.json({ success: true, data: item }, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(req.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 })
    }

    await connectDB()
    const Gallery = getGallery()
    await Gallery.findByIdAndDelete(id)
    
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })
    }

    const body = await req.json()
    const { id, ...updates } = body
    
    if (!id) {
      return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 })
    }

    await connectDB()
    const Gallery = getGallery()
    const item = await Gallery.findByIdAndUpdate(id, updates, { new: true })
    
    return NextResponse.json({ success: true, data: item })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 })
  }
}
