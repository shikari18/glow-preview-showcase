import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { BookOpen, FileText, Loader2, Mic, Save, Square, Trash2, Volume2, VolumeX } from "lucide-react";
import { playRealisticVoice, stopRealisticVoice } from "@/lib/gemini-tts";

import { DashboardLayout, EmptyState, PageHeading, PrimaryButton } from "@/components/dashboard-page";
import {
  deleteRecording,
  formatDuration,
  listRecordings,
  saveRecording,
  type Recording,
} from "@/lib/recordings";

export const Route = createFileRoute("/record-lecture")({
  head: () => ({
    meta: [
      { title: "Record Lecture — save, replay and ask the AI | ExamGlow" },
      {
        name: "description",
        content:
          "Record a lecture, save it to your device, listen back any time, and let the ExamGlow AI tutor summarise it or quiz you on it.",
      },
      { property: "og:title", content: "Record Lecture | ExamGlow" },
      { property: "og:description", content: "Record lectures, listen back later, and get AI summaries and quizzes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: RecordLecturePage,
});

type SpeechRecognitionLike = {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start: () => void;
  stop: () => void;
  onresult: ((event: any) => void) | null;
  onerror: (() => void) | null;
};

function createRecognition(): SpeechRecognitionLike | null {
  const w = window as any;
  const Ctor = w.SpeechRecognition ?? w.webkitSpeechRecognition;
  if (!Ctor) return null;
  const recognition: SpeechRecognitionLike = new Ctor();
  recognition.continuous = true;
  recognition.interimResults = false;
  recognition.lang = "en-US";
  return recognition;
}

function RecordLecturePage() {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [recording, setRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [title, setTitle] = useState("");
  const [liveTranscript, setLiveTranscript] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [askingId, setAskingId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const [playingVoiceId, setPlayingVoiceId] = useState<string | null>(null);

  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const startedAtRef = useRef(0);
  const recognitionRef = useRef<SpeechRecognitionLike | null>(null);
  const transcriptRef = useRef("");

  const refresh = useCallback(async () => {
    const items = await listRecordings();
    setRecordings(items);
    setUrls((prev) => {
      const next = { ...prev };
      for (const item of items) {
        if (!next[item.id]) next[item.id] = URL.createObjectURL(item.blob);
      }
      return next;
    });
  }, []);

  useEffect(() => {
    void refresh();
  }, [refresh]);

  useEffect(() => {
    if (!recording) return;
    const timer = window.setInterval(() => setElapsed(Date.now() - startedAtRef.current), 250);
    return () => window.clearInterval(timer);
  }, [recording]);

  function speakText(id: string, text: string) {
    stopRealisticVoice();
    if (playingVoiceId === id) {
      setPlayingVoiceId(null);
      return;
    }
    setPlayingVoiceId(id);
    playRealisticVoice(text, {
      onStart: () => setPlayingVoiceId(id),
      onEnd: () => setPlayingVoiceId(null),
      onError: () => setPlayingVoiceId(null),
    });
  }

  async function start() {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const options: MediaRecorderOptions = {};
      if (typeof MediaRecorder !== "undefined") {
        if (MediaRecorder.isTypeSupported("audio/webm;codecs=opus")) {
          options.mimeType = "audio/webm;codecs=opus";
        } else if (MediaRecorder.isTypeSupported("audio/webm")) {
          options.mimeType = "audio/webm";
        } else if (MediaRecorder.isTypeSupported("audio/mp4")) {
          options.mimeType = "audio/mp4";
        }
      }
      const recorder = new MediaRecorder(stream, options);
      chunksRef.current = [];
      transcriptRef.current = "";
      setLiveTranscript("");
      recorder.ondataavailable = (event) => {
        if (event.data && event.data.size > 0) chunksRef.current.push(event.data);
      };
      recorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        const mime = recorder.mimeType || "audio/webm";
        const blob = new Blob(chunksRef.current, { type: mime });
        const durationMs = Date.now() - startedAtRef.current;
        const item: Recording = {
          id: crypto.randomUUID(),
          title: title.trim() || `Lecture ${new Date().toLocaleString()}`,
          createdAt: Date.now(),
          durationMs,
          mimeType: blob.type,
          transcript: transcriptRef.current.trim(),
          blob,
        };
        await saveRecording(item);
        setTitle("");
        setElapsed(0);
        await refresh();
      };
      recorderRef.current = recorder;
      startedAtRef.current = Date.now();
      // Use 200ms timeslice so audio buffers continuously
      recorder.start(200);
      setRecording(true);

      const recognition = createRecognition();
      if (recognition) {
        recognition.onresult = (event: any) => {
          let text = "";
          for (let i = event.resultIndex; i < event.results.length; i += 1) {
            text += `${event.results[i][0].transcript} `;
          }
          transcriptRef.current = `${transcriptRef.current} ${text}`.replace(/\s+/g, " ");
          setLiveTranscript(transcriptRef.current);
        };
        recognition.onerror = () => {};
        recognition.start();
        recognitionRef.current = recognition;
      }
    } catch {
      setError("We couldn't access your microphone. Allow microphone access and try again.");
    }
  }

  function stop() {
    if (recorderRef.current && recorderRef.current.state !== "inactive") {
      try {
        recorderRef.current.requestData();
      } catch {}
      recorderRef.current.stop();
    }
    recorderRef.current = null;
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setRecording(false);
  }

  async function remove(id: string) {
    if (playingVoiceId === id) {
      window.speechSynthesis.cancel();
      setPlayingVoiceId(null);
    }
    await deleteRecording(id);
    setUrls((prev) => {
      if (prev[id]) URL.revokeObjectURL(prev[id] as string);
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setAnswers((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    await refresh();
  }

  async function askYumna(item: Recording, kind: "summary" | "explain" | "quiz") {
    if (!item.transcript) {
      setAnswers((prev) => ({
        ...prev,
        [item.id]: "There's no transcript for this recording yet, so Yumna can't read it. Try recording in Chrome or Edge, where live speech transcription is enabled.",
      }));
      return;
    }
    setAskingId(item.id);
    try {
      let prompt = "";
      if (kind === "summary") {
        prompt = `You are Yumna, a supportive Cambridge AI tutor. Summarise this recorded lecture in concise bullet points, then provide the 3 most crucial exam takeaways:\n\nLecture transcript:\n${item.transcript}`;
      } else if (kind === "explain") {
        prompt = `You are Yumna, a warm and encouraging Cambridge AI tutor. Break down and explain this lecture transcript in simple, intuitive terms as if explaining to a student who found it confusing. Highlight the key concepts step-by-step:\n\nLecture transcript:\n${item.transcript}`;
      } else {
        prompt = `You are Yumna, a Cambridge tutor. Write 5 high-yield exam practice questions with mark schemes and model answers based on this lecture:\n\nLecture transcript:\n${item.transcript}`;
      }

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: prompt }] }),
      });
      const data = (await res.json()) as { text?: string; error?: string };
      setAnswers((prev) => ({
        ...prev,
        [item.id]: data.text ?? data.error ?? "Yumna couldn't complete the breakdown just now. Please try again.",
      }));
    } catch {
      setAnswers((prev) => ({ ...prev, [item.id]: "Network error — please check your connection and try again." }));
    } finally {
      setAskingId(null);
    }
  }

  return (
    <DashboardLayout crumbs={[{ label: "Study" }, { label: "Record Lecture" }]}>
      <PageHeading
        icon={<Mic className="size-5" aria-hidden />}
        title="Record a lecture"
        subtitle="Record, save it on your device, listen back later — and let Yumna explain, summarise or quiz you."
      />

      <section className="rounded-3xl border border-border bg-card p-5">
        <label className="block max-w-md">
          <span className="mb-1.5 block text-sm font-medium">Lecture title</span>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Prospect Theory — week 4"
            className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-lavender"
          />
        </label>

        <div className="mt-5 flex flex-wrap items-center gap-3">
          {recording ? (
            <PrimaryButton onClick={stop}>
              <Square className="size-4" aria-hidden /> Stop &amp; save
            </PrimaryButton>
          ) : (
            <PrimaryButton onClick={() => void start()}>
              <Mic className="size-4" aria-hidden /> Start recording
            </PrimaryButton>
          )}
          {recording && (
            <span className="flex items-center gap-2 text-sm text-muted-foreground">
              <span className="size-2.5 animate-pulse rounded-full bg-destructive" aria-hidden />
              Recording · {formatDuration(elapsed)}
            </span>
          )}
        </div>

        {error && <p className="mt-3 text-sm text-destructive">{error}</p>}

        {recording && (
          <div className="mt-4 rounded-2xl bg-surface p-4">
            <p className="text-xs font-semibold uppercase text-muted-foreground">Live transcript</p>
            <p className="mt-2 text-sm">
              {liveTranscript || "Listening… speech is transcribed as you record so the AI can read it later."}
            </p>
          </div>
        )}
      </section>

      <h2 className="mt-10 text-2xl">Saved recordings</h2>
      {recordings.length === 0 ? (
        <div className="mt-4">
          <EmptyState
            title="No recordings yet"
            body="Hit start recording during your next lecture. Recordings are stored on this device so you can listen back any time."
          />
        </div>
      ) : (
        <ul className="mt-4 space-y-4">
          {recordings.map((item) => (
            <li key={item.id} className="rounded-3xl border border-border bg-card p-5">
              <div className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-3">
                <div className="min-w-0">
                  <p className="truncate font-medium">{item.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(item.createdAt).toLocaleString()} · {formatDuration(item.durationMs)}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => void remove(item.id)}
                  aria-label={`Delete ${item.title}`}
                  className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:bg-secondary"
                >
                  <Trash2 className="size-4" aria-hidden />
                </button>
              </div>

              {urls[item.id] && <audio controls src={urls[item.id]} className="mt-4 w-full" />}

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => void askYumna(item, "explain")}
                  disabled={askingId === item.id}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold transition-all hover:bg-secondary disabled:opacity-60"
                >
                  {askingId === item.id ? (
                    <Loader2 className="size-3.5 animate-spin" aria-hidden />
                  ) : (
                    <BookOpen className="size-3.5" aria-hidden />
                  )}
                  Break Down &amp; Explain
                </button>
                <button
                  type="button"
                  onClick={() => void askYumna(item, "summary")}
                  disabled={askingId === item.id}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold transition-all hover:bg-secondary disabled:opacity-60"
                >
                  {askingId === item.id ? (
                    <Loader2 className="size-3.5 animate-spin" aria-hidden />
                  ) : (
                    <FileText className="size-3.5" aria-hidden />
                  )}
                  Summarise with Yumna
                </button>
                <button
                  type="button"
                  onClick={() => void askYumna(item, "quiz")}
                  disabled={askingId === item.id}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-semibold transition-all hover:bg-secondary disabled:opacity-60"
                >
                  <Save className="size-3.5" aria-hidden /> Make Exam Questions
                </button>
              </div>

              {item.transcript && (
                <details className="mt-4 rounded-2xl bg-surface p-4">
                  <summary className="cursor-pointer text-xs font-bold uppercase tracking-wide text-muted-foreground">Lecture Transcript</summary>
                  <p className="mt-2 text-sm leading-relaxed text-foreground/80">{item.transcript}</p>
                </details>
              )}

              {answers[item.id] && (
                <div className="mt-4 rounded-2xl border border-border bg-lilac/15 p-4 text-sm leading-relaxed whitespace-pre-wrap">
                  <div className="mb-2 flex items-center justify-between border-b border-border/50 pb-2">
                    <span className="text-xs font-bold text-foreground">Yumna's Breakdown:</span>
                    <button
                      type="button"
                      onClick={() => speakText(item.id, answers[item.id]!)}
                      className="flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold shadow-sm hover:bg-secondary transition-colors"
                    >
                      {playingVoiceId === item.id ? (
                        <>
                          <VolumeX className="size-3.5 text-rose-500" /> Stop Audio
                        </>
                      ) : (
                        <>
                          <Volume2 className="size-3.5 text-primary" /> Listen with Voice
                        </>
                      )}
                    </button>
                  </div>
                  <div>{answers[item.id]}</div>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </DashboardLayout>
  );
}
