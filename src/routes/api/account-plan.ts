import { createFileRoute } from "@tanstack/react-router";

// In-memory fallback for environments without Cloudflare KV
const memoryStore = new Map<string, string>();

interface AccountRecord {
  email?: string | undefined;
  sub?: string | undefined;
  plan: "weekly" | "termly" | "yearly" | "free";
  renewalDue?: number | undefined;
  autoRenew?: boolean | undefined;
  updatedAt: number;
}

export const Route = createFileRoute("/api/account-plan")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url);
        const email = url.searchParams.get("email")?.trim().toLowerCase();
        const sub = url.searchParams.get("sub")?.trim();

        if (!email && !sub) {
          return new Response(JSON.stringify({ error: "email or sub required" }), {
            status: 400,
            headers: { "content-type": "application/json" },
          });
        }

        // Try to access Cloudflare KV binding
        const globalKv = (globalThis as unknown as { EXAMGLOW_ACCOUNTS?: { get: (k: string) => Promise<string | null> } }).EXAMGLOW_ACCOUNTS;

        let recordRaw: string | null = null;

        if (globalKv) {
          if (email) recordRaw = await globalKv.get(`account:${email}`);
          if (!recordRaw && sub) recordRaw = await globalKv.get(`account:${sub}`);
        }

        // Fallback to memoryStore
        if (!recordRaw) {
          if (email) recordRaw = memoryStore.get(`account:${email}`) ?? null;
          if (!recordRaw && sub) recordRaw = memoryStore.get(`account:${sub}`) ?? null;
        }

        if (!recordRaw) {
          return new Response(JSON.stringify({ found: false, plan: "free" }), {
            headers: { "content-type": "application/json" },
          });
        }

        try {
          const record = JSON.parse(recordRaw) as AccountRecord;
          const isExpired = record.renewalDue && Date.now() > record.renewalDue && record.autoRenew === false;

          return new Response(
            JSON.stringify({
              found: true,
              plan: isExpired ? "free" : record.plan,
              renewalDue: record.renewalDue,
              autoRenew: record.autoRenew,
              isExpired,
            }),
            { headers: { "content-type": "application/json" } },
          );
        } catch {
          return new Response(JSON.stringify({ found: false, plan: "free" }), {
            headers: { "content-type": "application/json" },
          });
        }
      },

      POST: async ({ request }) => {
        let body: {
          email?: string;
          sub?: string;
          plan?: "weekly" | "termly" | "yearly" | "free";
          renewalDue?: number;
          autoRenew?: boolean;
        };

        try {
          body = (await request.json()) as typeof body;
        } catch {
          return new Response(JSON.stringify({ error: "Invalid JSON" }), {
            status: 400,
            headers: { "content-type": "application/json" },
          });
        }

        const email = body.email?.trim().toLowerCase();
        const sub = body.sub?.trim();
        const plan = body.plan ?? "free";
        const renewalDue = body.renewalDue;
        const autoRenew = body.autoRenew ?? true;

        if (!email && !sub) {
          return new Response(JSON.stringify({ error: "email or sub required" }), {
            status: 400,
            headers: { "content-type": "application/json" },
          });
        }

        const record: AccountRecord = {
          email,
          sub,
          plan,
          renewalDue,
          autoRenew,
          updatedAt: Date.now(),
        };

        const jsonStr = JSON.stringify(record);

        // Store in memory
        if (email) memoryStore.set(`account:${email}`, jsonStr);
        if (sub) memoryStore.set(`account:${sub}`, jsonStr);

        // Store in Cloudflare KV if available
        const globalKv = (globalThis as unknown as { EXAMGLOW_ACCOUNTS?: { put: (k: string, v: string) => Promise<void> } }).EXAMGLOW_ACCOUNTS;
        if (globalKv) {
          try {
            if (email) await globalKv.put(`account:${email}`, jsonStr);
            if (sub) await globalKv.put(`account:${sub}`, jsonStr);
          } catch (e) {
            console.error("KV put failed:", e);
          }
        }

        return new Response(
          JSON.stringify({ success: true, plan, renewalDue, autoRenew }),
          { headers: { "content-type": "application/json" } },
        );
      },
    },
  },
});
