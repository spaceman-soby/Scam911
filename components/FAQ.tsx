'use client'

import React from 'react'
import { ReadAloudButton } from '@/components/ReadAloudButton'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

const faqs = [
  {
    question: 'What can I upload?',
    answer: 'You can upload screenshots of text messages, emails, or any suspicious communication. We support PNG and JPG image formats. You can also paste text directly into our analyzer.',
  },
  {
    question: 'How accurate is SCAM911?',
    answer: 'SCAM911 uses advanced analysis to detect common scam patterns with high accuracy. However, we always recommend using your judgment and consulting with family members or trusted contacts when in doubt.',
  },
  {
    question: 'Will you record my calls?',
    answer: 'No recordings are stored without permission. Live analysis occurs only with your consent; you must enable permissions on your device. We never store call recordings. We only analyze patterns in real-time to detect potential scams.',
  },
  {
    question: 'Is my information private?',
    answer: 'Yes. We take privacy seriously. All data is encrypted, and we only analyze messages with your explicit consent. We never share your data with third parties, and you can delete your data at any time.',
  },
  {
    question: 'How much does SCAM911 cost?',
    answer: 'SCAM911 offers a free tier that includes basic message scanning. Premium features like live call protection and unlimited scans are available with our paid plans. Sign up free to get started.',
  },
  {
    question: 'Can my family members help me use this?',
    answer: 'Absolutely! SCAM911 is designed to be simple enough for seniors to use independently, but family members can help set up your account and trusted contacts. Your trusted contact can also receive alerts if we detect something suspicious.',
  },
  {
    question: 'What happens if SCAM911 detects a scam?',
    answer: "We'll show you a clear explanation in plain language about why the message or call is risky. You'll get recommended actions like blocking the number, ignoring the message, or reporting it. We can also notify your trusted contact if you've set one up.",
  },
  {
    question: 'Do I need to be tech-savvy to use SCAM911?',
    answer: "Not at all! We've designed SCAM911 specifically for seniors with large buttons, clear text, and voice features. If you can take a photo and tap a button, you can use SCAM911.",
  },
]

export function FAQ() {
  const sectionText = `Frequently asked questions. ${faqs.map(f => `${f.question} ${f.answer}`).join(' ')}`

  return (
    <section id="faq" className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <ReadAloudButton text={sectionText} className="mb-6" />
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Frequently asked questions
          </h2>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg px-6"
            >
              <AccordionTrigger className="text-left text-lg md:text-xl font-semibold text-gray-900 dark:text-white hover:no-underline py-6">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base md:text-lg text-gray-700 dark:text-gray-300 leading-relaxed pb-6">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
