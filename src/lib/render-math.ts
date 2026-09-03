import katex from "katex";

/**
 * Formats notes text by converting:
 * - Code blocks / Diagrams ```...``` to formatted diagrams
 * - Display math $$...$$ to KaTeX display block
 * - Inline math $...$ to KaTeX inline math
 * - Markdown bold **...** to <strong>
 * - Markdown italic *...* to <em>
 * - Backticks `...` to inline code
 */
export function formatMathAndMarkdown(text: string): string {
  if (!text) return "";

  // 1. Extract and format multi-line diagrams / code blocks ```diagram ... ``` or ``` ... ```
  let result = text.replace(/```(?:diagram|ascii|mermaid)?\n?([\s\S]+?)```/g, (_, code) => {
    return `
      <div class="my-5 overflow-x-auto rounded-2xl border border-black/10 bg-black/[0.03] p-4 text-xs dark:border-white/15 dark:bg-white/[0.04]">
        <div class="mb-2 flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
          <span class="size-2 rounded-full bg-emerald-500"></span> Diagram
        </div>
        <pre class="font-mono text-[12px] leading-relaxed text-foreground whitespace-pre">${code.trim()}</pre>
      </div>
    `;
  });

  // 2. Extract and replace display math $$...$$
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

  // 3. Extract and replace inline math $...$
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

  // 4. Bold
  result = result.replace(/\*\*(.+?)\*\*/g, "<strong class='font-bold text-black dark:text-white'>$1</strong>");

  // 5. Italic
  result = result.replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, "<em>$1</em>");

  // 6. Inline code backticks
  result = result.replace(/`([^`]+?)`/g, "<code class='inline-block rounded bg-black/8 dark:bg-white/10 px-1.5 py-0.5 font-mono text-[13px]'>$1</code>");

  return result;
}
