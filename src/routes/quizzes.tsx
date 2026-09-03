import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ClipboardCheck,
  Play,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Loader2,
  BookOpen,
} from "lucide-react";

import { DashboardLayout, PageHeading } from "@/components/dashboard-page";
import { callGemini } from "@/lib/ai-router";

export const Route = createFileRoute("/quizzes")({
  head: () => ({
    meta: [
      { title: "Quiz | ExamGlow" },
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

function QuizTopicPage() {
  const [topic, setTopic] = useState("");
  const [activeQuiz, setActiveQuiz] = useState<QuizQuestion[] | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startQuizWithTopic(topicToUse: string) {
    const chosenTopic = topicToUse.trim() || "General Science & Mathematics";
    setIsGenerating(true);
    setError(null);

    const prompt = `You are a Cambridge IGCSE Examiner. Generate exactly 5 challenging, syllabus-accurate multiple-choice quiz questions for the topic: "${chosenTopic}".
Respond STRICTLY with a valid JSON array of objects. Do not include markdown code block syntax or any explanation outside the JSON array:
[
  {
    "id": 1,
    "question": "Clear exam-style question text...",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correct": 0,
    "explanation": "Detailed explanation of why this option is correct according to the syllabus marking scheme."
  }
]`;

    try {
      const res = await callGemini([{ role: "user", content: prompt }], 1500, 0.5);
      if (!res?.text) throw new Error("No response from AI tutor.");

      const match = res.text.match(/\[[\s\S]*\]/);
      if (!match) throw new Error("Could not parse quiz questions from AI.");

      const questions = JSON.parse(match[0]) as QuizQuestion[];
      if (!Array.isArray(questions) || questions.length === 0) {
        throw new Error("No questions generated.");
      }

      setActiveQuiz(questions);
      setSelectedAnswers({});
      setSubmitted(false);
    } catch (err) {
      console.error("Quiz generation failed:", err);
      setError("Yumna could not generate this quiz right now. Please try another topic or click again.");
    } finally {
      setIsGenerating(false);
    }
  }

  function startQuiz() {
    void startQuizWithTopic(topic);
  }

  const score = activeQuiz?.reduce((acc, q) => (selectedAnswers[q.id] === q.correct ? acc + 1 : acc), 0) ?? 0;

  return (
    <DashboardLayout crumbs={[{ label: "Practice" }, { label: "Quiz" }]}>
      <PageHeading
        icon={<ClipboardCheck className="size-5" aria-hidden />}
        title="Quiz"
        subtitle="Dynamic recall quizzes generated on-the-fly by Yumna for any topic with examiner explanations."
      />

      {!activeQuiz ? (
        <div className="w-full max-w-xl py-4">
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-bold text-foreground">What topic would you like to be quizzed on?</h2>
            <p className="mt-1 text-xs text-muted-foreground">
              Enter any topic from your syllabus and Yumna will craft a fresh 5-question exam quiz.
            </p>

            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g. Photosynthesis, Newton's Laws, Chemical Bonding..."
              className="mt-4 w-full rounded-2xl border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
            />

            {/* Quick Chips */}
            <div className="mt-3 flex flex-wrap gap-2">
              {["Photosynthesis", "Newton's Laws", "Quadratic Equations", "Acids & Bases", "Cell Structure", "Monetary Policy"].map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => {
                    setTopic(chip);
                    void startQuizWithTopic(chip);
                  }}
                  className="rounded-full border border-border bg-secondary/60 px-3 py-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>

            {error && <p className="mt-3 text-xs text-destructive font-medium">{error}</p>}

            <button
              type="button"
              disabled={isGenerating}
              onClick={startQuiz}
              className="mt-6 flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-bold text-ink-foreground shadow hover:opacity-90 transition-all disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="size-4 animate-spin" /> Yumna is generating your quiz...
                </>
              ) : (
                <>
                  <Play className="size-4" /> Start Topic Quiz
                </>
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-2xl py-4">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-xs uppercase font-bold text-muted-foreground">Active Quiz</p>
              <h2 className="text-xl font-bold text-foreground">
                {topic ? topic : "Revision Quiz"}
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
                disabled={isGenerating}
                className="flex items-center gap-1.5 rounded-full bg-foreground px-6 py-2.5 text-xs font-bold text-background shadow hover:opacity-90 disabled:opacity-50"
              >
                {isGenerating ? <Loader2 className="size-3.5 animate-spin" /> : null}
                Generate New Questions on This Topic
              </button>
            )}
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
