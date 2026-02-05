'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/Button'
import { themeConfig } from '@/lib/config/theme'

export default function SettingsPage() {
  const [colors, setColors] = useState(themeConfig.colors)

  return (
    <div>
      <h1 className="text-4xl font-serif mb-8">Settings</h1>

      <div className="bg-white rounded-2xl p-8 shadow-md max-w-3xl">
        <h2 className="text-2xl font-serif mb-6">Theme Colors</h2>
        <p className="text-sm opacity-70 mb-6">
          Edit colors in <code className="bg-gray-100 px-2 py-1 rounded">lib/config/theme.ts</code> and restart dev server
        </p>

        <div className="space-y-4">
          {Object.entries(colors).map(([key, value]) => (
            <div key={key} className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-lg border-2"
                style={{ backgroundColor: value }}
              />
              <div className="flex-1">
                <div className="font-medium capitalize">{key.replace(/([A-Z])/g, ' $1')}</div>
                <div className="text-sm opacity-70">{value}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <h3 className="font-semibold mb-2">Contact Information</h3>
          <p className="text-sm opacity-70">
            Edit contact details in <code className="bg-white px-2 py-1 rounded">components/ui/Footer.tsx</code>
          </p>
        </div>

        <div className="mt-4 p-4 bg-green-50 rounded-lg">
          <h3 className="font-semibold mb-2">SEO Metadata</h3>
          <p className="text-sm opacity-70">
            Edit default SEO in <code className="bg-white px-2 py-1 rounded">app/layout.tsx</code>
          </p>
        </div>
      </div>
    </div>
  )
}
