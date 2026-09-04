/**
 * PayPal integration — currency detection + JS SDK loader.
 * Client ID is read from VITE_PAYPAL_CLIENT_ID env var.
 */

export const PAYPAL_CLIENT_ID =
  (import.meta.env["VITE_PAYPAL_CLIENT_ID"] as string | undefined)?.trim() ||
  "BAAXrL_Pb2A66Zhr9asfXJBRIMuc7Ri5M9GzFDqDFBiwOcmMsNq4SOSAu1DLWkY1TwNPXs0G15bFKytpt4";

// ─── Currency ─────────────────────────────────────────────────────────────────

export type CurrencyCode =
  | "USD" | "GBP" | "EUR" | "AED" | "SAR" | "CAD" | "AUD"
  | "ZAR" | "INR" | "SGD" | "MYR" | "NZD" | "JPY" | "CHF"
  | "SEK" | "NOK" | "DKK" | "BRL" | "MXN" | "TRY";

export type CurrencyInfo = {
  code: CurrencyCode;
  symbol: string;
  rate: number;   // units per 1 USD
  decimals: number;
};

export const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  USD: { code: "USD", symbol: "$",   rate: 1,      decimals: 2 },
  GBP: { code: "GBP", symbol: "£",   rate: 0.79,   decimals: 2 },
  EUR: { code: "EUR", symbol: "€",   rate: 0.92,   decimals: 2 },
  AED: { code: "AED", symbol: "AED ", rate: 3.67,  decimals: 2 },
  SAR: { code: "SAR", symbol: "SAR ", rate: 3.75,  decimals: 2 },
  CAD: { code: "CAD", symbol: "CA$", rate: 1.36,   decimals: 2 },
  AUD: { code: "AUD", symbol: "A$",  rate: 1.53,   decimals: 2 },
  ZAR: { code: "ZAR", symbol: "R",   rate: 18.5,   decimals: 2 },
  INR: { code: "INR", symbol: "₹",   rate: 83.5,   decimals: 2 },
  SGD: { code: "SGD", symbol: "S$",  rate: 1.34,   decimals: 2 },
  MYR: { code: "MYR", symbol: "RM",  rate: 4.70,   decimals: 2 },
  NZD: { code: "NZD", symbol: "NZ$", rate: 1.63,   decimals: 2 },
  JPY: { code: "JPY", symbol: "¥",   rate: 149,    decimals: 0 },
  CHF: { code: "CHF", symbol: "Fr",  rate: 0.90,   decimals: 2 },
  SEK: { code: "SEK", symbol: "kr",  rate: 10.4,   decimals: 2 },
  NOK: { code: "NOK", symbol: "kr",  rate: 10.6,   decimals: 2 },
  DKK: { code: "DKK", symbol: "kr",  rate: 6.88,   decimals: 2 },
  BRL: { code: "BRL", symbol: "R$",  rate: 5.0,    decimals: 2 },
  MXN: { code: "MXN", symbol: "MX$", rate: 17.2,   decimals: 2 },
  TRY: { code: "TRY", symbol: "₺",   rate: 32.5,   decimals: 2 },
};

const COUNTRY_CURRENCY: Record<string, CurrencyCode> = {
  US: "USD", GB: "GBP", IE: "EUR", DE: "EUR", FR: "EUR", IT: "EUR",
  ES: "EUR", NL: "EUR", BE: "EUR", AT: "EUR", PT: "EUR", FI: "EUR",
  GR: "EUR", LU: "EUR", AE: "AED", SA: "SAR", CA: "CAD", AU: "AUD",
  ZA: "ZAR", IN: "INR", SG: "SGD", MY: "MYR", NZ: "NZD", JP: "JPY",
  CH: "CHF", SE: "SEK", NO: "NOK", DK: "DKK", BR: "BRL", MX: "MXN",
  TR: "TRY",
};

export async function detectCurrency(): Promise<CurrencyInfo> {
  try {
    const res = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(4000) });
    if (!res.ok) return CURRENCIES["USD"];
    const data = (await res.json()) as { country_code?: string };
    const code = COUNTRY_CURRENCY[data.country_code ?? "US"] ?? "USD";
    return CURRENCIES[code];
  } catch {
    return CURRENCIES["USD"];
  }
}

const USD_PRICES: Record<string, number> = {
  weekly: 2.00, monthly: 5.99, termly: 14.99, "exam-pass": 25.99,
};

export function convertPrice(planId: string, currency: CurrencyInfo): string {
  const converted = (USD_PRICES[planId] ?? 0) * currency.rate;
  return currency.decimals === 0
    ? Math.round(converted).toString()
    : converted.toFixed(currency.decimals);
}

export function formatPrice(planId: string, currency: CurrencyInfo): string {
  return `${currency.symbol}${convertPrice(planId, currency)}`;
}

// ─── PayPal SDK loader ────────────────────────────────────────────────────────

declare global {
  interface Window {
    paypal?: {
      Buttons: (cfg: PayPalButtonConfig) => {
        render: (el: HTMLElement) => Promise<void>;
        isEligible: () => boolean;
      };
      CardFields?: (cfg: {
        createOrder: () => Promise<string>;
        onApprove: (data: { orderID: string }) => Promise<void>;
        onError: (err: unknown) => void;
      }) => {
        isEligible: () => boolean;
        NumberField: (opts?: { placeholder?: string }) => { mount: (sel: string) => void };
        ExpiryField: (opts?: { placeholder?: string }) => { mount: (sel: string) => void };
        CVVField: (opts?: { placeholder?: string }) => { mount: (sel: string) => void };
        NameField: (opts?: { placeholder?: string }) => { mount: (sel: string) => void };
        submit: (data?: { cardholderName?: string }) => Promise<void>;
      };
    };
  }
}

export type PayPalButtonConfig = {
  style?: {
    layout?: "vertical" | "horizontal";
    color?: "gold" | "blue" | "silver" | "white" | "black";
    shape?: "rect" | "pill";
    label?: "paypal" | "checkout" | "buynow" | "pay";
    height?: number;
    tagline?: boolean;
  };
  createOrder: (
    data: unknown,
    actions: { order: { create: (o: unknown) => Promise<string> } }
  ) => Promise<string>;
  onApprove: (
    data: { orderID: string },
    actions: { order: { capture: () => Promise<unknown> } }
  ) => Promise<void>;
  onError?: (err: unknown) => void;
  onCancel?: () => void;
};

export const PAYPAL_SUPPORTED_CURRENCIES = new Set<string>([
  "AUD", "BRL", "CAD", "CNY", "CZK", "DKK", "EUR", "HKD", "HUF", "ILS",
  "JPY", "MYR", "MXN", "TWD", "NZD", "NOK", "PHP", "PLN", "GBP", "SGD",
  "SEK", "CHF", "THB", "USD",
]);

let _sdkPromise: Promise<void> | null = null;
let _sdkCurrency: string | null = null;

export function loadPayPalSDK(currency: string = "USD"): Promise<void> {
  // If window.paypal is already available on page, use it immediately
  if (typeof window !== "undefined" && window.paypal) {
    return Promise.resolve();
  }

  const safeCurrency = PAYPAL_SUPPORTED_CURRENCIES.has(currency) ? currency : "USD";

  // Reuse ongoing load promise if currency matches
  if (_sdkPromise && _sdkCurrency === safeCurrency) return _sdkPromise;

  // Remove old failed script tag if any
  if (typeof document !== "undefined") {
    document.getElementById("paypal-sdk")?.remove();
  }
  _sdkPromise = null;
  _sdkCurrency = safeCurrency;

  _sdkPromise = new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.id = "paypal-sdk";
    s.src = [
      `https://www.paypal.com/sdk/js`,
      `?client-id=${PAYPAL_CLIENT_ID}`,
      `&currency=${safeCurrency}`,
      `&intent=capture`,
      `&components=buttons`,
    ].join("");
    s.async = true;
    s.onload = () => resolve();
    s.onerror = (err) => {
      _sdkPromise = null;
      reject(err);
    };
    document.head.appendChild(s);
  });

  return _sdkPromise;
}

