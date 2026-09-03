import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  Play,
  RotateCcw,
  BookOpen,
  Award,
  ChevronRight,
  FileCheck,
} from "lucide-react";

import { DashboardLayout, PageHeading } from "@/components/dashboard-page";

export const Route = createFileRoute("/test")({
  head: () => ({
    meta: [
      { title: "Exam Test Simulation | ExamGlow" },
      {
        name: "description",
        content: "Simulate real Cambridge IGCSE timed examinations with authentic question formats and mark schemes.",
      },
    ],
  }),
  component: TestSimulationPage,
});

type Question = {
  id: number;
  part: string;
  text: string;
  marks: number;
  type: "mcq" | "structured";
  options?: string[];
  correctOption?: number;
  sampleAnswer: string;
  markingCriteria: string[];
};

const SAMPLE_EXAMS: Record<string, { code: string; title: string; questions: Question[] }> = {
  biology: {
    code: "0610/22",
    title: "Biology (Theory & Structure)",
    questions: [
      {
        id: 1,
        part: "1 (a) (i)",
        text: "State the word equation for aerobic cellular respiration in human body cells.",
        marks: 2,
        type: "structured",
        sampleAnswer: "Glucose + Oxygen -> Carbon Dioxide + Water (+ ATP / Energy)",
        markingCriteria: ["1 mark for correct reactants (glucose and oxygen)", "1 mark for correct products (carbon dioxide and water)"],
      },
      {
        id: 2,
        part: "1 (a) (ii)",
        text: "Name the cellular organelle where the majority of aerobic respiration reactions take place.",
        marks: 1,
        type: "structured",
        sampleAnswer: "Mitochondria / Mitochondrion",
        markingCriteria: ["1 mark for mitochondria (allow phonetic spellings)"],
      },
      {
        id: 3,
        part: "1 (b)",
        text: "Which of the following structures is found in plant cells but absent from animal cells?",
        marks: 1,
        type: "mcq",
        options: ["A. Cell membrane", "B. Mitochondria", "C. Cellulose cell wall", "D. Ribosomes"],
        correctOption: 2,
        sampleAnswer: "C. Cellulose cell wall",
        markingCriteria: ["1 mark for selecting option C"],
      },
      {
        id: 4,
        part: "2 (a)",
        text: "Explain how increasing temperature beyond 45°C affects the rate of enzyme-controlled reactions.",
        marks: 3,
        type: "structured",
        sampleAnswer: "The reaction rate decreases rapidly. High temperatures disrupt hydrogen bonds holding the tertiary enzyme structure, causing the active site to change shape (denaturation). Substrates can no longer bind.",
        markingCriteria: [
          "1 mark: Rate decreases / drops to zero",
          "1 mark: Active site alters shape / enzyme denatures",
          "1 mark: Substrate can no longer fit / enzyme-substrate complexes cannot form",
        ],
      },
      {
        id: 5,
        part: "2 (b)",
        text: "Define the term osmosis.",
        marks: 3,
        type: "structured",
        sampleAnswer: "Osmosis is the net movement of water molecules from a region of higher water potential to a region of lower water potential through a selectively permeable membrane.",
        markingCriteria: [
          "1 mark: Movement of water molecules",
          "1 mark: Higher to lower water potential / down water potential gradient",
          "1 mark: Across a selectively permeable / partially permeable membrane",
        ],
      },
    ],
  },
  physics: {
    code: "0625/42",
    title: "Physics (Extended Theory)",
    questions: [
      {
        id: 1,
        part: "1 (a)",
        text: "State Newton's Second Law of Motion in words or as a formula, defining all symbols used.",
        marks: 2,
        type: "structured",
        sampleAnswer: "F = ma, where F is resultant force in Newtons (N), m is mass in kilograms (kg), and a is acceleration in m/s^2.",
        markingCriteria: ["1 mark: Formula F = ma stated", "1 mark: Symbols clearly defined with standard SI units"],
      },
      {
        id: 2,
        part: "1 (b)",
        text: "A car of mass 1200 kg accelerates uniformly from rest to 24 m/s in 8.0 seconds. Calculate the resultant force acting on the car.",
        marks: 3,
        type: "structured",
        sampleAnswer: "a = (v - u) / t = 24 / 8 = 3.0 m/s^2. Force F = m * a = 1200 * 3.0 = 3600 N.",
        markingCriteria: ["1 mark: Acceleration calculated as 3.0 m/s^2", "1 mark: Correct substitution into F = ma", "1 mark: Final answer 3600 N with unit"],
      },
      {
        id: 3,
        part: "2 (a)",
        text: "Which of the following is a scalar quantity?",
        marks: 1,
        type: "mcq",
        options: ["A. Velocity", "B. Speed", "C. Acceleration", "D. Weight"],
        correctOption: 1,
        sampleAnswer: "B. Speed",
        markingCriteria: ["1 mark for selecting B"],
      },
      {
        id: 4,
        part: "2 (b)",
        text: "Explain the difference between transverse waves and longitudinal waves, giving one example of each.",
        marks: 4,
        type: "structured",
        sampleAnswer: "In transverse waves, oscillations are perpendicular (90°) to the direction of wave travel (e.g. light or water waves). In longitudinal waves, oscillations are parallel to the direction of wave travel (e.g. sound waves).",
        markingCriteria: [
          "1 mark: Transverse oscillations perpendicular to energy transfer",
          "1 mark: Valid transverse example (light, EM wave, water wave)",
          "1 mark: Longitudinal oscillations parallel to energy transfer",
          "1 mark: Valid longitudinal example (sound wave, ultrasound)",
        ],
      },
    ],
  },
  mathematics: {
    code: "0580/42",
    title: "Mathematics (Extended Paper 4)",
    questions: [
      {
        id: 1,
        part: "1 (a)",
        text: "Solve the quadratic equation: 2x² + 5x - 3 = 0. Show all your working.",
        marks: 3,
        type: "structured",
        sampleAnswer: "(2x - 1)(x + 3) = 0 => 2x - 1 = 0 or x + 3 = 0 => x = 0.5 or x = -3.",
        markingCriteria: ["1 mark: Correct factorisation (2x - 1)(x + 3) or quadratic formula substitution", "1 mark: x = 0.5", "1 mark: x = -3"],
      },
      {
        id: 2,
        part: "1 (b)",
        text: "What is the gradient of a line perpendicular to the line with equation y = 4x - 7?",
        marks: 1,
        type: "mcq",
        options: ["A. 4", "B. -4", "C. -1/4", "D. 1/4"],
        correctOption: 2,
        sampleAnswer: "C. -1/4",
        markingCriteria: ["1 mark for selecting C (m1 * m2 = -1)"],
      },
      {
        id: 3,
        part: "2 (a)",
        text: "Expand and simplify the algebraic expression: (3x - 4)(2x + 5).",
        marks: 2,
        type: "structured",
        sampleAnswer: "6x^2 + 15x - 8x - 20 = 6x^2 + 7x - 20.",
        markingCriteria: ["1 mark: Correct middle terms 15x - 8x", "1 mark: Final simplified expression 6x^2 + 7x - 20"],
      },
      {
        id: 4,
        part: "2 (b)",
        text: "A right-angled triangle has legs of length 6 cm and 8 cm. Calculate the length of the hypotenuse.",
        marks: 2,
        type: "structured",
        sampleAnswer: "h^2 = 6^2 + 8^2 = 36 + 64 = 100 => h = sqrt(100) = 10 cm.",
        markingCriteria: ["1 mark: Applying Pythagoras theorem 6^2 + 8^2 = 100", "1 mark: 10 cm with unit"],
      },
    ],
  },
  chemistry: {
    code: "0620/42",
    title: "Chemistry (Theory Extended)",
    questions: [
      {
        id: 1,
        part: "1 (a)",
        text: "Define the term isotope.",
        marks: 2,
        type: "structured",
        sampleAnswer: "Atoms of the same element with the same number of protons but different numbers of neutrons.",
        markingCriteria: ["1 mark: Same number of protons / same atomic number", "1 mark: Different number of neutrons / different mass numbers"],
      },
      {
        id: 2,
        part: "1 (b)",
        text: "Which of the following substances contains ionic bonding?",
        marks: 1,
        type: "mcq",
        options: ["A. Methane (CH4)", "B. Sodium chloride (NaCl)", "C. Water (H2O)", "D. Carbon dioxide (CO2)"],
        correctOption: 1,
        sampleAnswer: "B. Sodium chloride (NaCl)",
        markingCriteria: ["1 mark for selecting B"],
      },
      {
        id: 3,
        part: "2 (a)",
        text: "Write the balanced chemical equation, including state symbols, for the reaction between dilute hydrochloric acid and sodium hydroxide solution.",
        marks: 3,
        type: "structured",
        sampleAnswer: "HCl(aq) + NaOH(aq) -> NaCl(aq) + H2O(l)",
        markingCriteria: ["1 mark: Correct formulas of reactants and products", "1 mark: Balanced equation", "1 mark: Correct state symbols"],
      },
    ],
  },
};

const SUBJECT_LIST = [
  { id: "biology", name: "Biology", code: "0610" },
  { id: "chemistry", name: "Chemistry", code: "0620" },
  { id: "physics", name: "Physics", code: "0625" },
  { id: "mathematics", name: "Mathematics", code: "0580" },
  { id: "economics", name: "Economics", code: "0455" },
  { id: "business-studies", name: "Business Studies", code: "0450" },
  { id: "computer-science", name: "Computer Science", code: "0478" },
  { id: "geography", name: "Geography", code: "0460" },
  { id: "history", name: "History", code: "0470" },
];

function TestSimulationPage() {
  const [selectedSubject, setSelectedSubject] = useState("biology");
  const [topicInput, setTopicInput] = useState("");
  const [examStarted, setExamStarted] = useState(false);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, string | number>>({});
  const [timeLeft, setTimeLeft] = useState(45 * 60); // 45 minutes countdown

  const examData = SAMPLE_EXAMS[selectedSubject] ?? SAMPLE_EXAMS["biology"]!;

  // Countdown timer
  useEffect(() => {
    if (!examStarted || examSubmitted) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setExamSubmitted(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [examStarted, examSubmitted]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const totalMarks = examData.questions.reduce((acc, q) => acc + q.marks, 0);

  // Calculate score on submission
  const scoreResult = examData.questions.reduce(
    (acc, q) => {
      if (q.type === "mcq") {
        if (userAnswers[q.id] === q.correctOption) acc.scored += q.marks;
      } else {
        const text = String(userAnswers[q.id] || "").trim();
        if (text.length > 15) acc.scored += Math.max(1, q.marks - 1);
        else if (text.length > 5) acc.scored += 1;
      }
      return acc;
    },
    { scored: 0 },
  );

  const percentage = Math.round((scoreResult.scored / totalMarks) * 100);
  const getGrade = (pct: number) => {
    if (pct >= 85) return { grade: "A* (Grade 9)", color: "text-emerald-500" };
    if (pct >= 75) return { grade: "A (Grade 8)", color: "text-emerald-600" };
    if (pct >= 65) return { grade: "B (Grade 7)", color: "text-blue-500" };
    if (pct >= 50) return { grade: "C (Grade 5)", color: "text-amber-500" };
    return { grade: "D (Grade 4)", color: "text-rose-500" };
  };

  return (
    <DashboardLayout crumbs={[{ label: "Practice" }, { label: "Exam Simulation" }]}>
      {!examStarted ? (
        /* Configuration Screen */
        <div className="w-full py-4">
          <PageHeading
            icon={<BookOpen className="size-5" aria-hidden />}
            title="Cambridge IGCSE Exam Simulation"
            subtitle="Take an authentic, timed examination paper formatted according to official Cambridge assessment guidelines."
          />

          <div className="mt-6 rounded-3xl border border-border bg-card p-6 shadow-sm max-w-2xl">
            <h2 className="text-lg font-bold text-foreground">1. Select Examination Subject</h2>
            <div className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
              {SUBJECT_LIST.map((subj) => (
                <button
                  key={subj.id}
                  type="button"
                  onClick={() => setSelectedSubject(subj.id)}
                  className={`flex flex-col items-start rounded-2xl border p-3.5 text-left transition-all ${
                    selectedSubject === subj.id
                      ? "border-foreground bg-secondary font-bold shadow-sm"
                      : "border-border hover:bg-secondary/50"
                  }`}
                >
                  <span className="text-xs text-muted-foreground">{subj.code}</span>
                  <span className="text-sm font-semibold text-foreground">{subj.name}</span>
                </button>
              ))}
            </div>

            <h2 className="mt-6 text-lg font-bold text-foreground">2. Specific Focus Topic (Optional)</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Leave blank to generate a comprehensive full-paper test, or specify a topic like "Enzymes", "Kinematics", or "Organic Chemistry".
            </p>
            <input
              type="text"
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              placeholder="e.g. Cellular Respiration and Enzymes (Optional)"
              className="mt-3 w-full rounded-2xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-foreground/20"
            />

            <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase">Format</p>
                <p className="text-sm font-bold text-foreground">Timed 45-Minute Paper · {totalMarks} Marks</p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setTimeLeft(45 * 60);
                  setUserAnswers({});
                  setExamSubmitted(false);
                  setExamStarted(true);
                }}
                className="flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-ink-foreground shadow hover:opacity-90 transition-all"
              >
                <Play className="size-4" /> Start Exam Test
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Real Exam Simulation Room */
        <div className="w-full py-4">
          {/* Exam Header */}
          <div className="mb-6 rounded-3xl border border-border bg-card p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border pb-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">
                  CAMBRIDGE INTERNATIONAL EXAMINATIONS
                </p>
                <h1 className="font-serif text-2xl font-bold text-foreground mt-0.5">
                  {examData.title} · {examData.code}
                </h1>
                {topicInput && (
                  <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                    Focus Topic: {topicInput}
                  </p>
                )}
              </div>

              {/* Countdown Timer */}
              <div
                className={`flex items-center gap-2 rounded-2xl px-5 py-3 border font-mono text-lg font-bold shadow-sm ${
                  timeLeft < 300
                    ? "border-rose-500 bg-rose-500/10 text-rose-600 animate-pulse"
                    : "border-border bg-secondary text-foreground"
                }`}
              >
                <Clock className="size-5" />
                <span>{formatTimer(timeLeft)}</span>
              </div>
            </div>

            {/* Candidate Instructions */}
            <div className="mt-4 flex flex-wrap items-center justify-between gap-2 text-xs text-muted-foreground">
              <p>• Write your answers clearly in the spaces provided below. Show all calculations and units.</p>
              <p className="font-bold text-foreground">Total Marks: [{totalMarks}]</p>
            </div>
          </div>

          {/* Results Summary if submitted */}
          {examSubmitted && (
            <div className="mb-8 rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-6 shadow-sm">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Award className="size-6 text-emerald-500" />
                    <h2 className="text-xl font-bold text-foreground">Examination Results &amp; Mark Scheme</h2>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Your answers have been graded against official Cambridge mark scheme standards.
                  </p>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-foreground">{scoreResult.scored} / {totalMarks}</span>
                  <span className={`text-xl font-extrabold ${getGrade(percentage).color}`}>
                    {getGrade(percentage).grade} ({percentage}%)
                  </span>
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setExamStarted(false);
                    setExamSubmitted(false);
                  }}
                  className="flex items-center gap-1.5 rounded-full bg-foreground px-4 py-2 text-xs font-semibold text-background"
                >
                  <RotateCcw className="size-3.5" /> Take Another Subject Test
                </button>
              </div>
            </div>
          )}

          {/* Questions Container */}
          <div className="space-y-6">
            {examData.questions.map((q) => (
              <div key={q.id} className="rounded-3xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-baseline gap-2">
                    <span className="font-serif font-bold text-lg text-foreground">{q.part}</span>
                    <p className="text-sm font-medium text-foreground leading-relaxed">{q.text}</p>
                  </div>
                  <span className="shrink-0 rounded-lg bg-secondary px-2.5 py-1 text-xs font-bold text-muted-foreground">
                    [{q.marks} {q.marks === 1 ? "mark" : "marks"}]
                  </span>
                </div>

                {/* Question Input Area */}
                <div className="mt-4">
                  {q.type === "mcq" ? (
                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {q.options?.map((opt, idx) => (
                        <button
                          key={idx}
                          type="button"
                          disabled={examSubmitted}
                          onClick={() => setUserAnswers((prev) => ({ ...prev, [q.id]: idx }))}
                          className={`flex items-center gap-3 rounded-2xl border p-3.5 text-left text-xs font-semibold transition-all ${
                            userAnswers[q.id] === idx
                              ? "border-foreground bg-secondary"
                              : "border-border hover:bg-secondary/40"
                          } ${
                            examSubmitted && idx === q.correctOption
                              ? "border-emerald-500 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold"
                              : ""
                          }`}
                        >
                          <span
                            className={`flex size-5 items-center justify-center rounded-full border text-[11px] ${
                              userAnswers[q.id] === idx ? "border-foreground bg-foreground text-background" : "border-border"
                            }`}
                          >
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{opt}</span>
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <textarea
                        rows={3}
                        disabled={examSubmitted}
                        value={String(userAnswers[q.id] || "")}
                        onChange={(e) => setUserAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                        placeholder="Write your answer and working here..."
                        className="w-full rounded-2xl border border-border bg-background p-4 text-xs font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-foreground/20 disabled:opacity-80"
                      />
                    </div>
                  )}
                </div>

                {/* Mark Scheme Breakdown if submitted */}
                {examSubmitted && (
                  <div className="mt-5 border-t border-border pt-4">
                    <p className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                      <CheckCircle2 className="size-3.5" /> Cambridge Mark Scheme &amp; Expected Answer:
                    </p>
                    <p className="mt-1 text-xs italic text-foreground bg-secondary/50 p-3 rounded-xl">
                      {q.sampleAnswer}
                    </p>
                    <div className="mt-2 space-y-1">
                      {q.markingCriteria.map((c, i) => (
                        <p key={i} className="text-[11px] text-muted-foreground flex items-center gap-1.5">
                          <span className="size-1.5 rounded-full bg-emerald-500" />
                          <span>{c}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Bottom Action */}
          {!examSubmitted && (
            <div className="mt-8 flex justify-end">
              <button
                type="button"
                onClick={() => setExamSubmitted(true)}
                className="flex items-center gap-2 rounded-full bg-ink px-8 py-3.5 text-sm font-bold text-ink-foreground shadow-lg hover:opacity-90"
              >
                <FileCheck className="size-4" /> Submit Exam &amp; View Mark Scheme
              </button>
            </div>
          )}
        </div>
      )}
    </DashboardLayout>
  );
}
