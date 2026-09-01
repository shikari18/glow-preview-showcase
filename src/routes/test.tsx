import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { CircleHelp, Play } from "lucide-react";

import { DashboardLayout, PageHeading, PrimaryButton } from "@/components/dashboard-page";
import { SubjectPicker } from "@/components/subject-picker";
import { findSubject } from "@/lib/subjects";

export const Route = createFileRoute("/test")({
  head: () => ({
    meta: [
      { title: "Take a test — choose your subject | ExamGlow" },
      {
        name: "description",
        content: "Choose the subject and topics you want to be tested on, set the length and difficulty, then start your practice test.",
      },
      { property: "og:title", content: "Take a test | ExamGlow" },
      { property: "og:description", content: "Pick a subject and topics, then start a timed practice test." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TestPage,
});

const lengths = [10, 20, 30];
const levels = ["Easy", "Medium", "Exam level"] as const;

function TestPage() {
  const [subjectId, setSubjectId] = useState<string | null>(null);
  const [topics, setTopics] = useState<string[]>([]);
  const [length, setLength] = useState(20);
  const [level, setLevel] = useState<(typeof levels)[number]>("Medium");
  const [started, setStarted] = useState(false);

  const subject = findSubject(subjectId);

  return (
    <DashboardLayout crumbs={[{ label: "Practice" }, { label: "Test" }]}>
      <PageHeading
        icon={<CircleHelp className="size-5" aria-hidden />}
        title="Choose what to be tested on"
        subtitle="Pick a subject, narrow it to topics, then start your test."
      />

      <SubjectPicker
        selected={subjectId}
        onSelect={(s) => {
          setSubjectId(s.id);
          setTopics([]);
          setStarted(false);
        }}
        title="1. Choose a subject"
      />

      {subject && (
        <section className="mt-8 rounded-3xl border border-border bg-card p-5">
          <h2 className="text-2xl">2. Topics</h2>
          <p className="mt-1.5 text-sm text-muted-foreground">Leave empty to test the whole subject.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {subject.topics.map((topic) => {
              const active = topics.includes(topic);
              return (
                <button
                  key={topic}
                  type="button"
                  aria-pressed={active}
                  onClick={() =>
                    setTopics((prev) => (active ? prev.filter((t) => t !== topic) : [...prev, topic]))
                  }
                  className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                    active ? "border-lavender bg-lilac/50" : "border-border hover:bg-secondary"
                  }`}
                >
                  {topic}
                </button>
              );
            })}
          </div>

          <h2 className="mt-8 text-2xl">3. Format</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <span className="mb-1.5 block text-sm font-medium">Questions</span>
              <div className="flex gap-2">
                {lengths.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setLength(value)}
                    className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                      length === value ? "border-lavender bg-lilac/50" : "border-border hover:bg-secondary"
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <span className="mb-1.5 block text-sm font-medium">Difficulty</span>
              <div className="flex flex-wrap gap-2">
                {levels.map((value) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setLevel(value)}
                    className={`rounded-full border px-4 py-2 text-sm transition-colors ${
                      level === value ? "border-lavender bg-lilac/50" : "border-border hover:bg-secondary"
                    }`}
                  >
                    {value}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6">
            <PrimaryButton onClick={() => setStarted(true)}>
              <Play className="size-4" aria-hidden /> Start test
            </PrimaryButton>
          </div>

          {started && (
            <p className="mt-4 rounded-2xl bg-secondary px-4 py-3 text-sm">
              Building a {length}-question {level.toLowerCase()} test on{" "}
              <strong>{topics.length ? topics.join(", ") : subject.name}</strong>.
            </p>
          )}
        </section>
      )}
    </DashboardLayout>
  );
}
