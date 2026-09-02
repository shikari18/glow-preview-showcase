import { createClient } from "@supabase/supabase-js";

const url = import.meta.env["VITE_SUPABASE_URL"] as string | undefined;
const key = import.meta.env["VITE_SUPABASE_ANON_KEY"] as string | undefined;

/**
 * Returns a configured Supabase client, or null if env vars aren't set yet.
 * The app still works without Supabase — it just won't persist to the DB.
 */
export function getSupabase() {
  if (!url || !key || url.includes("YOUR_PROJECT")) return null;
  return createClient(url, key);
}
