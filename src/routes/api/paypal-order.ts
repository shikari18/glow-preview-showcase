import { createFileRoute } from "@tanstack/react-router";

const PAYPAL_API = "https://api-m.paypal.com";

async function getAccessToken(clientId: string, secret: string): Promise<string> {
  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: "POST",
    headers: {
      Authorization: `Basic ${btoa(`${clientId}:${secret}`)}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });
  const data = (await res.json()) as { access_token?: string; error_description?: string };
  if (!res.ok || !data.access_token) {
    throw new Error(data.error_description ?? "PayPal auth failed");
  }
  return data.access_token;
}

/**
 * POST /api/paypal-order
 * Creates a PayPal order server-side and returns the order ID to the frontend.
 * The frontend uses this ID to initialise PayPal Card Fields.
 */
export const Route = createFileRoute("/api/paypal-order")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const headers = { "content-type": "application/json" };

        const clientId =
          (process.env["VITE_PAYPAL_CLIENT_ID"] as string | undefined) ??
          "BAXrL_Pb2A66Zhr9asfXJBRIMuc7Ri5M9GzFDqDFBiwOcmMsNq4SOSAu1DLWkY1TWNPXs0G15bFKytpt4";
        const secret =
          (process.env["PAYPAL_CLIENT_SECRET"] as string | undefined) ?? "";

        if (!secret) {
          return new Response(
            JSON.stringify({
              error: "PayPal secret not configured. Add PAYPAL_CLIENT_SECRET to Cloudflare environment variables.",
            }),
            { status: 500, headers },
          );
        }

        let body: { amount?: string; currency?: string; planId?: string };
        try {
          body = (await request.json()) as {
            amount?: string;
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

        try {
          const accessToken = await getAccessToken(clientId, secret);

          const orderRes = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
              "PayPal-Request-Id": `EG-${planId}-${Date.now()}`,
            },
            body: JSON.stringify({
              intent: "CAPTURE",
              purchase_units: [
                {
                  description: `ExamGlow ${planId} plan`,
                  amount: {
                    currency_code: currency.toUpperCase(),
                    value: amount,
                  },
                },
              ],
            }),
          });

          const orderData = (await orderRes.json()) as {
            id?: string;
            details?: { description?: string }[];
          };

          if (!orderRes.ok || !orderData.id) {
            const msg =
              orderData.details?.[0]?.description ?? "Failed to create PayPal order";
            return new Response(JSON.stringify({ error: msg }), {
              status: orderRes.status,
              headers,
            });
          }

          return new Response(JSON.stringify({ orderId: orderData.id }), { headers });
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : "PayPal order creation failed";
          return new Response(JSON.stringify({ error: msg }), { status: 500, headers });
        }
      },
    },
  },
});
