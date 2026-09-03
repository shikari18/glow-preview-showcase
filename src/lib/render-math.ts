import katex from "katex";
import { DIAGRAM_MAP } from "./diagrams";

/**
 * Formats notes text by converting:
 * - Markdown images ![alt](url) -> inline SVGs or responsive image frames
 * - Display math $$...$$ to KaTeX display block
 * - Inline math $...$ to KaTeX inline math
 * - Markdown bold **...** to <strong>
 * - Markdown italic *...* to <em>
 * - Backticks `...` to inline code
 */
export function formatMathAndMarkdown(text: string): string {
  if (!text) return "";

  // 1. Markdown images ![alt](url) -> Direct vector SVG or responsive image
  let result = text.replace(/!\[(.*?)\]\((.*?)\)/g, (_, alt, src) => {
    const filename = src.split("/").pop() || "";
    const directSvg = DIAGRAM_MAP[filename];

    const imageElement = directSvg
      ? directSvg
      : `<img src="${src}" alt="${alt}" class="w-full max-w-2xl rounded-xl object-contain" loading="lazy" />`;

    return `
      <figure class="my-6 overflow-hidden rounded-2xl border border-border bg-card p-3 shadow-sm sm:p-5">
        <div class="mb-3 flex items-center justify-between border-b border-border/60 pb-2.5">
          <div class="flex items-center gap-2 text-xs font-bold text-foreground">
            <span class="size-2 rounded-full bg-emerald-500"></span>
            <span>${alt || "Scientific Diagram"}</span>
          </div>
          <span class="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-semibold text-muted-foreground uppercase tracking-wider">
            Scientific Diagram
          </span>
        </div>
        <div class="flex justify-center overflow-x-auto py-2">
          ${imageElement}
        </div>
      </figure>
    `;
  });

  // 2. Multi-line diagrams / code blocks ```diagram ... ``` or ``` ... ```
  result = result.replace(/```(?:diagram|ascii|mermaid)?\n?([\s\S]+?)```/g, (_, code) => {
    return `
      <div class="my-5 overflow-x-auto rounded-2xl border border-black/10 bg-black/[0.03] p-4 text-xs dark:border-white/15 dark:bg-white/[0.04]">
        <div class="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          <span class="size-2 rounded-full bg-emerald-500"></span> Technical Specification
        </div>
        <pre class="font-mono text-[12px] leading-relaxed text-foreground whitespace-pre">${code.trim()}</pre>
      </div>
    `;
  });

  // 3. Display math $$...$$
  result = result.replace(/\$\$(.+?)\$\$/gs, (_, eq) => {
    try {
      const rendered = katex.renderToString(eq.trim(), {
        displayMode: true,
        throwOnError: false,
      });
      return `<div class="my-4 overflow-x-auto text-center">${rendered}</div>`;
    } catch {
      return `<code>${eq}</code>`;
    }
  });

  // 4. Inline math $...$
  result = result.replace(/\$([^$]+?)\$/g, (_, eq) => {
    try {
      const cleaned = eq.trim();
      return katex.renderToString(cleaned, {
        displayMode: false,
        throwOnError: false,
      });
    } catch {
      return `<code class="font-mono text-sm">${eq}</code>`;
    }
  });

  // 5. Bold
  result = result.replace(/\*\*(.+?)\*\*/g, "<strong class='font-bold text-foreground'>$1</strong>");

  // 6. Italic
  result = result.replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, "<em>$1</em>");

  // 7. Inline code
  result = result.replace(/`([^`]+?)`/g, "<code class='inline-block rounded bg-secondary px-1.5 py-0.5 font-mono text-[13px]'>$1</code>");

  return result;
}
