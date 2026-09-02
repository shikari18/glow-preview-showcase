import { isSupabaseConfigured, dbSelect, dbUpsert, dbUpdate, dbDelete } from "./supabase";

export type PlanLabel = "free" | "weekly" | "monthly" | "termly" | "exam-pass";

export type AdminAccount = {
  id: string;
  name: string;
  email: string;
  picture: string;
  plan: PlanLabel;
  role: string;
  goal: string;
  signedInAt: string;
  sessionActive: boolean;
};

// ─── localStorage fallback ────────────────────────────────────────────────────

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

// ─── DB row shape ─────────────────────────────────────────────────────────────

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

export async function registerAccount(
  account: Omit<AdminAccount, "signedInAt" | "sessionActive">,
) {
  const row = {
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

  if (isSupabaseConfigured()) {
    await dbUpsert("examglow_accounts", row);
  } else {
    const accounts = localRead();
    const idx = accounts.findIndex(a => a.id === account.id);
    const entry: AdminAccount = { ...account, signedInAt: row.signed_in_at, sessionActive: true };
    if (idx >= 0) accounts[idx] = entry; else accounts.push(entry);
    localWrite(accounts);
  }
}

export async function fetchAccounts(): Promise<AdminAccount[]> {
  if (isSupabaseConfigured()) {
    const rows = await dbSelect<DbRow>("examglow_accounts", "signed_in_at");
    return rows.map(rowToAccount);
  }
  return localRead();
}

export async function logoutAccount(id: string) {
  if (isSupabaseConfigured()) {
    await dbUpdate("examglow_accounts", { id }, { session_active: false });
  } else {
    localWrite(localRead().map(a => a.id === id ? { ...a, sessionActive: false } : a));
  }
}

export async function updateAccountPlan(id: string, plan: PlanLabel) {
  if (isSupabaseConfigured()) {
    await dbUpdate("examglow_accounts", { id }, { plan });
  } else {
    localWrite(localRead().map(a => a.id === id ? { ...a, plan } : a));
  }
}

export async function deleteAccount(id: string) {
  if (isSupabaseConfigured()) {
    await dbDelete("examglow_accounts", { id });
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
