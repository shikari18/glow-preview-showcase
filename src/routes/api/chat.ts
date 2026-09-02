import { createFileRoute } from "@tanstack/react-router";
import { routeChat, type ChatMessage } from "@/lib/ai-router";

const SYSTEM_PROMPT =
  "You are Sparky, the ExamGlow AI study assistant — a friendly, knowledgeable tutor. " +
  "Help students understand their course material, plan study sessions, explain concepts clearly, " +
  "quiz them, summarize notes and answer exam-style questions. " +
  "Keep answers concise, warm and practical. Use short paragraphs or dashes. Avoid long lists.";

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as { messages?: ChatMessage[] };
        const userMessages = Array.isArray(body.messages) ? body.messages.slice(-20) : [];

        if (userMessages.length === 0) {
          return new Response(JSON.stringify({ error: "Messages are required" }), {
            status: 400,
            headers: { "content-type": "application/json" },
          });
        }

        const messages: ChatMessage[] = [
          { role: "system", content: SYSTEM_PROMPT },
          ...userMessages,
        ];

        try {
          const result = await routeChat(messages, { maxTokens: 1024, temperature: 0.7 });
          return new Response(
            JSON.stringify({ text: result.text, _provider: result.provider }),
            { headers: { "content-type": "application/json" } },
          );
        } catch (err) {
          const msg = err instanceof Error ? err.message : "AI unavailable";
          console.error("Chat API error:", msg);
          return new Response(
            JSON.stringify({ error: "Sparky couldn't respond right now. Please try again." }),
            { status: 503, headers: { "content-type": "application/json" } },
          );
        }
      },
    },
  },
});
