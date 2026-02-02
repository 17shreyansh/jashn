'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AdminSidebar() {
  const pathname = usePathname()
  
  const links = [
    { href: '/admin/dashboard', label: 'Dashboard', icon: '📊' },
    { href: '/admin/events', label: 'Events', icon: '🎉' },
    { href: '/admin/cities', label: 'Cities', icon: '🏙️' },
    { href: '/admin/packages', label: 'Packages', icon: '✈️' },
    { href: '/admin/gallery', label: 'Gallery', icon: '🖼️' },
    { href: '/admin/leads', label: 'Leads', icon: '📧' },
  ]

  return (
    <aside className="w-64 bg-white border-r border-luxury/20 min-h-[calc(100vh-4rem)] p-6">
      <nav className="space-y-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
              pathname.startsWith(link.href)
                ? 'bg-primary text-white'
                : 'text-text-dark hover:bg-accent2'
            }`}
          >
            <span className="text-xl">{link.icon}</span>
            <span className="font-medium">{link.label}</span>
          </Link>
        ))}
      </nav>
    </aside>
  )
}
