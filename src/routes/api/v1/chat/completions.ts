/**
 * /api/v1/chat/completions
 * ─────────────────────────────────────────────────────────────────────────────
 * OpenAI-compatible completions endpoint.
 * Accepts the standard ChatML request body and returns an OpenAI-style response.
 * Powers both the ExamGlow web app and any external developer API access.
 */
import { createFileRoute } from "@tanstack/react-router";
import { routeChat, type ChatMessage } from "@/lib/ai-router";

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
        // ── CORS preflight ──────────────────────────────────────────────────
        const corsHeaders = {
          "access-control-allow-origin": "*",
          "access-control-allow-methods": "POST, OPTIONS",
          "access-control-allow-headers": "content-type, authorization",
        };

        if (request.method === "OPTIONS") {
          return new Response(null, { status: 204, headers: corsHeaders });
        }

        // ── Parse body ──────────────────────────────────────────────────────
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
            JSON.stringify({ error: { message: "messages is required", type: "invalid_request_error" } }),
            { status: 400, headers: { "content-type": "application/json", ...corsHeaders } },
          );
        }

        // Streaming not supported — inform caller
        if (body.stream === true) {
          return new Response(
            JSON.stringify({ error: { message: "Streaming is not supported on this endpoint", type: "invalid_request_error" } }),
            { status: 400, headers: { "content-type": "application/json", ...corsHeaders } },
          );
        }

        // ── Route through AI pool ───────────────────────────────────────────
        try {
          const result = await routeChat(messages, {
            maxTokens: body.max_tokens ?? 1024,
            temperature: body.temperature ?? 0.7,
          });

          // Return OpenAI-compatible response shape
          const response = {
            id: `chatcmpl-${Date.now()}`,
            object: "chat.completion",
            created: Math.floor(Date.now() / 1000),
            model: result.model,
            choices: [
              {
                index: 0,
                message: { role: "assistant", content: result.text },
                finish_reason: "stop",
              },
            ],
            usage: {
              // Approximate token counts — real counting requires a tokenizer
              prompt_tokens: messages.reduce((n, m) => n + Math.ceil(m.content.length / 4), 0),
              completion_tokens: Math.ceil(result.text.length / 4),
              total_tokens: 0, // filled below
            },
            _examglow: { provider: result.provider },
          };
          response.usage.total_tokens =
            response.usage.prompt_tokens + response.usage.completion_tokens;

          return new Response(JSON.stringify(response), {
            headers: { "content-type": "application/json", ...corsHeaders },
          });
        } catch (err) {
          const msg = err instanceof Error ? err.message : "AI unavailable";
          console.error("v1/chat/completions error:", msg);
          return new Response(
            JSON.stringify({
              error: { message: "AI service temporarily unavailable", type: "server_error" },
            }),
            { status: 503, headers: { "content-type": "application/json", ...corsHeaders } },
          );
        }
      },

      // Handle CORS preflight
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
