// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

// Heavy packages used ONLY in the AI chat (lazy-loaded client-side).
// Excluding them from the server bundle keeps the Cloudflare Worker under the size limit.
const CHAT_ONLY_PACKAGES = [
  "shiki",
  "@shikijs/core",
  "@shikijs/langs",
  "@shikijs/themes",
  "@shikijs/engine-oniguruma",
  "@shikijs/engine-javascript",
  "mermaid",
  "@streamdown/code",
  "@streamdown/math",
  "@streamdown/mermaid",
  "@streamdown/cjk",
  "streamdown",
];

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    server: { entry: "server" },
  },
  nitro: {
    rollupConfig: {
      external: CHAT_ONLY_PACKAGES,
    },
  },
});
