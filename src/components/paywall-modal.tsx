import { useState, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Check, Lock, X, ShieldCheck, ArrowRight } from "lucide-react";
import { detectCurrency, formatPrice, type CurrencyInfo } from "@/lib/paypal";

export function PaywallModal({
  open,
  onClose,
  title = "Unlock Full Access",
  subtitle = "You have reached the free preview limit. Upgrade to ExamGlow Premium to unlock all notes, diagrams, and full syllabus content.",
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
    { id: "weekly" as const, name: "Weekly Plan", desc: "Billed weekly, cancel anytime", badge: "Flexible" },
    { id: "monthly" as const, name: "Monthly Plan", desc: "Most popular for students", badge: "Popular" },
    { id: "termly" as const, name: "Termly Plan", desc: "Every 3 months · best value", badge: "Best Value" },
  ];

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md transition-opacity" onClick={onClose} />

      {/* Modal Container */}
      <div className="relative w-full max-w-md overflow-hidden rounded-[28px] border border-border bg-card p-6 shadow-2xl sm:p-7">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex size-8 items-center justify-center rounded-full text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
        >
          <X className="size-4" />
        </button>

        {/* Header */}
        <div className="text-center pt-2">
          <div className="mx-auto flex size-12 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400 mb-3">
            <Lock className="size-6" />
          </div>
          <h2 className="font-serif text-2xl font-bold tracking-tight text-foreground">{title}</h2>
          <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed px-2">{subtitle}</p>
        </div>

        {/* Benefits */}
        <div className="mt-5 space-y-2 rounded-2xl border border-border/80 bg-secondary/40 p-3.5 text-xs">
          {[
            "Unrestricted access to all chapters and subjects",
            "High-resolution scientific diagrams and formulas",
            "Full Cambridge IGCSE past papers & mark schemes",
            "Cancel subscription anytime in account settings",
          ].map((item) => (
            <div key={item} className="flex items-center gap-2 text-foreground/90 font-medium">
              <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">
                <Check className="size-2.5 stroke-[3]" />
              </span>
              <span>{item}</span>
            </div>
          ))}
        </div>

        {/* Plan Selectors */}
        <div className="mt-4 space-y-2">
          {plans.map((p) => {
            const active = selectedPlan === p.id;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setSelectedPlan(p.id)}
                className={`flex w-full items-center justify-between rounded-2xl border p-3.5 text-left transition-all ${
                  active
                    ? "border-foreground bg-secondary/80 ring-1 ring-foreground"
                    : "border-border bg-card hover:bg-secondary/40"
                }`}
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-foreground text-sm">{p.name}</span>
                    {p.badge && (
                      <span className="rounded-full bg-foreground px-2 py-0.5 text-[10px] font-bold text-background uppercase tracking-wider">
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-muted-foreground">{p.desc}</span>
                </div>
                <div className="text-right">
                  <span className="text-base font-bold text-foreground">
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
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-foreground py-3.5 text-sm font-semibold text-background shadow-lg transition-transform hover:-translate-y-0.5 active:scale-[0.99]"
        >
          <span>Continue to Payment</span>
          <ArrowRight className="size-4" />
        </button>

        <p className="mt-3 flex items-center justify-center gap-1.5 text-[11px] text-muted-foreground">
          <ShieldCheck className="size-3.5 text-emerald-500" />
          <span>Encrypted PayPal & Card Checkout · Instant Access</span>
        </p>
      </div>
    </div>
  );
}
