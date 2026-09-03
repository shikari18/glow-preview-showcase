import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ClipboardCheck,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Sparkles,
} from "lucide-react";

import { DashboardLayout, PageHeading } from "@/components/dashboard-page";

export const Route = createFileRoute("/quizzes")({
  head: () => ({
    meta: [
      { title: "Topic Quiz | ExamGlow" },
      {
        name: "description",
        content: "Quiz yourself on any academic subject or syllabus topic with instant feedback.",
      },
    ],
  }),
  component: QuizTopicPage,
});

type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correct: number;
  explanation: string;
};

const TOPIC_PRESETS: Record<string, QuizQuestion[]> = {
  "photosynthesis": [
    {
      id: 1,
      question: "Which pigment inside chloroplasts absorbs sunlight during photosynthesis?",
      options: ["Carotene", "Chlorophyll", "Haemoglobin", "Xanthophyll"],
      correct: 1,
      explanation: "Chlorophyll is the green pigment in thylakoid membranes that absorbs blue and red wavelengths of light.",
    },
    {
      id: 2,
      question: "What are the products of the photosynthesis light-dependent reaction?",
      options: ["Carbon dioxide and water", "Glucose and oxygen", "ATP, NADPH, and Oxygen", "Lactic acid"],
      correct: 2,
      explanation: "Photolysis of water produces protons, electrons, ATP, NADPH, and oxygen gas as a byproduct.",
    },
    {
      id: 3,
      question: "Which of the following is NOT a limiting factor of photosynthesis?",
      options: ["Light intensity", "Carbon dioxide concentration", "Oxygen concentration", "Temperature"],
      correct: 2,
      explanation: "Oxygen is a product, not a reactant or limiting factor for photosynthesis.",
    },
  ],
  "newton": [
    {
      id: 1,
      question: "What is the SI unit of resultant force?",
      options: ["Joule (J)", "Watt (W)", "Newton (N)", "Pascal (Pa)"],
      correct: 2,
      explanation: "Force is measured in Newtons (N), where 1 N = 1 kg·m/s².",
    },
    {
      id: 2,
      question: "According to Newton's First Law, an object at rest will remain at rest unless acted on by:",
      options: ["Frictional forces only", "A resultant external force", "Gravity", "Internal energy"],
      correct: 1,
      explanation: "A non-zero net external force is required to change an object's state of rest or uniform motion.",
    },
    {
      id: 3,
      question: "If mass is doubled while resultant force is kept constant, acceleration will be:",
      options: ["Doubled", "Quadrupled", "Halved", "Unchanged"],
      correct: 2,
      explanation: "From F = ma, a = F / m. Doubling mass m reduces acceleration a by half.",
    },
  ],
  "default": [
    {
      id: 1,
      question: "In standard scientific investigation, what is the variable changed by the experimenter?",
      options: ["Dependent variable", "Independent variable", "Controlled variable", "Constant variable"],
      correct: 1,
      explanation: "The independent variable is deliberately changed to observe its effect on the dependent variable.",
    },
    {
      id: 2,
      question: "Which property allows water to travel up xylem vessels via capillary action?",
      options: ["High density", "Cohesion and adhesion", "Low boiling point", "Neutral pH"],
      correct: 1,
      explanation: "Hydrogen bonding gives water strong cohesive and adhesive forces with xylem cell walls.",
    },
    {
      id: 3,
      question: "What is the term for a reaction that releases thermal energy to the surroundings?",
      options: ["Endothermic", "Exothermic", "Isothermal", "Catalytic"],
      correct: 1,
      explanation: "Exothermic reactions transfer heat to surroundings, causing a temperature rise.",
    },
  ],
};

function QuizTopicPage() {
  const [topic, setTopic] = useState("");
  const [activeQuiz, setActiveQuiz] = useState<QuizQuestion[] | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  function startQuiz() {
    const key = topic.toLowerCase();
    let questions = TOPIC_PRESETS["default"]!;
    if (key.includes("photo") || key.includes("plant") || key.includes("bio")) {
      questions = TOPIC_PRESETS["photosynthesis"]!;
    } else if (key.includes("newton") || key.includes("force") || key.includes("physic")) {
      questions = TOPIC_PRESETS["newton"]!;
    }
    setActiveQuiz(questions);
    setSelectedAnswers({});
    setSubmitted(false);
  }

  const score = activeQuiz?.reduce((acc, q) => (selectedAnswers[q.id] === q.correct ? acc + 1 : acc), 0) ?? 0;

  return (
    <DashboardLayout crumbs={[{ label: "Practice" }, { label: "Quiz" }]}>
      <PageHeading
        icon={<ClipboardCheck className="size-5" aria-hidden />}
        title="Topic Quiz"
        subtitle="Test your knowledge on any subject or syllabus topic with instant examiner feedback."
      />

      {!activeQuiz ? (
        <div className="w-full max-w-xl py-4">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-bold text-foreground">What topic would you like to be quizzed on?</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Enter any topic from your syllabus to start an interactive recall quiz.
            </p>

            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Photosynthesis, Newton's Laws, Chemical Bonding..."
              className="mt-4 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
            />

            {/* Quick Chips */}
            <div className="mt-3 flex flex-wrap gap-2">
              {["Photosynthesis", "Newton's Laws", "Quadratic Equations", "Acids & Bases", "Cell Structure"].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => setTopic(chip)}
                  className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>

            <button
              type="button"
              onClick={startQuiz}
              className="mt-6 flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-ink-foreground shadow hover:opacity-90 transition-all"
            >
              <Play className="size-4" /> Start Topic Quiz
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-2xl py-4">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase font-bold text-muted-foreground">Active Quiz</p>
              <h2 className="text-xl font-bold text-foreground">
                {topic ? topic : "General Revision Quiz"}
              </h2>
            </div>
            {submitted && (
              <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                Score: {score} / {activeQuiz.length}
              </div>
            )}
          </div>

          <div className="space-y-5">
            {activeQuiz.map((q, qIndex) => (
              <div key={q.id} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <p className="text-sm font-bold text-foreground">
                  Question {qIndex + 1}: {q.question}
                </p>

                <div className="mt-3 grid gap-2">
                  {q.options.map((opt, optIndex) => {
                    const isSelected = selectedAnswers[q.id] === optIndex;
                    const isCorrect = optIndex === q.correct;
                    return (
                      <button
                        key={optIndex}
                        type="button"
                        disabled={submitted}
                        onClick={() => setSelectedAnswers((prev) => ({ ...prev, [q.id]: optIndex }))}
                        className={`flex items-center justify-between rounded-2xl border p-3 text-left text-xs font-medium transition-all ${
                          isSelected ? "border-foreground bg-secondary font-bold" : "border-border hover:bg-secondary/40"
                        } ${
                          submitted && isCorrect
                            ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold"
                            : ""
                        } ${
                          submitted && isSelected && !isCorrect
                            ? "border-rose-500 bg-rose-500/10 text-rose-600 font-bold"
                            : ""
                        }`}
                      >
                        <span>{opt}</span>
                        {submitted && isCorrect && <CheckCircle2 className="size-4 text-emerald-500" />}
                        {submitted && isSelected && !isCorrect && <XCircle className="size-4 text-rose-500" />}
                      </button>
                    );
                  })}
                </div>

                {submitted && (
                  <div className="mt-3 rounded-xl bg-secondary/60 p-3 text-xs text-muted-foreground border border-border">
                    <p className="font-semibold text-foreground">Explanation:</p>
                    <p className="mt-0.5">{q.explanation}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                setActiveQuiz(null);
                setSubmitted(false);
              }}
              className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="size-3.5" /> Change Topic
            </button>

            {!submitted ? (
              <button
                type="button"
                onClick={() => setSubmitted(true)}
                className="rounded-full bg-ink px-6 py-2.5 text-xs font-bold text-ink-foreground shadow hover:opacity-90"
              >
                Submit Answers
              </button>
            ) : (
              <button
                type="button"
                onClick={startQuiz}
                className="rounded-full bg-foreground px-6 py-2.5 text-xs font-bold text-background shadow hover:opacity-90"
              >
                Repeat Quiz
              </button>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
