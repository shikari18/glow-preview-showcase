import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { BookOpen, FileText, X, ExternalLink, Search, ChevronRight, Lock } from "lucide-react";

import { DashboardLayout, PageHeading } from "@/components/dashboard-page";
import {
  igcseSubjects,
  igcseCategories,
  type IgcseSubject,
  type SyllabusDoc,
} from "@/lib/igcse-syllabuses";
import { isPaidUser } from "@/lib/onboarding";
import { PaywallModal } from "@/components/paywall-modal";

export const Route = createFileRoute("/syllabus")({
  head: () => ({
    meta: [
      { title: "IGCSE Syllabuses — Cambridge | ExamGlow" },
      { name: "description", content: "Browse all Cambridge IGCSE syllabuses. Click any subject to read the official PDF inside ExamGlow." },
    ],
  }),
  component: SyllabusPage,
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
  "Creative & Applied":   "bg-rose-500",
};

// ─── PDF Viewer Modal ─────────────────────────────────────────────────────────

function PdfModal({ subject, doc, onClose }: {
  subject: IgcseSubject; doc: SyllabusDoc; onClose: () => void;
}) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose]);

  const viewerUrl = `https://docs.google.com/viewer?url=${encodeURIComponent(doc.url)}&embedded=true`;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background" role="dialog" aria-modal="true">
      <div className="flex h-14 shrink-0 items-center gap-3 border-b border-border bg-card px-4">
        <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${catDot[subject.category] ?? "bg-surface"}`}>
          <FileText className="size-4 text-white" aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{subject.name}</p>
          <p className="truncate text-xs text-muted-foreground">{subject.code} · {doc.label}</p>
        </div>
        <a href={doc.url} target="_blank" rel="noopener noreferrer"
          className="flex shrink-0 items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium hover:bg-secondary">
          <ExternalLink className="size-3.5" aria-hidden />
          <span className="hidden sm:inline">Download PDF</span>
        </a>
        <button onClick={onClose} className="flex size-8 shrink-0 items-center justify-center rounded-full hover:bg-secondary" aria-label="Close">
          <X className="size-4" aria-hidden />
        </button>
      </div>
      <div className="relative flex-1 overflow-hidden">
        <iframe src={viewerUrl} title={`${subject.name} – ${doc.label}`}
          className="absolute inset-0 h-full w-full border-0" allow="fullscreen" />
      </div>
    </div>
  );
}

// ─── Subject row (collapsed by default) ──────────────────────────────────────

const OPEN_FREE_SUBJECT_IDS = ["biology", "chemistry", "mathematics"];

function SubjectRow({
  subject,
  isPaid,
  onOpen,
  onLockedClick,
}: {
  subject: IgcseSubject;
  isPaid: boolean;
  onOpen: (doc: SyllabusDoc) => void;
  onLockedClick: () => void;
}) {
  const [open, setOpen] = useState(false);
  const isLocked = !isPaid && !OPEN_FREE_SUBJECT_IDS.includes(subject.id);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 border-b border-border py-3 text-sm hover:text-foreground text-muted-foreground"
      >
        <ChevronRight
          className={`size-4 shrink-0 transition-transform duration-200 ${open ? "rotate-90" : ""}`}
        />
        <span className="font-bold text-foreground">{subject.name}</span>
        <span className="font-mono text-xs">{subject.code}</span>
        <span className="text-xs">
          {subject.syllabuses.length} syllabus{subject.syllabuses.length > 1 ? "es" : ""}
        </span>
        <div className="flex-1" />
        {isLocked && (
          <span className="flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-amber-600 dark:text-amber-400">
            <Lock className="size-3" /> Locked
          </span>
        )}
      </button>

      {open && (
        <div className="pb-4 pt-3 pl-8 space-y-2">
          {subject.syllabuses.map((doc) => (
            <button
              key={doc.url}
              type="button"
              onClick={() => {
                if (isLocked) {
                  onLockedClick();
                } else {
                  onOpen(doc);
                }
              }}
              className="flex w-full items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-left transition-all hover:-translate-y-0.5 hover:shadow-md"
            >
              {isLocked ? (
                <Lock className="size-4 shrink-0 text-amber-500" aria-hidden />
              ) : (
                <FileText className="size-4 shrink-0 text-muted-foreground" aria-hidden />
              )}
              <span className="flex-1 text-sm font-medium">{doc.label}</span>
              {isLocked ? (
                <span className="shrink-0 rounded-full bg-amber-500/15 px-2.5 py-1 text-xs font-semibold text-amber-600 dark:text-amber-400">
                  Upgrade
                </span>
              ) : (
                <span className="shrink-0 rounded-full bg-surface px-2.5 py-1 text-xs text-muted-foreground">
                  PDF
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function SyllabusPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [viewer, setViewer] = useState<{ subject: IgcseSubject; doc: SyllabusDoc } | null>(null);
  const [isPaid, setIsPaid] = useState(false);
  const [paywallOpen, setPaywallOpen] = useState(false);

  useEffect(() => {
    setIsPaid(isPaidUser());
  }, []);

  const categories = ["All", ...igcseCategories];

  const filtered = igcseSubjects.filter(s => {
    const matchCat = activeCategory === "All" || s.category === activeCategory;
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) || s.code.includes(search);
    return matchCat && matchSearch;
  });

  // Group by category
  const grouped = igcseCategories
    .map(cat => ({ cat, subjects: filtered.filter(s => s.category === cat) }))
    .filter(g => g.subjects.length > 0);

  return (
    <>
      {viewer && (
        <PdfModal subject={viewer.subject} doc={viewer.doc} onClose={() => setViewer(null)} />
      )}

      <DashboardLayout crumbs={[{ label: "Course" }, { label: "Syllabus" }]}>
        {/* Hero */}
        <div className="mb-6 overflow-hidden rounded-3xl bg-gradient-to-br from-lavender/60 via-lilac/40 to-mint/50 px-6 py-8 sm:px-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Cambridge IGCSE</p>
              <h1 className="mt-1 text-3xl font-bold sm:text-4xl">Syllabuses</h1>
              <p className="mt-1 text-sm text-muted-foreground">
                {igcseSubjects.length} subjects · click any syllabus to view the PDF
              </p>
            </div>
            <div className="flex shrink-0 items-center gap-2 rounded-2xl bg-card/70 px-5 py-3 backdrop-blur">
              <BookOpen className="size-5 text-muted-foreground" aria-hidden />
              <div>
                <p className="text-xl font-bold">{igcseSubjects.length}</p>
                <p className="text-xs text-muted-foreground">Subjects</p>
              </div>
            </div>
          </div>
        </div>

        {/* Search + filters */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1 sm:max-w-xs">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" aria-hidden />
            <input
              type="search"
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search subjects or codes…"
              className="w-full rounded-2xl border border-border bg-surface py-2.5 pl-10 pr-4 text-sm outline-none focus:border-lavender focus:ring-2 focus:ring-lavender/20"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-0.5">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                  activeCategory === cat
                    ? "bg-ink text-ink-foreground"
                    : "bg-surface text-muted-foreground hover:bg-secondary hover:text-foreground"
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

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="mt-20 text-center">
            <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-surface">
              <Search className="size-7 text-muted-foreground" aria-hidden />
            </div>
            <p className="font-semibold">No subjects found</p>
            <p className="mt-1 text-sm text-muted-foreground">Try a different search term.</p>
            <button onClick={() => { setSearch(""); setActiveCategory("All"); }}
              className="mt-4 rounded-full bg-ink px-5 py-2 text-sm font-medium text-ink-foreground">
              Clear filters
            </button>
          </div>
        )}

        {/* Subject list grouped by category */}
        <div className="space-y-6">
          {grouped.map(({ cat, subjects }) => (
            <section key={cat} className="overflow-hidden rounded-2xl border border-border bg-card">
              {/* Category header */}
              <div className="flex items-center gap-3 border-b border-border px-5 py-4">
                <span className={`size-3 rounded-full ${catDot[cat] ?? "bg-muted-foreground"}`} />
                <h2 className="font-bold">{cat}</h2>
                <span className="ml-auto rounded-full bg-surface px-2.5 py-0.5 text-xs text-muted-foreground">
                  {subjects.length} subject{subjects.length !== 1 ? "s" : ""}
                </span>
              </div>
              {/* Subject rows */}
              <div className="px-5">
                {subjects.map((subject) => (
                  <SubjectRow
                    key={subject.id}
                    subject={subject}
                    isPaid={isPaid}
                    onOpen={(doc) => setViewer({ subject, doc })}
                    onLockedClick={() => setPaywallOpen(true)}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      </DashboardLayout>

      <PaywallModal
        open={paywallOpen}
        onClose={() => setPaywallOpen(false)}
        title="Unlock Official Cambridge Syllabuses"
        subtitle="This syllabus is available on ExamGlow Premium. Upgrade to unlock all 25+ Cambridge syllabuses, exam specifications, marking schemes, and past papers."
      />
    </>
  );
}
