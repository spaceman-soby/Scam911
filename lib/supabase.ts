import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type UserPreferences = {
  id: string
  user_id: string
  font_size: number
  high_contrast: boolean
  reduced_motion: boolean
  tts_enabled: boolean
  tts_language: string
  created_at: string
  updated_at: string
}

export type AnalysisResult = {
  id: string
  user_id: string | null
  image_url: string | null
  analysis_score: number | null
  labels: any
  explanation: string
  recommended_action: string
  consented: boolean
  created_at: string
}

export type TrustedContact = {
  id: string
  user_id: string
  contact_name: string
  contact_email: string | null
  contact_phone: string | null
  created_at: string
}
