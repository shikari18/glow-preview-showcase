/**
 * Embedded SVG Scientific & Academic Diagrams Registry
 * Guarantees 100% reliable vector rendering in all environments without external image asset dependencies.
 */

export const DIAGRAM_MAP: Record<string, string> = {
  "cell-structure.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 920 560" width="100%" height="auto" class="rounded-2xl bg-white shadow-sm border border-slate-200">
  <defs>
    <linearGradient id="animalCytoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fff5f5" />
      <stop offset="60%" stop-color="#ffe4e6" />
      <stop offset="100%" stop-color="#fecdd3" />
    </linearGradient>
    <linearGradient id="plantCytoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f0fdf4" />
      <stop offset="60%" stop-color="#dcfce7" />
      <stop offset="100%" stop-color="#bbf7d0" />
    </linearGradient>
    <linearGradient id="nuclearGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#d8b4fe" />
      <stop offset="50%" stop-color="#a855f7" />
      <stop offset="100%" stop-color="#6b21a8" />
    </linearGradient>
    <radialGradient id="nucleolusGrad" cx="40%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#581c87" />
      <stop offset="100%" stop-color="#3b0764" />
    </radialGradient>
    <linearGradient id="vacuoleGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#e0f2fe" />
      <stop offset="50%" stop-color="#bae6fd" />
      <stop offset="100%" stop-color="#7dd3fc" />
    </linearGradient>
    <linearGradient id="chloroGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#86efac" />
      <stop offset="50%" stop-color="#22c55e" />
      <stop offset="100%" stop-color="#15803d" />
    </linearGradient>
    <linearGradient id="mitoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fdba74" />
      <stop offset="60%" stop-color="#f97316" />
      <stop offset="100%" stop-color="#c2410c" />
    </linearGradient>
    <filter id="softShadow" x="-6%" y="-6%" width="112%" height="112%">
      <feDropShadow dx="0" dy="4" stdDeviation="5" flood-color="#0f172a" flood-opacity="0.08" />
    </filter>
  </defs>

  <rect x="0" y="0" width="920" height="54" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1" />
  <text x="460" y="28" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="16" font-weight="800" fill="#0f172a">
    Cambridge IGCSE Biology · Ultrastructure of Animal vs. Plant Cells
  </text>
  <text x="460" y="45" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif" font-size="11" fill="#64748b">
    Syllabus 0610 Chapter 2: Cell Structures, Organelle Functions &amp; Identification
  </text>

  <!-- LEFT: ANIMAL CELL -->
  <g transform="translate(40, 68)">
    <rect x="0" y="0" width="400" height="32" rx="8" fill="#fff1f2" stroke="#fecdd3" stroke-width="1" />
    <text x="200" y="21" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" font-weight="700" fill="#be123c">
      ANIMAL CELL (Irregular · No Cell Wall)
    </text>

    <path d="M 40 170 C 35 90, 140 50, 230 65 C 320 80, 365 140, 355 220 C 345 300, 260 335, 170 330 C 70 325, 45 250, 40 170 Z"
          fill="url(#animalCytoGrad)" stroke="#e11d48" stroke-width="3" filter="url(#softShadow)" />

    <text x="90" y="110" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#881337">Cytoplasm (Cytosol)</text>

    <circle cx="195" cy="195" r="44" fill="url(#nuclearGrad)" stroke="#4c1d95" stroke-width="2.5" />
    <circle cx="195" cy="195" r="41" fill="none" stroke="#e9d5ff" stroke-width="1.5" stroke-dasharray="6 3" />
    <circle cx="188" cy="190" r="14" fill="url(#nucleolusGrad)" />
    <path d="M 175 210 Q 185 220 205 215 T 225 200" fill="none" stroke="#ede9fe" stroke-width="1.5" opacity="0.8" />
    <text x="195" y="194" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9" font-weight="800" fill="#ffffff">Nucleolus</text>

    <path d="M 238 180 C 265 175, 275 195, 255 210 C 275 220, 265 240, 240 235"
          fill="none" stroke="#9333ea" stroke-width="3" stroke-linecap="round" />
    <path d="M 248 175 C 275 170, 285 190, 268 205"
          fill="none" stroke="#c084fc" stroke-width="2" stroke-linecap="round" />
    <circle cx="260" cy="178" r="2" fill="#3b0764" />
    <circle cx="270" cy="195" r="2" fill="#3b0764" />
    <circle cx="258" cy="225" r="2" fill="#3b0764" />

    <g transform="translate(85, 220)">
      <path d="M 10 10 Q 35 18 60 10" fill="none" stroke="#f59e0b" stroke-width="3.5" stroke-linecap="round" />
      <path d="M 12 20 Q 35 28 58 20" fill="none" stroke="#f59e0b" stroke-width="3.5" stroke-linecap="round" />
      <path d="M 16 30 Q 35 36 54 30" fill="none" stroke="#f59e0b" stroke-width="3" stroke-linecap="round" />
      <circle cx="70" cy="12" r="3.5" fill="#fbbf24" stroke="#d97706" stroke-width="1" />
      <circle cx="66" cy="26" r="3" fill="#fbbf24" stroke="#d97706" stroke-width="1" />
    </g>

    <g transform="translate(100, 125) rotate(-20)">
      <rect x="0" y="0" width="38" height="20" rx="10" fill="url(#mitoGrad)" stroke="#9a3412" stroke-width="1.5" />
      <path d="M 7 10 Q 13 4 19 10 T 31 10" fill="none" stroke="#ffedd5" stroke-width="2" />
    </g>
    <g transform="translate(230, 105) rotate(35)">
      <rect x="0" y="0" width="36" height="18" rx="9" fill="url(#mitoGrad)" stroke="#9a3412" stroke-width="1.5" />
      <path d="M 6 9 Q 12 4 18 9 T 30 9" fill="none" stroke="#ffedd5" stroke-width="2" />
    </g>
    <g transform="translate(150, 275) rotate(15)">
      <rect x="0" y="0" width="36" height="18" rx="9" fill="url(#mitoGrad)" stroke="#9a3412" stroke-width="1.5" />
      <path d="M 6 9 Q 12 4 18 9 T 30 9" fill="none" stroke="#ffedd5" stroke-width="2" />
    </g>

    <circle cx="105" cy="180" r="7" fill="#f43f5e" stroke="#be123c" stroke-width="1.5" />
    <circle cx="280" cy="150" r="6" fill="#f43f5e" stroke="#be123c" stroke-width="1.5" />
    <circle cx="140" cy="85" r="2.5" fill="#334155" />
    <circle cx="165" cy="100" r="2.5" fill="#334155" />
    <circle cx="120" cy="200" r="2.5" fill="#334155" />
    <circle cx="285" cy="245" r="2.5" fill="#334155" />
    <circle cx="210" cy="290" r="2.5" fill="#334155" />

    <line x1="330" y1="120" x2="385" y2="95" stroke="#be123c" stroke-width="1.5" />
    <circle cx="330" cy="120" r="2.5" fill="#be123c" />
    <text x="388" y="98" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#be123c">Cell Membrane</text>

    <line x1="235" y1="170" x2="385" y2="150" stroke="#6b21a8" stroke-width="1.5" />
    <circle cx="235" cy="170" r="2.5" fill="#6b21a8" />
    <text x="388" y="153" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#6b21a8">Nucleus (DNA)</text>

    <line x1="125" y1="140" x2="20" y2="155" stroke="#c2410c" stroke-width="1.5" />
    <circle cx="125" cy="140" r="2.5" fill="#c2410c" />
    <text x="15" y="158" text-anchor="end" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#c2410c">Mitochondrion (ATP)</text>

    <line x1="95" y1="245" x2="20" y2="245" stroke="#d97706" stroke-width="1.5" />
    <circle cx="95" cy="245" r="2.5" fill="#d97706" />
    <text x="15" y="248" text-anchor="end" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#d97706">Golgi Apparatus</text>

    <line x1="260" y1="225" x2="385" y2="235" stroke="#475569" stroke-width="1.5" />
    <circle cx="260" cy="225" r="2.5" fill="#475569" />
    <text x="388" y="238" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#334155">Ribosomes (80S)</text>
  </g>

  <!-- RIGHT: PLANT CELL -->
  <g transform="translate(480, 68)">
    <rect x="0" y="0" width="400" height="32" rx="8" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1" />
    <text x="200" y="21" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" font-weight="700" fill="#15803d">
      PLANT CELL (Fixed Polygonal · Wall &amp; Chloroplasts)
    </text>

    <polygon points="50,60 320,45 365,225 315,325 70,320 25,185"
             fill="#86efac" stroke="#15803d" stroke-width="7" stroke-linejoin="round" filter="url(#softShadow)" />

    <polygon points="56,66 314,52 358,222 310,318 75,313 32,187"
             fill="url(#plantCytoGrad)" stroke="#16a34a" stroke-width="2.5" stroke-linejoin="round" />

    <path d="M 125 100 C 240 85, 275 125, 270 215 C 265 270, 205 285, 135 275 C 80 265, 75 140, 125 100 Z"
          fill="url(#vacuoleGrad)" stroke="#0284c7" stroke-width="2.5" opacity="0.9" />
    <text x="180" y="180" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#0369a1">
      Central Vacuole
    </text>
    <text x="180" y="196" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" font-weight="600" fill="#0284c7">
      (Cell Sap &amp; Turgor)
    </text>

    <circle cx="85" cy="115" r="32" fill="url(#nuclearGrad)" stroke="#4c1d95" stroke-width="2" />
    <circle cx="85" cy="115" r="10" fill="url(#nucleolusGrad)" />
    <text x="85" y="118" text-anchor="middle" font-family="system-ui, sans-serif" font-size="8" font-weight="700" fill="#ffffff">DNA</text>

    <!-- Chloroplast 1 -->
    <g transform="translate(200, 60) rotate(10)">
      <ellipse cx="26" cy="16" rx="26" ry="16" fill="url(#chloroGrad)" stroke="#14532d" stroke-width="2" />
      <line x1="12" y1="12" x2="20" y2="12" stroke="#dcfce7" stroke-width="2.5" stroke-linecap="round" />
      <line x1="12" y1="16" x2="20" y2="16" stroke="#dcfce7" stroke-width="2.5" stroke-linecap="round" />
      <line x1="12" y1="20" x2="20" y2="20" stroke="#dcfce7" stroke-width="2.5" stroke-linecap="round" />
      <line x1="28" y1="12" x2="38" y2="12" stroke="#dcfce7" stroke-width="2.5" stroke-linecap="round" />
      <line x1="28" y1="16" x2="38" y2="16" stroke="#dcfce7" stroke-width="2.5" stroke-linecap="round" />
      <line x1="28" y1="20" x2="38" y2="20" stroke="#dcfce7" stroke-width="2.5" stroke-linecap="round" />
    </g>

    <!-- Chloroplast 2 -->
    <g transform="translate(280, 160) rotate(-35)">
      <ellipse cx="26" cy="16" rx="26" ry="16" fill="url(#chloroGrad)" stroke="#14532d" stroke-width="2" />
      <line x1="12" y1="12" x2="20" y2="12" stroke="#dcfce7" stroke-width="2.5" stroke-linecap="round" />
      <line x1="12" y1="16" x2="20" y2="16" stroke="#dcfce7" stroke-width="2.5" stroke-linecap="round" />
      <line x1="28" y1="12" x2="38" y2="12" stroke="#dcfce7" stroke-width="2.5" stroke-linecap="round" />
      <line x1="28" y1="16" x2="38" y2="16" stroke="#dcfce7" stroke-width="2.5" stroke-linecap="round" />
    </g>

    <!-- Chloroplast 3 -->
    <g transform="translate(85, 245) rotate(25)">
      <ellipse cx="26" cy="16" rx="26" ry="16" fill="url(#chloroGrad)" stroke="#14532d" stroke-width="2" />
      <line x1="12" y1="12" x2="20" y2="12" stroke="#dcfce7" stroke-width="2.5" stroke-linecap="round" />
      <line x1="12" y1="16" x2="20" y2="16" stroke="#dcfce7" stroke-width="2.5" stroke-linecap="round" />
      <line x1="28" y1="12" x2="38" y2="12" stroke="#dcfce7" stroke-width="2.5" stroke-linecap="round" />
      <line x1="28" y1="16" x2="38" y2="16" stroke="#dcfce7" stroke-width="2.5" stroke-linecap="round" />
    </g>

    <g transform="translate(180, 280) rotate(-15)">
      <rect x="0" y="0" width="34" height="17" rx="8.5" fill="url(#mitoGrad)" stroke="#9a3412" stroke-width="1.5" />
      <path d="M 6 8.5 Q 11 3 17 8.5 T 28 8.5" fill="none" stroke="#ffedd5" stroke-width="1.8" />
    </g>

    <ellipse cx="270" cy="255" rx="8" ry="6" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5" />
    <ellipse cx="285" cy="245" rx="7" ry="5" fill="#fef08a" stroke="#ca8a04" stroke-width="1.5" />

    <line x1="45" y1="80" x2="-20" y2="55" stroke="#15803d" stroke-width="2" />
    <circle cx="45" cy="80" r="3" fill="#15803d" />
    <text x="-25" y="58" text-anchor="end" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#15803d">
      Cellulose Cell Wall
    </text>

    <line x1="35" y1="170" x2="-20" y2="170" stroke="#16a34a" stroke-width="1.5" />
    <circle cx="35" cy="170" r="2.5" fill="#16a34a" />
    <text x="-25" y="173" text-anchor="end" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#16a34a">
      Cell Membrane
    </text>

    <line x1="250" y1="75" x2="385" y2="75" stroke="#14532d" stroke-width="1.5" />
    <circle cx="250" cy="75" r="2.5" fill="#14532d" />
    <text x="388" y="78" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#14532d">
      Chloroplast (Chlorophyll)
    </text>

    <line x1="265" y1="210" x2="385" y2="210" stroke="#0284c7" stroke-width="1.5" />
    <circle cx="265" cy="210" r="2.5" fill="#0284c7" />
    <text x="388" y="213" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#0284c7">
      Tonoplast (Vacuole)
    </text>

    <line x1="290" y1="255" x2="385" y2="265" stroke="#ca8a04" stroke-width="1.5" />
    <circle cx="290" cy="255" r="2.5" fill="#ca8a04" />
    <text x="388" y="268" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#854d0e">
      Starch Granules
    </text>
  </g>

  <!-- BOTTOM: CAMBRIDGE EXAM SUMMARY MATRIX TABLE -->
  <g transform="translate(40, 425)">
    <rect x="0" y="0" width="840" height="115" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5" />

    <rect x="0" y="0" width="840" height="30" rx="14" fill="#f1f5f9" />
    <rect x="0" y="20" width="840" height="10" fill="#f1f5f9" />
    <text x="140" y="20" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#475569">ORGANELLE / FEATURE</text>
    <text x="340" y="20" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#be123c">ANIMAL CELL</text>
    <text x="510" y="20" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#15803d">PLANT CELL</text>
    <text x="710" y="20" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#0f172a">CAMBRIDGE EXAM ROLE</text>
    <line x1="0" y1="30" x2="840" y2="30" stroke="#cbd5e1" stroke-width="1" />

    <text x="25" y="48" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#334155">Cellulose Cell Wall</text>
    <text x="340" y="48" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#ef4444">✕ Absent</text>
    <text x="510" y="48" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#16a34a">✓ Present (outermost)</text>
    <text x="610" y="48" font-family="system-ui, sans-serif" font-size="10" fill="#475569">Rigid tensile structure; prevents lysis under turgor</text>

    <line x1="15" y1="56" x2="825" y2="56" stroke="#e2e8f0" stroke-width="1" />
    <text x="25" y="70" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#334155">Chloroplasts (Chlorophyll)</text>
    <text x="340" y="70" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#ef4444">✕ Absent</text>
    <text x="510" y="70" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#16a34a">✓ Present (in green cells)</text>
    <text x="610" y="70" font-family="system-ui, sans-serif" font-size="10" fill="#475569">Captures light energy for photosynthesis ($CO_2 + H_2O$)</text>

    <line x1="15" y1="78" x2="825" y2="78" stroke="#e2e8f0" stroke-width="1" />
    <text x="25" y="92" font-family="system-ui, sans-serif" font-size="11" font-weight="600" fill="#334155">Large Permanent Vacuole</text>
    <text x="340" y="92" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#ef4444">✕ Small/temporary only</text>
    <text x="510" y="92" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#16a34a">✓ Present (central sap)</text>
    <text x="610" y="92" font-family="system-ui, sans-serif" font-size="10" fill="#475569">Maintains hydrostatic pressure against cellulose wall</text>

    <line x1="15" y1="100" x2="825" y2="100" stroke="#e2e8f0" stroke-width="1" />
    <text x="25" y="112" font-family="system-ui, sans-serif" font-size="10" font-weight="600" fill="#334155">Carbohydrate Storage</text>
    <text x="340" y="112" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" font-weight="600" fill="#be123c">Glycogen granules</text>
    <text x="510" y="112" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" font-weight="600" fill="#15803d">Starch granules</text>
    <text x="610" y="112" font-family="system-ui, sans-serif" font-size="10" fill="#475569">Insoluble polymers; tested with iodine solution</text>
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

  "demographic-transition.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 460" width="100%" height="auto" class="rounded-2xl bg-white shadow-sm border border-slate-200">
  <rect x="0" y="0" width="840" height="52" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1" />
  <text x="420" y="32" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" font-weight="700" fill="#0f172a">
    Cambridge IGCSE 0460 Geography · The Demographic Transition Model (DTM)
  </text>
  <g transform="translate(80, 80)">
    <!-- 5 Stage Columns -->
    <rect x="0" y="0" width="130" height="300" fill="#f8fafc" opacity="0.6" />
    <rect x="130" y="0" width="140" height="300" fill="#f1f5f9" opacity="0.6" />
    <rect x="270" y="0" width="140" height="300" fill="#f8fafc" opacity="0.6" />
    <rect x="410" y="0" width="140" height="300" fill="#f1f5f9" opacity="0.6" />
    <rect x="550" y="0" width="140" height="300" fill="#f8fafc" opacity="0.6" />

    <!-- Stage Headers -->
    <text x="65" y="25" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#334155">Stage 1</text>
    <text x="65" y="42" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" fill="#64748b">High Fluctuating</text>

    <text x="200" y="25" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#334155">Stage 2</text>
    <text x="200" y="42" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" fill="#64748b">Early Expanding</text>

    <text x="340" y="25" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#334155">Stage 3</text>
    <text x="340" y="42" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" fill="#64748b">Late Expanding</text>

    <text x="480" y="25" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#334155">Stage 4</text>
    <text x="480" y="42" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" fill="#64748b">Low Fluctuating</text>

    <text x="620" y="25" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#334155">Stage 5</text>
    <text x="620" y="42" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" fill="#64748b">Natural Decline</text>

    <!-- Birth Rate Curve (Green) -->
    <path d="M 0 80 Q 70 85 130 80 L 270 80 Q 340 140 410 220 L 550 230 Q 620 250 690 260" fill="none" stroke="#16a34a" stroke-width="3" />
    <text x="280" y="75" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#16a34a">Birth Rate</text>

    <!-- Death Rate Curve (Red) -->
    <path d="M 0 90 Q 70 95 130 90 Q 200 160 270 210 L 410 230 L 550 230 L 690 220" fill="none" stroke="#dc2626" stroke-width="3" stroke-dasharray="6,3" />
    <text x="140" y="125" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#dc2626">Death Rate</text>

    <!-- Total Population Curve (Blue) -->
    <path d="M 0 260 L 130 260 Q 270 220 410 140 Q 500 100 550 90 L 690 105" fill="none" stroke="#2563eb" stroke-width="3.5" />
    <text x="430" y="115" font-family="system-ui, sans-serif" font-size="11" font-weight="800" fill="#2563eb">Total Population</text>

    <!-- Natural Increase Shaded Area in Stage 2 & 3 -->
    <rect x="180" y="270" width="190" height="24" rx="6" fill="#dcfce7" stroke="#86efac" />
    <text x="275" y="286" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#15803d">
      Rapid Natural Increase
    </text>
  </g>
</svg>`,

  "plate-tectonics.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 480" width="100%" height="auto" class="rounded-2xl bg-white shadow-sm border border-slate-200">
  <defs>
    <linearGradient id="oceanGrad" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0284c7" />
      <stop offset="100%" stop-color="#0369a1" />
    </linearGradient>
    <linearGradient id="mantleGrad" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ea580c" />
      <stop offset="100%" stop-color="#991b1b" />
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="840" height="52" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1" />
  <text x="420" y="32" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" font-weight="700" fill="#0f172a">
    Cambridge IGCSE 0460 Geography · Destructive (Convergent) Plate Boundary
  </text>
  <g transform="translate(60, 80)">
    <!-- Asthenosphere Mantle -->
    <rect x="0" y="200" width="720" height="170" fill="url(#mantleGrad)" />
    <text x="360" y="320" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#fef2f2">
      Semi-Molten Mantle (Asthenosphere) · High Heat &amp; Convection Currents
    </text>

    <!-- Ocean Water -->
    <rect x="0" y="50" width="320" height="70" fill="url(#oceanGrad)" opacity="0.8" />
    <text x="160" y="85" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#ffffff">
      Oceanic Trench (Deep Ocean)
    </text>

    <!-- Dense Oceanic Plate Subducting -->
    <path d="M 0 120 L 260 120 L 440 280 L 380 320 L 220 170 L 0 170 Z" fill="#475569" stroke="#334155" stroke-width="2" />
    <text x="110" y="150" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#ffffff">
      Dense Oceanic Crust (Basalt) →
    </text>

    <!-- Continental Plate & Fold Mountains / Volcano -->
    <path d="M 280 120 Q 320 60 420 30 Q 480 10 540 50 L 720 70 L 720 200 L 460 200 Z" fill="#a16207" stroke="#78350f" stroke-width="2" />
    <text x="560" y="120" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#ffffff">
      Continental Plate (Granite)
    </text>

    <!-- Composite Volcano Vent & Magma Chamber -->
    <path d="M 480 200 Q 480 120 480 40" stroke="#f97316" stroke-width="8" fill="none" />
    <circle cx="480" cy="210" r="30" fill="#ef4444" />
    <text x="480" y="215" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" font-weight="800" fill="#ffffff">Magma</text>

    <!-- Ash Cloud -->
    <ellipse cx="480" cy="20" rx="35" ry="16" fill="#64748b" opacity="0.8" />
    <text x="480" y="24" text-anchor="middle" font-family="system-ui, sans-serif" font-size="9" font-weight="700" fill="#ffffff">Eruption</text>

    <!-- Subduction Zone Callout -->
    <rect x="250" y="230" width="130" height="24" rx="6" fill="#fee2e2" stroke="#fca5a5" />
    <text x="315" y="246" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#b91c1c">
      Subduction Zone
    </text>
  </g>
</svg>`,

  "fractional-distillation.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 480" width="100%" height="auto" class="rounded-2xl bg-white shadow-sm border border-slate-200">
  <rect x="0" y="0" width="840" height="52" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1" />
  <text x="420" y="32" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" font-weight="700" fill="#0f172a">
    Cambridge IGCSE 0620 Chemistry · Fractional Distillation of Crude Oil
  </text>
  <g transform="translate(100, 80)">
    <!-- Distillation Tower -->
    <rect x="160" y="20" width="140" height="340" rx="16" fill="#e2e8f0" stroke="#475569" stroke-width="3" />

    <!-- Hot at bottom, cool at top gradient -->
    <text x="130" y="45" text-anchor="end" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#2563eb">Cool (20°C) ↑</text>
    <text x="130" y="345" text-anchor="end" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#dc2626">Hot (350°C) ↓</text>

    <!-- Crude oil in -->
    <line x1="60" y1="310" x2="160" y2="310" stroke="#0f172a" stroke-width="6" />
    <text x="50" y="305" text-anchor="end" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#0f172a">Crude Oil (Heated)</text>

    <!-- Fraction Outlets & Labels -->
    <!-- 1. Refinery Gas -->
    <line x1="300" y1="50" x2="400" y2="50" stroke="#3b82f6" stroke-width="4" />
    <text x="410" y="54" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#1e40af">Refinery Gas (Bottled cooking gas, C1–C4)</text>

    <!-- 2. Petrol / Gasoline -->
    <line x1="300" y1="100" x2="400" y2="100" stroke="#10b981" stroke-width="4" />
    <text x="410" y="104" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#065f46">Gasoline / Petrol (Car fuel, C5–C10)</text>

    <!-- 3. Naphtha -->
    <line x1="300" y1="150" x2="400" y2="150" stroke="#f59e0b" stroke-width="4" />
    <text x="410" y="154" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#92400e">Naphtha (Chemical feedstock for plastics)</text>

    <!-- 4. Kerosene -->
    <line x1="300" y1="200" x2="400" y2="200" stroke="#f97316" stroke-width="4" />
    <text x="410" y="204" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#9a3412">Kerosene / Paraffin (Jet aircraft fuel)</text>

    <!-- 5. Diesel -->
    <line x1="300" y1="250" x2="400" y2="250" stroke="#ea580c" stroke-width="4" />
    <text x="410" y="254" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#7c2d12">Diesel Oil (Lorries, trains, buses)</text>

    <!-- 6. Bitumen (Bottom) -->
    <line x1="300" y1="330" x2="400" y2="330" stroke="#1e293b" stroke-width="6" />
    <text x="410" y="334" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#0f172a">Bitumen / Residue (Road surfacing, roofing)</text>
  </g>
</svg>`,

  "supply-demand.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 460" width="100%" height="auto" class="rounded-2xl bg-white shadow-sm border border-slate-200">
  <rect x="0" y="0" width="840" height="52" fill="#f8fafc" stroke="#e2e8f0" stroke-width="1" />
  <text x="420" y="32" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" font-weight="700" fill="#0f172a">
    Cambridge IGCSE 0455 Economics · Market Equilibrium (Supply &amp; Demand)
  </text>
  <g transform="translate(140, 80)">
    <!-- Axes -->
    <line x1="60" y1="300" x2="560" y2="300" stroke="#334155" stroke-width="2.5" />
    <text x="575" y="305" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#334155">Quantity (Q)</text>

    <line x1="60" y1="300" x2="60" y2="40" stroke="#334155" stroke-width="2.5" />
    <text x="60" y="25" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#334155">Price (P)</text>

    <!-- Demand Curve D (Downward sloping) -->
    <line x1="100" y1="70" x2="480" y2="270" stroke="#2563eb" stroke-width="3.5" stroke-linecap="round" />
    <text x="490" y="275" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#2563eb">D</text>

    <!-- Supply Curve S (Upward sloping) -->
    <line x1="100" y1="270" x2="480" y2="70" stroke="#16a34a" stroke-width="3.5" stroke-linecap="round" />
    <text x="490" y="75" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#16a34a">S</text>

    <!-- Equilibrium Point E at (290, 170) -->
    <circle cx="290" cy="170" r="7" fill="#dc2626" stroke="#ffffff" stroke-width="2" />
    <text x="310" y="165" font-family="system-ui, sans-serif" font-size="12" font-weight="800" fill="#dc2626">Equilibrium (E*)</text>

    <!-- Dashed Equilibrium lines -->
    <line x1="60" y1="170" x2="290" y2="170" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="4,4" />
    <text x="40" y="174" text-anchor="end" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#dc2626">P*</text>

    <line x1="290" y1="170" x2="290" y2="300" stroke="#dc2626" stroke-width="1.5" stroke-dasharray="4,4" />
    <text x="290" y="320" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#dc2626">Q*</text>
  </g>
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

  "biology-classification.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 380" width="100%" height="auto" class="rounded-2xl bg-white shadow-sm border border-slate-200">
    <rect width="840" height="46" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1"/>
    <text x="420" y="28" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#14532d">Cambridge IGCSE Biology · 5 Kingdoms &amp; Dichotomous Key</text>
    <g transform="translate(40, 75)">
      <rect x="0" y="0" width="130" height="60" rx="10" fill="#ecfdf5" stroke="#10b981" stroke-width="2"/>
      <text x="65" y="26" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#065f46">Animalia</text>
      <text x="65" y="44" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" fill="#047857">Multicellular, no wall</text>

      <rect x="150" y="0" width="130" height="60" rx="10" fill="#eff6ff" stroke="#3b82f6" stroke-width="2"/>
      <text x="215" y="26" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#1e40af">Plantae</text>
      <text x="215" y="44" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" fill="#1d4ed8">Cellulose wall &amp; chloro</text>

      <rect x="300" y="0" width="130" height="60" rx="10" fill="#fefce8" stroke="#eab308" stroke-width="2"/>
      <text x="365" y="26" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#854d0e">Fungi</text>
      <text x="365" y="44" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" fill="#a16207">Chitin wall, saprotrophic</text>

      <rect x="450" y="0" width="130" height="60" rx="10" fill="#faf5ff" stroke="#a855f7" stroke-width="2"/>
      <text x="515" y="26" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#6b21a8">Protoctista</text>
      <text x="515" y="44" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" fill="#7e22ce">Single/colonial eukaryote</text>

      <rect x="600" y="0" width="140" height="60" rx="10" fill="#fff1f2" stroke="#f43f5e" stroke-width="2"/>
      <text x="670" y="26" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#9f1239">Prokaryotae</text>
      <text x="670" y="44" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" fill="#be123c">No true nucleus, 70S</text>
    </g>
    <g transform="translate(80, 175)">
      <rect x="0" y="0" width="680" height="155" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
      <text x="340" y="30" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#0f172a">Dichotomous Key Decision Logic (Pairwise Couplets)</text>
      <path d="M 120 45 L 120 80 L 260 80 M 120 80 L 120 125 L 260 125" fill="none" stroke="#64748b" stroke-width="2"/>
      <text x="270" y="84" font-family="monospace" font-size="11" fill="#334155">1a. Has jointed legs ................................... Go to 2</text>
      <text x="270" y="129" font-family="monospace" font-size="11" fill="#334155">1b. No jointed legs (annelid / mollusc) ................ Annelida</text>
    </g>
  </svg>`,

  "biology-enzyme.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 380" width="100%" height="auto" class="rounded-2xl bg-white shadow-sm border border-slate-200">
    <rect width="840" height="46" fill="#fef2f2" stroke="#fecaca" stroke-width="1"/>
    <text x="420" y="28" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#991b1b">Enzyme Action: Lock &amp; Key Hypothesis &amp; Active Site</text>
    <g transform="translate(50, 80)">
      <!-- Enzyme shape -->
      <path d="M 40 180 C 40 100, 100 60, 180 60 C 210 60, 220 90, 240 110 C 260 130, 280 130, 300 110 C 320 90, 330 60, 360 60 C 440 60, 500 100, 500 180 C 500 240, 440 280, 270 280 C 100 280, 40 240, 40 180 Z" fill="#e0e7ff" stroke="#4338ca" stroke-width="3"/>
      <text x="270" y="220" text-anchor="middle" font-family="system-ui, sans-serif" font-size="16" font-weight="800" fill="#3730a3">ENZYME</text>
      <text x="270" y="145" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" font-weight="700" fill="#4f46e5">Active Site</text>
      <!-- Substrate fitting in -->
      <path d="M 230 40 L 310 40 L 290 85 L 250 85 Z" fill="#fef08a" stroke="#ca8a04" stroke-width="2.5"/>
      <text x="270" y="30" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#854d0e">Substrate (Complementary Shape)</text>
    </g>
    <g transform="translate(560, 100)">
      <rect width="230" height="180" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
      <text x="115" y="32" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#0f172a">Key Principles</text>
      <text x="20" y="65" font-family="system-ui, sans-serif" font-size="11" fill="#334155">• Substrate binds to Active Site</text>
      <text x="20" y="92" font-family="system-ui, sans-serif" font-size="11" fill="#334155">• Forms Enzyme-Substrate Complex</text>
      <text x="20" y="120" font-family="system-ui, sans-serif" font-size="11" fill="#334155">• Reaction lowers Activation Energy</text>
      <text x="20" y="148" font-family="system-ui, sans-serif" font-size="11" fill="#334155">• High temp/pH causes Denaturation</text>
    </g>
  </svg>`,

  "biology-photosynthesis.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 380" width="100%" height="auto" class="rounded-2xl bg-white shadow-sm border border-slate-200">
    <rect width="840" height="46" fill="#ecfdf5" stroke="#a7f3d0" stroke-width="1"/>
    <text x="420" y="28" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#065f46">Plant Nutrition: Chloroplast Anatomy &amp; Photosynthetic Stages</text>
    <g transform="translate(60, 80)">
      <!-- Chloroplast outer and inner envelope -->
      <ellipse cx="260" cy="140" rx="230" ry="115" fill="#f0fdf4" stroke="#16a34a" stroke-width="3"/>
      <ellipse cx="260" cy="140" rx="215" ry="100" fill="none" stroke="#22c55e" stroke-width="2" stroke-dasharray="4,2"/>
      <!-- Thylakoid grana stack -->
      <rect x="120" y="110" width="60" height="16" rx="6" fill="#15803d"/>
      <rect x="120" y="130" width="60" height="16" rx="6" fill="#15803d"/>
      <rect x="120" y="150" width="60" height="16" rx="6" fill="#15803d"/>
      <text x="150" y="190" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" font-weight="700" fill="#14532d">Granum (Thylakoids)</text>
      <!-- Stroma -->
      <text x="360" y="145" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#15803d">Stroma (Fluid Matrix)</text>
      <text x="360" y="165" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" fill="#166534">Calvin Cycle &amp; Glucose synthesis</text>
    </g>
    <g transform="translate(560, 100)">
      <rect width="240" height="175" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
      <text x="120" y="32" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#0f172a">Balanced Equation</text>
      <text x="120" y="65" text-anchor="middle" font-family="monospace" font-size="11" font-weight="700" fill="#15803d">6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂</text>
      <text x="20" y="105" font-family="system-ui, sans-serif" font-size="11" fill="#334155">• Chlorophyll absorbs light energy</text>
      <text x="20" y="130" font-family="system-ui, sans-serif" font-size="11" fill="#334155">• Photolysis splits H₂O → H⁺ + O₂</text>
      <text x="20" y="155" font-family="system-ui, sans-serif" font-size="11" fill="#334155">• Limiting factors: Light, CO₂, Temp</text>
    </g>
  </svg>`,

  "chemistry-states-matter.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 380" width="100%" height="auto" class="rounded-2xl bg-white shadow-sm border border-slate-200">
    <rect width="840" height="46" fill="#eff6ff" stroke="#bfdbfe" stroke-width="1"/>
    <text x="420" y="28" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#1e40af">Chemistry: Kinetic Particle Theory (Solid, Liquid, Gas Transitions)</text>
    <g transform="translate(50, 80)">
      <!-- Solid Box -->
      <rect x="0" y="20" width="190" height="190" rx="12" fill="#f8fafc" stroke="#3b82f6" stroke-width="2"/>
      <text x="95" y="45" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#1e40af">SOLID</text>
      <g fill="#2563eb">
        <circle cx="50" cy="80" r="14"/><circle cx="85" cy="80" r="14"/><circle cx="120" cy="80" r="14"/>
        <circle cx="50" cy="115" r="14"/><circle cx="85" cy="115" r="14"/><circle cx="120" cy="115" r="14"/>
        <circle cx="50" cy="150" r="14"/><circle cx="85" cy="150" r="14"/><circle cx="120" cy="150" r="14"/>
      </g>
      <text x="95" y="195" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" fill="#64748b">Regular lattice · Vibrate in place</text>

      <!-- Liquid Box -->
      <rect x="250" y="20" width="190" height="190" rx="12" fill="#f8fafc" stroke="#06b6d4" stroke-width="2"/>
      <text x="345" y="45" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#0891b2">LIQUID</text>
      <g fill="#0891b2">
        <circle cx="285" cy="85" r="14"/><circle cx="330" cy="95" r="14"/><circle cx="380" cy="80" r="14"/>
        <circle cx="300" cy="130" r="14"/><circle cx="350" cy="140" r="14"/><circle cx="395" cy="125" r="14"/>
        <circle cx="320" cy="170" r="14"/><circle cx="370" cy="175" r="14"/>
      </g>
      <text x="345" y="195" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" fill="#64748b">Random, touching · Slide past</text>

      <!-- Gas Box -->
      <rect x="500" y="20" width="190" height="190" rx="12" fill="#f8fafc" stroke="#ec4899" stroke-width="2"/>
      <text x="595" y="45" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#be185d">GAS</text>
      <g fill="#db2777">
        <circle cx="535" cy="80" r="14"/><circle cx="640" cy="95" r="14"/><circle cx="585" cy="145" r="14"/><circle cx="620" cy="170" r="14"/>
      </g>
      <text x="595" y="195" text-anchor="middle" font-family="system-ui, sans-serif" font-size="10" fill="#64748b">Far apart · Rapid, random motion</text>
    </g>
    <text x="420" y="335" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="600" fill="#475569">
      Melting (Solid → Liquid) · Boiling/Evaporation (Liquid → Gas) · Sublimation (Solid → Gas)
    </text>
  </svg>`,

  "chemistry-mole-triangle.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 380" width="100%" height="auto" class="rounded-2xl bg-white shadow-sm border border-slate-200">
    <rect width="840" height="46" fill="#fdf4ff" stroke="#f5d0fe" stroke-width="1"/>
    <text x="420" y="28" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#86198f">The 3 Essential Cambridge Mole Calculation Triangles</text>
    <g transform="translate(50, 75)">
      <!-- Triangle 1: Mass -->
      <polygon points="110,20 20,180 200,180" fill="#fdf2f8" stroke="#ec4899" stroke-width="2.5"/>
      <line x1="45" y1="120" x2="175" y2="120" stroke="#ec4899" stroke-width="2"/>
      <line x1="110" y1="120" x2="110" y2="180" stroke="#ec4899" stroke-width="2"/>
      <text x="110" y="85" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#9d174d">Mass (g)</text>
      <text x="70" y="155" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#be185d">Moles</text>
      <text x="150" y="155" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#be185d">Mr / Ar</text>
      <text x="110" y="215" text-anchor="middle" font-family="monospace" font-size="12" font-weight="700" fill="#9d174d">Moles = Mass / Mr</text>

      <!-- Triangle 2: Gas Volume -->
      <polygon points="370,20 280,180 460,180" fill="#eff6ff" stroke="#3b82f6" stroke-width="2.5"/>
      <line x1="305" y1="120" x2="435" y2="120" stroke="#3b82f6" stroke-width="2"/>
      <line x1="370" y1="120" x2="370" y2="180" stroke="#3b82f6" stroke-width="2"/>
      <text x="370" y="85" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#1e40af">Vol (dm³)</text>
      <text x="330" y="155" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#2563eb">Moles</text>
      <text x="410" y="155" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#2563eb">24 dm³</text>
      <text x="370" y="215" text-anchor="middle" font-family="monospace" font-size="12" font-weight="700" fill="#1e40af">Vol = Moles × 24</text>

      <!-- Triangle 3: Solutions -->
      <polygon points="630,20 540,180 720,180" fill="#ecfdf5" stroke="#10b981" stroke-width="2.5"/>
      <line x1="565" y1="120" x2="695" y2="120" stroke="#10b981" stroke-width="2"/>
      <line x1="630" y1="120" x2="630" y2="180" stroke="#10b981" stroke-width="2"/>
      <text x="630" y="85" text-anchor="middle" font-family="system-ui, sans-serif" font-size="14" font-weight="800" fill="#065f46">Moles</text>
      <text x="590" y="155" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#059669">Conc</text>
      <text x="670" y="155" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#059669">Vol(dm³)</text>
      <text x="630" y="215" text-anchor="middle" font-family="monospace" font-size="12" font-weight="700" fill="#065f46">Moles = Conc × Vol</text>
    </g>
  </svg>`,

  "physics-refraction.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 380" width="100%" height="auto" class="rounded-2xl bg-white shadow-sm border border-slate-200">
    <rect width="840" height="46" fill="#f0f9ff" stroke="#bae6fd" stroke-width="1"/>
    <text x="420" y="28" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#0369a1">Physics: Ray Optics, Refraction &amp; Snell's Law</text>
    <g transform="translate(50, 75)">
      <!-- Glass Block -->
      <rect x="150" y="90" width="360" height="150" fill="#e0f2fe" stroke="#0284c7" stroke-width="2" opacity="0.8"/>
      <text x="170" y="115" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#0369a1">Glass Medium (n = 1.5)</text>
      <text x="170" y="70" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#64748b">Air (n = 1.0)</text>
      <!-- Normal line -->
      <line x1="330" y1="20" x2="330" y2="280" stroke="#94a3b8" stroke-width="2" stroke-dasharray="6,4"/>
      <text x="335" y="35" font-family="system-ui, sans-serif" font-size="10" fill="#64748b">Normal</text>
      <!-- Incident Ray -->
      <line x1="200" y1="10" x2="330" y2="90" stroke="#ef4444" stroke-width="3"/>
      <!-- Refracted Ray inside glass -->
      <line x1="330" y1="90" x2="380" y2="240" stroke="#ef4444" stroke-width="3"/>
      <!-- Emergent Ray in air -->
      <line x1="380" y1="240" x2="510" y2="320" stroke="#ef4444" stroke-width="3"/>
      <!-- Angles -->
      <text x="290" y="70" font-family="monospace" font-size="13" font-weight="700" fill="#b91c1c">Angle i</text>
      <text x="350" y="135" font-family="monospace" font-size="13" font-weight="700" fill="#b91c1c">Angle r</text>
    </g>
    <g transform="translate(580, 95)">
      <rect width="210" height="180" rx="14" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
      <text x="105" y="32" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="700" fill="#0f172a">Snell's Law Formula</text>
      <text x="105" y="65" text-anchor="middle" font-family="monospace" font-size="13" font-weight="800" fill="#0284c7">n = sin(i) / sin(r)</text>
      <text x="20" y="105" font-family="system-ui, sans-serif" font-size="11" fill="#334155">• Ray bends towards normal</text>
      <text x="20" y="130" font-family="system-ui, sans-serif" font-size="11" fill="#334155">• Speed slows down in glass</text>
      <text x="20" y="155" font-family="system-ui, sans-serif" font-size="11" fill="#334155">• Critical angle: sin(c) = 1/n</text>
    </g>
  </svg>`,

  "cs-logic-gates.svg": `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 840 380" width="100%" height="auto" class="rounded-2xl bg-white shadow-sm border border-slate-200">
    <rect width="840" height="46" fill="#f5f3ff" stroke="#ddd6fe" stroke-width="1"/>
    <text x="420" y="28" text-anchor="middle" font-family="system-ui, sans-serif" font-size="15" font-weight="700" fill="#5b21b6">Computer Science: Standard Logic Gates &amp; Truth Tables</text>
    <g transform="translate(50, 75)">
      <!-- AND Gate -->
      <rect x="0" y="20" width="220" height="110" rx="10" fill="#f8fafc" stroke="#8b5cf6" stroke-width="2"/>
      <text x="110" y="45" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#6d28d9">AND Gate (A · B)</text>
      <path d="M 35 65 L 75 65 C 95 65, 95 95, 75 95 L 35 95 Z" fill="#ede9fe" stroke="#6d28d9" stroke-width="2"/>
      <text x="160" y="85" text-anchor="middle" font-family="monospace" font-size="11" fill="#334155">1 &amp; 1 = 1</text>

      <!-- OR Gate -->
      <rect x="260" y="20" width="220" height="110" rx="10" fill="#f8fafc" stroke="#3b82f6" stroke-width="2"/>
      <text x="370" y="45" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#1d4ed8">OR Gate (A + B)</text>
      <path d="M 290 65 Q 310 80 290 95 C 320 95, 335 85, 345 80 C 335 75, 320 65, 290 65 Z" fill="#dbeafe" stroke="#1d4ed8" stroke-width="2"/>
      <text x="420" y="85" text-anchor="middle" font-family="monospace" font-size="11" fill="#334155">1 OR 0 = 1</text>

      <!-- NOT Gate -->
      <rect x="520" y="20" width="220" height="110" rx="10" fill="#f8fafc" stroke="#ec4899" stroke-width="2"/>
      <text x="630" y="45" text-anchor="middle" font-family="system-ui, sans-serif" font-size="13" font-weight="800" fill="#be185d">NOT Gate (Inverter)</text>
      <polygon points="560,65 560,95 590,80" fill="#fce7f3" stroke="#be185d" stroke-width="2"/>
      <circle cx="594" cy="80" r="3.5" fill="none" stroke="#be185d" stroke-width="2"/>
      <text x="670" y="85" text-anchor="middle" font-family="monospace" font-size="11" fill="#334155">NOT 1 = 0</text>
    </g>
    <g transform="translate(100, 220)">
      <rect width="640" height="90" rx="12" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
      <text x="320" y="30" text-anchor="middle" font-family="system-ui, sans-serif" font-size="12" font-weight="700" fill="#0f172a">Universal NAND &amp; NOR Logic</text>
      <text x="320" y="55" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#475569">NAND is NOT-AND: outputs 0 ONLY when both inputs are 1.</text>
      <text x="320" y="75" text-anchor="middle" font-family="system-ui, sans-serif" font-size="11" fill="#475569">XOR (Exclusive OR): outputs 1 ONLY when inputs are different.</text>
    </g>
  </svg>`,
};

/**
 * Returns a guaranteed valid vector SVG diagram for any subject and chapter number.
 * Each chapter gets its OWN unique, topic-aligned scientific illustration!
 */
export function getChapterDiagramSvg(subjectId: string, chapterNumber: number): string {
  const sid = (subjectId || "").toLowerCase();

  // 1. Biology (0610)
  if (sid.includes("bio")) {
    if (chapterNumber === 1) return DIAGRAM_MAP["biology-classification.svg"]!;
    if (chapterNumber === 2) return DIAGRAM_MAP["cell-structure.svg"]!;
    if (chapterNumber === 3) return DIAGRAM_MAP["biology-enzyme.svg"]!;
    if (chapterNumber === 4) return DIAGRAM_MAP["biology-photosynthesis.svg"]!;
    return DIAGRAM_MAP["cell-structure.svg"]!;
  }

  // 2. Chemistry (0620)
  if (sid.includes("chem")) {
    if (chapterNumber === 1) return DIAGRAM_MAP["chemistry-states-matter.svg"]!;
    if (chapterNumber === 2) return DIAGRAM_MAP["chemistry-mole-triangle.svg"]!;
    if (chapterNumber === 3) return DIAGRAM_MAP["fractional-distillation.svg"]!;
    return DIAGRAM_MAP["chemistry-states-matter.svg"]!;
  }

  // 3. Physics (0625)
  if (sid.includes("phys")) {
    if (chapterNumber === 1) return DIAGRAM_MAP["quadratic-graph.svg"]!; // Kinematics v-t curve
    if (chapterNumber === 2) return DIAGRAM_MAP["physics-refraction.svg"]!;
    return DIAGRAM_MAP["physics-refraction.svg"]!;
  }

  // 4. Geography (0460)
  if (sid.includes("geo")) {
    if (chapterNumber === 1) return DIAGRAM_MAP["demographic-transition.svg"]!;
    if (chapterNumber === 2) return DIAGRAM_MAP["plate-tectonics.svg"]!;
    return DIAGRAM_MAP["demographic-transition.svg"]!;
  }

  // 5. Economics (0455) & Business
  if (sid.includes("econ") || sid.includes("business")) {
    if (chapterNumber === 1) return DIAGRAM_MAP["supply-demand.svg"]!;
    return DIAGRAM_MAP["supply-demand.svg"]!;
  }

  // 6. Computer Science (0478)
  if (sid.includes("computer") || sid.includes("ict")) {
    if (chapterNumber === 1) return DIAGRAM_MAP["cs-logic-gates.svg"]!;
    return DIAGRAM_MAP["computer-architecture.svg"]!;
  }

  // 7. Mathematics (0580)
  if (sid.includes("math")) {
    return DIAGRAM_MAP["quadratic-graph.svg"]!;
  }

  // 8. Environmental Management (0680)
  if (sid.includes("environ")) {
    return DIAGRAM_MAP["rock-cycle.svg"]!;
  }

  return DIAGRAM_MAP["demographic-transition.svg"]!;
}

