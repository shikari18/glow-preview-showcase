import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen, CircleCheck, FileDown, Target } from "lucide-react";

import { DashboardLayout, PageHeading, EmptyState } from "@/components/dashboard-page";
import { SubjectPicker } from "@/components/subject-picker";
import { findSubject } from "@/lib/subjects";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/syllabus")({
  head: () => ({
    meta: [
      { title: "Syllabus — pick a subject and see every topic | ExamGlow" },
      {
        name: "description",
        content:
          "Choose the subject whose syllabus you want, then work through every topic with covered and mastered tracking.",
      },
      { property: "og:title", content: "Syllabus | ExamGlow" },
      { property: "og:description", content: "Choose a subject syllabus and track every topic." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SyllabusPage,
});

type Status = "todo" | "covered" | "mastered";

function SyllabusPage() {
  const [subjectId, setSubjectId] = useState<string | null>(null);
  const [status, setStatus] = useState<Record<string, Status>>({});

  const subject = findSubject(subjectId);
  const topics = subject?.topics ?? [];
  const covered = topics.filter((t) => status[t] === "covered" || status[t] === "mastered").length;
  const mastered = topics.filter((t) => status[t] === "mastered").length;
  const progress = topics.length ? Math.round((covered / topics.length) * 100) : 0;

  function cycle(topic: string) {
    setStatus((prev) => {
      const current = prev[topic] ?? "todo";
      const next: Status = current === "todo" ? "covered" : current === "covered" ? "mastered" : "todo";
      return { ...prev, [topic]: next };
    });
  }

  return (
    <DashboardLayout crumbs={[{ label: "Course" }, { label: "Syllabus" }]}>
      <PageHeading
        icon={<BookOpen className="size-5" aria-hidden />}
        title="Choose a syllabus"
        subtitle="Pick the subject you're studying and we'll lay out every topic in order."
      />

      <SubjectPicker
        selected={subjectId}
        onSelect={(s) => {
          setSubjectId(s.id);
          setStatus({});
        }}
        title="1. Which subject's syllabus?"
        description="You can switch subjects at any time — your ticks are kept per subject session."
      />

      {!subject ? (
        <div className="mt-8">
          <EmptyState
            title="No syllabus selected yet"
            body="Choose a subject above to see its full topic list, then tick topics off as you cover and master them."
          />
        </div>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          <section className="min-w-0 rounded-3xl border border-border bg-card p-5">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase text-muted-foreground">Syllabus</p>
                <h2 className="mt-1 text-3xl">{subject.name}</h2>
              </div>
              <span className="text-sm text-muted-foreground">Tap a topic to mark covered, then mastered.</span>
            </div>

            <ul className="mt-5 divide-y divide-border border-y border-border">
              {topics.map((topic, i) => {
                const state = status[topic] ?? "todo";
                return (
                  <li key={topic}>
                    <button
                      type="button"
                      onClick={() => cycle(topic)}
                      className="grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 py-4 text-left transition-colors hover:bg-secondary/50"
                    >
                      <span
                        className={`flex size-6 shrink-0 items-center justify-center rounded-full border ${
                          state === "mastered"
                            ? "border-lavender bg-lavender text-ink-foreground"
                            : state === "covered"
                              ? "border-lavender bg-lilac/60"
                              : "border-border"
                        }`}
                      >
                        {state !== "todo" && <CircleCheck className="size-3.5" aria-hidden />}
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs uppercase tracking-wide text-muted-foreground">
                          Topic {i + 1}
                        </span>
                        <span className="block truncate font-medium">{topic}</span>
                      </span>
                      <span className="shrink-0 text-xs capitalize text-muted-foreground">{state}</span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </section>

          <aside className="space-y-4">
            <section className="rounded-3xl bg-surface p-5">
              <h2 className="text-lg">Your progress</h2>
              <span className="mt-3 block h-1.5 overflow-hidden rounded-full bg-secondary">
                <span className="block h-full rounded-full bg-lavender" style={{ width: `${progress}%` }} />
              </span>
              <ul className="mt-4 space-y-2.5 text-sm">
                <li className="flex items-center gap-2">
                  <BookOpen className="size-4" aria-hidden /> {topics.length} topics
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <CircleCheck className="size-4 text-lavender" aria-hidden /> {covered} covered
                </li>
                <li className="flex items-center gap-2 text-muted-foreground">
                  <CircleCheck className="size-4 text-lavender" aria-hidden /> {mastered} mastered
                </li>
              </ul>
            </section>

            <section className="rounded-3xl bg-surface p-5">
              <h2 className="text-lg">Turn it into a plan</h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Schedule these topics around your exam date.
              </p>
              <Link
                to="/study-plan"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-card px-4 py-2.5 text-sm font-medium"
              >
                <Target className="size-4" aria-hidden /> Build a study plan
              </Link>
            </section>

            <section className="rounded-3xl bg-surface p-5">
              <h2 className="text-lg">Test yourself</h2>
              <p className="mt-1 text-sm text-muted-foreground">Check what already sticks before revising more.</p>
              <Link
                to="/test"
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-full bg-card px-4 py-2.5 text-sm font-medium"
              >
                <FileDown className="size-4" aria-hidden /> Start a test
              </Link>
            </section>
          </aside>
        </div>
      )}
    </DashboardLayout>
  );
}
