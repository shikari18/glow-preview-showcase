/**
 * ExamGlow AI Router
 * ─────────────────────────────────────────────────────────────────────────────
 * Provider chain (tried in order, first success wins):
 *
 *  1. SHIKARI2/Malvos-32B  — your fine-tuned HF model (needs HUGGINGFACE_API_KEY)
 *  2. Groq llama-3.1-8b    — fast, free forever        (needs GROQ_API_KEY)
 *  3. Pollinations openai  — ZERO keys, no signup       (always available)
 *  4. Pollinations mistral — ZERO keys, no signup       (always available)
 *  5. Pollinations llama   — ZERO keys, no signup       (always available)
 *
 * Pollinations.ai (https://text.pollinations.ai) is a fully free,
 * open-access AI API with no authentication required.
 */

export type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

type Provider = {
  name: string;
  endpoint: string;
  model: string;
  /** Returns auth header value, or null if no key configured (keyless providers return empty string) */
  getAuth: () => string | null;
  extraHeaders?: Record<string, string>;
};

const PROVIDERS: Provider[] = [
  // ── 1. Your fine-tuned HF model ─────────────────────────────────────────────
  {
    name: "Malvos-32B (HF)",
    endpoint: "https://router.huggingface.co/hf-inference/models/SHIKARI2/Malvos-32B/v1/chat/completions",
    model: "SHIKARI2/Malvos-32B",
    getAuth: () => {
      const k = process.env["HUGGINGFACE_API_KEY"];
      return k ? `Bearer ${k}` : null; // skip if no key
    },
  },

  // ── 2. Groq (free forever, email signup only) ────────────────────────────────
  {
    name: "Groq llama-3.1-8b",
    endpoint: "https://api.groq.com/openai/v1/chat/completions",
    model: "llama-3.1-8b-instant",
    getAuth: () => {
      const k = process.env["GROQ_API_KEY"];
      return k ? `Bearer ${k}` : null; // skip if no key
    },
  },

  // ── 3. Pollinations — OpenAI-compatible, zero keys, no signup ────────────────
  {
    name: "Pollinations (openai)",
    endpoint: "https://text.pollinations.ai/openai",
    model: "openai",
    getAuth: () => "", // empty string = no auth header, but don't skip
  },

  // ── 4. Pollinations Mistral ──────────────────────────────────────────────────
  {
    name: "Pollinations (mistral)",
    endpoint: "https://text.pollinations.ai/openai",
    model: "mistral",
    getAuth: () => "",
  },

  // ── 5. Pollinations Llama ────────────────────────────────────────────────────
  {
    name: "Pollinations (llama)",
    endpoint: "https://text.pollinations.ai/openai",
    model: "llama",
    getAuth: () => "",
  },
];

export type RouterResult = {
  text: string;
  provider: string;
  model: string;
};

/**
 * Route a chat request through the provider pool.
 * Providers that return null from getAuth() are skipped (no key configured).
 * Falls through on errors / empty responses to the next provider.
 */
export async function routeChat(
  messages: ChatMessage[],
  opts: { maxTokens?: number; temperature?: number } = {},
): Promise<RouterResult> {
  const { maxTokens = 1024, temperature = 0.7 } = opts;
  const errors: string[] = [];

  for (const p of PROVIDERS) {
    const auth = p.getAuth();

    // null means "skip — key not configured"
    // "" means "keyless provider — proceed without auth header"
    if (auth === null) {
      errors.push(`${p.name}: skipped (no key)`);
      continue;
    }

    const headers: Record<string, string> = {
      "content-type": "application/json",
    };
    if (auth) headers["authorization"] = auth;
    if (p.extraHeaders) Object.assign(headers, p.extraHeaders);

    try {
      const res = await fetch(p.endpoint, {
        method: "POST",
        headers,
        body: JSON.stringify({
          model: p.model,
          messages,
          max_tokens: maxTokens,
          temperature,
          stream: false,
        }),
        signal: AbortSignal.timeout(25_000),
      });

      if (!res.ok) {
        const detail = await res.text().catch(() => "");
        errors.push(`${p.name}: HTTP ${res.status} — ${detail.slice(0, 80)}`);
        continue;
      }

      const data = (await res.json()) as {
        choices?: Array<{ message?: { content?: string } }>;
        error?: { message?: string };
      };

      if (data.error) {
        errors.push(`${p.name}: ${data.error.message ?? "api error"}`);
        continue;
      }

      const text = data.choices?.[0]?.message?.content?.trim() ?? "";
      if (!text) {
        errors.push(`${p.name}: empty response`);
        continue;
      }

      return { text, provider: p.name, model: p.model };
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      errors.push(`${p.name}: ${msg.slice(0, 80)}`);
      continue;
    }
  }

  console.error("[AI Router] All providers failed:", errors.join(" | "));
  throw new Error("AI temporarily unavailable. Please try again.");
}
