import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Globe, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

import balanceDoodle from "@/assets/balance-doodle.png";
import avatar1 from "@/assets/avatar-1.jpg";
import { saveProfile } from "@/lib/onboarding";
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
  { id: "weekly"    as const, name: "Weekly",    per: "/wk" },
  { id: "monthly"   as const, name: "Monthly",   per: "/mo",  badge: "MOST POPULAR" },
  { id: "termly"    as const, name: "Termly",    per: "/3mo", badge: "BEST VALUE" },
  { id: "exam-pass" as const, name: "Exam Pass", per: "",     badge: "EXAM PASS" },
] as const;

type PlanId = (typeof PLAN_META)[number]["id"];

function planSubline(id: PlanId, c: CurrencyInfo): string {
  const p = formatPrice(id, c);
  switch (id) {
    case "weekly":    return `${p} billed every week`;
    case "monthly":   return `${p} billed every month`;
    case "termly":    return `${p} every 3 months`;
    case "exam-pass": return `${p} valid until end of exam season`;
  }
}

function PricingPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<PlanId>("monthly");
  const [currency, setCurrency] = useState<CurrencyInfo | null>(null);

  useEffect(() => { detectCurrency().then(setCurrency); }, []);

  return (
    <div className="dark min-h-dvh bg-background px-4 py-4 text-foreground sm:px-6 lg:h-dvh lg:overflow-hidden lg:px-8 lg:py-3">
      <div className="flex items-center justify-between">
        <button type="button" onClick={() => navigate({ to: "/home" })}
          className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-secondary">
          <ArrowLeft className="size-4" /> Back
        </button>
        <button type="button" onClick={() => { saveProfile({ plan: "free" }); navigate({ to: "/home" }); }}
          className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-secondary">
          Skip <ArrowRight className="size-4" />
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

          <div className="mt-4 space-y-2">
            {PLAN_META.map(plan => {
              const active = selected === plan.id;
              return (
                <button key={plan.id} type="button" onClick={() => setSelected(plan.id)}
                  aria-pressed={active}
                  className={`w-full overflow-hidden rounded-2xl border text-left transition-colors ${active ? "border-foreground bg-secondary" : "border-border bg-card"}`}>
                  {"badge" in plan && plan.badge && (
                    <span className="block bg-ink-foreground py-1 text-center text-[11px] font-semibold text-ink">
                      {plan.badge}
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

          <button
            type="button"
            disabled={!currency}
            onClick={() => navigate({ to: "/checkout", search: { plan: selected } })}
            className="mt-4 w-full rounded-full bg-ink-foreground py-3.5 text-[15px] font-semibold text-ink transition-transform hover:-translate-y-0.5 disabled:opacity-60"
          >
            {currency ? `Unlock Premium · ${formatPrice(selected, currency)}` : "Loading…"}
          </button>

          <p className="mt-2 text-center text-sm text-muted-foreground">
            Cancel anytime · Secure checkout · PayPal &amp; all major cards
          </p>
        </div>
      </div>
    </div>
  );
}
