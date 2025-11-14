'use client'

import React from 'react'
import { Zap, Phone, Lock } from 'lucide-react'
import { ReadAloudButton } from '@/components/ReadAloudButton'
import { Card, CardContent } from '@/components/ui/card'

const benefits = [
  {
    icon: Zap,
    title: 'Simple & Fast',
    description: 'One tap to check suspicious messages.',
    color: 'text-yellow-600',
    bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
  },
  {
    icon: Phone,
    title: 'Live Call Protection',
    description: 'Detect high-risk calls before things go wrong.',
    color: 'text-blue-600',
    bgColor: 'bg-blue-100 dark:bg-blue-900/30',
  },
  {
    icon: Lock,
    title: 'Privacy-First',
    description: 'We analyze messages safely and only with your consent.',
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
  },
]

export function Benefits() {
  const sectionText = `Why seniors and families trust SCAM911. ${benefits.map(b => `${b.title}: ${b.description}`).join(' ')}`

  return (
    <section id="benefits" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <ReadAloudButton text={sectionText} className="mb-6" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Why seniors and families trust SCAM911
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <Card
                key={index}
                className="border-2 hover:shadow-xl transition-shadow duration-300"
              >
                <CardContent className="p-8 text-center">
                  <div className={`${benefit.bgColor} rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6`}>
                    <Icon className={`h-10 w-10 ${benefit.color}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {benefit.title}
                  </h3>
                  <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
