/**
 * Embedded SVG Scientific Diagrams Registry
 * Guarantees 100% reliable vector rendering in all environments without external image asset dependencies.
 */

export const DIAGRAM_MAP: Record<string, string> = {
  "cell-structure.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 460" width="100%" height="auto" class="rounded-2xl bg-white shadow-sm border border-slate-200">
  <defs>
    <linearGradient id="animalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fff1f2" />
      <stop offset="100%" stop-color="#ffe4e6" />
    </linearGradient>
    <linearGradient id="plantGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ecfdf5" />
      <stop offset="100%" stop-color="#d1fae5" />
    </linearGradient>
    <linearGradient id="nucleusGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#c084fc" />
      <stop offset="100%" stop-color="#7e22ce" />
    </linearGradient>
    <linearGradient id="vacuoleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#bae6fd" />
      <stop offset="100%" stop-color="#38bdf8" />
    </linearGradient>
    <linearGradient id="chloroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4ade80" />
      <stop offset="100%" stop-color="#15803d" />
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="840" height="52" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1" />
  <text x="420" y="32" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" font-weight="700" fill="#0f172a">
    Cambridge IGCSE Biology · Ultrastructure of Animal vs. Plant Cells
  </text>
  <g transform="translate(30, 70)">
    <text x="175" y="10" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#be123c">ANIMAL CELL</text>
    <text x="175" y="28" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#64748b">Irregular shape · No cell wall or chloroplasts</text>
    <path d="M 60 160 C 50 80, 160 50, 260 70 C 330 90, 340 180, 310 250 C 270 310, 140 330, 80 280 C 40 240, 70 190, 60 160 Z" fill="url(#animalGrad)" stroke="#f43f5e" stroke-width="3" />
    <text x="120" y="130" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#64748b">Cytoplasm</text>
    <circle cx="190" cy="180" r="42" fill="url(#nucleusGrad)" stroke="#581c87" stroke-width="2" />
    <circle cx="190" cy="180" r="15" fill="#f3e8ff" opacity="0.9" />
    <text x="190" y="184" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9" font-weight="700" fill="#581c87">DNA</text>
    <g transform="translate(100, 220) rotate(-25)">
      <rect x="0" y="0" width="34" height="18" rx="9" fill="#f97316" stroke="#c2410c" stroke-width="1.5" />
      <path d="M 6 9 Q 12 4 17 9 T 28 9" stroke="#fed7aa" stroke-width="2" fill="none" />
    </g>
    <g transform="translate(240, 120) rotate(35)">
      <rect x="0" y="0" width="34" height="18" rx="9" fill="#f97316" stroke="#c2410c" stroke-width="1.5" />
      <path d="M 6 9 Q 12 4 17 9 T 28 9" stroke="#fed7aa" stroke-width="2" fill="none" />
    </g>
    <circle cx="110" cy="180" r="2.5" fill="#334155" />
    <circle cx="130" cy="200" r="2.5" fill="#334155" />
    <circle cx="260" cy="200" r="2.5" fill="#334155" />
    <circle cx="230" cy="240" r="2.5" fill="#334155" />
    <line x1="310" y1="130" x2="355" y2="110" stroke="#be123c" stroke-width="1.5" />
    <text x="358" y="113" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#be123c">Cell Membrane</text>
    <line x1="230" y1="180" x2="355" y2="175" stroke="#7e22ce" stroke-width="1.5" />
    <text x="358" y="178" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#7e22ce">Nucleus (Genetic DNA)</text>
    <line x1="130" y1="235" x2="130" y2="330" stroke="#c2410c" stroke-width="1.5" />
    <text x="130" y="345" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#c2410c">Mitochondrion (ATP)</text>
  </g>
  <g transform="translate(450, 70)">
    <text x="185" y="10" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#15803d">PLANT CELL</text>
    <text x="185" y="28" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#64748b">Fixed rigid polygonal structure · Cellulose wall &amp; Vacuole</text>
    <polygon points="50,60 300,50 340,250 290,320 60,310 30,170" fill="#bbf7d0" stroke="#16a34a" stroke-width="6" stroke-linejoin="round" />
    <polygon points="56,66 294,56 333,246 285,313 65,304 36,172" fill="url(#plantGrad)" stroke="#22c55e" stroke-width="2" stroke-linejoin="round" />
    <path d="M 120,100 C 240,90 270,140 260,230 C 250,280 180,290 120,270 C 80,240 80,140 120,100 Z" fill="url(#vacuoleGrad)" stroke="#0284c7" stroke-width="2" opacity="0.85" />
    <text x="180" y="185" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#0369a1">Central Vacuole (Cell Sap)</text>
    <circle cx="85" cy="120" r="28" fill="url(#nucleusGrad)" stroke="#581c87" stroke-width="2" />
    <circle cx="85" cy="120" r="10" fill="#f3e8ff" />
    <g transform="translate(190, 68) rotate(15)">
      <ellipse cx="20" cy="12" rx="20" ry="12" fill="url(#chloroGrad)" stroke="#14532d" stroke-width="1.5" />
      <line x1="8" y1="12" x2="32" y2="12" stroke="#bbf7d0" stroke-width="1.5" />
    </g>
    <g transform="translate(260, 160) rotate(-30)">
      <ellipse cx="20" cy="12" rx="20" ry="12" fill="url(#chloroGrad)" stroke="#14532d" stroke-width="1.5" />
      <line x1="8" y1="12" x2="32" y2="12" stroke="#bbf7d0" stroke-width="1.5" />
    </g>
    <g transform="translate(80, 250) rotate(20)">
      <ellipse cx="20" cy="12" rx="20" ry="12" fill="url(#chloroGrad)" stroke="#14532d" stroke-width="1.5" />
      <line x1="8" y1="12" x2="32" y2="12" stroke="#bbf7d0" stroke-width="1.5" />
    </g>
    <line x1="30" y1="60" x2="-20" y2="40" stroke="#16a34a" stroke-width="1.5" />
    <text x="-25" y="38" text-anchor="end" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#15803d">Cell Wall (Cellulose)</text>
    <line x1="230" y1="70" x2="290" y2="25" stroke="#15803d" stroke-width="1.5" />
    <text x="295" y="25" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#15803d">Chloroplast</text>
  </g>
  <g transform="translate(60, 420)">
    <rect x="0" y="0" width="720" height="28" rx="14" fill="#f1f5f9" />
    <text x="360" y="18" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#475569">
      <tspan font-weight="700" fill="#0f172a">Key Exam Distinction: </tspan>
      Plant cells exclusively possess a <tspan font-weight="700" fill="#16a34a">cellulose cell wall</tspan>, <tspan font-weight="700" fill="#15803d">chloroplasts</tspan>, and a <tspan font-weight="700" fill="#0284c7">permanent vacuole</tspan>.
    </text>
  </g>
</svg>`,

  "rock-cycle.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 500" width="100%" height="auto" class="rounded-2xl bg-white shadow-sm border border-slate-200">
  <defs>
    <linearGradient id="magmaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ef4444" />
      <stop offset="100%" stop-color="#991b1b" />
    </linearGradient>
    <linearGradient id="igneousGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f97316" />
      <stop offset="100%" stop-color="#c2410c" />
    </linearGradient>
    <linearGradient id="sedimentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#eab308" />
      <stop offset="100%" stop-color="#a16207" />
    </linearGradient>
    <linearGradient id="metaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6" />
      <stop offset="100%" stop-color="#5b21b6" />
    </linearGradient>
    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1 L 8 5 L 0 9 z" fill="#475569" />
    </marker>
  </defs>
  <rect x="0" y="0" width="840" height="52" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1" />
  <text x="420" y="32" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" font-weight="700" fill="#0f172a">
    Cambridge IGCSE 0680 Environmental Management · The Geological Rock Cycle
  </text>
  <g transform="translate(320, 380)">
    <rect x="0" y="0" width="200" height="65" rx="16" fill="url(#magmaGrad)" stroke="#7f1d1d" stroke-width="2" />
    <text x="100" y="28" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#ffffff">MAGMA &amp; LAVA</text>
    <text x="100" y="48" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#fef2f2">Molten rock deep in mantle/crust</text>
  </g>
  <g transform="translate(60, 150)">
    <rect x="0" y="0" width="220" height="75" rx="16" fill="url(#igneousGrad)" stroke="#9a3412" stroke-width="2" />
    <text x="110" y="28" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#ffffff">IGNEOUS ROCKS</text>
    <text x="110" y="48" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#fff7ed">Granite (intrusive) · Basalt (extrusive)</text>
  </g>
  <g transform="translate(560, 150)">
    <rect x="0" y="0" width="220" height="75" rx="16" fill="url(#sedimentGrad)" stroke="#78350f" stroke-width="2" />
    <text x="110" y="28" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#ffffff">SEDIMENTARY ROCKS</text>
    <text x="110" y="48" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#fefce8">Limestone · Sandstone · Shale</text>
  </g>
  <g transform="translate(310, 70)">
    <rect x="0" y="0" width="220" height="70" rx="16" fill="url(#metaGrad)" stroke="#4c1d95" stroke-width="2" />
    <text x="110" y="28" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#ffffff">METAMORPHIC ROCKS</text>
    <text x="110" y="48" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#ede9fe">Marble · Slate · Gneiss</text>
  </g>
  <path d="M 340 380 Q 200 320 170 230" fill="none" stroke="#475569" stroke-width="2.5" marker-end="url(#arrow)" />
  <path d="M 285 185 L 555 185" fill="none" stroke="#475569" stroke-width="2.5" marker-end="url(#arrow)" />
  <path d="M 640 150 Q 560 90 535 95" fill="none" stroke="#475569" stroke-width="2.5" marker-end="url(#arrow)" />
  <path d="M 420 145 L 420 375" fill="none" stroke="#475569" stroke-width="2.5" marker-end="url(#arrow)" />
</svg>`,

  "quadratic-graph.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 480" width="100%" height="auto" class="rounded-2xl bg-white shadow-sm border border-slate-200">
  <defs>
    <linearGradient id="curveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#2563eb" />
      <stop offset="100%" stop-color="#3b82f6" />
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="840" height="52" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1" />
  <text x="420" y="32" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" font-weight="700" fill="#0f172a">
    Cambridge IGCSE 0580 Mathematics · Quadratic Function Parabola Anatomy
  </text>
  <g transform="translate(100, 80)">
    <line x1="20" y1="240" x2="620" y2="240" stroke="#334155" stroke-width="2" />
    <text x="635" y="244" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#334155">x</text>
    <line x1="320" y1="320" x2="320" y2="20" stroke="#334155" stroke-width="2" />
    <text x="320" y="10" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#334155">y</text>
    <line x1="320" y1="30" x2="320" y2="330" stroke="#ef4444" stroke-width="2" stroke-dasharray="6,4" />
    <rect x="235" y="35" width="170" height="22" rx="6" fill="#fee2e2" stroke="#fca5a5" />
    <text x="320" y="50" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#b91c1c">Axis of Symmetry: x = -b / 2a</text>
    <path d="M 120 60 Q 320 400 520 60" fill="none" stroke="url(#curveGrad)" stroke-width="4" stroke-linecap="round" />
    <circle cx="215" cy="240" r="6" fill="#16a34a" stroke="#ffffff" stroke-width="2" />
    <text x="205" y="270" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#15803d">Root x₁ (y = 0)</text>
    <circle cx="425" cy="240" r="6" fill="#16a34a" stroke="#ffffff" stroke-width="2" />
    <text x="435" y="270" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#15803d">Root x₂ (y = 0)</text>
    <circle cx="320" cy="290" r="7" fill="#dc2626" stroke="#ffffff" stroke-width="2" />
    <text x="320" y="321" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#991b1b">Vertex Minimum (h, k)</text>
  </g>
</svg>`,

  "computer-architecture.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 480" width="100%" height="auto" class="rounded-2xl bg-white shadow-sm border border-slate-200">
  <defs>
    <linearGradient id="cpuGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6" />
      <stop offset="100%" stop-color="#1d4ed8" />
    </linearGradient>
    <linearGradient id="memGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
    <linearGradient id="ioGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b" />
      <stop offset="100%" stop-color="#b45309" />
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="840" height="52" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1" />
  <text x="420" y="32" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" font-weight="700" fill="#0f172a">
    Cambridge IGCSE 0478 / 0417 · Von Neumann Computer Architecture &amp; System Buses
  </text>
  <g transform="translate(60, 90)">
    <rect x="0" y="0" width="240" height="280" rx="18" fill="#f8fafc" stroke="#2563eb" stroke-width="2.5" />
    <rect x="0" y="0" width="240" height="42" rx="18" fill="url(#cpuGrad)" />
    <text x="120" y="26" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#ffffff">CENTRAL PROCESSING UNIT</text>
    <rect x="20" y="55" width="200" height="50" rx="10" fill="#eff6ff" stroke="#93c5fd" stroke-width="1.5" />
    <text x="120" y="77" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#1e40af">Arithmetic Logic Unit (ALU)</text>
    <rect x="20" y="115" width="200" height="50" rx="10" fill="#eff6ff" stroke="#93c5fd" stroke-width="1.5" />
    <text x="120" y="137" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#1e40af">Control Unit (CU)</text>
    <rect x="20" y="175" width="200" height="90" rx="10" fill="#f1f5f9" stroke="#cbd5e1" stroke-width="1.5" />
    <text x="120" y="195" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#334155">High-Speed Internal Registers</text>
    <text x="30" y="218" font-family="monospace" font-size="11" fill="#0f172a">• PC (Program Counter)</text>
    <text x="30" y="236" font-family="monospace" font-size="11" fill="#0f172a">• MAR &amp; MDR Registers</text>
    <text x="30" y="254" font-family="monospace" font-size="11" fill="#0f172a">• ACC (Accumulator)</text>
  </g>
  <g transform="translate(540, 90)">
    <rect x="0" y="0" width="240" height="130" rx="18" fill="#f0fdf4" stroke="#16a34a" stroke-width="2.5" />
    <rect x="0" y="0" width="240" height="42" rx="18" fill="url(#memGrad)" />
    <text x="120" y="26" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#ffffff">PRIMARY MEMORY (RAM &amp; ROM)</text>
    <text x="120" y="70" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#14532d">RAM: Volatile Working Memory</text>
    <text x="120" y="112" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#047857">ROM: Non-volatile BIOS</text>
  </g>
  <g transform="translate(540, 240)">
    <rect x="0" y="0" width="240" height="130" rx="18" fill="#fffbeb" stroke="#d97706" stroke-width="2.5" />
    <rect x="0" y="0" width="240" height="42" rx="18" fill="url(#ioGrad)" />
    <text x="120" y="26" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#ffffff">INPUT / OUTPUT &amp; STORAGE</text>
    <text x="120" y="70" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#78350f">Input: Keyboard, Mouse, Sensors</text>
    <text x="120" y="90" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#92400e">Output: Displays, Audio</text>
  </g>
</svg>`,
};
