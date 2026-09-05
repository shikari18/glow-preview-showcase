import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";

/**
 * Hard Content Protection & Netflix-Style Screenshot Blocker
 * ─────────────────────────────────────────────────────────────────────────────
 * Prevents text copying, right-clicking, and screenshots on protected pages.
 * Copying is allowed ONLY on /chat and assignment solver pages.
 *
 * How the Screenshot Blocker Works:
 * 1. The millisecond any screenshot tool (Windows Snipping Tool, PrtScn, Win+Shift+S,
 *    ShareX, Lightshot, Mac Grab) activates, the browser window loses focus ('blur').
 * 2. While blurred, the entire page is blanked out to pitch black (#000000).
 * 3. Any press of the PrintScreen key immediately wipes the system clipboard.
 */
export function ContentProtectionGuard() {
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  // Syllabus (/syllabus) and past questions (/past-questions) are 100% free and screenshot-able.
  // Content protection is strictly applied to proprietary notes (/notes and /syllabus-notes).
  const isProtectedPage = currentPath.startsWith("/notes") || currentPath.startsWith("/syllabus-notes");

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

    // 3. Detect screenshot keys (Windows, Mac, Android hardware keys)
    const handleKeyDown = (e: KeyboardEvent) => {
      // PrintScreen key (Windows / Linux)
      if (e.key === "PrintScreen" || e.keyCode === 44) {
        wipeClipboardAndBlackout();
      }
      // Windows Snipping Tool: Win + Shift + S or Ctrl + Shift + S
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "s" || e.key === "S")) {
        wipeClipboardAndBlackout();
      }
      // macOS Screenshot shortcuts: Cmd + Shift + 3, 4, 5
      if (e.metaKey && e.shiftKey && ["3", "4", "5"].includes(e.key)) {
        wipeClipboardAndBlackout();
      }
      // Print shortcut: Ctrl + P / Cmd + P
      if ((e.ctrlKey || e.metaKey) && (e.key === "p" || e.key === "P")) {
        e.preventDefault();
        wipeClipboardAndBlackout();
      }
      // Android screenshot button combo hardware key events
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
      setTimeout(() => {
        if (document.hasFocus()) {
          setBlackout(false);
          document.documentElement.classList.remove("drm-blackout");
        }
      }, 2500);
    }

    // 5. Window blur & pagehide: Mobile app switcher or screenshot capture overlay
    const handleBlur = () => {
      setBlackout(true);
      document.documentElement.classList.add("drm-blackout");
      try {
        navigator.clipboard.writeText("Screen capture is disabled on ExamGlow protected content.");
      } catch {}
    };

    const handleFocus = () => {
      // Delay unmasking so hardware screenshot capture completes on black screen
      setTimeout(() => {
        if (document.hasFocus()) {
          setBlackout(false);
          document.documentElement.classList.remove("drm-blackout");
        }
      }, 600);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        handleBlur();
      } else {
        handleFocus();
      }
    };

    window.addEventListener("copy", handleCopy);
    window.addEventListener("cut", handleCopy);
    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);
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
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("pagehide", handleBlur);
      document.removeEventListener("visibilitychange", handleVisibility);
      document.body.style.userSelect = "";
      document.body.style.webkitUserSelect = "";
      (document.body.style as any).webkitTouchCallout = "";
      document.documentElement.classList.remove("drm-blackout");
    };
  }, [isProtectedPage]);

  // CSS print blackout protection
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
    `;
    document.head.appendChild(style);
    return () => {
      style.remove();
    };
  }, []);

  if (!isProtectedPage || !blackout) return null;

  return (
    <div
      className="fixed inset-0 z-[99999999] bg-black select-none pointer-events-none"
      style={{ backgroundColor: "#000000", filter: "brightness(0)" }}
      aria-hidden="true"
    />
  );
}
