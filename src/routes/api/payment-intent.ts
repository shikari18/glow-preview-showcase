import { createFileRoute } from "@tanstack/react-router";

/**
 * POST /api/payment-intent
 * Creates a Stripe PaymentIntent and returns the client_secret.
 * Uses the raw Stripe REST API via fetch so it works on Cloudflare Workers.
 */
export const Route = createFileRoute("/api/payment-intent")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const headers = { "content-type": "application/json" };

        const stripeSecretKey =
          (process.env["STRIPE_SECRET_KEY"] as string | undefined) ?? "";

        if (!stripeSecretKey) {
          return new Response(
            JSON.stringify({
              error:
                "Stripe is not configured. Please add STRIPE_SECRET_KEY to your environment variables.",
            }),
            { status: 500, headers },
          );
        }

        let body: { amount?: number; currency?: string; planId?: string };
        try {
          body = (await request.json()) as {
            amount?: number;
            currency?: string;
            planId?: string;
          };
        } catch {
          return new Response(JSON.stringify({ error: "Invalid request body" }), {
            status: 400,
            headers,
          });
        }

        const { amount, currency, planId } = body;
        if (!amount || !currency || !planId) {
          return new Response(
            JSON.stringify({ error: "Missing required fields: amount, currency, planId" }),
            { status: 400, headers },
          );
        }

        // Call Stripe REST API directly — works in Cloudflare Workers
        const stripeRes = await fetch(
          "https://api.stripe.com/v1/payment_intents",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${stripeSecretKey}`,
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({
              amount: String(Math.round(amount * 100)), // Stripe needs integer cents
              currency: currency.toLowerCase(),
              "automatic_payment_methods[enabled]": "true",
              description: `ExamGlow ${planId} plan`,
            }).toString(),
          },
        );

        const stripeData = (await stripeRes.json()) as {
          client_secret?: string;
          error?: { message?: string };
        };

        if (!stripeRes.ok) {
          return new Response(
            JSON.stringify({
              error:
                stripeData.error?.message ??
                "Failed to initialize payment. Please try again.",
            }),
            { status: stripeRes.status, headers },
          );
        }

        return new Response(
          JSON.stringify({ clientSecret: stripeData.client_secret }),
          { headers },
        );
      },
    },
  },
});
