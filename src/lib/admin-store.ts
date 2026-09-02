/**
 * Admin store — persists to Supabase so every user's sign-in appears
 * in the admin panel regardless of device.
 *
 * Falls back to localStorage when Supabase env vars are not configured,
 * so local development still works.
 */

import { getSupabase } from "./supabase";

export type PlanLabel = "free" | "weekly" | "monthly" | "termly" | "exam-pass";

export type AdminAccount = {
  id: string;            // Google sub (unique user ID)
  name: string;
  email: string;
  picture: string;
  plan: PlanLabel;
  role: string;
  goal: string;
  signedInAt: string;    // ISO date string
  sessionActive: boolean;
};

// ─── localStorage fallback (used when Supabase is not configured) ─────────────

const LOCAL_KEY = "examglow.accounts";

function localRead(): AdminAccount[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(LOCAL_KEY);
    return raw ? (JSON.parse(raw) as AdminAccount[]) : [];
  } catch { return []; }
}

function localWrite(accounts: AdminAccount[]) {
  if (typeof window === "undefined") return;
  try { window.localStorage.setItem(LOCAL_KEY, JSON.stringify(accounts)); }
  catch { /* storage unavailable */ }
}

// ─── Supabase row shape ───────────────────────────────────────────────────────

type DbRow = {
  id: string;
  name: string;
  email: string;
  picture: string;
  plan: string;
  role: string;
  goal: string;
  signed_in_at: string;
  session_active: boolean;
};

function rowToAccount(r: DbRow): AdminAccount {
  return {
    id: r.id,
    name: r.name,
    email: r.email,
    picture: r.picture ?? "",
    plan: r.plan as PlanLabel,
    role: r.role ?? "",
    goal: r.goal ?? "",
    signedInAt: r.signed_in_at,
    sessionActive: r.session_active,
  };
}

// ─── Public API ───────────────────────────────────────────────────────────────

/** Register or update a user in Supabase (called on every Google sign-in). */
export async function registerAccount(
  account: Omit<AdminAccount, "signedInAt" | "sessionActive">,
) {
  const sb = getSupabase();

  const entry = {
    id: account.id,
    name: account.name,
    email: account.email,
    picture: account.picture,
    plan: account.plan,
    role: account.role,
    goal: account.goal,
    signed_in_at: new Date().toISOString(),
    session_active: true,
  };

  if (sb) {
    // upsert — insert if new, update signed_in_at + session_active if existing
    await sb
      .from("examglow_accounts")
      .upsert(entry, { onConflict: "id" });
  } else {
    // localStorage fallback
    const accounts = localRead();
    const idx = accounts.findIndex(a => a.id === account.id);
    const localEntry: AdminAccount = { ...account, signedInAt: entry.signed_in_at, sessionActive: true };
    if (idx >= 0) accounts[idx] = localEntry; else accounts.push(localEntry);
    localWrite(accounts);
  }
}

/** Fetch all accounts (admin only). */
export async function fetchAccounts(): Promise<AdminAccount[]> {
  const sb = getSupabase();
  if (sb) {
    const { data, error } = await sb
      .from("examglow_accounts")
      .select("*")
      .order("signed_in_at", { ascending: false });
    if (error) throw error;
    return (data as DbRow[]).map(rowToAccount);
  }
  return localRead();
}

/** Mark a user's session as inactive (force sign-out from admin). */
export async function logoutAccount(id: string) {
  const sb = getSupabase();
  if (sb) {
    await sb
      .from("examglow_accounts")
      .update({ session_active: false })
      .eq("id", id);
  } else {
    localWrite(localRead().map(a => a.id === id ? { ...a, sessionActive: false } : a));
  }
}

/** Change a user's plan tier. */
export async function updateAccountPlan(id: string, plan: PlanLabel) {
  const sb = getSupabase();
  if (sb) {
    await sb
      .from("examglow_accounts")
      .update({ plan })
      .eq("id", id);
  } else {
    localWrite(localRead().map(a => a.id === id ? { ...a, plan } : a));
  }
}

/** Permanently delete an account from the registry. */
export async function deleteAccount(id: string) {
  const sb = getSupabase();
  if (sb) {
    await sb
      .from("examglow_accounts")
      .delete()
      .eq("id", id);
  } else {
    localWrite(localRead().filter(a => a.id !== id));
  }
}

export const PLAN_LABELS: Record<PlanLabel, string> = {
  free: "Free",
  weekly: "Weekly",
  monthly: "Monthly",
  termly: "Termly",
  "exam-pass": "Exam Pass",
};

export const PLAN_PRICES: Record<PlanLabel, string> = {
  free: "£0",
  weekly: "£4.99/wk",
  monthly: "£14.99/mo",
  termly: "£39.99/term",
  "exam-pass": "£79.99",
};
