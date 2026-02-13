export const dynamic = 'force-dynamic'

import { getPackages } from '@/lib/services/packages'
import PackagesClient from './PackagesClient'

export default async function AdminPackagesPage() {
  const packages = await getPackages()
  return <PackagesClient packages={JSON.parse(JSON.stringify(packages))} />
}
