'use client'

import React, { useState, useEffect } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { useAccessibility } from '@/contexts/AccessibilityContext'
import { Button } from '@/components/ui/button'

interface ReadAloudButtonProps {
  text: string
  className?: string
}

export function ReadAloudButton({ text, className = '' }: ReadAloudButtonProps) {
  const { speak, stopSpeaking, isSpeaking, ttsEnabled } = useAccessibility()
  const [isClient, setIsClient] = useState(false)
  const [hasSpeechSynthesis, setHasSpeechSynthesis] = useState(false)

  useEffect(() => {
    setIsClient(true)
    setHasSpeechSynthesis('speechSynthesis' in window)
  }, [])

  if (!isClient || !ttsEnabled || !hasSpeechSynthesis) {
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
