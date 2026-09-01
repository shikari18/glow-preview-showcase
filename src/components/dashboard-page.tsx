import type { ReactNode } from "react";
import { ChevronRight, Share2, Upload } from "lucide-react";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
import catEmpty from "@/assets/cat-empty.png";
import avatar1 from "@/assets/avatar-1.jpg";

export function ProfileAvatar({ className = "" }: { className?: string }) {
  return (
    <img
      src={avatar1}
      alt="Your profile"
      loading="lazy"
      width={512}
      height={512}
      className={`size-9 rounded-full object-cover ${className}`}
    />
  );
}

export function DashboardLayout({
  crumbs,
  children,
}: {
  crumbs: { label: string; icon?: ReactNode }[];
  children: ReactNode;
}) {
  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      <DashboardSidebar />
      <main className="min-w-0 flex-1 overflow-y-auto">
        <TopBar crumbs={crumbs} />
        <div className="mx-auto max-w-[1280px] px-4 pb-16 pt-4 sm:px-6 lg:px-8">{children}</div>
      </main>
    </div>
  );
}

function TopBar({ crumbs }: { crumbs: { label: string; icon?: ReactNode }[] }) {
  return (
    <header className="sticky top-0 z-30 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border/70 bg-background/85 px-4 py-3 pl-16 backdrop-blur md:pl-6">
      <nav className="flex min-w-0 items-center gap-2 text-[15px]" aria-label="Breadcrumb">
        {crumbs.map((crumb, i) => (
          <span key={crumb.label} className="flex min-w-0 items-center gap-2">
            {i > 0 && <ChevronRight className="size-4 shrink-0 text-muted-foreground" aria-hidden />}
            <span
              className={`flex min-w-0 items-center gap-1.5 truncate ${
                i === crumbs.length - 1 ? "font-semibold" : "text-muted-foreground"
              }`}
            >
              {crumb.icon}
              <span className="truncate">{crumb.label}</span>
            </span>
          </span>
        ))}
      </nav>

      <div className="flex shrink-0 items-center gap-2">
        <button
          type="button"
          className="hidden items-center gap-1.5 rounded-full border border-border px-4 py-2 text-sm md:flex"
        >
          <Share2 className="size-4" aria-hidden /> Share
        </button>
        <button type="button" className="hidden size-9 items-center justify-center rounded-full border border-border sm:flex" aria-label="Upload">
          <Upload className="size-4" aria-hidden />
        </button>
        <ProfileAvatar />
      </div>
    </header>
  );
}

export function PageHeading({
  icon,
  title,
  subtitle,
  badge,
  action,
}: {
  icon?: ReactNode;
  title: string;
  subtitle?: string;
  badge?: string;
  action?: ReactNode;
}) {
  return (
    <header className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 py-5">
      <div className="flex min-w-0 items-center gap-3">
        {icon && (
          <span className="flex size-11 shrink-0 items-center justify-center rounded-2xl bg-secondary">{icon}</span>
        )}
        <div className="min-w-0">
          <h1 className="flex min-w-0 items-center gap-2 truncate text-[clamp(1.6rem,3vw,2.4rem)] leading-tight">
            <span className="truncate">{title}</span>
            {badge && (
              <span className="shrink-0 rounded-full bg-lilac px-2.5 py-1 text-xs font-semibold text-ink">
                {badge}
              </span>
            )}
          </h1>
          {subtitle && <p className="truncate text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      </div>
      {action}
    </header>
  );
}

export function EmptyState({
  title,
  body,
  action,
}: {
  title: string;
  body: string;
  action?: ReactNode;
}) {
  return (
    <div className="rounded-3xl border border-border bg-surface/60 px-6 py-16 text-center">
      <img
        src={catEmpty}
        alt="Line drawing of a sitting cat"
        loading="lazy"
        width={640}
        height={640}
        className="mx-auto size-40 object-contain"
      />
      <h2 className="mt-2 text-2xl">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{body}</p>
      {action && <div className="mt-6 flex justify-center">{action}</div>}
    </div>
  );
}

export function PrimaryButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-ink-foreground transition-transform hover:-translate-y-0.5"
    >
      {children}
    </button>
  );
}

export function SetFilterRow({ right }: { right?: ReactNode }) {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 pb-4">
      <span className="flex min-w-0 items-center gap-2 rounded-full border border-border bg-card px-4 py-2.5 text-sm">
        <span className="flex size-6 shrink-0 items-center justify-center rounded-md bg-mint text-ink">◧</span>
        <span className="truncate font-medium">My First Study Set</span>
      </span>
      {right}
    </div>
  );
}
