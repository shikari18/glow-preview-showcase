/**
 * /api/v1/chat/completions
 * ─────────────────────────────────────────────────────────────────────────────
 * Standard OpenAI-compatible completions endpoint.
 * Supports both standard JSON responses and real-time streaming (stream: true).
 * Target Model: SHIKARI2/Malvos-32B-Merged with zero-downtime fallback pool.
 */
import { createFileRoute } from "@tanstack/react-router";
import { routeChat, routeChatStream, type ChatMessage } from "@/lib/ai-router";

type CompletionsRequest = {
  model?: string;
  messages?: ChatMessage[];
  max_tokens?: number;
  temperature?: number;
  stream?: boolean;
};

export const Route = createFileRoute("/api/v1/chat/completions")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const corsHeaders = {
          "access-control-allow-origin": "*",
          "access-control-allow-methods": "POST, OPTIONS",
          "access-control-allow-headers": "content-type, authorization",
        };

        if (request.method === "OPTIONS") {
          return new Response(null, { status: 204, headers: corsHeaders });
        }

        let body: CompletionsRequest;
        try {
          body = (await request.json()) as CompletionsRequest;
        } catch {
          return new Response(
            JSON.stringify({ error: { message: "Invalid JSON body", type: "invalid_request_error" } }),
            { status: 400, headers: { "content-type": "application/json", ...corsHeaders } },
          );
        }

        const messages = Array.isArray(body.messages) ? body.messages : [];
        if (messages.length === 0) {
          return new Response(
            JSON.stringify({ error: { message: "messages array is required", type: "invalid_request_error" } }),
            { status: 400, headers: { "content-type": "application/json", ...corsHeaders } },
          );
        }

        // ── Streaming response: stream: true ────────────────────────────────
        if (body.stream === true) {
          try {
            return await routeChatStream(messages, {
              maxTokens: body.max_tokens ?? 1024,
              temperature: body.temperature ?? 0.7,
            });
          } catch (err) {
            const msg = err instanceof Error ? err.message : "Streaming failed";
            console.error("v1/chat/completions stream error:", msg);
            return new Response(
              JSON.stringify({ error: { message: "AI stream temporarily unavailable", type: "server_error" } }),
              { status: 503, headers: { "content-type": "application/json", ...corsHeaders } },
            );
          }
        }

        // ── Standard non-streaming JSON response ───────────────────────────
        try {
          const result = await routeChat(messages, {
            maxTokens: body.max_tokens ?? 1024,
            temperature: body.temperature ?? 0.7,
          });

          const promptTokens = messages.reduce((n, m) => n + Math.ceil(m.content.length / 4), 0);
          const completionTokens = Math.ceil(result.text.length / 4);

          const response = {
            id: `chatcmpl-${Date.now()}`,
            object: "chat.completion",
            created: Math.floor(Date.now() / 1000),
            model: result.model || "SHIKARI2/Malvos-32B-Merged",
            choices: [
              {
                index: 0,
                message: { role: "assistant", content: result.text },
                finish_reason: "stop",
              },
            ],
            usage: {
              prompt_tokens: promptTokens,
              completion_tokens: completionTokens,
              total_tokens: promptTokens + completionTokens,
            },
            _examglow: { provider: result.provider },
          };

          return new Response(JSON.stringify(response), {
            headers: { "content-type": "application/json", ...corsHeaders },
          });
        } catch (err) {
          const msg = err instanceof Error ? err.message : "AI unavailable";
          console.error("v1/chat/completions error:", msg);
          return new Response(
            JSON.stringify({ error: { message: "AI service temporarily unavailable", type: "server_error" } }),
            { status: 503, headers: { "content-type": "application/json", ...corsHeaders } },
          );
        }
      },

      OPTIONS: async () =>
        new Response(null, {
          status: 204,
          headers: {
            "access-control-allow-origin": "*",
            "access-control-allow-methods": "POST, OPTIONS",
            "access-control-allow-headers": "content-type, authorization",
          },
        }),
    },
  },
});
