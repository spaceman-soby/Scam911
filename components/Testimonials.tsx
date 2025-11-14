'use client'

import React from 'react'
import { Star } from 'lucide-react'
import { ReadAloudButton } from '@/components/ReadAloudButton'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

const testimonials = [
  {
    name: 'Margaret',
    age: 72,
    initials: 'MJ',
    quote: "I was about to send money to someone claiming to be my grandson. SCAM911 caught it just in time. I'm so grateful.",
    rating: 5,
  },
  {
    name: 'Robert',
    age: 68,
    initials: 'RK',
    quote: "Simple to use and gives me peace of mind. My daughter set it up for me, and now I check every suspicious call or text.",
    rating: 5,
  },
  {
    name: 'Dorothy',
    age: 75,
    initials: 'DW',
    quote: "The voice feature reads everything to me. Finally, a tech tool that actually helps seniors like me stay safe.",
    rating: 5,
  },
]

export function Testimonials() {
  const sectionText = `What our users say. ${testimonials.map(t => `${t.name}, age ${t.age} says: ${t.quote}`).join(' ')}`

  return (
    <section id="testimonials" className="py-20 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <ReadAloudButton text={sectionText} className="mb-6" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            What our users say
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-2 hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <Avatar className="h-16 w-16 text-xl">
                    <AvatarFallback className="bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 font-bold">
                      {testimonial.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </h3>
                    <p className="text-base text-gray-600 dark:text-gray-400">
                      Age {testimonial.age}
                    </p>
                  </div>
                </div>

                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <blockquote className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed italic">
                  "{testimonial.quote}"
                </blockquote>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
