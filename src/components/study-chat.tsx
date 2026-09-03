import { useEffect, useRef, useState } from "react";
import { BookOpen, ListChecks, Layers, X, Lock, Sparkles } from "lucide-react";

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
import {
  isPaidUser,
  getAiMessageCount,
  incrementAiMessageCount,
  FREE_AI_MESSAGE_LIMIT,
} from "@/lib/onboarding";
import { PaywallModal } from "@/components/paywall-modal";

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
  const [isPaid, setIsPaid] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [paywallOpen, setPaywallOpen] = useState(false);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setIsPaid(isPaidUser());
    setMessageCount(getAiMessageCount());
  }, []);

  const remaining = Math.max(0, FREE_AI_MESSAGE_LIMIT - messageCount);
  const isLimitReached = !isPaid && remaining <= 0;

  async function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || status === "submitted") return;

    if (!isPaid && messageCount >= FREE_AI_MESSAGE_LIMIT) {
      setPaywallOpen(true);
      return;
    }

    const nextCount = incrementAiMessageCount();
    setMessageCount(nextCount);

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
    <>
      <PaywallModal
        open={paywallOpen}
        onClose={() => setPaywallOpen(false)}
        title="Unlimited 24/7 AI Tutor Access"
        subtitle="You've used all 6 free messages. Upgrade to ExamGlow Premium for unlimited instant explanations, step-by-step math solutions, and essay marking."
      />

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
            <p className="text-xs text-muted-foreground">
              {isPaid ? (
                <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-medium">
                  <Sparkles className="size-3" /> Unlimited Premium
                </span>
              ) : (
                <span className="text-amber-600 dark:text-amber-400 font-medium">
                  {remaining} of {FREE_AI_MESSAGE_LIMIT} free messages left
                </span>
              )}
            </p>
          </div>
          {onClose ? (
            <button type="button" onClick={onClose} aria-label="Close chat" className="ml-auto text-muted-foreground">
              <X className="size-5" />
            </button>
          ) : null}
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
                      disabled={isLimitReached}
                      onClick={() => void send(label)}
                      className="flex flex-col items-start gap-2 rounded-2xl border border-border p-3 text-left text-sm transition-colors hover:bg-secondary disabled:opacity-40"
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

            {status === "submitted" && <Shimmer>Thinking...</Shimmer>}
            {error && <p className="text-sm text-destructive">{error}</p>}

            {/* Lock banner if free limit reached */}
            {isLimitReached && (
              <div className="my-4 rounded-2xl border border-amber-500/30 bg-amber-500/10 p-5 text-center">
                <div className="mx-auto mb-2 flex size-10 items-center justify-center rounded-full bg-amber-500/20 text-amber-600 dark:text-amber-400">
                  <Lock className="size-5" />
                </div>
                <h3 className="text-base font-bold text-foreground">Free Message Limit Reached (6/6)</h3>
                <p className="mt-1 text-xs text-muted-foreground max-w-md mx-auto">
                  You've used all 6 free messages. Upgrade to ExamGlow Premium for unlimited 24/7 AI tutoring, instant homework help, and full notes access.
                </p>
                <button
                  type="button"
                  onClick={() => setPaywallOpen(true)}
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-2.5 text-xs font-semibold text-background shadow-md transition-transform hover:-translate-y-0.5"
                >
                  <Sparkles className="size-3.5" /> Unlock Unlimited AI Tutor
                </button>
              </div>
            )}
          </ConversationContent>
          <ConversationScrollButton />
        </Conversation>

        <div className="border-t border-border p-3">
          <div className="mx-auto w-full max-w-3xl">
            {isLimitReached ? (
              <div className="flex items-center justify-between rounded-2xl border border-border bg-secondary/40 px-4 py-3 text-sm">
                <span className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Lock className="size-3.5 text-amber-500" /> Free quota reached
                </span>
                <button
                  type="button"
                  onClick={() => setPaywallOpen(true)}
                  className="text-xs font-semibold text-primary underline"
                >
                  Upgrade for unlimited chat →
                </button>
              </div>
            ) : (
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
            )}
          </div>
        </div>
      </div>
    </>
  );
}
