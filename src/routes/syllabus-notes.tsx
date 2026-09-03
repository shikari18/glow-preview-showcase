import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { BookOpen, ChevronRight, Search, ArrowLeft, Lock, Sparkles, Check } from "lucide-react";
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

// ─── Dot colours per category ─────────────────────────────────────────────────

const catDot: Record<string, string> = {
  Sciences:               "bg-emerald-500",
  Mathematics:            "bg-blue-500",
  English:                "bg-violet-500",
  Languages:              "bg-pink-500",
  "Business & Economics": "bg-amber-500",
  Humanities:             "bg-orange-500",
  Technology:             "bg-cyan-500",
};

// ─── Full chapter document ────────────────────────────────────────────────────

function ChapterDoc({
  chapter,
  allChapters,
  color,
  onBack,
  onNext,
  onPrev,
}: {
  chapter: Chapter;
  allChapters: Chapter[];
  color: string;
  onBack: () => void;
  onNext: () => void;
  onPrev: () => void;
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

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#faf9f5] dark:bg-[#181816]">
      {/* Top navigation bar */}
      <div className="flex h-13 shrink-0 items-center gap-3 border-b border-black/10 bg-[#faf9f5]/90 px-6 backdrop-blur dark:border-white/10 dark:bg-[#181816]/90">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-medium text-black/70 hover:text-black transition-colors dark:text-white/70 dark:hover:text-white"
        >
          <ArrowLeft className="size-4" />
          <span>Back to chapters</span>
        </button>
        <div className="flex-1" />
        <span className="text-xs font-mono text-black/50 dark:text-white/50">
          Chapter {chapter.number} of {allChapters.length}
        </span>
      </div>

      {/* Scrollable document */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <article className="mx-auto max-w-4xl px-6 pb-28 pt-12 sm:px-12">
          {/* Chapter badge */}
          <div
            className={`mb-6 inline-flex size-14 items-center justify-center rounded-2xl ${color} text-2xl font-black text-white shadow-sm`}
          >
            {chapter.number}
          </div>

          {/* Big serif title */}
          <h1 className="font-serif text-[clamp(2.2rem,5vw,3.2rem)] font-bold leading-[1.15] tracking-tight text-foreground">
            {chapter.title}
          </h1>

          {/* Introduction section */}
          <div className="mt-8 rounded-3xl border border-border bg-card/60 p-6 sm:p-7">
            <h2 className="mb-2 font-serif text-lg font-bold text-foreground">Chapter Overview</h2>
            <div
              className="text-[15px] leading-[1.8] text-foreground/80"
              dangerouslySetInnerHTML={{ __html: formatMathAndMarkdown(chapter.intro) }}
            />
          </div>

          <div className="my-10 h-px bg-border" />

          {/* Subheadings */}
          {chapter.subheadings.map((sub, si) => {
            const isCollapsed = collapsed[si];

            return (
              <section key={si} className="mb-12">
                {/* Section header */}
                <div className="flex items-start justify-between gap-4 border-b border-border/60 pb-3">
                  <h2 className="font-serif text-[1.45rem] font-bold leading-snug text-foreground sm:text-[1.65rem]">
                    {sub.title}
                  </h2>
                  <button
                    type="button"
                    onClick={() => toggleCollapse(si)}
                    className="mt-1 shrink-0 rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground hover:bg-secondary"
                  >
                    {isCollapsed ? "Expand" : "Collapse"}
                  </button>
                </div>

                {!isCollapsed && (
                  <>
                    {/* Body paragraph */}
                    <div
                      className="mt-4 text-[15px] leading-[1.8] text-foreground/85"
                      dangerouslySetInnerHTML={{ __html: formatMathAndMarkdown(sub.body) }}
                    />

                    {/* Bullet groups */}
                    {sub.groups.map((grp, gi) => (
                      <div key={gi} className="mt-6">
                        {grp.subTitle && (
                          <h3 className="mb-3 font-serif text-[16px] font-bold text-foreground">
                            {grp.subTitle}
                          </h3>
                        )}
                        <ul className="space-y-3">
                          {grp.bullets.map((pt, pi) => (
                            <li key={pi} className="flex gap-3 text-[15px] leading-[1.7] text-foreground/85">
                              <span className="mt-[0.55rem] size-[6px] shrink-0 rounded-full bg-primary/60" />
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
              </section>
            );
          })}

          {/* Bottom navigation */}
          <div className="mt-12 flex items-center justify-between gap-4 border-t border-border pt-8">
            <button
              type="button"
              onClick={hasPrev ? onPrev : onBack}
              className="flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-medium text-foreground hover:bg-secondary transition-colors"
            >
              <ArrowLeft className="size-4" />
              <span>{hasPrev ? "Previous chapter" : "Back to subject"}</span>
            </button>
            {hasNext && (
              <button
                type="button"
                onClick={onNext}
                className="flex items-center gap-2 rounded-full bg-foreground px-6 py-2.5 text-sm font-semibold text-background shadow-md transition-transform hover:-translate-y-0.5"
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

// ─── Subject chapter list view (Matches media_1788464621130.png) ──────────────

function SubjectView({
  subject,
  isPaid,
  onSelectChapter,
  onLockedChapterClick,
  onBack,
}: {
  subject: SubjectNotes;
  isPaid: boolean;
  onSelectChapter: (c: Chapter) => void;
  onLockedChapterClick: (c: Chapter) => void;
  onBack: () => void;
}) {
  return (
    <div className="mx-auto max-w-4xl py-2">
      {/* Back button */}
      <button
        onClick={onBack}
        className="mb-6 flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-4" /> Back to all subjects
      </button>

      {/* Subject Header */}
      <div className="mb-8 flex items-start gap-4">
        <div className={`flex size-14 shrink-0 items-center justify-center rounded-2xl ${subject.color} text-white shadow-md`}>
          <BookOpen className="size-7" />
        </div>
        <div>
          <span className="font-mono text-xs font-semibold text-muted-foreground">
            Cambridge IGCSE {subject.code}
          </span>
          <h1 className="font-serif text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            {subject.name}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {subject.chapters.length} chapters · complete curriculum coverage
          </p>
        </div>
      </div>

      {/* Chapter cards list */}
      <div className="space-y-3">
        {subject.chapters.map((ch) => {
          // Chapter 1 & 2 are free. Chapter 3 and beyond are locked for unpaid users.
          const isLocked = !isPaid && ch.number >= 3;

          return (
            <button
              key={ch.number}
              type="button"
              onClick={() => {
                if (isLocked) {
                  onLockedChapterClick(ch);
                } else {
                  onSelectChapter(ch);
                }
              }}
              className={`flex w-full items-start gap-4 rounded-[22px] border p-5 text-left transition-all hover:shadow-sm ${
                isLocked
                  ? "border-amber-500/30 bg-card/60 hover:bg-amber-500/[0.03]"
                  : "border-border bg-card hover:-translate-y-0.5 hover:border-foreground/30"
              }`}
            >
              {/* Left icon circle */}
              <div
                className={`flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-bold shadow-sm ${
                  isLocked
                    ? "bg-amber-500/15 text-amber-600 dark:text-amber-400"
                    : `${subject.color} text-white`
                }`}
              >
                {isLocked ? <Lock className="size-4.5" /> : ch.number}
              </div>

              {/* Text content */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h2 className="font-serif text-base font-bold text-foreground sm:text-lg">
                    {ch.title}
                  </h2>
                  {isLocked && (
                    <span className="flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
                      <Lock className="size-2.5" /> Locked
                    </span>
                  )}
                </div>

                <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {ch.intro}
                </p>

                <p className="mt-2 text-[11px] font-medium text-muted-foreground/80">
                  {ch.subheadings.length} sections: {ch.subheadings.map((s) => s.title).join(" · ")}
                </p>
              </div>

              {/* Right icon */}
              <div className="shrink-0 pt-1">
                {isLocked ? (
                  <span className="rounded-full bg-foreground px-3 py-1 text-xs font-semibold text-background shadow-sm">
                    Unlock
                  </span>
                ) : (
                  <ChevronRight className="size-5 text-muted-foreground/60" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

// ─── Main page (Matches media_1788464574449.png) ──────────────────────────────

function SyllabusNotesPage() {
  const [selectedSubject, setSelectedSubject] = useState<SubjectNotes | null>(null);
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [paywallOpen, setPaywallOpen] = useState(false);
  const [paywallData, setPaywallData] = useState<{ title?: string; subtitle?: string }>({});
  const [isPaid, setIsPaid] = useState(false);

  useEffect(() => {
    setIsPaid(isPaidUser());
  }, []);

  const categories = ["All", "Sciences", "Mathematics", "English", "Business & Economics", "Humanities", "Technology"];

  const getSubjectCategory = (code: string): string => {
    if (["0610", "0620", "0625", "0680"].includes(code)) return "Sciences";
    if (["0580", "0606"].includes(code)) return "Mathematics";
    if (["0500", "0510", "0475"].includes(code)) return "English";
    if (["0455", "0450", "0452"].includes(code)) return "Business & Economics";
    if (["0470", "0460", "0495", "0490"].includes(code)) return "Humanities";
    if (["0417", "0478"].includes(code)) return "Technology";
    return "Sciences";
  };

  const filtered = SYLLABUS_NOTES.filter((s) => {
    const matchCat = activeCategory === "All" || getSubjectCategory(s.code) === activeCategory;
    const matchSearch =
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.code.includes(search);
    return matchCat && matchSearch;
  });

  const openNext = () => {
    if (!selectedSubject || !activeChapter) return;
    const idx = selectedSubject.chapters.findIndex((c) => c.number === activeChapter.number);
    const nextCh = selectedSubject.chapters[idx + 1];
    if (!nextCh) return;

    // Strict lock check for next chapter navigation
    if (!isPaid && nextCh.number >= 3) {
      setPaywallData({
        title: `Chapter ${nextCh.number} is Locked`,
        subtitle:
          "Free preview covers Chapters 1 & 2. Upgrade to ExamGlow Premium to continue reading Chapter 3 and all remaining topics.",
      });
      setPaywallOpen(true);
      return;
    }
    setActiveChapter(nextCh);
  };

  const openPrev = () => {
    if (!selectedSubject || !activeChapter) return;
    const idx = selectedSubject.chapters.findIndex((c) => c.number === activeChapter.number);
    if (idx > 0) {
      setActiveChapter(selectedSubject.chapters[idx - 1]!);
    }
  };

  const handleLockedChapterClick = (ch: Chapter) => {
    setPaywallData({
      title: `Unlock Chapter ${ch.number}: ${ch.title}`,
      subtitle:
        "Chapters 1 & 2 are free to preview. Upgrade to ExamGlow Premium to unlock all chapters, diagrams, formulas, and mark schemes.",
    });
    setPaywallOpen(true);
  };

  return (
    <>
      <PaywallModal
        open={paywallOpen}
        onClose={() => setPaywallOpen(false)}
        title={paywallData.title ?? "Unlock Full Chapter Access"}
        subtitle={
          paywallData.subtitle ??
          "Chapters 1 & 2 are free to preview. Upgrade to ExamGlow Premium to unlock Chapter 3 and all remaining syllabus notes."
        }
      />

      {activeChapter && selectedSubject && (
        <ChapterDoc
          chapter={activeChapter}
          allChapters={selectedSubject.chapters}
          color={selectedSubject.color}
          onBack={() => setActiveChapter(null)}
          onNext={openNext}
          onPrev={openPrev}
        />
      )}

      <DashboardLayout crumbs={[{ label: "Course" }, { label: "Syllabus Notes" }]}>
        {selectedSubject ? (
          <SubjectView
            subject={selectedSubject}
            isPaid={isPaid}
            onSelectChapter={(c) => setActiveChapter(c)}
            onLockedChapterClick={handleLockedChapterClick}
            onBack={() => {
              setSelectedSubject(null);
              setActiveChapter(null);
            }}
          />
        ) : (
          <div className="mx-auto max-w-6xl py-2">
            {/* Hero banner matching syllabus & past-questions */}
            <div className="mb-6 overflow-hidden rounded-3xl bg-gradient-to-br from-lavender/60 via-lilac/40 to-mint/50 px-6 py-8 sm:px-10">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    Cambridge IGCSE
                  </p>
                  <h1 className="mt-1 font-serif text-3xl font-bold sm:text-4xl text-foreground">
                    Syllabus Notes
                  </h1>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {SYLLABUS_NOTES.length} subjects · complete chapter notes with KaTeX formulas and diagrams
                  </p>
                </div>
                <div className="flex shrink-0 items-center gap-2 rounded-2xl bg-card/70 px-5 py-3 backdrop-blur shadow-sm">
                  <BookOpen className="size-5 text-muted-foreground" aria-hidden />
                  <div>
                    <p className="text-xl font-bold">{SYLLABUS_NOTES.length}</p>
                    <p className="text-xs text-muted-foreground">Subjects</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Search + Category Filter Bar */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="relative flex-1 sm:max-w-xs">
                <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search subjects or codes…"
                  className="w-full rounded-2xl border border-border bg-card py-2.5 pl-10 pr-4 text-sm outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/20"
                />
              </div>
              <div className="flex gap-2 overflow-x-auto pb-0.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                      activeCategory === cat
                        ? "bg-ink text-ink-foreground"
                        : "bg-card text-muted-foreground hover:bg-secondary hover:text-foreground border border-border"
                    }`}
                  >
                    {cat !== "All" && catDot[cat] && (
                      <span className={`size-2 rounded-full ${catDot[cat]}`} />
                    )}
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Subject grid matching media_1788464574449.png */}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((subject) => (
                <button
                  key={subject.id}
                  type="button"
                  onClick={() => setSelectedSubject(subject)}
                  className="group flex flex-col items-start rounded-[26px] border border-border/80 bg-card p-6 shadow-sm transition-all hover:-translate-y-1 hover:border-foreground/30 hover:shadow-md text-left"
                >
                  <div className="flex w-full items-center justify-between">
                    <div className={`flex size-12 items-center justify-center rounded-full ${subject.color} text-white shadow-sm`}>
                      <BookOpen className="size-5.5" />
                    </div>
                    <span className="rounded-full bg-secondary px-2.5 py-0.5 font-mono text-xs font-semibold text-muted-foreground">
                      {subject.code}
                    </span>
                  </div>

                  <h2 className="mt-4 font-serif text-xl font-bold tracking-tight text-foreground">
                    {subject.name}
                  </h2>

                  <p className="mt-1 text-xs text-muted-foreground">
                    {subject.chapters.length} comprehensive chapters
                  </p>

                  <span className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-foreground group-hover:text-primary transition-colors">
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
