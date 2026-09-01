import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CalendarDays, Check, Clock3, Sparkles, Target } from "lucide-react";

import { DashboardLayout, PageHeading, PrimaryButton } from "@/components/dashboard-page";
import { SubjectPicker } from "@/components/subject-picker";
import { findSubject, type Subject } from "@/lib/subjects";

export const Route = createFileRoute("/study-plan")({
  head: () => ({
    meta: [
      { title: "Study Plan — build your revision schedule | ExamGlow" },
      {
        name: "description",
        content: "Pick a subject, set your exam date and daily study time, and ExamGlow builds a topic-by-topic revision plan.",
      },
      { property: "og:title", content: "Study Plan | ExamGlow" },
      { property: "og:description", content: "Build a topic-by-topic revision schedule around your exam date." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StudyPlanPage,
});

const minutesOptions = [30, 45, 60, 90, 120];

function StudyPlanPage() {
  const [subjectId, setSubjectId] = useState<string | null>(null);
  const [examDate, setExamDate] = useState("");
  const [minutes, setMinutes] = useState(60);
  const [plan, setPlan] = useState<{ subject: Subject; days: { day: string; topic: string; minutes: number }[] } | null>(null);
  const [done, setDone] = useState<Record<string, boolean>>({});

  const subject = findSubject(subjectId);

  function buildPlan() {
    if (!subject) return;
    const perDay = Math.max(1, Math.round(minutes / 30)) >= 3 ? 2 : 1;
    const days: { day: string; topic: string; minutes: number }[] = [];
    let index = 0;
    let dayNumber = 1;
    while (index < subject.topics.length) {
      for (let i = 0; i < perDay && index < subject.topics.length; i += 1) {
        days.push({
          day: `Day ${dayNumber}`,
          topic: subject.topics[index] as string,
          minutes: Math.round(minutes / perDay),
        });
        index += 1;
      }
      dayNumber += 1;
    }
    setPlan({ subject, days });
    setDone({});
  }

  const completed = Object.values(done).filter(Boolean).length;

  return (
    <DashboardLayout crumbs={[{ label: "Study" }, { label: "Study Plan" }]}>
      <PageHeading
        icon={<Target className="size-5" aria-hidden />}
        title="Make a study plan"
        subtitle="Choose a subject, tell us when the exam is, and we'll schedule the topics."
      />

      <SubjectPicker
        selected={subjectId}
        onSelect={(s) => {
          setSubjectId(s.id);
          setPlan(null);
        }}
        title="1. Pick a subject"
        description="Your plan is built from this subject's syllabus topics."
      />

      <section className="mt-8 rounded-3xl border border-border bg-card p-5">
        <h2 className="text-2xl">2. Set your schedule</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 flex items-center gap-2 text-sm font-medium">
              <CalendarDays className="size-4" aria-hidden /> Exam date
            </span>
            <input
              type="date"
              value={examDate}
              onChange={(e) => setExamDate(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-lavender"
            />
          </label>
          <div>
            <span className="mb-1.5 flex items-center gap-2 text-sm font-medium">
              <Clock3 className="size-4" aria-hidden /> Minutes per day
            </span>
            <div className="flex flex-wrap gap-2">
              {minutesOptions.map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setMinutes(value)}
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                    minutes === value ? "border-lavender bg-lilac/50" : "border-border hover:bg-secondary"
                  }`}
                >
                  {value}m
                </button>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-5">
          <PrimaryButton onClick={buildPlan}>
            <Sparkles className="size-4" aria-hidden /> Generate my plan
          </PrimaryButton>
          {!subject && <p className="mt-2 text-sm text-muted-foreground">Pick a subject first.</p>}
        </div>
      </section>

      {plan && (
        <section className="mt-8">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase text-muted-foreground">Your plan</p>
              <h2 className="mt-1 text-3xl">{plan.subject.name}</h2>
            </div>
            <span className="text-sm text-muted-foreground">
              {completed} of {plan.days.length} sessions done{examDate ? ` · exam ${examDate}` : ""}
            </span>
          </div>
          <ol className="mt-5 divide-y divide-border border-y border-border">
            {plan.days.map((entry, i) => {
              const key = `${entry.day}-${entry.topic}`;
              const checked = Boolean(done[key]);
              return (
                <li key={key} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 py-4">
                  <button
                    type="button"
                    onClick={() => setDone((prev) => ({ ...prev, [key]: !prev[key] }))}
                    aria-label={checked ? "Mark session as not done" : "Mark session as done"}
                    className={`flex size-6 shrink-0 items-center justify-center rounded-full border ${
                      checked ? "border-lavender bg-lavender text-ink-foreground" : "border-border"
                    }`}
                  >
                    {checked && <Check className="size-3.5" aria-hidden />}
                  </button>
                  <span className="min-w-0">
                    <span className="block text-xs uppercase tracking-wide text-muted-foreground">
                      {entry.day} · session {i + 1}
                    </span>
                    <span className={`block truncate ${checked ? "text-muted-foreground line-through" : "font-medium"}`}>
                      {entry.topic}
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-1.5 text-sm text-muted-foreground">
                    <Clock3 className="size-3.5" aria-hidden />
                    {entry.minutes}m
                  </span>
                </li>
              );
            })}
          </ol>
        </section>
      )}
    </DashboardLayout>
  );
}
