import type { Metadata } from 'next'
import { Inter, Tangerine, Great_Vibes } from 'next/font/google'
import AuthProvider from '@/components/providers/AuthProvider'
import { ThemeProvider } from '@/lib/theme/ThemeProvider'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const tangerine = Tangerine({ subsets: ['latin'], variable: '--font-heading', weight: ['400', '700'] })
const greatVibes = Great_Vibes({ subsets: ['latin'], variable: '--font-heading-alt', weight: ['400'] })

export const metadata: Metadata = {
  title: 'Jashn Planners - Events and Holidays',
  description: 'Premium event planning and luxury tours',
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${tangerine.variable} ${greatVibes.variable}`} suppressHydrationWarning>
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
