import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, type FormEvent, useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";

import { AuthLayout } from "@/components/auth-layout";

export const Route = createFileRoute("/signup")({
  head: () => ({
    meta: [
      { title: "Create your ExamGlow account" },
      {
        name: "description",
        content:
          "Sign up for ExamGlow and turn your class materials into a personalized study plan in seconds.",
      },
      { property: "og:title", content: "Create your ExamGlow account" },
      {
        property: "og:description",
        content: "Drop your class materials, we'll make your study plan.",
      },
    ],
  }),
  component: SignUpPage,
});

const EMAIL_ERROR =
  "We're experiencing a problem with email sign-up right now. Please use Google to continue — we'll have this fixed soon.";

function SignUpPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Auto-redirect if already logged in
  useEffect(() => {
    if (typeof window === "undefined") return;
    const hasPicture = window.localStorage.getItem("examglow.google_picture");
    const authMethod = window.localStorage.getItem("examglow.auth_method");
    if (hasPicture && authMethod === "google") {
      navigate({ to: "/home", replace: true });
    }
  }, [navigate]);

  function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(EMAIL_ERROR);
  }

  return (
    <AuthLayout title={"Create your\naccount"}>
      <form onSubmit={onSubmit} className="mt-8 space-y-4 text-left">
        <div>
          <label htmlFor="name" className="text-sm font-medium">
            Your Name
          </label>
          <input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            autoComplete="name"
            className="mt-1.5 w-full rounded-xl border border-border bg-card px-4 py-3.5 text-[15px] outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium">
            Your Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            autoComplete="email"
            className="mt-1.5 w-full rounded-xl border border-border bg-card px-4 py-3.5 text-[15px] outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-medium">
            Your Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            autoComplete="new-password"
            className="mt-1.5 w-full rounded-xl border border-border bg-card px-4 py-3.5 text-[15px] outline-none focus:ring-2 focus:ring-ring"
          />
        </div>

        {error && (
          <div className="rounded-xl border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full rounded-full bg-ink py-4 font-medium text-ink-foreground transition-transform hover:-translate-y-0.5"
        >
          Create account
        </button>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link to="/login" className="underline underline-offset-2 hover:text-foreground">
            Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
