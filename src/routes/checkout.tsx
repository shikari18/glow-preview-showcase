import { createFileRoute, useNavigate, useSearch, Link } from "@tanstack/react-router";
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

import logoMark from "@/assets/logo-mark.png";
import {
  saveProfile,
  readProfile,
  lockGoogleAccountPlan,
  getActiveSubscription,
  syncGoogleAccountPlan,
} from "@/lib/onboarding";
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
    plan: (s["plan"] as string) || "termly",
  }),
  head: () => ({ meta: [{ title: "Checkout — ExamGlow" }] }),
  component: CheckoutPage,
});

// ─── Plan data (Exact 3 Plans) ────────────────────────────────────────────────

const PLANS: Record<string, { name: string; period: string; features: string[] }> = {
  weekly: {
    name: "Weekly Plan",
    period: "billed every week",
    features: [
      "Full notes access & syllabus specs",
      "Past papers & mark schemes",
      "AI Tutor Yumna (voice & chat)",
      "Cross-device Google account access",
      "Cancel anytime",
    ],
  },
  termly: {
    name: "3 Months Plan",
    period: "billed every 3 months",
    features: [
      "Full notes access & syllabus specs",
      "Past papers & mark schemes",
      "AI Tutor Yumna (voice & chat)",
      "Personalized revision plan",
      "Cross-device Google account access",
      "Cancel anytime",
    ],
  },
  yearly: {
    name: "1 Year Plan",
    period: "billed every year",
    features: [
      "Full notes access & syllabus specs",
      "Past papers & mark schemes",
      "AI Tutor Yumna (voice & chat)",
      "Personalized revision plan",
      "Full exam season protection",
      "Cross-device Google account access",
      "Cancel anytime",
    ],
  },
  // Aliases for compatibility
  "3months": {
    name: "3 Months Plan",
    period: "billed every 3 months",
    features: [
      "Full notes access & syllabus specs",
      "Past papers & mark schemes",
      "AI Tutor Yumna (voice & chat)",
      "Personalized revision plan",
      "Cross-device Google account access",
      "Cancel anytime",
    ],
  },
  "1year": {
    name: "1 Year Plan",
    period: "billed every year",
    features: [
      "Full notes access & syllabus specs",
      "Past papers & mark schemes",
      "AI Tutor Yumna (voice & chat)",
      "Personalized revision plan",
      "Full exam season protection",
      "Cross-device Google account access",
      "Cancel anytime",
    ],
  },
  monthly: {
    name: "3 Months Plan",
    period: "billed every 3 months",
    features: [
      "Full notes access & syllabus specs",
      "Past papers & mark schemes",
      "AI Tutor Yumna (voice & chat)",
      "Personalized revision plan",
      "Cross-device Google account access",
      "Cancel anytime",
    ],
  },
};

// ─── Real PayPal & Card Checkout Section ─────────────────────────────────────

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
  const [sdkLoading, setSdkLoading] = useState(true);
  const [sdkError, setSdkError] = useState<string | null>(null);

  const sdkCurrency = PAYPAL_SUPPORTED_CURRENCIES.has(currency.code) ? currency.code : "USD";
  const amount = sdkCurrency === currency.code
    ? convertPrice(planId, currency)
    : convertPrice(planId, CURRENCIES["USD"]);
  const plan = PLANS[planId] ?? PLANS["termly"]!;

  useEffect(() => {
    let active = true;
    setSdkLoading(true);
    setSdkError(null);

    loadPayPalSDK(sdkCurrency)
      .then(async () => {
        if (!active || !containerRef.current || !window.paypal) return;
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
            const normalizedPlan = (planId === "3months" ? "termly" : planId === "1year" ? "yearly" : planId === "monthly" ? "termly" : planId) as PlanLabel;
            saveProfile({ plan: normalizedPlan });
            const uid = typeof window !== "undefined" ? window.localStorage.getItem("examglow.google_sub") : null;
            const userEmail = typeof window !== "undefined" ? readProfile().email : null;
            await lockGoogleAccountPlan(normalizedPlan, userEmail ?? undefined, uid ?? undefined);
            if (uid) await updateAccountPlan(uid, normalizedPlan);
            onSuccess();
          },
          onError: (err: unknown) => {
            console.error("PayPal transaction error:", err);
            if (active) setSdkError("PayPal transaction encountered an issue. Please try again.");
          },
        });

        await buttons.render(containerRef.current);
        if (active) setSdkLoading(false);
      })
      .catch((err) => {
        console.warn("PayPal SDK load error:", err);
        if (active) {
          setSdkLoading(false);
          setSdkError("Unable to load PayPal checkout. Please check your internet connection.");
        }
      });

    return () => {
      active = false;
      if (containerRef.current) containerRef.current.innerHTML = "";
    };
  }, [plan, planId, sdkCurrency, amount, onSuccess]);

  return (
    <div className="space-y-4">
      {sdkLoading && (
        <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-zinc-200 bg-zinc-50/80 py-10 text-zinc-500">
          <Loader2 className="size-6 animate-spin text-blue-600" />
          <span className="text-xs font-semibold text-zinc-600">
            Loading official PayPal &amp; Card checkout…
          </span>
        </div>
      )}

      {sdkError && (
        <div className="rounded-2xl border border-red-200 bg-red-50/80 p-4 text-xs text-red-700 space-y-2">
          <p className="font-semibold flex items-center gap-1.5">
            <AlertCircle className="size-4" /> {sdkError}
          </p>
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="font-medium underline hover:text-red-900"
          >
            Refresh checkout
          </button>
        </div>
      )}

      {/* Real PayPal & Card buttons container */}
      <div
        ref={containerRef}
        id="paypal-button-container"
        className={sdkLoading ? "hidden" : "block min-h-[100px]"}
      />
    </div>
  );
}

// ─── Active Subscription Blocked Screen ───────────────────────────────────────

function ActiveSubscriptionBlocked({
  activeSub,
}: {
  activeSub: NonNullable<ReturnType<typeof getActiveSubscription>>;
}) {
  return (
    <div className="flex min-h-dvh flex-col justify-between bg-zinc-50 text-zinc-900">
      {/* Top bar */}
      <header className="border-b border-zinc-200 bg-white/90 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between">
          <Link to="/home" className="flex items-center gap-2.5">
            <img src={logoMark} alt="ExamGlow" className="size-8 rounded-full" />
            <span className="text-[17px] font-bold text-zinc-900">ExamGlow</span>
          </Link>
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600">
            <ShieldCheck className="size-4" /> Pro Access Active
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-lg px-4 py-12 text-center my-auto">
        <div className="mx-auto flex size-20 items-center justify-center rounded-3xl bg-emerald-100 text-emerald-600 mb-6 shadow-sm">
          <ShieldCheck className="size-10" />
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3.5 py-1 text-xs font-semibold text-emerald-700 mb-4">
          Active Subscription
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-zinc-900">
          You Already Have an Active Plan
        </h1>

        <p className="mt-3 text-sm text-zinc-600 leading-relaxed">
          Your account is currently locked into the <strong className="text-zinc-900 font-semibold">{activeSub.planName}</strong> with full unlocked access to all revision materials, past papers, mark schemes, and Yumna AI tutor.
        </p>

        {/* Plan details card */}
        <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-5 text-left shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
            <span className="text-xs text-zinc-500 font-medium">Active Plan</span>
            <span className="text-sm font-bold text-zinc-900">{activeSub.planName}</span>
          </div>
          <div className="flex items-center justify-between border-b border-zinc-100 pb-3">
            <span className="text-xs text-zinc-500 font-medium">Access Status</span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
              <Check className="size-3" strokeWidth={3} /> Pro Unlocked
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500 font-medium">Valid Until</span>
            <span className="text-xs font-bold text-zinc-800">
              {activeSub.formattedExpiry} ({activeSub.daysRemaining} days remaining)
            </span>
          </div>
        </div>

        {/* Protection notice */}
        <div className="mt-5 rounded-2xl bg-amber-50 border border-amber-200 p-4 text-xs text-amber-900 leading-relaxed text-left flex items-start gap-2.5">
          <Lock className="size-4 text-amber-700 shrink-0 mt-0.5" />
          <span>
            <strong>Account Protected:</strong> To prevent accidental duplicate billing, additional purchases and upgrades are blocked for this account until your current subscription expires.
          </span>
        </div>

        {/* Action buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/home"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-zinc-900 px-6 py-3.5 text-sm font-semibold text-white hover:bg-zinc-800 transition shadow-sm"
          >
            Go to Home Dashboard
          </Link>
          <Link
            to="/settings"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl border border-zinc-200 bg-white px-5 py-3.5 text-sm font-medium text-zinc-700 hover:bg-zinc-100 transition shadow-sm"
          >
            Manage Subscription
          </Link>
        </div>
      </main>

      <footer className="border-t border-zinc-200 bg-white py-6 text-center text-xs text-zinc-400">
        <p>&copy; {new Date().getFullYear()} ExamGlow. All rights reserved.</p>
      </footer>
    </div>
  );
}

// ─── Success screen ────────────────────────────────────────────────────────────

function SuccessScreen() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-5 bg-zinc-50 px-4 text-center">
      <div className="flex size-20 items-center justify-center rounded-full bg-emerald-500 shadow-lg">
        <Check className="size-10 text-white" strokeWidth={3} />
      </div>
      <h1 className="text-3xl font-bold text-zinc-900">Payment successful!</h1>
      <p className="text-zinc-500 max-w-sm">
        Welcome to ExamGlow Pro! Your subscription is active and locked into your account. Unlocking full access to all revision materials…
      </p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function CheckoutPage() {
  const navigate = useNavigate();
  const { plan: planId } = useSearch({ from: "/checkout" });
  const [currency, setCurrency] = useState<CurrencyInfo | null>(null);
  const [success, setSuccess] = useState(false);
  const [activeSub, setActiveSub] = useState(() => getActiveSubscription());
  const successRef = useRef(false);

  const plan = PLANS[planId] ?? PLANS["termly"]!;

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

  const handleSuccess = useCallback(() => {
    if (successRef.current) return;
    successRef.current = true;
    setSuccess(true);
    setTimeout(() => navigate({ to: "/home" }), 2000);
  }, [navigate]);

  if (activeSub) return <ActiveSubscriptionBlocked activeSub={activeSub} />;
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

            {/* Legal agreement links */}
            <p className="mt-6 text-center text-xs text-zinc-500 leading-normal">
              By completing your purchase, you agree to our{" "}
              <Link to="/terms" className="font-medium text-zinc-800 underline hover:text-black">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link to="/privacy" className="font-medium text-zinc-800 underline hover:text-black">
                Privacy Policy
              </Link>
              . Subscriptions automatically renew until cancelled in your{" "}
              <Link to="/settings" className="font-medium text-zinc-800 underline hover:text-black">
                Account Settings
              </Link>
              .
            </p>
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
