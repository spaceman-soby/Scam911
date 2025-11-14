'use client'

import React from 'react'
import Link from 'next/link'
import { Shield, Phone, Facebook, Twitter, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Stay protected.</h2>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/signup">
              <Button
                size="lg"
                className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-10 py-6 h-auto font-semibold"
              >
                Sign Up Free
              </Button>
            </Link>
            <div className="text-lg">
              Already have an account?{' '}
              <Link href="/login" className="text-blue-400 hover:text-blue-300 underline font-semibold">
                Login
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-12">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-4">
                <div className="relative">
                  <Shield className="h-8 w-8 text-blue-400" />
                  <Phone className="h-4 w-4 text-blue-400 absolute bottom-0 right-0" />
                </div>
                <span className="text-2xl font-bold">SCAM911</span>
              </Link>
              <p className="text-gray-400 text-base leading-relaxed">
                Protecting seniors and families from phone scams with simple, accessible technology.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Product</h3>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-gray-400 hover:text-white text-base transition-colors"
                  >
                    How it works
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-gray-400 hover:text-white text-base transition-colors"
                  >
                    Benefits
                  </button>
                </li>
                <li>
                  <Link href="/signup" className="text-gray-400 hover:text-white text-base transition-colors">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Support</h3>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => document.getElementById('faq')?.scrollIntoView({ behavior: 'smooth' })}
                    className="text-gray-400 hover:text-white text-base transition-colors"
                  >
                    FAQ
                  </button>
                </li>
                <li>
                  <a href="mailto:support@scam911.com" className="text-gray-400 hover:text-white text-base transition-colors">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-base transition-colors">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-3">
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-base transition-colors">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-base transition-colors">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-white text-base transition-colors">
                    Security
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
            <p className="text-gray-400 text-base mb-4 md:mb-0">
              © 2025 SCAM911. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-6 w-6" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="h-6 w-6" />
              </a>
              <a
                href="mailto:support@scam911.com"
                className="text-gray-400 hover:text-white transition-colors"
                aria-label="Email"
              >
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
