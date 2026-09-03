import { createFileRoute, useNavigate, useSearch } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Check,
  Lock,
  ShieldCheck,
  Loader2,
  CreditCard,
  AlertCircle,
} from "lucide-react";
import { loadStripe, type Stripe as StripeType } from "@stripe/stripe-js";
import {
  Elements,
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

import logoMark from "@/assets/logo-mark.png";
import { saveProfile } from "@/lib/onboarding";
import {
  detectCurrency,
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

// ─── Stripe setup ─────────────────────────────────────────────────────────────

const STRIPE_PK =
  (import.meta.env["VITE_STRIPE_PUBLISHABLE_KEY"] as string | undefined) ?? "";

let _stripePromise: ReturnType<typeof loadStripe> | null = null;
function getStripePromise() {
  if (!_stripePromise) _stripePromise = loadStripe(STRIPE_PK);
  return _stripePromise;
}

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
    features: [
      "Full notes access",
      "Past papers",
      "AI chat",
      "Priority support",
      "Cancel anytime",
    ],
  },
  termly: {
    name: "Termly Plan",
    period: "billed every 3 months",
    features: [
      "Full notes access",
      "Past papers",
      "AI chat",
      "Priority support",
      "Study plan",
      "Cancel anytime",
    ],
  },
  "exam-pass": {
    name: "Exam Pass",
    period: "valid until end of exam season",
    features: [
      "Full notes access",
      "Past papers",
      "AI chat",
      "Priority support",
      "Study plan",
      "Exam prep toolkit",
    ],
  },
};

// ─── Stripe card element styles ───────────────────────────────────────────────

const ELEMENT_STYLE = {
  base: {
    fontSize: "15px",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    color: "#18181b",
    "::placeholder": { color: "#a1a1aa" },
    iconColor: "#71717a",
  },
  invalid: { color: "#ef4444" },
};

// ─── Inner card form (must be inside <Elements>) ──────────────────────────────

function CardForm({
  planId,
  currency,
  onSuccess,
}: {
  planId: string;
  currency: CurrencyInfo;
  onSuccess: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [cardReady, setCardReady] = useState(false);

  const amount = convertPrice(planId, currency);
  const plan = PLANS[planId] ?? PLANS["monthly"]!;

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (!stripe || !elements) return;

      setProcessing(true);
      setError(null);

      try {
        // 1. Create PaymentIntent on server
        const res = await fetch("/api/payment-intent", {
          method: "POST",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            amount: parseFloat(amount),
            currency: currency.code,
            planId,
          }),
        });

        const data = (await res.json()) as {
          clientSecret?: string;
          error?: string;
        };

        if (!res.ok || !data.clientSecret) {
          setError(data.error ?? "Could not initialise payment. Please try again.");
          setProcessing(false);
          return;
        }

        // 2. Confirm card payment with Stripe
        const cardElement = elements.getElement(CardNumberElement);
        if (!cardElement) {
          setError("Card element not found. Please refresh the page.");
          setProcessing(false);
          return;
        }

        const { error: stripeErr, paymentIntent } =
          await stripe.confirmCardPayment(data.clientSecret, {
            payment_method: { card: cardElement },
          });

        if (stripeErr) {
          setError(stripeErr.message ?? "Payment failed. Please try again.");
        } else if (paymentIntent?.status === "succeeded") {
          // 3. Upgrade plan locally + in Supabase
          saveProfile({ plan: planId as PlanLabel });
          const uid = window.localStorage.getItem("examglow.google_sub");
          if (uid) await updateAccountPlan(uid, planId as PlanLabel);
          onSuccess();
        }
      } catch (err: unknown) {
        const msg = err instanceof Error ? err.message : "An error occurred";
        setError(msg);
      } finally {
        setProcessing(false);
      }
    },
    [stripe, elements, amount, currency, planId, onSuccess],
  );

  if (!STRIPE_PK) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
        <p className="font-semibold">Stripe not configured yet</p>
        <p className="mt-1 text-amber-700">
          Add <code className="rounded bg-amber-100 px-1">VITE_STRIPE_PUBLISHABLE_KEY</code>{" "}
          and <code className="rounded bg-amber-100 px-1">STRIPE_SECRET_KEY</code> to your
          Cloudflare environment variables to accept card payments.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Card number */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">
          Card number
        </label>
        <div
          className={`flex items-center gap-3 rounded-2xl border px-4 py-3.5 transition-shadow focus-within:border-zinc-400 focus-within:ring-2 focus-within:ring-zinc-200 ${
            cardReady ? "border-zinc-300" : "border-zinc-200"
          } bg-white`}
        >
          <CreditCard className="size-4 shrink-0 text-zinc-400" />
          <div className="w-full">
            <CardNumberElement
              options={{ style: ELEMENT_STYLE, showIcon: true }}
              onReady={() => setCardReady(true)}
            />
          </div>
        </div>
      </div>

      {/* Expiry + CVC */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">
            Expiry
          </label>
          <div className="rounded-2xl border border-zinc-200 bg-white px-4 py-3.5 transition-shadow focus-within:border-zinc-400 focus-within:ring-2 focus-within:ring-zinc-200">
            <CardExpiryElement options={{ style: ELEMENT_STYLE }} />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">
            CVC
          </label>
          <div className="rounded-2xl border border-zinc-200 bg-white px-4 py-3.5 transition-shadow focus-within:border-zinc-400 focus-within:ring-2 focus-within:ring-zinc-200">
            <CardCvcElement options={{ style: ELEMENT_STYLE }} />
          </div>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={!stripe || processing}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-zinc-900 py-3.5 text-[15px] font-semibold text-white transition-all hover:bg-zinc-700 active:scale-[0.99] disabled:opacity-60"
      >
        {processing ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Processing…
          </>
        ) : (
          <>
            <Lock className="size-4" />
            Pay {formatPrice(planId, currency)} — {plan.name}
          </>
        )}
      </button>

      {/* Card logos */}
      <div className="flex items-center justify-center gap-2 pt-1">
        {["Visa", "Mastercard", "Amex", "Discover"].map((c) => (
          <span
            key={c}
            className="rounded-md border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-[11px] font-bold text-zinc-500"
          >
            {c}
          </span>
        ))}
      </div>
    </form>
  );
}

// ─── Stripe Elements wrapper ───────────────────────────────────────────────────

function StripeSection({
  planId,
  currency,
  onSuccess,
}: {
  planId: string;
  currency: CurrencyInfo;
  onSuccess: () => void;
}) {
  const stripePromise = getStripePromise();

  if (!STRIPE_PK) {
    return (
      <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
        <p className="font-semibold">Stripe not configured yet</p>
        <p className="mt-1 text-amber-700">
          Add <code className="rounded bg-amber-100 px-1">VITE_STRIPE_PUBLISHABLE_KEY</code>{" "}
          and <code className="rounded bg-amber-100 px-1">STRIPE_SECRET_KEY</code> to your
          Cloudflare environment variables.
        </p>
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise}>
      <CardForm planId={planId} currency={currency} onSuccess={onSuccess} />
    </Elements>
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

  useEffect(() => {
    detectCurrency().then(setCurrency);
  }, []);

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

        <div className="grid gap-6 lg:grid-cols-[1fr_400px]">

          {/* ── Left: Card form ──────────────────────────────────────────── */}
          <div className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
            <h1 className="text-xl font-bold text-zinc-900">Complete your purchase</h1>
            <p className="mt-1 text-sm text-zinc-500">
              Pay securely with your debit or credit card
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

            {/* Card form */}
            <div className="mt-6">
              {currency ? (
                <StripeSection
                  key={`${planId}-${currency.code}`}
                  planId={planId}
                  currency={currency}
                  onSuccess={handleSuccess}
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
              <span className="flex items-center gap-1">
                <Lock className="size-3" /> 256-bit SSL
              </span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="size-3" /> Secure
              </span>
              <span className="flex items-center gap-1">
                <Check className="size-3" /> Cancel anytime
              </span>
            </div>
          </div>

          {/* ── Right: Plan summary ───────────────────────────────────────── */}
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

            {/* Security note */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 text-sm text-zinc-500">
              <p className="font-semibold text-zinc-700 flex items-center gap-2">
                <ShieldCheck className="size-4 text-emerald-500" />
                100% secure payment
              </p>
              <p className="mt-2">
                Your card details are encrypted and processed by{" "}
                <strong className="text-zinc-700">Stripe</strong> — one of the world's most
                trusted payment platforms. We never store your card information.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
