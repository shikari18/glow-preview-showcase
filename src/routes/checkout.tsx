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
  type CurrencyInfo,
  PAYPAL_CLIENT_ID,
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
    features: [
      "Full notes access", "Past papers", "AI chat",
      "Priority support", "Cancel anytime",
    ],
  },
  termly: {
    name: "Termly Plan",
    period: "billed every 3 months",
    features: [
      "Full notes access", "Past papers", "AI chat",
      "Priority support", "Study plan", "Cancel anytime",
    ],
  },
  "exam-pass": {
    name: "Exam Pass",
    period: "valid until end of exam season",
    features: [
      "Full notes access", "Past papers", "AI chat",
      "Priority support", "Study plan", "Exam prep toolkit",
    ],
  },
};

// ─── SDK loader ───────────────────────────────────────────────────────────────

let _sdkPromise: Promise<void> | null = null;

function loadPayPalSDK(currency: string): Promise<void> {
  if (_sdkPromise) return _sdkPromise;
  _sdkPromise = new Promise((resolve, reject) => {
    // Remove stale script if any
    document.getElementById("paypal-sdk")?.remove();

    const s = document.createElement("script");
    s.id = "paypal-sdk";
    s.src = [
      "https://www.paypal.com/sdk/js",
      `?client-id=${PAYPAL_CLIENT_ID}`,
      `&currency=${currency}`,
      "&intent=capture",
      "&components=card-fields,buttons",
    ].join("");
    s.async = true;
    s.onload = () => resolve();
    s.onerror = () => reject(new Error("PayPal SDK failed to load"));
    document.head.appendChild(s);
  });
  return _sdkPromise;
}

// ─── PayPal card form component ───────────────────────────────────────────────

function PayPalCardForm({
  planId,
  currency,
  onSuccess,
}: {
  planId: string;
  currency: CurrencyInfo;
  onSuccess: () => void;
}) {
  const [state, setState] = useState<"loading" | "ready" | "buttons" | "error">("loading");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [retryKey, setRetryKey] = useState(0);
  const cardFieldsRef = useRef<{
    isEligible: () => boolean;
    NumberField: (opts?: { placeholder?: string }) => { mount: (sel: string) => void };
    ExpiryField: (opts?: { placeholder?: string }) => { mount: (sel: string) => void };
    CVVField: (opts?: { placeholder?: string }) => { mount: (sel: string) => void };
    NameField: (opts?: { placeholder?: string }) => { mount: (sel: string) => void };
    submit: (data?: { cardholderName?: string }) => Promise<void>;
  } | null>(null);
  const mountedRef = useRef(false);

  const amount = convertPrice(planId, currency);

  const createOrder = useCallback(async (): Promise<string> => {
    const res = await fetch("/api/paypal-order", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ amount, currency: currency.code, planId }),
    });
    const data = (await res.json()) as { orderId?: string; error?: string };
    if (!res.ok || !data.orderId) throw new Error(data.error ?? "Could not create order");
    return data.orderId;
  }, [amount, currency.code, planId]);

  const handleApprove = useCallback(async ({ orderID }: { orderID: string }) => {
    const res = await fetch("/api/paypal-capture", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ orderId: orderID }),
    });
    const data = (await res.json()) as { status?: string; error?: string };
    if (!res.ok || data.error) throw new Error(data.error ?? "Payment capture failed");

    saveProfile({ plan: planId as PlanLabel });
    const uid = window.localStorage.getItem("examglow.google_sub");
    if (uid) await updateAccountPlan(uid, planId as PlanLabel);
    onSuccess();
  }, [planId, onSuccess]);

  useEffect(() => {
    if (mountedRef.current) return;
    mountedRef.current = true;

    loadPayPalSDK(currency.code)
      .then(() => {
        if (!window.paypal) { setState("error"); return; }

        const ppCardFields = window.paypal.CardFields;
        if (!ppCardFields) {
          // CardFields API not available on this PayPal SDK version — fall back
          setState("buttons");
          return;
        }

        const cardFields = ppCardFields({
          createOrder,
          onApprove: handleApprove,
          onError: (err: unknown) => {
            console.error("PayPal card error:", err);
            setErrorMsg("Payment failed. Please check your card details and try again.");
            setSubmitting(false);
          },
        });

        if (cardFields.isEligible()) {
          cardFieldsRef.current = cardFields;

          // Mount fields into placeholder divs
          cardFields.NumberField({ placeholder: "Card number" }).mount("#pp-card-number");
          cardFields.ExpiryField({ placeholder: "MM / YY" }).mount("#pp-card-expiry");
          cardFields.CVVField({ placeholder: "CVC" }).mount("#pp-card-cvv");
          cardFields.NameField({ placeholder: "Name on card" }).mount("#pp-card-name");

          setState("ready");
        } else {
          // CardFields not eligible on this merchant account — fall back to PayPal buttons
          setState("buttons");
        }
      })
      .catch((err) => {
        console.error("PayPal SDK load error:", err);
        setState("error");
      });
  }, [currency.code, createOrder, handleApprove, retryKey]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardFieldsRef.current || submitting) return;
    setSubmitting(true);
    setErrorMsg(null);
    try {
      await cardFieldsRef.current.submit({ cardholderName: name });
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Payment failed. Please try again.";
      setErrorMsg(msg);
      setSubmitting(false);
    }
  };

  // ── Loading ────────────────────────────────────────────────────────────────
  if (state === "loading") {
    return (
      <div className="flex h-24 items-center justify-center gap-2 rounded-2xl bg-zinc-100 text-sm text-zinc-500">
        <Loader2 className="size-4 animate-spin" />
        Loading payment form…
      </div>
    );
  }

  // ── SDK failed to load ─────────────────────────────────────────────────────
  if (state === "error") {
    return (
      <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-700">
        <p className="font-semibold">Could not load PayPal</p>
        <p className="mt-1 text-red-500">
          Please check your internet connection, then refresh the page.
          Make sure pop-ups are not blocked.
        </p>
        <button
          onClick={() => {
            _sdkPromise = null;
            mountedRef.current = false;
            setErrorMsg(null);
            setState("loading");
            setRetryKey(k => k + 1);
          }}
          className="mt-3 rounded-full bg-red-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-red-700"
        >
          Try again
        </button>
      </div>
    );
  }

  // ── Fallback: PayPal standard buttons (when CardFields not available) ───────
  if (state === "buttons") {
    return (
      <div className="space-y-3">
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-xs text-amber-800">
          <strong>Card form</strong> is not enabled on this PayPal account.
          Use the PayPal buttons below to pay by card (click PayPal →
          "Pay with Debit or Credit Card").
        </div>
        <PayPalButtonsFallback planId={planId} currency={currency} onSuccess={onSuccess} />
      </div>
    );
  }

  // ── PayPal Card Fields form ────────────────────────────────────────────────
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Name on card */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">
          Name on card
        </label>
        <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-shadow">
          <div id="pp-card-name" className="w-full" />
        </div>
      </div>

      {/* Card number */}
      <div>
        <label className="mb-1.5 block text-sm font-medium text-zinc-700">
          Card number
        </label>
        <div className="flex items-center gap-3 rounded-2xl border border-zinc-200 bg-white px-4 py-3 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-shadow">
          <CreditCard className="size-4 shrink-0 text-zinc-400" />
          <div id="pp-card-number" className="w-full" />
        </div>
      </div>

      {/* Expiry + CVV */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">Expiry</label>
          <div className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-shadow">
            <div id="pp-card-expiry" />
          </div>
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-medium text-zinc-700">CVC</label>
          <div className="rounded-2xl border border-zinc-200 bg-white px-4 py-3 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition-shadow">
            <div id="pp-card-cvv" />
          </div>
        </div>
      </div>

      {/* Name state — hidden since PayPal NameField handles it, but keep for accessibility */}
      <input type="hidden" value={name} onChange={(e) => setName(e.target.value)} />

      {/* Error */}
      {errorMsg && (
        <div className="flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Submit */}
      <button
        type="submit"
        disabled={submitting}
        className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#0070BA] py-3.5 text-[15px] font-semibold text-white transition-all hover:bg-[#005ea6] active:scale-[0.99] disabled:opacity-60"
      >
        {submitting ? (
          <>
            <Loader2 className="size-4 animate-spin" />
            Processing…
          </>
        ) : (
          <>
            <Lock className="size-4" />
            Pay {formatPrice(planId, currency)} securely
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

      <p className="text-center text-xs text-zinc-400">
        Processed securely by PayPal · No PayPal account needed
      </p>
    </form>
  );
}

// ─── Fallback PayPal buttons (if CardFields not eligible) ─────────────────────

function PayPalButtonsFallback({
  planId,
  currency,
  onSuccess,
}: {
  planId: string;
  currency: CurrencyInfo;
  onSuccess: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const rendered = useRef(false);
  const amount = convertPrice(planId, currency);
  const plan = PLANS[planId];

  useEffect(() => {
    if (rendered.current || !window.paypal || !ref.current) return;
    rendered.current = true;

    window.paypal.Buttons({
      style: { layout: "vertical", color: "blue", shape: "rect", label: "pay", height: 50, tagline: false },
      createOrder: async (_d: unknown, actions: { order: { create: (o: unknown) => Promise<string> } }) =>
        actions.order.create({
          intent: "CAPTURE",
          purchase_units: [{ description: `ExamGlow ${plan?.name ?? planId}`, amount: { currency_code: currency.code, value: amount } }],
        }),
      onApprove: async (data: { orderID: string }, actions: { order: { capture: () => Promise<unknown> } }) => {
        await actions.order.capture();
        saveProfile({ plan: planId as PlanLabel });
        const uid = window.localStorage.getItem("examglow.google_sub");
        if (uid) await updateAccountPlan(uid, planId as PlanLabel);
        onSuccess();
      },
    }).render(ref.current!);
  }, [amount, currency, plan, planId, onSuccess]);

  return <div ref={ref} />;
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
                <PayPalCardForm
                  key={`${planId}-${currency.code}`}
                  planId={planId}
                  currency={currency}
                  onSuccess={handleSuccess}
                />
              ) : (
                <div className="flex h-14 items-center justify-center gap-2 rounded-2xl bg-zinc-100 text-sm text-zinc-500">
                  <Loader2 className="size-4 animate-spin" /> Detecting your location…
                </div>
              )}
            </div>

            {/* Trust row */}
            <div className="mt-6 flex items-center justify-center gap-5 text-xs text-zinc-400">
              <span className="flex items-center gap-1"><Lock className="size-3" /> 256-bit SSL</span>
              <span className="flex items-center gap-1"><ShieldCheck className="size-3" /> Secure</span>
              <span className="flex items-center gap-1"><Check className="size-3" /> Cancel anytime</span>
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

            {/* Security note */}
            <div className="rounded-2xl border border-zinc-200 bg-white p-5 text-sm text-zinc-500">
              <p className="font-semibold text-zinc-700 flex items-center gap-2">
                <ShieldCheck className="size-4 text-emerald-500" />
                100% secure payment
              </p>
              <p className="mt-2">
                Your card details are encrypted and processed by{" "}
                <strong className="text-zinc-700">PayPal</strong> — one of the world's most
                trusted payment platforms. We never store your card information.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
