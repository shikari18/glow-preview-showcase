/**
 * Paystack integration helpers.
 * - Dynamic loader for https://js.paystack.co/v1/inline.js
 * - Handles Paystack popup checkout for Cards, Apple Pay, Bank Transfer & Mobile Money
 */

import type { CurrencyCode } from "./paypal";

export const PAYSTACK_PUBLIC_KEY =
  (import.meta.env["VITE_PAYSTACK_PUBLIC_KEY"] as string) ||
  "pk_live_fca0c6e864c2472d8a562867efb5a83a2df339c1";

declare global {
  interface Window {
    PaystackPop?: {
      setup: (config: PaystackConfig) => { openIframe: () => void };
    };
  }
}

export type PaystackConfig = {
  key: string;
  email: string;
  amount: number; // in smallest currency unit (e.g. kobo/cents, amount * 100)
  currency?: string;
  ref?: string;
  metadata?: Record<string, unknown>;
  callback: (response: { reference: string; status: string; transaction: string; trxref: string }) => void;
  onClose?: () => void;
};

/** Load the Paystack Inline JS SDK once */
export function loadPaystackSDK(): Promise<void> {
  if (typeof window === "undefined") return Promise.resolve();

  if (window.PaystackPop) {
    return Promise.resolve();
  }

  return new Promise((resolve, reject) => {
    const existing = document.getElementById("paystack-sdk") as HTMLScriptElement | null;
    if (existing) {
      if (window.PaystackPop) {
        resolve();
      } else {
        existing.addEventListener("load", () => resolve());
        existing.addEventListener("error", () => reject(new Error("Failed to load Paystack SDK")));
      }
      return;
    }

    const script = document.createElement("script");
    script.id = "paystack-sdk";
    script.src = "https://js.paystack.co/v1/inline.js";
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Paystack SDK"));
    document.body.appendChild(script);
  });
}

/**
 * Paystack supported currencies.
 * Paystack natively accepts NGN, GHS, ZAR, USD, KES.
 */
const PAYSTACK_CURRENCIES: Set<CurrencyCode> = new Set(["NGN", "USD", "GHS", "ZAR", "KES"]);

export function getPaystackCurrencyAndAmount(
  amountStr: string,
  currencyCode: CurrencyCode
): { currency: string; amountInKobo: number } {
  const numeric = parseFloat(amountStr.replace(/[^0-9.]/g, "")) || 0;
  const currency = PAYSTACK_CURRENCIES.has(currencyCode) ? currencyCode : "USD";
  const amountInKobo = Math.round(numeric * 100);
  return { currency, amountInKobo };
}
