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
  { label: "Create a study plan for me", Icon: BookOpen },
  { label: "Quiz me on this study set", Icon: ListChecks },
  { label: "Generate flashcards for this set", Icon: Layers },
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
        setError(data.error ?? "Something went wrong. Please try again.");
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
      <header className="flex items-center gap-3 border-b border-border px-5 py-3.5">
        <img
          src={logoMark}
          alt=""
          width={512}
          height={512}
          className="size-9 rounded-full bg-lilac/60 p-0.5"
        />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold">ExamGlow Tutor</p>
          <p className="truncate text-xs text-muted-foreground">Always on, always on topic</p>
        </div>
        {onClose ? (
          <button type="button" onClick={onClose} aria-label="Close chat" className="ml-auto text-muted-foreground">
            <X className="size-5" />
          </button>
        ) : (
          <span className="ml-auto hidden rounded-full bg-secondary px-3 py-1 text-xs text-muted-foreground sm:block">
            {messages.length ? `${messages.length} messages` : "New chat"}
          </span>
        )}
      </header>

      <Conversation className="flex-1">
        <ConversationContent className="mx-auto w-full max-w-3xl gap-6">
          {messages.length === 0 && (
            <div className="py-10 text-center">
              <img
                src={logoMark}
                alt="ExamGlow AI tutor"
                loading="lazy"
                width={512}
                height={512}
                className="mx-auto size-20 rounded-full bg-lilac/60 p-1"
              />
              <h2 className="mt-5 font-display text-2xl">How can I help you study?</h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Ask anything, or start with one of these.
              </p>
              <div className="mx-auto mt-6 grid max-w-md gap-2 sm:grid-cols-3">
                {suggestions.map(({ label, Icon }) => (
                  <button
                    key={label}
                    type="button"
                    onClick={() => void send(label)}
                    className="flex flex-col items-start gap-2 rounded-2xl border border-border p-3 text-left text-sm transition-colors hover:bg-secondary"
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

          {status === "submitted" && <Shimmer>Whiskers is thinking...</Shimmer>}
          {error && <p className="text-sm text-destructive">{error}</p>}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="border-t border-border p-3">
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
              placeholder="Ask your AI tutor anything..."
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
