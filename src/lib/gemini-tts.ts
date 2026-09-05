/**
 * ExamGlow Real-Time Gemini TTS Engine
 * ─────────────────────────────────────────────────────────────────────────────
 * Ultra-realistic, expressive tutor voice output powered by Gemini 2.5 Flash Preview TTS
 * with immediate AudioContext unlocking, PCM 24kHz hardware decoding, and zero-latency fallback.
 */

const GEMINI_TTS_KEY =
  (typeof process !== "undefined" && (process.env?.["GEMINI_TTS_KEY"] || process.env?.["VITE_GEMINI_TTS_KEY"])) ||
  (typeof atob !== "undefined"
    ? atob("QVEuQWI4Uk42SWo4al96RFhIRElRUXp6RUZlazdnVnJhcE5XTkxKNkhLOUowdWR6SlFldmc=")
    : Buffer.from("QVEuQWI4Uk42SWo4al96RFhIRElRUXp6RUZlazdnVnJhcE5XTkxKNkhLOUowdWR6SlFldmc=", "base64").toString("utf-8"));

let globalAudioCtx: AudioContext | null = null;
let currentSourceNode: AudioBufferSourceNode | null = null;
let currentAudioElement: HTMLAudioElement | null = null;
let currentAudioUrl: string | null = null;
let isAudioPaused = false;
let audioStartTimestamp = 0;
let audioPauseOffset = 0;
let activeAudioBuffer: AudioBuffer | null = null;

const audioCache = new Map<string, string>(); // base64 cache

/**
 * Synchronously unlock AudioContext within user gesture (button click, tap)
 * so subsequent async playback is never blocked by browser Autoplay Policy.
 */
export function unlockAudio(): AudioContext | null {
  if (typeof window === "undefined") return null;
  try {
    const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioCtx) return null;
    if (!globalAudioCtx) {
      globalAudioCtx = new AudioCtx({ sampleRate: 24000 });
    }
    if (globalAudioCtx.state === "suspended") {
      void globalAudioCtx.resume();
    }
    return globalAudioCtx;
  } catch {
    return null;
  }
}

/**
 * Convert 24kHz linear PCM (16-bit signed little-endian) to an AudioBuffer
 */
function pcmToAudioBuffer(ctx: AudioContext, pcmBytes: Uint8Array, sampleRate = 24000): AudioBuffer {
  const int16 = new Int16Array(pcmBytes.buffer, pcmBytes.byteOffset, pcmBytes.byteLength / 2);
  const audioBuffer = ctx.createBuffer(1, int16.length, sampleRate);
  const channelData = audioBuffer.getChannelData(0);
  for (let i = 0; i < int16.length; i++) {
    channelData[i] = int16[i]! / 32768.0;
  }
  return audioBuffer;
}

/**
 * Convert 24kHz linear PCM to a standard WAV ArrayBuffer (for HTMLAudioElement fallback)
 */
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
  view.setUint16(20, 1, true); // PCM format
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, sampleRate * numChannels * 2, true);
  view.setUint16(32, numChannels * 2, true);
  view.setUint16(34, 16, true); // 16-bit

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

/**
 * Fetch raw base64 PCM audio data from /api/tts or direct Gemini fallback
 */
export async function fetchTtsAudioBase64(text: string): Promise<string | null> {
  const snippet = prepareSpeechSnippet(text);
  if (!snippet) return null;

  if (audioCache.has(snippet)) {
    return audioCache.get(snippet)!;
  }

  // 1. Try server-side API proxy first (bypasses browser CORS & adblockers)
  try {
    const res = await fetch("/api/tts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text: snippet }),
      signal: AbortSignal.timeout(18000),
    });

    if (res.ok) {
      const data = (await res.json()) as { audioBase64?: string };
      if (data.audioBase64) {
        audioCache.set(snippet, data.audioBase64);
        return data.audioBase64;
      }
    }
  } catch {}

  // 2. Direct client-side Gemini fallback if server route is unavailable
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-tts:generateContent?key=${GEMINI_TTS_KEY}`;
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ role: "user", parts: [{ text: snippet }] }],
        generationConfig: {
          responseModalities: ["AUDIO"],
          speechConfig: {
            voiceConfig: {
              prebuiltVoiceConfig: { voiceName: "Aoede" },
            },
          },
        },
      }),
      signal: AbortSignal.timeout(18000),
    });

    if (res.ok) {
      const data = (await res.json()) as any;
      const b64 = data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
      if (b64) {
        audioCache.set(snippet, b64);
        return b64;
      }
    }
  } catch {}

  return null;
}

export async function generateGeminiSpeech(text: string): Promise<string | null> {
  const base64Audio = await fetchTtsAudioBase64(text);
  if (!base64Audio) return null;

  try {
    const binaryString = atob(base64Audio);
    const len = binaryString.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    const wavBuffer = pcmToWav(bytes, 24000, 1);
    const blob = new Blob([wavBuffer], { type: "audio/wav" });
    return URL.createObjectURL(blob);
  } catch {
    return null;
  }
}

export async function preloadGeminiSpeech(text: string): Promise<string | null> {
  return generateGeminiSpeech(text);
}

/**
 * Play speech via Web SpeechSynthesis with high-quality feminine voice
 */
function playSpeechSynthesisFallback(
  text: string,
  callbacks?: { onStart?: () => void; onEnd?: () => void; onError?: () => void },
) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    callbacks?.onError?.();
    return;
  }

  try {
    window.speechSynthesis.cancel();
    const clean = cleanSpeechText(text);
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.rate = 1.0;
    utterance.pitch = 1.05;

    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(
      (v) =>
        v.lang.startsWith("en") &&
        (v.name.toLowerCase().includes("female") ||
          v.name.toLowerCase().includes("samantha") ||
          v.name.toLowerCase().includes("victoria") ||
          v.name.toLowerCase().includes("karen") ||
          v.name.toLowerCase().includes("zira") ||
          v.name.toLowerCase().includes("natural")),
    );
    if (preferred) utterance.voice = preferred;

    utterance.onstart = () => callbacks?.onStart?.();
    utterance.onend = () => callbacks?.onEnd?.();
    utterance.onerror = () => callbacks?.onError?.();

    window.speechSynthesis.speak(utterance);
  } catch {
    callbacks?.onError?.();
  }
}

export function playRealisticVoice(
  text: string,
  callbacks?: {
    onLoading?: () => void;
    onStart?: () => void;
    onEnd?: () => void;
    onError?: (err?: unknown) => void;
  },
): { stop: () => void; pause: () => boolean; resume: () => boolean } {
  // 1. Immediately unlock browser AudioContext during user click handler!
  const ctx = unlockAudio();
  stopRealisticVoice();

  let isStopped = false;

  const stop = () => {
    isStopped = true;
    stopRealisticVoice();
    callbacks?.onEnd?.();
  };

  const pause = () => pauseRealisticVoice();
  const resume = () => resumeRealisticVoice();

  void (async () => {
    callbacks?.onLoading?.();

    const base64Audio = await fetchTtsAudioBase64(text);

    if (isStopped) return;

    if (base64Audio) {
      try {
        const binaryString = atob(base64Audio);
        const len = binaryString.length;
        const pcmBytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          pcmBytes[i] = binaryString.charCodeAt(i);
        }

        // Strategy A: AudioContext buffer playback (instant, unblockable after unlock)
        if (ctx && ctx.state !== "closed") {
          if (ctx.state === "suspended") {
            await ctx.resume();
          }

          const audioBuffer = pcmToAudioBuffer(ctx, pcmBytes, 24000);
          activeAudioBuffer = audioBuffer;
          const source = ctx.createBufferSource();
          source.buffer = audioBuffer;
          source.connect(ctx.destination);

          source.onended = () => {
            if (!isAudioPaused) {
              currentSourceNode = null;
              activeAudioBuffer = null;
              callbacks?.onEnd?.();
            }
          };

          currentSourceNode = source;
          audioStartTimestamp = ctx.currentTime;
          audioPauseOffset = 0;
          isAudioPaused = false;
          source.start(0);

          if (!isStopped) {
            callbacks?.onStart?.();
          }
          return;
        }

        // Strategy B: Standard HTMLAudioElement with WAV Blob URL
        const wavBuffer = pcmToWav(pcmBytes, 24000, 1);
        const blob = new Blob([wavBuffer], { type: "audio/wav" });
        const url = URL.createObjectURL(blob);
        currentAudioUrl = url;
        const audio = new Audio(url);
        currentAudioElement = audio;

        audio.onended = () => {
          stopRealisticVoice();
          callbacks?.onEnd?.();
        };
        audio.onerror = () => {
          stopRealisticVoice();
          playSpeechSynthesisFallback(text, callbacks);
        };

        await audio.play();
        if (!isStopped) {
          callbacks?.onStart?.();
        }
        return;
      } catch (err) {
        console.warn("AudioContext decode/play error, falling back to speech synthesis:", err);
      }
    }

    // Fallback: Voice synthesis ensures student ALWAYS hears audio!
    playSpeechSynthesisFallback(text, {
      onStart: () => {
        if (!isStopped) callbacks?.onStart?.();
      },
      onEnd: () => {
        callbacks?.onEnd?.();
      },
      onError: () => {
        callbacks?.onError?.();
      },
    });
  })();

  return { stop, pause, resume };
}

export function pauseRealisticVoice(): boolean {
  if (globalAudioCtx && currentSourceNode && !isAudioPaused) {
    try {
      audioPauseOffset = globalAudioCtx.currentTime - audioStartTimestamp;
      currentSourceNode.stop();
      currentSourceNode = null;
      isAudioPaused = true;
      return true;
    } catch {
      return false;
    }
  }

  if (currentAudioElement && !currentAudioElement.paused) {
    try {
      currentAudioElement.pause();
      return true;
    } catch {
      return false;
    }
  }

  if (typeof window !== "undefined" && "speechSynthesis" in window && window.speechSynthesis.speaking) {
    try {
      window.speechSynthesis.pause();
      return true;
    } catch {
      return false;
    }
  }

  return false;
}

export function resumeRealisticVoice(): boolean {
  if (globalAudioCtx && isAudioPaused && activeAudioBuffer) {
    try {
      if (globalAudioCtx.state === "suspended") {
        void globalAudioCtx.resume();
      }
      const source = globalAudioCtx.createBufferSource();
      source.buffer = activeAudioBuffer;
      source.connect(globalAudioCtx.destination);
      source.onended = () => {
        if (!isAudioPaused) {
          currentSourceNode = null;
          activeAudioBuffer = null;
        }
      };
      currentSourceNode = source;
      audioStartTimestamp = globalAudioCtx.currentTime - audioPauseOffset;
      isAudioPaused = false;
      source.start(0, audioPauseOffset);
      return true;
    } catch {
      return false;
    }
  }

  if (currentAudioElement && currentAudioElement.paused) {
    try {
      void currentAudioElement.play();
      return true;
    } catch {
      return false;
    }
  }

  if (typeof window !== "undefined" && "speechSynthesis" in window && window.speechSynthesis.paused) {
    try {
      window.speechSynthesis.resume();
      return true;
    } catch {
      return false;
    }
  }

  return false;
}

export function isRealisticVoicePlaying(): boolean {
  if (globalAudioCtx && currentSourceNode && !isAudioPaused) return true;
  if (currentAudioElement && !currentAudioElement.paused) return true;
  if (typeof window !== "undefined" && "speechSynthesis" in window && window.speechSynthesis.speaking && !window.speechSynthesis.paused) return true;
  return false;
}

export function isRealisticVoicePaused(): boolean {
  if (isAudioPaused) return true;
  if (currentAudioElement && currentAudioElement.paused) return true;
  if (typeof window !== "undefined" && "speechSynthesis" in window && window.speechSynthesis.paused) return true;
  return false;
}

export function stopRealisticVoice() {
  isAudioPaused = false;
  audioPauseOffset = 0;

  if (currentSourceNode) {
    try {
      currentSourceNode.stop();
      currentSourceNode.disconnect();
    } catch {}
    currentSourceNode = null;
  }
  activeAudioBuffer = null;

  if (currentAudioElement) {
    try {
      currentAudioElement.pause();
      currentAudioElement.currentTime = 0;
    } catch {}
    currentAudioElement = null;
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
