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
  Keyboard,
  Sparkles,
} from "lucide-react";

import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import logoMark from "@/assets/logo-mark.png";

type ChatMessage = { role: "user" | "assistant"; content: string };

type UploadedAttachment = {
  name: string;
  type: "pdf" | "image" | "doc";
  content?: string;
};

const suggestions = [
  { label: "Explain photosynthesis step-by-step", Icon: BookOpen },
  { label: "Quiz me on quadratic equations", Icon: ListChecks },
  { label: "How do electric circuits work?", Icon: Layers },
] as const;

export function StudyChat({ className = "", onClose }: { className?: string; onClose?: () => void }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [status, setStatus] = useState<"ready" | "submitted">("ready");
  const [error, setError] = useState<string | null>(null);

  // Speech-to-Speech Voice Mode state
  const [voiceMode, setVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState("");

  // Upload dropdown state
  const [uploadOpen, setUploadOpen] = useState(false);
  const [attachment, setAttachment] = useState<UploadedAttachment | null>(null);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const imgInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Initialize Web Speech Synthesis & Recognition
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

        reco.onerror = () => {
          setIsListening(false);
        };

        reco.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = reco;
      }
    }
  }, []);

  // Speak AI response with Kokoro-inspired realistic parameters
  function speakResponse(text: string) {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();

    // Strip markdown formatting for speech
    const cleanText = text
      .replace(/[*_#`$]/g, "")
      .replace(/\[.*?\]/g, "")
      .replace(/https?:\/\/\S+/g, "")
      .slice(0, 500);

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.08; // natural, fast, engaging tutor pace
    utterance.pitch = 1.06;

    const voices = window.speechSynthesis.getVoices();
    // Prioritize natural female UK/US voices for Yumna
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
      // If still in voice mode, re-listen automatically
      if (voiceMode) {
        startListening();
      }
    };
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }

  function startListening() {
    if (recognitionRef.current && !isListening) {
      try {
        setVoiceTranscript("");
        recognitionRef.current.start();
        setIsListening(true);
      } catch {}
    }
  }

  function stopListening() {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
  }

  async function handleVoiceSubmit() {
    if (!voiceTranscript.trim()) return;
    const textToSend = voiceTranscript.trim();
    stopListening();
    setVoiceTranscript("");
    await send(textToSend, true);
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
      if (!res.ok || !data.text) {
        setError(data.error ?? "Yumna is taking a moment to reply. Please try again.");
      } else {
        setMessages([...next, { role: "assistant", content: data.text }]);
        if (speakBack || voiceMode) {
          speakResponse(data.text);
        }
      }
    } catch {
      setError("Network error — check your connection and try again.");
    } finally {
      setStatus("ready");
      if (!voiceMode) inputRef.current?.focus();
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
    setInput((prev) => (prev ? prev : `Using this ${file.name}, explain key concepts and generate practice questions.`));
  }

  return (
    <div className={`flex h-full flex-col overflow-hidden bg-card ${className}`}>
      {/* Hidden File Inputs */}
      <input
        ref={pdfInputRef}
        type="file"
        accept=".pdf"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFileUpload(f, "pdf");
        }}
      />
      <input
        ref={imgInputRef}
        type="file"
        accept="image/*,.svg"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFileUpload(f, "image");
        }}
      />
      <input
        ref={docInputRef}
        type="file"
        accept=".txt,.md,.doc,.docx"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) handleFileUpload(f, "doc");
        }}
      />

      {/* Header with Voice Mode Toggle */}
      <header className="flex items-center justify-between border-b border-border px-5 py-3.5 bg-card shrink-0">
        <div className="flex items-center gap-3 min-w-0">
          <img
            src={logoMark}
            alt="Yumna"
            width={512}
            height={512}
            className="size-9 rounded-full bg-lilac/60 p-0.5"
          />
          <div className="min-w-0">
            <p className="truncate text-sm font-bold tracking-tight text-foreground">Yumna</p>
            <p className="text-xs text-muted-foreground flex items-center gap-1.5">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>AI Study Tutor · Fast Inference</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Speech-to-Speech Toggle Button */}
          <button
            type="button"
            onClick={() => {
              if (voiceMode) {
                stopListening();
                if (typeof window !== "undefined") window.speechSynthesis.cancel();
                setVoiceMode(false);
              } else {
                setVoiceMode(true);
                startListening();
              }
            }}
            className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
              voiceMode
                ? "bg-emerald-500 text-white shadow-md animate-pulse"
                : "bg-secondary text-foreground hover:bg-emerald-500/15 hover:text-emerald-600 dark:hover:text-emerald-400"
            }`}
          >
            <Mic className="size-3.5" />
            <span>{voiceMode ? "Voice Active" : "Voice Mode"}</span>
          </button>

          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Close chat"
              className="text-muted-foreground hover:text-foreground p-1"
            >
              <X className="size-5" />
            </button>
          )}
        </div>
      </header>

      {/* Conversation Thread */}
      <Conversation className="flex-1">
        <ConversationContent className="mx-auto w-full max-w-3xl gap-6 px-4 py-6">
          {messages.length === 0 && (
            <div className="py-10 text-center">
              <img
                src={logoMark}
                alt="Yumna"
                loading="lazy"
                width={512}
                height={512}
                className="mx-auto size-20 rounded-full bg-lilac/60 p-1 shadow-sm"
              />
              <h2 className="mt-5 font-serif text-2xl font-bold text-foreground">
                Hi! I'm Yumna, your Study Tutor.
              </h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                Ask me anything about your school subjects, exams, formulas, or past papers. You can also upload documents, PDFs, or switch to voice mode!
              </p>
              <div className="mx-auto mt-6 grid max-w-md gap-2.5 sm:grid-cols-3">
                {suggestions.map(({ label, Icon }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => void send(label)}
                    className="flex flex-col items-start gap-2 rounded-2xl border border-border bg-card p-3 text-left text-xs font-medium transition-all hover:bg-secondary hover:-translate-y-0.5 shadow-sm"
                  >
                    <Icon className="size-4 text-emerald-500" aria-hidden />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((m, i) => (
            <Message key={i} from={m.role}>
              <MessageContent>
                <MessageResponse>{m.content}</MessageResponse>
              </MessageContent>
            </Message>
          ))}

          {status === "submitted" && <Shimmer>Yumna is preparing your explanation...</Shimmer>}
          {error && <p className="text-sm text-destructive font-medium">{error}</p>}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      {/* ── Input Section: Voice Mode OR Text Prompt ── */}
      <div className="border-t border-border p-3 bg-card shrink-0">
        <div className="mx-auto w-full max-w-3xl">
          {voiceMode ? (
            /* Speech-to-Speech Voice Mode UI */
            <div className="flex flex-col items-center justify-center rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-6 text-center">
              {/* Pulsing Voice Sphere */}
              <div className="relative mb-4 flex items-center justify-center">
                <div
                  className={`size-20 rounded-full bg-emerald-500 transition-all duration-300 flex items-center justify-center text-white shadow-lg ${
                    isListening || isSpeaking ? "scale-110 shadow-emerald-500/50" : "scale-100"
                  }`}
                >
                  {isSpeaking ? (
                    <Volume2 className="size-8 animate-bounce" />
                  ) : isListening ? (
                    <Mic className="size-8 animate-pulse" />
                  ) : (
                    <MicOff className="size-8 opacity-70" />
                  )}
                </div>
                {(isListening || isSpeaking) && (
                  <div className="absolute -inset-3 rounded-full border-2 border-emerald-500/40 animate-ping" />
                )}
              </div>

              <p className="text-sm font-semibold text-foreground">
                {isSpeaking
                  ? "Yumna is speaking..."
                  : isListening
                  ? "Listening to you... Speak clearly"
                  : "Tap microphone to speak"}
              </p>

              {voiceTranscript ? (
                <p className="mt-2 text-xs italic text-muted-foreground max-w-md bg-card px-4 py-2 rounded-xl border border-border">
                  "{voiceTranscript}"
                </p>
              ) : (
                <p className="mt-1 text-xs text-muted-foreground">
                  Ask any question about your syllabus or homework
                </p>
              )}

              {/* Voice Action Controls */}
              <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
                {isListening ? (
                  <button
                    type="button"
                    onClick={stopListening}
                    className="flex items-center gap-1.5 rounded-full bg-secondary px-4 py-2 text-xs font-semibold hover:bg-border"
                  >
                    <MicOff className="size-3.5" /> Pause Listening
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={startListening}
                    className="flex items-center gap-1.5 rounded-full bg-emerald-600 px-4 py-2 text-xs font-semibold text-white shadow hover:bg-emerald-700"
                  >
                    <Mic className="size-3.5" /> Start Speaking
                  </button>
                )}

                {voiceTranscript && (
                  <button
                    type="button"
                    onClick={handleVoiceSubmit}
                    disabled={status === "submitted"}
                    className="flex items-center gap-1.5 rounded-full bg-ink px-5 py-2 text-xs font-semibold text-ink-foreground shadow"
                  >
                    Send to Yumna →
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => {
                    stopListening();
                    if (typeof window !== "undefined") window.speechSynthesis.cancel();
                    setVoiceMode(false);
                  }}
                  className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground"
                >
                  <Keyboard className="size-3.5" /> Switch to Text Input
                </button>
              </div>
            </div>
          ) : (
            /* Normal Text Input with + Dropdown */
            <div className="relative">
              {/* Attachment preview banner */}
              {attachment && (
                <div className="mb-2 flex items-center justify-between rounded-xl bg-secondary/80 px-3 py-1.5 text-xs text-foreground">
                  <div className="flex items-center gap-2 truncate">
                    <Paperclip className="size-3.5 text-emerald-500" />
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

              {/* Upload Dropdown Menu */}
              {uploadOpen && (
                <div className="absolute bottom-full left-0 mb-3 w-72 rounded-2xl border border-border bg-card p-2.5 shadow-xl z-20">
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
                        <p className="text-[10px] text-muted-foreground">Syllabus, past exam paper or booklet</p>
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
                        <p className="text-[10px] text-muted-foreground">Photo of homework, graph or diagram</p>
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
                        <p className="text-[10px] text-muted-foreground">.txt or .md revision material</p>
                      </div>
                    </button>
                  </div>
                </div>
              )}

              <PromptInput
                onSubmit={(_message, event) => {
                  event.preventDefault();
                  void send(input);
                }}
              >
                <div className="flex items-center pl-2">
                  {/* + Button */}
                  <button
                    type="button"
                    onClick={() => setUploadOpen((v) => !v)}
                    className="flex size-8 items-center justify-center rounded-full bg-secondary text-foreground hover:bg-border transition-colors shrink-0"
                    title="Upload PDF, image, or notes"
                  >
                    <Plus className="size-4" />
                  </button>
                </div>

                <PromptInputTextarea
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask Yumna anything about your studies, formulas, or homework..."
                />

                <PromptInputFooter className="justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setVoiceMode(true);
                      startListening();
                    }}
                    className="flex items-center gap-1 rounded-full p-2 text-muted-foreground hover:bg-secondary hover:text-foreground"
                    title="Switch to Voice Mode"
                  >
                    <Mic className="size-4 text-emerald-500" />
                  </button>
                  <PromptInputSubmit status={status} disabled={!input.trim() && !attachment} />
                </PromptInputFooter>
              </PromptInput>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
