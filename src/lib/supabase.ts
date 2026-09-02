import { createClient } from "@supabase/supabase-js";

// Singleton client — created once, reused everywhere
let _client: ReturnType<typeof createClient> | null = null;

/**
 * Returns a configured Supabase client, or null if:
 * - env vars aren't set
 * - we're running server-side (SSR)
 */
export function getSupabase() {
  // Never run on the server — Supabase calls must be client-side only
  if (typeof window === "undefined") return null;

  const url = import.meta.env["VITE_SUPABASE_URL"] as string | undefined;
  const key = import.meta.env["VITE_SUPABASE_ANON_KEY"] as string | undefined;

  if (!url || !key || url.includes("YOUR_PROJECT")) return null;

  if (!_client) {
    _client = createClient(url, key, {
      auth: { persistSession: false },
    });
  }
  return _client;
}
