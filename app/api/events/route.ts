import { NextRequest, NextResponse } from 'next/server'
import { eventSchema } from '@/lib/validation/schemas'
import { getEvents, createEvent, updateEvent, deleteEvent } from '@/lib/services/events'
import { auth } from '@/lib/auth/auth'

export async function GET() {
  try {
    const events = await getEvents()
    return NextResponse.json({ success: true, data: events })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch events' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const validated = eventSchema.parse(body)
    const event = await createEvent(validated)
    return NextResponse.json({ success: true, data: event })
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
    const event = await updateEvent(id, body)
    return NextResponse.json({ success: true, data: event })
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
    await deleteEvent(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete' }, { status: 500 })
  }
}
