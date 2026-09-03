import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import {
  ClipboardCheck,
  Copy,
  FileText,
  Layers,
  Loader2,
  NotebookTabs,
  Upload,
  X,
} from "lucide-react";

import { DashboardLayout, PageHeading } from "@/components/dashboard-page";

export const Route = createFileRoute("/flashcards")({
  head: () => ({
    meta: [
      { title: "Flashcards & Assignments | ExamGlow" },
      {
        name: "description",
        content: "Auto-generated flashcard decks and AI assignment help — all in one place.",
      },
    ],
  }),
  component: FlashcardsPage,
});

const styles = ["Academic essay", "Concise notes", "Step-by-step working", "Report"] as const;
const lengths = ["Short", "Medium", "Detailed"] as const;

function FlashcardsPage() {
  const [activeTab, setActiveTab] = useState<"flashcards" | "assignment">("flashcards");

  return (
    <DashboardLayout crumbs={[{ label: "Practice" }, { label: "Flashcards" }]}>
      <PageHeading
        icon={<NotebookTabs className="size-5" aria-hidden />}
        title="Flashcards"
        subtitle="Spaced repetition decks + AI assignment help"
      />

      {/* Tab bar */}
      <div className="mb-6 flex gap-1 rounded-2xl border border-border bg-surface p-1 sm:w-fit">
        <button
          onClick={() => setActiveTab("flashcards")}
          className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-colors ${
            activeTab === "flashcards" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Layers className="size-4" aria-hidden /> Flashcard Decks
        </button>
        <button
          onClick={() => setActiveTab("assignment")}
          className={`flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium transition-colors ${
            activeTab === "assignment" ? "bg-card shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          Assignment Help
        </button>
      </div>

      {activeTab === "flashcards" ? <FlashcardDecks /> : <AssignmentHelp />}
    </DashboardLayout>
  );
}

// ─── Flashcard Decks ──────────────────────────────────────────────────────────

function FlashcardDecks() {
  return (
    <div className="rounded-3xl border border-dashed border-border bg-surface/60 px-6 py-20 text-center">
      <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-2xl bg-lavender/20">
        <Layers className="size-8 text-lavender" aria-hidden />
      </div>
      <h2 className="text-xl font-semibold">No decks yet</h2>
      <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
        Generate a deck from any topic in your study set and review it a little every day.
      </p>
      <button
        type="button"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-ink-foreground"
      >
        <Layers className="size-4" aria-hidden /> Create New Deck
      </button>
    </div>
  );
}

// ─── Assignment Help ──────────────────────────────────────────────────────────

function AssignmentHelp() {
  const [title, setTitle] = useState("");
  const [brief, setBrief] = useState("");
  const [style, setStyle] = useState<string>(styles[0]);
  const [length, setLength] = useState<string>(lengths[1]);
  const [fileName, setFileName] = useState<string | null>(null);
  const [answer, setAnswer] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function handleFile(file: File) {
    setError(null);
    if (file.size > 1_000_000) {
      setError("File too large — keep uploads under 1 MB or paste the text instead.");
      return;
    }
    const text = await file.text();
    const printable = text.replace(/[^\x09\x0a\x0d\x20-\x7e\u00a0-\uffff]/g, "");
    if (printable.trim().length < 20) {
      setError("Couldn't read text from that file. Try a .txt or .md file, or paste the brief below.");
      return;
    }
    setFileName(file.name);
    setBrief(printable.slice(0, 20000));
    if (!title) setTitle(file.name.replace(/\.[^.]+$/, ""));
  }

  async function complete() {
    if (!brief.trim() || loading) return;
    setLoading(true);
    setError(null);
    setAnswer("");
    try {
      const res = await fetch("/api/assignment", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ prompt: brief, title, style, length }),
      });
      const data = (await res.json()) as { text?: string; error?: string };
      if (!res.ok || !data.text) setError(data.error ?? "Something went wrong. Please try again.");
      else setAnswer(data.text);
    } catch {
      setError("Network error — check your connection and try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
      {/* Left: input */}
      <section className="rounded-3xl border border-border bg-card p-5">
        <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground" htmlFor="asgn-title">
          Assignment title
        </label>
        <input
          id="asgn-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. Physiology lab report"
          className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-lavender"
        />

        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => { e.preventDefault(); const f = e.dataTransfer.files?.[0]; if (f) void handleFile(f); }}
          className="mt-4 rounded-2xl border border-dashed border-border bg-surface/60 px-5 py-7 text-center"
        >
          <Upload className="mx-auto size-6 text-muted-foreground" aria-hidden />
          <p className="mt-2 text-sm font-medium">Drag a file here, or</p>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-ink-foreground"
          >
            Choose a file
          </button>
          <p className="mt-2 text-xs text-muted-foreground">Text-based files work best (.txt, .md)</p>
          <input
            ref={fileRef}
            type="file"
            accept=".txt,.md,.csv,.json,text/*"
            className="sr-only"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) void handleFile(f); e.target.value = ""; }}
          />
        </div>

        {fileName && (
          <p className="mt-3 flex items-center gap-2 rounded-2xl bg-secondary px-3 py-2 text-sm">
            <FileText className="size-4 shrink-0" aria-hidden />
            <span className="min-w-0 flex-1 truncate">{fileName}</span>
            <button type="button" aria-label="Remove" onClick={() => setFileName(null)}>
              <X className="size-4 text-muted-foreground" />
            </button>
          </p>
        )}

        <label className="mt-5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground" htmlFor="asgn-brief">
          Or paste the assignment
        </label>
        <textarea
          id="asgn-brief"
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
          rows={7}
          placeholder="Paste the questions or brief here..."
          className="mt-2 w-full resize-y rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-lavender"
        />

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <Chips label="Style" options={styles} value={style} onChange={setStyle} />
          <Chips label="Length" options={lengths} value={length} onChange={setLength} />
        </div>

        <button
          type="button"
          onClick={() => void complete()}
          disabled={!brief.trim() || loading}
          className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink px-5 py-3.5 text-sm font-medium text-ink-foreground disabled:opacity-50"
        >
          {loading && <Loader2 className="size-4 animate-spin" />}
          {loading ? "Working on it..." : "Complete my assignment"}
        </button>
        {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
      </section>

      {/* Right: output */}
      <section className="min-h-[420px] rounded-3xl border border-border bg-surface/60 p-5">
        <div className="flex items-center gap-3 border-b border-border pb-3">
          <ClipboardCheck className="size-5" aria-hidden />
          <h2 className="min-w-0 flex-1 truncate text-lg">{title || "Your completed answer"}</h2>
          {answer && (
            <button
              type="button"
              onClick={() => { void navigator.clipboard.writeText(answer); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
              className="flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-xs"
            >
              <Copy className="size-3.5" aria-hidden /> {copied ? "Copied" : "Copy"}
            </button>
          )}
        </div>

        {answer ? (
          <article className="mt-4 whitespace-pre-wrap text-sm leading-relaxed">{answer}</article>
        ) : loading ? (
          <div className="mt-6 space-y-3">
            {[90, 100, 75, 95, 60].map((w) => (
              <div key={w} className="h-3 animate-pulse rounded-full bg-secondary" style={{ width: `${w}%` }} />
            ))}
          </div>
        ) : (
          <p className="mt-6 max-w-sm text-sm text-muted-foreground">
            Your finished assignment appears here — structured sections, worked steps and a checklist to review.
          </p>
        )}
      </section>
    </div>
  );
}

function Chips({ label, options, value, onChange }: {
  label: string; options: readonly string[]; value: string; onChange: (v: string) => void;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => (
          <button
            key={o}
            type="button"
            onClick={() => onChange(o)}
            className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
              value === o ? "border-transparent bg-ink text-ink-foreground" : "border-border text-muted-foreground"
            }`}
          >
            {o}
          </button>
        ))}
      </div>
    </div>
  );
}
