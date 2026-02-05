import NextAuth, { NextAuthConfig } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { connectDB } from '@/lib/db/mongodb'
import { getAdmin } from '@/lib/db/models'

export const authOptions: NextAuthConfig = {
  providers: [
    Credentials({
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) {
            return null
          }

          await connectDB()
          const Admin = getAdmin()
          const admin = await Admin.findOne({ email: credentials.email })
          
          if (!admin) {
            return null
          }

          const isValid = await bcrypt.compare(credentials.password as string, admin.password)
          
          if (!isValid) {
            return null
          }

          return {
            id: admin._id.toString(),
            email: admin.email,
            name: admin.name,
            role: admin.role,
          }
        } catch (error) {
          console.error('Auth error:', error)
          return null
        }
      },
    }),
  ],
  pages: {
    signIn: '/admin/login',
  },
  session: {
    strategy: 'jwt',
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: process.env.NODE_ENV === 'production',
      },
    },
  },
  trustHost: true,
}

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions)
