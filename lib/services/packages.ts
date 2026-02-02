import { connectDB } from '@/lib/db/mongodb'
import { getPackage } from '@/lib/db/models'
import { PackageInput } from '@/lib/validation/schemas'
import { revalidatePath } from 'next/cache'

export async function getPackages(cityId?: string, featured?: boolean) {
  await connectDB()
  const Package = getPackage()
  const filter: any = {}
  if (cityId) filter.cityId = cityId
  if (featured) filter.featured = true
  return await Package.find(filter).populate('cityId').sort({ createdAt: -1 }).lean()
}

export async function getPackageBySlug(slug: string) {
  await connectDB()
  const Package = getPackage()
  return await Package.findOne({ slug }).populate('cityId').lean()
}

export async function createPackage(data: PackageInput) {
  await connectDB()
  const Package = getPackage()
  const pkg = await Package.create(data)
  revalidatePath('/packages')
  revalidatePath('/admin/packages')
  return pkg
}

export async function updatePackage(id: string, data: Partial<PackageInput>) {
  await connectDB()
  const Package = getPackage()
  const pkg = await Package.findByIdAndUpdate(id, data, { new: true })
  if (pkg) {
    revalidatePath('/packages')
    revalidatePath(`/packages/${pkg.slug}`)
    revalidatePath('/admin/packages')
  }
  return pkg
}

export async function deletePackage(id: string) {
  await connectDB()
  const Package = getPackage()
  const pkg = await Package.findByIdAndDelete(id)
  if (pkg) {
    revalidatePath('/packages')
    revalidatePath('/admin/packages')
  }
  return pkg
}
