import { createFileRoute } from "@tanstack/react-router";
import {
  Sparkles,
  GraduationCap,
  BookOpen,
  Award,
  Users,
  Target,
  ShieldCheck,
  CheckCircle2,
} from "lucide-react";
import { DashboardLayout, PageHeading } from "@/components/dashboard-page";

export const Route = createFileRoute("/about-us")({
  head: () => ({
    meta: [
      { title: "About Us | ExamGlow" },
      { name: "description", content: "Learn about ExamGlow and our mission to help students excel in Cambridge examinations." },
    ],
  }),
  component: AboutUsPage,
});

function AboutUsPage() {
  return (
    <DashboardLayout crumbs={[{ label: "Company" }, { label: "About Us" }]}>
      <PageHeading
        title="About ExamGlow"
        badge="Our Mission & Story"
      />

      {/* Hero Banner */}
      <div className="relative mb-10 overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600 via-indigo-600 to-blue-700 p-8 sm:p-12 text-white shadow-xl">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs font-semibold uppercase tracking-wider mb-4">
            <GraduationCap className="size-4" /> Transforming International Education
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold leading-tight">
            Built for Students Aiming for Top Cambridge Marks.
          </h1>
          <p className="mt-4 text-sm sm:text-base text-white/85 leading-relaxed">
            ExamGlow was founded with a singular purpose: to replace messy revision guides and outdated past paper sites with a unified, beautiful study system. We bring together comprehensive syllabus notes, verified examination papers, and Yumna—our real-time AI study tutor.
          </p>
        </div>
      </div>

      {/* Core Values */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 dark:text-blue-400 mb-4">
            <Target className="size-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-foreground">Syllabus Precision</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Every chapter, definition, and formula is mapped exactly to the official Cambridge IGCSE syllabus specifications and examiner mark schemes.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-purple-500/10 text-purple-600 dark:text-purple-400 mb-4">
            <Award className="size-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-foreground">Yumna: AI Study Tutor</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Unlike generic chatbots, Yumna is specially tuned for academic tutoring. She breaks down equations, explains diagrams, and coaches you step-by-step.
          </p>
        </div>

        <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-4">
            <ShieldCheck className="size-6" />
          </div>
          <h3 className="font-serif text-xl font-bold text-foreground">Verified Past Papers</h3>
          <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
            Direct access to official examination question papers and mark schemes across core Cambridge subjects, complete with high-yield practice modes.
          </p>
        </div>
      </div>

      {/* Story & Commitment */}
      <div className="rounded-3xl border border-border bg-card p-8 sm:p-10 shadow-sm mb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-primary">The ExamGlow Story</p>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mt-2">
              Why We Created ExamGlow & Yumna
            </h2>
            <p className="mt-4 text-sm text-muted-foreground leading-relaxed">
              Studying for high-stakes exams can be overwhelming. Students spend hours hunting down working past question links, deciphering cryptic mark schemes, and reading dry, dense textbooks without visual diagrams.
            </p>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              We asked: <em>What if students had an intelligent companion that understands every theorem, diagram, and exam trick?</em> That vision became **Yumna**—an AI tutor who never tires, explains complex concepts simply, and cheers you on all the way to exam day.
            </p>
            <div className="mt-6 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                Over 16+ Core Cambridge IGCSE subjects supported
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                Integrated LaTeX mathematical typography and vector diagrams
              </div>
              <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                <CheckCircle2 className="size-4 text-emerald-500 shrink-0" />
                Interactive flashcards, authentic exam forms, and automated grading
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
            <h4 className="font-bold text-base text-foreground mb-4">Academic Standards</h4>
            <div className="space-y-4 text-xs text-muted-foreground leading-relaxed">
              <p>
                ExamGlow materials are developed independently by experienced educators and academic technologists.
              </p>
              <p>
                IGCSE™ is a registered trademark of Cambridge Assessment International Education. ExamGlow is an independent academic revision platform designed to support students globally.
              </p>
              <div className="border-t border-border pt-4 mt-4">
                <p className="font-semibold text-foreground">Have suggestions or questions for our academic board?</p>
                <p className="mt-1">Contact us at <span className="font-mono text-primary">academic@examglow.com</span></p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
