import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  ListChecks,
  Layers,
  X,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  Plus,
  FileText,
  Image as ImageIcon,
  FileUp,
  Paperclip,
  History,
  PhoneOff,
  ArrowUp,
  Trash2,
  Clock,
  MessageSquare,
  ChevronRight,
  Loader2,
} from "lucide-react";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import { Shimmer } from "@/components/ai-elements/shimmer";
import logoMark from "@/assets/logo-mark.png";
import { callGemini } from "@/lib/ai-router";

type ChatMessage = { role: "user" | "assistant"; content: string };

type UploadedAttachment = {
  name: string;
  type: "pdf" | "image" | "doc";
  content?: string;
};

type ChatSession = {
  id: string;
  title: string;
  updatedAt: number;
  messages: ChatMessage[];
};

const CHAT_STORAGE_KEY = "examglow.chat_sessions";
const ACTIVE_SESSION_KEY = "examglow.active_chat_id";

const suggestions = [
  { label: "Explain photosynthesis step-by-step", Icon: BookOpen },
  { label: "Quiz me on quadratic equations", Icon: ListChecks },
  { label: "How do electric circuits work?", Icon: Layers },
] as const;

// Helper to strip emojis from speech text so speech synthesizer never speaks emoji descriptions
function cleanSpeechText(text: string): string {
  return text
    .replace(
      /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{FE00}-\u{FE0F}\u{1F1E6}-\u{1F1FF}]/gu,
      "",
    )
    .replace(/[*_#`$]/g, "")
    .replace(/\[.*?\]/g, "")
    .replace(/https?:\/\/\S+/g, "")
    .slice(0, 800);
}

export function StudyChat({ className = "", onClose }: { className?: string; onClose?: () => void }) {
  const [sessions, setSessions] = useState<ChatSession[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = localStorage.getItem(CHAT_STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  const [currentSessionId, setCurrentSessionId] = useState<string>(() => {
    if (typeof window === "undefined") return "initial";
    return localStorage.getItem(ACTIVE_SESSION_KEY) || `chat-${Date.now()}`;
  });

  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"ready" | "submitted">("ready");
  const [error, setError] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  // Speech-to-Speech Hands-Free Voice Mode
  const [voiceMode, setVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState("");

  // Upload dropdown
  const [uploadOpen, setUploadOpen] = useState(false);
  const [attachment, setAttachment] = useState<UploadedAttachment | null>(null);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const imgInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Load session messages on mount or session switch
  useEffect(() => {
    const existing = sessions.find((s) => s.id === currentSessionId);
    if (existing) {
      setMessages(existing.messages);
    } else {
      setMessages([]);
    }
  }, [currentSessionId]);

  // Save active session to localStorage whenever messages change
  useEffect(() => {
    if (messages.length === 0) return;

    setSessions((prev) => {
      const existingIdx = prev.findIndex((s) => s.id === currentSessionId);
      const title =
        existingIdx >= 0 && prev[existingIdx]!.title !== "New Chat"
          ? prev[existingIdx]!.title
          : messages[0]?.content?.slice(0, 36) || "Study Session";

      const updatedSession: ChatSession = {
        id: currentSessionId,
        title,
        updatedAt: Date.now(),
        messages,
      };

      let next: ChatSession[];
      if (existingIdx >= 0) {
        next = [...prev];
        next[existingIdx] = updatedSession;
      } else {
        next = [updatedSession, ...prev];
      }

      try {
        localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(next));
        localStorage.setItem(ACTIVE_SESSION_KEY, currentSessionId);
      } catch {}

      return next;
    });
  }, [messages, currentSessionId]);

  // Initialize Web Speech Recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      const SpeechRecognition =
        (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      if (SpeechRecognition) {
        const reco = new SpeechRecognition();
        reco.continuous = false;
        reco.interimResults = true;
        reco.lang = "en-US";

        reco.onresult = (event: any) => {
          let interim = "";
          for (let i = event.resultIndex; i < event.results.length; ++i) {
            interim += event.results[i][0].transcript;
          }
          setVoiceTranscript(interim);
        };

        // When user stops speaking, automatically send to AI hands-free!
        reco.onspeechend = () => {
          if (voiceTranscript.trim().length > 1) {
            void handleHandsFreeSubmit(voiceTranscript.trim());
          }
        };

        reco.onerror = () => {
          setIsListening(false);
        };

        reco.onend = () => {
          setIsListening(false);
          // If still in voice mode and not muted and not speaking, auto-resume listening
          if (voiceMode && !isMuted && !isSpeaking) {
            setTimeout(() => {
              if (voiceMode && !isSpeaking) startListening();
            }, 300);
          }
        };

        recognitionRef.current = reco;
      }
    }
  }, [voiceMode, isMuted, isSpeaking, voiceTranscript]);

  function speakResponse(text: string) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();

    const clean = cleanSpeechText(text);
    if (!clean.trim()) return;

    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.rate = 1.1; // natural, brisk, engaging tutor pace
    utterance.pitch = 1.05;

    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      (v) =>
        v.name.includes("Natural") ||
        v.name.includes("Libby") ||
        v.name.includes("Samantha") ||
        v.name.includes("Google UK English Female") ||
        (v.lang.startsWith("en") && v.name.toLowerCase().includes("female")),
    );
    if (preferredVoice) utterance.voice = preferredVoice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => {
      setIsSpeaking(false);
      if (voiceMode && !isMuted) {
        startListening();
      }
    };
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }

  function startListening() {
    if (recognitionRef.current && !isListening && !isMuted) {
      try {
        setVoiceTranscript("");
        recognitionRef.current.start();
        setIsListening(true);
      } catch {}
    }
  }

  function stopListening() {
    if (recognitionRef.current && isListening) {
      try {
        recognitionRef.current.stop();
      } catch {}
      setIsListening(false);
    }
  }

  function endVoiceCall() {
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    stopListening();
    setIsSpeaking(false);
    setVoiceMode(false);
    setVoiceTranscript("");
  }

  async function handleHandsFreeSubmit(text: string) {
    if (!text.trim() || status === "submitted") return;
    stopListening();
    setVoiceTranscript("");
    await send(text, true);
  }

  async function send(text: string, speakBack = false) {
    const trimmed = text.trim();
    if (!trimmed || status === "submitted") return;

    let fullPrompt = trimmed;
    if (attachment) {
      fullPrompt = `[Attached ${attachment.type.toUpperCase()}: "${attachment.name}"]\n${
        attachment.content ? `File Content Preview:\n${attachment.content}\n\n` : ""
      }${trimmed}`;
    }

    const next: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setAttachment(null);
    setError(null);
    setStatus("submitted");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: [...messages, { role: "user", content: fullPrompt }] }),
      });
      const data = (await res.json()) as { text?: string; error?: string };
      let replyText = data.text;

      // Fallback: If network or serverless worker returned null, call Gemini API directly in-browser!
      if (!replyText || replyText.includes("restate or ask your question again")) {
        const clientRes = await callGemini([...messages, { role: "user", content: fullPrompt }]);
        if (clientRes?.text) {
          replyText = clientRes.text;
        }
      }

      if (!replyText) {
        setError("Yumna is taking a moment to reply. Please try again.");
      } else {
        setMessages([...next, { role: "assistant", content: replyText }]);
        if (speakBack || voiceMode) {
          speakResponse(replyText);
        }
      }
    } catch {
      // Direct browser fallback if /api/chat network failed
      try {
        const directRes = await callGemini([...messages, { role: "user", content: fullPrompt }]);
        if (directRes?.text) {
          setMessages([...next, { role: "assistant", content: directRes.text }]);
          if (speakBack || voiceMode) speakResponse(directRes.text);
        } else {
          setError("Network error — check your connection and try again.");
        }
      } catch {
        setError("Network error — check your connection and try again.");
      }
    } finally {
      setStatus("ready");
      if (!voiceMode) inputRef.current?.focus();
    }
  }

  function handleNewChat() {
    const newId = `chat-${Date.now()}`;
    setCurrentSessionId(newId);
    setMessages([]);
    setInput("");
    setAttachment(null);
    setError(null);
    setShowHistory(false);
    if (typeof window !== "undefined") {
      localStorage.setItem(ACTIVE_SESSION_KEY, newId);
    }
  }

  function handleSelectSession(s: ChatSession) {
    setCurrentSessionId(s.id);
    setMessages(s.messages);
    setShowHistory(false);
    if (typeof window !== "undefined") {
      localStorage.setItem(ACTIVE_SESSION_KEY, s.id);
    }
  }

  function handleDeleteSession(id: string, e: React.MouseEvent) {
    e.stopPropagation();
    const updated = sessions.filter((s) => s.id !== id);
    setSessions(updated);
    try {
      localStorage.setItem(CHAT_STORAGE_KEY, JSON.stringify(updated));
    } catch {}
    if (currentSessionId === id) {
      handleNewChat();
    }
  }

  // Handle file uploads
  async function handleFileUpload(file: File, type: "pdf" | "image" | "doc") {
    setUploadOpen(false);
    if (file.size > 8_000_000) {
      setError("File is too large. Please upload files under 8MB.");
      return;
    }

    let contentPreview = "";
    if (type === "doc") {
      try {
        const text = await file.text();
        contentPreview = text.slice(0, 3000);
      } catch {}
    }

    setAttachment({
      name: file.name,
      type,
      content: contentPreview,
    });
  }

  return (
    <div className={`relative flex h-full w-full flex-col bg-background ${className}`}>
      {/* Hidden file inputs */}
      <input
        ref={pdfInputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleFileUpload(file, "pdf");
        }}
      />
      <input
        ref={imgInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleFileUpload(file, "image");
        }}
      />
      <input
        ref={docInputRef}
        type="file"
        accept=".txt,.md,.doc,.docx"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) void handleFileUpload(file, "doc");
        }}
      />

      {/* Top Header Bar with New Chat & History */}
      <div className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-card/80 px-4 backdrop-blur z-20">
        <div className="flex items-center gap-2">
          {/* New Chat Button */}
          <button
            type="button"
            onClick={handleNewChat}
            className="flex items-center gap-1.5 rounded-full bg-primary/10 hover:bg-primary/20 text-primary px-3 py-1.5 text-xs font-bold transition-colors shadow-sm"
          >
            <Plus className="size-3.5" />
            <span>New Chat</span>
          </button>

          {/* History Button */}
          <button
            type="button"
            onClick={() => setShowHistory((v) => !v)}
            className={`flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium transition-colors ${
              showHistory ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground hover:bg-secondary/60"
            }`}
          >
            <History className="size-3.5" />
            <span>History</span>
            {sessions.length > 0 && (
              <span className="rounded-full bg-surface px-1.5 py-0.2 text-[10px] font-bold">
                {sessions.length}
              </span>
            )}
          </button>
        </div>

        {/* Center: Persona identity */}
        <div className="flex items-center gap-2">
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
          </span>
          <span className="text-sm font-bold text-foreground">Yumna</span>
          <span className="text-xs text-muted-foreground hidden sm:inline">· AI Study Tutor</span>
        </div>

        {/* Right side: Voice Call launcher & close */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              setVoiceMode(true);
              startListening();
            }}
            className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 px-3 py-1.5 text-xs font-bold transition-colors"
          >
            <Mic className="size-3.5" />
            <span className="hidden sm:inline">Voice Call</span>
          </button>
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="flex size-8 items-center justify-center rounded-full hover:bg-secondary text-muted-foreground"
            >
              <X className="size-4" />
            </button>
          )}
        </div>
      </div>

      {/* History Slide-Over Drawer */}
      {showHistory && (
        <div className="absolute inset-y-14 left-0 w-80 max-w-full bg-card/95 backdrop-blur-md border-r border-border shadow-2xl z-30 flex flex-col animate-in slide-in-from-left duration-200">
          <div className="flex items-center justify-between p-4 border-b border-border">
            <div className="flex items-center gap-2">
              <History className="size-4 text-primary" />
              <h3 className="font-bold text-sm text-foreground">Chat History</h3>
            </div>
            <button
              type="button"
              onClick={() => setShowHistory(false)}
              className="size-7 flex items-center justify-center rounded-full hover:bg-secondary text-muted-foreground"
            >
              <X className="size-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-3 space-y-1.5">
            {sessions.length === 0 ? (
              <div className="py-12 text-center text-xs text-muted-foreground">
                <MessageSquare className="size-8 mx-auto mb-2 opacity-30" />
                No past conversations yet.
              </div>
            ) : (
              sessions.map((s) => {
                const isActive = s.id === currentSessionId;
                return (
                  <div
                    key={s.id}
                    onClick={() => handleSelectSession(s)}
                    className={`group flex items-center justify-between gap-2 rounded-xl p-3 text-left transition-all cursor-pointer ${
                      isActive ? "bg-primary/10 text-primary border border-primary/20 font-bold" : "hover:bg-secondary text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-xs truncate font-medium">{s.title}</p>
                      <p className="text-[10px] opacity-70 mt-0.5">
                        {new Date(s.updatedAt).toLocaleDateString([], { month: "short", day: "numeric" })} · {s.messages.length} msgs
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => handleDeleteSession(s.id, e)}
                      className="size-6 shrink-0 flex items-center justify-center rounded hover:bg-destructive/10 hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}

      {/* Voice Mode Screen: Pure Speech-to-Speech (NO SEND BUTTON) */}
      {voiceMode && (
        <div className="absolute inset-0 z-40 flex flex-col items-center justify-between bg-zinc-950 text-white p-6 sm:p-12 animate-in fade-in">
          {/* Header */}
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-semibold text-zinc-400">Live Speech Call with Yumna</span>
            </div>
            <button
              type="button"
              onClick={endVoiceCall}
              className="rounded-full bg-zinc-800 p-2 text-zinc-400 hover:text-white"
            >
              <X className="size-5" />
            </button>
          </div>

          {/* Central Animated Orb */}
          <div className="flex flex-col items-center justify-center text-center my-auto">
            <div className="relative flex size-36 sm:size-48 items-center justify-center">
              {/* Outer pulsing ring */}
              <div
                className={`absolute inset-0 rounded-full bg-emerald-500/20 blur-xl transition-all duration-300 ${
                  isSpeaking ? "scale-125 opacity-80" : isListening ? "scale-110 opacity-50" : "scale-100 opacity-20"
                }`}
              />
              {/* Inner animated circle */}
              <div
                className={`size-28 sm:size-36 rounded-full bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-400 shadow-2xl flex items-center justify-center transition-transform duration-200 ${
                  isSpeaking ? "scale-110 animate-pulse" : isListening ? "scale-105" : "scale-100"
                }`}
              >
                {isSpeaking ? (
                  <Volume2 className="size-10 sm:size-12 text-white animate-bounce" />
                ) : (
                  <Mic className="size-10 sm:size-12 text-white" />
                )}
              </div>
            </div>

            <p className="mt-8 text-lg font-bold text-white">
              {isSpeaking
                ? "Yumna is speaking..."
                : isListening
                  ? "Listening to you..."
                  : isMuted
                    ? "Microphone Muted"
                    : "Connecting..."}
            </p>

            <p className="mt-2 max-w-md text-xs sm:text-sm text-zinc-400 min-h-[3rem] px-4">
              {voiceTranscript || (isListening ? "Speak naturally. Yumna will answer your question immediately." : "")}
            </p>
          </div>

          {/* Controls: Mute & End Call */}
          <div className="flex items-center gap-6 mb-4">
            {/* Mute Button */}
            <button
              type="button"
              onClick={() => {
                if (isMuted) {
                  setIsMuted(false);
                  startListening();
                } else {
                  setIsMuted(true);
                  stopListening();
                }
              }}
              className={`flex size-14 items-center justify-center rounded-full border transition-all ${
                isMuted
                  ? "border-amber-500 bg-amber-500/20 text-amber-400"
                  : "border-zinc-700 bg-zinc-800 text-zinc-200 hover:bg-zinc-700"
              }`}
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <MicOff className="size-6" /> : <Mic className="size-6" />}
            </button>

            {/* End Call Button */}
            <button
              type="button"
              onClick={endVoiceCall}
              className="flex size-16 items-center justify-center rounded-full bg-rose-600 text-white shadow-xl hover:bg-rose-700 transition-all hover:scale-105"
              title="End Voice Call"
            >
              <PhoneOff className="size-7" />
            </button>
          </div>
        </div>
      )}

      {/* Main Conversation Messages */}
      <Conversation className="flex-1 overflow-y-auto">
        <ConversationContent className="mx-auto max-w-3xl space-y-4 px-4 py-6">
          {messages.length === 0 ? (
            <div className="flex h-full min-h-[50vh] flex-col items-center justify-center text-center">
              <div className="relative mb-5 flex size-16 items-center justify-center rounded-3xl bg-gradient-to-tr from-lavender via-lilac to-mint shadow-md">
                <img src={logoMark} alt="" className="size-10 object-contain" />
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground">
                Hi, I'm Yumna!
              </h2>
              <p className="mt-2 max-w-md text-sm text-muted-foreground leading-relaxed">
                Your dedicated Cambridge IGCSE study tutor. Paste a problem, ask me to explain a theorem, or review past paper questions!
              </p>

              {/* Quick suggestions */}
              <div className="mt-6 flex flex-wrap justify-center gap-2">
                {suggestions.map(({ label, Icon }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => void send(label)}
                    className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-xs font-medium text-foreground/80 hover:border-primary/40 hover:bg-secondary hover:text-foreground transition-all shadow-sm"
                  >
                    <Icon className="size-3.5 text-primary" />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            messages.map((m, i) => (
              <Message key={i} from={m.role}>
                <MessageContent className="rounded-2xl text-sm leading-relaxed">
                  {m.role === "assistant" ? (
                    <div className="relative group">
                      <MessageResponse>{m.content}</MessageResponse>
                      <button
                        type="button"
                        onClick={() => speakResponse(m.content)}
                        className="mt-2 flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground hover:text-primary transition-colors opacity-80 group-hover:opacity-100"
                      >
                        <Volume2 className="size-3.5" />
                        <span>Listen to explanation</span>
                      </button>
                    </div>
                  ) : (
                    m.content
                  )}
                </MessageContent>
              </Message>
            ))
          )}

          {status === "submitted" && (
            <Message from="assistant">
              <MessageContent className="rounded-2xl">
                <div className="flex items-center gap-2 py-1">
                  <Loader2 className="size-3.5 animate-spin text-primary" />
                  <Shimmer className="text-xs text-muted-foreground">Yumna is thinking and working through the steps…</Shimmer>
                </div>
              </MessageContent>
            </Message>
          )}

          {error && (
            <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-2.5 text-xs text-destructive">
              {error}
            </div>
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      {/* Modern, Sleek Input UI: Chat with Yumna */}
      <div className="shrink-0 border-t border-border bg-card/60 px-4 py-3 backdrop-blur">
        <div className="mx-auto max-w-3xl">
          {/* Attachment Preview Banner */}
          {attachment && (
            <div className="mb-2 flex items-center justify-between rounded-xl bg-secondary px-3 py-1.5 text-xs text-foreground">
              <div className="flex items-center gap-2 truncate">
                <Paperclip className="size-3.5 text-primary" />
                <span className="font-semibold truncate">{attachment.name}</span>
                <span className="text-[10px] uppercase font-bold text-muted-foreground bg-card px-1.5 py-0.5 rounded">
                  {attachment.type}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setAttachment(null)}
                className="text-muted-foreground hover:text-foreground"
              >
                <X className="size-3.5" />
              </button>
            </div>
          )}

          {/* Upload Dropdown Popover */}
          {uploadOpen && (
            <div className="mb-2 w-72 rounded-2xl border border-border bg-card p-2.5 shadow-2xl">
              <p className="px-2 py-1 text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Upload &amp; Analyze with AI
              </p>
              <div className="flex flex-col gap-1 mt-1">
                <button
                  type="button"
                  onClick={() => pdfInputRef.current?.click()}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium hover:bg-secondary text-left transition-colors"
                >
                  <FileText className="size-4 text-rose-500" />
                  <div>
                    <p className="font-semibold">Upload PDF Document</p>
                    <p className="text-[10px] text-muted-foreground">Syllabus or past exam paper</p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => imgInputRef.current?.click()}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium hover:bg-secondary text-left transition-colors"
                >
                  <ImageIcon className="size-4 text-emerald-500" />
                  <div>
                    <p className="font-semibold">Upload Image / Diagram</p>
                    <p className="text-[10px] text-muted-foreground">Homework photo or chart</p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => docInputRef.current?.click()}
                  className="flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs font-medium hover:bg-secondary text-left transition-colors"
                >
                  <FileUp className="size-4 text-blue-500" />
                  <div>
                    <p className="font-semibold">Upload Text / Notes</p>
                    <p className="text-[10px] text-muted-foreground">.txt or markdown notes</p>
                  </div>
                </button>
              </div>
            </div>
          )}

          {/* Sleek Input Container */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              void send(input);
            }}
            className="flex items-center gap-2 rounded-2xl border border-border bg-background p-1.5 shadow-sm focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary transition-all"
          >
            {/* Attachment Button */}
            <button
              type="button"
              onClick={() => setUploadOpen((v) => !v)}
              className="flex size-9 shrink-0 items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
              title="Upload file or diagram"
            >
              <Plus className="size-4" />
            </button>

            {/* Input Textarea */}
            <textarea
              ref={inputRef}
              rows={1}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void send(input);
                }
              }}
              placeholder="Chat with Yumna... (Ask a question, paste homework, or test concepts)"
              className="flex-1 bg-transparent px-2 py-1.5 text-sm text-foreground placeholder:text-muted-foreground outline-none resize-none max-h-32"
            />

            {/* Voice Call Button */}
            <button
              type="button"
              onClick={() => {
                setVoiceMode(true);
                startListening();
              }}
              className="flex size-9 shrink-0 items-center justify-center rounded-xl text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
              title="Speak with Yumna"
            >
              <Mic className="size-4" />
            </button>

            {/* Send Button */}
            <button
              type="submit"
              disabled={!input.trim() && !attachment}
              className={`flex size-9 shrink-0 items-center justify-center rounded-xl transition-all ${
                input.trim() || attachment
                  ? "bg-ink text-ink-foreground shadow hover:opacity-90 cursor-pointer"
                  : "bg-secondary text-muted-foreground cursor-not-allowed opacity-50"
              }`}
              title="Send message"
            >
              <ArrowUp className="size-4" />
            </button>
          </form>

          <p className="mt-1.5 text-center text-[11px] text-muted-foreground">
            Press <kbd className="font-sans px-1 rounded bg-secondary">Enter</kbd> to send · <kbd className="font-sans px-1 rounded bg-secondary">Shift+Enter</kbd> for new line
          </p>
        </div>
      </div>
    </div>
  );
}
