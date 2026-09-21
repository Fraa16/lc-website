/*
  # Create contact submissions table

  1. New Tables
    - `contact_submissions`
      - `id` (uuid, primary key) - Unique identifier for each submission
      - `vorname` (text) - First name of the contact
      - `nachname` (text) - Last name of the contact
      - `email` (text) - Email address of the contact
      - `telefon` (text, optional) - Phone number of the contact
      - `firma` (text) - Company name
      - `mitarbeiteranzahl` (text, optional) - Number of employees
      - `created_at` (timestamptz) - Timestamp when the submission was created
  
  2. Security
    - Enable RLS on `contact_submissions` table
    - Add policy to allow anyone to insert contact submissions (public form)
    - Add policy to allow authenticated users to read all submissions (for admin access)
*/

CREATE TABLE IF NOT EXISTS contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vorname text NOT NULL,
  nachname text NOT NULL,
  email text NOT NULL,
  telefon text,
  firma text NOT NULL,
  mitarbeiteranzahl text,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert contact submissions"
  ON contact_submissions
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all submissions"
  ON contact_submissions
  FOR SELECT
  TO authenticated
  USING (true);
