import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft, ArrowRight, Check, Globe, Loader2,
  CreditCard, Lock, X, ShieldCheck,
} from "lucide-react";
import { useEffect, useRef, useState, useCallback } from "react";

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
        content: "Join 8M+ students using ExamGlow. Plans from $2.00 — cancel anytime.",
      },
      { property: "og:title", content: "Unlock ExamGlow Premium" },
      { property: "og:description", content: "92% of ExamGlow subscribers improved their grades." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PricingPage,
});

// ─── Plans ────────────────────────────────────────────────────────────────────

const PLAN_META = [
  { id: "weekly"     as const, name: "Weekly",     per: "/wk" },
  { id: "monthly"    as const, name: "Monthly",    per: "/mo",  badge: "MOST POPULAR" },
  { id: "termly"     as const, name: "Termly",     per: "/3mo", badge: "BEST VALUE" },
  { id: "exam-pass"  as const, name: "Exam Pass",  per: "",     badge: "EXAM PASS" },
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

// ─── Payment Modal ────────────────────────────────────────────────────────────

function PaymentModal({
  planId,
  currency,
  onSuccess,
  onClose,
}: {
  planId: PlanId;
  currency: CurrencyInfo;
  onSuccess: () => void;
  onClose: () => void;
}) {
  const paypalRef = useRef<HTMLDivElement>(null);
  const [sdkState, setSdkState] = useState<"loading" | "ready" | "error">("loading");
  const [payError, setPayError] = useState<string | null>(null);
  const rendered = useRef(false);

  const amount = convertPrice(planId, currency);
  const planDisplay = PLAN_META.find(p => p.id === planId);

  const handleSuccess = useCallback(async (orderID: string) => {
    console.log("Payment captured:", orderID);
    saveProfile({ plan: planId });
    const userId = window.localStorage.getItem("examglow.google_sub");
    if (userId) await updateAccountPlan(userId, planId as PlanLabel);
    onSuccess();
  }, [planId, onSuccess]);

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  // Close on Escape
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", fn);
    return () => document.removeEventListener("keydown", fn);
  }, [onClose]);

  // Load PayPal SDK and render buttons
  useEffect(() => {
    if (rendered.current) return;

    loadPayPalSDK(currency.code)
      .then(() => {
        setSdkState("ready");
        if (!paypalRef.current || !window.paypal || rendered.current) return;
        rendered.current = true;
        paypalRef.current.innerHTML = "";

        window.paypal.Buttons({
          style: {
            layout: "vertical",
            color: "gold",
            shape: "rect",
            label: "pay",
            height: 50,
          },
          createOrder: (_d: unknown, actions: { order: { create: (o: unknown) => Promise<string> } }) =>
            actions.order.create({
              intent: "CAPTURE",
              purchase_units: [{
                description: `ExamGlow ${planDisplay?.name ?? planId} plan`,
                amount: {
                  currency_code: currency.code,
                  value: amount,
                },
              }],
            }),
          onApprove: async (data: { orderID: string }, actions: { order: { capture: () => Promise<unknown> } }) => {
            await actions.order.capture();
            await handleSuccess(data.orderID);
          },
          onError: (err: unknown) => {
            console.error("PayPal error:", err);
            setPayError("Payment failed. Please try again or use a different method.");
          },
          onCancel: () => { /* user cancelled — do nothing */ },
        }).render(paypalRef.current!);
      })
      .catch(() => setSdkState("error"));
  }, [currency.code, amount, planId, planDisplay, handleSuccess]);

  return (
    <div className="fixed inset-0 z-[200] flex items-end justify-center sm:items-center sm:p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Panel */}
      <div className="relative flex w-full max-w-md flex-col overflow-hidden rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl dark:bg-zinc-900"
        style={{ maxHeight: "92dvh" }}>

        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-200 px-5 py-4 dark:border-zinc-800">
          <div>
            <h2 className="text-base font-bold text-zinc-900 dark:text-white">
              Complete your purchase
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              ExamGlow {planDisplay?.name} — {formatPrice(planId, currency)}{planDisplay?.per}
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex size-8 items-center justify-center rounded-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
          >
            <X className="size-4 text-zinc-500" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto px-5 py-5">
          {/* Order summary */}
          <div className="mb-5 rounded-2xl bg-zinc-50 px-4 py-3.5 dark:bg-zinc-800">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                ExamGlow {planDisplay?.name} plan
              </span>
              <span className="text-sm font-bold text-zinc-900 dark:text-white">
                {formatPrice(planId, currency)}{planDisplay?.per}
              </span>
            </div>
            <div className="mt-1 flex items-center justify-between border-t border-zinc-200 pt-2 dark:border-zinc-700">
              <span className="text-xs text-zinc-500">Total due today</span>
              <span className="text-base font-bold text-zinc-900 dark:text-white">
                {formatPrice(planId, currency)}
              </span>
            </div>
          </div>

          {/* PayPal buttons */}
          {sdkState === "loading" && (
            <div className="flex h-14 items-center justify-center gap-2 rounded-xl bg-zinc-100 text-sm text-zinc-500 dark:bg-zinc-800">
              <Loader2 className="size-4 animate-spin" />
              Loading payment options…
            </div>
          )}

          {sdkState === "error" && (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-800 dark:bg-red-950/30 dark:text-red-400">
              Failed to load PayPal. Please check your connection and try again.
            </div>
          )}

          {/* PayPal renders here */}
          <div
            ref={paypalRef}
            className={sdkState === "ready" ? "block" : "hidden"}
          />

          {payError && (
            <p className="mt-3 rounded-xl bg-red-50 px-4 py-2 text-center text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
              {payError}
            </p>
          )}

          {/* Divider */}
          <div className="my-4 flex items-center gap-3 text-xs text-zinc-400">
            <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" />
            or pay with card
            <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-700" />
          </div>

          {/* Card option info */}
          <div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-4 py-4 dark:border-zinc-700 dark:bg-zinc-800">
            <div className="flex items-center gap-2 mb-3">
              <CreditCard className="size-4 text-zinc-500" />
              <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Pay with card via PayPal
              </span>
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Click the PayPal button above — on the PayPal page you can choose
              "Pay with Debit or Credit Card" without needing a PayPal account.
            </p>
            {/* Card logos */}
            <div className="mt-3 flex items-center gap-2">
              {["Visa", "MC", "Amex", "Discover"].map(card => (
                <span
                  key={card}
                  className="rounded border border-zinc-200 bg-white px-2 py-0.5 text-[10px] font-bold text-zinc-600 dark:border-zinc-600 dark:bg-zinc-700 dark:text-zinc-300"
                >
                  {card}
                </span>
              ))}
            </div>
          </div>

          {/* Trust badges */}
          <div className="mt-4 flex items-center justify-center gap-4 text-xs text-zinc-400">
            <span className="flex items-center gap-1">
              <Lock className="size-3" /> 256-bit SSL
            </span>
            <span className="flex items-center gap-1">
              <ShieldCheck className="size-3" /> Secure checkout
            </span>
            <span className="flex items-center gap-1">
              <Check className="size-3" /> Cancel anytime
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function PricingPage() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<PlanId>("monthly");
  const [currency, setCurrency] = useState<CurrencyInfo | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    detectCurrency().then(setCurrency);
  }, []);

  function handleSuccess() {
    setShowModal(false);
    setSuccess(true);
    setTimeout(() => navigate({ to: "/home" }), 1800);
  }

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
    <>
      {showModal && currency && (
        <PaymentModal
          planId={selected}
          currency={currency}
          onSuccess={handleSuccess}
          onClose={() => setShowModal(false)}
        />
      )}

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
            onClick={() => { saveProfile({ plan: "free" }); navigate({ to: "/home" }); }}
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
              alt="Student and cat balancing on a seesaw"
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
            {currency ? (
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
                <Globe className="size-3.5" />
                Prices in {currency.code} · {currency.symbol}
              </div>
            ) : (
              <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground">
                <Loader2 className="size-3.5 animate-spin" />
                Detecting location…
              </div>
            )}

            {/* Plan selector */}
            <div className="mt-4 space-y-2">
              {PLAN_META.map((plan) => {
                const active = selected === plan.id;
                const priceDisplay = currency ? formatPrice(plan.id, currency) : "…";
                const subline = currency ? planSubline(plan.id, currency) : "Loading…";

                return (
                  <button
                    key={plan.id}
                    type="button"
                    onClick={() => setSelected(plan.id)}
                    aria-pressed={active}
                    className={`w-full overflow-hidden rounded-2xl border text-left transition-colors ${
                      active ? "border-foreground bg-secondary" : "border-border bg-card"
                    }`}
                  >
                    {"badge" in plan && Boolean(plan.badge) && (
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
                          {plan.per && <span className="text-base text-muted-foreground">{plan.per}</span>}
                        </span>
                        <span className={`flex size-7 items-center justify-center rounded-full border ${
                          active ? "border-transparent bg-foreground text-background" : "border-border"
                        }`}>
                          {active && <Check className="size-4" aria-hidden />}
                        </span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>

            {/* CTA button — opens modal */}
            <button
              type="button"
              onClick={() => setShowModal(true)}
              disabled={!currency}
              className="mt-4 w-full rounded-full bg-ink-foreground py-3.5 text-[15px] font-semibold text-ink transition-transform hover:-translate-y-0.5 disabled:opacity-60"
            >
              {currency
                ? `Unlock Premium · ${formatPrice(selected, currency)}`
                : "Loading…"}
            </button>

            <p className="mt-2 text-center text-sm text-muted-foreground">
              Cancel anytime · Secure checkout · PayPal &amp; all major cards
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
