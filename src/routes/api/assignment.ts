import { createFileRoute } from "@tanstack/react-router";

type AssignmentBody = {
  prompt?: string;
  title?: string;
  style?: string;
  length?: string;
};

export const Route = createFileRoute("/api/assignment")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as AssignmentBody;
        const prompt = (body.prompt ?? "").trim().slice(0, 20000);
        if (!prompt) {
          return new Response(JSON.stringify({ error: "Paste or upload an assignment first." }), {
            status: 400,
            headers: { "content-type": "application/json" },
          });
        }

        const apiKey = process.env["LOVABLE_API_KEY"];
        if (!apiKey) {
          return new Response(JSON.stringify({ error: "AI is not configured." }), {
            status: 500,
            headers: { "content-type": "application/json" },
          });
        }

        const res = await fetch("https://ai.gateway.lovable.dev/v1/responses", {
          method: "POST",
          headers: {
            authorization: `Bearer ${apiKey}`,
            "content-type": "application/json",
          },
          body: JSON.stringify({
            model: "openai/gpt-5.6-terra",
            input: [
              {
                role: "system",
                content:
                  "You are ExamGlow's assignment assistant. The student gives you an assignment brief, question sheet or essay prompt. Produce a complete, well-structured answer they can learn from: restate the task in one line, then answer it fully with clear headings, worked steps for calculations, and short explanations of the reasoning. Finish with a short 'How to check this' list. Plain text with simple markdown headings and dashes.",
              },
              {
                role: "user",
                content: [
                  body.title ? `Assignment title: ${body.title}` : "",
                  body.style ? `Preferred style: ${body.style}` : "",
                  body.length ? `Target length: ${body.length}` : "",
                  "",
                  prompt,
                ]
                  .filter(Boolean)
                  .join("\n"),
              },
            ],
          }),
        });

        if (!res.ok) {
          const detail = await res.text();
          console.error("AI gateway error", res.status, detail);
          const message =
            res.status === 429
              ? "Too many requests right now — try again in a moment."
              : res.status === 402
                ? "AI credits have run out for this workspace."
                : "The assignment couldn't be completed just now.";
          return new Response(JSON.stringify({ error: message }), {
            status: res.status,
            headers: { "content-type": "application/json" },
          });
        }

        const data = (await res.json()) as {
          output_text?: string;
          output?: Array<{ content?: Array<{ type?: string; text?: string }> }>;
        };

        const text =
          data.output_text ??
          data.output
            ?.flatMap((item) => item.content ?? [])
            .filter((part) => part.type === "output_text")
            .map((part) => part.text ?? "")
            .join("") ??
          "";

        return new Response(JSON.stringify({ text: text.trim() }), {
          headers: { "content-type": "application/json" },
        });
      },
    },
  },
});
