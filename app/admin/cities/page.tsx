export const dynamic = 'force-dynamic'

import { getCities } from '@/lib/services/cities'
import CitiesClient from './CitiesClient'

export default async function AdminCitiesPage() {
  const cities = await getCities()
  return <CitiesClient cities={JSON.parse(JSON.stringify(cities))} />
}
