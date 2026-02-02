import Link from 'next/link'
import { Button } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--color-accent2)] marble-bg">
      <div className="text-center px-4">
        <h1 className="text-8xl font-serif text-[var(--color-primary)] mb-4">404</h1>
        <h2 className="text-3xl font-serif mb-6">Page Not Found</h2>
        <p className="text-xl text-[var(--color-text-dark)]/70 mb-8">The page you're looking for doesn't exist.</p>
        <Link href="/">
          <Button>Return Home</Button>
        </Link>
      </div>
    </div>
  )
}
