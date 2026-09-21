/*
  # Align contact_submissions with what the site actually sends

  ## Problem
  `FooterCTASection` inserts a `source` column that does not exist on the
  table, and passes `firma: null` into a NOT NULL column. Both are rejected by
  PostgREST, so *every* submission from the footer quick-contact form fails and
  the visitor is shown a generic browser alert. Only the main form works.

  ## Changes
  1. `source` (text) — added, so submissions can be attributed to the form
     they came from. Defaults to 'contact_form' for existing rows.
  2. `firma` — NOT NULL dropped. The footer form only asks for name, e-mail
     and phone, so a company name genuinely is not available there.
  3. `nachname` — NOT NULL dropped for the same reason: the footer form splits
     a single free-text name field, and a visitor may enter only one word.
  4. Index on `created_at` for the admin listing.

  ## Security
  Unchanged. RLS stays enabled; the existing anon-insert and
  authenticated-select policies still apply.
*/

ALTER TABLE contact_submissions
  ADD COLUMN IF NOT EXISTS source text NOT NULL DEFAULT 'contact_form';

ALTER TABLE contact_submissions
  ALTER COLUMN firma DROP NOT NULL;

ALTER TABLE contact_submissions
  ALTER COLUMN nachname DROP NOT NULL;

CREATE INDEX IF NOT EXISTS contact_submissions_created_at_idx
  ON contact_submissions (created_at DESC);
