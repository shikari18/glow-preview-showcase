import katex from "katex";

/**
 * Formats notes text by converting:
 * - Display math $$...$$ to KaTeX display block
 * - Inline math $...$ to KaTeX inline math
 * - Markdown bold **...** to <strong>
 * - Markdown italic *...* to <em>
 * - Arrows \to / $\to$ to nice arrow symbols
 */
export function formatMathAndMarkdown(text: string): string {
  if (!text) return "";

  // 1. First extract and replace display math $$...$$
  let result = text.replace(/\$\$(.+?)\$\$/gs, (_, eq) => {
    try {
      const rendered = katex.renderToString(eq.trim(), {
        displayMode: true,
        throwOnError: false,
      });
      return `<div class="my-3 overflow-x-auto text-center">${rendered}</div>`;
    } catch {
      return `<code>${eq}</code>`;
    }
  });

  // 2. Extract and replace inline math $...$
  result = result.replace(/\$([^$]+?)\$/g, (_, eq) => {
    try {
      // Clean up any double escaped backslashes common in strings
      const cleaned = eq.trim();
      return katex.renderToString(cleaned, {
        displayMode: false,
        throwOnError: false,
      });
    } catch {
      return `<code class="font-mono text-sm">${eq}</code>`;
    }
  });

  // 3. Bold
  result = result.replace(/\*\*(.+?)\*\*/g, "<strong class='font-bold text-black dark:text-white'>$1</strong>");

  // 4. Italic
  result = result.replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, "<em>$1</em>");

  // 5. Code backticks
  result = result.replace(/`([^`]+?)`/g, "<code class='inline-block rounded bg-black/8 dark:bg-white/10 px-1.5 py-0.5 font-mono text-[13px]'>$1</code>");

  return result;
}
