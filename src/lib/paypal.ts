/**
 * PayPal integration helpers.
 * - Currency detection via ipapi.co (free, no key needed, 1,000 req/day)
 * - Approximate USD→local conversion rates (major currencies)
 * - PayPal JS SDK loader
 */

const envPaypalId = import.meta.env["VITE_PAYPAL_CLIENT_ID"] as string | undefined;
export const PAYPAL_CLIENT_ID =
  (envPaypalId && envPaypalId.trim().length > 60 ? envPaypalId.trim() : "") ||
  "BAXrL_Pb2A66Zhr9asfXJBRIMuc7Ri5M9GzFDqDFBiwOcmMsNq4SOSAu1DLWkY1TWNPXs0G15bFKytpt4";

// ─── Currency data ────────────────────────────────────────────────────────────

export type CurrencyCode =
  | "USD" | "GBP" | "EUR" | "AED" | "SAR" | "CAD" | "AUD" | "NGN"
  | "KES" | "GHS" | "ZAR" | "EGP" | "PKR" | "INR" | "BDT" | "SGD"
  | "MYR" | "NZD" | "JPY" | "CHF" | "SEK" | "NOK" | "DKK" | "BRL"
  | "MXN" | "TRY";

export type CurrencyInfo = {
  code: CurrencyCode;
  symbol: string;
  /** USD multiplier — how many units of this currency = 1 USD */
  rate: number;
  /** decimal places to display */
  decimals: number;
};

export const CURRENCIES: Record<CurrencyCode, CurrencyInfo> = {
  USD: { code: "USD", symbol: "$",   rate: 1,       decimals: 2 },
  GBP: { code: "GBP", symbol: "£",   rate: 0.79,    decimals: 2 },
  EUR: { code: "EUR", symbol: "€",   rate: 0.92,    decimals: 2 },
  AED: { code: "AED", symbol: "AED", rate: 3.67,    decimals: 2 },
  SAR: { code: "SAR", symbol: "SAR", rate: 3.75,    decimals: 2 },
  CAD: { code: "CAD", symbol: "CA$", rate: 1.36,    decimals: 2 },
  AUD: { code: "AUD", symbol: "A$",  rate: 1.53,    decimals: 2 },
  NGN: { code: "NGN", symbol: "₦",   rate: 1600,    decimals: 0 },
  KES: { code: "KES", symbol: "KSh", rate: 129,     decimals: 0 },
  GHS: { code: "GHS", symbol: "GH₵", rate: 15.5,    decimals: 2 },
  ZAR: { code: "ZAR", symbol: "R",   rate: 18.5,    decimals: 2 },
  EGP: { code: "EGP", symbol: "E£",  rate: 48.5,    decimals: 2 },
  PKR: { code: "PKR", symbol: "₨",   rate: 278,     decimals: 0 },
  INR: { code: "INR", symbol: "₹",   rate: 83.5,    decimals: 2 },
  BDT: { code: "BDT", symbol: "৳",   rate: 110,     decimals: 0 },
  SGD: { code: "SGD", symbol: "S$",  rate: 1.34,    decimals: 2 },
  MYR: { code: "MYR", symbol: "RM",  rate: 4.70,    decimals: 2 },
  NZD: { code: "NZD", symbol: "NZ$", rate: 1.63,    decimals: 2 },
  JPY: { code: "JPY", symbol: "¥",   rate: 149,     decimals: 0 },
  CHF: { code: "CHF", symbol: "Fr",  rate: 0.90,    decimals: 2 },
  SEK: { code: "SEK", symbol: "kr",  rate: 10.4,    decimals: 2 },
  NOK: { code: "NOK", symbol: "kr",  rate: 10.6,    decimals: 2 },
  DKK: { code: "DKK", symbol: "kr",  rate: 6.88,    decimals: 2 },
  BRL: { code: "BRL", symbol: "R$",  rate: 5.0,     decimals: 2 },
  MXN: { code: "MXN", symbol: "MX$", rate: 17.2,    decimals: 2 },
  TRY: { code: "TRY", symbol: "₺",   rate: 32.5,    decimals: 2 },
};

/** Countries → PayPal-supported currency code */
const COUNTRY_CURRENCY: Record<string, CurrencyCode> = {
  US: "USD", GB: "GBP", IE: "EUR", DE: "EUR", FR: "EUR", IT: "EUR",
  ES: "EUR", NL: "EUR", BE: "EUR", AT: "EUR", PT: "EUR", FI: "EUR",
  GR: "EUR", LU: "EUR", AE: "AED", SA: "SAR", CA: "CAD", AU: "AUD",
  NG: "NGN", KE: "KES", GH: "GHS", ZA: "ZAR", EG: "EGP", PK: "PKR",
  IN: "INR", BD: "BDT", SG: "SGD", MY: "MYR", NZ: "NZD", JP: "JPY",
  CH: "CHF", SE: "SEK", NO: "NOK", DK: "DKK", BR: "BRL", MX: "MXN",
  TR: "TRY",
};

/**
 * PayPal only supports a subset of currencies for direct payments.
 * NGN, KES, GHS, EGP, PKR, BDT are NOT supported by PayPal.
 * Fall back to USD for unsupported currencies.
 */
const PAYPAL_SUPPORTED: Set<CurrencyCode> = new Set([
  "USD","GBP","EUR","AED","SAR","CAD","AUD","ZAR","INR","SGD",
  "MYR","NZD","JPY","CHF","SEK","NOK","DKK","BRL","MXN","TRY",
]);

export function getCurrencyForCode(code: CurrencyCode): CurrencyInfo {
  return CURRENCIES[code] ?? CURRENCIES["USD"];
}

/** Detect the user's currency from their IP country via ipapi.co */
export async function detectCurrency(): Promise<CurrencyInfo> {
  try {
    const res = await fetch("https://ipapi.co/json/", { signal: AbortSignal.timeout(4000) });
    if (!res.ok) return CURRENCIES["USD"];
    const data = (await res.json()) as { country_code?: string };
    const countryCode = data.country_code ?? "US";
    const currencyCode = COUNTRY_CURRENCY[countryCode] ?? "USD";
    // Fall back to USD if PayPal doesn't support this currency
    const finalCode = PAYPAL_SUPPORTED.has(currencyCode) ? currencyCode : "USD";
    return CURRENCIES[finalCode];
  } catch {
    return CURRENCIES["USD"];
  }
}

/** USD plan prices */
const USD_PRICES: Record<string, number> = {
  weekly:     2.00,
  monthly:    5.99,
  termly:     14.99,
  "exam-pass": 25.99,
};

/** Convert a USD plan price to the given currency and format it */
export function convertPrice(planId: string, currency: CurrencyInfo): string {
  const usd = USD_PRICES[planId] ?? 0;
  const converted = usd * currency.rate;
  if (currency.decimals === 0) {
    return Math.round(converted).toString();
  }
  return converted.toFixed(currency.decimals);
}

/** Format a price for display: symbol + amount */
export function formatPrice(planId: string, currency: CurrencyInfo): string {
  return `${currency.symbol}${convertPrice(planId, currency)}`;
}

// ─── PayPal SDK loader ────────────────────────────────────────────────────────

declare global {
  interface Window {
    paypal?: {
      Buttons: (config: PayPalButtonConfig) => { render: (selector: string | HTMLElement) => Promise<void> };
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

let sdkLoaded: Promise<void> | null = null;

/** Load the PayPal JS SDK once for a given currency */
export function loadPayPalSDK(currency: CurrencyCode): Promise<void> {
  // If the SDK is already loaded for this currency, reuse it
  const existing = document.getElementById("paypal-sdk") as HTMLScriptElement | null;
  if (existing && existing.dataset["currency"] === currency) {
    return sdkLoaded ?? Promise.resolve();
  }

  // Remove old script if currency changed
  if (existing) {
    existing.remove();
    delete window.paypal;
    sdkLoaded = null;
  }

  sdkLoaded = new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.id = "paypal-sdk";
    script.dataset["currency"] = currency;
    script.src = `https://www.paypal.com/sdk/js?client-id=${PAYPAL_CLIENT_ID}&currency=${currency}&intent=capture&components=buttons`;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load PayPal SDK"));
    document.head.appendChild(script);
  });

  return sdkLoaded;
}
