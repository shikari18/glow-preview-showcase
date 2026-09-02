import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, Check, Lock, ShieldCheck, Loader2 } from "lucide-react";

import logoMark from "@/assets/logo-mark.png";
import { saveProfile } from "@/lib/onboarding";
import {
  detectCurrency,
  loadPayPalSDK,
  formatPrice,
  convertPrice,
  type CurrencyInfo,
} from "@/lib/paypal";
import { updateAccountPlan, type PlanLabel } from "@/lib/admin-store";

// ─── Route ────────────────────────────────────────────────────────────────────

export const Route = createFileRoute("/checkout")({
  validateSearch: (s: Record<string, unknown>) => ({
    plan: (s["plan"] as string) || "monthly",
  }),
  head: () => ({ meta: [{ title: "Checkout — ExamGlow" }] }),
  component: CheckoutPage,
});

// ─── Plan data ────────────────────────────────────────────────────────────────

const PLANS: Record<string, { name: string; period: string; features: string[] }> = {
  weekly: {
    name: "Weekly Plan",
    period: "billed every week",
    features: ["Full notes access", "Past papers", "AI chat", "Cancel anytime"],
  },
  monthly: {
    name: "Monthly Plan",
    period: "billed every month",
    features: ["Full notes access", "Past papers", "AI chat", "Priority support", "Cancel anytime"],
  },
  termly: {
    name: "Termly Plan",
    period: "billed every 3 months",
    features: ["Full notes access", "Past papers", "AI chat", "Priority support", "Study plan", "Cancel anytime"],
  },
  "exam-pass": {
    name: "Exam Pass",
    period: "valid until end of exam season",
    features: ["Full notes access", "Past papers", "AI chat", "Priority support", "Study plan", "Exam prep toolkit"],
  },
};

// ─── PayPal button ────────────────────────────────────────────────────────────

function PayPalSection({
  planId,
  currency,
  onSuccess,
}: {
  planId: string;
  currency: CurrencyInfo;
  onSuccess: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [state, setState] = useState<"loading" | "ready" | "error">("loading");
  const rendered = useRef(false);

  useEffect(() => {
    if (rendered.current) return;

    loadPayPalSDK(currency.code)
      .then(() => {
        setState("ready");
        if (!ref.current || !window.paypal || rendered.current) return;
        rendered.current = true;
        ref.current.innerHTML = "";

        const amount = convertPrice(planId, currency);
        const plan = PLANS[planId];

        window.paypal.Buttons({
          style: {
            layout: "vertical",
            color: "gold",
            shape: "rect",
            label: "pay",
            height: 55,
            tagline: false,
          },
          createOrder: (_d, actions) =>
            actions.order.create({
              intent: "CAPTURE",
              purchase_units: [{
                description: `ExamGlow ${plan?.name ?? planId}`,
                amount: { currency_code: currency.code, value: amount },
              }],
            }),
          onApprove: async (data, actions) => {
            await actions.order.capture();
            saveProfile({ plan: planId as PlanLabel });
            const uid = typeof window !== "undefined"
              ? window.localStorage.getItem("examglow.google_sub")
              : null;
            if (uid) await updateAccountPlan(uid, planId as PlanLabel);
            onSuccess();
          },
          onError: () => setState("error"),
        }).render(ref.current!);
      })
      .catch(() => setState("error"));
  }, [currency, planId, onSuccess]);

  if (state === "error") {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
        <p className="font-semibold">Could not load PayPal</p>
        <p className="mt-1 text-red-500">
          Check your internet connection and refresh the page. Make sure pop-ups are not blocked.
        </p>
        <button
          onClick={() => { setState("loading"); rendered.current = false; }}
          className="mt-3 rounded-full bg-red-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-red-700"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <div>
      {state === "loading" && (
        <div className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-zinc-100 text-sm text-zinc-500">
          <Loader2 className="size-4 animate-spin" />
          Loading PayPal…
        </div>
      )}
      <div ref={ref} className={state === "ready" ? "block" : "hidden"} />
      {state === "ready" && (
        <p className="mt-3 text-center text-xs text-zinc-400">
          You can also pay by debit/credit card via PayPal — no account needed.
        </p>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function CheckoutPage() {
  const navigate = useNavigate();
  const { plan: planId } = useSearch({ from: "/checkout" });
  const [currency, setCurrency] = useState<CurrencyInfo | null>(null);
  const [success, setSuccess] = useState(false);

  const plan = PLANS[planId] ?? PLANS["monthly"]!;

  useEffect(() => { detectCurrency().then(setCurrency); }, []);

  if (success) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-5 bg-zinc-50 px-4">
        <div className="flex size-20 items-center justify-center rounded-full bg-emerald-500 shadow-lg">
          <Check className="size-10 text-white" strokeWidth={3} />
        </div>
        <h1 className="text-3xl font-bold text-zinc-900">Payment successful!</h1>
        <p className="text-zinc-500">Welcome to ExamGlow Premium. Redirecting…</p>
      </div>
    );
  }

  return (
    <div className="min-h-dvh bg-zinc-50">
      {/* Top bar */}
      <header className="sticky top-0 z-10 border-b border-zinc-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            <img src={logoMark} alt="ExamGlow" className="size-8 rounded-full" />
            <span className="text-[17px] font-bold text-zinc-900">ExamGlow</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-zinc-400">
            <Lock className="size-3.5" />
            Secure checkout
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-4 py-8 sm:py-12">
        <button
          onClick={() => navigate({ to: "/pricing" })}
          className="mb-6 flex items-center gap-2 text-sm text-zinc-500 hover:text-zinc-800"
        >
          <ArrowLeft className="size-4" /> Back to plans
        </button>

        <div className="grid gap-6 lg:grid-cols-[1fr_420px]">

          {/* ── Left: PayPal payment ─────────────────────────────────────── */}
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <h1 className="text-xl font-bold text-zinc-900">Complete your purchase</h1>
            <p className="mt-1 text-sm text-zinc-500">
              Pay securely with PayPal or any major debit/credit card
            </p>

            {/* Order summary */}
            <div className="mt-6 rounded-2xl bg-zinc-50 p-5">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-zinc-800">{plan.name}</span>
                <span className="font-bold text-zinc-900">
                  {currency ? formatPrice(planId, currency) : "…"}
                </span>
              </div>
              <p className="mt-0.5 text-xs text-zinc-400">{plan.period}</p>
              <div className="mt-3 border-t border-zinc-200 pt-3 flex items-center justify-between">
                <span className="text-sm font-medium text-zinc-600">Total due today</span>
                <span className="text-lg font-bold text-zinc-900">
                  {currency ? formatPrice(planId, currency) : "…"}
                </span>
              </div>
              {currency && currency.code !== "USD" && (
                <p className="mt-1 text-right text-xs text-zinc-400">
                  Prices in {currency.code}
                </p>
              )}
            </div>

            {/* PayPal */}
            <div className="mt-6">
              {currency ? (
                <PayPalSection
                  key={`${planId}-${currency.code}`}
                  planId={planId}
                  currency={currency}
                  onSuccess={() => {
                    setSuccess(true);
                    setTimeout(() => navigate({ to: "/home" }), 2500);
                  }}
                />
              ) : (
                <div className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-zinc-100 text-sm text-zinc-500">
                  <Loader2 className="size-4 animate-spin" />
                  Detecting your location…
                </div>
              )}
            </div>

            {/* Trust row */}
            <div className="mt-6 flex items-center justify-center gap-5 text-xs text-zinc-400">
              <span className="flex items-center gap-1"><Lock className="size-3" /> 256-bit SSL</span>
              <span className="flex items-center gap-1"><ShieldCheck className="size-3" /> Secure</span>
              <span className="flex items-center gap-1"><Check className="size-3" /> Cancel anytime</span>
            </div>

            {/* Card logos */}
            <div className="mt-4 flex items-center justify-center gap-2">
              {["Visa", "Mastercard", "Amex", "Discover", "PayPal"].map(c => (
                <span key={c}
                  className="rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-[11px] font-bold text-zinc-500">
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right: Plan summary ──────────────────────────────────────── */}
          <div className="flex flex-col gap-4">
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h2 className="font-bold text-zinc-900">{plan.name}</h2>
              <p className="mt-1 text-sm text-zinc-500 capitalize">{plan.period}</p>

              <div className="mt-5 space-y-3">
                {plan.features.map(f => (
                  <div key={f} className="flex items-center gap-3">
                    <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-emerald-100">
                      <Check className="size-3 text-emerald-600" strokeWidth={3} />
                    </span>
                    <span className="text-sm text-zinc-700">{f}</span>
                  </div>
                ))}
              </div>

              <div className="mt-6 border-t border-zinc-100 pt-5">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-semibold text-zinc-700">Total</span>
                  <span className="text-xl font-bold text-zinc-900">
                    {currency ? formatPrice(planId, currency) : "…"}
                  </span>
                </div>
              </div>
            </div>

            {/* Help note */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 text-sm text-zinc-500">
              <p className="font-semibold text-zinc-700">Paying without a PayPal account?</p>
              <p className="mt-1">
                Click the PayPal button and look for{" "}
                <strong className="text-zinc-700">"Pay with Debit or Credit Card"</strong>
                {" "}below the login form — no account required.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
