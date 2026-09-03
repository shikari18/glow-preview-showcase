import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { BookOpen, ChevronRight, Search, ArrowLeft, Loader2, Lock, Sparkles } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-page";
import type { SubjectNotes, Chapter } from "@/lib/notes/types";
import { SYLLABUS_NOTES } from "@/lib/syllabus-notes";
import { formatMathAndMarkdown } from "@/lib/render-math";
import { isPaidUser } from "@/lib/onboarding";
import { PaywallModal } from "@/components/paywall-modal";

export const Route = createFileRoute("/syllabus-notes")({
  head: () => ({
    meta: [
      { title: "Syllabus Notes — Cambridge IGCSE | ExamGlow" },
      { name: "description", content: "Full chapter notes for every Cambridge IGCSE subject with KaTeX formulas and diagrams." },
    ],
  }),
  component: SyllabusNotesPage,
});

// ─── Full chapter document ────────────────────────────────────────────────────

function ChapterDoc({
  chapter,
  allChapters,
  color,
  onBack,
  onNext,
  onPrev,
  isPaid,
  onUnlock,
}: {
  chapter: Chapter;
  allChapters: Chapter[];
  color: string;
  onBack: () => void;
  onNext: () => void;
  onPrev: () => void;
  isPaid: boolean;
  onUnlock: () => void;
}) {
  const [collapsed, setCollapsed] = useState<Record<number, boolean>>({});
  const scrollRef = useRef<HTMLDivElement>(null);
  const toggleCollapse = (i: number) =>
    setCollapsed((prev) => ({ ...prev, [i]: !prev[i] }));

  const idx = allChapters.findIndex((c) => c.number === chapter.number);
  const hasNext = idx < allChapters.length - 1;
  const hasPrev = idx > 0;

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
    setCollapsed({});
  }, [chapter.number]);

  // Free users can see first 2 subheadings (pages 1 & 2). Section 3+ is locked.
  const freeLimit = 2;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#f5f4ef] dark:bg-[#1a1a18]">
      {/* Top bar */}
      <div className="flex h-12 shrink-0 items-center gap-3 border-b border-black/10 bg-[#f5f4ef]/90 px-5 backdrop-blur dark:border-white/10 dark:bg-[#1a1a18]/90">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-black/60 hover:text-black transition-colors dark:text-white/60 dark:hover:text-white"
        >
          <ArrowLeft className="size-4" />
          <span className="hidden sm:inline">
            {allChapters.find((c) => c.number === chapter.number - 1)?.title ?? "All chapters"}
          </span>
          <span className="sm:hidden">Back</span>
        </button>
        <div className="flex-1" />
        <span className="text-xs text-black/40 dark:text-white/40">
          Chapter {chapter.number} · {idx + 1} / {allChapters.length}
        </span>
      </div>

      {/* Scrollable document */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <article className="mx-auto max-w-4xl px-6 pb-24 pt-12 sm:px-12">
          {/* Chapter badge */}
          <div
            className={`mb-6 inline-flex size-14 items-center justify-center rounded-2xl ${color} text-2xl font-black text-white shadow-sm`}
          >
            {chapter.number}
          </div>

          {/* Big title */}
          <h1 className="text-[clamp(2rem,5vw,3rem)] font-black leading-[1.15] tracking-tight text-black dark:text-white">
            {chapter.title}
          </h1>

          {/* Introduction section */}
          <div className="mt-8">
            <h2 className="mb-3 text-lg font-bold text-black dark:text-white">Introduction</h2>
            <div
              className="text-[15px] leading-[1.8] text-black/75 dark:text-white/75"
              dangerouslySetInnerHTML={{ __html: formatMathAndMarkdown(chapter.intro) }}
            />
          </div>

          <div className="my-10 h-px bg-black/10 dark:bg-white/10" />

          {/* Subheadings */}
          {chapter.subheadings.map((sub, si) => {
            const isCollapsed = collapsed[si];
            const isLocked = !isPaid && si >= freeLimit;

            if (isLocked) {
              return (
                <section key={si} className="relative mb-12 overflow-hidden rounded-3xl border border-amber-500/30 bg-amber-500/5 p-6 sm:p-8">
                  <div className="flex items-center gap-3">
                    <div className="flex size-10 items-center justify-center rounded-2xl bg-amber-500/20 text-amber-600 dark:text-amber-400">
                      <Lock className="size-5" />
                    </div>
                    <div>
                      <span className="rounded-full bg-amber-500/20 px-2.5 py-0.5 text-xs font-semibold text-amber-700 dark:text-amber-300">
                        Section {si + 1} Locked (Free Tier Limit)
                      </span>
                      <h2 className="mt-1 text-lg font-bold text-black dark:text-white sm:text-xl">
                        {sub.title}
                      </h2>
                    </div>
                  </div>

                  <p className="mt-4 text-sm text-black/60 dark:text-white/60">
                    Free preview is limited to Sections 1 &amp; 2. Upgrade to ExamGlow Premium to unlock all subtopics, detailed diagrams, exam formulas, and comprehensive explanations.
                  </p>

                  <button
                    type="button"
                    onClick={onUnlock}
                    className="mt-5 inline-flex items-center gap-2 rounded-full bg-black px-6 py-2.5 text-sm font-semibold text-white shadow-md transition-transform hover:-translate-y-0.5 dark:bg-white dark:text-black"
                  >
                    <Sparkles className="size-4" />
                    Unlock all sections for $2.00/wk
                  </button>
                </section>
              );
            }

            return (
              <section key={si} className="mb-12">
                {/* Section header with collapse button */}
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-[1.35rem] font-black leading-snug text-black dark:text-white sm:text-[1.55rem]">
                    {sub.title}
                  </h2>
                  <button
                    type="button"
                    onClick={() => toggleCollapse(si)}
                    className="mt-1 shrink-0 rounded-full border border-black/15 px-3 py-1 text-xs font-medium text-black/60 hover:bg-black/5 dark:border-white/15 dark:text-white/60 dark:hover:bg-white/5"
                  >
                    {isCollapsed ? "Expand" : "Collapse"}
                  </button>
                </div>

                {!isCollapsed && (
                  <>
                    {/* Body paragraph */}
                    <div
                      className="mt-4 text-[15px] leading-[1.8] text-black/75 dark:text-white/75"
                      dangerouslySetInnerHTML={{ __html: formatMathAndMarkdown(sub.body) }}
                    />

                    {/* Bullet groups */}
                    {sub.groups.map((grp, gi) => (
                      <div key={gi} className="mt-6">
                        {grp.subTitle && (
                          <p className="mb-3 text-[15px] font-bold text-black dark:text-white">
                            {grp.subTitle}
                          </p>
                        )}
                        <ul className="space-y-3">
                          {grp.bullets.map((pt, pi) => (
                            <li key={pi} className="flex gap-3 text-[15px] leading-[1.7] text-black/75 dark:text-white/75">
                              <span className="mt-[0.55rem] size-[5px] shrink-0 rounded-full bg-black/40 dark:bg-white/40" />
                              <div
                                className="flex-1"
                                dangerouslySetInnerHTML={{ __html: formatMathAndMarkdown(pt) }}
                              />
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </>
                )}

                {/* Separator */}
                {si < chapter.subheadings.length - 1 && (
                  <div className="mt-10 h-px bg-black/8 dark:bg-white/8" />
                )}
              </section>
            );
          })}

          {/* Bottom navigation */}
          <div className="mt-8 flex items-center justify-between gap-4 border-t border-black/10 pt-8 dark:border-white/10">
            <button
              type="button"
              onClick={hasPrev ? onPrev : onBack}
              className="flex items-center gap-2 rounded-full border border-black/15 px-5 py-2.5 text-sm font-medium text-black/70 hover:bg-black/5 dark:border-white/15 dark:text-white/70 dark:hover:bg-white/5"
            >
              <ArrowLeft className="size-4" />
              <span>{hasPrev ? "Previous chapter" : "Back to subject"}</span>
            </button>
            {hasNext && (
              <button
                type="button"
                onClick={onNext}
                className="flex items-center gap-2 rounded-full bg-black px-6 py-2.5 text-sm font-medium text-white hover:bg-black/80 dark:bg-white dark:text-black dark:hover:bg-white/90"
              >
                <span>Next chapter</span>
                <ChevronRight className="size-4" />
              </button>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}

// ─── Subject chapter list view ────────────────────────────────────────────────

function SubjectView({
  subject,
  onSelectChapter,
  onBack,
}: {
  subject: SubjectNotes;
  onSelectChapter: (c: Chapter) => void;
  onBack: () => void;
}) {
  return (
    <div className="mx-auto max-w-4xl py-2">
      {/* Back button */}
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-4" /> Back to all subjects
      </button>

      {/* Header */}
      <div className="mb-8 flex items-start gap-4">
        <div className={`flex size-14 shrink-0 items-center justify-center rounded-2xl ${subject.color} text-white shadow-md`}>
          <BookOpen className="size-7" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-semibold text-muted-foreground">
              Cambridge IGCSE {subject.code}
            </span>
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">{subject.name}</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {subject.chapters.length} chapters · complete curriculum coverage
          </p>
        </div>
      </div>

      {/* Chapter cards */}
      <div className="space-y-3">
        {subject.chapters.map((ch) => (
          <button
            key={ch.number}
            onClick={() => onSelectChapter(ch)}
            className="flex w-full items-start gap-4 rounded-2xl border border-border bg-card p-5 text-left transition-all hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-sm"
          >
            <div className={`flex size-9 shrink-0 items-center justify-center rounded-xl ${subject.color} text-sm font-bold text-white`}>
              {ch.number}
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-bold text-foreground">{ch.title}</h2>
              <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                {ch.intro}
              </p>
              <p className="mt-2 text-[11px] font-medium text-muted-foreground/80">
                {ch.subheadings.length} sections: {ch.subheadings.map((s) => s.title).join(" · ")}
              </p>
            </div>
            <ChevronRight className="mt-1 size-5 shrink-0 text-muted-foreground/60" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

function SyllabusNotesPage() {
  const [selectedSubject, setSelectedSubject] = useState<SubjectNotes | null>(null);
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(null);
  const [search, setSearch] = useState("");
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    setIsPaid(isPaidUser());
  }, []);

  const filtered = SYLLABUS_NOTES.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.code.includes(search)
  );

  const openNext = () => {
    if (!selectedSubject || !activeChapter) return;
    const idx = selectedSubject.chapters.findIndex((c) => c.number === activeChapter.number);
    if (idx < selectedSubject.chapters.length - 1) {
      setActiveChapter(selectedSubject.chapters[idx + 1]!);
    }
  };

  const openPrev = () => {
    if (!selectedSubject || !activeChapter) return;
    const idx = selectedSubject.chapters.findIndex((c) => c.number === activeChapter.number);
    if (idx > 0) {
      setActiveChapter(selectedSubject.chapters[idx - 1]!);
    }
  };

  return (
    <>
      <PaywallModal
        open={paywallOpen}
        onClose={() => setPaywallOpen(false)}
        title="Unlock All Syllabus Notes & Sections"
        subtitle="Free tier includes preview of Sections 1 & 2. Upgrade to ExamGlow Premium for unrestricted access to all 21+ chapters in every subject."
      />

      {activeChapter && selectedSubject && (
        <ChapterDoc
          chapter={activeChapter}
          allChapters={selectedSubject.chapters}
          color={selectedSubject.color}
          isPaid={isPaid}
          onUnlock={() => setPaywallOpen(true)}
          onBack={() => setActiveChapter(null)}
          onNext={openNext}
          onPrev={openPrev}
        />
      )}

      <DashboardLayout crumbs={[{ label: "Course" }, { label: "Syllabus Notes" }]}>
        {selectedSubject ? (
          <SubjectView
            subject={selectedSubject}
            onSelectChapter={(c) => setActiveChapter(c)}
            onBack={() => {
              setSelectedSubject(null);
              setActiveChapter(null);
            }}
          />
        ) : (
          <div className="mx-auto max-w-5xl py-2">
            {/* Header banner */}
            <div className="mb-8 rounded-3xl bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-emerald-500/10 border border-border p-6 sm:p-8">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                <BookOpen className="size-3.5" /> Cambridge IGCSE Syllabus Notes
              </span>
              <h1 className="mt-3 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
                Comprehensive Revision Notes
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                In-depth notes matching the official Cambridge IGCSE syllabuses. Includes mathematical formula renderings, step-by-step proofs, and syllabus topic coverage.
              </p>

              {/* Search */}
              <div className="relative mt-6 max-w-md">
                <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search subject or syllabus code (e.g. 0580, ICT, Math)..."
                  className="w-full rounded-2xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground focus:outline-none"
                />
              </div>
            </div>

            {/* Subject grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => setSelectedSubject(subject)}
                  className="flex flex-col items-start rounded-3xl border border-border bg-card p-6 text-left transition-all hover:-translate-y-1 hover:border-foreground/30 hover:shadow-md"
                >
                  <div className="flex w-full items-center justify-between">
                    <div className={`flex size-12 items-center justify-center rounded-2xl ${subject.color} text-white shadow-sm`}>
                      <BookOpen className="size-6" />
                    </div>
                    <span className="rounded-full bg-secondary px-2.5 py-1 font-mono text-xs font-semibold text-muted-foreground">
                      {subject.code}
                    </span>
                  </div>
                  <h2 className="mt-4 text-lg font-bold tracking-tight text-foreground">{subject.name}</h2>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {subject.chapters.length} comprehensive chapters
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 text-xs font-semibold text-primary">
                    Open notes <ChevronRight className="size-3.5" />
                  </span>
                </button>
              ))}
            </div>
          </div>
        )}
      </DashboardLayout>
    </>
  );
}
