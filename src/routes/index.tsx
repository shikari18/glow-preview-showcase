import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "motion/react";

import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import heroDoodle from "@/assets/hero-doodle.png";
import birdsDoodle from "@/assets/birds-doodle.png";
import studentsGrass from "@/assets/students-grass.jpg";
import studentDesk from "@/assets/student-desk.jpg";
import avatar1 from "@/assets/avatar-1.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ExamGlow — Learning that adapts to you" },
      {
        name: "description",
        content:
          "ExamGlow turns your notes, slides and syllabi into personalized study plans, tutoring, practice tests and games. Trusted by 8M+ students.",
      },
      { property: "og:title", content: "ExamGlow — Learning that adapts to you" },
      {
        property: "og:description",
        content:
          "Upload your course materials and get study plans, notes, tutoring and practice built around you.",
      },
    ],
  }),
  component: Index,
});

// ─── Animation variants ────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1 },
};

const slideLeft = {
  hidden: { opacity: 0, x: -60 },
  show: { opacity: 1, x: 0 },
};

const slideRight = {
  hidden: { opacity: 0, x: 60 },
  show: { opacity: 1, x: 0 },
};

const scaleUp = {
  hidden: { opacity: 0, scale: 0.88 },
  show: { opacity: 1, scale: 1 },
};

const staggerContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

// ─── Scroll-triggered wrapper ──────────────────────────────────────────────────

function ScrollReveal({
  children,
  variants = fadeUp,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  variants?: typeof fadeUp;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={variants}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
    >
      {children}
    </motion.div>
  );
}

function StaggerReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      variants={staggerContainer}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
    >
      {children}
    </motion.div>
  );
}

// ─── Tabs data ─────────────────────────────────────────────────────────────────

const tabs = [
  {
    id: "Study Plan",
    eyebrow: "Study Plan",
    title: "Know exactly\nwhat comes next",
    body: "Sparky builds a personalized study schedule around your materials and deadlines, breaking everything into clear milestones to help you focus.",
    items: [
      "Cardiac anatomy and blood flow",
      "Electrical conduction and the ECG",
      "The cardiac cycle and pressure-volume loops",
      "Cardiac output and vascular resistance",
    ],
    heading: "Cardiovascular Physiology · Block 2",
  },
  {
    id: "Sparky",
    eyebrow: "Sparky",
    title: "An AI tutor that\nknows your class",
    body: "Sparky reads every file you upload and answers with citations back to the exact page, so you always know where the answer came from.",
    items: [
      "Explain glycolysis like I'm five",
      "Quiz me on lecture 4",
      "Summarize the reading in 10 bullets",
      "What will likely be on the midterm?",
    ],
    heading: "Chat · Biochemistry 210",
  },
  {
    id: "Tutor Me",
    eyebrow: "Tutor Me",
    title: "Learn it out loud,\nstep by step",
    body: "Work through problems with a voice tutor that pauses, checks your understanding and adapts the pace to how you're doing.",
    items: [
      "Guided problem walkthroughs",
      "Voice conversation, hands free",
      "Instant hints instead of answers",
      "Session recaps saved to notes",
    ],
    heading: "Session · Calculus II",
  },
  {
    id: "Live Lecture",
    eyebrow: "Live Lecture",
    title: "Never scramble\nto take notes",
    body: "Record class and get structured notes, key terms and follow-up questions the moment the lecture ends.",
    items: [
      "Real-time transcription",
      "Auto-highlighted key terms",
      "Slide-synced timestamps",
      "Shareable class summaries",
    ],
    heading: "Recording · Organic Chemistry",
  },
  {
    id: "Notes",
    eyebrow: "Notes",
    title: "Notes that\nteach back",
    body: "Every note turns into flashcards, summaries and quizzes so reviewing feels like progress instead of re-reading.",
    items: [
      "Auto-generated flashcards",
      "Spaced repetition built in",
      "Cloze and recall practice",
      "Export to PDF or Anki",
    ],
    heading: "Notebook · Block 2 Review",
  },
  {
    id: "Arcade",
    eyebrow: "Arcade",
    title: "Studying that\ndoesn't feel like it",
    body: "Turn any set of materials into fast, competitive games and race your classmates to the top of the leaderboard.",
    items: [
      "Timed recall challenges",
      "Class leaderboards",
      "Streaks and daily goals",
      "Team study battles",
    ],
    heading: "Arcade · Pharmacology Sprint",
  },
];

// ─── Hero ──────────────────────────────────────────────────────────────────────

function Hero() {
  return (
    <section className="relative overflow-hidden px-5 pt-20 pb-16 lg:px-10 lg:pt-28">
      <div className="mx-auto max-w-[1400px]">
        <motion.h1
          className="mx-auto max-w-4xl text-center text-[clamp(2.75rem,8vw,6rem)] leading-[0.98]"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          Learning that
          <br />
          <span className="display-italic">adapts to you</span>
        </motion.h1>

        <motion.div
          className="mt-10 flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
        >
          <Link
            to="/signup"
            className="rounded-full bg-ink px-12 py-5 text-xl font-medium text-ink-foreground transition-transform hover:-translate-y-0.5"
          >
            Try for free
          </Link>
        </motion.div>

        <div className="mt-4 grid grid-cols-2 items-end gap-6">
          <motion.img
            src={birdsDoodle}
            alt="Doodle of three small birds"
            width={800}
            height={600}
            className="w-40 justify-self-start opacity-90 sm:w-56"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 0.9, x: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.35 }}
          />
          <motion.img
            src={heroDoodle}
            alt="Doodle of a student studying on a laptop with their cat"
            width={1200}
            height={912}
            className="w-full max-w-md justify-self-end"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
          />
        </div>
      </div>
    </section>
  );
}

// ─── Stats ─────────────────────────────────────────────────────────────────────

function Stats() {
  return (
    <section className="px-5 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto grid max-w-[1400px] items-center gap-14 lg:grid-cols-2">
        <ScrollReveal variants={slideLeft}>
          <h2 className="max-w-md text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.05]">
            The trusted AI learning platform for students
          </h2>
        </ScrollReveal>

        <StaggerReveal className="relative grid grid-cols-2 gap-5">
          <motion.div
            variants={scaleUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-1 flex aspect-square flex-col justify-between rounded-2xl bg-mint p-6 text-ink"
          >
            <span className="font-display text-[clamp(2.5rem,5vw,4rem)] leading-none">8M+</span>
            <span className="text-sm">Users worldwide</span>
          </motion.div>

          <motion.div
            variants={scaleUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-square overflow-hidden rounded-2xl"
          >
            <img
              src={studentDesk}
              alt="Student studying at a library computer"
              loading="lazy"
              width={900}
              height={900}
              className="size-full object-cover"
            />
            <span className="absolute top-4 left-5 font-display text-4xl text-ink-foreground">
              4.9 ★
            </span>
            <div className="absolute right-3 bottom-3 left-3 rounded-xl bg-card p-4 text-sm leading-snug shadow-lg">
              App store rating from 10k reviews
            </div>
          </motion.div>

          <motion.div
            variants={scaleUp}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="relative col-start-1 row-start-2 -mt-10 ml-8 aspect-[4/5] overflow-hidden rounded-2xl sm:ml-16"
          >
            <img
              src={studentsGrass}
              alt="Students sitting on the grass on campus"
              loading="lazy"
              width={900}
              height={1100}
              className="size-full object-cover"
            />
            <span className="absolute top-3 left-4 font-display text-[clamp(2rem,4vw,3.25rem)] text-ink-foreground">
              92%
            </span>
            <div className="absolute right-3 bottom-3 left-3 rounded-xl bg-card p-4 text-sm leading-snug shadow-lg">
              of regularly active users reported grade improvements
            </div>
          </motion.div>
        </StaggerReveal>
      </div>
    </section>
  );
}

// ─── Video Section ─────────────────────────────────────────────────────────────

function VideoSection() {
  return (
    <section className="px-5 py-20 lg:px-10">
      <div className="mx-auto max-w-[1400px] text-center">
        <ScrollReveal variants={fadeUp}>
          <h2 className="mx-auto max-w-4xl text-[clamp(2.25rem,5.5vw,4.25rem)] leading-tight">
            Start <span className="display-italic">really</span> learning in seconds
          </h2>
          <p className="mx-auto mt-6 max-w-md text-lg text-muted-foreground">
            Stop fighting your notes. Understand them. See how ExamGlow evolves your course
            materials into content you'll like to learn from.
          </p>
        </ScrollReveal>

        <ScrollReveal
          variants={fadeUp}
          delay={0.1}
          className="mt-10 flex items-center justify-end gap-2"
        >
          <span className="display-italic text-lg">See how ExamGlow works</span>
          <svg width="34" height="40" viewBox="0 0 34 40" fill="none" aria-hidden>
            <path
              d="M4 2c14 4 24 14 24 32m0 0l-7-8m7 8l6-9"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
            />
          </svg>
        </ScrollReveal>

        <ScrollReveal variants={scaleUp} delay={0.15}>
          <div className="relative mt-4 flex aspect-[16/9] items-center justify-center overflow-hidden rounded-3xl bg-lavender">
            <span className="font-display text-[clamp(3rem,10vw,8rem)] text-ink/85">ExamGlow</span>
            <motion.button
              className="absolute flex items-center gap-3 rounded-full bg-ink px-8 py-5 text-lg font-medium text-ink-foreground"
              whileHover={{ scale: 1.06 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
            >
              <svg width="16" height="18" viewBox="0 0 16 18" fill="currentColor" aria-hidden>
                <path d="M0 0l16 9-16 9z" />
              </svg>
              Watch · 4:03
            </motion.button>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── Features ──────────────────────────────────────────────────────────────────

function Features() {
  const [active, setActive] = useState(tabs[0]!.id);
  const tab = tabs.find((t) => t.id === active) ?? tabs[0]!;

  return (
    <section id="features" className="px-5 py-20 lg:px-10 lg:py-28">
      <div className="mx-auto max-w-[1400px]">
        <ScrollReveal variants={fadeIn}>
          <p className="display-italic text-lg">Features</p>
        </ScrollReveal>

        <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_1fr] lg:items-start">
          <ScrollReveal variants={slideLeft}>
            <h2 className="text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.05]">
              <span className="display-italic">Personalized</span> tutoring, totally redefined
            </h2>
          </ScrollReveal>
          <ScrollReveal variants={fadeUp} delay={0.1}>
            <p className="text-lg leading-relaxed text-muted-foreground lg:pt-4">
              Just upload your course materials and you'll get engaging notes, games, videos, and
              more that help you understand faster, retain longer, and stress less.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal variants={fadeUp} delay={0.05}>
          <div className="mt-14 flex gap-1 overflow-x-auto rounded-full border border-border/70 bg-surface p-1.5">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`relative shrink-0 grow rounded-full px-7 py-4 text-[15px] font-medium whitespace-nowrap transition-colors ${
                  t.id === active
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {t.id === active && (
                  <motion.span
                    layoutId="active-tab"
                    className="absolute inset-0 rounded-full bg-secondary"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="relative z-10">{t.id}</span>
              </button>
            ))}
          </div>
        </ScrollReveal>

        <div className="relative mt-10">
          <div className="absolute inset-x-6 -bottom-4 h-full rounded-3xl bg-mint/40" aria-hidden />
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
              className="relative grid gap-8 rounded-3xl bg-lilac p-8 text-ink lg:grid-cols-2 lg:p-12"
            >
              <div className="flex flex-col">
                <p className="display-italic text-lg">{tab.eyebrow}</p>
                <h3 className="mt-4 text-[clamp(1.9rem,3.5vw,3rem)] leading-[1.08] whitespace-pre-line">
                  {tab.title}
                </h3>
                <p className="mt-5 max-w-sm leading-relaxed text-ink/70">{tab.body}</p>
                <div className="mt-auto flex flex-wrap gap-3 pt-10">
                  <Link
                    to="/signup"
                    className="rounded-full bg-ink px-8 py-4 font-medium text-ink-foreground transition-transform hover:-translate-y-0.5"
                  >
                    Get started
                  </Link>
                  <button className="rounded-full border border-ink/30 px-8 py-4 font-medium transition-colors hover:bg-ink/5">
                    Learn more
                  </button>
                </div>
              </div>

              <div className="rounded-2xl bg-card/70 p-5 shadow-sm">
                <div className="rounded-xl bg-card p-5 shadow-sm">
                  <p className="flex items-center gap-2 text-sm font-semibold">
                    <span className="size-3 rounded-full bg-lavender" />
                    {tab.heading}
                  </p>
                  <ul className="mt-5 space-y-4">
                    {tab.items.map((item, i) => (
                      <motion.li
                        key={item}
                        className="flex items-center gap-3 text-sm text-foreground/85"
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.35, delay: 0.05 + i * 0.07 }}
                      >
                        <span
                          className={`size-3 shrink-0 rounded-full ${i === 0 ? "bg-lavender" : "bg-muted"}`}
                        />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                  <p className="mt-6 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    <span>Sources:</span>
                    <span className="rounded-md bg-secondary px-2 py-1">Course Syllabus</span>
                    <span className="rounded-md bg-secondary px-2 py-1">
                      Block 2 Review Guide.pdf
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// ─── About ─────────────────────────────────────────────────────────────────────

const values = [
  {
    emoji: "🎯",
    title: "Student-first",
    body: "Every decision starts with one question: does this actually help students learn? We don't build features for features' sake.",
  },
  {
    emoji: "🔬",
    title: "Science-backed",
    body: "Our study tools are built on decades of cognitive science — spaced repetition, active recall, interleaving — made dead simple to use.",
  },
  {
    emoji: "🤝",
    title: "Radically accessible",
    body: "Quality education shouldn't depend on your zip code or bank balance. ExamGlow is free to start, always.",
  },
  {
    emoji: "⚡",
    title: "Constantly improving",
    body: "We ship updates every week based on real student feedback. If something isn't working for you, tell us — we'll fix it.",
  },
];

function About() {
  return (
    <section id="about" className="px-5 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        {/* Eyebrow */}
        <ScrollReveal variants={fadeIn}>
          <p className="display-italic text-lg">About us</p>
          <div className="mt-4 h-px w-full bg-border" />
        </ScrollReveal>

        {/* Two-column intro */}
        <div className="mt-16 grid gap-12 lg:grid-cols-2 lg:items-center">
          <ScrollReveal variants={slideLeft}>
            <h2 className="text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.05]">
              We started as students
              <br />
              <span className="display-italic">who needed this.</span>
            </h2>
            <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground">
              ExamGlow was founded in 2022 by a group of pre-med and engineering students who kept
              watching classmates struggle — not because they weren't smart, but because their study
              tools were generic. We set out to fix that with AI that actually reads your material,
              not just general trivia.
            </p>
            <p className="mt-4 max-w-lg text-lg leading-relaxed text-muted-foreground">
              Today we're a team of 40 spread across Lagos, London and San Francisco — and we're
              still learning alongside the 8 million students who trust us every day.
            </p>
          </ScrollReveal>

          {/* Stat grid */}
          <StaggerReveal className="grid grid-cols-2 gap-4">
            {[
              { value: "2022", label: "Founded" },
              { value: "40+", label: "Team members" },
              { value: "8M+", label: "Active students" },
              { value: "120+", label: "Countries reached" },
            ].map((s) => (
              <motion.div
                key={s.label}
                variants={scaleUp}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col justify-between rounded-2xl border border-border bg-surface p-7"
              >
                <span className="font-display text-[clamp(2rem,4vw,3rem)] leading-none">
                  {s.value}
                </span>
                <span className="mt-3 text-sm text-muted-foreground">{s.label}</span>
              </motion.div>
            ))}
          </StaggerReveal>
        </div>

        {/* Values */}
        <ScrollReveal variants={fadeUp} delay={0.05} className="mt-20">
          <p className="display-italic text-lg text-muted-foreground">What we stand for</p>
        </ScrollReveal>

        <StaggerReveal className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v) => (
            <motion.div
              key={v.title}
              variants={fadeUp}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="rounded-2xl bg-surface p-7"
              whileHover={{ y: -4 }}
            >
              <span className="text-3xl">{v.emoji}</span>
              <h3 className="mt-4 text-lg font-semibold">{v.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{v.body}</p>
            </motion.div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}

// ─── Blog ──────────────────────────────────────────────────────────────────────

const posts = [
  {
    tag: "Study Science",
    title: "Why spaced repetition works (and how ExamGlow does it for you)",
    excerpt:
      "The forgetting curve is real — here's the research behind it and how our algorithm fights it automatically.",
    readTime: "5 min read",
    color: "bg-mint",
  },
  {
    tag: "Product",
    title: "Introducing Sparky: the AI tutor that actually knows your class",
    excerpt:
      "Unlike generic chatbots, Sparky reads your syllabus, slides, and past papers before your first question.",
    readTime: "3 min read",
    color: "bg-lavender",
  },
  {
    tag: "Student Stories",
    title: "From failing to first class: how three nursing students turned it around",
    excerpt:
      "We sat down with three students who used ExamGlow through their hardest semester and asked them to be honest.",
    readTime: "8 min read",
    color: "bg-lilac",
  },
];

function Blog() {
  return (
    <section id="blog" className="px-5 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1400px]">
        <div className="flex items-end justify-between gap-6">
          <ScrollReveal variants={slideLeft}>
            <p className="display-italic text-lg">From the blog</p>
            <h2 className="mt-3 text-[clamp(2rem,5vw,3.5rem)] leading-[1.05]">
              Ideas worth studying
            </h2>
          </ScrollReveal>

          <ScrollReveal variants={fadeIn} className="hidden shrink-0 sm:block">
            <a
              href="#blog"
              className="rounded-full border border-border px-7 py-3 text-[15px] font-medium transition-colors hover:bg-secondary"
            >
              All articles →
            </a>
          </ScrollReveal>
        </div>

        <StaggerReveal className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <motion.article
              key={post.title}
              variants={fadeUp}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="group flex cursor-pointer flex-col overflow-hidden rounded-3xl border border-border bg-card transition-shadow hover:shadow-lg"
              whileHover={{ y: -6 }}
            >
              {/* Coloured banner */}
              <div className={`h-40 w-full ${post.color} flex items-center justify-center`}>
                <span className="font-display text-5xl text-ink/20 select-none">✦</span>
              </div>

              <div className="flex flex-1 flex-col p-7">
                <span className="w-fit rounded-full bg-secondary px-3 py-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  {post.tag}
                </span>
                <h3 className="mt-4 text-lg font-semibold leading-snug group-hover:underline">
                  {post.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {post.excerpt}
                </p>
                <p className="mt-5 text-xs text-muted-foreground">{post.readTime}</p>
              </div>
            </motion.article>
          ))}
        </StaggerReveal>

        {/* Mobile "all articles" link */}
        <ScrollReveal variants={fadeUp} delay={0.1} className="mt-8 sm:hidden">
          <a
            href="#blog"
            className="block w-full rounded-full border border-border py-3 text-center text-[15px] font-medium transition-colors hover:bg-secondary"
          >
            All articles →
          </a>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── Testimonials ──────────────────────────────────────────────────────────────

const testimonials = [
  {
    quote:
      "I went from a low grade at the beginning of the semester to ending with A's and B's, and I've maintained them every semester since.",
    name: "Samantha Gonzales, Pre-Med Biology at Hartnell Community College",
  },
  {
    quote:
      "ExamGlow turned four hundred pages of lecture slides into a study plan I could actually follow the week before finals.",
    name: "Devon Marsh, Nursing at Ohio State University",
  },
];

function Testimonials() {
  return (
    <section id="testimonials" className="bg-ink px-5 py-24 text-ink-foreground lg:px-10 lg:py-32">
      <div className="mx-auto max-w-[1200px]">
        <ScrollReveal variants={fadeIn}>
          <p className="display-italic text-lg text-ink-foreground/70">Testimonials</p>
          <div className="mt-4 h-px w-full bg-ink-foreground/20" />
        </ScrollReveal>

        <ScrollReveal variants={fadeUp} delay={0.05}>
          <h2 className="mt-16 text-[clamp(2.25rem,6vw,4.25rem)] leading-[1.05]">
            Helping students
            <br />
            achieve more.
          </h2>
        </ScrollReveal>

        <div className="mt-20 space-y-16">
          {testimonials.map((t, i) => (
            <ScrollReveal key={t.name} variants={slideLeft} delay={i * 0.15}>
              <figure className="flex flex-col gap-7 sm:flex-row sm:items-start">
                <motion.img
                  src={avatar1}
                  alt={`Portrait of ${t.name.split(",")[0]}`}
                  loading="lazy"
                  width={512}
                  height={512}
                  className={`size-24 shrink-0 rounded-full object-cover ${i === 1 ? "grayscale" : ""}`}
                  whileHover={{ scale: 1.06 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
                <div>
                  <blockquote className="font-display text-[clamp(1.4rem,3vw,2.4rem)] leading-[1.25]">
                    "{t.quote}"
                  </blockquote>
                  <figcaption className="mt-5 text-sm text-ink-foreground/60">{t.name}</figcaption>
                </div>
              </figure>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Closing CTA ───────────────────────────────────────────────────────────────

function ClosingCta() {
  return (
    <section className="px-5 py-24 lg:px-10 lg:py-32">
      <div className="mx-auto max-w-3xl text-center">
        <ScrollReveal variants={scaleUp}>
          <h2 className="text-[clamp(2.25rem,6vw,4rem)] leading-[1.05]">
            <span className="bg-highlight px-2">92% of students</span> get higher grades with
            ExamGlow
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Drop your class materials, we'll make your study plan.
          </p>
        </ScrollReveal>

        <ScrollReveal variants={fadeUp} delay={0.15}>
          <Link
            to="/signup"
            className="mt-10 inline-block rounded-full bg-ink px-12 py-5 text-xl font-medium text-ink-foreground transition-transform hover:-translate-y-0.5"
          >
            Start for free
          </Link>
        </ScrollReveal>

        <ScrollReveal variants={fadeUp} delay={0.25}>
          <p className="mt-14 text-sm text-muted-foreground">
            Trusted by students from top institutions
          </p>
          <StaggerReveal className="mt-5 flex flex-wrap items-center justify-center gap-10 font-display text-2xl text-foreground/70">
            {["HARVARD", "Yale", "MIT", "Stanford"].map((uni) => (
              <motion.span key={uni} variants={fadeUp}>
                {uni}
              </motion.span>
            ))}
          </StaggerReveal>
        </ScrollReveal>
      </div>
    </section>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────────────

function Index() {
  return (
    <motion.div
      className="min-h-screen bg-background"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <SiteNav />
      <main>
        <Hero />
        <Stats />
        <VideoSection />
        <Features />
        <About />
        <Blog />
        <Testimonials />
        <ClosingCta />
      </main>
      <SiteFooter />
    </motion.div>
  );
}
