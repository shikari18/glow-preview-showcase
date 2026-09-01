import { createFileRoute } from "@tanstack/react-router";
import { CalendarDays, ChevronLeft, ChevronRight, GraduationCap, Plus, Settings2, Upload } from "lucide-react";

import { DashboardLayout } from "@/components/dashboard-page";

export const Route = createFileRoute("/assignments")({
  head: () => ({
    meta: [
      { title: "Calendar — plan exams and study time | ExamGlow" },
      {
        name: "description",
        content:
          "See your week at a glance, add exam dates and let ExamGlow reserve study time in the hours you are free.",
      },
      { property: "og:title", content: "Calendar | ExamGlow" },
      { property: "og:description", content: "Plan exams and study sessions week by week." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: CalendarPage,
});

const days = [
  { name: "SUN", date: 30, muted: true },
  { name: "MON", date: 31, muted: true },
  { name: "TUE", date: 1, today: true },
  { name: "WED", date: 2 },
  { name: "THU", date: 3 },
  { name: "FRI", date: 4 },
  { name: "SAT", date: 5 },
];

const hours = ["7 AM", "8 AM", "9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM"];
const monthGrid = [
  [30, 31, 1, 2, 3, 4, 5],
  [6, 7, 8, 9, 10, 11, 12],
  [13, 14, 15, 16, 17, 18, 19],
  [20, 21, 22, 23, 24, 25, 26],
  [27, 28, 29, 30, 1, 2, 3],
];

function CalendarPage() {
  return (
    <DashboardLayout crumbs={[{ label: "Calendar" }]}>
      <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <button type="button" className="rounded-full border border-border px-4 py-2 text-sm">Today</button>
          <button type="button" className="text-muted-foreground" aria-label="Previous week"><ChevronLeft className="size-5" /></button>
          <button type="button" className="text-muted-foreground" aria-label="Next week"><ChevronRight className="size-5" /></button>
          <h1 className="min-w-0 truncate text-xl sm:text-2xl">Aug 30 – Sep 5, 2026</h1>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <div className="hidden rounded-full bg-secondary p-1 text-sm sm:flex">
            <span className="rounded-full px-3 py-1.5 text-muted-foreground">Day</span>
            <span className="rounded-full bg-card px-3 py-1.5 font-medium">Week</span>
            <span className="rounded-full px-3 py-1.5 text-muted-foreground">Month</span>
          </div>
          <button type="button" className="flex items-center gap-1.5 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-ink-foreground">
            <Plus className="size-4" aria-hidden /> Add
          </button>
          <Settings2 className="hidden size-5 text-muted-foreground sm:block" aria-hidden />
        </div>
      </header>

      <div className="grid gap-5 lg:grid-cols-[240px_minmax(0,1fr)]">
        <aside className="space-y-5">
          <section>
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2">
              <h2 className="truncate text-lg">September 2026</h2>
              <span className="flex shrink-0 gap-1 text-muted-foreground"><ChevronLeft className="size-4" /><ChevronRight className="size-4" /></span>
            </div>
            <div className="mt-3 grid grid-cols-7 gap-y-1 text-center text-xs text-muted-foreground">
              {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
                <span key={`${d}-${i}`}>{d}</span>
              ))}
            </div>
            {monthGrid.map((week, wi) => (
              <div key={wi} className="grid grid-cols-7 gap-y-1 text-center text-sm">
                {week.map((d, di) => {
                  const isToday = wi === 0 && d === 1;
                  const outside = (wi === 0 && d > 20) || (wi === 4 && d < 5);
                  return (
                    <span
                      key={`${wi}-${di}`}
                      className={`mx-auto flex size-7 items-center justify-center rounded-full ${
                        isToday ? "bg-ink font-semibold text-ink-foreground" : outside ? "text-muted-foreground/50" : ""
                      }`}
                    >
                      {d}
                    </span>
                  );
                })}
              </div>
            ))}
          </section>

          <section className="rounded-3xl bg-surface p-5">
            <h2 className="text-lg">Upload your syllabus</h2>
            <p className="mt-1 text-sm text-muted-foreground">We'll auto-fill your exam dates and tell you what to study</p>
            <button type="button" className="mt-3 grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-2 rounded-2xl bg-card px-3 py-2.5 text-sm">
              <span className="flex size-7 items-center justify-center rounded-md bg-mint text-ink">◧</span>
              <span className="min-w-0 truncate text-left font-medium">My First Study Set</span>
              <Upload className="size-4 text-muted-foreground" aria-hidden />
            </button>
          </section>
        </aside>

        <section className="min-w-0 overflow-hidden rounded-3xl border border-border">
          <div className="grid grid-cols-[56px_repeat(7,minmax(0,1fr))] border-b border-border bg-surface/60 text-center">
            <span />
            {days.map((day) => (
              <div key={day.name} className="py-3">
                <span className={`block text-[11px] tracking-wide ${day.muted ? "text-muted-foreground/70" : "text-muted-foreground"}`}>{day.name}</span>
                <span
                  className={`mx-auto mt-1 flex size-9 items-center justify-center rounded-full text-lg ${
                    day.today ? "bg-ink text-ink-foreground" : day.muted ? "text-muted-foreground" : ""
                  }`}
                >
                  {day.date}
                </span>
              </div>
            ))}
          </div>

          <div className="relative">
            {hours.map((hour) => (
              <div key={hour} className="grid h-14 grid-cols-[56px_repeat(7,minmax(0,1fr))] border-b border-border/60">
                <span className="pr-2 pt-1 text-right text-[11px] text-muted-foreground">{hour}</span>
                {days.map((day) => (
                  <span key={day.name} className={`border-l border-border/60 ${day.today ? "bg-highlight/10" : ""}`} />
                ))}
              </div>
            ))}

            <div className="pointer-events-none absolute inset-0 flex items-center justify-center p-4">
              <div className="pointer-events-auto max-w-md rounded-3xl bg-surface px-8 py-10 text-center shadow-lg">
                <CalendarDays className="mx-auto size-7" aria-hidden />
                <h2 className="mt-3 text-2xl">Add your first exam</h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Tell us when your exam is and what it covers. We'll reserve study time for it in the hours you're free.
                </p>
                <button type="button" className="mt-5 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-ink-foreground">
                  <GraduationCap className="size-4" aria-hidden /> Add an exam
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DashboardLayout>
  );
}
