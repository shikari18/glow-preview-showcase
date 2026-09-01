import { createFileRoute } from "@tanstack/react-router";
import { FileQuestion, LayoutGrid, List, Plus, Search } from "lucide-react";

import { DashboardLayout, EmptyState, PageHeading, SetFilterRow } from "@/components/dashboard-page";

export const Route = createFileRoute("/past-questions")({
  head: () => ({
    meta: [
      { title: "Past Questions — practise real exam papers | ExamGlow" },
      {
        name: "description",
        content: "Work through past exam papers by topic with worked solutions and examiner-style marking.",
      },
      { property: "og:title", content: "Past Questions | ExamGlow" },
      { property: "og:description", content: "Real past papers, sorted by topic, with worked solutions." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PastQuestionsPage,
});

function PastQuestionsPage() {
  return (
    <DashboardLayout crumbs={[{ label: "My First Study Set" }, { label: "Past Questions" }]}>
      <PageHeading
        icon={<FileQuestion className="size-5" aria-hidden />}
        title="Past Questions"
        subtitle="Real papers sorted by topic, with worked solutions"
        action={
          <button type="button" className="flex shrink-0 items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-ink-foreground">
            <Plus className="size-4" aria-hidden /> Add Paper
          </button>
        }
      />

      <SetFilterRow
        right={
          <div className="flex shrink-0 items-center gap-2">
            <span className="flex items-center gap-1 rounded-xl border border-border p-1">
              <span className="rounded-lg bg-secondary p-1.5"><LayoutGrid className="size-4" /></span>
              <span className="p-1.5 text-muted-foreground"><List className="size-4" /></span>
            </span>
            <span className="hidden items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm text-muted-foreground sm:flex">
              <Search className="size-4" aria-hidden /> Search papers...
            </span>
          </div>
        }
      />

      <EmptyState
        title="No papers yet"
        body="Add a past paper and we'll break it into topics, hints and full worked solutions."
        action={
          <button type="button" className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-ink-foreground">
            <Plus className="size-4" aria-hidden /> Add Paper
          </button>
        }
      />
    </DashboardLayout>
  );
}
