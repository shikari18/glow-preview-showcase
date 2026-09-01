import { useMemo, useState } from "react";
import { BookOpen, Check, Search } from "lucide-react";

import { categories, subjects, type Subject } from "@/lib/subjects";

const PREVIEW_COUNT = 12;

export function SubjectPicker({
  selected,
  onSelect,
  title = "Choose a subject",
  description,
}: {
  selected: string | null;
  onSelect: (subject: Subject) => void;
  title?: string;
  description?: string;
}) {
  const [category, setCategory] = useState<string>("All");
  const [query, setQuery] = useState("");
  const [showAll, setShowAll] = useState(false);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return subjects.filter(
      (s) =>
        (category === "All" || s.category === category) &&
        (!q || s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)),
    );
  }, [category, query]);

  const visible = showAll || query.trim() ? filtered : filtered.slice(0, PREVIEW_COUNT);
  const hiddenCount = filtered.length - visible.length;

  return (
    <section>
      <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-end">
        <div className="min-w-0">
          <h2 className="text-2xl">{title}</h2>
          {description && <p className="mt-1.5 text-sm text-muted-foreground">{description}</p>}
        </div>
        <p className="text-sm text-muted-foreground sm:text-right">
          {subjects.length} syllabuses available
        </p>
      </div>

      <label className="mt-4 flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5">
        <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search 190+ syllabuses…"
          className="min-w-0 flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
        />
        {query && (
          <button type="button" onClick={() => setQuery("")} className="text-xs text-muted-foreground">
            Clear
          </button>
        )}
      </label>

      <div className="mt-3 flex flex-wrap gap-2">
        {["All", ...categories].map((c) => {
          const active = category === c;
          return (
            <button
              key={c}
              type="button"
              onClick={() => {
                setCategory(c);
                setShowAll(false);
              }}
              aria-pressed={active}
              className={`rounded-full border px-3.5 py-1.5 text-sm transition-colors ${
                active
                  ? "border-ink bg-ink text-ink-foreground"
                  : "border-border bg-card text-muted-foreground hover:bg-secondary"
              }`}
            >
              {c}
            </button>
          );
        })}
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((subject) => {
          const active = selected === subject.id;
          return (
            <button
              key={subject.id}
              type="button"
              onClick={() => onSelect(subject)}
              aria-pressed={active}
              className={`grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 rounded-2xl border p-4 text-left transition-colors ${
                active ? "border-lavender bg-lilac/40" : "border-border bg-card hover:bg-secondary"
              }`}
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-mint text-ink">
                <BookOpen className="size-4.5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block truncate font-medium">{subject.name}</span>
                <span className="block truncate text-xs text-muted-foreground">{subject.category}</span>
              </span>
              {active && <Check className="size-4 shrink-0 text-lavender" aria-hidden />}
            </button>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="mt-5 rounded-2xl border border-border bg-surface/60 px-4 py-6 text-center text-sm text-muted-foreground">
          No syllabus matches “{query}”. Try another spelling or pick a category.
        </p>
      )}

      {hiddenCount > 0 && (
        <button
          type="button"
          onClick={() => setShowAll(true)}
          className="mt-5 w-full rounded-full border border-border px-4 py-2.5 text-sm font-medium hover:bg-secondary"
        >
          See all {filtered.length} syllabuses
        </button>
      )}
      {showAll && !query.trim() && filtered.length > PREVIEW_COUNT && (
        <button
          type="button"
          onClick={() => setShowAll(false)}
          className="mt-3 w-full rounded-full border border-border px-4 py-2.5 text-sm text-muted-foreground hover:bg-secondary"
        >
          Show less
        </button>
      )}
    </section>
  );
}
