import { createFileRoute } from "@tanstack/react-router";
import { LayoutGrid, List, NotebookTabs, Plus, Search } from "lucide-react";

import { DashboardLayout, EmptyState, PageHeading, SetFilterRow } from "@/components/dashboard-page";

export const Route = createFileRoute("/flashcards")({
  head: () => ({
    meta: [
      { title: "Flashcards — spaced repetition that sticks | ExamGlow" },
      {
        name: "description",
        content:
          "Auto-generated flashcard decks with spaced repetition so the facts you keep forgetting come back until they stick.",
      },
      { property: "og:title", content: "Flashcards | ExamGlow" },
      { property: "og:description", content: "Spaced-repetition decks built from your own notes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FlashcardsPage,
});

function FlashcardsPage() {
  return (
    <DashboardLayout crumbs={[{ label: "My First Study Set" }, { label: "Flashcards" }]}>
      <PageHeading
        icon={<NotebookTabs className="size-5" aria-hidden />}
        title="Flashcards"
        subtitle="Spaced repetition decks built from your own materials"
        action={
          <button type="button" className="flex shrink-0 items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-ink-foreground">
            <Plus className="size-4" aria-hidden /> Create Deck
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
              <Search className="size-4" aria-hidden /> Search decks...
            </span>
          </div>
        }
      />

      <EmptyState
        title="No decks yet"
        body="Generate a deck from any topic in your study set and review it a little every day."
        action={
          <button type="button" className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-ink-foreground">
            <Plus className="size-4" aria-hidden /> Create New
          </button>
        }
      />
    </DashboardLayout>
  );
}
