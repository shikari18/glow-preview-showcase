import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Check, Globe, Loader2 } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import balanceDoodle from "@/assets/balance-doodle.png";
import avatar1 from "@/assets/avatar-1.jpg";
import { saveProfile } from "@/lib/onboarding";
import {
  detectCurrency,
  loadPayPalSDK,
  formatPrice,
  convertPrice,
  type CurrencyInfo,
} from "@/lib/paypal";
import { updateAccountPlan, type PlanLabel } from "@/lib/admin-store";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Unlock ExamGlow Premium" },
      {
        name: "description",
        content:
          "Join 8M+ students using ExamGlow. Plans from $2.00 — weekly, monthly, or exam-season — cancel anytime.",
      },
      { property: "og:title", content: "Unlock ExamGlow Premium" },
      {
        property: "og:description",
        content: "92% of ExamGlow subscribers improved their grades.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PricingPage,
});

const PLAN_META = [
  {
    id: "weekly" as const,
    name: "Weekly",
    per: "/wk",
  },
  {
    id: "monthly" as const,
    name: "Monthly",
    per: "/mo",
    badge: "MOST POPULAR",
  },
  {
    id: "termly" as const,
    name: "Termly",
    per: "/3mo",
    badge: "BEST VALUE",
  },
  {
    id: "exam-pass" as const,
    name: "Exam Pass",
    per: "",
    badge: "EXAM PASS",
  },
] as const;

type PlanId = (typeof PLAN_META)[number]["id"];

function planSubline(id: PlanId, currency: CurrencyInfo): string {
  const p = formatPrice(id, currency);
  switch (id) {
    case "weekly":    return `${p} billed every week`;
    case "monthly":   return `${p} billed every month`;
    case "termly":    return `${p} every 3 months`;
    case "exam-pass": return `${p} valid until end of exam season`;
  }
}

// ─── PayPal button container ──────────────────────────────────────────────────

function PayPalButtonContainer({
  planId,
  currency,
  onSuccess,
  onError,
}: {
  planId: PlanId;
  currency: CurrencyInfo;
  onSuccess: () => void;
  onError: (msg: string) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sdkReady, setSdkReady] = useState(false);
  const [sdkError, setSdkError] = useState<string | null>(null);
  const renderedRef = useRef(false);

  // Load SDK when currency changes
  useEffect(() => {
    setSdkReady(false);
    setSdkError(null);
    renderedRef.current = false;
    loadPayPalSDK(currency.code)
      .then(() => setSdkReady(true))
      .catch(() => setSdkError("Could not load PayPal. Please try again."));
  }, [currency.code]);

  // Render buttons when SDK is ready and plan/currency change
  useEffect(() => {
    if (!sdkReady || !containerRef.current || !window.paypal) return;
    if (renderedRef.current) return;
    renderedRef.current = true;

    // Clear previous buttons
    containerRef.current.innerHTML = "";

    const amount = convertPrice(planId, currency);

    window.paypal
      .Buttons({
        style: {
          layout: "vertical",
          color: "gold",
          shape: "pill",
          label: "pay",
          height: 48,
        },
        createOrder: (_data: unknown, actions: { order: { create: (o: unknown) => Promise<string> } }) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: `ExamGlow ${planId} plan`,
                amount: {
                  currency_code: currency.code,
                  value: amount,
                },
              },
            ],
          });
        },
        onApprove: async (data: { orderID: string }, actions: { order: { capture: () => Promise<unknown> } }) => {
          await actions.order.capture();
          console.log("PayPal captured, orderID:", data.orderID);
          // Save plan locally and in admin store
          saveProfile({ plan: planId });
          const userId = window.localStorage.getItem("examglow.google_sub");
          if (userId) {
            await updateAccountPlan(userId, planId as PlanLabel);
          }
          onSuccess();
        },
        onError: (err: unknown) => {
          console.error("PayPal error:", err);
          onError("Payment failed. Please try again.");
        },
        onCancel: () => {
          // Do nothing — user cancelled
        },
      })
      .render(containerRef.current);
  }, [sdkReady, planId, currency, onSuccess, onError]);

  if (sdkError) {
    return (
      <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
        {sdkError}
      </div>
    );
  }

  if (!sdkReady) {
    return (
      <div className="flex h-12 items-center justify-center gap-2 rounded-full bg-secondary text-sm text-muted-foreground">
        <Loader2 className="size-4 animate-spin" />
        Loading payment…
      </div>
    );
  }

  return <div ref={containerRef} className="paypal-button-container" />;
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function PricingPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<PlanId>("monthly");
  const [currency, setCurrency] = useState<CurrencyInfo | null>(null);
  const [payError, setPayError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  // Detect currency on mount
  useEffect(() => {
    detectCurrency().then(setCurrency);
  }, []);

  function handleSuccess() {
    setSuccess(true);
    setTimeout(() => navigate({ to: "/home" }), 1800);
  }

  // Show success overlay
  if (success) {
    return (
      <div className="dark flex min-h-dvh flex-col items-center justify-center gap-4 bg-background text-foreground">
        <div className="flex size-16 items-center justify-center rounded-full bg-emerald-500">
          <Check className="size-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold">You're Premium!</h1>
        <p className="text-muted-foreground">Redirecting to your dashboard…</p>
      </div>
    );
  }

  return (
    <div className="dark min-h-dvh bg-background px-4 py-4 text-foreground sm:px-6 lg:h-dvh lg:overflow-hidden lg:px-8 lg:py-3">
      {/* Top nav */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => navigate({ to: "/home" })}
          className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition-colors hover:bg-secondary"
        >
          <ArrowLeft className="size-4" aria-hidden /> Back
        </button>
        <button
          type="button"
          onClick={() => {
            saveProfile({ plan: "free" });
            navigate({ to: "/home" });
          }}
          className="flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition-colors hover:bg-secondary"
        >
          Skip <ArrowRight className="size-4" aria-hidden />
        </button>
      </div>

      <div className="mx-auto grid max-w-6xl items-center gap-10 py-8 lg:h-[calc(100dvh-72px)] lg:grid-cols-[0.9fr_1.1fr] lg:gap-12 lg:py-0">
        {/* Left column */}
        <div className="flex flex-col justify-center">
          <img
            src={balanceDoodle}
            alt="Line drawing of a student and a cat balancing on a seesaw"
            loading="lazy"
            width={900}
            height={760}
            className="mx-auto w-full max-w-[280px] invert sm:max-w-xs lg:max-w-[240px]"
          />
          <figure className="mx-auto mt-5 w-full max-w-lg rounded-2xl border border-border bg-card p-5 sm:p-6">
            <blockquote className="text-[15px] leading-relaxed">
              "I knew ExamGlow was fantastic for me when I could remember information without having
              to put a pen on paper at all."
            </blockquote>
            <figcaption className="mt-5 flex items-center gap-3">
              <img
                src={avatar1}
                alt="Portrait of Nana Agyakoma"
                loading="lazy"
                width={512}
                height={512}
                className="size-10 rounded-full object-cover"
              />
              <span className="text-sm">
                <span className="block font-medium">Nana Agyakoma</span>
                <span className="block text-muted-foreground">Nursing at Emory University</span>
              </span>
            </figcaption>
          </figure>
        </div>

        {/* Right column */}
        <div className="mx-auto w-full max-w-xl">
          <h1 className="text-[clamp(2rem,4vw,3rem)] leading-[1.02]">
            92% of ExamGlow subscribers improved their grades
          </h1>
          <p className="mt-2 text-muted-foreground">
            Join <strong className="text-foreground">8M+</strong> students already using ExamGlow
          </p>

          {/* Currency badge */}
          {currency && (
            <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
              <Globe className="size-3.5" />
              Prices shown in {currency.code} · {currency.symbol}
            </div>
          )}

          {/* Plan selector */}
          <div className="mt-4 space-y-2">
            {PLAN_META.map((plan) => {
              const active = selected === plan.id;
              const priceDisplay = currency
                ? formatPrice(plan.id, currency)
                : "…";
              const subline = currency
                ? planSubline(plan.id, currency)
                : "Loading…";

              return (
                <button
                  key={plan.id}
                  type="button"
                  onClick={() => { setSelected(plan.id); setPayError(null); }}
                  aria-pressed={active}
                  className={`w-full overflow-hidden rounded-2xl border text-left transition-colors ${
                    active ? "border-foreground bg-secondary" : "border-border bg-card"
                  }`}
                >
                  {plan.badge && (
                    <span className="block bg-ink-foreground py-1 text-center text-[11px] font-semibold text-ink">
                      {plan.badge}
                    </span>
                  )}
                  <span className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-2.5 sm:px-6">
                    <span className="min-w-0">
                      <span className="block font-semibold">{plan.name}</span>
                      <span className="block text-sm text-muted-foreground">{subline}</span>
                    </span>
                    <span className="flex shrink-0 items-center gap-3">
                      <span className="font-display text-2xl">
                        {priceDisplay}
                        {plan.per && (
                          <span className="text-base text-muted-foreground">{plan.per}</span>
                        )}
                      </span>
                      <span
                        className={`flex size-7 items-center justify-center rounded-full border ${
                          active
                            ? "border-transparent bg-foreground text-background"
                            : "border-border"
                        }`}
                      >
                        {active && <Check className="size-4" aria-hidden />}
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* PayPal button */}
          <div className="mt-4">
            {currency ? (
              <PayPalButtonContainer
                key={`${selected}-${currency.code}`}
                planId={selected}
                currency={currency}
                onSuccess={handleSuccess}
                onError={setPayError}
              />
            ) : (
              <div className="flex h-12 items-center justify-center gap-2 rounded-full bg-secondary text-sm text-muted-foreground">
                <Loader2 className="size-4 animate-spin" />
                Detecting your location…
              </div>
            )}
          </div>

          {payError && (
            <p className="mt-2 text-center text-sm text-destructive">{payError}</p>
          )}

          <p className="mt-2 text-center text-sm text-muted-foreground">
            Cancel anytime · Secure checkout via PayPal · No card stored on ExamGlow
          </p>
        </div>
      </div>
    </div>
  );
}
