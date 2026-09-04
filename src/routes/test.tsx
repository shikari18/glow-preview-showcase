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
  FileCheck,
  Printer,
  Loader2,
  Sliders,
  Search,
  Lock,
} from "lucide-react";

import { DashboardLayout } from "@/components/dashboard-page";
import { callGemini } from "@/lib/ai-router";
import { igcseSubjects } from "@/lib/igcse-syllabuses";
import { isPaidUser } from "@/lib/onboarding";
import { PaywallModal } from "@/components/paywall-modal";

export const Route = createFileRoute("/test")({
  head: () => ({
    meta: [
      { title: "Exam Test Simulation | ExamGlow" },
      {
        name: "description",
        content: "Official Cambridge IGCSE examination paper simulation with authentic form layout, live timer, and mark scheme.",
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
  linesCount: number;
  type: "mcq" | "structured";
  options?: string[];
  correctOption?: number;
  sampleAnswer: string;
  markingCriteria: string[];
};

type QuestionPaper = {
  subject?: string;
  code: string;
  paperCode?: string;
  series?: string;
  title: string;
  syllabus: string;
  timeAllowedMinutes?: number;
  totalMarks?: number;
  instructions?: string[];
  questions: Question[];
};

const SAMPLE_EXAMS: Record<string, QuestionPaper> = {
  biology: {
    code: "0610/22",
    title: "Biology",
    syllabus: "Paper 2 Theory (Extended)",
    questions: [
      {
        id: 1,
        part: "1 (a) (i)",
        text: "State the balanced chemical equation for aerobic cellular respiration in human tissue cells.",
        marks: 2,
        linesCount: 2,
        type: "structured",
        sampleAnswer: "C6H12O6 + 6O2 -> 6CO2 + 6H2O (+ 2880 kJ / ATP)",
        markingCriteria: ["1 mark: Correct chemical formulas for glucose and oxygen", "1 mark: Balanced equation with carbon dioxide and water"],
      },
      {
        id: 2,
        part: "1 (a) (ii)",
        text: "Name the cell organelle where the enzymes responsible for aerobic respiration are located.",
        marks: 1,
        linesCount: 1,
        type: "structured",
        sampleAnswer: "Mitochondria / Mitochondrion",
        markingCriteria: ["1 mark for mitochondria"],
      },
      {
        id: 3,
        part: "1 (b)",
        text: "Which of the following cellular structures is present in plant epidermal cells but absent from human epithelial cells?",
        marks: 1,
        linesCount: 1,
        type: "mcq",
        options: ["A. Cell membrane", "B. Ribosomes", "C. Cellulose cell wall", "D. Mitochondria"],
        correctOption: 2,
        sampleAnswer: "C. Cellulose cell wall",
        markingCriteria: ["1 mark for selecting C"],
      },
      {
        id: 4,
        part: "2 (a)",
        text: "Explain, in terms of collision theory and molecular shape, why enzyme activity decreases rapidly at temperatures above 45°C.",
        marks: 3,
        linesCount: 3,
        type: "structured",
        sampleAnswer: "At excessive temperatures, excessive kinetic energy breaks hydrogen bonds maintaining the tertiary structure. The active site permanently alters shape (denaturation), meaning substrate molecules can no longer fit to form enzyme-substrate complexes.",
        markingCriteria: [
          "1 mark: High kinetic energy breaks tertiary bonds",
          "1 mark: Active site alters shape (denatures)",
          "1 mark: Substrate cannot fit / no enzyme-substrate complexes form",
        ],
      },
      {
        id: 5,
        part: "2 (b)",
        text: "Define the term osmosis according to the Cambridge syllabus standard.",
        marks: 3,
        linesCount: 3,
        type: "structured",
        sampleAnswer: "Osmosis is the net diffusion of water molecules from an area of higher water potential to an area of lower water potential across a partially permeable membrane.",
        markingCriteria: [
          "1 mark: Net movement of water molecules",
          "1 mark: Down a water potential gradient (higher to lower water potential)",
          "1 mark: Through a partially / selectively permeable membrane",
        ],
      },
    ],
  },
  physics: {
    code: "0625/42",
    title: "Physics",
    syllabus: "Paper 4 Theory (Extended)",
    questions: [
      {
        id: 1,
        part: "1 (a)",
        text: "State Newton's Second Law of Motion in words or as an equation, defining each symbol used.",
        marks: 2,
        linesCount: 2,
        type: "structured",
        sampleAnswer: "F = ma, where F is the resultant force in Newtons (N), m is the mass in kilograms (kg), and a is the acceleration in m/s².",
        markingCriteria: ["1 mark: Formula F = ma stated", "1 mark: Standard SI symbols defined"],
      },
      {
        id: 2,
        part: "1 (b)",
        text: "A vehicle of mass 1200 kg accelerates uniformly from rest to a velocity of 24 m/s in 8.0 seconds. Calculate the magnitude of the resultant force acting on the vehicle.",
        marks: 3,
        linesCount: 3,
        type: "structured",
        sampleAnswer: "a = (v - u) / t = (24 - 0) / 8 = 3.0 m/s². Force F = m * a = 1200 * 3.0 = 3600 N.",
        markingCriteria: ["1 mark: Acceleration calculated as 3.0 m/s²", "1 mark: Substitution into F = ma", "1 mark: Final value 3600 N with unit"],
      },
      {
        id: 3,
        part: "2 (a)",
        text: "Which of the following physical quantities is a vector?",
        marks: 1,
        linesCount: 1,
        type: "mcq",
        options: ["A. Mass", "B. Energy", "C. Velocity", "D. Speed"],
        correctOption: 2,
        sampleAnswer: "C. Velocity",
        markingCriteria: ["1 mark for selecting C"],
      },
      {
        id: 4,
        part: "2 (b)",
        text: "State two differences between transverse waves and longitudinal waves.",
        marks: 2,
        linesCount: 2,
        type: "structured",
        sampleAnswer: "1. Transverse wave oscillations are perpendicular to energy propagation, whereas longitudinal oscillations are parallel.\n2. Longitudinal waves consist of compressions and rarefactions, whereas transverse waves consist of crests and troughs.",
        markingCriteria: [
          "1 mark: Oscillations perpendicular vs parallel to direction of travel",
          "1 mark: Compressions/rarefactions vs crests/troughs",
        ],
      },
    ],
  },
  mathematics: {
    code: "0580/42",
    title: "Mathematics",
    syllabus: "Paper 4 (Extended)",
    questions: [
      {
        id: 1,
        part: "1 (a)",
        text: "Solve the quadratic equation 2x² + 5x - 3 = 0. Show all steps of your working.",
        marks: 3,
        linesCount: 3,
        type: "structured",
        sampleAnswer: "(2x - 1)(x + 3) = 0  =>  x = 0.5 or x = -3.",
        markingCriteria: ["1 mark: Correct factorisation or quadratic formula substitution", "1 mark: x = 0.5", "1 mark: x = -3"],
      },
      {
        id: 2,
        part: "1 (b)",
        text: "What is the gradient of a straight line perpendicular to the line with equation y = 4x - 7?",
        marks: 1,
        linesCount: 1,
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
        linesCount: 2,
        type: "structured",
        sampleAnswer: "6x² + 15x - 8x - 20 = 6x² + 7x - 20.",
        markingCriteria: ["1 mark: Correct middle expansion terms 15x - 8x", "1 mark: Simplified expression 6x² + 7x - 20"],
      },
    ],
  },
};

const BASE_SUBJECTS = [
  { id: "biology", name: "Biology", code: "0610" },
  { id: "chemistry", name: "Chemistry", code: "0620" },
  { id: "physics", name: "Physics", code: "0625" },
  { id: "mathematics", name: "Mathematics", code: "0580" },
  { id: "economics", name: "Economics", code: "0455" },
  { id: "computer-science", name: "Computer Science", code: "0478" },
  { id: "geography", name: "Geography", code: "0460" },
  { id: "business-studies", name: "Business Studies", code: "0450" },
];

const ALL_SUBJECTS = [
  ...BASE_SUBJECTS,
  ...igcseSubjects
    .filter((s) => !BASE_SUBJECTS.some((x) => x.id === s.id))
    .map((s) => ({ id: s.id, name: s.name, code: s.code })),
];

function TestSimulationPage() {
  const [selectedSubject, setSelectedSubject] = useState("biology");
  const [subjectSearch, setSubjectSearch] = useState("");
  const [showPaywall, setShowPaywall] = useState(false);
  const [topicInput, setTopicInput] = useState("");
  const [questionMode, setQuestionMode] = useState<"both" | "objectives" | "theory">("both");
  const [objCount, setObjCount] = useState(15);
  const [theoryCount, setTheoryCount] = useState(5);
  const [isCompiling, setIsCompiling] = useState(false);
  const [customExam, setCustomExam] = useState<QuestionPaper | null>(null);

  const [candidateName, setCandidateName] = useState("Alex Johnson");
  const [centreNumber, setCentreNumber] = useState("GB120");
  const [candidateNumber, setCandidateNumber] = useState("0421");
  const [examStarted, setExamStarted] = useState(false);
  const [examSubmitted, setExamSubmitted] = useState(false);
  const [userAnswers, setUserAnswers] = useState<Record<number, string | number>>({});
  const [timeLeft, setTimeLeft] = useState(45 * 60);

  const filteredSubjects = ALL_SUBJECTS.filter(
    (s) =>
      s.name.toLowerCase().includes(subjectSearch.toLowerCase()) ||
      s.code.includes(subjectSearch)
  );

  const activeSubjectInfo = ALL_SUBJECTS.find((s) => s.id === selectedSubject) ?? ALL_SUBJECTS[0]!;
  const examData: QuestionPaper =
    customExam ?? SAMPLE_EXAMS[selectedSubject] ?? SAMPLE_EXAMS["biology"]!;

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

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const totalMarks = examData.questions.reduce((acc: number, q: Question) => acc + q.marks, 0);

  const scoreResult = examData.questions.reduce(
    (acc: { scored: number }, q: Question) => {
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

  const percentage = Math.round((scoreResult.scored / (totalMarks || 1)) * 100);

  async function handleStartExam() {
    // Free user limit: 1 test simulation
    const testCount = typeof window !== "undefined" ? parseInt(localStorage.getItem("examglow.test_count") || "0", 10) : 0;
    if (!isPaidUser() && testCount >= 1) {
      setShowPaywall(true);
      return;
    }
    if (typeof window !== "undefined") {
      localStorage.setItem("examglow.test_count", String(testCount + 1));
    }

    setIsCompiling(true);
    const targetObj = questionMode === "theory" ? 0 : objCount;
    const targetTheory = questionMode === "objectives" ? 0 : theoryCount;

    const prompt = `You are a Senior Cambridge IGCSE Examiner. Generate an authentic official examination paper in valid JSON format.
Subject: ${activeSubjectInfo.name} (Code ${activeSubjectInfo.code}).
${topicInput.trim() ? `Specific Syllabus Topic: ${topicInput.trim()}` : "Full Subject Syllabus Scope"}.
Exam Format: ${questionMode}
Requirements:
- Exactly ${targetObj} Multiple Choice Questions (type: "mcq", 4 options labeled A/B/C/D, correctOption index 0-3, marks: 1).
- Exactly ${targetTheory} Structured Theory Questions (type: "structured", 2 to 4 marks each, linesCount: 2 to 5, sampleAnswer, and markingCriteria array).

Return STRICTLY a JSON object without surrounding prose:
{
  "paperCode": "${activeSubjectInfo.code}/22",
  "series": "May/June 2025",
  "questions": [
    {
      "id": 1,
      "part": "1",
      "type": "mcq",
      "text": "Question text...",
      "marks": 1,
      "options": ["A. ...", "B. ...", "C. ...", "D. ..."],
      "correctOption": 0,
      "markingCriteria": ["1 mark for correct selection"]
    }
  ]
}`;

    try {
      const res = await callGemini([{ role: "user", content: prompt }], 2048, 0.6);
      if (res?.text) {
        const jsonMatch = res.text.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]) as {
            paperCode?: string;
            series?: string;
            questions?: Question[];
          };
          if (Array.isArray(parsed.questions) && parsed.questions.length > 0) {
            setCustomExam({
              subject: activeSubjectInfo.name,
              code: activeSubjectInfo.code,
              paperCode: parsed.paperCode || `${activeSubjectInfo.code}/22`,
              series: parsed.series || "May/June 2025",
              title: activeSubjectInfo.name,
              syllabus: `${activeSubjectInfo.name} Exam`,
              timeAllowedMinutes: Math.max(30, targetObj * 1.5 + targetTheory * 5),
              totalMarks: parsed.questions.reduce((n: number, q: Question) => n + q.marks, 0),
              instructions: [
                "Answer all questions in black or dark blue pen.",
                "Write your name, centre number and candidate number in the boxes at the top of the page.",
                "Show all necessary working clearly.",
              ],
              questions: parsed.questions,
            });
          }
        }
      }
    } catch (err) {
      console.warn("AI exam generation fell back to preset:", err);
    } finally {
      setIsCompiling(false);
      setTimeLeft(45 * 60);
      setUserAnswers({});
      setExamSubmitted(false);
      setExamStarted(true);
    }
  }

  return (
    <DashboardLayout crumbs={[{ label: "Practice" }, { label: "Exam Simulation" }]}>
      <PaywallModal
        open={showPaywall}
        onClose={() => setShowPaywall(false)}
        title="Unlock Cambridge Examination Papers"
        subtitle="You have completed your free trial exam paper. Upgrade to ExamGlow Premium to generate unlimited Cambridge IGCSE mock exams across all 40+ subjects with full mark schemes."
      />

      {!examStarted ? (
        /* Setup Screen */
        <div className="w-full max-w-2xl py-4">
          <div className="rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-2 mb-1">
              <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <BookOpen className="size-4" />
              </span>
              <h1 className="text-xl font-bold text-foreground">Cambridge Examination Setup</h1>
            </div>
            <p className="text-xs text-muted-foreground">
              Configure your exam format (Objectives, Theory, or Both) and let Yumna AI generate an authentic Cambridge examination booklet.
            </p>

            <div className="mt-6 space-y-5">
              {/* Subject search and selector */}
              <div>
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wide">
                    Select Examination Subject ({ALL_SUBJECTS.length} subjects available)
                  </label>
                  <span className="text-[11px] text-muted-foreground">
                    Selected: <strong className="text-foreground">{activeSubjectInfo.name} ({activeSubjectInfo.code})</strong>
                  </span>
                </div>

                <div className="relative mt-2">
                  <Search className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={subjectSearch}
                    onChange={(e) => setSubjectSearch(e.target.value)}
                    placeholder="Search 40+ subjects by name or syllabus code (e.g. 0478, Physics, Economics, Geography)..."
                    className="w-full rounded-xl border border-border bg-background pl-9 pr-3.5 py-2 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                  />
                </div>

                <div className="mt-2.5 max-h-48 overflow-y-auto rounded-2xl border border-border/70 p-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
                  {filteredSubjects.map((subj) => (
                    <button
                      key={subj.id}
                      type="button"
                      onClick={() => setSelectedSubject(subj.id)}
                      className={`rounded-xl border p-2.5 text-center text-xs font-bold transition-all ${
                        selectedSubject === subj.id
                          ? "border-primary bg-primary/10 text-primary font-extrabold shadow-sm"
                          : "border-border/60 hover:bg-secondary/40 text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      <span className="block text-[10px] opacity-70">{subj.code}</span>
                      <span className="truncate block">{subj.name}</span>
                    </button>
                  ))}
                  {filteredSubjects.length === 0 && (
                    <div className="col-span-full py-4 text-center text-xs text-muted-foreground">
                      No subjects found matching "{subjectSearch}". Try another search term.
                    </div>
                  )}
                </div>
              </div>

              {/* Optional Topic Input */}
              <div>
                <label className="text-xs font-bold text-foreground uppercase tracking-wide">
                  Specific Topic <span className="text-[10px] font-normal lowercase text-muted-foreground">(optional)</span>
                </label>
                <input
                  type="text"
                  value={topicInput}
                  onChange={(e) => setTopicInput(e.target.value)}
                  placeholder="e.g. Photosynthesis, Kinetic Theory, Newton's Laws (or leave blank for full syllabus)"
                  className="mt-1 w-full rounded-xl border border-border bg-background px-3.5 py-2.5 text-xs text-foreground placeholder:text-muted-foreground outline-none focus:border-primary"
                />
              </div>

              {/* Question Format Mode: Objectives, Theory, or Both */}
              <div>
                <label className="text-xs font-bold text-foreground uppercase tracking-wide">Question Paper Format</label>
                <div className="mt-2 grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setQuestionMode("both")}
                    className={`rounded-xl border p-2.5 text-center text-xs font-bold transition-all ${
                      questionMode === "both"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:bg-secondary text-muted-foreground"
                    }`}
                  >
                    Both (Objectives &amp; Theory)
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuestionMode("objectives")}
                    className={`rounded-xl border p-2.5 text-center text-xs font-bold transition-all ${
                      questionMode === "objectives"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:bg-secondary text-muted-foreground"
                    }`}
                  >
                    Objectives Only (MCQ)
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuestionMode("theory")}
                    className={`rounded-xl border p-2.5 text-center text-xs font-bold transition-all ${
                      questionMode === "theory"
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border hover:bg-secondary text-muted-foreground"
                    }`}
                  >
                    Theory Only (Structured)
                  </button>
                </div>
              </div>

              {/* Question Count Selectors */}
              <div className="grid grid-cols-2 gap-4">
                {questionMode !== "theory" && (
                  <div>
                    <label className="text-xs font-bold text-foreground uppercase tracking-wide">
                      Objectives Count (Default 15)
                    </label>
                    <input
                      type="number"
                      min={5}
                      max={40}
                      value={objCount}
                      onChange={(e) => setObjCount(parseInt(e.target.value, 10) || 15)}
                      className="mt-1 w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs font-mono font-bold"
                    />
                  </div>
                )}
                {questionMode !== "objectives" && (
                  <div>
                    <label className="text-xs font-bold text-foreground uppercase tracking-wide">
                      Theory Count (Default 5)
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={15}
                      value={theoryCount}
                      onChange={(e) => setTheoryCount(parseInt(e.target.value, 10) || 5)}
                      className="mt-1 w-full rounded-xl border border-border bg-background px-3.5 py-2 text-xs font-mono font-bold"
                    />
                  </div>
                )}
              </div>

              {/* Candidate Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-border pt-4">
                <div>
                  <label className="text-[11px] font-bold text-muted-foreground uppercase">Candidate Name</label>
                  <input
                    type="text"
                    value={candidateName}
                    onChange={(e) => setCandidateName(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-muted-foreground uppercase">Centre Number</label>
                  <input
                    type="text"
                    value={centreNumber}
                    onChange={(e) => setCentreNumber(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-mono"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-muted-foreground uppercase">Candidate Number</label>
                  <input
                    type="text"
                    value={candidateNumber}
                    onChange={(e) => setCandidateNumber(e.target.value)}
                    className="mt-1 w-full rounded-xl border border-border bg-background px-3 py-1.5 text-xs font-mono"
                  />
                </div>
              </div>

              <button
                type="button"
                disabled={isCompiling}
                onClick={handleStartExam}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl bg-ink py-3.5 text-xs font-bold text-ink-foreground shadow-md hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isCompiling ? (
                  <>
                    <Loader2 className="size-4 animate-spin" /> Compiling Authentic Cambridge Paper via AI...
                  </>
                ) : (
                  <>
                    <Play className="size-4" /> Start Official Examination Paper
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Authentic Cambridge Printed Examination Paper Booklet */
        <div className="w-full max-w-3xl py-4">
          {/* Top Live Timer Bar */}
          <div className="mb-4 flex items-center justify-between rounded-2xl border border-border bg-card px-5 py-3 shadow-sm">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-emerald-500 animate-ping" />
              <span className="text-xs font-bold text-foreground">Examination in Progress</span>
            </div>
            <div
              className={`flex items-center gap-2 rounded-xl px-3 py-1 font-mono text-sm font-bold border ${
                timeLeft < 300
                  ? "border-rose-500 bg-rose-500/10 text-rose-600 animate-pulse"
                  : "border-border bg-secondary text-foreground"
              }`}
            >
              <Clock className="size-4" />
              <span>{formatTimer(timeLeft)}</span>
            </div>
          </div>

          {/* Official Cambridge Examination Form Booklet */}
          <div className="rounded-xl border border-zinc-300 bg-white text-zinc-900 shadow-xl p-8 sm:p-12 font-serif select-none dark:bg-zinc-950 dark:border-zinc-800 dark:text-zinc-100">
            {/* Candidate Cover Box Table */}
            <div className="border-2 border-zinc-900 p-5 dark:border-zinc-300">
              <div className="border-b border-zinc-900 pb-3 text-center dark:border-zinc-300">
                <p className="text-[12px] font-bold uppercase tracking-widest text-zinc-700 dark:text-zinc-300 font-sans">
                  Cambridge Assessment International Education
                </p>
                <p className="text-xs font-semibold text-zinc-500 font-sans mt-0.5">
                  Cambridge International General Certificate of Secondary Education
                </p>
              </div>

              {/* Candidate Info Grid */}
              <div className="mt-4 grid grid-cols-1 gap-4 font-sans text-xs sm:grid-cols-2">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-zinc-600 dark:text-zinc-400">
                    CANDIDATE NAME
                  </label>
                  <p className="mt-1 border-b-2 border-dotted border-zinc-900 pb-1 font-mono font-bold text-zinc-900 dark:border-zinc-300 dark:text-zinc-100">
                    {candidateName || "______________________________"}
                  </p>
                </div>

                <div className="flex gap-4">
                  <div className="flex-1">
                    <label className="block text-[11px] font-bold uppercase text-zinc-600 dark:text-zinc-400">
                      CENTRE NUMBER
                    </label>
                    <div className="mt-1 flex border border-zinc-900 dark:border-zinc-300 divide-x divide-zinc-900 dark:divide-zinc-300 font-mono text-center font-bold">
                      {centreNumber.padEnd(5, " ").split("").map((ch, i) => (
                        <span key={i} className="flex-1 py-1">{ch}</span>
                      ))}
                    </div>
                  </div>

                  <div className="flex-1">
                    <label className="block text-[11px] font-bold uppercase text-zinc-600 dark:text-zinc-400">
                      CANDIDATE NUMBER
                    </label>
                    <div className="mt-1 flex border border-zinc-900 dark:border-zinc-300 divide-x divide-zinc-900 dark:divide-zinc-300 font-mono text-center font-bold">
                      {candidateNumber.padEnd(4, " ").split("").map((ch, i) => (
                        <span key={i} className="flex-1 py-1">{ch}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Title & Timing Row */}
              <div className="mt-5 border-t border-zinc-900 pt-3 flex items-baseline justify-between dark:border-zinc-300">
                <div>
                  <h2 className="text-lg font-bold tracking-tight text-zinc-900 dark:text-zinc-100 uppercase">
                    {examData.title}
                  </h2>
                  <p className="text-xs italic text-zinc-600 dark:text-zinc-400">
                    {examData.syllabus}
                  </p>
                </div>
                <div className="text-right font-sans text-xs">
                  <p className="font-bold">{examData.code}</p>
                  <p className="text-zinc-500">45 minutes</p>
                </div>
              </div>

              {/* Instructions to Candidates */}
              <div className="mt-4 border-t border-dotted border-zinc-400 pt-3 font-sans text-[11px] text-zinc-600 dark:text-zinc-400 space-y-1">
                <p>• Answer all questions in the spaces provided.</p>
                <p>• Write your answers using black or dark blue pen. Show all working for numerical calculations.</p>
                <p>• The number of marks is given in brackets [ ] at the end of each question or part question.</p>
              </div>
            </div>

            {/* Questions Form Body */}
            <div className="mt-8 space-y-8">
              {examData.questions.map((q: Question) => (
                <div key={q.id} className="relative pt-4">
                  {/* Question Header with Marks on Right Margin */}
                  <div className="flex items-baseline justify-between gap-4">
                    <p className="text-sm font-semibold leading-relaxed">
                      <span className="font-bold mr-2">{q.part}</span>
                      {q.text}
                    </p>
                    <span className="shrink-0 font-sans text-xs font-bold text-zinc-600 dark:text-zinc-400">
                      [{q.marks}]
                    </span>
                  </div>

                  {/* Form Answer Area */}
                  <div className="mt-4">
                    {q.type === "mcq" ? (
                      <div className="grid grid-cols-1 gap-2 font-sans text-xs sm:grid-cols-2 pl-4">
                        {q.options?.map((opt: string, idx: number) => (
                          <button
                            key={idx}
                            type="button"
                            disabled={examSubmitted}
                            onClick={() => setUserAnswers((prev) => ({ ...prev, [q.id]: idx }))}
                            className={`flex items-center gap-3 rounded-lg border p-2.5 text-left transition-all ${
                              userAnswers[q.id] === idx
                                ? "border-zinc-900 bg-zinc-100 font-bold dark:border-zinc-200 dark:bg-zinc-800"
                                : "border-zinc-300 hover:bg-zinc-50 dark:border-zinc-800"
                            } ${
                              examSubmitted && idx === q.correctOption
                                ? "border-emerald-600 bg-emerald-50 text-emerald-800 font-bold dark:bg-emerald-950 dark:text-emerald-300"
                                : ""
                            }`}
                          >
                            <span className="flex size-4 items-center justify-center rounded-sm border border-zinc-700 text-[10px] dark:border-zinc-300 font-mono">
                              {userAnswers[q.id] === idx ? "X" : ""}
                            </span>
                            <span>{opt}</span>
                          </button>
                        ))}
                      </div>
                    ) : (
                      /* Authentic Cambridge Ruled Answer Lines */
                      <div className="space-y-1 pl-4">
                        <textarea
                          rows={q.linesCount}
                          disabled={examSubmitted}
                          value={String(userAnswers[q.id] || "")}
                          onChange={(e) => setUserAnswers((prev) => ({ ...prev, [q.id]: e.target.value }))}
                          placeholder="..................................................................................................................................................................."
                          className="w-full resize-none border-b-2 border-dotted border-zinc-400 bg-transparent py-1 font-mono text-xs leading-6 text-zinc-900 focus:border-zinc-900 focus:outline-none dark:border-zinc-700 dark:text-zinc-100 dark:focus:border-zinc-300"
                        />
                      </div>
                    )}
                  </div>

                  {/* Mark Scheme Breakdown if submitted */}
                  {examSubmitted && (
                    <div className="mt-4 rounded-xl border border-emerald-500/40 bg-emerald-50/50 p-4 font-sans text-xs dark:bg-emerald-950/30">
                      <p className="font-bold text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="size-3.5" /> Cambridge Mark Scheme Criteria:
                      </p>
                      <p className="mt-1 font-mono text-zinc-800 dark:text-zinc-200">{q.sampleAnswer}</p>
                      <ul className="mt-2 space-y-0.5 text-[11px] text-zinc-600 dark:text-zinc-400 list-disc pl-4">
                        {q.markingCriteria.map((c: string, i: number) => (
                          <li key={i}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Exam Paper Footer */}
            <div className="mt-12 border-t border-zinc-900 pt-3 flex items-center justify-between font-sans text-[10px] text-zinc-500 dark:border-zinc-700">
              <p>© Cambridge University Press &amp; Assessment 2024</p>
              <p className="font-mono">{examData.code}</p>
              <p>[Turn over</p>
            </div>
          </div>

          {/* Submit / Finish Action */}
          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              onClick={() => {
                setExamStarted(false);
                setExamSubmitted(false);
              }}
              className="flex items-center gap-1.5 rounded-full border border-border px-4 py-2 text-xs font-semibold text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="size-3.5" /> Exit Examination Hall
            </button>

            {!examSubmitted ? (
              <button
                type="button"
                onClick={() => setExamSubmitted(true)}
                className="flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-xs font-bold text-ink-foreground shadow hover:opacity-90"
              >
                <FileCheck className="size-4" /> Hand in Paper &amp; Calculate Grade
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                  Total Score: {scoreResult.scored} / {totalMarks} ({percentage}%)
                </span>
                <button
                  type="button"
                  onClick={() => {
                    setTimeLeft(45 * 60);
                    setUserAnswers({});
                    setExamSubmitted(false);
                  }}
                  className="rounded-full bg-foreground px-5 py-2 text-xs font-bold text-background"
                >
                  Retake Paper
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
