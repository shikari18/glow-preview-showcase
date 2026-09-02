import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Users,
  Mail,
  LogOut,
  Trash2,
  Search,
  Crown,
  ShieldCheck,
  RefreshCw,
  X,
  Send,
  ChevronDown,
} from "lucide-react";

import logoMark from "@/assets/logo-mark.png";
import {
  readAccounts,
  logoutAccount,
  updateAccountPlan,
  deleteAccount,
  PLAN_LABELS,
  PLAN_PRICES,
  type AdminAccount,
  type PlanLabel,
} from "@/lib/admin-store";

// ─── Route ────────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [{ title: "Admin — ExamGlow" }],
  }),
  component: AdminPage,
});

// ─── Constants ────────────────────────────────────────────────────────────────

const ADMIN_PASSWORD = "examglow-admin-2026";
const PLANS = Object.keys(PLAN_LABELS) as PlanLabel[];

// ─── Email Modal ──────────────────────────────────────────────────────────────

function EmailModal({
  account,
  onClose,
}: {
  account: AdminAccount;
  onClose: () => void;
}) {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [sent, setSent] = useState(false);

  function send() {
    if (!subject.trim() || !body.trim()) return;
    // In a real app this would call an API. Here we just simulate it.
    const mailtoLink = `mailto:${account.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(mailtoLink, "_blank");
    setSent(true);
    setTimeout(onClose, 1500);
  }

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-2xl bg-white shadow-2xl dark:bg-zinc-900">
        <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 dark:border-zinc-700">
          <div>
            <p className="text-sm font-semibold">Send email to {account.name}</p>
            <p className="text-xs text-zinc-500">{account.email}</p>
          </div>
          <button onClick={onClose} className="rounded-full p-1.5 hover:bg-zinc-100 dark:hover:bg-zinc-800">
            <X className="size-4" />
          </button>
        </div>
        <div className="space-y-3 p-5">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-500">Subject</label>
            <input
              value={subject}
              onChange={e => setSubject(e.target.value)}
              placeholder="Subject line…"
              className="w-full rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200 dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-zinc-500">Message</label>
            <textarea
              value={body}
              onChange={e => setBody(e.target.value)}
              rows={5}
              placeholder="Write your message…"
              className="w-full resize-none rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2.5 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200 dark:border-zinc-700 dark:bg-zinc-800"
            />
          </div>
        </div>
        <div className="flex justify-end gap-3 border-t border-zinc-200 px-5 py-4 dark:border-zinc-700">
          <button onClick={onClose} className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-800">
            Cancel
          </button>
          <button
            onClick={send}
            disabled={sent || !subject.trim() || !body.trim()}
            className="flex items-center gap-2 rounded-full bg-violet-600 px-4 py-2 text-sm font-medium text-white hover:bg-violet-700 disabled:opacity-50"
          >
            <Send className="size-3.5" />
            {sent ? "Opened mail client" : "Send email"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Plan Badge ───────────────────────────────────────────────────────────────

const planColor: Record<PlanLabel, string> = {
  free: "bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400",
  weekly: "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  monthly: "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  termly: "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  "exam-pass": "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
};

function PlanBadge({ plan }: { plan: PlanLabel }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ${planColor[plan]}`}>
      {plan !== "free" && <Crown className="size-3" />}
      {PLAN_LABELS[plan]}
      <span className="opacity-60">· {PLAN_PRICES[plan]}</span>
    </span>
  );
}

// ─── User Row ─────────────────────────────────────────────────────────────────

function UserRow({
  account,
  onLogout,
  onDelete,
  onPlanChange,
  onEmail,
}: {
  account: AdminAccount;
  onLogout: () => void;
  onDelete: () => void;
  onPlanChange: (plan: PlanLabel) => void;
  onEmail: () => void;
}) {
  const [planOpen, setPlanOpen] = useState(false);

  return (
    <tr className="border-b border-zinc-100 transition-colors hover:bg-zinc-50/50 dark:border-zinc-800 dark:hover:bg-zinc-800/30">
      {/* Avatar + name */}
      <td className="py-3.5 pl-4 pr-3">
        <div className="flex items-center gap-3">
          <img
            src={account.picture || logoMark}
            alt={account.name}
            referrerPolicy="no-referrer"
            width={36}
            height={36}
            className="size-9 shrink-0 rounded-full object-cover"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">{account.name}</p>
            <p className="truncate text-xs text-zinc-500">{account.email}</p>
          </div>
        </div>
      </td>

      {/* Plan */}
      <td className="px-3 py-3.5">
        <div className="relative inline-block">
          <button
            type="button"
            onClick={() => setPlanOpen(v => !v)}
            className="flex items-center gap-1"
          >
            <PlanBadge plan={account.plan} />
            <ChevronDown className="size-3.5 text-zinc-400" />
          </button>
          {planOpen && (
            <div className="absolute left-0 top-8 z-10 w-44 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
              {PLANS.map(p => (
                <button
                  key={p}
                  type="button"
                  onClick={() => { onPlanChange(p); setPlanOpen(false); }}
                  className={`flex w-full items-center gap-2 px-3 py-2 text-xs font-medium transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800 ${p === account.plan ? "text-violet-600" : ""}`}
                >
                  {p !== "free" && <Crown className="size-3 text-amber-500" />}
                  {PLAN_LABELS[p]} — {PLAN_PRICES[p]}
                </button>
              ))}
            </div>
          )}
        </div>
      </td>

      {/* Role & Goal */}
      <td className="px-3 py-3.5 text-sm text-zinc-500">
        <p>{account.role || <span className="italic opacity-50">—</span>}</p>
        <p className="text-xs">{account.goal || ""}</p>
      </td>

      {/* Session */}
      <td className="px-3 py-3.5">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
            account.sessionActive
              ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300"
              : "bg-zinc-100 text-zinc-500 dark:bg-zinc-800"
          }`}
        >
          <span
            className={`size-1.5 rounded-full ${account.sessionActive ? "bg-emerald-500" : "bg-zinc-400"}`}
          />
          {account.sessionActive ? "Active" : "Signed out"}
        </span>
      </td>

      {/* Signed in */}
      <td className="px-3 py-3.5 text-xs text-zinc-400">
        {new Date(account.signedInAt).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </td>

      {/* Actions */}
      <td className="py-3.5 pl-3 pr-4">
        <div className="flex items-center gap-1">
          <button
            type="button"
            title="Send email"
            onClick={onEmail}
            className="flex size-8 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-800 dark:hover:bg-zinc-800 dark:hover:text-zinc-200"
          >
            <Mail className="size-4" />
          </button>
          {account.sessionActive && (
            <button
              type="button"
              title="Force sign out"
              onClick={onLogout}
              className="flex size-8 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-amber-50 hover:text-amber-600 dark:hover:bg-amber-900/20"
            >
              <LogOut className="size-4" />
            </button>
          )}
          <button
            type="button"
            title="Delete account"
            onClick={onDelete}
            className="flex size-8 items-center justify-center rounded-lg text-zinc-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
          >
            <Trash2 className="size-4" />
          </button>
        </div>
      </td>
    </tr>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [authError, setAuthError] = useState(false);

  const [accounts, setAccounts] = useState<AdminAccount[]>([]);
  const [search, setSearch] = useState("");
  const [planFilter, setPlanFilter] = useState<PlanLabel | "all">("all");
  const [emailTarget, setEmailTarget] = useState<AdminAccount | null>(null);

  // Load accounts once authenticated
  useEffect(() => {
    if (authed) setAccounts(readAccounts());
  }, [authed]);

  function login(e: React.FormEvent) {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setAuthed(true);
      setAuthError(false);
    } else {
      setAuthError(true);
    }
  }

  function refresh() {
    setAccounts(readAccounts());
  }

  function handleLogout(id: string) {
    logoutAccount(id);
    setAccounts(prev => prev.map(a => a.id === id ? { ...a, sessionActive: false } : a));
  }

  function handleDelete(id: string) {
    if (!window.confirm("Permanently delete this account?")) return;
    deleteAccount(id);
    setAccounts(prev => prev.filter(a => a.id !== id));
  }

  function handlePlanChange(id: string, plan: PlanLabel) {
    updateAccountPlan(id, plan);
    setAccounts(prev => prev.map(a => a.id === id ? { ...a, plan } : a));
  }

  const filtered = accounts.filter(a => {
    const matchSearch =
      !search.trim() ||
      a.name.toLowerCase().includes(search.toLowerCase()) ||
      a.email.toLowerCase().includes(search.toLowerCase());
    const matchPlan = planFilter === "all" || a.plan === planFilter;
    return matchSearch && matchPlan;
  });

  // Stats
  const activeCount = accounts.filter(a => a.sessionActive).length;
  const paidCount = accounts.filter(a => a.plan !== "free").length;

  // ─── Auth gate ───────────────────────────────────────────────────────────────
  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-50 px-4 dark:bg-zinc-950">
        <div className="w-full max-w-sm">
          <div className="mb-8 text-center">
            <img src={logoMark} alt="ExamGlow" className="mx-auto mb-3 size-12 rounded-full" />
            <h1 className="text-xl font-bold">Admin Panel</h1>
            <p className="mt-1 text-sm text-zinc-500">Enter your admin password to continue</p>
          </div>
          <form onSubmit={login} className="space-y-4">
            <input
              type="password"
              value={passwordInput}
              onChange={e => setPasswordInput(e.target.value)}
              placeholder="Admin password"
              className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200 dark:border-zinc-700 dark:bg-zinc-900"
            />
            {authError && (
              <p className="text-sm text-red-500">Incorrect password.</p>
            )}
            <button
              type="submit"
              className="w-full rounded-full bg-zinc-900 py-3 text-sm font-semibold text-white hover:bg-zinc-700 dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-100"
            >
              Sign in
            </button>
          </form>
          <p className="mt-6 text-center text-xs text-zinc-400">
            <Link to="/home" className="underline">Back to app</Link>
          </p>
        </div>
      </div>
    );
  }

  // ─── Main admin ──────────────────────────────────────────────────────────────
  return (
    <>
      {emailTarget && (
        <EmailModal account={emailTarget} onClose={() => setEmailTarget(null)} />
      )}

      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b border-zinc-200 bg-white/80 px-5 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
          <Link to="/home" className="flex items-center gap-2 shrink-0">
            <img src={logoMark} alt="ExamGlow" className="size-7 rounded-full" />
            <span className="text-[15px] font-bold">ExamGlow</span>
          </Link>
          <div className="flex items-center gap-1.5 rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-900/30 dark:text-violet-300">
            <ShieldCheck className="size-3.5" />
            Admin
          </div>
          <div className="flex-1" />
          <button
            onClick={refresh}
            className="flex items-center gap-1.5 rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-400 dark:hover:bg-zinc-800"
          >
            <RefreshCw className="size-3.5" />
            Refresh
          </button>
          <button
            onClick={() => setAuthed(false)}
            className="text-xs text-zinc-400 hover:text-zinc-600"
          >
            Sign out
          </button>
        </header>

        <main className="mx-auto max-w-6xl px-4 pb-16 pt-6 sm:px-6">
          {/* Stats */}
          <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <StatCard value={accounts.length} label="Total accounts" color="bg-violet-500" />
            <StatCard value={activeCount} label="Active sessions" color="bg-emerald-500" />
            <StatCard value={paidCount} label="Paid subscribers" color="bg-amber-500" />
            <StatCard
              value={accounts.length - paidCount}
              label="Free plan users"
              color="bg-zinc-400"
            />
          </div>

          {/* Filters */}
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1 sm:max-w-xs">
              <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
              <input
                type="search"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by name or email…"
                className="w-full rounded-xl border border-zinc-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200 dark:border-zinc-700 dark:bg-zinc-900"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {(["all", ...PLANS] as const).map(p => (
                <button
                  key={p}
                  onClick={() => setPlanFilter(p)}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
                    planFilter === p
                      ? "bg-zinc-900 text-white dark:bg-white dark:text-zinc-900"
                      : "border border-zinc-200 bg-white text-zinc-600 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400"
                  }`}
                >
                  {p === "all" ? "All plans" : PLAN_LABELS[p]}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Users className="mb-3 size-10 text-zinc-300" />
                <p className="font-medium text-zinc-500">
                  {accounts.length === 0
                    ? "No accounts yet — users will appear here after signing in with Google."
                    : "No accounts match your search."}
                </p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-zinc-100 bg-zinc-50 text-left dark:border-zinc-800 dark:bg-zinc-800/50">
                      <th className="py-3 pl-4 pr-3 text-xs font-semibold text-zinc-500">User</th>
                      <th className="px-3 py-3 text-xs font-semibold text-zinc-500">Plan</th>
                      <th className="px-3 py-3 text-xs font-semibold text-zinc-500">Role / Goal</th>
                      <th className="px-3 py-3 text-xs font-semibold text-zinc-500">Session</th>
                      <th className="px-3 py-3 text-xs font-semibold text-zinc-500">Signed in</th>
                      <th className="py-3 pl-3 pr-4 text-xs font-semibold text-zinc-500">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map(account => (
                      <UserRow
                        key={account.id}
                        account={account}
                        onLogout={() => handleLogout(account.id)}
                        onDelete={() => handleDelete(account.id)}
                        onPlanChange={plan => handlePlanChange(account.id, plan)}
                        onEmail={() => setEmailTarget(account)}
                      />
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          <p className="mt-4 text-xs text-zinc-400">
            Showing {filtered.length} of {accounts.length} accounts.
            Data is stored in this browser's localStorage.
          </p>
        </main>
      </div>
    </>
  );
}

function StatCard({ value, label, color }: { value: number; label: string; color: string }) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-5 dark:border-zinc-800 dark:bg-zinc-900">
      <div className="flex items-center gap-3">
        <span className={`size-2.5 rounded-full ${color}`} />
        <span className="text-2xl font-bold">{value}</span>
      </div>
      <p className="mt-1 text-xs text-zinc-500">{label}</p>
    </div>
  );
}
