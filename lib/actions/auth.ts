'use server'

import { signOut } from '@/lib/auth/auth'

export async function handleLogout() {
  await signOut({ redirectTo: '/admin/login' })
}
