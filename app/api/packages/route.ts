import { NextRequest, NextResponse } from 'next/server'
import { packageSchema } from '@/lib/validation/schemas'
import { getPackages, createPackage, updatePackage, deletePackage } from '@/lib/services/packages'
import { auth } from '@/lib/auth/auth'

export async function GET() {
  try {
    const packages = await getPackages()
    return NextResponse.json({ success: true, data: packages })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch packages' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const validated = packageSchema.parse(body)
    const pkg = await createPackage(validated)
    return NextResponse.json({ success: true, data: pkg })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Invalid data' }, { status: 400 })
  }
}

export async function PUT(request: NextRequest) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 })
    }
    const body = await request.json()
    const pkg = await updatePackage(id, body)
    return NextResponse.json({ success: true, data: pkg })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Failed to update' }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) {
      return NextResponse.json({ success: false, error: 'ID required' }, { status: 400 })
    }
    await deletePackage(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete' }, { status: 500 })
  }
}
