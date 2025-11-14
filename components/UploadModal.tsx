'use client'

import React, { useState, useCallback } from 'react'
import { Upload, X, Loader2, AlertCircle, CheckCircle } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ReadAloudButton } from '@/components/ReadAloudButton'
import { supabase } from '@/lib/supabase'

interface UploadModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function UploadModal({ open, onOpenChange }: UploadModalProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [altText, setAltText] = useState('')
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file (PNG or JPG)')
      return
    }

    setSelectedFile(file)
    setError(null)

    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleAnalyze = async () => {
    if (!selectedFile) return

    setUploading(true)
    setProgress(0)
    setError(null)

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 10, 90))
    }, 200)

    try {
      const { data: { session } } = await supabase.auth.getSession()

      if (!session) {
        throw new Error('Please login to analyze screenshots')
      }

      const apiUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/analyze-screenshot`

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${session.access_token}`,
          'Content-Type': 'application/json',
        },
      })

      clearInterval(progressInterval)
      setProgress(100)

      if (!response.ok) {
        throw new Error('Analysis failed')
      }

      const data = await response.json()
      setResult(data)
    } catch (err: any) {
      clearInterval(progressInterval)
      setError(err.message || 'Failed to analyze screenshot. Please try again.')
    } finally {
      setUploading(false)
    }
  }

  const handleClose = () => {
    setSelectedFile(null)
    setPreview(null)
    setAltText('')
    setResult(null)
    setError(null)
    setProgress(0)
    onOpenChange(false)
  }

  const modalText = result
    ? `Analysis complete. Risk score: ${result.analysis_score} out of 100. ${result.explanation} Recommended action: ${result.recommended_action}`
    : 'Upload a screenshot of a suspicious message in PNG or JPG format. We will analyze it and return a clear answer in seconds.'

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between mb-2">
            <DialogTitle className="text-2xl md:text-3xl">Check a Message</DialogTitle>
            <ReadAloudButton text={modalText} />
          </div>
          <DialogDescription className="text-base md:text-lg">
            Upload a screenshot (PNG/JPG) or paste message text. We'll analyze it and return a clear answer in seconds.
          </DialogDescription>
        </DialogHeader>

        {!result ? (
          <div className="space-y-6 mt-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-5 w-5" />
                <AlertDescription className="text-base">{error}</AlertDescription>
              </Alert>
            )}

            {!preview ? (
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-4 border-dashed rounded-lg p-12 text-center transition-colors ${
                  dragActive
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-300 dark:border-gray-700'
                }`}
              >
                <Upload className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                  Drag and drop your screenshot here, or
                </p>
                <Label htmlFor="file-upload" className="cursor-pointer">
                  <Button type="button" size="lg" asChild>
                    <span>Choose File</span>
                  </Button>
                </Label>
                <Input
                  id="file-upload"
                  type="file"
                  accept="image/png,image/jpeg,image/jpg"
                  onChange={handleFileInput}
                  className="hidden"
                  aria-label="Upload screenshot file"
                />
              </div>
            ) : (
              <div className="space-y-4">
                <div className="relative">
                  <img
                    src={preview}
                    alt={altText || 'Screenshot preview'}
                    className="w-full rounded-lg border-2 border-gray-300 dark:border-gray-700"
                  />
                  <Button
                    onClick={() => {
                      setPreview(null)
                      setSelectedFile(null)
                    }}
                    variant="destructive"
                    size="sm"
                    className="absolute top-2 right-2"
                    aria-label="Remove screenshot"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                <div>
                  <Label htmlFor="alt-text" className="text-base font-semibold mb-2 block">
                    Describe the message (optional)
                  </Label>
                  <Input
                    id="alt-text"
                    type="text"
                    value={altText}
                    onChange={(e) => setAltText(e.target.value)}
                    placeholder="E.g., Text claiming to be from my bank asking for account details"
                    className="text-base h-14"
                    aria-label="Description of the screenshot"
                  />
                </div>

                {uploading && (
                  <div className="space-y-2" role="status" aria-live="polite">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-semibold">Analyzing...</span>
                      <span className="text-base">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-3" />
                  </div>
                )}

                <Button
                  onClick={handleAnalyze}
                  size="lg"
                  disabled={uploading}
                  className="w-full text-lg py-6 h-auto font-semibold"
                >
                  {uploading ? (
                    <>
                      <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    'Analyze Screenshot'
                  )}
                </Button>
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-6 mt-4">
            <Alert className={result.analysis_score > 70 ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : 'border-green-500 bg-green-50 dark:bg-green-900/20'}>
              {result.analysis_score > 70 ? (
                <AlertCircle className="h-6 w-6 text-red-600" />
              ) : (
                <CheckCircle className="h-6 w-6 text-green-600" />
              )}
              <AlertDescription className="text-base md:text-lg font-semibold">
                Risk Score: {result.analysis_score}/100
              </AlertDescription>
            </Alert>

            <div>
              <h3 className="text-xl font-bold mb-2">What we found:</h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {result.explanation}
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-2">What you should do:</h3>
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {result.recommended_action}
              </p>
            </div>

            <div className="flex gap-4">
              <Button onClick={handleClose} variant="outline" size="lg" className="flex-1 text-base">
                Close
              </Button>
              <Button
                onClick={() => {
                  setResult(null)
                  setPreview(null)
                  setSelectedFile(null)
                  setAltText('')
                }}
                size="lg"
                className="flex-1 text-base"
              >
                Check Another
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
