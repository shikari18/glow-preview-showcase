/**
 * Admin store — simulates a user registry using localStorage.
 *
 * In a real app this would be backed by a database. Here each user's
 * profile is written by auth-layout on Google sign-in.
 *
 * We keep a separate "examglow.accounts" array so the admin can see all
 * accounts that have ever signed in on this browser.
 */

export type PlanLabel = "free" | "weekly" | "monthly" | "termly" | "exam-pass";

export type AdminAccount = {
  id: string;               // google sub (unique ID) or email-derived ID
  name: string;
  email: string;
  picture: string;
  plan: PlanLabel;
  role: string;
  goal: string;
  signedInAt: string;       // ISO date
  sessionActive: boolean;
};

const ACCOUNTS_KEY = "examglow.accounts";

export function readAccounts(): AdminAccount[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(ACCOUNTS_KEY);
    return raw ? (JSON.parse(raw) as AdminAccount[]) : [];
  } catch {
    return [];
  }
}

export function writeAccounts(accounts: AdminAccount[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
  } catch { /* storage unavailable */ }
}

/** Called by auth-layout after a successful Google sign-in. */
export function registerAccount(account: Omit<AdminAccount, "signedInAt" | "sessionActive">) {
  const accounts = readAccounts();
  const existing = accounts.findIndex(a => a.id === account.id);
  const entry: AdminAccount = {
    ...account,
    signedInAt: new Date().toISOString(),
    sessionActive: true,
  };
  if (existing >= 0) {
    accounts[existing] = entry;
  } else {
    accounts.push(entry);
  }
  writeAccounts(accounts);
}

export function logoutAccount(id: string) {
  const accounts = readAccounts().map(a =>
    a.id === id ? { ...a, sessionActive: false } : a
  );
  writeAccounts(accounts);
}

export function updateAccountPlan(id: string, plan: PlanLabel) {
  const accounts = readAccounts().map(a =>
    a.id === id ? { ...a, plan } : a
  );
  writeAccounts(accounts);
}

export function deleteAccount(id: string) {
  writeAccounts(readAccounts().filter(a => a.id !== id));
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
