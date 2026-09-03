import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { ClipboardCheck, Copy, FileText, Loader2, Upload, X } from "lucide-react";

import { DashboardLayout } from "@/components/dashboard-page";
import { callGemini } from "@/lib/ai-router";

export const Route = createFileRoute("/assignments")({
  head: () => ({
    meta: [
      { title: "Assignments — upload a brief, get it completed | ExamGlow" },
      {
        name: "description",
        content:
          "Upload or paste any assignment brief and ExamGlow writes a complete, structured answer with worked steps and explanations.",
      },
      { property: "og:title", content: "Assignments | ExamGlow" },
      { property: "og:description", content: "Upload or paste an assignment and let ExamGlow complete it for you." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AssignmentsPage,
});

const styles = ["Academic essay", "Concise notes", "Step-by-step working", "Report"] as const;
const lengths = ["Short", "Medium", "Detailed"] as const;

function AssignmentsPage() {
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
      setError("That file is too large — keep uploads under 1 MB or paste the text instead.");
      return;
    }
    const text = await file.text();
    const printable = text.replace(/[^\x09\x0a\x0d\x20-\x7e\u00a0-\uffff]/g, "");
    if (printable.trim().length < 20) {
      setError("We couldn't read text from that file. Try a .txt or .md file, or paste the brief below.");
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
      if (res.ok && data.text) {
        setAnswer(data.text);
        return;
      }
      // Direct client fallback via callGemini
      const prompt = `You are ExamGlow's senior Cambridge academic tutor Yumna. Complete this assignment thoroughly.
Assignment title: ${title || "Untitled Assignment"}
Preferred style: ${style}
Target length: ${length}
Brief / Questions:
${brief}

Produce a complete, well-structured answer: restate the task in one line, then answer it fully with clear headings, worked steps for calculations, and short explanations of the reasoning. Finish with a short 'How to check this' checklist.`;
      const gem = await callGemini([{ role: "user", content: prompt }], 2048, 0.5);
      if (gem?.text) setAnswer(gem.text);
      else setError("Could not complete the assignment just now. Please try again.");
    } catch {
      try {
        const gem = await callGemini([{ role: "user", content: `Complete this assignment with full working:\n${brief}` }], 2048, 0.5);
        if (gem?.text) setAnswer(gem.text);
        else setError("Network error — check your connection and try again.");
      } catch {
        setError("Network error — check your connection and try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <DashboardLayout crumbs={[{ label: "Assignments" }]}>
      <header className="grid gap-4 py-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <div className="min-w-0">
          <span className="inline-flex items-center gap-2 rounded-full bg-lilac px-3 py-1 text-xs font-semibold text-ink">
            AI assignment help
          </span>
          <h1 className="mt-3 text-[clamp(1.8rem,3.5vw,2.8rem)] leading-tight">
            Upload it, and we'll <span className="display-italic">complete it</span>
          </h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">
            Drop in a brief, question sheet or essay prompt. You get a full worked answer with the reasoning laid out, so
            you can learn from it as you go.
          </p>
        </div>
      </header>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <section className="rounded-3xl border border-border bg-card p-5">
          <label className="block text-xs font-semibold uppercase tracking-wide text-muted-foreground" htmlFor="assignment-title">
            Assignment title
          </label>
          <input
            id="assignment-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Physiology lab report"
            className="mt-2 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-lavender"
          />

          <div
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const file = e.dataTransfer.files?.[0];
              if (file) void handleFile(file);
            }}
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
            <p className="mt-2 text-xs text-muted-foreground">Text-based files work best (.txt, .md, .csv)</p>
            <input
              ref={fileRef}
              type="file"
              accept=".txt,.md,.csv,.json,text/*"
              className="sr-only"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) void handleFile(file);
                e.target.value = "";
              }}
            />
          </div>

          {fileName && (
            <p className="mt-3 flex items-center gap-2 rounded-2xl bg-secondary px-3 py-2 text-sm">
              <FileText className="size-4 shrink-0" aria-hidden />
              <span className="min-w-0 flex-1 truncate">{fileName}</span>
              <button type="button" aria-label="Remove file" onClick={() => setFileName(null)}>
                <X className="size-4 text-muted-foreground" />
              </button>
            </p>
          )}

          <label className="mt-5 block text-xs font-semibold uppercase tracking-wide text-muted-foreground" htmlFor="assignment-brief">
            Or paste the assignment
          </label>
          <textarea
            id="assignment-brief"
            value={brief}
            onChange={(e) => setBrief(e.target.value)}
            rows={8}
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
            {loading && <Loader2 className="size-4 animate-spin" aria-hidden />}
            {loading ? "Working on it..." : "Complete my assignment"}
          </button>
          {error && <p className="mt-3 text-sm text-destructive">{error}</p>}
        </section>

        <section className="min-h-[420px] rounded-3xl border border-border bg-surface/60 p-5">
          <div className="flex items-center gap-3 border-b border-border pb-3">
            <ClipboardCheck className="size-5" aria-hidden />
            <h2 className="min-w-0 flex-1 truncate text-lg">{title || "Your completed answer"}</h2>
            {answer && (
              <button
                type="button"
                onClick={() => {
                  void navigator.clipboard.writeText(answer);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 1500);
                }}
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
              Your finished assignment appears here — structured sections, worked steps and a checklist to review before
              you hand it in.
            </p>
          )}
        </section>
      </div>
    </DashboardLayout>
  );
}

function Chips({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{label}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {options.map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => onChange(option)}
            className={`rounded-full border px-3 py-1.5 text-xs transition-colors ${
              value === option ? "border-transparent bg-ink text-ink-foreground" : "border-border text-muted-foreground"
            }`}
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
}
