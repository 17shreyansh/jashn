import { auth } from '@/lib/auth/auth'
import AdminLayout from '@/components/layouts/AdminLayout'
import { handleLogout } from '@/lib/actions/auth'

export default async function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  const session = await auth()
  
  if (!session?.user) {
    return children
  }

  return (
    <AdminLayout userEmail={session.user.email || ''} onLogout={handleLogout}>
      {children}
    </AdminLayout>
  )
}
