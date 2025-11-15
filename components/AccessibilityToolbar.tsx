'use client'

import React, { useState } from 'react'
import { Volume2, Eye, Minus, Plus, Settings, X } from 'lucide-react'
import { useAccessibility } from '@/contexts/AccessibilityContext'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'

export function AccessibilityToolbar() {
  const [isOpen, setIsOpen] = useState(false)
  const {
    fontSize,
    highContrast,
    reducedMotion,
    ttsEnabled,
    setFontSize,
    setHighContrast,
    setReducedMotion,
    setTtsEnabled,
  } = useAccessibility()

  return (
    <>
      <Button
        onClick={() => setIsOpen(!isOpen)}
        variant="outline"
        size="lg"
        className="rounded-full"
        aria-label="Open accessibility settings"
        aria-expanded={isOpen}
      >
        <Settings className="h-5 w-5" />
      </Button>

      {isOpen && (
        <div
          className="fixed top-20 right-4 z-50 w-80 bg-white dark:bg-gray-800 border-2 border-gray-300 dark:border-gray-600 rounded-lg shadow-2xl p-6"
          role="dialog"
          aria-label="Accessibility settings"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold">Accessibility</h2>
            <Button
              onClick={() => setIsOpen(false)}
              variant="ghost"
              size="sm"
              aria-label="Close accessibility settings"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <Label htmlFor="font-size-slider" className="text-base font-semibold">
                  Text Size
                </Label>
                <span className="text-sm font-mono">{fontSize}px</span>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => setFontSize(fontSize - 1)}
                  variant="outline"
                  size="sm"
                  disabled={fontSize <= 14}
                  aria-label="Decrease text size"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <Slider
                  id="font-size-slider"
                  min={14}
                  max={26}
                  step={1}
                  value={[fontSize]}
                  onValueChange={(value) => setFontSize(value[0])}
                  className="flex-1"
                  aria-label="Adjust text size"
                />
                <Button
                  onClick={() => setFontSize(fontSize + 1)}
                  variant="outline"
                  size="sm"
                  disabled={fontSize >= 26}
                  aria-label="Increase text size"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                <Label htmlFor="high-contrast" className="text-base font-semibold">
                  High Contrast
                </Label>
              </div>
              <Switch
                id="high-contrast"
                checked={highContrast}
                onCheckedChange={setHighContrast}
                aria-label="Toggle high contrast mode"
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Volume2 className="h-5 w-5" />
                <Label htmlFor="tts-enabled" className="text-base font-semibold">
                  Read Aloud
                </Label>
              </div>
              <Switch
                id="tts-enabled"
                checked={ttsEnabled}
                onCheckedChange={setTtsEnabled}
                aria-label="Toggle text-to-speech"
              />
            </div>

            <div className="flex items-center justify-between">
              <Label htmlFor="reduced-motion" className="text-base font-semibold">
                Reduce Motion
              </Label>
              <Switch
                id="reduced-motion"
                checked={reducedMotion}
                onCheckedChange={setReducedMotion}
                aria-label="Toggle reduced motion"
              />
            </div>
          </div>

          <p className="text-xs text-gray-600 dark:text-gray-400 mt-6">
            Settings are saved automatically
          </p>
        </div>
      )}
    </>
  )
}
