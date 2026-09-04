import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { BookOpen, X, ExternalLink, ChevronRight, FileText, Lock } from "lucide-react";
import { DashboardLayout, PageHeading } from "@/components/dashboard-page";
import { PaywallModal } from "@/components/paywall-modal";

export const Route = createFileRoute("/past-questions")({
  head: () => ({
    meta: [
      { title: "Past Questions — Cambridge IGCSE | ExamGlow" },
      { name: "description", content: "Cambridge IGCSE past papers 2022–2026, verified and working." },
    ],
  }),
  component: PastQuestionsPage,
});

type Paper = {
  id: string; title: string; session: string; paper: string;
  year: number; code: string; marks: number; qpUrl: string; msUrl: string;
};
type YearData   = { year: number; papers: Paper[] };
type SubjectGroup = { subject: string; code: string; color: string; years: YearData[] };

const B = "https://resources.pastpapersacademy.com/resources";

function p(subj: string, code: string, lbl: string,
  yr: number, ser: "s"|"m", p: number, v: number, marks: number): Paper {
  const yy = String(yr).slice(2);
  const folder  = ser === "s" ? "june" : "february";
  const session = ser === "s" ? `May/Jun ${yr}` : `Feb/Mar ${yr}`;
  const stem = `${code}_${ser}${yy}`;
  const qpUrl = `${B}/past-papers/cambridge/igcse/${subj}/${yr}/${folder}/${stem}_qp_${p}${v}.pdf`;
  const msUrl = `${B}/mark-schemes/cambridge/igcse/${subj}/${yr}/${folder}/${stem}_ms_${p}${v}.pdf`;
  return {
    id: `${code}-${yr}-${ser}-p${p}v${v}`,
    title: `${lbl} IGCSE ${session} P${p}·V${v}`,
    session, paper: `P${p}·V${v}`, year: yr, code, marks, qpUrl, msUrl,
  };
}

// Only June (s) series + Maths Feb/Mar — verified 200 OK
const YEARS = [2024, 2023, 2022] as const;

function juneYears(subj: string, code: string, lbl: string,
  configs: [number, number, number][]): YearData[] {
  return YEARS.map(yr => ({
    year: yr,
    papers: configs.map(([pp, v, m]) => p(subj, code, lbl, yr, "s", pp, v, m)),
  }));
}

const SUBJECTS: SubjectGroup[] = [
  {
    subject: "Mathematics", code: "0580", color: "bg-blue-500",
    years: YEARS.map(yr => ({
      year: yr,
      papers: [
        // Feb/Mar — verified working for Maths
        ...(yr < 2026 ? [p("mathematics","0580","Mathematics",yr,"m",1,2,56), p("mathematics","0580","Mathematics",yr,"m",2,2,70), p("mathematics","0580","Mathematics",yr,"m",3,2,104), p("mathematics","0580","Mathematics",yr,"m",4,2,130)] : []),
        // May/Jun — all variants
        p("mathematics","0580","Mathematics",yr,"s",1,1,56), p("mathematics","0580","Mathematics",yr,"s",1,2,56), p("mathematics","0580","Mathematics",yr,"s",1,3,56),
        p("mathematics","0580","Mathematics",yr,"s",2,1,70), p("mathematics","0580","Mathematics",yr,"s",2,2,70), p("mathematics","0580","Mathematics",yr,"s",2,3,70),
        p("mathematics","0580","Mathematics",yr,"s",4,1,130), p("mathematics","0580","Mathematics",yr,"s",4,2,130), p("mathematics","0580","Mathematics",yr,"s",4,3,130),
      ],
    })),
  },
  {
    subject: "First Language English", code: "0500", color: "bg-violet-500",
    years: juneYears("english-first-language","0500","First Language English",
      [[1,1,50],[1,2,50],[1,3,50],[2,1,50],[2,2,50],[2,3,50]]),
  },
  {
    subject: "English as a Second Language", code: "0510", color: "bg-pink-500",
    years: juneYears("english-second-language","0510","English as a Second Language",
      [[1,1,70],[1,2,70],[1,3,70]]),
  },
  {
    subject: "Biology", code: "0610", color: "bg-emerald-500",
    years: juneYears("biology","0610","Biology",
      [[1,1,40],[1,2,40],[1,3,40],[2,1,80],[2,2,80],[2,3,80],[6,1,40],[6,2,40],[6,3,40]]),
  },
  {
    subject: "Chemistry", code: "0620", color: "bg-cyan-500",
    years: juneYears("chemistry","0620","Chemistry",
      [[1,1,40],[1,2,40],[1,3,40],[2,1,80],[2,2,80],[2,3,80],[6,1,40],[6,2,40],[6,3,40]]),
  },
  {
    subject: "Physics", code: "0625", color: "bg-indigo-500",
    years: juneYears("physics","0625","Physics",
      [[1,1,40],[1,2,40],[1,3,40],[2,1,80],[2,2,80],[2,3,80],[6,1,40],[6,2,40],[6,3,40]]),
  },
  {
    subject: "Economics", code: "0455", color: "bg-amber-500",
    years: juneYears("economics","0455","Economics",
      [[1,1,40],[1,2,40],[1,3,40],[2,1,80],[2,2,80],[2,3,80]]),
  },
  {
    subject: "Business Studies", code: "0450", color: "bg-orange-500",
    years: juneYears("business-studies","0450","Business Studies",
      [[1,1,40],[1,2,40],[1,3,40],[2,1,80],[2,2,80],[2,3,80]]),
  },
  {
    subject: "History", code: "0470", color: "bg-rose-500",
    years: juneYears("history","0470","History",
      [[1,1,40],[1,2,40],[2,1,50],[2,2,50],[4,1,50],[4,2,50]]),
  },
  {
    subject: "Geography", code: "0460", color: "bg-teal-500",
    years: juneYears("geography","0460","Geography",
      [[1,1,75],[1,2,75],[1,3,75],[2,1,60],[2,2,60],[2,3,60],[4,1,60],[4,2,60],[4,3,60]]),
  },
  {
    subject: "Computer Science", code: "0478", color: "bg-sky-500",
    years: juneYears("computer-science","0478","Computer Science",
      [[1,1,75],[1,2,75],[1,3,75],[2,1,50],[2,2,50],[2,3,50]]),
  },
  {
    subject: "Sociology", code: "0495", color: "bg-fuchsia-500",
    years: juneYears("sociology","0495","Sociology",
      [[1,1,100],[1,2,100],[2,1,100],[2,2,100]]),
  },
  {
    subject: "Accounting", code: "0452", color: "bg-lime-600",
    years: juneYears("accounting","0452","Accounting",
      [[1,1,40],[1,2,40],[1,3,40],[2,1,100],[2,2,100],[2,3,100]]),
  },
  {
    subject: "Additional Mathematics", code: "0606", color: "bg-purple-500",
    years: juneYears("additional-mathematics","0606","Additional Mathematics",
      [[1,1,80],[1,2,80],[1,3,80],[2,1,80],[2,2,80],[2,3,80]]),
  },
  {
    subject: "Literature in English", code: "0475", color: "bg-pink-400",
    years: juneYears("literature-in-english","0475","Literature in English",
      [[1,1,50],[1,2,50],[2,1,50],[2,2,50]]),
  },
  {
    subject: "Environmental Management", code: "0680", color: "bg-green-600",
    years: juneYears("environmental-management","0680","Environmental Management",
      [[1,1,80],[1,2,80],[2,1,80],[2,2,80]]),
  },
  {
    subject: "Information & Communication Technology", code: "0417", color: "bg-cyan-600",
    years: juneYears("ict","0417","ICT",
      [[1,1,100],[1,2,100],[2,1,80],[2,2,80]]),
  },
  {
    subject: "Global Perspectives", code: "0457", color: "bg-sky-600",
    years: juneYears("global-perspectives","0457","Global Perspectives",
      [[1,1,70],[1,2,70]]),
  },
  {
    subject: "Enterprise", code: "0454", color: "bg-amber-600",
    years: juneYears("enterprise","0454","Enterprise",
      [[1,1,100],[1,2,100]]),
  },
  {
    subject: "Travel & Tourism", code: "0471", color: "bg-emerald-600",
    years: juneYears("travel-and-tourism","0471","Travel & Tourism",
      [[1,1,100],[2,1,100]]),
  },
];

// ─── Modal ────────────────────────────────────────────────────────────────────

function PaperModal({ paper, onClose }: { paper: Paper; onClose: () => void }) {
  const [tab, setTab] = useState<"qp"|"ms">("qp");
  const pdfUrl = tab === "qp" ? paper.qpUrl : paper.msUrl;

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      <div className="flex h-14 shrink-0 items-center gap-2 border-b border-border bg-card px-3">
        <FileText className="size-5 shrink-0 text-muted-foreground" aria-hidden />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{paper.title}</p>
          <p className="truncate text-xs text-muted-foreground">{paper.code} · {paper.session} · {paper.marks} marks</p>
        </div>
        <div className="flex shrink-0 overflow-hidden rounded-full border border-border text-xs font-medium">
          <button onClick={() => setTab("qp")} className={`px-3 py-1.5 transition-colors ${tab==="qp"?"bg-ink text-ink-foreground":"text-muted-foreground hover:bg-secondary"}`}>Q·Paper</button>
          <button onClick={() => setTab("ms")} className={`px-3 py-1.5 transition-colors ${tab==="ms"?"bg-ink text-ink-foreground":"text-muted-foreground hover:bg-secondary"}`}>Mark Scheme</button>
        </div>
        <button onClick={onClose} className="flex size-8 shrink-0 items-center justify-center rounded-full hover:bg-secondary" aria-label="Close">
          <X className="size-4" aria-hidden />
        </button>
      </div>
      <div className="relative flex-1 overflow-hidden bg-zinc-100 dark:bg-zinc-900">
        <iframe
          key={pdfUrl}
          src={`https://docs.google.com/viewer?url=${encodeURIComponent(pdfUrl)}&embedded=true`}
          title={paper.title}
          className="absolute inset-0 h-full w-full border-0 bg-white"
        />
      </div>
    </div>
  );
}

// ─── Paper row ────────────────────────────────────────────────────────────────

function PaperRow({ paper, color, onOpen }: { paper: Paper; color: string; onOpen: () => void }) {
  const isFeb = paper.session.includes("Feb");
  const badge = isFeb
    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300"
    : "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300";

  return (
    <button type="button" onClick={onOpen}
      className="flex w-full items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-left transition-all hover:-translate-y-0.5 hover:shadow-md">
      <div className={`flex size-8 shrink-0 items-center justify-center rounded-lg ${color}`}>
        <FileText className="size-3.5 text-white" aria-hidden />
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{paper.title}</p>
        <p className="mt-0.5 text-xs text-muted-foreground">{paper.code} · {paper.marks} marks</p>
      </div>
      <span className={`shrink-0 rounded-full px-2 py-0.5 text-[11px] font-semibold ${badge}`}>
        {isFeb ? "Feb/Mar" : "May/Jun"}
      </span>
      <span className="shrink-0 rounded-full bg-surface px-2 py-0.5 text-xs font-semibold text-muted-foreground">
        {paper.paper}
      </span>
    </button>
  );
}

// ─── Year row ─────────────────────────────────────────────────────────────────

function YearRow({
  year,
  papers,
  color,
  onOpen,
  onLockClick,
}: {
  year: number;
  papers: Paper[];
  color: string;
  onOpen: (p: Paper) => void;
  onLockClick: () => void;
}) {
  const [open, setOpen] = useState(false);
  const isLocked = year < 2024;
  const sessionMap = new Map<string, Paper[]>();
  papers.forEach(p => {
    if (!sessionMap.has(p.session)) sessionMap.set(p.session, []);
    sessionMap.get(p.session)!.push(p);
  });

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          if (isLocked) {
            onLockClick();
          } else {
            setOpen(v => !v);
          }
        }}
        className="flex w-full items-center gap-3 border-b border-border py-3 text-sm text-muted-foreground hover:text-foreground"
      >
        <ChevronRight className={`size-4 shrink-0 transition-transform duration-200 ${open ? "rotate-90" : ""}`} />
        <span className="font-bold text-foreground">{year}</span>
        <span className="text-xs">{papers.length} papers</span>
        {isLocked ? (
          <span className="ml-auto flex items-center gap-1 rounded-full bg-amber-500/10 px-2.5 py-0.5 text-[11px] font-bold text-amber-600 dark:text-amber-400 border border-amber-500/20">
            <Lock className="size-3" /> Locked (Premium)
          </span>
        ) : (
          <span className="ml-auto rounded-full bg-emerald-500/10 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
            Free Preview
          </span>
        )}
      </button>
      {!isLocked && open && (
        <div className="pb-4 pt-3 pl-4">
          {Array.from(sessionMap.entries()).map(([session, sps]) => (
            <div key={session} className="mb-4">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{session}</p>
              <div className="space-y-2">
                {sps.map(p => <PaperRow key={p.id} paper={p} color={color} onOpen={() => onOpen(p)} />)}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function SubjectSection({
  subj,
  onOpen,
  onLockClick,
}: {
  subj: SubjectGroup;
  onOpen: (p: Paper) => void;
  onLockClick: () => void;
}) {
  const [open, setOpen] = useState(false);
  const totalPapers = subj.years.reduce((n, y) => n + y.papers.length, 0);

  return (
    <section className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm transition-all">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-3 px-4 py-3.5 text-left hover:bg-secondary/40 transition-colors"
      >
        <ChevronRight
          className={`size-4 shrink-0 text-muted-foreground transition-transform duration-200 ${
            open ? "rotate-90 text-foreground" : ""
          }`}
        />
        <span className={`size-3 rounded-full ${subj.color}`} />
        <h2 className="font-bold text-foreground text-sm sm:text-base">{subj.subject}</h2>
        <span className="font-mono text-xs text-muted-foreground">{subj.code}</span>
        <span className="ml-auto rounded-full bg-surface px-2.5 py-0.5 text-xs font-semibold text-muted-foreground">
          {totalPapers} papers
        </span>
      </button>

      {open && (
        <div className="border-t border-border px-4 py-1">
          {subj.years.map((y) => (
            <YearRow
              key={y.year}
              year={y.year}
              papers={y.papers}
              color={subj.color}
              onOpen={onOpen}
              onLockClick={onLockClick}
            />
          ))}
        </div>
      )}
    </section>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

function PastQuestionsPage() {
  const [selected, setSelected] = useState<Paper | null>(null);
  const [activeSubject, setActiveSubject] = useState("All");
  const [paywallOpen, setPaywallOpen] = useState(false);

  const subjects = ["All", ...SUBJECTS.map((s) => s.subject)];
  const displayed = activeSubject === "All" ? SUBJECTS : SUBJECTS.filter((s) => s.subject === activeSubject);
  const totalPapers = SUBJECTS.reduce((n, s) => n + s.years.reduce((m, y) => m + y.papers.length, 0), 0);

  return (
    <>
      <PaywallModal
        open={paywallOpen}
        onClose={() => setPaywallOpen(false)}
        title="Unlock All Cambridge Past Questions"
        subtitle="Upgrade to ExamGlow Premium to unlock verified past examination papers and examiner mark schemes across all years."
      />
      {selected && <PaperModal paper={selected} onClose={() => setSelected(null)} />}
      <DashboardLayout crumbs={[{ label: "Course" }, { label: "Past Questions" }]}>
        {/* Hero */}
        <div className="mb-5 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-500/20 via-violet-500/15 to-emerald-500/20 px-5 py-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Cambridge IGCSE</p>
          <h1 className="mt-1 text-2xl font-bold sm:text-3xl">Past Questions</h1>
          <p className="mt-1 text-sm text-muted-foreground">2022 – 2024 · Verified May/Jun series + Maths Feb/Mar</p>
          <div className="mt-3 flex gap-3">
            <div className="rounded-xl bg-card/70 px-4 py-2 text-center backdrop-blur">
              <p className="text-lg font-bold">{totalPapers}+</p>
              <p className="text-xs text-muted-foreground">Papers</p>
            </div>
            <div className="rounded-xl bg-card/70 px-4 py-2 text-center backdrop-blur">
              <p className="text-lg font-bold">{SUBJECTS.length}</p>
              <p className="text-xs text-muted-foreground">Subjects</p>
            </div>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-4 flex gap-2 overflow-x-auto pb-1">
          {subjects.map((s) => (
            <button
              key={s}
              onClick={() => setActiveSubject(s)}
              className={`shrink-0 rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
                activeSubject === s
                  ? "bg-ink text-ink-foreground"
                  : "bg-surface text-muted-foreground hover:bg-secondary hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Subject sections (Collapsed by default) */}
        <div className="space-y-2.5">
          {displayed.map((subj) => (
            <SubjectSection
              key={subj.code}
              subj={subj}
              onOpen={setSelected}
              onLockClick={() => setPaywallOpen(true)}
            />
          ))}
        </div>
      </DashboardLayout>
    </>
  );
}
