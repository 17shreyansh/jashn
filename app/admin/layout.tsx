import { auth } from '@/lib/auth/auth'
import AdminLayout from '@/components/layouts/AdminLayout'
import { handleLogout } from '@/lib/actions/auth'
import AntdProvider from '@/components/providers/AntdProvider'

export default async function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  const session = await auth()
  
  if (!session?.user) {
    return <AntdProvider>{children}</AntdProvider>
  }

  return (
    <AntdProvider>
      <AdminLayout userEmail={session.user.email || ''} onLogout={handleLogout}>
        {children}
      </AdminLayout>
    </AntdProvider>
  )
}
