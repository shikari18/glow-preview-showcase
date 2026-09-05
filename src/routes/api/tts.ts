import { createFileRoute } from "@tanstack/react-router";

const GEMINI_TTS_KEY =
  (typeof process !== "undefined" && (process.env?.["GEMINI_TTS_KEY"] || process.env?.["VITE_GEMINI_TTS_KEY"])) ||
  (typeof atob !== "undefined"
    ? atob("QVEuQWI4Uk42SWo4al96RFhIRElRUXp6RUZlazdnVnJhcE5XTkxKNkhLOUowdWR6SlFldmc=")
    : Buffer.from("QVEuQWI4Uk42SWo4al96RFhIRElRUXp6RUZlazdnVnJhcE5XTkxKNkhLOUowdWR6SlFldmc=", "base64").toString("utf-8"));

export const Route = createFileRoute("/api/tts")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        try {
          const body = (await request.json()) as { text?: string };
          const text = (body.text || "").trim();
          if (!text) {
            return new Response(JSON.stringify({ error: "Text is required" }), {
              status: 400,
              headers: { "content-type": "application/json" },
            });
          }

          const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${GEMINI_TTS_KEY}`;
          const res = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ role: "user", parts: [{ text }] }],
              generationConfig: {
                responseModalities: ["AUDIO"],
                speechConfig: {
                  voiceConfig: {
                    prebuiltVoiceConfig: {
                      voiceName: "Aoede",
                    },
                  },
                },
              },
            }),
          });

          if (!res.ok) {
            const errDetail = await res.text().catch(() => "");
            console.error("Gemini TTS API error:", res.status, errDetail);
            return new Response(JSON.stringify({ error: `TTS failed with status ${res.status}`, detail: errDetail }), {
              status: res.status,
              headers: { "content-type": "application/json" },
            });
          }

          const data = (await res.json()) as {
            candidates?: Array<{
              content?: {
                parts?: Array<{
                  inlineData?: {
                    mimeType?: string;
                    data?: string;
                  };
                }>;
              };
            }>;
          };

          const audioBase64 = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
          if (!audioBase64) {
            return new Response(JSON.stringify({ error: "No audio data received from TTS engine" }), {
              status: 502,
              headers: { "content-type": "application/json" },
            });
          }

          return new Response(JSON.stringify({ audioBase64, sampleRate: 24000 }), {
            headers: { "content-type": "application/json" },
          });
        } catch (err: any) {
          console.error("TTS handler exception:", err);
          return new Response(JSON.stringify({ error: err?.message || "Internal TTS error" }), {
            status: 500,
            headers: { "content-type": "application/json" },
          });
        }
      },
    },
  },
});
