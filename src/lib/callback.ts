/**
 * Callback requests ("Rückruf") from the footer.
 *
 * Stored in the existing Supabase table `contact_submissions`
 * (see supabase/migrations for the `quelle` column). Booking itself runs
 * through Calendly (BookingSection), so nothing else is sent from this site.
 */
export async function submitCallback(telefon: string) {
  const { supabase } = await import('./supabase');
  const { error } = await supabase.from('contact_submissions').insert({
    quelle: 'rueckruf',
    telefon: telefon.trim(),
  });
  if (error) throw error;
}
