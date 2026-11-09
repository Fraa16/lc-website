/*
  # Callback requests on contact_submissions

  The redesigned landing page books appointments through Calendly. The only
  thing it still sends to the existing `contact_submissions` table is the
  footer's callback request ("Rückruf"), which carries just a phone number.

  1. Changes
    - New column `quelle` (source of the row), default 'kontaktformular' for
      the old form's rows; callback requests use 'rueckruf'
    - `vorname`, `nachname`, `email`, `firma` are no longer required, because a
      callback request only has a phone number
    - Check constraint: every row needs at least an e-mail or a phone number

  2. Security
    - Unchanged: RLS stays enabled, anonymous users may only INSERT.
*/

ALTER TABLE contact_submissions
  ADD COLUMN IF NOT EXISTS quelle text NOT NULL DEFAULT 'kontaktformular';

ALTER TABLE contact_submissions
  ALTER COLUMN vorname DROP NOT NULL,
  ALTER COLUMN nachname DROP NOT NULL,
  ALTER COLUMN email DROP NOT NULL,
  ALTER COLUMN firma DROP NOT NULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'contact_submissions_contact_check'
  ) THEN
    ALTER TABLE contact_submissions
      ADD CONSTRAINT contact_submissions_contact_check
      CHECK (email IS NOT NULL OR telefon IS NOT NULL);
  END IF;
END $$;
