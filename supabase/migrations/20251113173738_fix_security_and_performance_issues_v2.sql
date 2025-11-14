/*
  # Fix Security and Performance Issues

  ## Overview
  This migration addresses critical security and performance concerns identified in the database schema.

  ## Changes

  ### 1. Add Indexes for Foreign Keys
  - Add index on `analysis_results.user_id` for improved query performance
  - Add index on `trusted_contacts.user_id` for improved query performance

  ### 2. Optimize RLS Policies
  - Update all RLS policies to use `(select auth.uid())` instead of `auth.uid()`
  - This prevents re-evaluation of auth functions for each row, significantly improving performance at scale

  ### 3. Fix Function Search Path
  - Add explicit search_path to `update_updated_at_column` function to prevent security vulnerabilities

  ## Performance Impact
  - Indexes will speed up JOIN operations and foreign key lookups
  - RLS optimization will improve query performance on large datasets
  - Search path fix prevents potential security exploits

  ## Security Impact
  - Prevents search_path manipulation attacks
  - Maintains same security guarantees with better performance
*/

-- ============================================================================
-- STEP 1: Add indexes for foreign keys
-- ============================================================================

-- Index for analysis_results.user_id foreign key
CREATE INDEX IF NOT EXISTS idx_analysis_results_user_id 
  ON analysis_results(user_id);

-- Index for trusted_contacts.user_id foreign key
CREATE INDEX IF NOT EXISTS idx_trusted_contacts_user_id 
  ON trusted_contacts(user_id);

-- ============================================================================
-- STEP 2: Drop existing RLS policies
-- ============================================================================

-- Drop user_preferences policies
DROP POLICY IF EXISTS "Users can view own preferences" ON user_preferences;
DROP POLICY IF EXISTS "Users can insert own preferences" ON user_preferences;
DROP POLICY IF EXISTS "Users can update own preferences" ON user_preferences;

-- Drop analysis_results policies
DROP POLICY IF EXISTS "Users can view own analysis results" ON analysis_results;
DROP POLICY IF EXISTS "Users can insert own analysis results" ON analysis_results;

-- Drop trusted_contacts policies
DROP POLICY IF EXISTS "Users can view own trusted contacts" ON trusted_contacts;
DROP POLICY IF EXISTS "Users can insert own trusted contacts" ON trusted_contacts;
DROP POLICY IF EXISTS "Users can update own trusted contacts" ON trusted_contacts;
DROP POLICY IF EXISTS "Users can delete own trusted contacts" ON trusted_contacts;

-- ============================================================================
-- STEP 3: Create optimized RLS policies with (select auth.uid())
-- ============================================================================

-- user_preferences policies
CREATE POLICY "Users can view own preferences"
  ON user_preferences FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert own preferences"
  ON user_preferences FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update own preferences"
  ON user_preferences FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

-- analysis_results policies
CREATE POLICY "Users can view own analysis results"
  ON analysis_results FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert own analysis results"
  ON analysis_results FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

-- trusted_contacts policies
CREATE POLICY "Users can view own trusted contacts"
  ON trusted_contacts FOR SELECT
  TO authenticated
  USING ((select auth.uid()) = user_id);

CREATE POLICY "Users can insert own trusted contacts"
  ON trusted_contacts FOR INSERT
  TO authenticated
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can update own trusted contacts"
  ON trusted_contacts FOR UPDATE
  TO authenticated
  USING ((select auth.uid()) = user_id)
  WITH CHECK ((select auth.uid()) = user_id);

CREATE POLICY "Users can delete own trusted contacts"
  ON trusted_contacts FOR DELETE
  TO authenticated
  USING ((select auth.uid()) = user_id);

-- ============================================================================
-- STEP 4: Fix function search path vulnerability
-- ============================================================================

-- Drop trigger first
DROP TRIGGER IF EXISTS update_user_preferences_updated_at ON user_preferences;

-- Drop existing function
DROP FUNCTION IF EXISTS update_updated_at_column();

-- Recreate function with explicit search_path for security
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- Recreate trigger on user_preferences
CREATE TRIGGER update_user_preferences_updated_at
  BEFORE UPDATE ON user_preferences
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================================================
-- STEP 5: Add comments for documentation
-- ============================================================================

COMMENT ON INDEX idx_analysis_results_user_id IS 
  'Index to improve JOIN performance on user_id foreign key';

COMMENT ON INDEX idx_trusted_contacts_user_id IS 
  'Index to improve JOIN performance on user_id foreign key';

COMMENT ON FUNCTION update_updated_at_column() IS 
  'Automatically updates updated_at timestamp. Uses explicit search_path for security.';