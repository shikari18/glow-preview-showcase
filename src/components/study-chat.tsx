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
import { callGemini, type ChatMessage } from "@/lib/ai-router";
import {
  isPaidUser,
  getAiMessageCount,
  incrementAiMessageCount,
  canSendAiMessage,
  FREE_AI_MESSAGE_LIMIT,
} from "@/lib/onboarding";
import { PaywallModal } from "@/components/paywall-modal";
import { playRealisticVoice, stopRealisticVoice, unlockAudio } from "@/lib/gemini-tts";

type UploadedAttachment = {
  name: string;
  type: "pdf" | "image" | "doc";
  mimeType?: string | undefined;
  data?: string | undefined; // base64
  content?: string | undefined;
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

export function StudyChat({
  className = "",
  onClose,
  isMini = false,
}: {
  className?: string;
  onClose?: () => void;
  isMini?: boolean;
}) {
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
  const [playingMsgIdx, setPlayingMsgIdx] = useState<number | null>(null);
  const [voiceLoadingIdx, setVoiceLoadingIdx] = useState<number | null>(null);
  const [showPaywall, setShowPaywall] = useState(false);

  // Dictation Speech-to-Text (inside the input box)
  const [isDictating, setIsDictating] = useState(false);
  const dictationRecoRef = useRef<any>(null);

  // Speech-to-Speech Hands-Free Voice Mode (inline Claude/Lovable style)
  const [voiceMode, setVoiceMode] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceTranscript, setVoiceTranscript] = useState("");

  const [uploadOpen, setUploadOpen] = useState(false);
  const [attachment, setAttachment] = useState<UploadedAttachment | null>(null);

  // Mobile input focus & viewport docking
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [viewportBottomOffset, setViewportBottomOffset] = useState(0);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const pdfInputRef = useRef<HTMLInputElement>(null);
  const imgInputRef = useRef<HTMLInputElement>(null);
  const docInputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  // Listen to mobile virtual keyboard visualViewport changes
  useEffect(() => {
    if (typeof window === "undefined" || !window.visualViewport) return;
    const updateViewport = () => {
      const vv = window.visualViewport;
      if (!vv) return;
      const offset = Math.max(0, window.innerHeight - (vv.offsetTop + vv.height));
      setViewportBottomOffset(offset);
    };

    window.visualViewport.addEventListener("resize", updateViewport);
    window.visualViewport.addEventListener("scroll", updateViewport);
    return () => {
      window.visualViewport?.removeEventListener("resize", updateViewport);
      window.visualViewport?.removeEventListener("scroll", updateViewport);
    };
  }, []);

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
          if (voiceMode && !isSpeaking) {
            setTimeout(() => {
              if (voiceMode && !isSpeaking) startListening();
            }, 300);
          }
        };

        recognitionRef.current = reco;
      }
    }
  }, [voiceMode, isSpeaking, voiceTranscript]);

  function toggleDictation() {
    if (isDictating) {
      dictationRecoRef.current?.stop();
      setIsDictating(false);
      return;
    }

    if (typeof window === "undefined") return;
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Speech recognition is not supported in this browser.");
      return;
    }

    const dictation = new SpeechRecognition();
    dictation.continuous = true;
    dictation.interimResults = true;
    dictation.lang = "en-US";

    dictation.onresult = (event: any) => {
      let text = "";
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        text += event.results[i][0].transcript;
      }
      setInput((prev) => (prev ? `${prev} ${text}` : text));
    };

    dictation.onerror = () => setIsDictating(false);
    dictation.onend = () => setIsDictating(false);

    dictationRecoRef.current = dictation;
    dictation.start();
    setIsDictating(true);
  }

  function speakResponse(text: string) {
    setIsSpeaking(true);
    playRealisticVoice(text, {
      onStart: () => setIsSpeaking(true),
      onEnd: () => {
        setIsSpeaking(false);
        if (voiceMode) startListening();
      },
      onError: () => {
        setIsSpeaking(false);
        if (voiceMode) startListening();
      },
    });
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
      try {
        recognitionRef.current.stop();
      } catch {}
      setIsListening(false);
    }
  }

  function endVoiceCall() {
    stopRealisticVoice();
    stopListening();
    setIsSpeaking(false);
    setIsListening(false);
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

    // Check free user prompt quota (6 free questions)
    if (!isPaidUser() && !canSendAiMessage()) {
      setShowPaywall(true);
      setError(
        `You have used your ${FREE_AI_MESSAGE_LIMIT} free AI study questions. Upgrade to ExamGlow Premium for unlimited tutoring with Yumna.`
      );
      return;
    }

    const userMsg: ChatMessage = {
      role: "user",
      content: trimmed,
      ...(attachment?.data && attachment?.mimeType
        ? { attachment: { mimeType: attachment.mimeType, data: attachment.data } }
        : {}),
    };

    const next: ChatMessage[] = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setAttachment(null);
    setError(null);
    setIsInputFocused(false);
    inputRef.current?.blur();
    setStatus("submitted");
    incrementAiMessageCount();

    // Context from student learning activity to tailor response (only for substantive study questions, not simple greetings)
    let studentContext = "";
    const isGreeting = /^(hey|hi|hello|yo|sup|greetings|good\s+(morning|afternoon|evening))\b/i.test(trimmed);
    if (!isGreeting && trimmed.length > 5) {
      try {
        const recentNotes = localStorage.getItem("examglow.student_notes");
        const profileRaw = localStorage.getItem("examglow.profile");
        if (recentNotes || profileRaw) {
          studentContext = `\n\n(Student Info: ${
            profileRaw ? `Curriculum: ${JSON.parse(profileRaw).curriculum || "Cambridge IGCSE"}. ` : ""
          }${recentNotes ? `Recent notes written: ${recentNotes.slice(0, 180)}...` : ""})`;
        }
      } catch {}
    }

    const fullMessages = [
      ...messages,
      {
        ...userMsg,
        content: studentContext ? `${userMsg.content}${studentContext}` : userMsg.content,
      },
    ];

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: fullMessages }),
      });
      const data = (await res.json()) as { text?: string; error?: string };
      let replyText = data.text;

      // Fallback: If server returned nothing, error, or an extremely short reply, call Gemini API directly in-browser!
      if (!replyText || data.error || replyText.trim().length < 20) {
        const clientRes = await callGemini(fullMessages);
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
        const directRes = await callGemini(fullMessages);
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

  // Handle file uploads with base64 conversion for Gemini Multimodal Vision
  async function handleFileUpload(file: File, type: "pdf" | "image" | "doc") {
    setUploadOpen(false);
    if (file.size > 10_000_000) {
      setError("File is too large. Please upload files under 10MB.");
      return;
    }

    if (type === "image" || type === "pdf") {
      const reader = new FileReader();
      reader.onload = () => {
        const result = reader.result as string;
        const match = result.match(/^data:(.*?);base64,(.*)$/);
        if (match && match[2]) {
          setAttachment({
            name: file.name,
            type,
            mimeType: match[1] || (type === "pdf" ? "application/pdf" : file.type || "image/jpeg"),
            data: match[2],
          });
        }
      };
      reader.readAsDataURL(file);
      return;
    }

    if (type === "doc") {
      try {
        const text = await file.text();
        setAttachment({
          name: file.name,
          type,
          content: text.slice(0, 5000),
        });
      } catch {}
    }
  }

  return (
    <div className={`relative flex h-full w-full flex-col bg-background ${className}`}>
      {/* Paywall modal for free tier limit */}
      <PaywallModal
        open={showPaywall}
        onClose={() => setShowPaywall(false)}
        title="Upgrade to ExamGlow Premium"
        subtitle={`You have used your ${FREE_AI_MESSAGE_LIMIT} free questions with Yumna. Unlock unlimited 24/7 AI tutoring, past paper walk-throughs, and voice calls.`}
      />
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

        {/* Right side: Voice Call launcher (Hidden on mini widget) */}
        <div className="flex items-center gap-2">
          {!isMini && (
            <button
              type="button"
              onClick={() => {
                if (voiceMode) {
                  endVoiceCall();
                } else {
                  unlockAudio();
                  setVoiceMode(true);
                  speakResponse("Hey there! What are we studying together today? ✨");
                }
              }}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-colors ${
                voiceMode
                  ? "bg-amber-500/20 text-amber-500 border border-amber-500/40 animate-pulse"
                  : "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20"
              }`}
            >
              <Mic className="size-3.5" />
              <span>{voiceMode ? "End Call" : "Voice Call"}</span>
            </button>
          )}
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
                      <div className="mt-2 flex items-center gap-2">
                        {playingMsgIdx === i ? (
                          <button
                            type="button"
                            onClick={() => {
                              stopRealisticVoice();
                              setPlayingMsgIdx(null);
                              setVoiceLoadingIdx(null);
                            }}
                            className="flex items-center gap-1.5 rounded-full bg-rose-500/10 border border-rose-500/30 px-3 py-1 text-[11px] font-bold text-rose-500 hover:bg-rose-500/20 transition-colors"
                          >
                            <VolumeX className="size-3.5" />
                            <span>Stop Speaking</span>
                          </button>
                        ) : voiceLoadingIdx === i ? (
                          <button
                            type="button"
                            onClick={() => {
                              stopRealisticVoice();
                              setVoiceLoadingIdx(null);
                            }}
                            className="flex items-center gap-1.5 rounded-full bg-primary/15 border border-primary/40 px-3 py-1 text-[11px] font-bold text-primary animate-pulse hover:bg-primary/25 cursor-pointer transition-colors"
                            title="Preparing realistic voice with Yumna... Click to cancel"
                          >
                            <Loader2 className="size-3.5 animate-spin" />
                            <span>Preparing realistic voice...</span>
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => {
                              setVoiceLoadingIdx(i);
                              playRealisticVoice(m.content, {
                                onStart: () => {
                                  setVoiceLoadingIdx(null);
                                  setPlayingMsgIdx(i);
                                },
                                onEnd: () => {
                                  setVoiceLoadingIdx(null);
                                  setPlayingMsgIdx(null);
                                },
                                onError: () => {
                                  setVoiceLoadingIdx(null);
                                  setPlayingMsgIdx(null);
                                },
                              });
                            }}
                            className="flex items-center gap-1.5 rounded-full bg-secondary/80 hover:bg-secondary px-2.5 py-1 text-[11px] font-semibold text-muted-foreground hover:text-foreground transition-colors"
                          >
                            <Volume2 className="size-3.5 text-primary" />
                            <span>Listen to explanation</span>
                          </button>
                        )}
                      </div>
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
      <div
        style={viewportBottomOffset > 0 ? { transform: `translateY(-${viewportBottomOffset}px)` } : undefined}
        className={`shrink-0 border-t border-border bg-card/95 backdrop-blur transition-all duration-200 z-30 ${
          isInputFocused
            ? "px-2 sm:px-4 py-3 sm:py-3 shadow-2xl -translate-y-2 sm:translate-y-0 pb-4 sm:pb-3"
            : "px-3 sm:px-4 py-2.5 sm:py-3"
        }`}
      >
        <div className="mx-auto w-full max-w-3xl">
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

          {/* Sleek Lovable-Style Input Container (+6px height, integrated voice lighting from middle) */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              inputRef.current?.blur();
              setIsInputFocused(false);
              void send(input);
            }}
            className={`relative flex min-h-[56px] w-full items-center gap-1.5 sm:gap-2 rounded-2xl border transition-all shadow-sm ${
              voiceMode
                ? isSpeaking
                  ? "border-amber-500 bg-amber-500/5 ring-2 ring-amber-500/30 px-3 sm:px-4 py-2"
                  : "border-sky-500 bg-sky-500/5 ring-2 ring-sky-500/30 px-3 sm:px-4 py-2"
                : isInputFocused
                ? "border-primary bg-card ring-2 ring-primary/30 p-2 sm:p-3 shadow-md"
                : "border-border/80 bg-card p-2 sm:p-3 focus-within:ring-2 focus-within:ring-primary/40 focus-within:border-primary"
            }`}
          >
            {voiceMode ? (
              // Integrated voice call interface inside the input bar itself
              <div className="flex w-full items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span
                    className={`size-3 rounded-full animate-ping shrink-0 ${
                      isSpeaking ? "bg-amber-500" : "bg-sky-500"
                    }`}
                  />
                  <div className="flex flex-col min-w-0">
                    <span
                      className={`text-xs font-bold truncate ${
                        isSpeaking
                          ? "text-amber-600 dark:text-amber-400"
                          : "text-sky-600 dark:text-sky-400"
                      }`}
                    >
                      {isSpeaking
                        ? "Yumna is speaking (Realistic Voice)..."
                        : isListening
                        ? "Listening to you... speak naturally"
                        : "Voice ready · speak or type below"}
                    </span>
                    <span className="text-[11px] text-muted-foreground truncate">
                      {voiceTranscript ? `"${voiceTranscript}"` : "Speech-to-speech active · tap Stop to finish"}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={endVoiceCall}
                  className="flex items-center gap-1.5 rounded-full bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 px-4 py-1.5 text-xs font-bold hover:opacity-90 transition-opacity shrink-0 shadow-sm"
                >
                  <span>••• Stop</span>
                </button>
              </div>
            ) : (
              // Standard Lovable-style input
              <>
                {/* Attachment Button (Only shown in full chat, removed in mini chat) */}
                {!isMini && (
                  <button
                    type="button"
                    onClick={() => setUploadOpen((v) => !v)}
                    className="flex size-9 shrink-0 items-center justify-center rounded-xl text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors"
                    title="Upload file or image"
                  >
                    <Plus className="size-4" />
                  </button>
                )}

                {/* Input Textarea */}
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={input}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      inputRef.current?.blur();
                      setIsInputFocused(false);
                      void send(input);
                    }
                  }}
                  placeholder="Ask Yumna anything... (Paste questions, formulas, or homework)"
                  className="flex-1 min-w-0 bg-transparent px-2 sm:px-2.5 py-1.5 text-base sm:text-sm text-foreground placeholder:text-muted-foreground outline-none resize-none max-h-32 leading-relaxed"
                />

                {/* Dictation Mic Button (Speech-to-Text strictly for input dictation) */}
                <button
                  type="button"
                  onClick={toggleDictation}
                  className={`flex size-9 shrink-0 items-center justify-center rounded-xl transition-all ${
                    isDictating
                      ? "bg-rose-500/20 text-rose-500 animate-pulse border border-rose-500/40"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                  }`}
                  title={isDictating ? "Stop Dictation" : "Dictate with voice"}
                >
                  <Mic className="size-4" />
                </button>

                {/* Send Button */}
                <button
                  type="submit"
                  onClick={() => {
                    inputRef.current?.blur();
                    setIsInputFocused(false);
                  }}
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
              </>
            )}
          </form>

          <p className="mt-1.5 text-center text-[11px] text-muted-foreground hidden sm:block">
            Press <kbd className="font-sans px-1 rounded bg-secondary">Enter</kbd> to send · <kbd className="font-sans px-1 rounded bg-secondary">Shift+Enter</kbd> for new line
          </p>
        </div>
      </div>
    </div>
  );
}
