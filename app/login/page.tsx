'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Shield, Phone, Eye, EyeOff, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { ReadAloudButton } from '@/components/ReadAloudButton'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const pageText = "Welcome back to SCAM911. Login to check messages and protect yourself from scams."

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const { data, error: loginError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (loginError) throw loginError

      router.push('/')
    } catch (err: any) {
      if (err.message?.includes('Invalid login credentials')) {
        setError('Invalid email or password. Please try again.')
      } else if (err.message?.includes('Email not confirmed')) {
        setError('Please confirm your email before logging in.')
      } else {
        setError(err.message || 'Failed to login. Please check your credentials.')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-md mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 border-2 border-gray-200 dark:border-gray-700">
          <div className="flex flex-col items-center mb-8">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="relative">
                <Shield className="h-12 w-12 text-blue-600 dark:text-blue-400" />
                <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400 absolute bottom-0 right-0" />
              </div>
              <span className="text-3xl font-bold text-gray-900 dark:text-white">
                SCAM911
              </span>
            </Link>
            <ReadAloudButton text={pageText} />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 text-center">
            Welcome back
          </h1>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 text-center leading-relaxed">
            Login to check messages and protect yourself.
          </p>

          {error && (
            <Alert variant="destructive" className="mb-6" role="alert" aria-live="assertive">
              <AlertDescription className="text-base">{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <Label htmlFor="email" className="text-base font-semibold mb-2 block">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-base h-14"
                placeholder="john@example.com"
                aria-required="true"
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-base font-semibold mb-2 block">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="text-base h-14 pr-12"
                  placeholder="Enter your password"
                  aria-required="true"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </Button>
              </div>
            </div>

            <div className="text-right">
              <Link
                href="#"
                className="text-base text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold"
              >
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              size="lg"
              disabled={loading}
              className="w-full text-lg py-6 h-auto font-semibold"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Login'
              )}
            </Button>
          </form>

          <p className="text-center text-base text-gray-600 dark:text-gray-400 mt-6">
            Don't have an account?{' '}
            <Link href="/signup" className="text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 font-semibold underline">
              Sign Up Free
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
