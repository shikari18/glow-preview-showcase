import { createFileRoute } from "@tanstack/react-router";
import { routeChat, type ChatMessage } from "@/lib/ai-router";

type AssignmentBody = {
  prompt?: string;
  title?: string;
  style?: string;
  length?: string;
};

const SYSTEM_PROMPT =
  "You are ExamGlow's assignment assistant. The student gives you an assignment brief, question sheet " +
  "or essay prompt. Produce a complete, well-structured answer they can learn from: " +
  "restate the task in one line, then answer it fully with clear headings, worked steps for calculations, " +
  "and short explanations of the reasoning. Finish with a short 'How to check this' list. " +
  "Plain text with simple markdown headings and dashes.";

export const Route = createFileRoute("/api/assignment")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as AssignmentBody;
        const prompt = (body.prompt ?? "").trim().slice(0, 20000);

        if (!prompt) {
          return new Response(
            JSON.stringify({ error: "Paste or upload an assignment first." }),
            { status: 400, headers: { "content-type": "application/json" } },
          );
        }

        const userContent = [
          body.title ? `Assignment title: ${body.title}` : "",
          body.style  ? `Preferred style: ${body.style}`  : "",
          body.length ? `Target length: ${body.length}`   : "",
          "",
          prompt,
        ]
          .filter(Boolean)
          .join("\n");

        const messages: ChatMessage[] = [
          { role: "system", content: SYSTEM_PROMPT },
          { role: "user",   content: userContent },
        ];

        try {
          const result = await routeChat(messages, { maxTokens: 2048, temperature: 0.5 });
          return new Response(
            JSON.stringify({ text: result.text, _provider: result.provider }),
            { headers: { "content-type": "application/json" } },
          );
        } catch (err) {
          const msg = err instanceof Error ? err.message : "AI unavailable";
          console.error("Assignment API error:", msg);
          return new Response(
            JSON.stringify({ error: "The assignment couldn't be completed just now. Please try again." }),
            { status: 503, headers: { "content-type": "application/json" } },
          );
        }
      },
    },
  },
});
