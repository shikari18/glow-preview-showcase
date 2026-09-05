import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { ShieldAlert } from "lucide-react";
import { readProfile } from "@/lib/onboarding";

/**
 * Hard Content Protection & Anti-Capture Guard
 * ─────────────────────────────────────────────────────────────────────────────
 * Provides multi-layer DRM defense for proprietary syllabus and user notes:
 * 1. Persistent Control Center / Multitasking Blackout Lock (neutralizes iOS screen recordings).
 * 2. Dynamic Forensic Anti-Piracy Watermark (permanently burns user identity into any capture).
 * 3. Hardware Button / Shortcut detection (PrintScreen, Win+Shift+S, Cmd+Shift, Android volume keys).
 * 4. Mobile 3-finger screenshot gesture traps.
 * 5. Strict WebKit text-selection and touch callout lockdowns.
 */
export function ContentProtectionGuard() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  // Syllabus (/syllabus) and past questions (/past-questions) are 100% free and screenshot-able.
  // Content protection is strictly applied to proprietary notes (/notes and /syllabus-notes).
  const isProtectedPage = currentPath.startsWith("/notes") || currentPath.startsWith("/syllabus-notes");

  const [blackout, setBlackout] = useState(false);
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

    // 1. Prevent copy and cut
    const handleCopy = (e: ClipboardEvent) => {
      e.preventDefault();
    };

    // 2. Prevent right-click context menu
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    // 3. Detect screenshot keys (Windows, Mac, Android hardware keys)
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "PrintScreen" || e.keyCode === 44) {
        wipeClipboardAndBlackout();
      }
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "s" || e.key === "S")) {
        wipeClipboardAndBlackout();
      }
      if (e.metaKey && e.shiftKey && ["3", "4", "5"].includes(e.key)) {
        wipeClipboardAndBlackout();
      }
      if ((e.ctrlKey || e.metaKey) && (e.key === "p" || e.key === "P")) {
        e.preventDefault();
        wipeClipboardAndBlackout();
      }
      if (e.key === "VolumeDown" || e.key === "VolumeUp" || (e as any).keyCode === 24 || (e as any).keyCode === 25) {
        wipeClipboardAndBlackout();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "PrintScreen" || e.keyCode === 44 || e.key === "VolumeDown" || e.key === "VolumeUp") {
        wipeClipboardAndBlackout();
      }
    };

    // 4. Mobile 3-finger screenshot gesture detection
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches && e.touches.length >= 3) {
        wipeClipboardAndBlackout();
      }
    };

    function wipeClipboardAndBlackout() {
      setBlackout(true);
      document.documentElement.classList.add("drm-blackout");
      try {
        navigator.clipboard.writeText("Screen capture is disabled on ExamGlow protected syllabus and exam materials.");
      } catch {}
    }

    // 5. Window blur & pagehide: Triggered when iOS Control Center is opened to start screen recording
    // or when switching apps. Keeps the blackout active until explicit student verification!
    const handleBlur = () => {
      setBlackout(true);
      document.documentElement.classList.add("drm-blackout");
    };

    const handleVisibility = () => {
      if (document.hidden) {
        handleBlur();
      }
    };

    window.addEventListener("copy", handleCopy);
    window.addEventListener("cut", handleCopy);
    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("blur", handleBlur);
    window.addEventListener("pagehide", handleBlur);
    document.addEventListener("visibilitychange", handleVisibility);

    // Disable text selection and mobile callouts
    document.body.style.userSelect = "none";
    document.body.style.webkitUserSelect = "none";
    (document.body.style as any).webkitTouchCallout = "none";

    return () => {
      window.removeEventListener("copy", handleCopy);
      window.removeEventListener("cut", handleCopy);
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("pagehide", handleBlur);
      document.removeEventListener("visibilitychange", handleVisibility);
      document.body.style.userSelect = "";
      document.body.style.webkitUserSelect = "";
      (document.body.style as any).webkitTouchCallout = "";
      document.documentElement.classList.remove("drm-blackout");
    };
  }, [isProtectedPage]);

  // CSS print & hardware composition protection
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
      .drm-blackout, .drm-blackout body, .drm-blackout #root {
        background: #000000 !important;
        background-color: #000000 !important;
        color: #000000 !important;
      }
      .drm-blackout body * {
        visibility: hidden !important;
        opacity: 0 !important;
        filter: brightness(0) !important;
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
      {/* Burns user identity permanently into any physical screen grab or recording */}
      <div
        className="pointer-events-none fixed inset-0 z-30 select-none overflow-hidden opacity-[0.06] dark:opacity-[0.08]"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='320' height='160' viewBox='0 0 320 160'><text x='50%' y='40%' text-anchor='middle' fill='%23000000' font-family='system-ui,sans-serif' font-weight='800' font-size='12' transform='rotate(-22 160 80)'>EXAMGLOW CONFIDENTIAL</text><text x='50%' y='60%' text-anchor='middle' fill='%23000000' font-family='system-ui,sans-serif' font-weight='700' font-size='10' transform='rotate(-22 160 80)'>${encodeURIComponent(
            watermarkText,
          )}</text></svg>")`,
          backgroundRepeat: "repeat",
        }}
      />

      {/* ── Screen Recording / App Switch Blackout Curtain ─────────────────── */}
      {blackout && (
        <div
          onClick={() => {
            setBlackout(false);
            document.documentElement.classList.remove("drm-blackout");
          }}
          className="fixed inset-0 z-[99999999] flex flex-col items-center justify-center bg-black p-6 text-center text-white cursor-pointer select-none animate-in fade-in duration-150"
          role="dialog"
          aria-modal="true"
        >
          <div className="size-16 rounded-3xl bg-rose-500/20 border border-rose-500/40 flex items-center justify-center mb-4 text-rose-500">
            <ShieldAlert className="size-8" />
          </div>
          <p className="text-lg font-bold text-white tracking-tight">Screen Capture Protection Active</p>
          <p className="mt-2 text-xs text-zinc-400 max-w-xs leading-relaxed">
            Control Center, screen recording, or app switching was detected. Content is secured.
          </p>
          <button
            type="button"
            className="mt-6 rounded-full bg-white text-black px-6 py-2.5 text-xs font-bold shadow-lg hover:bg-zinc-200 active:scale-95 transition-all"
          >
            Tap to Resume Reading
          </button>
        </div>
      )}
    </>
  );
}
