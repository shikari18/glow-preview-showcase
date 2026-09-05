import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, useRef } from "react";
import { BookOpen, ChevronRight, Search, ArrowLeft, FileText, Check, Volume2, VolumeX, Loader2, Play, Pause, SkipBack, SkipForward, X } from "lucide-react";
import { DashboardLayout } from "@/components/dashboard-page";
import { playRealisticVoice, stopRealisticVoice, pauseRealisticVoice, resumeRealisticVoice, preloadGeminiSpeech, cleanSpeechText } from "@/lib/gemini-tts";
import type { SubjectNotes, Chapter } from "@/lib/notes/types";
import { SYLLABUS_NOTES } from "@/lib/syllabus-notes";
import { formatMathAndMarkdown } from "@/lib/render-math";
import { getChapterDiagramSvg } from "@/lib/diagrams";

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

// ─── Full chapter document reader & 20-Min Yumna Masterclass Player ───────────

const TOTAL_LECTURE_SECONDS = 1200; // 20:00 exactly

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

type LectureSection = {
  title: string;
  tag: string;
  script: string;
};

function build20MinChapterLecture(chap: Chapter): LectureSection[] {
  const sections: LectureSection[] = [];
  const cleanIntro = cleanSpeechText(chap.intro);

  // 1. Welcome & Orientation
  sections.push({
    title: "Masterclass Kickoff & Big Picture",
    tag: "Part 1: Orientation",
    script: `Hello and welcome to your complete twenty-minute deep-dive masterclass for Chapter ${chap.number}: ${chap.title}. I am Yumna, your tutor. Over the next twenty minutes, we aren't just reading through notes. We are going to unpack, analyze, and truly understand how every concept functions. Get ready to master this topic.`,
  });

  // 2. Real-world relevance
  sections.push({
    title: "Why This Concept Exists in the Real World",
    tag: "Part 2: Motivation",
    script: `Let's start by answering the question every student asks: why does this topic matter? In the Cambridge syllabus, ${chap.title} is essential because it forms the baseline for how modern systems and natural laws operate. Specifically, ${cleanIntro.slice(0, 220)}. When you grasp the reason behind it, everything falls into place.`,
  });

  // 3. Decoding first principles
  sections.push({
    title: "First Principles & Fundamental Definitions",
    tag: "Part 3: Definitions",
    script: `Now let's decode the core foundation. Don't worry about memorizing dry jargon. Focus on the core definition: ${cleanIntro.slice(0, 200)}. When an examiner asks for this in Section A of your paper, stating this definition clearly earns your very first marks.`,
  });

  // 4. Subheadings deep elaboration
  chap.subheadings.forEach((sub, sIdx) => {
    const cleanBody = cleanSpeechText(sub.body);
    const bullets = sub.groups
      .flatMap((g) => g.bullets)
      .map((b) => cleanSpeechText(b))
      .filter(Boolean);

    // Concept Exploration
    sections.push({
      title: `${sub.title}: Concept Breakdown`,
      tag: `Topic ${sIdx + 1}A`,
      script: `Let's move into our next key topic: ${sub.title}. Let's break down how this actually works. ${cleanBody.slice(0, 220)}. Notice the cause and effect here. When one factor changes, it directly influences the surrounding mechanism. Keep that relationship clearly in mind.`,
    });

    // Practical worked examples & key bullet points
    if (bullets.length > 0) {
      const topBullets = bullets.slice(0, 2).join(". ");
      sections.push({
        title: `${sub.title}: Key Syllabus Points`,
        tag: `Topic ${sIdx + 1}B`,
        script: `Let's look at the crucial details for ${sub.title}. Cambridge mark schemes require specific elements: ${topBullets}. When answering exam questions, make sure to state both the action and the consequence to secure full marks.`,
      });
    }

    // Examiner Traps for this subtopic
    sections.push({
      title: `${sub.title}: Examiner Pitfalls`,
      tag: `Topic ${sIdx + 1}C`,
      script: `Here is an examiner secret regarding ${sub.title}. Many students confuse similar terms or give half-answers without units. Remember: always write out your reasoning step-by-step so the examiner can award you every single method mark.`,
    });
  });

  // 5. Connecting the entire chapter together
  sections.push({
    title: "System Integration: Connecting All Concepts",
    tag: "Synthesis",
    script: `Now that we have analyzed the individual sections of Chapter ${chap.number}, let's look at how they connect as one unified system. If you alter the initial conditions of ${chap.title}, how does that trigger changes throughout the entire process? Being able to link these ideas is what separates an A grade from an A star.`,
  });

  // 6. Exam question strategy & structuring
  sections.push({
    title: "Exam Question Walkthrough & Model Answers",
    tag: "Exam Strategy",
    script: `Let's simulate a real Cambridge examination scenario for ${chap.title}. Picture a four-mark question. How do you structure your answer? Step one: state the precise definition. Step two: describe the step-by-step mechanism. Step three: conclude with the result. Following this formula guarantees maximum marks every time.`,
  });

  // 7. Diagram & Visual Representation Mastery
  sections.push({
    title: "Diagram & Visual Representation Mastery",
    tag: "Diagrams",
    script: `Pay close attention to the diagrams in Chapter ${chap.number}. In the exam hall, examiners frequently ask you to label or interpret diagrams. Make sure you can sketch this from memory, label every key part accurately, and explain what each structure does.`,
  });

  // 8. Rapid Recall Checkpoint
  sections.push({
    title: "Rapid Recall & Mental Recall Checkpoint",
    tag: "Recall Drill",
    script: `Let's do a quick mental recall checkpoint. Pause and ask yourself: what is the single most important rule we learned about ${chap.title}? If you can explain it in your own words, you truly understand it. You are doing fantastic work today.`,
  });

  // 9. Final 20-minute masterclass conclusion
  sections.push({
    title: "20-Minute Masterclass Conclusion & Success",
    tag: "Completion",
    script: `Congratulations! You have completed your full twenty-minute masterclass on Chapter ${chap.number}: ${chap.title}. You have covered the theory, the mechanisms, the practical applications, and the examiner secrets. You are thoroughly prepared to excel. Keep up this magnificent dedication with Yumna!`,
  });

  return sections;
}

function ChapterDoc({
  chapter,
  allChapters,
  color,
  subjectId,
  onBack,
  onNext,
  onPrev,
}: {
  chapter: Chapter;
  allChapters: Chapter[];
  color: string;
  subjectId: string;
  onBack: () => void;
  onNext: () => void;
  onPrev: () => void;
}) {
  const [collapsed, setCollapsed] = useState<Record<number, boolean>>({});
  const [isLectureActive, setIsLectureActive] = useState(false);
  const [lectureSectionIdx, setLectureSectionIdx] = useState(0);
  const [isVoiceLoading, setIsVoiceLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lectureSectionsRef = useRef<LectureSection[]>([]);
  const currentSectionRef = useRef<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const toggleCollapse = (i: number) =>
    setCollapsed((prev) => ({ ...prev, [i]: !prev[i] }));

  const idx = allChapters.findIndex((c) => c.number === chapter.number);
  const hasNext = idx < allChapters.length - 1;
  const hasPrev = idx > 0;

  // 20-minute timer ticker
  useEffect(() => {
    if (isPlaying && !isPaused && isLectureActive) {
      timerRef.current = setInterval(() => {
        setElapsedSeconds((prev) => {
          if (prev >= TOTAL_LECTURE_SECONDS - 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            stopRealisticVoice();
            setIsPlaying(false);
            setIsPaused(false);
            return TOTAL_LECTURE_SECONDS;
          }
          return prev + 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isPlaying, isPaused, isLectureActive]);

  function playSection(index: number, sections: LectureSection[]) {
    if (index < 0 || index >= sections.length) {
      if (elapsedSeconds < TOTAL_LECTURE_SECONDS - 30) {
        playSection(Math.max(0, sections.length - 4), sections);
        return;
      }
      setIsPlaying(false);
      setIsPaused(false);
      setIsVoiceLoading(false);
      setIsLectureActive(false);
      stopRealisticVoice();
      return;
    }

    currentSectionRef.current = index;
    setLectureSectionIdx(index);
    setIsVoiceLoading(true);
    setIsPlaying(false);
    setIsPaused(false);

    const section = sections[index];
    if (!section) {
      setIsPlaying(false);
      setIsPaused(false);
      setIsVoiceLoading(false);
      setIsLectureActive(false);
      return;
    }

    // Preload next section in background
    const nextSection = sections[index + 1];
    if (nextSection) {
      void preloadGeminiSpeech(nextSection.script);
    }

    playRealisticVoice(section.script, {
      onStart: () => {
        setIsVoiceLoading(false);
        setIsPlaying(true);
        setIsPaused(false);
      },
      onEnd: () => {
        const nextIdx = currentSectionRef.current + 1;
        if (nextIdx < sections.length) {
          playSection(nextIdx, sections);
        } else if (elapsedSeconds < TOTAL_LECTURE_SECONDS - 30) {
          playSection(Math.max(0, sections.length - 4), sections);
        } else {
          setIsPlaying(false);
          setIsPaused(false);
          setIsVoiceLoading(false);
          setIsLectureActive(false);
        }
      },
      onError: () => {
        setIsVoiceLoading(false);
        setIsPlaying(false);
        setIsPaused(false);
      },
    });
  }

  function handleStartLecture() {
    if (isLectureActive) {
      if (isPaused) {
        resumeRealisticVoice();
        setIsPaused(false);
        setIsPlaying(true);
      } else if (isPlaying) {
        pauseRealisticVoice();
        setIsPaused(true);
        setIsPlaying(false);
      }
      return;
    }

    const sections = build20MinChapterLecture(chapter);
    lectureSectionsRef.current = sections;
    setIsLectureActive(true);
    setElapsedSeconds(0);
    playSection(0, sections);
  }

  function handlePause() {
    pauseRealisticVoice();
    setIsPaused(true);
    setIsPlaying(false);
  }

  function handleResume() {
    resumeRealisticVoice();
    setIsPaused(false);
    setIsPlaying(true);
  }

  function handleStop() {
    stopRealisticVoice();
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setIsLectureActive(false);
    setIsPlaying(false);
    setIsPaused(false);
    setIsVoiceLoading(false);
    setElapsedSeconds(0);
  }

  function handleNextSection() {
    const sections = lectureSectionsRef.current;
    if (currentSectionRef.current + 1 < sections.length) {
      stopRealisticVoice();
      playSection(currentSectionRef.current + 1, sections);
    }
  }

  function handlePrevSection() {
    const sections = lectureSectionsRef.current;
    if (currentSectionRef.current > 0) {
      stopRealisticVoice();
      playSection(currentSectionRef.current - 1, sections);
    }
  }

  useEffect(() => {
    return () => {
      stopRealisticVoice();
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [chapter.number]);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.dataset["readingChapter"] = "true";
    return () => {
      delete document.body.dataset["readingChapter"];
      stopRealisticVoice();
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
    setCollapsed({});
    handleStop();
  }, [chapter.number]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#faf9f5] dark:bg-[#181816]">
      {/* Top navigation bar */}
      <div className="flex h-13 shrink-0 items-center gap-3 border-b border-black/10 bg-[#faf9f5]/90 px-6 backdrop-blur dark:border-white/10 dark:bg-[#181816]/90">
        <button
          onClick={() => {
            handleStop();
            onBack();
          }}
          className="flex items-center gap-2 text-sm font-medium text-black/70 hover:text-black transition-colors dark:text-white/70 dark:hover:text-white"
        >
          <ArrowLeft className="size-4" />
          <span>Back to chapters</span>
        </button>
        <div className="flex-1" />
        <button
          type="button"
          onClick={handleStartLecture}
          className={`flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold transition-all shadow-sm ${
            isVoiceLoading
              ? "bg-primary/20 text-primary cursor-wait"
              : isPlaying
              ? "bg-primary text-primary-foreground animate-pulse"
              : isPaused
              ? "bg-amber-500 text-white"
              : "bg-foreground text-background hover:opacity-90"
          }`}
        >
          {isVoiceLoading ? (
            <>
              <Loader2 className="size-3.5 animate-spin" />
              <span>Preparing 20-Min Lesson...</span>
            </>
          ) : isPlaying ? (
            <>
              <Pause className="size-3.5 fill-current" />
              <span>Pause ({formatTime(elapsedSeconds)} / 20:00)</span>
            </>
          ) : isPaused ? (
            <>
              <Play className="size-3.5 fill-current" />
              <span>Resume ({formatTime(elapsedSeconds)} / 20:00)</span>
            </>
          ) : (
            <>
              <Volume2 className="size-3.5" />
              <span>Teach Me (20 Min)</span>
            </>
          )}
        </button>
        <span className="text-xs font-mono text-black/50 dark:text-white/50 ml-2">
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

          {/* Chapter Concept & Scientific Diagram */}
          <div className="mt-8 overflow-hidden rounded-3xl border border-border bg-card p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between border-b border-border pb-2 text-xs font-semibold text-muted-foreground">
              <span>Concept Diagram · Chapter {chapter.number}</span>
              <span className="rounded-full bg-secondary px-2.5 py-0.5 text-[11px] font-bold text-foreground">Cambridge Syllabus Diagram</span>
            </div>
            <div
              className="w-full overflow-x-auto"
              dangerouslySetInnerHTML={{ __html: getChapterDiagramSvg(subjectId, chapter.number) }}
            />
          </div>

          <div className="my-10 h-px bg-border" />

          {/* Subheadings */}
          {chapter.subheadings.map((sub, si) => {
            const isCollapsed = collapsed[si];

            return (
              <section key={si} className="mb-12">
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
                    <div
                      className="mt-4 text-[15px] leading-[1.8] text-foreground/85"
                      dangerouslySetInnerHTML={{ __html: formatMathAndMarkdown(sub.body) }}
                    />

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

      {/* Floating 20-Min Yumna Masterclass Audio Player */}
      {isLectureActive && (
        <div className="fixed bottom-6 inset-x-4 max-w-2xl mx-auto z-50 animate-in fade-in slide-in-from-bottom-5 duration-300">
          <div className="relative overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-[#faf9f5]/95 dark:bg-[#1f1f1d]/95 backdrop-blur-xl shadow-2xl p-4 text-foreground">
            {/* Top progress bar for 20-minute lecture */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-black/5 dark:bg-white/5">
              <div
                className="h-full bg-primary transition-all duration-300"
                style={{
                  width: `${Math.min(100, (elapsedSeconds / TOTAL_LECTURE_SECONDS) * 100)}%`,
                }}
              />
            </div>

            <div className="flex items-center gap-3.5">
              {/* Status icon */}
              <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 border border-primary/20 text-primary">
                {isVoiceLoading ? (
                  <Loader2 className="size-5 animate-spin" />
                ) : isPlaying ? (
                  <Volume2 className="size-5 animate-bounce" />
                ) : (
                  <Pause className="size-5" />
                )}
              </div>

              {/* Title & Section details */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-primary">
                    20-Min Yumna Masterclass
                  </span>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-mono font-bold text-primary">
                    {formatTime(elapsedSeconds)} / 20:00
                  </span>
                </div>
                <p className="truncate text-xs font-semibold text-foreground">
                  {lectureSectionsRef.current[lectureSectionIdx]?.title || chapter.title}
                </p>
                <p className="truncate text-[11px] text-muted-foreground">
                  {isVoiceLoading
                    ? "Connecting to Yumna's realistic tutor voice..."
                    : isPaused
                    ? `Paused at ${formatTime(elapsedSeconds)} — click Resume`
                    : `Topic ${lectureSectionIdx + 1} of ${lectureSectionsRef.current.length} · In-depth 20-min walkthrough`}
                </p>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-1.5 shrink-0">
                {/* Prev section */}
                <button
                  type="button"
                  onClick={handlePrevSection}
                  disabled={lectureSectionIdx === 0}
                  className="size-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="Previous Topic"
                >
                  <SkipBack className="size-4" />
                </button>

                {/* Play / Pause / Loading button */}
                {isVoiceLoading ? (
                  <button
                    type="button"
                    disabled
                    className="size-10 rounded-full bg-primary/20 text-primary flex items-center justify-center animate-pulse cursor-wait"
                    title="Loading voice..."
                  >
                    <Loader2 className="size-4 animate-spin" />
                  </button>
                ) : isPaused ? (
                  <button
                    type="button"
                    onClick={handleResume}
                    className="size-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 active:scale-95 shadow-md transition-all"
                    title="Resume 20-min lecture"
                  >
                    <Play className="size-4 fill-current ml-0.5" />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handlePause}
                    className="size-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center hover:scale-105 active:scale-95 shadow-md transition-all"
                    title="Pause lecture"
                  >
                    <Pause className="size-4 fill-current" />
                  </button>
                )}

                {/* Next section */}
                <button
                  type="button"
                  onClick={handleNextSection}
                  disabled={lectureSectionIdx === lectureSectionsRef.current.length - 1}
                  className="size-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-black/5 dark:hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  title="Next Topic"
                >
                  <SkipForward className="size-4" />
                </button>

                {/* Stop / Close button */}
                <button
                  type="button"
                  onClick={handleStop}
                  className="size-8 rounded-full flex items-center justify-center text-muted-foreground hover:text-rose-500 hover:bg-rose-500/10 transition-colors ml-1"
                  title="End lecture"
                >
                  <X className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Teach Me Voice Button (when lecture bar is not active) */}
      {!isLectureActive && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            type="button"
            onClick={handleStartLecture}
            className="flex items-center gap-2.5 rounded-full px-5 py-3 text-sm font-bold shadow-2xl transition-all hover:scale-105 active:scale-95 bg-foreground text-background"
          >
            <Volume2 className="size-4" />
            <span>Teach Me This Chapter (20 Min)</span>
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Horizontal Line Row Component (Matches syllabus & past-questions line UI) ─

function SubjectNoteRow({
  subject,
  onSelectChapter,
}: {
  subject: SubjectNotes;
  onSelectChapter: (c: Chapter) => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-border/80 last:border-b-0">
      {/* Clickable horizontal line row */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 py-3.5 text-sm text-muted-foreground hover:text-foreground transition-colors text-left"
      >
        <ChevronRight
          className={`size-4 shrink-0 transition-transform duration-200 ${open ? "rotate-90 text-foreground" : ""}`}
        />
        <div className={`size-2.5 rounded-full ${subject.color}`} />
        <span className="font-bold text-foreground">{subject.name}</span>
        <span className="font-mono text-xs">{subject.code}</span>
        <span className="text-xs">
          {subject.chapters.length} comprehensive chapter{subject.chapters.length > 1 ? "s" : ""}
        </span>
        <div className="flex-1" />
        <span className="text-xs font-semibold text-muted-foreground/70">
          {open ? "Hide chapters" : "View chapters"}
        </span>
      </button>

      {/* Expanded chapter list in clean horizontal lines */}
      {open && (
        <div className="pb-4 pt-2 pl-6 sm:pl-8 space-y-2">
          {subject.chapters.map((ch) => (
            <button
              key={ch.number}
              type="button"
              onClick={() => onSelectChapter(ch)}
              className="flex w-full items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-left transition-all hover:-translate-y-0.5 hover:border-foreground/30 hover:shadow-sm"
            >
              {/* Chapter number */}
              <div
                className={`flex size-7 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${subject.color} text-white`}
              >
                {ch.number}
              </div>

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold text-foreground">
                  {ch.title}
                </p>
                <p className="truncate text-xs text-muted-foreground mt-0.5">
                  {ch.subheadings.length} sections · {ch.subheadings.map((s) => s.title).slice(0, 3).join(", ")}...
                </p>
              </div>

              <span className="text-xs font-semibold text-muted-foreground group-hover:text-foreground">
                Read note →
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main Syllabus Notes Page ─────────────────────────────────────────────────

function SyllabusNotesPage() {
  const [selectedSubject, setSelectedSubject] = useState<SubjectNotes | null>(null);
  const [activeChapter, setActiveChapter] = useState<Chapter | null>(null);
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

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

  // Group by category like syllabus.tsx
  const grouped = categories
    .filter((c) => c !== "All")
    .map((cat) => ({
      cat,
      subjects: filtered.filter((s) => getSubjectCategory(s.code) === cat),
    }))
    .filter((g) => g.subjects.length > 0);

  const openNext = () => {
    if (!selectedSubject || !activeChapter) return;
    const idx = selectedSubject.chapters.findIndex((c) => c.number === activeChapter.number);
    const nextCh = selectedSubject.chapters[idx + 1];
    if (!nextCh) return;
    setActiveChapter(nextCh);
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

      {activeChapter && selectedSubject && (
        <ChapterDoc
          chapter={activeChapter}
          allChapters={selectedSubject.chapters}
          color={selectedSubject.color}
          subjectId={selectedSubject.id}
          onBack={() => setActiveChapter(null)}
          onNext={openNext}
          onPrev={openPrev}
        />
      )}

      <DashboardLayout crumbs={[{ label: "Course" }, { label: "Syllabus Notes" }]}>
        <div className="w-full py-2">
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
                  {SYLLABUS_NOTES.length} subjects · click any line to view comprehensive chapter notes
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

          {/* Line-by-line accordion rows grouped by category (Matches syllabus & past-questions line UI) */}
          {grouped.length === 0 ? (
            <div className="mt-20 text-center">
              <BookOpen className="mx-auto size-12 text-muted-foreground/50" />
              <p className="mt-4 text-base font-semibold">No notes found</p>
              <p className="mt-1 text-sm text-muted-foreground">Try adjusting your search or category filter.</p>
            </div>
          ) : (
            grouped.map(({ cat, subjects }) => (
              <div key={cat} className="mb-8">
                <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {cat}
                </h2>
                <div className="divide-y divide-border rounded-2xl border border-border bg-card px-5">
                  {subjects.map((subject) => (
                    <SubjectNoteRow
                      key={subject.id}
                      subject={subject}
                      onSelectChapter={(c) => {
                        setSelectedSubject(subject);
                        setActiveChapter(c);
                      }}
                    />
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </DashboardLayout>
    </>
  );
}
