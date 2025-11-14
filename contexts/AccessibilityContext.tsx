'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface AccessibilityContextType {
  fontSize: number
  highContrast: boolean
  reducedMotion: boolean
  ttsEnabled: boolean
  ttsLanguage: string
  setFontSize: (size: number) => void
  setHighContrast: (enabled: boolean) => void
  setReducedMotion: (enabled: boolean) => void
  setTtsEnabled: (enabled: boolean) => void
  setTtsLanguage: (lang: string) => void
  speak: (text: string) => void
  stopSpeaking: () => void
  isSpeaking: boolean
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined)

export function AccessibilityProvider({ children }: { children: React.ReactNode }) {
  const [fontSize, setFontSizeState] = useState(18)
  const [highContrast, setHighContrastState] = useState(false)
  const [reducedMotion, setReducedMotionState] = useState(false)
  const [ttsEnabled, setTtsEnabledState] = useState(true)
  const [ttsLanguage, setTtsLanguageState] = useState('en-IN')
  const [isSpeaking, setIsSpeaking] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedFontSize = localStorage.getItem('scam911-font-size')
      const storedHighContrast = localStorage.getItem('scam911-high-contrast')
      const storedReducedMotion = localStorage.getItem('scam911-reduced-motion')
      const storedTtsEnabled = localStorage.getItem('scam911-tts-enabled')
      const storedTtsLanguage = localStorage.getItem('scam911-tts-language')

      if (storedFontSize) {
        const size = parseInt(storedFontSize, 10)
        setFontSizeState(size)
        document.documentElement.style.fontSize = `${size}px`
      }

      if (storedHighContrast) {
        const contrast = storedHighContrast === 'true'
        setHighContrastState(contrast)
        if (contrast) {
          document.documentElement.classList.add('high-contrast')
        }
      }

      if (storedReducedMotion) {
        const motion = storedReducedMotion === 'true'
        setReducedMotionState(motion)
        if (motion) {
          document.documentElement.classList.add('reduced-motion')
        }
      }

      if (storedTtsEnabled) {
        setTtsEnabledState(storedTtsEnabled === 'true')
      }

      if (storedTtsLanguage) {
        setTtsLanguageState(storedTtsLanguage)
      }

      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
      if (mediaQuery.matches && !storedReducedMotion) {
        setReducedMotionState(true)
        document.documentElement.classList.add('reduced-motion')
      }
    }
  }, [])

  const setFontSize = (size: number) => {
    const clampedSize = Math.max(14, Math.min(26, size))
    setFontSizeState(clampedSize)
    document.documentElement.style.fontSize = `${clampedSize}px`
    localStorage.setItem('scam911-font-size', clampedSize.toString())
  }

  const setHighContrast = (enabled: boolean) => {
    setHighContrastState(enabled)
    if (enabled) {
      document.documentElement.classList.add('high-contrast')
    } else {
      document.documentElement.classList.remove('high-contrast')
    }
    localStorage.setItem('scam911-high-contrast', enabled.toString())
  }

  const setReducedMotion = (enabled: boolean) => {
    setReducedMotionState(enabled)
    if (enabled) {
      document.documentElement.classList.add('reduced-motion')
    } else {
      document.documentElement.classList.remove('reduced-motion')
    }
    localStorage.setItem('scam911-reduced-motion', enabled.toString())
  }

  const setTtsEnabled = (enabled: boolean) => {
    setTtsEnabledState(enabled)
    localStorage.setItem('scam911-tts-enabled', enabled.toString())
  }

  const setTtsLanguage = (lang: string) => {
    setTtsLanguageState(lang)
    localStorage.setItem('scam911-tts-language', lang)
  }

  const speak = (text: string) => {
    if (!ttsEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) {
      return
    }

    window.speechSynthesis.cancel()

    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = ttsLanguage
    utterance.rate = 0.9
    utterance.pitch = 1

    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    utterance.onerror = () => setIsSpeaking(false)

    window.speechSynthesis.speak(utterance)
  }

  const stopSpeaking = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel()
      setIsSpeaking(false)
    }
  }

  return (
    <AccessibilityContext.Provider
      value={{
        fontSize,
        highContrast,
        reducedMotion,
        ttsEnabled,
        ttsLanguage,
        setFontSize,
        setHighContrast,
        setReducedMotion,
        setTtsEnabled,
        setTtsLanguage,
        speak,
        stopSpeaking,
        isSpeaking,
      }}
    >
      {children}
    </AccessibilityContext.Provider>
  )
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext)
  if (context === undefined) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider')
  }
  return context
}
