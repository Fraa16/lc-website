import { supabase } from './supabase';

export interface ContactPayload {
  vorname: string;
  nachname: string | null;
  email: string;
  telefon: string | null;
  firma: string | null;
  mitarbeiteranzahl: string | null;
  /** Which form the lead came from. Requires the 20260921120000 migration. */
  source: string;
}

export const GENERIC_SUBMIT_ERROR =
  'Ihre Anfrage konnte nicht übermittelt werden. Bitte versuchen Sie es erneut.';

export async function submitContact(payload: ContactPayload): Promise<void> {
  if (!supabase) throw new Error(GENERIC_SUBMIT_ERROR);

  const { error } = await supabase.from('contact_submissions').insert([payload]);

  if (error) {
    // Surface the real reason in dev; visitors only ever see the generic copy.
    if (import.meta.env.DEV) console.error('[lc] contact submit failed:', error);
    throw new Error(GENERIC_SUBMIT_ERROR);
  }
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());
}

/** Normalises an empty string to null so the column stays clean. */
export function orNull(value: string): string | null {
  const trimmed = value.trim();
  return trimmed === '' ? null : trimmed;
}
