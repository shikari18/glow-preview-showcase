import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ChevronRight,
  Crown,
  Moon,
  SlidersHorizontal,
  Sun,
  X,
  GraduationCap,
  Users,
  School,
  Home as HomeIcon,
  BookOpenCheck,
  BadgeCheck,
  MoreHorizontal,
  LogOut,
} from "lucide-react";

import { DashboardSidebar } from "@/components/dashboard-sidebar";
import logoMark from "@/assets/logo-mark.png";
import avatar1 from "@/assets/avatar-1.jpg";
import { readProfile, saveProfile } from "@/lib/onboarding";

const THEME_KEY = "examglow.theme";

function applyTheme(dark: boolean) {
  document.documentElement.classList.toggle("dark", dark);
}

// ─── Personalization Modal ────────────────────────────────────────────────────

const roles = [
  { label: "Student", Icon: GraduationCap },
  { label: "Teacher", Icon: Users },
  { label: "Professor", Icon: School },
  { label: "Parent", Icon: HomeIcon },
];

const goals = [
  { label: "College", hint: "Courses, assignments and semester exams", Icon: GraduationCap },
  { label: "IGCSE", hint: "Cambridge and Edexcel subjects", Icon: School },
  { label: "A Levels", hint: "AS and A Level exam preparation", Icon: BookOpenCheck },
  { label: "Professional Exams", hint: "Licensing, certification and entrance exams", Icon: BadgeCheck },
  { label: "Other", hint: "", Icon: MoreHorizontal },
];

function PersonalizationModal({ onClose }: { onClose: () => void }) {
  const profile = readProfile();
  const [role, setRole] = useState(profile.role ?? "");
  const [goal, setGoal] = useState(profile.goal ?? "");

  // Trap focus and close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Prevent background scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, []);

  function save() {
    saveProfile({ role, goal });
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Personalization settings"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />

      {/* Panel — bottom sheet on mobile, centered modal on sm+ */}
      <div className="relative flex w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-card shadow-2xl sm:rounded-3xl" style={{ maxHeight: "92dvh" }}>
        {/* Header */}
        <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-4">
          <div className="flex items-center gap-3">
            <span className="flex size-8 items-center justify-center rounded-full bg-mint">
              <SlidersHorizontal className="size-4" aria-hidden />
            </span>
            <h2 className="text-lg font-semibold">Personalization</h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="flex size-8 items-center justify-center rounded-full hover:bg-secondary"
            aria-label="Close"
          >
            <X className="size-4" aria-hidden />
          </button>
        </div>

        {/* Body — scrollable */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {/* Role */}
          <p className="mb-3 text-sm font-semibold">I'm a…</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {roles.map(({ label, Icon }) => (
              <button
                key={label}
                type="button"
                onClick={() => setRole(label)}
                className={`flex flex-col items-center gap-2 rounded-2xl border p-4 transition-colors ${
                  role === label
                    ? "border-lavender bg-lilac/30"
                    : "border-border bg-background hover:bg-secondary"
                }`}
              >
                <span className="flex size-10 items-center justify-center rounded-full bg-secondary">
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="text-sm font-medium">{label}</span>
              </button>
            ))}
          </div>

          {/* Goal */}
          <p className="mb-3 mt-6 text-sm font-semibold">What are you studying for?</p>
          <div className="flex flex-col gap-2 pb-2">
            {goals.map(({ label, hint, Icon }) => (
              <button
                key={label}
                type="button"
                onClick={() => setGoal(label)}
                className={`flex w-full items-center gap-3 rounded-2xl border px-4 py-3 text-left transition-colors ${
                  goal === label
                    ? "border-lavender bg-lilac/30"
                    : "border-border bg-background hover:bg-secondary"
                }`}
              >
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-secondary">
                  <Icon className="size-4" aria-hidden />
                </span>
                <span>
                  <span className="block text-sm font-semibold">{label}</span>
                  {hint && <span className="block text-xs text-muted-foreground">{hint}</span>}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 justify-end gap-3 border-t border-border px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-border px-5 py-2 text-sm font-medium hover:bg-secondary"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={save}
            className="rounded-full bg-ink px-5 py-2 text-sm font-medium text-ink-foreground hover:opacity-90"
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── Profile Avatar ───────────────────────────────────────────────────────────

export function ProfileAvatar({ className = "" }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [showPersonalization, setShowPersonalization] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // Read profile for picture
  const [profile, setProfile] = useState(() => readProfile());
  const [googlePicture, setGooglePicture] = useState<string | null>(null);

  useEffect(() => {
    setProfile(readProfile());
    setGooglePicture(window.localStorage.getItem("examglow.google_picture"));
  }, [open]); // re-read each time menu opens

  useEffect(() => {
    const stored = window.localStorage.getItem(THEME_KEY);
    const isDark = stored === "dark";
    setDark(isDark);
    applyTheme(isDark);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) setOpen(false);
    };
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onEscape);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onEscape);
    };
  }, [open]);

  function toggleDark() {
    const next = !dark;
    setDark(next);
    applyTheme(next);
    try {
      window.localStorage.setItem(THEME_KEY, next ? "dark" : "light");
    } catch {
      /* storage unavailable */
    }
  }

  function signOut() {
    try {
      window.localStorage.removeItem("examglow.profile");
      window.localStorage.removeItem("examglow.google_picture");
      window.localStorage.removeItem("examglow.auth_method");
    } catch { /* storage unavailable */ }
    window.location.href = "/login";
  }

  return (
    <>
      {showPersonalization && (
        <PersonalizationModal onClose={() => setShowPersonalization(false)} />
      )}

      <div ref={rootRef} className={`relative ${className}`}>
        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label="Open profile menu"
          aria-expanded={open}
          className="block rounded-full transition-transform hover:scale-105"
        >
          {googlePicture ? (
            <img
              src={googlePicture}
              alt={profile.name ?? "Your profile"}
              referrerPolicy="no-referrer"
              width={36}
              height={36}
              className="size-9 rounded-full object-cover ring-2 ring-border"
            />
          ) : (
            <img
              src={avatar1}
              alt="Your profile"
              loading="lazy"
              width={512}
              height={512}
              className="size-9 rounded-full object-cover"
            />
          )}
        </button>

        {open && (
          <div className="absolute right-0 top-11 z-50 w-64 overflow-hidden rounded-2xl border border-border bg-card shadow-[0_18px_50px_-18px_rgba(0,0,0,0.35)]">
            {/* User info header */}
            {(profile.name || profile.email) && (
              <div className="flex items-center gap-3 border-b border-border px-4 py-3">
                {googlePicture && (
                  <img
                    src={googlePicture}
                    alt=""
                    referrerPolicy="no-referrer"
                    width={36}
                    height={36}
                    className="size-9 shrink-0 rounded-full object-cover"
                  />
                )}
                <div className="min-w-0">
                  {profile.name && (
                    <p className="truncate text-sm font-semibold">{profile.name}</p>
                  )}
                  {profile.email && (
                    <p className="truncate text-xs text-muted-foreground">{profile.email}</p>
                  )}
                </div>
              </div>
            )}

            <Link
              to="/pricing"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors hover:bg-secondary"
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-lilac">
                <Crown className="size-4" aria-hidden />
              </span>
              Upgrade plan
            </Link>
            <button
              type="button"
              onClick={() => { setOpen(false); setShowPersonalization(true); }}
              className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium transition-colors hover:bg-secondary"
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-mint">
                <SlidersHorizontal className="size-4" aria-hidden />
              </span>
              Personalization
            </button>
            <button
              type="button"
              onClick={toggleDark}
              className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium transition-colors hover:bg-secondary"
            >
              <span className="flex size-8 items-center justify-center rounded-full bg-surface">
                {dark ? <Sun className="size-4" aria-hidden /> : <Moon className="size-4" aria-hidden />}
              </span>
              <span className="flex-1 text-left">Dark mode</span>
              <span
                className={`relative h-5 w-9 rounded-full transition-colors ${dark ? "bg-lavender" : "bg-secondary"}`}
                role="switch"
                aria-checked={dark}
                aria-label="Dark mode"
              >
                <span
                  className={`absolute top-0.5 size-4 rounded-full bg-card shadow transition-all ${dark ? "left-4.5" : "left-0.5"}`}
                />
              </span>
            </button>
            <div className="border-t border-border">
              <button
                type="button"
                onClick={signOut}
                className="flex w-full items-center gap-3 px-4 py-3 text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
              >
                <span className="flex size-8 items-center justify-center rounded-full bg-destructive/10">
                  <LogOut className="size-4" aria-hidden />
                </span>
                Sign out
              </button>
            </div>
          </div>
        )}
      </div>
    </>
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
    <header className="sticky top-0 z-30 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-border/70 bg-background/85 px-4 py-3 pl-14 backdrop-blur md:pl-6">
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
        src={logoMark}
        alt="ExamGlow logo"
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
