import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ChevronDown, GraduationCap, LayoutGrid, List, Plus, Search } from "lucide-react";

import { DashboardLayout, EmptyState, PageHeading, SetFilterRow } from "@/components/dashboard-page";

export const Route = createFileRoute("/quizzes")({
  head: () => ({
    meta: [
      { title: "Practice — quizzes and tests from your notes | ExamGlow" },
      {
        name: "description",
        content: "Turn your materials into quizzes and timed tests tailored to what you're learning right now.",
      },
      { property: "og:title", content: "Practice | ExamGlow" },
      { property: "og:description", content: "Quizzes and timed tests generated from your own materials." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PracticePage,
});

const tabs = ["All", "Tests", "QuizFetch"] as const;

function PracticePage() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("QuizFetch");

  return (
    <DashboardLayout crumbs={[{ label: "My First Study Set" }, { label: "Practice" }]}>
      <PageHeading
        icon={<GraduationCap className="size-5" aria-hidden />}
        title="Practice"
        action={
          <button type="button" className="flex shrink-0 items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-ink-foreground">
            <Plus className="size-4" aria-hidden /> Create <ChevronDown className="size-4" aria-hidden />
          </button>
        }
      />

      <div className="mb-5 flex gap-6 border-b border-border text-[15px]">
        {tabs.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setTab(item)}
            className={`-mb-px border-b-2 pb-3 transition-colors ${
              tab === item ? "border-foreground font-semibold" : "border-transparent text-muted-foreground"
            }`}
          >
            {item}
          </button>
        ))}
      </div>

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
        title={tab === "Tests" ? "No tests yet" : "Quiz yourself"}
        body="Turn your materials into a quiz tailored to what you're learning. Find the gaps before they find you."
        action={
          <button type="button" className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-ink-foreground">
            <Plus className="size-4" aria-hidden /> Create New
          </button>
        }
      />
    </DashboardLayout>
  );
}
