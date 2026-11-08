/*
  # Booking and callback requests on contact_submissions

  The redesigned landing page sends two kinds of requests to the existing
  `contact_submissions` table:

  - "erstgespraech": booking form (name, e-mail, optional phone/company,
    chosen day, time and meeting type)
  - "rueckruf": callback request from the footer (phone number only)

  1. Changes
    - New nullable columns: `name`, `termin_datum`, `termin_uhrzeit`,
      `termin_art`, `quelle`
    - `vorname`, `nachname`, `email`, `firma` are no longer required, because
      the new forms collect a single name field and callbacks only a phone number
    - Check constraint: every row needs at least an e-mail or a phone number

  2. Security
    - Unchanged: RLS stays enabled, anonymous users may only INSERT.
*/

ALTER TABLE contact_submissions
  ADD COLUMN IF NOT EXISTS name text,
  ADD COLUMN IF NOT EXISTS termin_datum date,
  ADD COLUMN IF NOT EXISTS termin_uhrzeit text,
  ADD COLUMN IF NOT EXISTS termin_art text,
  ADD COLUMN IF NOT EXISTS quelle text NOT NULL DEFAULT 'kontaktformular';

ALTER TABLE contact_submissions
  ALTER COLUMN vorname DROP NOT NULL,
  ALTER COLUMN nachname DROP NOT NULL,
  ALTER COLUMN email DROP NOT NULL,
  ALTER COLUMN firma DROP NOT NULL;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'contact_submissions_termin_art_check'
  ) THEN
    ALTER TABLE contact_submissions
      ADD CONSTRAINT contact_submissions_termin_art_check
      CHECK (termin_art IS NULL OR termin_art IN ('video', 'telefon'));
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'contact_submissions_contact_check'
  ) THEN
    ALTER TABLE contact_submissions
      ADD CONSTRAINT contact_submissions_contact_check
      CHECK (email IS NOT NULL OR telefon IS NOT NULL);
  END IF;
END $$;
