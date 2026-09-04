import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Check,
  Lock,
  ShieldCheck,
  Loader2,
  AlertCircle,
} from "lucide-react";

import logoMark from "@/assets/logo-mark.png";
import { saveProfile } from "@/lib/onboarding";
import {
  detectCurrency,
  formatPrice,
  convertPrice,
  loadPayPalSDK,
  PAYPAL_SUPPORTED_CURRENCIES,
  CURRENCIES,
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
    features: [
      "Full notes access",
      "Past papers",
      "AI chat & 24/7 Tutor",
      "Syllabus & exam specs",
      "Cancel anytime",
    ],
  },
  monthly: {
    name: "Monthly Plan",
    period: "billed every month",
    features: [
      "Full notes access",
      "Past papers",
      "AI chat & 24/7 Tutor",
      "Syllabus & exam specs",
      "Personalized study plan",
      "Cancel anytime",
    ],
  },
  termly: {
    name: "Termly Plan",
    period: "billed every 3 months",
    features: [
      "Full notes access",
      "Past papers",
      "AI chat & 24/7 Tutor",
      "Syllabus & exam specs",
      "Personalized study plan",
      "Priority support",
      "Cancel anytime",
    ],
  },
  "exam-pass": {
    name: "Exam Pass",
    period: "valid until end of exam season",
    features: [
      "Full notes access",
      "Past papers",
      "AI chat & 24/7 Tutor",
      "Syllabus & exam specs",
      "Personalized study plan",
      "Exam prep toolkit",
    ],
  },
};

// ─── PayPal Smart Buttons Component ──────────────────────────────────────────

function PayPalSection({
  planId,
  currency,
  onSuccess,
}: {
  planId: string;
  currency: CurrencyInfo;
  onSuccess: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const renderedRef = useRef(false);

  const sdkCurrency = PAYPAL_SUPPORTED_CURRENCIES.has(currency.code) ? currency.code : "USD";
  const amount = sdkCurrency === currency.code
    ? convertPrice(planId, currency)
    : convertPrice(planId, CURRENCIES["USD"]);
  const plan = PLANS[planId] ?? PLANS["monthly"]!;

  const initPayPal = useCallback(async () => {
    try {
      setStatus("loading");
      setErrorMessage(null);
      renderedRef.current = false;

      await loadPayPalSDK(sdkCurrency);

      if (!window.paypal || !containerRef.current) {
        throw new Error("PayPal SDK was not loaded");
      }

      containerRef.current.innerHTML = "";

      const buttons = window.paypal.Buttons({
        style: {
          layout: "vertical",
          color: "gold",
          shape: "rect",
          label: "paypal",
          height: 48,
          tagline: false,
        },
        createOrder: (_data, actions) => {
          return actions.order.create({
            intent: "CAPTURE",
            purchase_units: [
              {
                description: `ExamGlow Premium — ${plan.name}`,
                amount: {
                  currency_code: sdkCurrency,
                  value: amount,
                },
              },
            ],
            application_context: {
              shipping_preference: "NO_SHIPPING",
            },
          });
        },
        onApprove: async (_data, actions) => {
          try {
            await actions.order.capture();
          } catch (e) {
            console.warn("Capture note:", e);
          }
          saveProfile({ plan: planId as PlanLabel });
          const uid = window.localStorage.getItem("examglow.google_sub");
          if (uid) {
            await updateAccountPlan(uid, planId as PlanLabel);
          }
          onSuccess();
        },
        onError: (err: unknown) => {
          console.error("PayPal transaction error:", err);
          setErrorMessage("Payment was interrupted or declined. Please try again.");
        },
        onCancel: () => {
          console.log("PayPal payment canceled by user");
        },
      });

      await buttons.render(containerRef.current);
      renderedRef.current = true;
      setStatus("ready");
    } catch (err: unknown) {
      console.error("PayPal init error:", err);
      setStatus("error");
      setErrorMessage("Could not load PayPal checkout. Please retry below.");
    }
  }, [plan, planId, sdkCurrency, amount, onSuccess]);

  useEffect(() => {
    initPayPal();
  }, [initPayPal]);

  return (
    <div className="space-y-3">
      {status === "loading" && (
        <div className="space-y-3 py-3">
          <div className="flex h-12 w-full animate-pulse items-center justify-center rounded-2xl bg-amber-500/10 text-xs font-semibold text-amber-900/80 border border-amber-500/20">
            <Loader2 className="mr-2 size-4 animate-spin text-amber-600" />
            Loading PayPal & Card Checkout…
          </div>
          <div className="h-12 w-full animate-pulse rounded-2xl bg-zinc-100" />
        </div>
      )}

      {errorMessage && (
        <div className="flex items-center justify-between rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-900">
          <div className="flex items-center gap-2">
            <AlertCircle className="size-4 shrink-0 text-amber-600" />
            <span>{errorMessage}</span>
          </div>
          <button
            type="button"
            onClick={() => initPayPal()}
            className="ml-3 shrink-0 rounded-full bg-amber-600 px-3 py-1 font-bold text-white hover:bg-amber-700 transition"
          >
            Retry
          </button>
        </div>
      )}

      {/* Official PayPal Buttons Container */}
      <div
        ref={containerRef}
        id="paypal-button-container"
        className={status === "ready" ? "block" : "hidden"}
      />

      {status === "error" && (
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 text-center">
          <p className="text-xs text-zinc-500 mb-3">
            PayPal checkout could not be loaded. Please ensure PayPal is allowed in your browser settings or try again.
          </p>
          <button
            type="button"
            onClick={() => initPayPal()}
            className="rounded-full bg-zinc-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-zinc-800 transition"
          >
            Retry Connection
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Success screen ────────────────────────────────────────────────────────────

function SuccessScreen() {
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

// ─── Page ─────────────────────────────────────────────────────────────────────

function CheckoutPage() {
  const navigate = useNavigate();
  const { plan: planId } = useSearch({ from: "/checkout" });
  const [currency, setCurrency] = useState<CurrencyInfo | null>(null);
  const [success, setSuccess] = useState(false);
  const successRef = useRef(false);

  const plan = PLANS[planId] ?? PLANS["monthly"]!;

  useEffect(() => { detectCurrency().then(setCurrency); }, []);

  const handleSuccess = useCallback(() => {
    if (successRef.current) return;
    successRef.current = true;
    setSuccess(true);
    setTimeout(() => navigate({ to: "/home" }), 2500);
  }, [navigate]);

  if (success) return <SuccessScreen />;

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
            <Lock className="size-3.5" /> Secure checkout
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

        <div className="grid gap-6 lg:grid-cols-[1fr_400px]">

          {/* ── Left: Payment form ─────────────────────────────────────────── */}
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
                  Prices converted for your location ({currency.code})
                </p>
              )}
            </div>

            {/* PayPal Buttons */}
            <div className="mt-6">
              {currency ? (
                <PayPalSection
                  key={`${planId}-${currency.code}`}
                  planId={planId}
                  currency={currency}
                  onSuccess={handleSuccess}
                />
              ) : (
                <div className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-zinc-100 text-sm text-zinc-500">
                  <Loader2 className="size-4 animate-spin" /> Detecting location…
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
              {["Visa", "Mastercard", "Amex", "Discover", "PayPal"].map((c) => (
                <span
                  key={c}
                  className="rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-[11px] font-bold text-zinc-500"
                >
                  {c}
                </span>
              ))}
            </div>

            {/* Terms of Service & Auto-Renewal Notice */}
            <div className="mt-6 rounded-2xl border border-zinc-200 bg-zinc-50/80 p-4 text-[12px] text-zinc-600 leading-relaxed">
              <p className="font-semibold text-zinc-800 mb-1">Terms of Service & Auto-Renewal Policy</p>
              <p>
                By completing your payment, you agree to our Terms of Service and acknowledge that your subscription will automatically renew at the end of each billing cycle ({plan.period}) at the regular rate shown above unless cancelled.
              </p>
              <p className="mt-1.5 text-zinc-500">
                You can easily turn off auto-renewal or cancel anytime with one click in your{" "}
                <button
                  type="button"
                  onClick={() => navigate({ to: "/settings" })}
                  className="font-medium text-zinc-800 underline hover:text-black"
                >
                  Account Settings
                </button>
                . There are no cancellation fees, lock-ins, or hidden charges.
              </p>
            </div>
          </div>

          {/* ── Right: Plan summary ─────────────────────────────────────────── */}
          <div className="flex flex-col gap-4">
            <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm">
              <h2 className="font-bold text-zinc-900">{plan.name}</h2>
              <p className="mt-1 text-sm text-zinc-500 capitalize">{plan.period}</p>

              <div className="mt-5 space-y-3">
                {plan.features.map((f) => (
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
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 text-sm text-zinc-500 shadow-sm">
              <p className="font-semibold text-zinc-800">Don't have a PayPal account?</p>
              <p className="mt-1 text-xs text-zinc-500 leading-relaxed">
                Click the black <strong className="text-zinc-700">"Debit or Credit Card"</strong> button directly under the PayPal button to pay with your card — no PayPal registration required.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
