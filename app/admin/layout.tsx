import Link from 'next/link'
import { redirect } from 'next/navigation'
import { auth, signOut } from '@/lib/auth/auth'
import AdminSidebar from '@/components/modules/admin/AdminSidebar'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()
  
  // Allow login page without session
  if (!session?.user) {
    return children
  }

  return (
    <div className="min-h-screen bg-accent2/30">
      <nav className="bg-white border-b border-luxury/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link href="/admin/dashboard" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                <span className="text-white font-serif font-bold text-xl">J</span>
              </div>
              <span className="font-serif text-xl font-bold text-text-dark">Admin Panel</span>
            </Link>

            <div className="flex items-center gap-4">
              <span className="text-sm text-text-light">{session.user.email}</span>
              <form action={async () => {
                'use server'
                await signOut({ redirectTo: '/admin/login' })
              }}>
                <button type="submit" className="px-4 py-2 text-sm font-medium text-text-dark hover:bg-accent2 rounded-lg transition-colors">
                  Logout
                </button>
              </form>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        <AdminSidebar />
        <main className="flex-1 p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
