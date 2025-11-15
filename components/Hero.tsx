'use client'

import React, { useState } from 'react'
import { Shield, Phone, Upload, Bell } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ReadAloudButton } from '@/components/ReadAloudButton'
import { UploadModal } from '@/components/UploadModal'
import Link from 'next/link'

export function Hero() {
  const [uploadModalOpen, setUploadModalOpen] = useState(false)

  const heroText = `Protect the people you love from phone scams — instantly. Upload a suspicious message or let SCAM911 listen during calls. We'll explain in simple words if it's a scam and how to stay safe.`

  return (
    <section id="home" className="relative bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800 py-20 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <div className="mb-6">
              <ReadAloudButton text={heroText} />
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
              Protect the people you love from phone scams — instantly.
            </h1>

            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-10 leading-relaxed">
              Upload a suspicious message or let SCAM911 listen during calls. We'll explain in simple words if it's a scam and how to stay safe.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                onClick={() => setUploadModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-8 py-6 h-auto font-semibold"
              >
                <Upload className="mr-2 h-6 w-6" />
                Check a Message
              </Button>

              <Link href="/signup">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-lg px-8 py-6 h-auto font-semibold w-full sm:w-auto"
                >
                  <Bell className="mr-2 h-6 w-6" />
                  Get Alerts
                </Button>
              </Link>

              <Link href="/signup">
                <Button
                  size="lg"
                  variant="secondary"
                  className="text-lg px-8 py-6 h-auto font-semibold w-full sm:w-auto"
                >
                  Sign Up Free
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="relative bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-3xl p-8 shadow-2xl">
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Phone className="h-8 w-8 text-red-500" />
                  <div className="flex-1">
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
                    <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="bg-yellow-50 dark:bg-yellow-900/20 border-l-4 border-yellow-400 p-4 rounded">
                  <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">
                    Suspicious message detected
                  </p>
                </div>
              </div>

              <div className="absolute -top-4 -right-4 bg-green-500 rounded-full p-4 shadow-lg animate-pulse">
                <Shield className="h-12 w-12 text-white" />
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 bg-white dark:bg-gray-800 rounded-xl p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 dark:bg-green-900/30 rounded-full p-2">
                  <Shield className="h-6 w-6 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">Protected</p>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Real-time scanning</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <UploadModal open={uploadModalOpen} onOpenChange={setUploadModalOpen} />
    </section>
  )
}
