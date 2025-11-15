'use client'

import React from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { useAccessibility } from '@/contexts/AccessibilityContext'
import { Button } from '@/components/ui/button'

interface ReadAloudButtonProps {
  text: string
  className?: string
}

export function ReadAloudButton({ text, className = '' }: ReadAloudButtonProps) {
  const { speak, stopSpeaking, isSpeaking, ttsEnabled } = useAccessibility()

  if (!ttsEnabled || typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return null
  }

  const handleClick = () => {
    if (isSpeaking) {
      stopSpeaking()
    } else {
      speak(text)
    }
  }

  return (
    <Button
      onClick={handleClick}
      variant="outline"
      size="lg"
      className={`gap-2 ${className}`}
      aria-label={isSpeaking ? 'Stop reading' : 'Read aloud'}
    >
      {isSpeaking ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
      {isSpeaking ? 'Stop' : 'Read aloud'}
    </Button>
  )
}
