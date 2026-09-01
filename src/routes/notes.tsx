import { createFileRoute } from "@tanstack/react-router";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  ChevronDown,
  Expand,
  FileText,
  Highlighter,
  History,
  Italic,
  List,
  ListOrdered,
  Palette,
  Plus,
  Printer,
  Redo2,
  Strikethrough,
  Underline,
  Undo2,
} from "lucide-react";

import { DashboardLayout } from "@/components/dashboard-page";

export const Route = createFileRoute("/notes")({
  head: () => ({
    meta: [
      { title: "Notes — write and review your study notes | ExamGlow" },
      {
        name: "description",
        content:
          "Write, format and revisit structured study notes for every topic in your ExamGlow study set.",
      },
      { property: "og:title", content: "Notes | ExamGlow" },
      { property: "og:description", content: "Structured study notes for every topic in your study set." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: NotesPage,
});

const toolbarGroups = [
  [Bold, Italic, Underline, Strikethrough],
  [Highlighter, Palette],
  [AlignLeft, AlignCenter, AlignRight],
  [ListOrdered, List],
  [Undo2, Redo2],
  [Plus],
  [History, Printer, Expand],
];

function NotesPage() {
  return (
    <DashboardLayout
      crumbs={[
        { label: "My First Study Set" },
        { label: "Foundations and Cognitive Limits", icon: <FileText className="size-4" aria-hidden /> },
      ]}
    >
      <div className="-mx-4 border-b border-border px-4 py-2 sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <div className="flex flex-wrap items-center gap-1.5 text-muted-foreground">
          <button type="button" className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-sm text-foreground hover:bg-secondary">
            Inter <ChevronDown className="size-3.5" aria-hidden />
          </button>
          <button type="button" className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-sm text-foreground hover:bg-secondary">
            11 <ChevronDown className="size-3.5" aria-hidden />
          </button>
          {toolbarGroups.map((group, index) => (
            <span key={index} className="flex items-center gap-0.5 border-l border-border pl-1.5">
              {group.map((Icon, i) => (
                <button
                  key={i}
                  type="button"
                  className="flex size-8 items-center justify-center rounded-lg transition-colors hover:bg-secondary hover:text-foreground"
                  aria-label="Formatting option"
                >
                  <Icon className="size-4" aria-hidden />
                </button>
              ))}
            </span>
          ))}
        </div>
      </div>

      <article className="mx-auto max-w-3xl py-10">
        <h1 className="text-[clamp(1.9rem,4vw,2.75rem)] font-semibold leading-tight tracking-tight">
          Foundations of Behavioral Economics: Rational Choice Theory vs. Bounded Rationality and the
          Dual Process Model
        </h1>
        <p className="mt-5 leading-relaxed text-foreground/80">
          This module explores the fundamental tension in economic thought between the classical
          assumption of human perfection and the psychological reality of human limitation. We will
          examine the transition from <strong>Rational Choice Theory</strong>, which assumes humans act
          as hyper-logical optimizers, to <strong>Bounded Rationality</strong>, which accounts for
          cognitive constraints, and finally to the <strong>Dual Process Model</strong>, which explains
          the neurological architecture behind these different modes of thinking.
        </p>

        <hr className="my-9 border-border" />

        <h2 className="text-[clamp(1.3rem,2.5vw,1.8rem)] font-semibold tracking-tight">
          1. Rational Choice Theory (The Classical Paradigm)
        </h2>
        <p className="mt-4 leading-relaxed text-foreground/80">
          <strong>Rational Choice Theory (RCT)</strong> is the bedrock of neoclassical economics. It
          posits that individuals are <em>homo economicus</em> — rational agents who consistently make
          decisions to maximize their personal utility.
        </p>

        <h3 className="mt-6 text-xl font-semibold tracking-tight">Core Assumptions of RCT</h3>
        <ul className="mt-3 space-y-2.5 pl-5 leading-relaxed text-foreground/80 [&>li]:list-disc">
          <li>
            <strong>Completeness:</strong> An agent can rank all possible options. Given choices A and
            B, the agent can say A &gt; B, B &gt; A, or A = B.
          </li>
          <li>
            <strong>Transitivity:</strong> Preferences are logically consistent. If an agent prefers A
            to B, and B to C, they must prefer A to C.
          </li>
          <li>
            <strong>Utility Maximization:</strong> Individuals possess stable preferences and choose
            the option that provides the greatest expected benefit.
          </li>
        </ul>

        <h2 className="mt-10 text-[clamp(1.3rem,2.5vw,1.8rem)] font-semibold tracking-tight">
          2. Bounded Rationality
        </h2>
        <p className="mt-4 leading-relaxed text-foreground/80">
          Herbert Simon argued that real decision-makers face limits on information, time and cognitive
          capacity. Instead of optimizing, people <strong>satisfice</strong>: they search until an
          option clears a good-enough threshold, then stop.
        </p>

        <h2 className="mt-10 text-[clamp(1.3rem,2.5vw,1.8rem)] font-semibold tracking-tight">
          3. The Dual Process Model
        </h2>
        <p className="mt-4 leading-relaxed text-foreground/80">
          System 1 is fast, automatic and intuitive; System 2 is slow, deliberate and effortful. Most
          everyday judgments run on System 1, which is why predictable biases appear even in experts.
        </p>
      </article>
    </DashboardLayout>
  );
}
