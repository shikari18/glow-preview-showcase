import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Settings as SettingsIcon,
  User,
  CreditCard,
  Bell,
  Lock,
  Moon,
  Sun,
  ShieldCheck,
  Check,
  RefreshCw,
  AlertTriangle,
  LogOut,
  Sparkles,
} from "lucide-react";
import { DashboardLayout, PageHeading } from "@/components/dashboard-page";
import {
  readProfile,
  saveProfile,
  isPaidUser,
  toggleAutoRenew,
  simulateRenewalFailure,
} from "@/lib/onboarding";

export const Route = createFileRoute("/settings")({
  head: () => ({
    meta: [
      { title: "Account & App Settings | ExamGlow" },
      { name: "description", content: "Manage your profile, subscription, auto-renew, and study preferences." },
    ],
  }),
  component: SettingsPage,
});

function SettingsPage() {
  const navigate = useNavigate();
  const [profile, setProfile] = useState(readProfile());
  const [name, setName] = useState(profile.name || "Alex Morgan");
  const [email, setEmail] = useState("student@examglow.com");
  const [targetExam, setTargetExam] = useState(profile.curriculum || "Cambridge IGCSE");
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [autoRenew, setAutoRenew] = useState(profile.autoRenew ?? true);
  const [notifications, setNotifications] = useState(true);
  const [aiDetail, setAiDetail] = useState<"step" | "concise" | "deep">("step");
  const isPaid = isPaidUser();

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updated = {
      ...profile,
      name,
      curriculum: targetExam,
    };
    saveProfile(updated);
    setProfile(updated);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const handleToggleRenew = () => {
    const nextState = toggleAutoRenew();
    setAutoRenew(nextState);
    setProfile(readProfile());
  };

  const handleSimulateFailure = () => {
    if (confirm("Simulate renewal failure with insufficient funds? This will expire the subscription and sign you out to the pricing page.")) {
      simulateRenewalFailure();
      navigate({ to: "/pricing" });
    }
  };

  return (
    <DashboardLayout crumbs={[{ label: "Account" }, { label: "Settings" }]}>
      <PageHeading
        title="Settings & Preferences"
        badge="Account Management"
      />

      {savedSuccess && (
        <div className="mb-6 flex items-center gap-2 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-3 text-xs font-semibold text-emerald-600 dark:text-emerald-400 animate-in fade-in">
          <Check className="size-4" /> Your changes have been successfully saved!
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Profile & Preferences */}
        <div className="lg:col-span-7 space-y-6">
          {/* Profile Section */}
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex size-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                <User className="size-4" />
              </span>
              <div>
                <h2 className="font-bold text-lg text-foreground">Student Profile</h2>
                <p className="text-xs text-muted-foreground">Manage your personal study details</p>
              </div>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-foreground/80 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground/80 mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full rounded-xl border border-border bg-surface/50 px-3.5 py-2.5 text-sm text-muted-foreground cursor-not-allowed"
                />
                <p className="text-[11px] text-muted-foreground mt-1">Verified via authentication</p>
              </div>

              <div>
                <label className="block text-xs font-medium text-foreground/80 mb-1">Examination Target</label>
                <select
                  value={targetExam}
                  onChange={(e) => setTargetExam(e.target.value)}
                  className="w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/40"
                >
                  <option>Cambridge IGCSE (May/June 2025)</option>
                  <option>Cambridge IGCSE (Oct/Nov 2025)</option>
                  <option>Cambridge O-Levels</option>
                  <option>Cambridge A-Levels</option>
                  <option>Edexcel International GCSE</option>
                </select>
              </div>

              <button
                type="submit"
                className="rounded-xl bg-ink px-6 py-2.5 text-xs font-bold text-ink-foreground shadow hover:opacity-90 transition-opacity"
              >
                Save Profile Changes
              </button>
            </form>
          </div>

          {/* AI Tutor Preferences */}
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex size-9 items-center justify-center rounded-full bg-purple-500/10 text-purple-600 dark:text-purple-400">
                <Sparkles className="size-4" />
              </span>
              <div>
                <h2 className="font-bold text-lg text-foreground">Yumna Tutoring Preferences</h2>
                <p className="text-xs text-muted-foreground">Customize how Yumna answers your study questions</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-foreground/80 mb-2">Response Explanation Style</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setAiDetail("step")}
                    className={`rounded-xl border p-3 text-left transition-all ${
                      aiDetail === "step"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-surface text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <p className="text-xs font-bold">Step-by-Step</p>
                    <p className="text-[11px] mt-1 opacity-80">Clear workings and formulas</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAiDetail("concise")}
                    className={`rounded-xl border p-3 text-left transition-all ${
                      aiDetail === "concise"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-surface text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <p className="text-xs font-bold">Concise & Fast</p>
                    <p className="text-[11px] mt-1 opacity-80">Direct exam answers only</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAiDetail("deep")}
                    className={`rounded-xl border p-3 text-left transition-all ${
                      aiDetail === "deep"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border bg-surface text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <p className="text-xs font-bold">Deep Dive</p>
                    <p className="text-[11px] mt-1 opacity-80">Full syllabus background</p>
                  </button>
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold text-foreground">Daily Revision Reminders</p>
                  <p className="text-[11px] text-muted-foreground">Receive encouragement and weak-topic prompts</p>
                </div>
                <button
                  type="button"
                  onClick={() => setNotifications(!notifications)}
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    notifications ? "bg-primary" : "bg-secondary"
                  }`}
                >
                  <span
                    className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition-all ${
                      notifications ? "left-5.5" : "left-0.5"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Subscription & Renewal */}
        <div className="lg:col-span-5 space-y-6">
          {/* Subscription Card */}
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <span className="flex size-9 items-center justify-center rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400">
                <CreditCard className="size-4" />
              </span>
              <div>
                <h2 className="font-bold text-lg text-foreground">Membership & Billing</h2>
                <p className="text-xs text-muted-foreground">Manage renewal and payment settings</p>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface p-5 mb-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-wide">Current Status</p>
                  <p className="text-base font-bold text-foreground mt-0.5">
                    {isPaid ? "ExamGlow Premium" : "Free Preview Mode"}
                  </p>
                </div>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    isPaid
                      ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
                      : "bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20"
                  }`}
                >
                  {isPaid ? "Active" : "Preview Limit"}
                </span>
              </div>

              {!isPaid && (
                <button
                  type="button"
                  onClick={() => navigate({ to: "/pricing" })}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary py-2.5 text-xs font-bold text-primary-foreground shadow hover:opacity-90 transition-opacity"
                >
                  Upgrade to Full Access &rarr;
                </button>
              )}
            </div>

            {/* Auto Renewal Toggle */}
            <div className="rounded-2xl border border-border bg-surface p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-foreground">Weekly Auto-Renew</p>
                  <p className="text-[11px] text-muted-foreground">
                    Renews automatically so you never lose notes access
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleToggleRenew}
                  className={`relative h-6 w-11 rounded-full transition-colors ${
                    autoRenew ? "bg-emerald-500" : "bg-secondary"
                  }`}
                  role="switch"
                  aria-checked={autoRenew}
                >
                  <span
                    className={`absolute top-0.5 size-5 rounded-full bg-white shadow transition-all ${
                      autoRenew ? "left-5.5" : "left-0.5"
                    }`}
                  />
                </button>
              </div>
              <p className="text-[11px] text-muted-foreground border-t border-border/40 pt-2">
                {autoRenew
                  ? "Your card will be debited weekly. You can switch this OFF at any time."
                  : "Auto-renew is currently OFF. When your billing cycle concludes, your account will pause until renewed."}
              </p>
            </div>

            {/* Simulate Renewal Failure test button for testing */}
            <div className="mt-5 rounded-2xl border border-dashed border-red-500/30 bg-red-500/5 p-4">
              <div className="flex items-start gap-2.5">
                <AlertTriangle className="size-4 text-red-500 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-red-600 dark:text-red-400">Test Insufficient Funds Renewal</p>
                  <p className="text-[11px] text-muted-foreground mt-0.5">
                    Tests automatic account lockout when weekly renewal fails due to insufficient card balance.
                  </p>
                  <button
                    type="button"
                    onClick={handleSimulateFailure}
                    className="mt-2.5 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-500/20 transition-colors"
                  >
                    Simulate Renewal Failure & Logout
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Security & Danger Zone */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <h3 className="font-bold text-sm text-foreground mb-3">Account Security</h3>
            <button
              type="button"
              onClick={() => {
                if (confirm("Are you sure you want to sign out?")) {
                  navigate({ to: "/login" });
                }
              }}
              className="flex items-center gap-2 w-full rounded-xl border border-border p-3 text-xs font-semibold text-red-600 dark:text-red-400 hover:bg-red-500/10 transition-colors"
            >
              <LogOut className="size-4" /> Sign Out of ExamGlow
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
