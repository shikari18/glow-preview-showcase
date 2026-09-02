import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { MessageCircle, X } from "lucide-react";

import { StudyChat } from "@/components/study-chat";

const hiddenOn = ["/chat", "/login", "/signup", "/onboarding"];

export function FloatingChat() {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);

  if (hiddenOn.some((path) => pathname.startsWith(path))) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex flex-col items-end justify-end p-4 sm:p-6">
      {open && (
        <div className="pointer-events-auto mb-3 flex h-[min(70dvh,560px)] w-[min(92vw,400px)] flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-2xl">
          <StudyChat className="rounded-none border-0" onClose={() => setOpen(false)} />
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-label={open ? "Close AI tutor chat" : "Open AI tutor chat"}
        className="pointer-events-auto flex size-14 items-center justify-center rounded-full bg-ink text-ink-foreground shadow-xl transition-transform hover:-translate-y-0.5"
      >
        {open ? <X className="size-6" aria-hidden /> : <MessageCircle className="size-6" aria-hidden />}
      </button>
    </div>
  );
}
