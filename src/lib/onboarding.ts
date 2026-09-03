export type SubscriptionStatus = "active" | "canceled" | "past_due" | "expired";

export type OnboardingProfile = {
  name?: string;
  email?: string;
  role?: string;
  goal?: string;
  source?: string;
  plan?: "weekly" | "monthly" | "termly" | "exam-pass" | "free";
  autoRenew?: boolean;
  paidAt?: number;
  renewalDue?: number;
  subscriptionStatus?: SubscriptionStatus;
  notesCount?: number;
  streakDays?: number;
};

const KEY = "examglow.profile";
const AI_COUNT_KEY = "examglow.ai_message_count";
export const FREE_AI_MESSAGE_LIMIT = 6;

export function readProfile(): OnboardingProfile {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.localStorage.getItem(KEY);
    const profile = raw ? (JSON.parse(raw) as OnboardingProfile) : {};
    
    // If autoRenew is explicitly false and renewal date has passed, mark past_due
    if (profile.plan && profile.plan !== "free") {
      if (profile.autoRenew === false && profile.renewalDue && Date.now() > profile.renewalDue) {
        profile.subscriptionStatus = "past_due";
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
      next.paidAt = Date.now();
      // Calculate renewal due date: 7 days for weekly, 30 for monthly, 90 for termly
      const days = patch.plan === "weekly" ? 7 : patch.plan === "monthly" ? 30 : 90;
      next.renewalDue = Date.now() + days * 24 * 60 * 60 * 1000;
    }

    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* storage unavailable */
  }
}

export function isPaidUser(profile?: OnboardingProfile): boolean {
  const p = profile ?? readProfile();
  if (!p.plan || p.plan === "free") return false;
  if (p.subscriptionStatus !== "active") return false;
  if (!p.paidAt) return false;
  return true;
}

export function toggleAutoRenew(enabled: boolean) {
  saveProfile({ autoRenew: enabled });
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
