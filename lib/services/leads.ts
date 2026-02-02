import { connectDB } from '@/lib/db/mongodb'
import { getLead } from '@/lib/db/models'
import { LeadInput } from '@/lib/validation/schemas'

export async function getLeads(status?: string) {
  await connectDB()
  const Lead = getLead()
  const filter = status ? { status } : {}
  return await Lead.find(filter).sort({ createdAt: -1 }).lean()
}

export async function createLead(data: LeadInput) {
  await connectDB()
  const Lead = getLead()
  return await Lead.create(data)
}

export async function updateLeadStatus(id: string, status: string) {
  await connectDB()
  const Lead = getLead()
  return await Lead.findByIdAndUpdate(id, { status }, { new: true })
}

export async function deleteLead(id: string) {
  await connectDB()
  const Lead = getLead()
  return await Lead.findByIdAndDelete(id)
}
