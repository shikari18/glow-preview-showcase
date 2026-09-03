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
  Bot,
  FilePlus,
  Trash2,
  ChevronDown,
  Check,
  FolderOpen,
  X,
  Search,
  Calendar,
} from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-page";
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
  id: "note-1",
  title: "Untitled Note",
  updatedAt: Date.now(),
  content: "",
};

const STORAGE_KEY = "examglow.student_notes";

function loadNotes(): NoteItem[] {
  if (typeof window === "undefined") return [DEFAULT_NOTE];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [DEFAULT_NOTE];
    const parsed = JSON.parse(raw) as NoteItem[];
    const filtered = parsed.filter(
      (n) =>
        !n.title.toLowerCase().includes("behavioral economics") &&
        !n.title.toLowerCase().includes("rational choice")
    );
    return filtered.length > 0 ? filtered : [DEFAULT_NOTE];
  } catch {
    return [DEFAULT_NOTE];
  }
}

function saveNotes(notes: NoteItem[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  } catch {
    /* storage unavailable */
  }
}

function NotesEditorPage() {
  const [notes, setNotes] = useState<NoteItem[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [fontFamily, setFontFamily] = useState("Inter, sans-serif");
  const [fontSize, setFontSize] = useState("15");
  const [fullscreen, setFullscreen] = useState(false);
  const [savedStatus, setSavedStatus] = useState<"saved" | "saving">("saved");
  const [aiPromptOpen, setAiPromptOpen] = useState(false);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [savedDrawerOpen, setSavedDrawerOpen] = useState(false);
  const [searchNotes, setSearchNotes] = useState("");

  const editorRef = useRef<HTMLDivElement>(null);
  const saveTimeoutRef = useRef<any>(null);

  // Initialize from localStorage
  useEffect(() => {
    const loaded = loadNotes();
    setNotes(loaded);
    setActiveId(loaded[0]?.id || DEFAULT_NOTE.id);
  }, []);

  const activeNote = notes.find((n) => n.id === activeId) || notes[0] || DEFAULT_NOTE;

  // Sync editor content when active note changes
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = activeNote.content || "";
    }
  }, [activeId]);

  const exec = (command: string, value: string | undefined = undefined) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    triggerAutoSave();
  };

  const triggerAutoSave = () => {
    setSavedStatus("saving");
    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    saveTimeoutRef.current = setTimeout(() => {
      if (!editorRef.current) return;
      const html = editorRef.current.innerHTML;
      setNotes((prev) => {
        const next = prev.map((n) =>
          n.id === activeId ? { ...n, content: html, updatedAt: Date.now() } : n
        );
        saveNotes(next);
        return next;
      });
      setSavedStatus("saved");
    }, 600);
  };

  const handleTitleChange = (newTitle: string) => {
    setNotes((prev) => {
      const next = prev.map((n) =>
        n.id === activeId ? { ...n, title: newTitle, updatedAt: Date.now() } : n
      );
      saveNotes(next);
      return next;
    });
  };

  const createNewNote = () => {
    const newNote: NoteItem = {
      id: `note-${Date.now()}`,
      title: "Untitled Note",
      updatedAt: Date.now(),
      content: "",
    };
    const next = [newNote, ...notes];
    setNotes(next);
    setActiveId(newNote.id);
    saveNotes(next);
  };

  const deleteActiveNote = (idToDelete?: string) => {
    const targetId = idToDelete || activeId;
    if (notes.length <= 1) {
      const fresh = [DEFAULT_NOTE];
      setNotes(fresh);
      setActiveId(DEFAULT_NOTE.id);
      saveNotes(fresh);
      return;
    }
    const next = notes.filter((n) => n.id !== targetId);
    setNotes(next);
    if (targetId === activeId) {
      setActiveId(next[0]!.id);
    }
    saveNotes(next);
  };

  const handleAiAction = async (promptType: string) => {
    if (!editorRef.current) return;
    const text = editorRef.current.innerText.trim();
    if (!text) {
      alert("Please write some notes first so the AI can analyze them!");
      return;
    }

    setAiGenerating(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          messages: [
            {
              role: "user",
              content: `Based on my notes below, please ${promptType}:\n\n${text.slice(0, 3000)}`,
            },
          ],
        }),
      });
      const data = (await res.json()) as { text?: string };
      if (data.text) {
        if (editorRef.current) {
          editorRef.current.innerHTML += `
            <div style="margin-top: 24px; padding: 16px; border-radius: 12px; background: rgba(139, 92, 246, 0.08); border: 1px solid rgba(139, 92, 246, 0.25);">
              <strong style="color: #7c3aed; font-size: 14px;">Study AI Assist:</strong>
              <p style="margin-top: 8px; font-size: 14px; line-height: 1.7; color: #374151;">${data.text.replace(/\n/g, "<br/>")}</p>
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

  const filteredNotes = notes.filter((n) =>
    n.title.toLowerCase().includes(searchNotes.toLowerCase())
  );

  return (
    <>
      <DashboardLayout>
        <div
          className={`flex flex-col bg-card transition-all ${
            fullscreen
              ? "fixed inset-0 z-[100] h-dvh w-dvw p-4 sm:p-8 overflow-hidden"
              : "min-h-[calc(100dvh-75px)] rounded-3xl border border-border"
          }`}
        >
          {/* Top Note switcher bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border px-4 py-2.5 sm:px-6 bg-card">
            {/* Left: Saved notes & note switcher */}
            <div className="flex items-center gap-2 overflow-x-auto">
              {/* Big obvious Saved Notes button */}
              <button
                type="button"
                onClick={() => setSavedDrawerOpen(true)}
                className="flex items-center gap-1.5 rounded-full border border-border bg-secondary/80 px-3.5 py-1.5 text-xs font-semibold text-foreground hover:bg-secondary transition-colors"
              >
                <FolderOpen className="size-4 text-muted-foreground" />
                <span>Saved Notes ({notes.length})</span>
              </button>

              <div className="h-4 w-px bg-border mx-1" />

              {notes.slice(0, 4).map((n) => (
                <button
                  key={n.id}
                  onClick={() => setActiveId(n.id)}
                  className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    n.id === activeId
                      ? "bg-foreground text-background"
                      : "bg-secondary text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span className="max-w-[120px] truncate sm:max-w-[150px]">{n.title || "Untitled"}</span>
                </button>
              ))}

              <button
                type="button"
                onClick={createNewNote}
                className="flex items-center gap-1 rounded-full border border-dashed border-border px-3 py-1 text-xs font-medium text-muted-foreground hover:border-foreground hover:text-foreground"
              >
                <FilePlus className="size-3.5" />
                <span>New</span>
              </button>
            </div>

            {/* Right: Autosave status + Big Obvious Fullscreen button */}
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Check className="size-3 text-emerald-500" />
                {savedStatus === "saved" ? "Autosaved" : "Saving..."}
              </span>

              {/* Big Obvious Fullscreen Button */}
              <button
                type="button"
                onClick={() => setFullscreen((v) => !v)}
                className="flex items-center gap-2 rounded-full bg-foreground px-4 py-1.5 text-xs font-semibold text-background shadow-sm transition-transform hover:scale-105 active:scale-95"
              >
                {fullscreen ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
                <span>{fullscreen ? "Exit Fullscreen" : "Fullscreen"}</span>
              </button>
            </div>
          </div>

          {/* ── Toolbar ─────────────────────────────────────────────────────────── */}
          <div className="flex flex-wrap items-center gap-1 border-b border-border bg-secondary/30 px-3 py-1.5 text-foreground sm:px-6">
            {/* Font Family */}
            <select
              value={fontFamily}
              onChange={(e) => setFontFamily(e.target.value)}
              className="rounded-lg border border-border bg-card px-2 py-1 text-xs font-medium focus:outline-none"
            >
              <option value="Inter, sans-serif">Inter (Sans)</option>
              <option value="Georgia, serif">Georgia (Serif)</option>
              <option value="'Playfair Display', serif">Playfair (Display)</option>
              <option value="'Courier New', monospace">Monospace</option>
              <option value="Arial, sans-serif">Arial</option>
            </select>

            {/* Font Size */}
            <select
              value={fontSize}
              onChange={(e) => setFontSize(e.target.value)}
              className="rounded-lg border border-border bg-card px-2 py-1 text-xs font-medium focus:outline-none"
            >
              <option value="12">12</option>
              <option value="14">14</option>
              <option value="15">15</option>
              <option value="18">18</option>
              <option value="22">22</option>
              <option value="26">26</option>
            </select>

            <div className="mx-1 h-4 w-px bg-border" />

            {/* Bold, Italic, Underline, Strike */}
            <button type="button" onClick={() => exec("bold")} className="flex size-7.5 items-center justify-center rounded-lg hover:bg-secondary">
              <Bold className="size-3.5" />
            </button>
            <button type="button" onClick={() => exec("italic")} className="flex size-7.5 items-center justify-center rounded-lg hover:bg-secondary">
              <Italic className="size-3.5" />
            </button>
            <button type="button" onClick={() => exec("underline")} className="flex size-7.5 items-center justify-center rounded-lg hover:bg-secondary">
              <Underline className="size-3.5" />
            </button>
            <button type="button" onClick={() => exec("strikeThrough")} className="flex size-7.5 items-center justify-center rounded-lg hover:bg-secondary">
              <Strikethrough className="size-3.5" />
            </button>

            <div className="mx-1 h-4 w-px bg-border" />

            {/* Highlight & Text color */}
            <button type="button" onClick={() => exec("hiliteColor", "#fef08a")} className="flex size-7.5 items-center justify-center rounded-lg hover:bg-secondary text-amber-500">
              <Highlighter className="size-3.5" />
            </button>
            <button type="button" onClick={() => exec("foreColor", "#7c3aed")} className="flex size-7.5 items-center justify-center rounded-lg hover:bg-secondary text-purple-600">
              <Palette className="size-3.5" />
            </button>

            <div className="mx-1 h-4 w-px bg-border" />

            {/* Alignment */}
            <button type="button" onClick={() => exec("justifyLeft")} className="flex size-7.5 items-center justify-center rounded-lg hover:bg-secondary">
              <AlignLeft className="size-3.5" />
            </button>
            <button type="button" onClick={() => exec("justifyCenter")} className="flex size-7.5 items-center justify-center rounded-lg hover:bg-secondary">
              <AlignCenter className="size-3.5" />
            </button>
            <button type="button" onClick={() => exec("justifyRight")} className="flex size-7.5 items-center justify-center rounded-lg hover:bg-secondary">
              <AlignRight className="size-3.5" />
            </button>

            <div className="mx-1 h-4 w-px bg-border" />

            {/* Lists */}
            <button type="button" onClick={() => exec("insertUnorderedList")} className="flex size-7.5 items-center justify-center rounded-lg hover:bg-secondary">
              <List className="size-3.5" />
            </button>
            <button type="button" onClick={() => exec("insertOrderedList")} className="flex size-7.5 items-center justify-center rounded-lg hover:bg-secondary">
              <ListOrdered className="size-3.5" />
            </button>

            <div className="mx-1 h-4 w-px bg-border" />

            {/* Undo / Redo */}
            <button type="button" onClick={() => exec("undo")} className="flex size-7.5 items-center justify-center rounded-lg hover:bg-secondary">
              <Undo2 className="size-3.5" />
            </button>
            <button type="button" onClick={() => exec("redo")} className="flex size-7.5 items-center justify-center rounded-lg hover:bg-secondary">
              <Redo2 className="size-3.5" />
            </button>

            <div className="mx-1 h-4 w-px bg-border" />

            {/* Print */}
            <button type="button" onClick={() => window.print()} title="Print Note" className="flex size-7.5 items-center justify-center rounded-lg hover:bg-secondary">
              <Printer className="size-3.5" />
            </button>

            <div className="flex-1" />

            {/* AI Assistant Button */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setAiPromptOpen((v) => !v)}
                className="flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-foreground hover:bg-secondary/80 transition-colors"
              >
                <Bot className="size-3.5 text-lavender" />
                <span>AI Note Assist</span>
              </button>

              {aiPromptOpen && (
                <div className="absolute right-0 top-9 z-50 w-72 rounded-2xl border border-border bg-card p-3 shadow-xl">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                    AI Study Tools
                  </p>
                  <div className="space-y-1">
                    {[
                      { label: "Summarize this note", type: "summarize key points into bullet list" },
                      { label: "Generate 5 revision questions", type: "generate 5 active recall test questions" },
                      { label: "Simplify complex explanations", type: "simplify complex jargon for students" },
                      { label: "Check grammar & clarity", type: "improve flow and clarity" },
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
                      Thinking...
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
                data-placeholder="Start typing your revision notes here..."
                style={{ fontFamily, fontSize: `${fontSize}px` }}
                className="min-h-[500px] leading-relaxed text-foreground/90 focus:outline-none empty:before:content-[attr(data-placeholder)] empty:before:text-muted-foreground/40 empty:before:pointer-events-none"
              />
            </div>
          </div>
        </div>

        {/* ── Saved Notes Slide-over Drawer ─────────────────────────────────── */}
        {savedDrawerOpen && (
          <div className="fixed inset-0 z-[110] flex justify-end">
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setSavedDrawerOpen(false)} />
            <div className="relative w-full max-w-md h-full bg-card border-l border-border p-6 shadow-2xl flex flex-col">
              <div className="flex items-center justify-between border-b border-border pb-4">
                <div className="flex items-center gap-2">
                  <FolderOpen className="size-5 text-lavender" />
                  <h2 className="text-lg font-bold text-foreground">My Saved Notes</h2>
                </div>
                <button
                  type="button"
                  onClick={() => setSavedDrawerOpen(false)}
                  className="rounded-full p-1.5 hover:bg-secondary text-muted-foreground hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              </div>

              {/* Search bar inside drawer */}
              <div className="relative mt-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-3.5 text-muted-foreground" />
                <input
                  type="search"
                  value={searchNotes}
                  onChange={(e) => setSearchNotes(e.target.value)}
                  placeholder="Search saved notes..."
                  className="w-full rounded-xl border border-border bg-secondary/50 py-2 pl-9 pr-3 text-xs outline-none focus:border-lavender"
                />
              </div>

              {/* Notes list */}
              <div className="flex-1 overflow-y-auto mt-4 space-y-2">
                {filteredNotes.length === 0 ? (
                  <p className="text-xs text-muted-foreground text-center py-8">No saved notes found.</p>
                ) : (
                  filteredNotes.map((n) => {
                    const isSelected = n.id === activeId;
                    return (
                      <div
                        key={n.id}
                        className={`group flex items-start justify-between rounded-2xl border p-3 transition-all cursor-pointer ${
                          isSelected
                            ? "border-foreground bg-secondary/80"
                            : "border-border bg-card hover:bg-secondary/40"
                        }`}
                        onClick={() => {
                          setActiveId(n.id);
                          setSavedDrawerOpen(false);
                        }}
                      >
                        <div className="min-w-0 flex-1 pr-2">
                          <p className="truncate text-sm font-semibold text-foreground">
                            {n.title || "Untitled Note"}
                          </p>
                          <p className="mt-1 text-[11px] text-muted-foreground flex items-center gap-1">
                            <Calendar className="size-3" />
                            <span>{new Date(n.updatedAt).toLocaleDateString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}</span>
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteActiveNote(n.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 rounded-lg p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-opacity"
                        >
                          <Trash2 className="size-3.5" />
                        </button>
                      </div>
                    );
                  })
                )}
              </div>

              <div className="border-t border-border pt-4">
                <button
                  type="button"
                  onClick={() => {
                    createNewNote();
                    setSavedDrawerOpen(false);
                  }}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-foreground py-2.5 text-xs font-semibold text-background shadow-md hover:opacity-90"
                >
                  <FilePlus className="size-4" />
                  <span>Create New Note</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </DashboardLayout>
    </>
  );
}
