import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import logoMark from "@/assets/logo-mark.png";

const links = [
  { label: "Features", to: "/#features" },
  { label: "About", to: "/#about" },
  { label: "Testimonials", to: "/#testimonials" },
  { label: "Blog", to: "/#blog" },
] as const;

export function SiteNav() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between gap-6 px-5 lg:px-10">
        {/* Logo */}
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

        {/* Desktop nav */}
        <nav className="hidden items-center gap-7 lg:flex">
          {links.map(({ label, to }) => (
            <a
              key={to}
              href={to}
              className="text-[15px] text-foreground/80 transition-colors hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="hidden rounded-full border border-border px-6 py-2.5 text-[15px] transition-colors hover:bg-secondary sm:block"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="rounded-full bg-ink px-6 py-2.5 text-[15px] font-semibold text-ink-foreground transition-transform hover:-translate-y-0.5"
          >
            Start for Free
          </Link>

          {/* Mobile hamburger */}
          <button
            className="flex size-10 flex-col items-center justify-center gap-1.5 lg:hidden"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <motion.span
              className="h-0.5 w-5 rounded-full bg-foreground origin-center"
              animate={menuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
            <motion.span
              className="h-0.5 w-5 rounded-full bg-foreground"
              animate={menuOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="h-0.5 w-5 rounded-full bg-foreground origin-center"
              animate={menuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.25 }}
            />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-border/60 bg-background lg:hidden"
          >
            <nav className="flex flex-col gap-1 px-5 py-4">
              {links.map(({ label, to }, i) => (
                <motion.a
                  key={to}
                  href={to}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-[15px] font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.25 }}
                >
                  {label}
                </motion.a>
              ))}
              <div className="mt-3 flex gap-2 border-t border-border pt-4">
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 rounded-full border border-border py-2.5 text-center text-[15px] transition-colors hover:bg-secondary"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="flex-1 rounded-full bg-ink py-2.5 text-center text-[15px] font-semibold text-ink-foreground"
                >
                  Start for Free
                </Link>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
