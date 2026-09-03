import { useRef, useState } from "react";
import { BookOpen, ListChecks, Layers, X } from "lucide-react";

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

  const inputRef = useRef<HTMLTextAreaElement>(null);

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || status === "submitted") return;

    const next: ChatMessage[] = [...messages, { role: "user", content: trimmed }];
    setMessages(next);
    setInput("");
    setError(null);
    setStatus("submitted");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next }),
      });
      const data = (await res.json()) as { text?: string; error?: string };
      if (!res.ok || !data.text) {
        setError(data.error ?? "Yumna is taking a moment to reply. Please try again.");
      } else {
        setMessages([...next, { role: "assistant", content: data.text }]);
      }
    } catch {
      setError("Network error — check your connection and try again.");
    } finally {
      setStatus("ready");
      inputRef.current?.focus();
    }
  }

  return (
    <div className={`flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-card ${className}`}>
      {/* Clean Header without distracting branding text */}
      <header className="flex items-center gap-3 border-b border-border px-5 py-3.5 bg-card">
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
            <span>AI Study Tutor</span>
          </p>
        </div>
        {onClose ? (
          <button type="button" onClick={onClose} aria-label="Close chat" className="ml-auto text-muted-foreground hover:text-foreground">
            <X className="size-5" />
          </button>
        ) : null}
      </header>

      <Conversation className="flex-1">
        <ConversationContent className="mx-auto w-full max-w-3xl gap-6">
          {messages.length === 0 && (
            <div className="py-12 text-center">
              <img
                src={logoMark}
                alt="Yumna"
                loading="lazy"
                width={512}
                height={512}
                className="mx-auto size-20 rounded-full bg-lilac/60 p-1"
              />
              <h2 className="mt-5 font-serif text-2xl font-bold text-foreground">
                Hi! I'm Yumna, your Study Tutor.
              </h2>
              <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
                Ask me anything about your school subjects, exams, or homework. I break things down simply so you can master every concept!
              </p>
              <div className="mx-auto mt-6 grid max-w-md gap-2.5 sm:grid-cols-3">
                {suggestions.map(({ label, Icon }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => void send(label)}
                    className="flex flex-col items-start gap-2 rounded-2xl border border-border bg-card p-3 text-left text-xs font-medium transition-all hover:bg-secondary hover:-translate-y-0.5 shadow-sm"
                  >
                    <Icon className="size-4 text-lavender" aria-hidden />
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

          {status === "submitted" && <Shimmer>Yumna is thinking...</Shimmer>}
          {error && <p className="text-sm text-destructive">{error}</p>}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="border-t border-border p-3 bg-card">
        <div className="mx-auto w-full max-w-3xl">
          <PromptInput
            onSubmit={(_message, event) => {
              event.preventDefault();
              void send(input);
            }}
          >
            <PromptInputTextarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Yumna anything about your studies, formulas, or homework..."
            />
            <PromptInputFooter className="justify-end">
              <PromptInputSubmit status={status} disabled={!input.trim()} />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </div>
    </div>
  );
}
