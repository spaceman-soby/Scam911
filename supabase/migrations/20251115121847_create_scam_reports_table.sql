/*
  # Create scam reports table

  1. New Tables
    - `scam_reports`
      - `id` (uuid, primary key) - Unique identifier for each report
      - `user_id` (uuid, foreign key) - References auth.users table
      - `image_title` (text) - Title or name of the uploaded image
      - `description` (text) - User's description of the suspicious message
      - `risk_score` (integer) - Risk assessment score (0-100)
      - `image_url` (text) - URL to the uploaded image in storage
      - `labels` (text array) - Array of detected scam indicators
      - `explanation` (text) - Detailed explanation of the analysis
      - `recommended_action` (text) - What the user should do
      - `created_at` (timestamptz) - Timestamp when report was created
      - `updated_at` (timestamptz) - Timestamp when report was last updated

  2. Security
    - Enable RLS on `scam_reports` table
    - Add policy for users to read their own reports
    - Add policy for users to insert their own reports
    - Add policy for users to update their own reports
    - Add policy for users to delete their own reports

  3. Indexes
    - Index on user_id for faster queries
    - Index on created_at for sorting
*/

CREATE TABLE IF NOT EXISTS scam_reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  image_title text NOT NULL DEFAULT '',
  description text DEFAULT '',
  risk_score integer NOT NULL CHECK (risk_score >= 0 AND risk_score <= 100),
  image_url text DEFAULT '',
  labels text[] DEFAULT '{}',
  explanation text DEFAULT '',
  recommended_action text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE scam_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own scam reports"
  ON scam_reports FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own scam reports"
  ON scam_reports FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own scam reports"
  ON scam_reports FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own scam reports"
  ON scam_reports FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE INDEX IF NOT EXISTS idx_scam_reports_user_id ON scam_reports(user_id);
CREATE INDEX IF NOT EXISTS idx_scam_reports_created_at ON scam_reports(created_at DESC);

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_scam_reports_updated_at
  BEFORE UPDATE ON scam_reports
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
