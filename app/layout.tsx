import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import AuthProvider from '@/components/providers/AuthProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' })

export const metadata: Metadata = {
  title: 'Jashn Planners - Events and Holidays',
  description: 'Premium event planning and luxury tours',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans bg-[var(--color-accent2)]`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
