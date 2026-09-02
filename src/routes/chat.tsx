import { createFileRoute, Link } from "@tanstack/react-router";
import { ClipboardCheck, Layers, ListChecks, NotebookTabs, Sparkles } from "lucide-react";

import { DashboardLayout } from "@/components/dashboard-page";
import { StudyChat } from "@/components/study-chat";
import logoMark from "@/assets/logo-mark.png";

export const Route = createFileRoute("/chat")({
  head: () => ({
    meta: [
      { title: "AI Chat — ask your study tutor anything | ExamGlow" },
      {
        name: "description",
        content:
          "Chat with the ExamGlow AI tutor: explain concepts, quiz yourself, summarise notes and plan your next study session.",
      },
      { property: "og:title", content: "AI Chat | ExamGlow" },
      { property: "og:description", content: "Ask the ExamGlow AI tutor anything about your study material." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ChatPage,
});

const shortcuts = [
  { label: "Make me a quiz", to: "/quizzes", Icon: ListChecks },
  { label: "Build flashcards", to: "/flashcards", Icon: Layers },
  { label: "Complete an assignment", to: "/assignments", Icon: ClipboardCheck },
  { label: "Open my notes", to: "/notes", Icon: NotebookTabs },
] as const;

function ChatPage() {
  return (
    <DashboardLayout crumbs={[{ label: "Study" }, { label: "Chat" }]}>
      <div className="grid gap-5 py-4 lg:grid-cols-[minmax(0,1fr)_280px]">
        <div className="h-[calc(100dvh-10rem)] min-w-0">
          <StudyChat />
        </div>

        <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">
          <section className="rounded-3xl bg-lilac p-5">
            <img src={logoMark} alt="" width={512} height={512} className="size-11 rounded-2xl bg-card p-1" />
            <h2 className="mt-3 text-xl leading-snug">Your tutor knows your study set</h2>
            <p className="mt-2 text-sm text-foreground/70">
              Answers stay tied to the material you uploaded, so nothing drifts off syllabus.
            </p>
          </section>

          <section>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Jump to</p>
            <div className="mt-3 space-y-1">
              {shortcuts.map(({ label, to, Icon }) => (
                <Link
                  key={label}
                  to={to}
                  className="flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm transition-colors hover:bg-secondary"
                >
                  <Icon className="size-4 shrink-0 text-lavender" aria-hidden />
                  <span className="min-w-0 truncate">{label}</span>
                </Link>
              ))}
            </div>
          </section>

          <section className="rounded-3xl border border-border p-5">
            <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              <Sparkles className="size-3.5" aria-hidden /> Tip
            </span>
            <p className="mt-2 text-sm text-muted-foreground">
              Ask “explain this like I'm five, then at exam level” to get both depth and clarity in one answer.
            </p>
          </section>
        </aside>
      </div>
    </DashboardLayout>
  );
}
