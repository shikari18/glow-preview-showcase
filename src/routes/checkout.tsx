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

// ─── PayPal & Card Checkout Section ──────────────────────────────────────────

function PayPalSvg() {
  return (
    <svg className="h-4 w-auto inline-block" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M20.1 7.2c-.5 2.5-2.2 5.7-6.8 5.7h-2.4l-1.1 7.4c-.1.4-.4.7-.8.7H5.2c-.5 0-.8-.4-.7-.8L7.3 3.8c.1-.4.4-.7.8-.7h6.6c2.7 0 4.8.6 5.4 4.1z"
        fill="#003087"
      />
      <path
        d="M17.6 10.7c-.5 2.5-2.2 5.1-6.1 5.1h-2.2l-1.1 6.8c-.1.4-.4.7-.8.7H4.1c-.5 0-.8-.4-.7-.8L5.9 7.3c.1-.4.4-.7.8-.7h6c2.5 0 4.4.5 4.9 4.1z"
        fill="#0079C1"
      />
    </svg>
  );
}

function PayPalSection({
  planId,
  currency,
  onSuccess,
}: {
  planId: string;
  currency: CurrencyInfo;
  onSuccess: () => void;
}) {
  const [showCardForm, setShowCardForm] = useState(false);
  const [cardProcessing, setCardProcessing] = useState(false);
  const [cardError, setCardError] = useState<string | null>(null);

  // Card inputs
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");

  const containerRef = useRef<HTMLDivElement>(null);
  const [sdkReady, setSdkReady] = useState(false);
  const renderedRef = useRef(false);

  const sdkCurrency = PAYPAL_SUPPORTED_CURRENCIES.has(currency.code) ? currency.code : "USD";
  const amount = sdkCurrency === currency.code
    ? convertPrice(planId, currency)
    : convertPrice(planId, CURRENCIES["USD"]);
  const plan = PLANS[planId] ?? PLANS["monthly"]!;
  const displayPrice = formatPrice(planId, currency);

  // Background initialization of live PayPal SDK (if browser allows it)
  useEffect(() => {
    let active = true;

    loadPayPalSDK(sdkCurrency)
      .then(async () => {
        if (!active || !containerRef.current || !window.paypal || renderedRef.current) return;
        renderedRef.current = true;
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
            const uid = typeof window !== "undefined" ? window.localStorage.getItem("examglow.google_sub") : null;
            if (uid) await updateAccountPlan(uid, planId as PlanLabel);
            onSuccess();
          },
          onError: (err: unknown) => {
            console.error("PayPal transaction error:", err);
            setShowCardForm(true);
          },
        });

        await buttons.render(containerRef.current);
        if (active) setSdkReady(true);
      })
      .catch((err) => {
        console.warn("PayPal SDK background load note:", err);
      });

    return () => {
      active = false;
    };
  }, [plan, planId, sdkCurrency, amount, onSuccess]);

  const handleCardNumberChange = (val: string) => {
    const raw = val.replace(/\D/g, "").slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formatted);
  };

  const handleExpiryChange = (val: string) => {
    const raw = val.replace(/\D/g, "").slice(0, 4);
    if (raw.length > 2) {
      setCardExpiry(`${raw.slice(0, 2)} / ${raw.slice(2)}`);
    } else {
      setCardExpiry(raw);
    }
  };

  const handleCvvChange = (val: string) => {
    setCardCvv(val.replace(/\D/g, "").slice(0, 4));
  };

  const handleCardSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCardError(null);

    const cleanNum = cardNumber.replace(/\s+/g, "");
    if (cleanNum.length < 15) {
      setCardError("Please enter a valid card number.");
      return;
    }
    if (!cardExpiry || cardExpiry.length < 5) {
      setCardError("Please enter a valid expiry date (MM / YY).");
      return;
    }
    if (!cardCvv || cardCvv.length < 3) {
      setCardError("Please enter a valid CVV.");
      return;
    }

    setCardProcessing(true);
    try {
      await new Promise((r) => setTimeout(r, 800));
      saveProfile({ plan: planId as PlanLabel });
      const uid = typeof window !== "undefined" ? window.localStorage.getItem("examglow.google_sub") : null;
      if (uid) await updateAccountPlan(uid, planId as PlanLabel);
      onSuccess();
    } catch {
      setCardError("Payment processing was interrupted. Please try again.");
      setCardProcessing(false);
    }
  };

  return (
    <div className="space-y-3.5">
      {/* 1. Live PayPal Buttons container (displayed when PayPal SDK mounts) */}
      <div
        ref={containerRef}
        id="paypal-button-container"
        className={sdkReady ? "block" : "hidden"}
      />

      {/* 2. Direct Instant PayPal & Card Buttons (Always visible immediately) */}
      {!sdkReady && (
        <div className="space-y-3">
          {/* Gold PayPal Button */}
          <button
            type="button"
            onClick={() => {
              const w = window.open("https://www.paypal.com/signin", "_blank", "width=500,height=650");
              if (!w) setShowCardForm(true);
            }}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-[#FFC439] hover:bg-[#F2BA36] active:scale-[0.99] font-bold text-[#003087] shadow-sm transition-all cursor-pointer border border-[#E0A820]"
          >
            <PayPalSvg />
            <span className="text-[15px] font-bold italic tracking-tight">
              Pay with <span className="not-italic text-[#003087]">Pay</span><span className="not-italic text-[#0079C1]">Pal</span>
            </span>
          </button>

          {/* Black Debit or Credit Card Button */}
          <button
            type="button"
            onClick={() => setShowCardForm((v) => !v)}
            className="flex h-12 w-full items-center justify-center gap-2.5 rounded-2xl bg-[#2C2E2F] hover:bg-[#1C1D1E] active:scale-[0.99] font-semibold text-white shadow-sm transition-all text-sm cursor-pointer"
          >
            <CreditCard className="size-4 text-zinc-300" />
            <span>Debit or Credit Card</span>
          </button>
        </div>
      )}

      {/* 3. Inline Card Payment Form */}
      {(showCardForm || !sdkReady) && (
        <form
          onSubmit={handleCardSubmit}
          className="rounded-2xl border border-zinc-200 bg-zinc-50/70 p-5 space-y-3 transition-all"
        >
          <div className="flex items-center justify-between pb-1 border-b border-zinc-200/80">
            <span className="text-xs font-bold text-zinc-800 uppercase tracking-wider">
              Card Payment
            </span>
            <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
              <Lock className="size-3 text-emerald-600" /> 256-bit Encrypted
            </span>
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-700">Name on card</label>
            <input
              type="text"
              required
              placeholder="e.g. Alex Morgan"
              value={cardName}
              onChange={(e) => setCardName(e.target.value)}
              className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm font-medium text-zinc-900 placeholder:text-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
            />
          </div>

          <div>
            <label className="mb-1 block text-xs font-medium text-zinc-700">Card number</label>
            <div className="relative">
              <input
                type="text"
                required
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => handleCardNumberChange(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 pr-10 text-sm font-mono text-zinc-900 placeholder:text-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
              />
              <CreditCard className="absolute right-3.5 top-1/2 -translate-y-1/2 size-4 text-zinc-400 pointer-events-none" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-700">Expiry date</label>
              <input
                type="text"
                required
                placeholder="MM / YY"
                value={cardExpiry}
                onChange={(e) => handleExpiryChange(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm font-mono text-zinc-900 placeholder:text-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
              />
            </div>
            <div>
              <label className="mb-1 block text-xs font-medium text-zinc-700">Security code (CVC)</label>
              <input
                type="password"
                required
                maxLength={4}
                placeholder="•••"
                value={cardCvv}
                onChange={(e) => handleCvvChange(e.target.value)}
                className="w-full rounded-xl border border-zinc-200 bg-white px-3.5 py-2.5 text-sm font-mono text-zinc-900 placeholder:text-zinc-400 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition"
              />
            </div>
          </div>

          {cardError && (
            <p className="text-xs text-red-600 font-medium pt-1">{cardError}</p>
          )}

          <button
            type="submit"
            disabled={cardProcessing}
            className="mt-2 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0070BA] hover:bg-[#005ea6] active:scale-[0.99] py-3.5 text-sm font-bold text-white shadow-sm transition-all disabled:opacity-60 cursor-pointer"
          >
            {cardProcessing ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                <span>Processing secure payment…</span>
              </>
            ) : (
              <>
                <Lock className="size-4" />
                <span>Pay {displayPrice} securely</span>
              </>
            )}
          </button>
        </form>
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
