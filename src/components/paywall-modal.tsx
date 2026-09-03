import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Check, Lock, Sparkles, X } from "lucide-react";
import logoMark from "@/assets/logo-mark.png";
import { detectCurrency, formatPrice, type CurrencyInfo } from "@/lib/paypal";

export function PaywallModal({
  open,
  onClose,
  title = "Unlock ExamGlow Premium",
  subtitle = "You've reached the free tier limit. Upgrade for unlimited access to all notes, syllabuses, and AI tutoring.",
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
}) {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<"weekly" | "monthly" | "termly">("monthly");
  const [currency, setCurrency] = useState<CurrencyInfo | null>(null);

  useEffect(() => {
    if (!open) return;
    detectCurrency().then(setCurrency);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  const plans = [
    { id: "weekly" as const, name: "Weekly Plan", desc: "Billed weekly", badge: "Flexible" },
    { id: "monthly" as const, name: "Monthly Plan", desc: "Billed monthly", badge: "Most Popular" },
    { id: "termly" as const, name: "Termly Plan", desc: "Every 3 months", badge: "Best Value" },
  ];

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-border bg-card p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground"
        >
          <X className="size-4" />
        </button>

        <div className="flex items-center gap-3">
          <div className="flex size-11 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-500">
            <Lock className="size-5" />
          </div>
          <div>
            <span className="inline-flex items-center gap-1 rounded-full bg-lavender/20 px-2.5 py-0.5 text-xs font-semibold text-lavender">
              <Sparkles className="size-3" /> Premium Feature
            </span>
            <h2 className="mt-0.5 text-xl font-bold tracking-tight text-foreground sm:text-2xl">{title}</h2>
          </div>
        </div>

        <p className="mt-3 text-sm text-muted-foreground">{subtitle}</p>

        {/* Feature List */}
        <div className="mt-5 space-y-2 rounded-2xl bg-secondary/50 p-4">
          {[
            "Full access to all 21+ chapters in every subject",
            "Unlimited 24/7 AI tutor chat & explanations",
            "Complete Cambridge IGCSE syllabuses & past papers",
            "Personal rich notes workspace & study tools",
            "Cancel anytime with one click in settings",
          ].map((f) => (
            <div key={f} className="flex items-center gap-2.5 text-xs font-medium text-foreground sm:text-sm">
              <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-500">
                <Check className="size-2.5 stroke-[3]" />
              </span>
              <span>{f}</span>
            </div>
          ))}
        </div>

        {/* Plan Selectors */}
        <div className="mt-5 space-y-2">
          {plans.map((p) => {
            const active = selectedPlan === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedPlan(p.id)}
                className={`flex w-full items-center justify-between rounded-2xl border p-3.5 text-left transition-all ${
                  active
                    ? "border-lavender bg-lavender/10 ring-1 ring-lavender"
                    : "border-border bg-background hover:bg-secondary/70"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-foreground text-sm">{p.name}</span>
                    {p.badge && (
                      <span className="rounded-full bg-surface px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-muted-foreground">{p.desc}</span>
                </div>
                <div className="text-right">
                  <span className="text-base font-bold text-foreground sm:text-lg">
                    {currency ? formatPrice(p.id, currency) : "…"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* CTA */}
        <button
          type="button"
          onClick={() => {
            onClose();
            navigate({ to: "/checkout", search: { plan: selectedPlan } });
          }}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-foreground py-3.5 text-sm font-semibold text-background shadow-lg transition-transform hover:-translate-y-0.5 active:scale-[0.99]"
        >
          <Lock className="size-4" />
          Continue to Secure Checkout · {currency ? formatPrice(selectedPlan, currency) : "…"}
        </button>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          Debit, Credit Card & PayPal accepted · Instant access
        </p>
      </div>
    </div>
  );
}
