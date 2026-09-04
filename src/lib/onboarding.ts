export type SubscriptionStatus = "active" | "canceled" | "past_due" | "expired";

export type OnboardingProfile = {
  name?: string | undefined;
  email?: string | undefined;
  role?: string | undefined;
  goal?: string | undefined;
  source?: string | undefined;
  plan?: "weekly" | "termly" | "yearly" | "monthly" | "exam-pass" | "free" | undefined;
  autoRenew?: boolean | undefined;
  paidAt?: number | undefined;
  renewalDue?: number | undefined;
  subscriptionStatus?: SubscriptionStatus | undefined;
  notesCount?: number | undefined;
  streakDays?: number | undefined;
  curriculum?: string | undefined;
};

const KEY = "examglow.profile";
const AI_COUNT_KEY = "examglow.ai_message_count";
export const FREE_AI_MESSAGE_LIMIT = 6;

export function readProfile(): OnboardingProfile {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    const profile = raw ? (JSON.parse(raw) as OnboardingProfile) : {};
    
    // If autoRenew is explicitly false and renewal date has passed, mark expired
    if (profile.plan && profile.plan !== "free") {
      if (profile.autoRenew === false && profile.renewalDue && Date.now() > profile.renewalDue) {
        profile.subscriptionStatus = "expired";
        profile.plan = "free";
        window.localStorage.setItem(KEY, JSON.stringify(profile));
      }
    }
    
    return profile;
  } catch {
    return {};
  }
}

export function saveProfile(patch: OnboardingProfile) {
  if (typeof window === "undefined") return;
  try {
    const current = readProfile();
    const next: OnboardingProfile = { ...current, ...patch };

    // If upgrading to a paid plan, set active status, autoRenew: true, and renewal dates
    if (patch.plan && patch.plan !== "free") {
      next.subscriptionStatus = "active";
      if (next.autoRenew === undefined) next.autoRenew = true;
      if (!next.paidAt) next.paidAt = Date.now();

      if (!next.renewalDue) {
        // Calculate renewal due date: 7 days for weekly, 90 for termly (3 months), 365 for yearly
        const days =
          patch.plan === "weekly" ? 7 :
          patch.plan === "yearly" ? 365 :
          patch.plan === "monthly" ? 30 : 90;
        next.renewalDue = Date.now() + days * 24 * 60 * 60 * 1000;
      }
    }

    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable */
  }
}

export function isPaidUser(profile?: OnboardingProfile): boolean {
  const p = profile ?? readProfile();
  if (!p.plan || p.plan === "free") return false;
  if (p.subscriptionStatus === "expired") return false;
  if (p.autoRenew === false && p.renewalDue && Date.now() > p.renewalDue) return false;
  return true;
}

export type ActiveSubscriptionInfo = {
  isActive: boolean;
  plan: "weekly" | "termly" | "yearly" | "monthly" | "exam-pass";
  planName: string;
  renewalDue: number;
  formattedExpiry: string;
  daysRemaining: number;
};

export function getActiveSubscription(profile?: OnboardingProfile): ActiveSubscriptionInfo | null {
  const p = profile ?? readProfile();
  if (!p.plan || p.plan === "free") return null;
  if (p.subscriptionStatus === "expired") return null;

  const now = Date.now();
  const defaultDays =
    p.plan === "weekly" ? 7 :
    p.plan === "yearly" ? 365 :
    p.plan === "monthly" ? 30 : 90;
  const renewal = p.renewalDue ?? (now + defaultDays * 24 * 60 * 60 * 1000);

  if (p.autoRenew === false && now > renewal) return null;

  const daysRemaining = Math.max(0, Math.ceil((renewal - now) / (1000 * 60 * 60 * 24)));
  const formattedExpiry = new Date(renewal).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const planName =
    p.plan === "weekly" ? "Weekly Plan" :
    p.plan === "yearly" ? "1 Year Plan" :
    p.plan === "monthly" ? "3 Months Plan" :
    "3 Months Plan";

  return {
    isActive: true,
    plan: p.plan,
    planName,
    renewalDue: renewal,
    formattedExpiry,
    daysRemaining,
  };
}

export async function syncGoogleAccountPlan(email: string, sub?: string): Promise<OnboardingProfile | null> {
  try {
    const params = new URLSearchParams();
    if (email) params.set("email", email);
    if (sub) params.set("sub", sub);

    const res = await fetch(`/api/account-plan?${params.toString()}`);
    if (!res.ok) return null;
    const data = (await res.json()) as { found?: boolean; plan?: string; renewalDue?: number; autoRenew?: boolean };
    if (data.found && data.plan && data.plan !== "free") {
      const patch: OnboardingProfile = {
        plan: data.plan as OnboardingProfile["plan"],
        renewalDue: data.renewalDue,
        autoRenew: data.autoRenew ?? true,
        subscriptionStatus: "active",
      };
      saveProfile(patch);
      return readProfile();
    }
  } catch (e) {
    console.warn("Failed to sync account plan from server:", e);
  }
  return null;
}

export async function lockGoogleAccountPlan(
  plan: string,
  email?: string,
  sub?: string,
  renewalDue?: number
): Promise<boolean> {
  try {
    const prof = readProfile();
    const effectiveEmail = (email || prof.email)?.trim().toLowerCase();
    const effectiveSub = (sub || (typeof window !== "undefined" ? window.localStorage.getItem("examglow.google_sub") || undefined : undefined))?.trim();
    const effectiveRenewal = renewalDue || prof.renewalDue;

    if (!effectiveEmail && !effectiveSub) return false;

    const res = await fetch("/api/account-plan", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: effectiveEmail,
        sub: effectiveSub,
        plan,
        renewalDue: effectiveRenewal,
        autoRenew: true,
      }),
    });
    return res.ok;
  } catch (e) {
    console.warn("Failed to lock account plan to server:", e);
    return false;
  }
}

export function toggleAutoRenew(enabled?: boolean): boolean {
  const current = readProfile();
  const next = enabled !== undefined ? enabled : !(current.autoRenew ?? true);
  saveProfile({ autoRenew: next });
  return next;
}

export function simulateRenewalFailure() {
  saveProfile({
    plan: "free",
    subscriptionStatus: "past_due",
    autoRenew: false,
  });
}

// ─── AI Message Quota ─────────────────────────────────────────────────────────

export function getAiMessageCount(): number {
  if (typeof window === "undefined") return 0;
  try {
    const raw = window.localStorage.getItem(AI_COUNT_KEY);
    return raw ? parseInt(raw, 10) || 0 : 0;
  } catch {
    return 0;
  }
}

export function incrementAiMessageCount(): number {
  if (typeof window === "undefined") return 1;
  try {
    const next = getAiMessageCount() + 1;
    window.localStorage.setItem(AI_COUNT_KEY, next.toString());
    return next;
  } catch {
    return 1;
  }
}

export function canSendAiMessage(profile?: OnboardingProfile): boolean {
  if (isPaidUser(profile)) return true;
  return getAiMessageCount() < FREE_AI_MESSAGE_LIMIT;
}
