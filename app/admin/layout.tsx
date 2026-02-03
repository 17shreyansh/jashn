'use client'

import { auth } from '@/lib/auth/auth'
import AdminLayout from '@/components/layouts/AdminLayout'
import { use } from 'react'
import { handleLogout } from '@/lib/actions/auth'

export default function AdminLayoutWrapper({ children }: { children: React.ReactNode }) {
  const session = use(auth() as any)
  
  if (!session?.user) {
    return children
  }

  return (
    <AdminLayout userEmail={session.user.email || ''} onLogout={handleLogout}>
      {children}
    </AdminLayout>
  )
}
