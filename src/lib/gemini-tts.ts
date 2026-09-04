/**
 * ExamGlow Real-Time Gemini TTS Engine
 * ─────────────────────────────────────────────────────────────────────────────
 * Ultra-realistic, expressive feminine voice output using Gemini 2.5 Flash Preview TTS.
 * Converts raw 24kHz linear PCM to playable browser WAV audio.
 */

const GEMINI_TTS_KEY =
  (typeof process !== "undefined" && (process.env?.["GEMINI_TTS_KEY"] || process.env?.["VITE_GEMINI_TTS_KEY"])) ||
  (typeof atob !== "undefined"
    ? atob("QVEuQWI4Uk42SWo4al96RFhIRElRUXp6RUZlazdnVnJhcE5XTkxKNkhLOUowdWR6SlFldmc=")
    : Buffer.from("QVEuQWI4Uk42SWo4al96RFhIRElRUXp6RUZlazdnVnJhcE5XTkxKNkhLOUowdWR6SlFldmc=", "base64").toString("utf-8"));

let currentAudio: HTMLAudioElement | null = null;
let currentAudioUrl: string | null = null;
const audioCache = new Map<string, string>();

function pcmToWav(pcmData: Uint8Array, sampleRate = 24000, numChannels = 1): ArrayBuffer {
  const buffer = new ArrayBuffer(44 + pcmData.length);
  const view = new DataView(buffer);

  function writeString(offset: number, str: string) {
    for (let i = 0; i < str.length; i++) {
      view.setUint8(offset + i, str.charCodeAt(i));
    }
  }

  writeString(0, "RIFF");
  view.setUint32(4, 36 + pcmData.length, true);
  writeString(8, "WAVE");

  writeString(12, "fmt ");
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numChannels * 2, true);
  view.setUint16(32, numChannels * 2, true);
  view.setUint16(34, 16, true);

  writeString(36, "data");
  view.setUint32(40, pcmData.length, true);

  new Uint8Array(buffer, 44).set(pcmData);
  return buffer;
}

export function cleanSpeechText(text: string): string {
  return text
    .replace(
      /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F1E6}-\u{1F1FF}]/gu,
      "",
    )
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/_(.*?)_/g, "$1")
    .replace(/`{1,3}.*?`{1,3}/gs, "")
    .replace(/#{1,6}\s*/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/https?:\/\/\S+/g, "")
    .replace(/\$\$(.*?)\$\$/gs, "$1")
    .replace(/\$(.*?)\$/g, "$1")
    .replace(/\\frac\{([^}]+)\}\{([^}]+)\}/g, "$1 over $2")
    .replace(/\\(times|cdot)/g, " times ")
    .replace(/[\{\}\\]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function prepareSpeechSnippet(text: string): string {
  const clean = cleanSpeechText(text);
  if (clean.length <= 280) return clean;
  // Find natural sentence boundary within first 280 chars
  const sentences = clean.match(/[^.!?]+[.!?]+/g);
  if (sentences && sentences.length > 0) {
    let combined = "";
    for (const s of sentences) {
      if ((combined + s).length <= 280) {
        combined += (combined ? " " : "") + s.trim();
      } else {
        break;
      }
    }
    if (combined.length >= 50) return combined;
  }
  const lastSpace = clean.slice(0, 260).lastIndexOf(" ");
  return (lastSpace > 50 ? clean.slice(0, lastSpace) : clean.slice(0, 250)).trim() + ".";
}

export async function generateGeminiSpeech(text: string): Promise<string | null> {
  const snippet = prepareSpeechSnippet(text);
  if (!snippet) return null;

  // Check in-memory audio cache for instant replay
  if (audioCache.has(snippet)) {
    return audioCache.get(snippet)!;
  }

  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${GEMINI_TTS_KEY}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: snippet }],
          },
        ],
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
      signal: AbortSignal.timeout(25000),
    });

    if (!res.ok) {
      console.warn("Gemini TTS HTTP error:", res.status);
      return null;
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

    const base64Audio = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    if (!base64Audio) return null;

    const binaryString = atob(base64Audio);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }

    const wavBuffer = pcmToWav(bytes, 24000, 1);
    const blob = new Blob([wavBuffer], { type: "audio/wav" });
    const urlBlob = URL.createObjectURL(blob);
    audioCache.set(snippet, urlBlob);
    return urlBlob;
  } catch (err) {
    console.warn("Gemini TTS request error:", err);
    return null;
  }
}

export function playRealisticVoice(
  text: string,
  callbacks?: {
    onStart?: () => void;
    onEnd?: () => void;
    onError?: () => void;
  },
): { stop: () => void } {
  stopRealisticVoice();

  let isStopped = false;

  const stop = () => {
    isStopped = true;
    stopRealisticVoice();
    callbacks?.onEnd?.();
  };

  void (async () => {
    callbacks?.onStart?.();

    const audioUrl = await generateGeminiSpeech(text);

    if (isStopped) {
      return;
    }

    if (audioUrl) {
      currentAudioUrl = audioUrl;
      const audio = new Audio(audioUrl);
      currentAudio = audio;

      audio.onended = () => {
        stopRealisticVoice();
        callbacks?.onEnd?.();
      };
      audio.onerror = () => {
        stopRealisticVoice();
        callbacks?.onError?.();
      };

      try {
        await audio.play();
        return;
      } catch {
        // Autoplay blocked by browser policy
        callbacks?.onError?.();
      }
    } else {
      // Never fall back to robotic browser voice; call onError cleanly
      callbacks?.onError?.();
    }
  })();

  return { stop };
}

export function stopRealisticVoice() {
  if (currentAudio) {
    try {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    } catch {}
    currentAudio = null;
  }
  if (currentAudioUrl) {
    try {
      URL.revokeObjectURL(currentAudioUrl);
    } catch {}
    currentAudioUrl = null;
  }
  if (typeof window !== "undefined" && "speechSynthesis" in window) {
    try {
      window.speechSynthesis.cancel();
    } catch {}
  }
}
