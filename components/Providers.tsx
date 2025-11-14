'use client'

import { AccessibilityProvider } from '@/contexts/AccessibilityContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AccessibilityProvider>
      {children}
    </AccessibilityProvider>
  )
}
