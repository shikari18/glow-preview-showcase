import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Loader2, Mic, Save, Sparkles, Square, Trash2 } from "lucide-react";

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

  async function start() {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      transcriptRef.current = "";
      setLiveTranscript("");
      recorder.ondataavailable = (event) => {
        if (event.data.size > 0) chunksRef.current.push(event.data);
      };
      recorder.onstop = async () => {
        stream.getTracks().forEach((track) => track.stop());
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
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
      recorder.start();
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
    recorderRef.current?.stop();
    recorderRef.current = null;
    recognitionRef.current?.stop();
    recognitionRef.current = null;
    setRecording(false);
  }

  async function remove(id: string) {
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

  async function askWhiskers(item: Recording, kind: "summary" | "quiz") {
    if (!item.transcript) {
      setAnswers((prev) => ({
        ...prev,
        [item.id]: "There's no transcript for this recording yet, so Whiskers can't read it. Try recording in Chrome, where live transcription is supported.",
      }));
      return;
    }
    setAskingId(item.id);
    try {
      const prompt =
        kind === "summary"
          ? `Summarise this lecture in short bullet-style lines, then list the 3 most exam-relevant points.\n\nLecture transcript:\n${item.transcript}`
          : `Write 5 short practice questions with answers based on this lecture.\n\nLecture transcript:\n${item.transcript}`;
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: [{ role: "user", content: prompt }] }),
      });
      const data = (await res.json()) as { text?: string; error?: string };
      setAnswers((prev) => ({
        ...prev,
        [item.id]: data.text ?? data.error ?? "Whiskers couldn't answer that just now.",
      }));
    } catch {
      setAnswers((prev) => ({ ...prev, [item.id]: "Network error — please try again." }));
    } finally {
      setAskingId(null);
    }
  }

  return (
    <DashboardLayout crumbs={[{ label: "Study" }, { label: "Record Lecture" }]}>
      <PageHeading
        icon={<Mic className="size-5" aria-hidden />}
        title="Record a lecture"
        subtitle="Record, save it on your device, listen back later — and let Whiskers help with it."
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
                  onClick={() => void askWhiskers(item, "summary")}
                  disabled={askingId === item.id}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition-colors hover:bg-secondary disabled:opacity-60"
                >
                  {askingId === item.id ? (
                    <Loader2 className="size-4 animate-spin" aria-hidden />
                  ) : (
                    <Sparkles className="size-4" aria-hidden />
                  )}
                  Summarise with AI
                </button>
                <button
                  type="button"
                  onClick={() => void askWhiskers(item, "quiz")}
                  disabled={askingId === item.id}
                  className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm transition-colors hover:bg-secondary disabled:opacity-60"
                >
                  <Save className="size-4" aria-hidden /> Make questions
                </button>
              </div>

              {item.transcript && (
                <details className="mt-4 rounded-2xl bg-surface p-4">
                  <summary className="cursor-pointer text-sm font-medium">Transcript</summary>
                  <p className="mt-2 text-sm text-muted-foreground">{item.transcript}</p>
                </details>
              )}

              {answers[item.id] && (
                <div className="mt-4 rounded-2xl bg-lilac/25 p-4 text-sm whitespace-pre-wrap">{answers[item.id]}</div>
              )}
            </li>
          ))}
        </ul>
      )}
    </DashboardLayout>
  );
}
