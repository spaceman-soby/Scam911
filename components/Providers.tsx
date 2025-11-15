'use client'

import { AccessibilityProvider } from '@/contexts/AccessibilityContext'
import { AuthProvider } from '@/contexts/AuthContext'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <AccessibilityProvider>
        {children}
      </AccessibilityProvider>
    </AuthProvider>
  )
}
