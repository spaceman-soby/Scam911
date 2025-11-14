/*
  # SCAM911 Database Schema

  ## Overview
  Creates tables for user preferences, screenshot analysis results, and trusted contacts.
  All tables have RLS enabled for security.

  ## New Tables
  
  ### user_preferences
  - id (uuid, primary key)
  - user_id (uuid, references auth.users)
  - font_size (integer) - stored font size preference (14-26px)
  - high_contrast (boolean) - high contrast mode enabled
  - reduced_motion (boolean) - reduced motion preference
  - tts_enabled (boolean) - text-to-speech enabled by default
  - tts_language (text) - preferred TTS language (default: en-IN)
  - created_at (timestamptz)
  - updated_at (timestamptz)

  ### analysis_results
  - id (uuid, primary key)
  - user_id (uuid, references auth.users)
  - image_url (text) - stored screenshot reference
  - analysis_score (numeric) - risk score 0-100
  - labels (jsonb) - detected labels/categories
  - explanation (text) - plain language explanation
  - recommended_action (text) - what user should do
  - consented (boolean) - user consented to analysis
  - created_at (timestamptz)

  ### trusted_contacts
  - id (uuid, primary key)
  - user_id (uuid, references auth.users)
  - contact_name (text)
  - contact_email (text)
  - contact_phone (text)
  - created_at (timestamptz)

  ## Security
  - RLS enabled on all tables
  - Users can only access their own data
  - All policies check authentication and ownership
*/

-- Create user_preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  font_size integer DEFAULT 18 CHECK (font_size >= 14 AND font_size <= 26),
  high_contrast boolean DEFAULT false,
  reduced_motion boolean DEFAULT false,
  tts_enabled boolean DEFAULT true,
  tts_language text DEFAULT 'en-IN',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own preferences"
  ON user_preferences FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences"
  ON user_preferences FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences"
  ON user_preferences FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create analysis_results table
CREATE TABLE IF NOT EXISTS analysis_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  image_url text,
  analysis_score numeric CHECK (analysis_score >= 0 AND analysis_score <= 100),
  labels jsonb DEFAULT '[]'::jsonb,
  explanation text DEFAULT '',
  recommended_action text DEFAULT '',
  consented boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE analysis_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own analysis results"
  ON analysis_results FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own analysis results"
  ON analysis_results FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create trusted_contacts table
CREATE TABLE IF NOT EXISTS trusted_contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  contact_name text NOT NULL,
  contact_email text,
  contact_phone text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE trusted_contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own trusted contacts"
  ON trusted_contacts FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own trusted contacts"
  ON trusted_contacts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own trusted contacts"
  ON trusted_contacts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own trusted contacts"
  ON trusted_contacts FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add trigger to user_preferences
CREATE TRIGGER update_user_preferences_updated_at
  BEFORE UPDATE ON user_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();