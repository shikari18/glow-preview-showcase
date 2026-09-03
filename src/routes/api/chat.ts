import { createFileRoute } from "@tanstack/react-router";
import { routeChat, type ChatMessage } from "@/lib/ai-router";

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as { messages?: ChatMessage[] };
        const userMessages = Array.isArray(body.messages) ? body.messages.slice(-25) : [];

        if (userMessages.length === 0) {
          return new Response(JSON.stringify({ error: "Messages are required" }), {
            status: 400,
            headers: { "content-type": "application/json" },
          });
        }

        try {
          const result = await routeChat(userMessages, { maxTokens: 1024, temperature: 0.7 });
          return new Response(
            JSON.stringify({ text: result.text, _provider: result.provider, _model: result.model }),
            { headers: { "content-type": "application/json" } },
          );
        } catch (err) {
          const msg = err instanceof Error ? err.message : "AI unavailable";
          console.error("Chat API error:", msg);
          return new Response(
            JSON.stringify({ error: "AI tutor is processing. Please try again." }),
            { status: 503, headers: { "content-type": "application/json" } },
          );
        }
      },
    },
  },
});
