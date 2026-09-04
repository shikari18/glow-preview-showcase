import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Globe, Loader2, ShieldCheck } from "lucide-react";
import { useEffect, useState } from "react";

import balanceDoodle from "@/assets/balance-doodle.png";
import avatar1 from "@/assets/avatar-1.jpg";
import {
  saveProfile,
  readProfile,
  getActiveSubscription,
  syncGoogleAccountPlan,
} from "@/lib/onboarding";
import { detectCurrency, formatPrice, type CurrencyInfo } from "@/lib/paypal";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Unlock ExamGlow Premium" },
      { name: "description", content: "Join 8M+ students using ExamGlow. Cancel anytime." },
      { property: "og:title", content: "Unlock ExamGlow Premium" },
      { property: "og:description", content: "92% of ExamGlow subscribers improved their grades." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PricingPage,
});

const PLAN_META = [
  { id: "weekly" as const, name: "Weekly", per: "/wk" },
  { id: "termly" as const, name: "3 Months", per: "/3mo", badge: "MOST POPULAR" },
  { id: "yearly" as const, name: "1 Year", per: "/yr", badge: "BEST VALUE" },
] as const;

type PlanId = (typeof PLAN_META)[number]["id"];

function planSubline(id: PlanId, c: CurrencyInfo): string {
  const p = formatPrice(id, c);
  switch (id) {
    case "weekly":
      return `${p} billed every week`;
    case "termly":
      return `${p} billed every 3 months`;
    case "yearly":
      return `${p} billed every year`;
  }
}

function PricingPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<PlanId>("termly");
  const [currency, setCurrency] = useState<CurrencyInfo | null>(null);
  const [activeSub, setActiveSub] = useState(() => getActiveSubscription());

  useEffect(() => {
    detectCurrency().then(setCurrency);
    const prof = readProfile();
    const email = prof.email;
    const sub = typeof window !== "undefined" ? window.localStorage.getItem("examglow.google_sub") : null;
    if (email || sub) {
      syncGoogleAccountPlan(email || "", sub || undefined).then((synced) => {
        if (synced) {
          const s = getActiveSubscription(synced);
          if (s) setActiveSub(s);
        }
      });
    }
  }, []);

  return (
    <div className="dark min-h-dvh bg-background px-4 py-4 text-foreground sm:px-6 lg:h-dvh lg:overflow-hidden lg:px-8 lg:py-3">
      <div className="flex items-center justify-between">
        <button type="button" onClick={() => navigate({ to: "/home" })}
          className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-secondary">
          <ArrowLeft className="size-4" /> Back
        </button>
        <button type="button" onClick={() => { saveProfile({ plan: "free" }); navigate({ to: "/home" }); }}
          className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground">
          Skip for now <ArrowRight className="size-4" />
        </button>
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-10 py-8 lg:h-[calc(100dvh-72px)] lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:py-0">
        {/* Left */}
        <div className="flex flex-col justify-center">
          <img src={balanceDoodle} alt="" loading="lazy" width={900} height={760}
            className="mx-auto w-full max-w-[280px] invert sm:max-w-xs lg:max-w-[240px]" />
          <figure className="mx-auto mt-5 w-full max-w-lg rounded-2xl border border-border bg-card p-5 sm:p-6">
            <blockquote className="text-[15px] leading-relaxed">
              "I knew ExamGlow was fantastic for me when I could remember information without
              having to put a pen on paper at all."
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <img src={avatar1} alt="" loading="lazy" width={512} height={512}
                className="size-10 rounded-full object-cover" />
              <span className="text-sm">
                <span className="block font-medium">Nana Agyakoma</span>
                <span className="block text-muted-foreground">Nursing at Emory University</span>
              </span>
            </figcaption>
          </figure>
        </div>

        {/* Right */}
        <div className="mx-auto w-full max-w-xl">
          <h1 className="text-[clamp(2rem,4vw,3rem)] leading-[1.02]">
            92% of ExamGlow subscribers improved their grades
          </h1>
          <p className="mt-2 text-muted-foreground">
            Join <strong className="text-foreground">8M+</strong> students already using ExamGlow
          </p>

          {currency ? (
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
              <Globe className="size-3.5" /> Prices in {currency.code}
            </div>
          ) : (
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
              <Loader2 className="size-3.5 animate-spin" /> Detecting location…
            </div>
          )}

          {activeSub && (
            <div className="mt-3 rounded-2xl border border-emerald-500/30 bg-emerald-950/40 p-3.5 text-xs text-emerald-300 space-y-1">
              <span className="font-semibold flex items-center gap-1.5 text-sm text-emerald-200">
                <ShieldCheck className="size-4 text-emerald-400" /> Active Subscription
              </span>
              <p>
                You are currently subscribed to <strong className="text-white">{activeSub.planName}</strong> with access until <strong className="text-white">{activeSub.formattedExpiry}</strong> ({activeSub.daysRemaining} days left). Upgrades and duplicate purchases are locked on this account until your plan expires.
              </p>
            </div>
          )}

          <div className="mt-4 space-y-2">
            {PLAN_META.map(plan => {
              const active = selected === plan.id;
              const isCurrent = activeSub?.plan === plan.id || (plan.id === "termly" && activeSub?.plan === "monthly");
              return (
                <button key={plan.id} type="button" onClick={() => setSelected(plan.id)}
                  aria-pressed={active}
                  className={`w-full overflow-hidden rounded-2xl border text-left transition-colors ${active ? "border-foreground bg-secondary" : "border-border bg-card"}`}>
                  {"badge" in plan && plan.badge && (
                    <span className="block bg-ink-foreground py-1 text-center text-[11px] font-semibold text-ink">
                      {isCurrent ? "YOUR CURRENT PLAN" : plan.badge}
                    </span>
                  )}
                  <span className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-2.5 sm:px-6">
                    <span className="min-w-0">
                      <span className="block font-semibold">{plan.name}</span>
                      <span className="block text-sm text-muted-foreground">
                        {currency ? planSubline(plan.id, currency) : "Loading…"}
                      </span>
                    </span>
                    <span className="flex shrink-0 items-center gap-3">
                      <span className="font-display text-2xl">
                        {currency ? formatPrice(plan.id, currency) : "…"}
                        {plan.per && <span className="text-base text-muted-foreground">{plan.per}</span>}
                      </span>
                      <span className={`flex size-7 items-center justify-center rounded-full border ${active ? "border-transparent bg-foreground text-background" : "border-border"}`}>
                        {active && <Check className="size-4" />}
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {activeSub ? (
            <button
              type="button"
              onClick={() => navigate({ to: "/home" })}
              className="mt-4 w-full rounded-full bg-emerald-500 hover:bg-emerald-600 py-3.5 text-[15px] font-semibold text-white transition-transform hover:-translate-y-0.5"
            >
              Subscription Active · Go to Dashboard
            </button>
          ) : (
            <button
              type="button"
              disabled={!currency}
              onClick={() => navigate({ to: "/checkout", search: { plan: selected } })}
              className="mt-4 w-full rounded-full bg-ink-foreground py-3.5 text-[15px] font-semibold text-ink transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              {currency ? `Unlock Premium · ${formatPrice(selected, currency)}` : "Loading…"}
            </button>
          )}

          <p className="mt-2 text-center text-sm text-muted-foreground">
            Cancel anytime · Secure checkout · PayPal &amp; all major cards
          </p>
        </div>
      </div>
    </div>
  );
}
