'use client'

import React, { useState } from 'react'
import { Upload, SearchCheck, CheckCircle } from 'lucide-react'
import { ReadAloudButton } from '@/components/ReadAloudButton'
import { Button } from '@/components/ui/button'
import { UploadModal } from '@/components/UploadModal'

const steps = [
  {
    icon: Upload,
    number: '1',
    title: 'Upload',
    description: 'Snap or upload the suspicious message screenshot.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
  },
  {
    icon: SearchCheck,
    number: '2',
    title: 'Analyze',
    description: "SCAM911 scans it and explains what's risky in plain language.",
    color: 'text-purple-600',
    bgColor: 'bg-purple-100 dark:bg-purple-900/30',
  },
  {
    icon: CheckCircle,
    number: '3',
    title: 'Act',
    description: 'Get recommended actions: block, ignore, report, or share with a trusted contact.',
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
  },
]

export function HowItWorks() {
  const [uploadModalOpen, setUploadModalOpen] = useState(false)

  const sectionText = `How SCAM911 works. ${steps.map(s => `Step ${s.number}: ${s.title}. ${s.description}`).join(' ')}`

  return (
    <section id="how-it-works" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <ReadAloudButton text={sectionText} className="mb-6" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            How SCAM911 works
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={index} className="relative">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg border-2 border-gray-200 dark:border-gray-700 h-full">
                  <div className={`${step.bgColor} rounded-full w-16 h-16 flex items-center justify-center mb-6`}>
                    <Icon className={`h-8 w-8 ${step.color}`} />
                  </div>

                  <div className="mb-4">
                    <span className="text-5xl font-bold text-gray-300 dark:text-gray-600">
                      {step.number}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {step.title}
                  </h3>

                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {step.description}
                  </p>

                  {index === 0 && (
                    <Button
                      onClick={() => setUploadModalOpen(true)}
                      className="mt-6 w-full"
                      size="lg"
                    >
                      Try it now
                    </Button>
                  )}
                </div>

                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-300 dark:bg-gray-600 transform -translate-y-1/2"></div>
                )}
              </div>
            )
          })}
        </div>
      </div>

      <UploadModal open={uploadModalOpen} onOpenChange={setUploadModalOpen} />
    </section>
  )
}
