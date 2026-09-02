import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CalendarDays, Check, Clock3, Plus, Target, Trash2 } from "lucide-react";

import { DashboardLayout, PageHeading, PrimaryButton } from "@/components/dashboard-page";

export const Route = createFileRoute("/study-plan")({
  head: () => ({
    meta: [
      { title: "Study Plan — set your own study sessions | ExamGlow" },
      {
        name: "description",
        content: "Plan your revision your way: add study sessions with dates, times and durations, then tick them off as you go.",
      },
      { property: "og:title", content: "Study Plan | ExamGlow" },
      { property: "og:description", content: "Set your own study sessions and track them as you go." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: StudyPlanPage,
});

type Session = {
  id: string;
  title: string;
  date: string;
  time: string;
  minutes: number;
  done: boolean;
};

const KEY = "examglow.study-plan";
const minutesOptions = [15, 30, 45, 60, 90, 120];

function loadSessions(): Session[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session[]) : [];
  } catch {
    return [];
  }
}

function StudyPlanPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [minutes, setMinutes] = useState(60);

  useEffect(() => setSessions(loadSessions()), []);

  function persist(next: Session[]) {
    setSessions(next);
    try {
      window.localStorage.setItem(KEY, JSON.stringify(next));
    } catch {
      /* storage unavailable */
    }
  }

  function addSession() {
    const trimmed = title.trim();
    if (!trimmed || !date) return;
    const next = [
      ...sessions,
      {
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
        title: trimmed,
        date,
        time,
        minutes,
        done: false,
      },
    ].sort((a, b) => `${a.date}${a.time}`.localeCompare(`${b.date}${b.time}`));
    persist(next);
    setTitle("");
    setDate("");
    setTime("");
  }

  const completed = sessions.filter((s) => s.done).length;
  const upcoming = sessions.filter((s) => !s.done);

  return (
    <DashboardLayout crumbs={[{ label: "Study" }, { label: "Study Plan" }]}>
      <PageHeading
        icon={<Target className="size-5" aria-hidden />}
        title="Set your study plan"
        subtitle="You decide what to study and when — add sessions and tick them off as you go."
      />

      <section className="rounded-3xl border border-border bg-card p-5">
        <h2 className="text-2xl">New session</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="block sm:col-span-2">
            <span className="mb-1.5 block text-sm font-medium">What are you studying?</span>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Revise cardiac cycle"
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-lavender"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 flex items-center gap-2 text-sm font-medium">
              <CalendarDays className="size-4" aria-hidden /> Date
            </span>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-lavender"
            />
          </label>
          <label className="block">
            <span className="mb-1.5 flex items-center gap-2 text-sm font-medium">
              <Clock3 className="size-4" aria-hidden /> Start time
            </span>
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="w-full rounded-xl border border-border bg-background px-3 py-2.5 text-sm outline-none focus:border-lavender"
            />
          </label>
          <div className="sm:col-span-2">
            <span className="mb-1.5 block text-sm font-medium">How long?</span>
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
          <PrimaryButton onClick={addSession}>
            <Plus className="size-4" aria-hidden /> Add to my plan
          </PrimaryButton>
          {(!title.trim() || !date) && (
            <p className="mt-2 text-sm text-muted-foreground">Give the session a name and a date.</p>
          )}
        </div>
      </section>

      <section className="mt-8">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase text-muted-foreground">Your plan</p>
            <h2 className="mt-1 text-3xl">Upcoming sessions</h2>
          </div>
          {sessions.length > 0 && (
            <span className="text-sm text-muted-foreground">
              {completed} of {sessions.length} complete
            </span>
          )}
        </div>

        {sessions.length === 0 ? (
          <p className="mt-5 rounded-3xl border border-dashed border-border px-6 py-12 text-center text-sm text-muted-foreground">
            Nothing planned yet — add your first session above.
          </p>
        ) : (
          <ol className="mt-5 divide-y divide-border border-y border-border">
            {sessions.map((session) => (
              <li key={session.id} className="grid grid-cols-[auto_minmax(0,1fr)_auto_auto] items-center gap-4 py-4">
                <button
                  type="button"
                  onClick={() =>
                    persist(sessions.map((s) => (s.id === session.id ? { ...s, done: !s.done } : s)))
                  }
                  aria-label={session.done ? "Mark session as not done" : "Mark session as done"}
                  className={`flex size-6 shrink-0 items-center justify-center rounded-full border ${
                    session.done ? "border-lavender bg-lavender text-ink-foreground" : "border-border"
                  }`}
                >
                  {session.done && <Check className="size-3.5" aria-hidden />}
                </button>
                <span className="min-w-0">
                  <span className="block text-xs uppercase tracking-wide text-muted-foreground">
                    {session.date}
                    {session.time ? ` · ${session.time}` : ""}
                  </span>
                  <span className={`block truncate ${session.done ? "text-muted-foreground line-through" : "font-medium"}`}>
                    {session.title}
                  </span>
                </span>
                <span className="flex shrink-0 items-center gap-1.5 text-sm text-muted-foreground">
                  <Clock3 className="size-3.5" aria-hidden />
                  {session.minutes}m
                </span>
                <button
                  type="button"
                  onClick={() => persist(sessions.filter((s) => s.id !== session.id))}
                  aria-label={`Delete ${session.title}`}
                  className="flex size-8 shrink-0 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  <Trash2 className="size-4" aria-hidden />
                </button>
              </li>
            ))}
          </ol>
        )}

        {upcoming.length > 0 && (
          <p className="mt-3 text-sm text-muted-foreground">
            {upcoming.length} session{upcoming.length === 1 ? "" : "s"} to go — you've got this.
          </p>
        )}
      </section>
    </DashboardLayout>
  );
}
