import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { readProfile } from "@/lib/onboarding";

/**
 * ExamGlow Content Protection & Anti-Piracy Watermark
 * ─────────────────────────────────────────────────────────────────────────────
 * Transparent, frictionless protection for proprietary syllabus notes:
 * 1. Dynamic Forensic Anti-Piracy Watermark with student email & date.
 * 2. Blocks text copying, cutting, and right-click context menu.
 * 3. Blocks mobile touch callouts, image dragging, and print/PDF export.
 * 4. Zero popups, zero intrusive overlays or blackout banners.
 */
export function ContentProtectionGuard() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  // Syllabus (/syllabus) and past questions (/past-questions) are 100% free and screenshot-able.
  // Content protection is strictly applied to proprietary notes (/notes and /syllabus-notes).
  const isProtectedPage = currentPath.startsWith("/notes") || currentPath.startsWith("/syllabus-notes");

  const [watermarkText, setWatermarkText] = useState("ExamGlow Protected · Confidential");

  useEffect(() => {
    if (!isProtectedPage) return;

    try {
      const profile = readProfile();
      const id = profile?.email || profile?.name || "Licensed Student";
      const date = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
      setWatermarkText(`${id} · ${date}`);
    } catch {}
  }, [isProtectedPage]);

  useEffect(() => {
    if (!isProtectedPage) return;

    // Prevent copy, cut, and right-click context menu
    const handleCopy = (e: ClipboardEvent) => e.preventDefault();
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();

    // Prevent Print shortcut: Ctrl + P / Cmd + P
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === "p" || e.key === "P")) {
        e.preventDefault();
      }
    };

    window.addEventListener("copy", handleCopy);
    window.addEventListener("cut", handleCopy);
    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);

    // Disable text selection and mobile callouts
    document.body.style.userSelect = "none";
    document.body.style.webkitUserSelect = "none";
    (document.body.style as any).webkitTouchCallout = "none";

    return () => {
      window.removeEventListener("copy", handleCopy);
      window.removeEventListener("cut", handleCopy);
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.userSelect = "";
      document.body.style.webkitUserSelect = "";
      (document.body.style as any).webkitTouchCallout = "";
    };
  }, [isProtectedPage]);

  // CSS print & image drag protection
  useEffect(() => {
    const style = document.createElement("style");
    style.id = "examglow-drm-css-protection";
    style.innerHTML = `
      @media print {
        body, html, * {
          display: none !important;
          visibility: hidden !important;
        }
      }
      /* Prevent iOS magnifier loupe and image dragging */
      img {
        -webkit-user-drag: none !important;
        user-select: none !important;
      }
    `;
    document.head.appendChild(style);
    return () => {
      style.remove();
    };
  }, []);

  if (!isProtectedPage) return null;

  return (
    <>
      {/* ── Dynamic Forensic Anti-Piracy Watermark ────────────────────────── */}
      {/* Light Mode Watermark */}
      <div
        className="pointer-events-none fixed inset-0 z-30 select-none overflow-hidden opacity-[0.09] dark:hidden"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='360' height='180' viewBox='0 0 360 180'><text x='50%' y='40%' text-anchor='middle' fill='%23000000' font-family='system-ui,sans-serif' font-weight='800' font-size='11' letter-spacing='2' transform='rotate(-20 180 90)'>EXAMGLOW CONFIDENTIAL</text><text x='50%' y='58%' text-anchor='middle' fill='%23000000' font-family='system-ui,sans-serif' font-weight='600' font-size='9' transform='rotate(-20 180 90)'>${encodeURIComponent(
            watermarkText,
          )}</text><text x='50%' y='74%' text-anchor='middle' fill='%23dc2626' font-family='system-ui,sans-serif' font-weight='700' font-size='8' transform='rotate(-20 180 90)'>DO NOT DISTRIBUTE · PROPRIETARY</text></svg>")`,
          backgroundRepeat: "repeat",
        }}
      />
      {/* Dark Mode Watermark */}
      <div
        className="pointer-events-none fixed inset-0 z-30 select-none overflow-hidden opacity-[0.11] hidden dark:block"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='360' height='180' viewBox='0 0 360 180'><text x='50%' y='40%' text-anchor='middle' fill='%23ffffff' font-family='system-ui,sans-serif' font-weight='800' font-size='11' letter-spacing='2' transform='rotate(-20 180 90)'>EXAMGLOW CONFIDENTIAL</text><text x='50%' y='58%' text-anchor='middle' fill='%23ffffff' font-family='system-ui,sans-serif' font-weight='600' font-size='9' transform='rotate(-20 180 90)'>${encodeURIComponent(
            watermarkText,
          )}</text><text x='50%' y='74%' text-anchor='middle' fill='%23f87171' font-family='system-ui,sans-serif' font-weight='700' font-size='8' transform='rotate(-20 180 90)'>DO NOT DISTRIBUTE · PROPRIETARY</text></svg>")`,
          backgroundRepeat: "repeat",
        }}
      />
    </>
  );
}
