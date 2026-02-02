import { NextRequest, NextResponse } from 'next/server'
import { leadSchema } from '@/lib/validation/schemas'
import { createLead, getLeads, deleteLead } from '@/lib/services/leads'
import { auth } from '@/lib/auth/auth'

export async function GET() {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const leads = await getLeads()
    return NextResponse.json({ success: true, data: leads })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to fetch leads' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validated = leadSchema.parse(body)
    const lead = await createLead(validated)
    return NextResponse.json({ success: true, data: lead })
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message || 'Invalid data' }, { status: 400 })
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
    await deleteLead(id)
    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Failed to delete lead' }, { status: 500 })
  }
}
