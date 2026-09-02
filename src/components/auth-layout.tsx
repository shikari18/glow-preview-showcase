import { Link, useNavigate } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";

import logoMark from "@/assets/logo-mark.png";
import roomDoodle from "@/assets/room-doodle.png";
import googleLogo from "@/assets/brands/google.svg";
import { triggerGoogleSignIn, decodeGoogleJwt } from "@/lib/google-auth";
import { saveProfile } from "@/lib/onboarding";
import { registerAccount } from "@/lib/admin-store";

export function AuthLayout({ title, children }: { title: string; children: ReactNode }) {
  const navigate = useNavigate();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [googleError, setGoogleError] = useState<string | null>(null);

  async function handleGoogleSignIn() {
    setGoogleError(null);
    setGoogleLoading(true);
    try {
      const credential = await triggerGoogleSignIn();
      const payload = decodeGoogleJwt(credential);
      saveProfile({ name: payload.name, email: payload.email });
      // Persist picture from Google so avatar always shows the real photo
      try {
        window.localStorage.setItem("examglow.google_picture", payload.picture);
        window.localStorage.setItem("examglow.auth_method", "google");
      } catch { /* storage unavailable */ }
      // Register in admin store (Supabase or localStorage fallback)
      await registerAccount({
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
        plan: "free",
        role: "",
        goal: "",
      });
      navigate({ to: "/home" });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Google sign-in failed.";
      if (!message.toLowerCase().includes("cancel")) {
        setGoogleError(message);
      }
    } finally {
      setGoogleLoading(false);
    }
  }

  return (
    <div className="grid h-dvh overflow-hidden bg-background lg:grid-cols-2">
      <div className="relative flex min-h-0 flex-col px-6 py-5 sm:px-12 sm:py-6">
        <Link to="/" className="flex items-center gap-2.5">
          <img
            src={logoMark}
            alt="ExamGlow logo"
            width={512}
            height={512}
            className="size-9 rounded-full bg-lilac/60 p-0.5"
          />
          <span className="text-[22px] font-bold tracking-tight">ExamGlow</span>
        </Link>

        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-4">
          <h1 className="text-center text-[clamp(2rem,4vw,3rem)] leading-[1.1] whitespace-pre-line">
            {title}
          </h1>

          {/* Google — full width, only option */}
          <div className="mt-8">
            <button
              type="button"
              onClick={handleGoogleSignIn}
              disabled={googleLoading}
              className="w-full rounded-full bg-secondary py-3.5 text-[15px] font-medium transition-colors hover:bg-muted disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="flex items-center justify-center gap-2.5">
                {googleLoading ? (
                  <svg className="size-4 animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 00-8 8h4z" />
                  </svg>
                ) : (
                  <img src={googleLogo} alt="" className="size-5" />
                )}
                Continue with Google
              </span>
            </button>
          </div>

          {googleError && (
            <p className="mt-3 text-center text-sm text-destructive">{googleError}</p>
          )}

          <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
            <span className="h-px flex-1 bg-border" />
            or continue with email
            <span className="h-px flex-1 bg-border" />
          </div>

          {children}

          <p className="mt-6 text-center text-xs text-muted-foreground">
            By continuing you agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>

      <div className="hidden min-h-0 flex-col items-center justify-center overflow-hidden bg-surface px-12 py-8 text-center lg:flex">
        <p className="text-[clamp(1.25rem,2vw,1.75rem)] leading-snug">
          <span className="bg-highlight px-1.5 display-italic">92% of students</span> get higher
          grades with ExamGlow!
        </p>
        <img
          src={roomDoodle}
          alt="Line drawing of a student studying with their cat"
          loading="lazy"
          width={1400}
          height={900}
          className="mt-6 max-h-[42vh] w-full max-w-xl object-contain"
        />
        <h2 className="mt-5 text-[clamp(1.5rem,2.4vw,2.25rem)] leading-snug">
          Drop your class materials,
          <br />
          we'll make your study plan.
        </h2>
        <p className="mt-5 text-sm text-muted-foreground">
          Trusted by students from top institutions
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-8 font-display text-xl text-foreground/70">
          <span>HARVARD</span>
          <span>Yale</span>
          <span>MIT</span>
        </div>
      </div>
    </div>
  );
}
