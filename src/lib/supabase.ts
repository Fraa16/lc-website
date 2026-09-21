import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

/**
 * `createClient` throws when the env vars are missing, which took the entire
 * page down with a blank screen rather than just disabling the forms. Guard
 * the construction so a misconfigured deploy still renders the site.
 */
export const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : null;

if (!supabase && import.meta.env.DEV) {
  console.warn(
    '[lc] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are not set — contact forms are disabled.'
  );
}
