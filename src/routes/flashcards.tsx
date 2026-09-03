import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import {
  Layers,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Upload,
  FileText,
  Copy,
  Check,
  HelpCircle,
  BookOpen,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import { DashboardLayout, PageHeading } from "@/components/dashboard-page";
import { callGemini } from "@/lib/ai-router";

export const Route = createFileRoute("/flashcards")({
  head: () => ({
    meta: [
      { title: "Flashcards & Assignment Solver | ExamGlow" },
      {
        name: "description",
        content: "Generate 10 dynamic flashcards on any topic or solve assignments with answers first.",
      },
    ],
  }),
  component: FlashcardsPage,
});

type Flashcard = {
  id: number;
  question: string;
  answer: string;
};

function FlashcardsPage() {
  const [tab, setTab] = useState<"flashcards" | "assignment">("flashcards");

  return (
    <DashboardLayout crumbs={[{ label: "Practice" }, { label: "Flashcards & Assignment" }]}>
      <PageHeading
        icon={<Layers className="size-5" aria-hidden />}
        title="Flashcards &amp; Assignment Solver"
        subtitle="Active recall flashcard decks + step-by-step assignment helper with answers first."
      />

      {/* Tabs */}
      <div className="mb-6 flex gap-2 rounded-2xl border border-border bg-card p-1.5 w-fit">
        <button
          type="button"
          onClick={() => setTab("flashcards")}
          className={`flex items-center gap-2 rounded-xl px-5 py-2 text-xs font-bold transition-all ${
            tab === "flashcards" ? "bg-foreground text-background shadow-sm" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <Layers className="size-4" /> 10-Card Flashcard Generator
        </button>
        <button
          type="button"
          onClick={() => setTab("assignment")}
          className={`flex items-center gap-2 rounded-xl px-5 py-2 text-xs font-bold transition-all ${
            tab === "assignment" ? "bg-foreground text-background shadow-sm" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <FileText className="size-4" /> Assignment Solver (Answer First)
        </button>
      </div>

      {tab === "flashcards" ? <FlashcardDeckView /> : <AssignmentSolverView />}
    </DashboardLayout>
  );
}

// ─── 1. Flashcard Deck View (10 Dynamic Cards) ────────────────────────────────
function FlashcardDeckView() {
  const [topic, setTopic] = useState("");
  const [deck, setDeck] = useState<Flashcard[]>([
    { id: 1, question: "What is the function of the cell membrane?", answer: "Controls the movement of substances into and out of the cell; selectively permeable barrier." },
    { id: 2, question: "Define an enzyme in Cambridge biological terms.", answer: "A biological catalyst that increases the rate of chemical reactions without being changed or consumed." },
    { id: 3, question: "What is the active site of an enzyme?", answer: "The specific region of an enzyme molecule where the substrate binds to form an enzyme-substrate complex." },
    { id: 4, question: "What happens when an enzyme is denatured?", answer: "Extreme temperature or pH alters its tertiary protein structure and active site shape, so substrates can no longer fit." },
    { id: 5, question: "Which organelle is the site of aerobic cellular respiration?", answer: "Mitochondria." },
    { id: 6, question: "Which organelle synthesises proteins in eukaryotic cells?", answer: "Ribosomes." },
    { id: 7, question: "What is the effect of low temperature on enzyme activity?", answer: "Kinetic energy is reduced, resulting in fewer successful collisions per second between enzyme and substrate." },
    { id: 8, question: "Define osmosis precisely.", answer: "The net movement of water molecules from a region of higher water potential to lower water potential down a gradient through a partially permeable membrane." },
    { id: 9, question: "State the balanced equation for photosynthesis.", answer: "6CO2 + 6H2O -> C6H12O6 + 6O2 (in presence of light and chlorophyll)." },
    { id: 10, question: "What is the function of xylem vessels in plants?", answer: "Transports water and dissolved mineral ions upward from roots to leaves; provides mechanical support." },
  ]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleGenerateCards(targetTopic?: string) {
    const chosen = (targetTopic ?? topic).trim() || "Cell Biology & Genetics";
    setIsGenerating(true);
    setError(null);

    const prompt = `You are an expert Cambridge IGCSE tutor. Generate exactly 10 high-yield, syllabus-aligned revision flashcards for the topic: "${chosen}".
Return STRICTLY a JSON array of objects without markdown formatting or surrounding explanations:
[
  {
    "id": 1,
    "question": "Concise key definition, concept check, or recall question...",
    "answer": "Clear, precise examiner-level answer with key terms and units."
  }
]`;

    try {
      const res = await callGemini([{ role: "user", content: prompt }], 1800, 0.5);
      if (!res?.text) throw new Error("No response");
      const match = res.text.match(/\[[\s\S]*\]/);
      if (!match) throw new Error("Parse error");
      const parsed = JSON.parse(match[0]) as Flashcard[];
      if (Array.isArray(parsed) && parsed.length > 0) {
        setDeck(parsed);
        setCurrentIndex(0);
        setIsFlipped(false);
      }
    } catch (err) {
      console.error("Flashcards AI error:", err);
      setError("Could not generate cards just now. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }

  function handleRepeat() {
    setIsFlipped(false);
    setCurrentIndex(0);
  }

  const currentCard = deck[currentIndex] ?? deck[0] ?? { id: 0, question: "", answer: "" };

  return (
    <div className="w-full max-w-2xl py-2">
      {/* Topic selection */}
      <div className="mb-6 rounded-3xl border border-border bg-card p-5 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Enter topic (e.g. Photosynthesis, Newton's Laws, Organic Chemistry)..."
            className="flex-1 rounded-2xl border border-border bg-background px-4 py-2.5 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
          />
          <button
            type="button"
            disabled={isGenerating}
            onClick={() => handleGenerateCards()}
            className="flex items-center justify-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-xs font-bold text-ink-foreground shadow hover:opacity-90 disabled:opacity-50"
          >
            {isGenerating ? (
              <>
                <Loader2 className="size-3.5 animate-spin" /> Generating...
              </>
            ) : (
              "Generate 10 Cards"
            )}
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {["Cell Biology", "Newton's Laws", "Organic Chemistry", "Macroeconomics", "Trigonometry", "Electromagnetism"].map((chip) => (
            <button
              key={chip}
              type="button"
              onClick={() => {
                setTopic(chip);
                void handleGenerateCards(chip);
              }}
              className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-[11px] font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {chip}
            </button>
          ))}
        </div>

        {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
      </div>

      {/* Progress Counter & Controls */}
      <div className="mb-3 flex items-center justify-between text-xs text-muted-foreground">
        <span className="font-bold text-foreground">
          Card {currentIndex + 1} of {deck.length}
        </span>
        <span>Click card to flip</span>
      </div>

      {/* Flippable Flashcard */}
      <div
        onClick={() => setIsFlipped((v) => !v)}
        className="group relative h-72 w-full cursor-pointer rounded-3xl border border-border bg-card p-8 shadow-md transition-all hover:border-foreground/40 flex flex-col justify-between"
      >
        <div className="flex items-center justify-between">
          <span className="rounded-full bg-secondary px-3 py-1 text-[10px] font-bold tracking-wider uppercase text-muted-foreground">
            {isFlipped ? "Answer" : "Question"}
          </span>
          <span className="text-xs text-muted-foreground group-hover:text-foreground flex items-center gap-1">
            <RotateCw className="size-3.5" /> Flip Card
          </span>
        </div>

        <div className="my-auto text-center px-4">
          <p className="font-serif text-xl font-bold text-foreground leading-relaxed">
            {isFlipped ? currentCard.answer : currentCard.question}
          </p>
        </div>

        <div className="text-center text-[11px] text-muted-foreground">
          {isFlipped ? "Tap to view question" : "Tap to view answer"}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="mt-6 flex items-center justify-between">
        <button
          type="button"
          disabled={currentIndex === 0}
          onClick={() => {
            setIsFlipped(false);
            setCurrentIndex((i) => Math.max(0, i - 1));
          }}
          className="flex items-center gap-1 rounded-full border border-border px-4 py-2 text-xs font-semibold text-foreground disabled:opacity-40"
        >
          <ChevronLeft className="size-4" /> Previous
        </button>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={handleRepeat}
            className="rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground"
          >
            Repeat This Deck
          </button>
          <button
            type="button"
            disabled={isGenerating}
            onClick={() => handleGenerateCards()}
            className="flex items-center gap-1.5 rounded-full bg-secondary px-4 py-2 text-xs font-semibold text-foreground hover:bg-border disabled:opacity-50"
          >
            {isGenerating ? <Loader2 className="size-3.5 animate-spin" /> : null}
            Generate 10 New Questions
          </button>
        </div>

        <button
          type="button"
          disabled={currentIndex === deck.length - 1}
          onClick={() => {
            setIsFlipped(false);
            setCurrentIndex((i) => Math.min(deck.length - 1, i + 1));
          }}
          className="flex items-center gap-1 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background disabled:opacity-40"
        >
          Next <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}

// ─── 2. Assignment Solver View (Answer First, Reasoning Below) ────────────────
function AssignmentSolverView() {
  const [problemText, setProblemText] = useState("");
  const [loading, setLoading] = useState(false);
  const [solution, setSolution] = useState<{ answer: string; reasoning: string } | null>(null);
  const [copied, setCopied] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleSolve() {
    if (!problemText.trim() || loading) return;
    setLoading(true);

    const prompt = `Solve this academic assignment problem thoroughly.
Problem:
${problemText}

Respond STRICTLY with a valid JSON object without markdown syntax:
{
  "answer": "Concise direct final answer with units if applicable",
  "reasoning": "Step-by-step working, equations, logic, and verification points"
}`;

    try {
      const res = await callGemini([{ role: "user", content: prompt }], 2000, 0.4);
      if (!res?.text) throw new Error("No response");
      const match = res.text.match(/\{[\s\S]*\}/);
      if (match) {
        const parsed = JSON.parse(match[0]) as { answer: string; reasoning: string };
        setSolution(parsed);
      } else {
        setSolution({
          answer: "Completed Solution",
          reasoning: res.text,
        });
      }
    } catch (err) {
      console.error("Solver error:", err);
      setSolution({
        answer: "Error solving assignment",
        reasoning: "Please check your network connection and try again.",
      });
    } finally {
      setLoading(false);
    }
  }

  function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      if (file.name.endsWith(".txt") || file.name.endsWith(".md")) {
        file.text().then((t) => setProblemText(t));
      } else {
        setProblemText(`[Attached file: ${file.name}] Please solve the assignment questions contained in this document.`);
      }
    }
  }

  return (
    <div className="w-full max-w-2xl py-2">
      <input ref={fileInputRef} type="file" accept=".pdf,.png,.jpg,.txt,.md" className="hidden" onChange={handleFileUpload} />

      <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-border pb-3 mb-4">
          <div>
            <h2 className="text-base font-bold text-foreground">Upload or Paste Assignment Question</h2>
            <p className="text-xs text-muted-foreground">The AI gives you the concise Final Answer first, followed by complete step-by-step solving below.</p>
          </div>
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1.5 text-xs font-semibold hover:bg-border"
          >
            <Upload className="size-3.5" /> Upload File
          </button>
        </div>

        <textarea
          rows={4}
          value={problemText}
          onChange={(e) => setProblemText(e.target.value)}
          placeholder="Paste your homework or exam question here (e.g. 'Solve 2x^2 - 5x - 3 = 0' or 'Calculate the force required to accelerate a 1200kg car...')..."
          className="w-full rounded-2xl border border-border bg-background p-4 text-xs font-mono focus:outline-none focus:ring-2 focus:ring-foreground/20"
        />

        <div className="mt-4 flex justify-end">
          <button
            type="button"
            disabled={!problemText.trim() || loading}
            onClick={handleSolve}
            className="flex items-center gap-2 rounded-full bg-ink px-6 py-2.5 text-xs font-bold text-ink-foreground shadow disabled:opacity-40"
          >
            {loading ? "Solving Assignment..." : "Solve Assignment →"}
          </button>
        </div>
      </div>

      {/* Solution Output with Answer First */}
      {solution && (
        <div className="mt-6 space-y-4">
          {/* 1. Final Answer Box FIRST */}
          <div className="rounded-3xl border-2 border-emerald-500 bg-emerald-500/10 p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                <CheckCircle2 className="size-4" /> 1. Final Answer (Direct Result)
              </span>
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard.writeText(`${solution.answer}\n\n${solution.reasoning}`);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground"
              >
                {copied ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
                <span>{copied ? "Copied" : "Copy Solution"}</span>
              </button>
            </div>
            <p className="mt-3 font-serif text-lg font-bold text-foreground">
              {solution.answer}
            </p>
          </div>

          {/* 2. Step-by-Step Solving Below */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
              2. Step-by-Step Solving &amp; Examiner Reasoning
            </h3>
            <div className="mt-3 text-xs leading-relaxed text-foreground space-y-2 whitespace-pre-line font-mono">
              {solution.reasoning}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
