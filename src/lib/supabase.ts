/**
 * Thin Supabase REST wrapper using plain fetch — no SDK, no WebSockets,
 * works everywhere including Cloudflare Workers and browsers.
 */

const URL_KEY = "VITE_SUPABASE_URL";
const ANON_KEY = "VITE_SUPABASE_ANON_KEY";

function getConfig(): { url: string; key: string } | null {
  const url = import.meta.env[URL_KEY] as string | undefined;
  const key = import.meta.env[ANON_KEY] as string | undefined;
  if (!url || !key || url.includes("YOUR_PROJECT")) return null;
  return { url, key };
}

export function isSupabaseConfigured(): boolean {
  return getConfig() !== null;
}

function headers(key: string) {
  return {
    "Content-Type": "application/json",
    "apikey": key,
    "Authorization": `Bearer ${key}`,
    "Prefer": "return=minimal",
  };
}

/** SELECT * FROM table ORDER BY col DESC */
export async function dbSelect<T>(table: string, orderBy?: string): Promise<T[]> {
  const cfg = getConfig();
  if (!cfg) return [];
  const url = `${cfg.url}/rest/v1/${table}?select=*${orderBy ? `&order=${orderBy}.desc` : ""}`;
  const res = await fetch(url, {
    method: "GET",
    headers: { ...headers(cfg.key), "Accept": "application/json" },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase SELECT failed (${res.status}): ${text}`);
  }
  return res.json() as Promise<T[]>;
}

/** UPSERT a row (insert or update on conflict) */
export async function dbUpsert(table: string, row: Record<string, unknown>): Promise<void> {
  const cfg = getConfig();
  if (!cfg) return;
  const res = await fetch(`${cfg.url}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      ...headers(cfg.key),
      "Prefer": "resolution=merge-duplicates,return=minimal",
    },
    body: JSON.stringify(row),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase UPSERT failed (${res.status}): ${text}`);
  }
}

/** UPDATE rows matching a filter */
export async function dbUpdate(
  table: string,
  filter: Record<string, string>,
  patch: Record<string, unknown>,
): Promise<void> {
  const cfg = getConfig();
  if (!cfg) return;
  const qs = Object.entries(filter).map(([k, v]) => `${k}=eq.${encodeURIComponent(v)}`).join("&");
  const res = await fetch(`${cfg.url}/rest/v1/${table}?${qs}`, {
    method: "PATCH",
    headers: headers(cfg.key),
    body: JSON.stringify(patch),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase UPDATE failed (${res.status}): ${text}`);
  }
}

/** DELETE rows matching a filter */
export async function dbDelete(
  table: string,
  filter: Record<string, string>,
): Promise<void> {
  const cfg = getConfig();
  if (!cfg) return;
  const qs = Object.entries(filter).map(([k, v]) => `${k}=eq.${encodeURIComponent(v)}`).join("&");
  const res = await fetch(`${cfg.url}/rest/v1/${table}?${qs}`, {
    method: "DELETE",
    headers: headers(cfg.key),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase DELETE failed (${res.status}): ${text}`);
  }
}
