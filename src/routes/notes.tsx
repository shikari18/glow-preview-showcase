import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen, ChevronRight, Search, ArrowLeft } from "lucide-react";
import { DashboardLayout, PageHeading } from "@/components/dashboard-page";
import { SYLLABUS_NOTES, type SubjectNotes, type Chapter } from "@/lib/syllabus-notes";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Syllabus Notes — Cambridge IGCSE | ExamGlow" },
      { name: "description", content: "Full chapter notes for every Cambridge IGCSE subject." },
    ],
  }),
  component: NotesPage,
});

// ─── Full chapter document ────────────────────────────────────────────────────

function ChapterDoc({ chapter, allChapters, color, onBack, onNext, onPrev }: {
  chapter: Chapter;
  allChapters: Chapter[];
  color: string;
  onBack: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  // Track which subheadings are collapsed
  const [collapsed, setCollapsed] = useState<Record<number, boolean>>({});
  const toggleCollapse = (i: number) =>
    setCollapsed(prev => ({ ...prev, [i]: !prev[i] }));

  const idx = allChapters.findIndex(c => c.number === chapter.number);
  const hasNext = idx < allChapters.length - 1;
  const hasPrev = idx > 0;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#f5f4ef] dark:bg-[#1a1a18]">
      {/* Top bar */}
      <div className="flex h-12 shrink-0 items-center gap-3 border-b border-black/10 bg-[#f5f4ef]/90 px-5 backdrop-blur dark:border-white/10 dark:bg-[#1a1a18]/90">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm text-black/50 hover:text-black transition-colors dark:text-white/50 dark:hover:text-white"
        >
          <ArrowLeft className="size-4" />
          <span className="hidden sm:inline">{allChapters.find(c => c.number === chapter.number - 1)?.title ?? "All chapters"}</span>
          <span className="sm:hidden">Back</span>
        </button>
        <div className="flex-1" />
        <span className="text-xs text-black/40 dark:text-white/40">
          {idx + 1} / {allChapters.length}
        </span>
      </div>

      {/* Scrollable document */}
      <div className="flex-1 overflow-y-auto">
        <article className="mx-auto max-w-5xl px-6 pb-24 pt-14 sm:px-12">

          {/* Chapter badge */}
          <div className={`mb-6 inline-flex size-14 items-center justify-center rounded-2xl ${color} text-2xl font-black text-white shadow-sm`}>
            {chapter.number}
          </div>

          {/* Big title — matches screenshot style */}
          <h1 className="text-[clamp(2rem,5vw,3rem)] font-black leading-[1.1] tracking-tight text-black dark:text-white">
            {chapter.title}
          </h1>

          {/* Introduction section */}
          <div className="mt-8">
            <h2 className="mb-3 text-lg font-bold text-black dark:text-white">Introduction</h2>
            <p className="text-[15px] leading-[1.8] text-black/70 dark:text-white/70">
              {chapter.intro}
            </p>
          </div>

          <div className="my-10 h-px bg-black/10 dark:bg-white/10" />

          {/* Subheadings */}
          {chapter.subheadings.map((sub, si) => {
            const isCollapsed = collapsed[si];
            return (
              <section key={si} className="mb-12">
                {/* Section header with collapse button */}
                <div className="flex items-start justify-between gap-4">
                  <h2 className="text-[1.4rem] font-black leading-snug text-black dark:text-white sm:text-[1.6rem]">
                    {sub.title}
                  </h2>
                  <button
                    type="button"
                    onClick={() => toggleCollapse(si)}
                    className="mt-1 shrink-0 rounded-full border border-black/15 px-3 py-1 text-xs font-medium text-black/50 hover:bg-black/5 dark:border-white/15 dark:text-white/50 dark:hover:bg-white/5"
                  >
                    {isCollapsed ? "Expand" : "Collapse"}
                  </button>
                </div>

                {!isCollapsed && (
                  <>
                    {/* Body paragraph */}
                    <p className="mt-4 text-[15px] leading-[1.8] text-black/70 dark:text-white/70">
                      {sub.body}
                    </p>

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
                            <li key={pi} className="flex gap-3 text-[15px] leading-[1.7] text-black/70 dark:text-white/70">
                              <span className="mt-[0.55rem] size-[5px] shrink-0 rounded-full bg-black/30 dark:bg-white/30" />
                              <span dangerouslySetInnerHTML={{
                                __html: pt
                                  .replace(/\*\*(.+?)\*\*/g, "<strong class='font-bold text-black dark:text-white'>$1</strong>")
                                  .replace(/\*(.+?)\*/g, "<em>$1</em>")
                              }} />
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
              className="flex items-center gap-2 rounded-full border border-black/15 px-5 py-2.5 text-sm font-medium text-black/60 hover:bg-black/5 dark:border-white/15 dark:text-white/60 dark:hover:bg-white/5"
            >
              <ArrowLeft className="size-4" />
              {hasPrev ? `Chapter ${chapter.number - 1}` : "All chapters"}
            </button>

            {hasNext ? (
              <button
                type="button"
                onClick={onNext}
                className={`flex items-center gap-2 rounded-full ${color} px-6 py-2.5 text-sm font-bold text-white shadow-sm hover:opacity-90`}
              >
                Next: Chapter {chapter.number + 1}
                <ChevronRight className="size-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={onBack}
                className={`flex items-center gap-2 rounded-full ${color} px-6 py-2.5 text-sm font-bold text-white shadow-sm hover:opacity-90`}
              >
                ✓ All chapters done
              </button>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}

// ─── Subject card (accordion — same as syllabus & past questions) ─────────────

function SubjectCard({ subject }: { subject: SubjectNotes }) {
  const [expanded, setExpanded] = useState(false); // collapsed by default
  const [activeIdx, setActiveIdx] = useState<number | null>(null);

  if (activeIdx !== null) {
    const chapter = subject.chapters[activeIdx]!;
    return (
      <ChapterDoc
        chapter={chapter}
        allChapters={subject.chapters}
        color={subject.color}
        onBack={() => setActiveIdx(null)}
        onNext={() => setActiveIdx(idx => (idx !== null && idx < subject.chapters.length - 1 ? idx + 1 : idx))}
        onPrev={() => setActiveIdx(idx => (idx !== null && idx > 0 ? idx - 1 : idx))}
      />
    );
  }

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-card">
      {/* Subject header — click anywhere to expand/collapse */}
      <button
        type="button"
        onClick={() => setExpanded(v => !v)}
        className="flex w-full items-center gap-3 border-b border-border px-5 py-4 text-left"
      >
        <span className={`size-3 rounded-full ${subject.color}`} />
        <h2 className="font-bold">{subject.name}</h2>
        <span className="font-mono text-xs text-muted-foreground">{subject.code}</span>
        <span className="ml-auto rounded-full bg-surface px-2.5 py-0.5 text-xs text-muted-foreground">
          {subject.chapters.length} chapters
        </span>
        <ChevronRight
          className={`ml-2 size-4 shrink-0 text-muted-foreground transition-transform duration-200 ${expanded ? "rotate-90" : ""}`}
        />
      </button>

      {/* Chapter rows — only shown when expanded */}
      {expanded && (
        <div className="px-4">
          {subject.chapters.map((ch, i) => (
            <button
              key={ch.number}
              type="button"
              onClick={() => setActiveIdx(i)}
              className="flex w-full items-center gap-3 border-b border-border py-3 text-left transition-colors hover:bg-surface/60 last:border-b-0"
            >
              <span className={`flex size-7 shrink-0 items-center justify-center rounded-lg ${subject.color} text-xs font-bold text-white`}>
                {ch.number}
              </span>
              <span className="flex-1 truncate text-sm font-medium text-foreground">{ch.title}</span>
              <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
            </button>
          ))}
        </div>
      )}
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function NotesPage() {
  const [search, setSearch] = useState("");

  const filtered = SYLLABUS_NOTES.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) || s.code.includes(search)
  );

  return (
    <DashboardLayout crumbs={[{ label: "Course" }, { label: "Syllabus Notes" }]}>
      {/* Hero */}
      <div className="mb-6 overflow-hidden rounded-3xl bg-gradient-to-br from-lavender/60 via-lilac/40 to-mint/50 px-6 py-8 sm:px-10">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Cambridge IGCSE</p>
            <h1 className="mt-1 text-3xl font-bold sm:text-4xl">Syllabus Notes</h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Full chapter notes — click any chapter to read
            </p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-2xl bg-card/70 px-5 py-3 backdrop-blur">
            <BookOpen className="size-5 text-muted-foreground" aria-hidden />
            <div>
              <p className="text-xl font-bold">{SYLLABUS_NOTES.length}</p>
              <p className="text-xs text-muted-foreground">Subjects</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative mb-6 sm:max-w-sm">
        <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <input
          type="search"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search subjects or codes…"
          className="w-full rounded-2xl border border-border bg-surface py-2.5 pl-10 pr-4 text-sm outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/20"
        />
      </div>

      {/* Subject sections */}
      <div className="space-y-4">
        {filtered.map(s => (
          <SubjectCard key={s.id} subject={s} />
        ))}
      </div>

      {/* Coming soon */}
      <div className="mt-6 rounded-2xl border border-border bg-surface/60 p-5">
        <p className="text-sm font-semibold">📚 Currently available: Biology (0610), Chemistry (0620), Physics (0625)</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Mathematics, Economics, Computer Science, Environmental Management and English notes coming soon.
        </p>
      </div>
    </DashboardLayout>
  );
}
