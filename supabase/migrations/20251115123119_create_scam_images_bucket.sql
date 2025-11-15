/*
  # Create storage bucket for scam report images

  1. Storage
    - Create `scam-images` bucket for storing uploaded screenshots
    - Set bucket to private (users can only access their own images)

  2. Security
    - Enable RLS on storage bucket
    - Add policy for authenticated users to upload their own images
    - Add policy for authenticated users to read their own images
    - Add policy for authenticated users to delete their own images
*/

INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'scam-images',
  'scam-images',
  false,
  5242880,
  ARRAY['image/png', 'image/jpeg', 'image/jpg']
)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Users can upload own scam images"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (
    bucket_id = 'scam-images' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can read own scam images"
  ON storage.objects FOR SELECT
  TO authenticated
  USING (
    bucket_id = 'scam-images' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can delete own scam images"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (
    bucket_id = 'scam-images' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );
