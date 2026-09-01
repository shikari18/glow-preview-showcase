import { createFileRoute } from "@tanstack/react-router";
import { LayoutGrid, List, Plus, Search } from "lucide-react";

import { DashboardLayout, EmptyState, SetFilterRow } from "@/components/dashboard-page";
import catMascot from "@/assets/cat-mascot.png";

export const Route = createFileRoute("/tutors")({
  head: () => ({
    meta: [
      { title: "Tutor Me — 1:1 sessions with Whiskers | ExamGlow" },
      {
        name: "description",
        content: "Start a 1:1 tutoring session built around your own course materials with the ExamGlow AI tutor.",
      },
      { property: "og:title", content: "Tutor Me | ExamGlow" },
      { property: "og:description", content: "1:1 personalized tutoring with your course materials." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TutorsPage,
});

function TutorsPage() {
  return (
    <DashboardLayout crumbs={[{ label: "My First Study Set" }, { label: "Tutor Me List" }]}>
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-5">
        <div className="flex min-w-0 items-center gap-3">
          <img
            src={catMascot}
            alt="Whiskers the ExamGlow tutor"
            loading="lazy"
            width={512}
            height={512}
            className="size-14 shrink-0 rounded-full bg-lilac p-1.5"
          />
          <div className="min-w-0">
            <h1 className="flex min-w-0 items-center gap-2 truncate text-[clamp(1.6rem,3vw,2.2rem)]">
              Whiskers
              <span className="shrink-0 rounded-full bg-lilac px-2.5 py-1 text-xs font-semibold text-ink">AI Tutor</span>
            </h1>
            <p className="truncate text-sm text-muted-foreground">1:1 personalized tutoring with your course materials</p>
          </div>
        </div>
        <button type="button" className="flex shrink-0 items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-ink-foreground">
          <Plus className="size-4" aria-hidden /> New Session
        </button>
      </header>

      <p className="mx-auto mb-6 flex w-fit flex-wrap items-center justify-center gap-3 rounded-full bg-surface px-5 py-3 text-sm">
        Tutor Me is a premium feature. Upgrade to get started!
        <span className="rounded-full bg-lilac px-3 py-1 font-medium text-ink">Upgrade</span>
      </p>

      <SetFilterRow
        right={
          <div className="flex shrink-0 items-center gap-2">
            <span className="flex items-center gap-1 rounded-xl border border-border p-1">
              <span className="rounded-lg bg-secondary p-1.5"><LayoutGrid className="size-4" /></span>
              <span className="p-1.5 text-muted-foreground"><List className="size-4" /></span>
            </span>
            <span className="hidden items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm text-muted-foreground sm:flex">
              <Search className="size-4" aria-hidden /> Search...
            </span>
          </div>
        }
      />

      <EmptyState
        title="No sessions yet"
        body="Start a 1:1 tutoring session with Whiskers using your course materials."
        action={
          <button type="button" className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-ink-foreground">
            <Plus className="size-4" aria-hidden /> New Session
          </button>
        }
      />
    </DashboardLayout>
  );
}
