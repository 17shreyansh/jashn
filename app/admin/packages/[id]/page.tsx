export const dynamic = 'force-dynamic'

import { connectDB } from '@/lib/db/mongodb'
import { Package } from '@/lib/db/models'
import { notFound } from 'next/navigation'
import PackageEditForm from './PackageEditForm'

async function getPackage(id: string) {
  await connectDB()
  const pkg = await Package.findById(id).lean()
  return pkg ? JSON.parse(JSON.stringify(pkg)) : null
}

export default async function EditPackagePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const pkg = await getPackage(id)
  if (!pkg) notFound()

  return (
    <div>
      <h1 className="text-4xl font-serif mb-8">Edit Package</h1>
      <PackageEditForm pkg={pkg} />
    </div>
  )
}
