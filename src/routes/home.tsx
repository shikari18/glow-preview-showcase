import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Flame,
  Layers,
  MessageCircle,
  Sparkles,
} from "lucide-react";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { ProfileAvatar } from "@/components/dashboard-page";
import { readProfile, type OnboardingProfile } from "@/lib/onboarding";
import logoMark from "@/assets/logo-mark.png";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      { title: "Study dashboard | ExamGlow" },
      {
        name: "description",
        content:
          "Plan your studies, review your progress and prepare for every exam in one focused ExamGlow workspace.",
      },
      { property: "og:title", content: "Study dashboard | ExamGlow" },
      {
        property: "og:description",
        content: "Your focused workspace for notes, assignments, quizzes and exam preparation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

const quickActions = [
  { title: "Ask the tutor", meta: "Explain anything, instantly", to: "/chat", Icon: MessageCircle, tone: "bg-lilac" },
  { title: "Complete an assignment", meta: "Upload or paste a brief", to: "/assignments", Icon: ClipboardCheck, tone: "bg-mint" },
  { title: "Review flashcards", meta: "142 cards due today", to: "/flashcards", Icon: Layers, tone: "bg-surface" },
  { title: "Practice questions", meta: "Past papers by topic", to: "/past-questions", Icon: BookOpen, tone: "bg-surface" },
] as const;

const plan = [
  ["Review cardiac anatomy", "25 min", true],
  ["Complete blood flow quiz", "15 min", true],
  ["Revise ECG flashcards", "20 min", true],
  ["Practice cardiac cycle questions", "30 min", false],
  ["Write a one-page recap", "15 min", false],
] as const;

function HomePage() {
  const [profile, setProfile] = useState<OnboardingProfile>({});
  useEffect(() => setProfile(readProfile()), []);
  const firstName = profile.name?.split(" ")[0] ?? "there";

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <DashboardSidebar />
      <main className="min-w-0 flex-1 overflow-y-auto">
        <div className="mx-auto max-w-[1180px] px-5 pb-24 pt-20 md:px-8 md:pt-10 lg:px-12">
          <header className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-4">
            <div className="min-w-0">
              <p className="text-sm text-muted-foreground">Tuesday, 1 September</p>
              <h1 className="mt-1 truncate text-[clamp(2rem,4vw,3.25rem)] leading-tight">
                Good to see you, <span className="display-italic">{firstName}</span>
              </h1>
            </div>
            <ProfileAvatar className="mt-1" />
          </header>

          <section className="mt-7 grid gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
            <div className="relative overflow-hidden rounded-[28px] bg-ink px-7 py-8 text-ink-foreground">
              <img
                src={logoMark}
                alt=""
                width={512}
                height={512}
                className="pointer-events-none absolute -right-8 -top-10 size-52 opacity-10 invert"
              />
              <span className="inline-flex items-center gap-2 rounded-full bg-ink-foreground/10 px-3 py-1 text-xs font-semibold">
                <Sparkles className="size-3.5" aria-hidden /> Today's focus
              </span>
              <h2 className="mt-4 max-w-md text-[clamp(1.7rem,3vw,2.4rem)] leading-tight">
                Cardiovascular Physiology, 2 units left
              </h2>
              <p className="mt-3 max-w-md text-sm text-ink-foreground/70">
                One focused session now keeps your weekly plan comfortably on track.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                <Link
                  to="/study-plan"
                  className="inline-flex items-center gap-2 rounded-full bg-ink-foreground px-5 py-3 text-sm font-medium text-ink"
                >
                  Continue studying <ArrowRight className="size-4" aria-hidden />
                </Link>
                <Link
                  to="/syllabus"
                  className="inline-flex items-center gap-2 rounded-full border border-ink-foreground/25 px-5 py-3 text-sm font-medium"
                >
                  Upload material
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Stat value="68%" label="Syllabus covered" />
              <Stat value="142" label="Cards due today" />
              <Stat value="9" label="Day streak" icon={<Flame className="size-4 text-lavender" aria-hidden />} />
              <Stat value="1,240" label="Arcade points" />
            </div>
          </section>

          <section className="mt-10">
            <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Quick actions</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {quickActions.map(({ title, meta, to, Icon, tone }) => (
                <Link
                  key={title}
                  to={to}
                  className={`group rounded-3xl ${tone} p-5 transition-transform hover:-translate-y-1`}
                >
                  <span className="flex size-10 items-center justify-center rounded-2xl bg-card">
                    <Icon className="size-4.5" aria-hidden />
                  </span>
                  <strong className="mt-4 flex items-center gap-1.5 text-[15px] font-semibold">
                    <span className="min-w-0 truncate">{title}</span>
                    <ArrowUpRight className="size-4 shrink-0 opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                  </strong>
                  <span className="mt-1 block text-sm text-foreground/60">{meta}</span>
                </Link>
              ))}
            </div>
          </section>

          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.45fr)_minmax(280px,0.75fr)]">
            <section>
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Today</p>
                  <h2 className="mt-1 text-3xl">Your study plan</h2>
                </div>
                <span className="text-sm text-muted-foreground">3 of 5 complete</span>
              </div>
              <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-secondary">
                <div className="h-full w-3/5 rounded-full bg-lavender" />
              </div>
              <div className="mt-4 divide-y divide-border rounded-3xl border border-border px-5">
                {plan.map(([title, time, done]) => (
                  <div key={title} className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-4 py-4">
                    {done ? (
                      <CheckCircle2 className="size-5 shrink-0 text-lavender" />
                    ) : (
                      <span className="size-5 shrink-0 rounded-full border border-border" />
                    )}
                    <span className={`min-w-0 truncate text-[15px] ${done ? "text-muted-foreground line-through" : "font-medium"}`}>
                      {title}
                    </span>
                    <span className="flex shrink-0 items-center gap-1.5 text-sm text-muted-foreground">
                      <Clock3 className="size-3.5" />
                      {time}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Coming up</p>
              <h2 className="mt-1 text-3xl">Next deadline</h2>
              <div className="mt-4 rounded-3xl border border-border p-5">
                <div className="flex items-center gap-3">
                  <CalendarDays className="size-5 text-lavender" />
                  <span className="text-sm font-medium">Friday</span>
                </div>
                <p className="mt-3 font-medium">Physiology lab report</p>
                <p className="mt-1 text-sm text-muted-foreground">1,200 words · not started</p>
                <Link
                  to="/assignments"
                  className="mt-4 inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2.5 text-sm font-medium text-ink-foreground"
                >
                  Let AI draft it <ArrowRight className="size-4" />
                </Link>
              </div>
              <Link
                to="/calendar"
                className="mt-3 flex items-center justify-between rounded-3xl bg-surface px-5 py-4 text-sm font-medium"
              >
                See full calendar <ArrowRight className="size-4" />
              </Link>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}

function Stat({ value, label, icon }: { value: string; label: string; icon?: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-border px-5 py-6">
      <div className="flex items-center gap-2">
        <strong className="font-display text-3xl font-normal">{value}</strong>
        {icon}
      </div>
      <span className="mt-1 block text-sm text-muted-foreground">{label}</span>
    </div>
  );
}
