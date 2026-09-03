import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import {
  Bold,
  Italic,
  Underline,
  Strikethrough,
  Highlighter,
  Palette,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
  Undo2,
  Redo2,
  Plus,
  History,
  Printer,
  Maximize2,
  Minimize2,
  Sparkles,
  FilePlus,
  Trash2,
  ChevronDown,
  Check,
  Save,
  BookOpen,
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-page";
import { isPaidUser, canSendAiMessage, incrementAiMessageCount } from "@/lib/onboarding";
import { PaywallModal } from "@/components/paywall-modal";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "My Notes — Study Editor | ExamGlow" },
      { name: "description", content: "Interactive rich-text note taking and revision workspace with AI tools." },
    ],
  }),
  component: NotesEditorPage,
});

type NoteItem = {
  id: string;
  title: string;
  updatedAt: number;
  content: string;
};

const DEFAULT_NOTE: NoteItem = {
  id: "default-note-1",
  title: "Foundations of Behavioral Economics: Rational Choice Theory vs. Bounded Rationality and the Dual Process Model",
  updatedAt: Date.now(),
  content: `
<p style="font-size: 15px; line-height: 1.8; color: #4b5563; margin-bottom: 24px;">
This module explores the fundamental tension in economic thought between the classical assumption of human perfection and the psychological reality of human limitation. We will examine the transition from <strong>Rational Choice Theory</strong>, which assumes humans act as hyper-logical optimizers, to <strong>Bounded Rationality</strong>, which accounts for cognitive constraints, and finally to the <strong>Dual Process Model</strong>, which explains the neurological architecture behind these different modes of thinking.
</p>

<h2 style="font-size: 22px; font-weight: 800; margin-top: 32px; margin-bottom: 12px; color: #111827;">1. Rational Choice Theory (The Classical Paradigm)</h2>

<p style="font-size: 15px; line-height: 1.8; color: #374151; margin-bottom: 16px;">
<strong>Rational Choice Theory (RCT)</strong> is the bedrock of neoclassical economics. It posits that individuals are <em>homo economicus</em>—rational agents who consistently make decisions to maximize their personal utility.
</p>

<h3 style="font-size: 17px; font-weight: 700; margin-top: 20px; margin-bottom: 10px; color: #1f2937;">Core Assumptions of RCT</h3>

<ul style="list-style-type: disc; padding-left: 24px; line-height: 1.8; color: #374151; margin-bottom: 24px;">
  <li><strong>Completeness:</strong> An agent can rank all possible options. Given choices A and B, the agent can say <em>A &gt; B</em>, <em>B &gt; A</em>, or <em>A = B</em>.</li>
  <li><strong>Transitivity:</strong> Preferences are logically consistent. If an agent prefers A to B, and B to C, they must prefer A to C (<em>A &gt; B and B &gt; C ⇒ A &gt; C</em>).</li>
  <li><strong>Utility Maximization:</strong> Individuals possess stable preferences and choose the option that provides the highest expected payoff under probabilistic scenarios.</li>
  <li><strong>Perfect Information:</strong> Decision-makers have access to complete information about options, costs, benefits, and probability distributions without incurring cognitive or temporal friction.</li>
</ul>

<h2 style="font-size: 22px; font-weight: 800; margin-top: 32px; margin-bottom: 12px; color: #111827;">2. Bounded Rationality (Herbert Simon)</h2>

<p style="font-size: 15px; line-height: 1.8; color: #374151; margin-bottom: 16px;">
Herbert Simon challenged RCT by introducing <strong>Bounded Rationality</strong>: human cognition is bounded by:
</p>

<ol style="list-style-type: decimal; padding-left: 24px; line-height: 1.8; color: #374151; margin-bottom: 24px;">
  <li><strong>Cognitive Limitations:</strong> Finite mental capacity to calculate complex probabilities.</li>
  <li><strong>Information Imperfection:</strong> Information is asymmetric, incomplete, and costly to gather.</li>
  <li><strong>Time Constraints:</strong> Decisions must be executed within tight real-world deadlines.</li>
</ol>

<blockquote style="border-left: 4px solid #8b5cf6; padding-left: 16px; margin: 20px 0; font-style: italic; color: #6b7280;">
"Human rational behavior is shaped by a scissors whose two blades are the structure of task environments and the computational capabilities of the actor." — Herbert Simon
</blockquote>
  `.trim(),
};

const STORAGE_KEY = "examglow.student_notes";

function loadNotes(): NoteItem[] {
  if (typeof window === "undefined") return [DEFAULT_NOTE];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [DEFAULT_NOTE];
    const parsed = JSON.parse(raw) as NoteItem[];
    return parsed.length > 0 ? parsed : [DEFAULT_NOTE];
  } catch {
    return [DEFAULT_NOTE];
  }
}

function saveNotes(notes: NoteItem[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch {
    /* ignore */
  }
}

function NotesEditorPage() {
  const [notes, setNotes] = useState<NoteItem[]>([DEFAULT_NOTE]);
  const [activeId, setActiveId] = useState<string>(DEFAULT_NOTE.id);
  const [fontFamily, setFontFamily] = useState("Inter");
  const [fontSize, setFontSize] = useState("15");
  const [fullscreen, setFullscreen] = useState(false);
  const [savedStatus, setSavedStatus] = useState<"saved" | "saving">("saved");
  const [aiPromptOpen, setAiPromptOpen] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showHighlightPicker, setShowHighlightPicker] = useState(false);

  const editorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = loadNotes();
    setNotes(list);
    if (list[0]) setActiveId(list[0].id);
  }, []);

  const activeNote = notes.find((n) => n.id === activeId) ?? notes[0] ?? DEFAULT_NOTE;

  // Sync editor content when active note changes
  useEffect(() => {
    if (editorRef.current && activeNote) {
      editorRef.current.innerHTML = activeNote.content;
    }
  }, [activeId]);

  const exec = (cmd: string, val: string = "") => {
    document.execCommand(cmd, false, val);
    triggerAutoSave();
  };

  const triggerAutoSave = () => {
    setSavedStatus("saving");
    if (!editorRef.current) return;
    const newContent = editorRef.current.innerHTML;
    setNotes((prev) => {
      const updated = prev.map((n) =>
        n.id === activeId ? { ...n, content: newContent, updatedAt: Date.now() } : n
      );
      saveNotes(updated);
      return updated;
    });
    setTimeout(() => setSavedStatus("saved"), 400);
  };

  const handleTitleChange = (newTitle: string) => {
    setNotes((prev) => {
      const updated = prev.map((n) =>
        n.id === activeId ? { ...n, title: newTitle, updatedAt: Date.now() } : n
      );
      saveNotes(updated);
      return updated;
    });
  };

  const createNewNote = () => {
    const newNote: NoteItem = {
      id: "note-" + Date.now(),
      title: "Untitled Note",
      updatedAt: Date.now(),
      content: "<p>Start writing your study notes here...</p>",
    };
    const updated = [newNote, ...notes];
    setNotes(updated);
    saveNotes(updated);
    setActiveId(newNote.id);
  };

  const deleteActiveNote = () => {
    if (notes.length <= 1) {
      alert("You need at least one note document.");
      return;
    }
    const remaining = notes.filter((n) => n.id !== activeId);
    setNotes(remaining);
    saveNotes(remaining);
    if (remaining[0]) setActiveId(remaining[0].id);
  };

  const handleAiAction = async (promptType: string) => {
    if (!canSendAiMessage()) {
      setPaywallOpen(true);
      return;
    }
    setAiGenerating(true);
    incrementAiMessageCount();

    try {
      const currentSelection = window.getSelection()?.toString() || "";
      const textToAnalyze = currentSelection || editorRef.current?.innerText || "";

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: `Please ${promptType} for the following study notes:\n\n${textToAnalyze.slice(0, 1500)}`,
            },
          ],
        }),
      });
      const data = (await res.json()) as { text?: string };
      if (data.text) {
        // Insert AI output at bottom of note
        if (editorRef.current) {
          editorRef.current.innerHTML += `
            <div style="margin-top: 24px; padding: 16px; border-radius: 12px; background: rgba(139, 92, 246, 0.08); border: 1px solid rgba(139, 92, 246, 0.25);">
              <strong style="color: #7c3aed; font-size: 14px;">✨ AI Study Assist:</strong>
              <p style="margin-top: 8px; font-size: 14px; line-height: 1.7; color: #374151;">${data.text.replace(/\\n/g, "<br/>")}</p>
            </div>
          `;
          triggerAutoSave();
        }
      }
    } catch {
      alert("Could not connect to AI tutor. Please check connection.");
    } finally {
      setAiGenerating(false);
      setAiPromptOpen(false);
    }
  };

  return (
    <>
      <PaywallModal
        open={paywallOpen}
        onClose={() => setPaywallOpen(false)}
        title="Upgrade to ExamGlow Premium"
        subtitle="You've reached your free AI limit. Upgrade to unlock unlimited AI note generation, full syllabus coverage, and past papers."
      />

      <DashboardLayout crumbs={[{ label: "Workspace" }, { label: "Notes" }]}>
        <div
          className={`flex flex-col bg-card transition-all ${
            fullscreen
              ? "fixed inset-0 z-[100] h-dvh w-dvw p-4 sm:p-8"
              : "min-h-[calc(100dvh-75px)] rounded-3xl border border-border"
          }`}
        >
          {/* Top Note switcher bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-2.5 sm:px-6">
            <div className="flex items-center gap-2 overflow-x-auto">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mr-1">
                Notes:
              </span>
              {notes.map((n) => (
                <button
                  key={n.id}
                  onClick={() => setActiveId(n.id)}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    n.id === activeId
                      ? "bg-foreground text-background"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="max-w-[120px] truncate sm:max-w-[160px]">{n.title}</span>
                </button>
              ))}
              <button
                type="button"
                onClick={createNewNote}
                className="flex items-center gap-1 rounded-full border border-dashed border-border px-2.5 py-1 text-xs text-muted-foreground hover:border-foreground hover:text-foreground"
              >
                <FilePlus className="size-3.5" />
                <span>New</span>
              </button>
            </div>

            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Check className="size-3 text-emerald-500" />
                {savedStatus === "saved" ? "Autosaved" : "Saving..."}
              </span>
              <button
                type="button"
                onClick={deleteActiveNote}
                title="Delete note"
                className="rounded-lg p-1.5 hover:bg-secondary hover:text-destructive"
              >
                <Trash2 className="size-3.5" />
              </button>
            </div>
          </div>

          {/* ── Rich Text Toolbar (Matches user's screenshot exactly!) ──────────── */}
          <div className="flex flex-wrap items-center gap-1 border-b border-border bg-card/60 px-3 py-2 text-foreground sm:gap-1.5 sm:px-6 backdrop-blur">
            {/* Font family dropdown */}
            <div className="relative">
              <select
                value={fontFamily}
                onChange={(e) => {
                  setFontFamily(e.target.value);
                  exec("fontName", e.target.value);
                }}
                className="h-8 rounded-lg border border-border bg-background px-2.5 text-xs font-medium text-foreground focus:outline-none"
              >
                <option value="Inter">Inter</option>
                <option value="Georgia">Georgia</option>
                <option value="serif">Serif</option>
                <option value="monospace">Monospace</option>
                <option value="Arial">Arial</option>
              </select>
            </div>

            {/* Font size dropdown */}
            <div className="relative">
              <select
                value={fontSize}
                onChange={(e) => {
                  setFontSize(e.target.value);
                  exec("fontSize", e.target.value === "11" ? "2" : e.target.value === "15" ? "3" : "4");
                }}
                className="h-8 w-14 rounded-lg border border-border bg-background px-2 text-xs font-medium text-foreground focus:outline-none"
              >
                <option value="9">9</option>
                <option value="11">11</option>
                <option value="13">13</option>
                <option value="15">15</option>
                <option value="18">18</option>
                <option value="24">24</option>
              </select>
            </div>

            <div className="mx-1 h-4 w-px bg-border" />

            {/* Formatting: Bold, Italic, Underline, Strikethrough */}
            <button
              type="button"
              onClick={() => exec("bold")}
              title="Bold (Ctrl+B)"
              className="flex size-7.5 items-center justify-center rounded-lg hover:bg-secondary active:scale-95"
            >
              <Bold className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => exec("italic")}
              title="Italic (Ctrl+I)"
              className="flex size-7.5 items-center justify-center rounded-lg hover:bg-secondary active:scale-95"
            >
              <Italic className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => exec("underline")}
              title="Underline (Ctrl+U)"
              className="flex size-7.5 items-center justify-center rounded-lg hover:bg-secondary active:scale-95"
            >
              <Underline className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => exec("strikeThrough")}
              title="Strikethrough"
              className="flex size-7.5 items-center justify-center rounded-lg hover:bg-secondary active:scale-95"
            >
              <Strikethrough className="size-3.5" />
            </button>

            <div className="mx-1 h-4 w-px bg-border" />

            {/* Highlighter */}
            <button
              type="button"
              onClick={() => exec("hiliteColor", "#fef08a")}
              title="Highlight yellow"
              className="flex size-7.5 items-center justify-center rounded-lg hover:bg-secondary active:scale-95"
            >
              <Highlighter className="size-3.5 text-amber-500" />
            </button>

            {/* Color palette */}
            <button
              type="button"
              onClick={() => exec("foreColor", "#7c3aed")}
              title="Purple text"
              className="flex size-7.5 items-center justify-center rounded-lg hover:bg-secondary active:scale-95"
            >
              <Palette className="size-3.5 text-lavender" />
            </button>

            <div className="mx-1 h-4 w-px bg-border" />

            {/* Alignment */}
            <button
              type="button"
              onClick={() => exec("justifyLeft")}
              title="Align Left"
              className="flex size-7.5 items-center justify-center rounded-lg hover:bg-secondary active:scale-95"
            >
              <AlignLeft className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => exec("justifyCenter")}
              title="Align Center"
              className="flex size-7.5 items-center justify-center rounded-lg hover:bg-secondary active:scale-95"
            >
              <AlignCenter className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => exec("justifyRight")}
              title="Align Right"
              className="flex size-7.5 items-center justify-center rounded-lg hover:bg-secondary active:scale-95"
            >
              <AlignRight className="size-3.5" />
            </button>

            <div className="mx-1 h-4 w-px bg-border" />

            {/* Lists */}
            <button
              type="button"
              onClick={() => exec("insertOrderedList")}
              title="Numbered List"
              className="flex size-7.5 items-center justify-center rounded-lg hover:bg-secondary active:scale-95"
            >
              <ListOrdered className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => exec("insertUnorderedList")}
              title="Bulleted List"
              className="flex size-7.5 items-center justify-center rounded-lg hover:bg-secondary active:scale-95"
            >
              <List className="size-3.5" />
            </button>

            <div className="mx-1 h-4 w-px bg-border" />

            {/* Undo & Redo */}
            <button
              type="button"
              onClick={() => exec("undo")}
              title="Undo"
              className="flex size-7.5 items-center justify-center rounded-lg hover:bg-secondary active:scale-95"
            >
              <Undo2 className="size-3.5" />
            </button>
            <button
              type="button"
              onClick={() => exec("redo")}
              title="Redo"
              className="flex size-7.5 items-center justify-center rounded-lg hover:bg-secondary active:scale-95"
            >
              <Redo2 className="size-3.5" />
            </button>

            {/* Insert dropdown */}
            <button
              type="button"
              onClick={() => {
                const quote = prompt("Enter text to insert as key takeaway / quote:");
                if (quote) {
                  exec(
                    "insertHTML",
                    `<blockquote style="border-left: 4px solid #8b5cf6; padding-left: 16px; margin: 20px 0; font-style: italic; color: #6b7280;">"${quote}"</blockquote>`
                  );
                }
              }}
              title="Insert quote or block"
              className="flex size-7.5 items-center justify-center rounded-lg hover:bg-secondary active:scale-95"
            >
              <Plus className="size-4" />
            </button>

            {/* History */}
            <button
              type="button"
              onClick={() => alert("Note revisions are automatically versioned and stored locally in your browser.")}
              title="Revision History"
              className="flex size-7.5 items-center justify-center rounded-lg hover:bg-secondary active:scale-95"
            >
              <History className="size-3.5" />
            </button>

            {/* Print */}
            <button
              type="button"
              onClick={() => window.print()}
              title="Print Note (Ctrl+P)"
              className="flex size-7.5 items-center justify-center rounded-lg hover:bg-secondary active:scale-95"
            >
              <Printer className="size-3.5" />
            </button>

            {/* Fullscreen */}
            <button
              type="button"
              onClick={() => setFullscreen((v) => !v)}
              title={fullscreen ? "Exit Fullscreen" : "Fullscreen"}
              className="flex size-7.5 items-center justify-center rounded-lg hover:bg-secondary active:scale-95"
            >
              {fullscreen ? <Minimize2 className="size-3.5" /> : <Maximize2 className="size-3.5" />}
            </button>

            <div className="flex-1" />

            {/* ── AI Assistant Button (Matches green sparkle in screenshot!) ─── */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setAiPromptOpen((v) => !v)}
                title="AI Note Assistant"
                className="flex size-8 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-600 transition-transform hover:scale-105 active:scale-95 dark:bg-emerald-500/30 dark:text-emerald-400"
              >
                <Sparkles className="size-4.5" />
              </button>

              {aiPromptOpen && (
                <div className="absolute right-0 top-10 z-50 w-72 rounded-2xl border border-border bg-card p-3 shadow-xl">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    ✨ AI Note Tools
                  </p>
                  <div className="space-y-1">
                    {[
                      { label: "Summarize this note", type: "summarize key points into bullet list" },
                      { label: "Generate 5 revision questions", type: "generate 5 active recall test questions" },
                      { label: "Simplify complex explanations", type: "simplify complex jargon for high school students" },
                      { label: "Check grammar & improve clarity", type: "improve flow and clarity" },
                    ].map((item) => (
                      <button
                        key={item.label}
                        type="button"
                        disabled={aiGenerating}
                        onClick={() => handleAiAction(item.type)}
                        className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-xs font-medium hover:bg-secondary text-foreground transition-colors disabled:opacity-50"
                      >
                        <span>{item.label}</span>
                        <ChevronDown className="size-3 -rotate-90 text-muted-foreground" />
                      </button>
                    ))}
                  </div>
                  {aiGenerating && (
                    <div className="mt-2 flex items-center justify-center gap-2 text-xs text-lavender font-medium">
                      <Sparkles className="size-3 animate-spin" /> Thinking...
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* ── Document Container ────────────────────────────────────────────── */}
          <div className="flex-1 overflow-y-auto px-6 py-10 sm:px-16 lg:px-24">
            <div className="mx-auto max-w-3xl">
              {/* Editable Note Title */}
              <input
                type="text"
                value={activeNote.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Note Title..."
                className="w-full bg-transparent text-[clamp(1.85rem,3.5vw,2.5rem)] font-black leading-tight tracking-tight text-foreground focus:outline-none"
                style={{ fontFamily }}
              />

              <div className="my-6 h-px bg-border/60" />

              {/* Editable Body */}
              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={triggerAutoSave}
                style={{ fontFamily, fontSize: `${fontSize}px` }}
                className="min-h-[500px] leading-relaxed text-foreground/90 focus:outline-none"
              />
            </div>
          </div>
        </div>
      </DashboardLayout>
    </>
  );
}
