import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * Content Protection & Screenshot Blackout Guard
 * ─────────────────────────────────────────────────────────────────────────────
 * Prevents text copying & right-clicking across protected learning materials
 * (Syllabus, Syllabus Notes, Past Questions, Personal Notes).
 * Copying is allowed exclusively on /chat and assignment solver pages.
 *
 * Netflix-style screenshot blackout:
 * Displays a pitch-black screen whenever screenshot shortcuts (PrintScreen,
 * Win+Shift+S, Cmd+Shift+3/4) or screen clipping focus loss are detected.
 */
export function ContentProtectionGuard() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  // Allowed copy paths: /chat and /assignments
  const isAllowedCopy = currentPath.startsWith("/chat") || currentPath.includes("assignment");
  const isProtectedPage = !isAllowedCopy;

  const [blackout, setBlackout] = useState(false);

  useEffect(() => {
    if (!isProtectedPage) return;

    // 1. Prevent copy and cut
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
    };

    // 2. Prevent right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 3. Detect screenshot keys
    const handleKeyDown = (e: KeyboardEvent) => {
      // PrintScreen key
      if (e.key === "PrintScreen" || e.keyCode === 44) {
        triggerBlackout();
      }
      // Windows Snipping Tool: Win + Shift + S or Ctrl + Shift + S
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "s" || e.key === "S")) {
        triggerBlackout();
      }
      // macOS Screenshot shortcuts: Cmd + Shift + 3, 4, 5
      if (e.metaKey && e.shiftKey && ["3", "4", "5"].includes(e.key)) {
        triggerBlackout();
      }
      // Print shortcut: Ctrl + P / Cmd + P
      if ((e.ctrlKey || e.metaKey) && (e.key === "p" || e.key === "P")) {
        e.preventDefault();
        triggerBlackout();
      }
    };

    // 4. Detect window blur when screenshot tools capture the screen
    const handleVisibilityOrBlur = () => {
      if (document.hidden) {
        // Trigger quick blackout
        setBlackout(true);
        setTimeout(() => setBlackout(false), 800);
      }
    };

    function triggerBlackout() {
      setBlackout(true);
      setTimeout(() => {
        setBlackout(false);
      }, 1500);
    }

    window.addEventListener("copy", handleCopy);
    window.addEventListener("cut", handleCopy);
    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("blur", handleVisibilityOrBlur);
    document.addEventListener("visibilitychange", handleVisibilityOrBlur);

    // Apply unselectable style to body on protected pages
    document.body.style.userSelect = "none";
    document.body.style.webkitUserSelect = "none";

    return () => {
      window.removeEventListener("copy", handleCopy);
      window.removeEventListener("cut", handleCopy);
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("blur", handleVisibilityOrBlur);
      document.removeEventListener("visibilitychange", handleVisibilityOrBlur);
      document.body.style.userSelect = "";
      document.body.style.webkitUserSelect = "";
    };
  }, [isProtectedPage]);

  // CSS print blackout protection
  useEffect(() => {
    const style = document.createElement("style");
    style.id = "examglow-drm-print-protection";
    style.innerHTML = `
      @media print {
        body {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);
    return () => {
      style.remove();
    };
  }, []);

  if (!blackout || !isProtectedPage) return null;

  return (
    <div
      className="fixed inset-0 z-[9999999] flex flex-col items-center justify-center bg-black text-white select-none pointer-events-none"
      aria-hidden="true"
    >
      <div className="text-center">
        <p className="text-xs uppercase tracking-widest text-zinc-500 font-mono">ExamGlow Protected Content</p>
        <p className="text-sm font-semibold text-zinc-400 mt-1">Screen capture is restricted on syllabus &amp; exam materials.</p>
      </div>
    </div>
  );
}
