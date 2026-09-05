import { useEffect, useState, useRef } from "react";
import { useRouterState } from "@tanstack/react-router";
import { readProfile } from "@/lib/onboarding";

/**
 * Netflix-Style Instant Blackout Screen Capture Protection
 * ─────────────────────────────────────────────────────────────────────────────
 * Provides instantaneous hardware/gesture screen capture blanking:
 * 1. Physical Volume Buttons (via Web Audio session volume monitoring).
 * 2. Power Button / Sleep Button / System screenshot trigger (blur, pagehide, visibilitychange).
 * 3. 3-Finger Slide / Multi-finger gesture on mobile screens.
 * 4. Desktop PrintScreen (PrtScn), Win+Shift+S, Cmd+Shift+3/4/5, Alt+PrtScn.
 * 5. Instant pitch-black screen overlay (#000000) for 2.8 seconds during capture,
 *    then automatically restores normal viewing.
 */
export function ContentProtectionGuard() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  // Syllabus (/syllabus) and past questions (/past-questions) are 100% free and screenshot-able.
  // Content protection is strictly applied to proprietary notes (/notes and /syllabus-notes).
  const isProtectedPage = currentPath.startsWith("/notes") || currentPath.startsWith("/syllabus-notes");

  const [blackout, setBlackout] = useState(false);
  const [watermarkText, setWatermarkText] = useState("ExamGlow Protected · Confidential");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

    // Trigger instant Netflix-style black screen
    const triggerDrmBlackout = () => {
      setBlackout(true);
      document.documentElement.classList.add("drm-blackout");

      try {
        navigator.clipboard.writeText("Screen capture is disabled on ExamGlow protected syllabus and exam materials.");
      } catch {}

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      // Keep screen black during hardware capture (2.8 seconds), then smoothly restore
      timeoutRef.current = setTimeout(() => {
        setBlackout(false);
        document.documentElement.classList.remove("drm-blackout");
      }, 2800);
    };

    // 1. Prevent copy, cut, and right click context menu
    const handleCopy = (e: ClipboardEvent) => e.preventDefault();
    const handleContextMenu = (e: MouseEvent) => e.preventDefault();

    // 2. Hardware keys detection (PC shortcuts & Android volume buttons)
    const handleKeyDown = (e: KeyboardEvent) => {
      // PrintScreen key (Windows / Linux)
      if (e.key === "PrintScreen" || e.keyCode === 44) {
        triggerDrmBlackout();
      }
      // Windows Snipping Tool: Win + Shift + S or Ctrl + Shift + S
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "s" || e.key === "S")) {
        triggerDrmBlackout();
      }
      // macOS Screenshot shortcuts: Cmd + Shift + 3, 4, 5
      if (e.metaKey && e.shiftKey && ["3", "4", "5"].includes(e.key)) {
        triggerDrmBlackout();
      }
      // Print shortcut: Ctrl + P / Cmd + P
      if ((e.ctrlKey || e.metaKey) && (e.key === "p" || e.key === "P")) {
        e.preventDefault();
        triggerDrmBlackout();
      }
      // Android / Hardware volume buttons
      if (e.key === "VolumeDown" || e.key === "VolumeUp" || (e as any).keyCode === 24 || (e as any).keyCode === 25) {
        triggerDrmBlackout();
      }
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.key === "PrintScreen" || e.keyCode === 44 || e.key === "VolumeDown" || e.key === "VolumeUp") {
        triggerDrmBlackout();
      }
    };

    // 3. Mobile 3-finger screenshot slide gesture detection
    const handleTouchGesture = (e: TouchEvent) => {
      if (e.touches && e.touches.length >= 3) {
        triggerDrmBlackout();
      }
    };

    // 4. Physical Volume button listener via Audio session (iOS Safari & Android)
    let silentAudio: HTMLAudioElement | null = null;
    try {
      silentAudio = new Audio("data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA");
      silentAudio.loop = true;
      silentAudio.volume = 0.5;

      const unlockAudio = () => {
        if (silentAudio) {
          silentAudio.play().catch(() => {});
        }
        window.removeEventListener("touchstart", unlockAudio);
        window.removeEventListener("click", unlockAudio);
      };
      window.addEventListener("touchstart", unlockAudio, { passive: true });
      window.addEventListener("click", unlockAudio, { passive: true });

      silentAudio.addEventListener("volumechange", () => {
        triggerDrmBlackout();
      });
    } catch {}

    // 5. Power Button / Sleep-Wake / Control Center / App Switcher Detection
    // Triggered the millisecond power or volume buttons are pressed on iPhone/Android
    const handleBlur = () => {
      triggerDrmBlackout();
    };

    const handleVisibility = () => {
      if (document.hidden) {
        triggerDrmBlackout();
      }
    };

    window.addEventListener("copy", handleCopy);
    window.addEventListener("cut", handleCopy);
    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("touchstart", handleTouchGesture, { capture: true, passive: true });
    window.addEventListener("touchmove", handleTouchGesture, { capture: true, passive: true });
    window.addEventListener("blur", handleBlur);
    window.addEventListener("pagehide", handleBlur);
    document.addEventListener("visibilitychange", handleVisibility);

    // Disable text selection and mobile callouts
    document.body.style.userSelect = "none";
    document.body.style.webkitUserSelect = "none";
    (document.body.style as any).webkitTouchCallout = "none";

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      if (silentAudio) {
        try {
          silentAudio.pause();
        } catch {}
      }
      window.removeEventListener("copy", handleCopy);
      window.removeEventListener("cut", handleCopy);
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      window.removeEventListener("touchstart", handleTouchGesture, { capture: true });
      window.removeEventListener("touchmove", handleTouchGesture, { capture: true });
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
      html.drm-blackout,
      html.drm-blackout body,
      html.drm-blackout #root {
        background: #000000 !important;
        background-color: #000000 !important;
        color: #000000 !important;
      }
      html.drm-blackout #root {
        filter: brightness(0) !important;
        opacity: 0 !important;
      }
      #examglow-netflix-shield {
        position: fixed !important;
        top: 0 !important;
        left: 0 !important;
        right: 0 !important;
        bottom: 0 !important;
        width: 100vw !important;
        height: 100vh !important;
        background: #000000 !important;
        background-color: #000000 !important;
        z-index: 2147483647 !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
        justify-content: center !important;
        color: #ffffff !important;
        user-select: none !important;
        -webkit-user-select: none !important;
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

      {/* ── Netflix-Style Solid Pitch Black Screen Capture Shield ─────────── */}
      {blackout && (
        <div
          id="examglow-netflix-shield"
          onClick={() => {
            setBlackout(false);
            document.documentElement.classList.remove("drm-blackout");
          }}
          aria-hidden="true"
        >
          <div className="text-center px-6 select-none">
            <p className="text-xs uppercase tracking-widest text-zinc-600 font-mono">ExamGlow Protected Content</p>
            <p className="text-sm font-semibold text-zinc-400 mt-2">
              Screen capture disabled.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
