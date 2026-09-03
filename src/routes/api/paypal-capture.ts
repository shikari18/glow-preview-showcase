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
  if (!res.ok || !data.access_token) throw new Error(data.error_description ?? "PayPal auth failed");
  return data.access_token;
}

/**
 * POST /api/paypal-capture
 * Captures an approved PayPal order. Called after the user fills in
 * card details and PayPal Card Fields approves the transaction.
 */
export const Route = createFileRoute("/api/paypal-capture")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const headers = { "content-type": "application/json" };

        const clientId =
          (process.env["VITE_PAYPAL_CLIENT_ID"] as string | undefined) ??
          "BAAXrL_Pb2A66Zhr9asfXJBRIMuc7Ri5M9GzFDqDFBiwOcmMsNq4SOSAu1DLWkY1TwNPXs0G15bFKytpt4";
        const secret =
          (process.env["PAYPAL_CLIENT_SECRET"] as string | undefined) ?? "";

        if (!secret) {
          return new Response(
            JSON.stringify({ error: "PayPal secret not configured." }),
            { status: 500, headers },
          );
        }

        let body: { orderId?: string };
        try {
          body = (await request.json()) as { orderId?: string };
        } catch {
          return new Response(JSON.stringify({ error: "Invalid request body" }), {
            status: 400,
            headers,
          });
        }

        const { orderId } = body;
        if (!orderId) {
          return new Response(JSON.stringify({ error: "orderId is required" }), {
            status: 400,
            headers,
          });
        }

        try {
          const accessToken = await getAccessToken(clientId, secret);

          const captureRes = await fetch(
            `${PAYPAL_API}/v2/checkout/orders/${orderId}/capture`,
            {
              method: "POST",
              headers: {
                Authorization: `Bearer ${accessToken}`,
                "Content-Type": "application/json",
              },
            },
          );

          const captureData = (await captureRes.json()) as {
            status?: string;
            details?: { description?: string }[];
          };

          if (!captureRes.ok) {
            const msg =
              captureData.details?.[0]?.description ?? "Payment capture failed";
            return new Response(JSON.stringify({ error: msg }), {
              status: captureRes.status,
              headers,
            });
          }

          return new Response(
            JSON.stringify({ status: captureData.status ?? "COMPLETED" }),
            { headers },
          );
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : "PayPal capture failed";
          return new Response(JSON.stringify({ error: msg }), { status: 500, headers });
        }
      },
    },
  },
});
