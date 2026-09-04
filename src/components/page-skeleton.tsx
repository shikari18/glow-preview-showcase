export function PageSkeleton() {
  return (
    <div className="w-full min-h-[70vh] p-6 sm:p-10 animate-pulse space-y-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="h-4 w-20 rounded-md bg-secondary/80" />
          <div className="h-3 w-3 rounded-full bg-secondary" />
          <div className="h-4 w-32 rounded-md bg-secondary/80" />
        </div>
        <div className="size-8 rounded-full bg-secondary/80" />
      </div>

      <div className="space-y-3">
        <div className="h-6 w-28 rounded-full bg-lilac/40" />
        <div className="h-10 w-3/4 max-w-md rounded-2xl bg-secondary/80" />
        <div className="h-4 w-1/2 max-w-sm rounded-lg bg-secondary/60" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pt-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-3xl border border-border/70 bg-card p-6 space-y-4 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div className="size-10 rounded-2xl bg-secondary/80" />
              <div className="h-5 w-16 rounded-full bg-secondary/60" />
            </div>
            <div className="space-y-2 pt-2">
              <div className="h-5 w-4/5 rounded-lg bg-secondary/90" />
              <div className="h-3.5 w-full rounded bg-secondary/50" />
              <div className="h-3.5 w-2/3 rounded bg-secondary/50" />
            </div>
            <div className="pt-4 border-t border-border/50 flex items-center justify-between">
              <div className="h-4 w-24 rounded bg-secondary/60" />
              <div className="h-8 w-20 rounded-xl bg-secondary/80" />
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-border/70 bg-card p-6 sm:p-8 space-y-4 shadow-sm">
        <div className="h-6 w-48 rounded-xl bg-secondary/80" />
        <div className="space-y-2.5 pt-2">
          <div className="h-4 w-full rounded bg-secondary/60" />
          <div className="h-4 w-11/12 rounded bg-secondary/60" />
          <div className="h-4 w-4/5 rounded bg-secondary/60" />
          <div className="h-4 w-3/4 rounded bg-secondary/50" />
        </div>
      </div>
    </div>
  );
}
