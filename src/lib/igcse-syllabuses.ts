// ─── Cambridge IGCSE Syllabuses ───────────────────────────────────────────────
// Every PDF URL verified directly from cambridgeinternational.org subject pages.
// URL pattern: https://www.cambridgeinternational.org/Images/{id}-{years}-syllabus.pdf

const BASE = "https://www.cambridgeinternational.org/Images";

export type SyllabusDoc = {
  label: string;
  url: string;
};

export type IgcseSubject = {
  id: string;
  name: string;
  code: string;
  category: string;
  color: string;
  syllabuses: SyllabusDoc[];
};

export const igcseSubjects: IgcseSubject[] = [

  // ── Sciences ─────────────────────────────────────────────────────────────────
  {
    id: "biology",
    name: "Biology",
    code: "0610",
    category: "Sciences",
    color: "bg-mint",
    syllabuses: [
      { label: "2023 – 2025 Syllabus", url: `${BASE}/595426-2023-2025-syllabus.pdf` },
      { label: "2026 – 2028 Syllabus", url: `${BASE}/697203-2026-2028-syllabus.pdf` },
    ],
  },
  {
    id: "chemistry",
    name: "Chemistry",
    code: "0620",
    category: "Sciences",
    color: "bg-lavender",
    syllabuses: [
      { label: "2023 – 2025 Syllabus", url: `${BASE}/595428-2023-2025-syllabus.pdf` },
      { label: "2026 – 2028 Syllabus", url: `${BASE}/697205-2026-2028-syllabus.pdf` },
    ],
  },
  {
    id: "physics",
    name: "Physics",
    code: "0625",
    category: "Sciences",
    color: "bg-lilac",
    syllabuses: [
      { label: "2023 – 2025 Syllabus", url: `${BASE}/595430-2023-2025-syllabus.pdf` },
      { label: "2026 – 2028 Syllabus", url: `${BASE}/697209-2026-2028-syllabus.pdf` },
    ],
  },
  {
    id: "combined-science",
    name: "Combined Science",
    code: "0653",
    category: "Sciences",
    color: "bg-mint",
    syllabuses: [
      { label: "2025 – 2027 Syllabus", url: `${BASE}/662474-2025-2027-syllabus.pdf` },
      { label: "2028 – 2029 Syllabus", url: `${BASE}/745687-2028-2029-syllabus.pdf` },
    ],
  },
  {
    id: "environmental-management",
    name: "Environmental Management",
    code: "0680",
    category: "Sciences",
    color: "bg-lavender",
    syllabuses: [
      { label: "2025 – 2026 Syllabus", url: `${BASE}/664643-2025-2026-syllabus.pdf` },
      { label: "2027 – 2029 Syllabus", url: `${BASE}/718156-2027-2029-syllabus.pdf` },
    ],
  },

  // ── Mathematics ──────────────────────────────────────────────────────────────
  {
    id: "mathematics",
    name: "Mathematics",
    code: "0580",
    category: "Mathematics",
    color: "bg-lavender",
    syllabuses: [
      { label: "2025 – 2027 Syllabus", url: `${BASE}/662466-2025-2027-syllabus.pdf` },
      { label: "2028 – 2030 Syllabus", url: `${BASE}/745681-2028-2030-syllabus.pdf` },
    ],
  },
  {
    id: "additional-mathematics",
    name: "Additional Mathematics",
    code: "0606",
    category: "Mathematics",
    color: "bg-lilac",
    syllabuses: [
      { label: "2025 – 2027 Syllabus", url: `${BASE}/662470-2025-2027-syllabus.pdf` },
      { label: "2028 – 2030 Syllabus", url: `${BASE}/745683-2028-2030-syllabus.pdf` },
    ],
  },

  // ── English ───────────────────────────────────────────────────────────────────
  {
    id: "first-language-english",
    name: "First Language English",
    code: "0500",
    category: "English",
    color: "bg-mint",
    syllabuses: [
      { label: "2024 – 2026 Syllabus", url: `${BASE}/635230-2024-2026-syllabus.pdf` },
      { label: "2027 – 2029 Syllabus", url: `${BASE}/718783-2027-2029-syllabus.pdf` },
    ],
  },
  {
    id: "english-second-language",
    name: "English as a Second Language",
    code: "0510",
    category: "English",
    color: "bg-lavender",
    syllabuses: [
      { label: "2024 – 2026 Syllabus", url: `${BASE}/637160-2024-2026-syllabus.pdf` },
      { label: "2027 – 2029 Syllabus", url: `${BASE}/721337-2027-2029-syllabus.pdf` },
    ],
  },
  {
    id: "literature-english",
    name: "Literature in English",
    code: "0475",
    category: "English",
    color: "bg-lilac",
    syllabuses: [
      { label: "2023 – 2025 Syllabus", url: `${BASE}/596436-2023-2025-syllabus.pdf` },
      { label: "2026 Syllabus",         url: `${BASE}/697163-2026-syllabus.pdf` },
      { label: "2027 Syllabus",         url: `${BASE}/721333-2027-syllabus.pdf` },
    ],
  },

  // ── Business & Economics ──────────────────────────────────────────────────────
  {
    id: "accounting",
    name: "Accounting",
    code: "0452",
    category: "Business & Economics",
    color: "bg-mint",
    syllabuses: [
      { label: "2023 – 2025 Syllabus", url: `${BASE}/596935-2023-2025-syllabus.pdf` },
      { label: "2026 Syllabus",         url: `${BASE}/697149-2026-syllabus.pdf` },
      { label: "2027 – 2029 Syllabus", url: `${BASE}/718141-2027-2029-syllabus.pdf` },
    ],
  },
  {
    id: "business-studies",
    name: "Business Studies",
    code: "0450",
    category: "Business & Economics",
    color: "bg-lavender",
    syllabuses: [
      { label: "2023 – 2025 Syllabus", url: `${BASE}/596930-2023-2025-syllabus.pdf` },
      { label: "2026 Syllabus",         url: `${BASE}/697146-2026-syllabus.pdf` },
    ],
  },
  {
    id: "economics",
    name: "Economics",
    code: "0455",
    category: "Business & Economics",
    color: "bg-lilac",
    syllabuses: [
      { label: "2023 – 2025 Syllabus", url: `${BASE}/596945-2023-2025-syllabus.pdf` },
      { label: "2026 Syllabus",         url: `${BASE}/697154-2026-syllabus.pdf` },
      { label: "2027 – 2029 Syllabus", url: `${BASE}/718148-2027-2029-syllabus.pdf` },
    ],
  },

  // ── Humanities & Social Sciences ──────────────────────────────────────────────
  {
    id: "history",
    name: "History",
    code: "0470",
    category: "Humanities",
    color: "bg-mint",
    syllabuses: [
      { label: "2024 – 2026 Syllabus", url: `${BASE}/649636-2024-2026-syllabus.pdf` },
      { label: "2027 – 2028 Syllabus", url: `${BASE}/721327-2027-2028-syllabus.pdf` },
    ],
  },
  {
    id: "geography",
    name: "Geography",
    code: "0460",
    category: "Humanities",
    color: "bg-lavender",
    syllabuses: [
      { label: "2025 – 2026 Syllabus", url: `${BASE}/664610-2025-2026-syllabus.pdf` },
      { label: "2027 – 2029 Syllabus", url: `${BASE}/718150-2027-2029-syllabus.pdf` },
    ],
  },
  {
    id: "sociology",
    name: "Sociology",
    code: "0495",
    category: "Humanities",
    color: "bg-lilac",
    syllabuses: [
      { label: "2025 – 2027 Syllabus", url: `${BASE}/662464-2025-2027-syllabus.pdf` },
      { label: "2028 – 2030 Syllabus", url: `${BASE}/744795-2028-2030-syllabus.pdf` },
    ],
  },

  // ── Technology ────────────────────────────────────────────────────────────────
  {
    id: "computer-science",
    name: "Computer Science",
    code: "0478",
    category: "Technology",
    color: "bg-mint",
    syllabuses: [
      { label: "2023 – 2025 Syllabus", url: `${BASE}/595424-2023-2025-syllabus.pdf` },
      { label: "2026 – 2028 Syllabus", url: `${BASE}/697167-2026-2028-syllabus.pdf` },
    ],
  },
  {
    id: "ict",
    name: "Information & Communication Technology",
    code: "0417",
    category: "Technology",
    color: "bg-lavender",
    syllabuses: [
      { label: "2023 – 2025 Syllabus", url: `${BASE}/595352-2023-2025-syllabus.pdf` },
      { label: "2026 – 2028 Syllabus", url: `${BASE}/697139-2026-2028-syllabus.pdf` },
    ],
  },

  // ── Creative & Applied ────────────────────────────────────────────────────────
  {
    id: "art-and-design",
    name: "Art & Design",
    code: "0400",
    category: "Creative & Applied",
    color: "bg-mint",
    syllabuses: [
      { label: "2026 Syllabus", url: `${BASE}/697135-2026-syllabus.pdf` },
      { label: "2027 Syllabus", url: `${BASE}/729776-2027-syllabus.pdf` },
      { label: "2028 – 2030 Syllabus", url: `${BASE}/743279-2028-2030-syllabus.pdf` },
    ],
  },
  {
    id: "music",
    name: "Music",
    code: "0410",
    category: "Creative & Applied",
    color: "bg-lavender",
    syllabuses: [
      { label: "2025 Syllabus", url: `${BASE}/664596-2025-syllabus.pdf` },
      { label: "2026 – 2028 Syllabus", url: `${BASE}/694052-2026-2028-syllabus.pdf` },
    ],
  },
  {
    id: "design-technology",
    name: "Design & Technology",
    code: "0445",
    category: "Creative & Applied",
    color: "bg-lilac",
    syllabuses: [
      { label: "2024 – 2026 Syllabus", url: `${BASE}/635750-2024-2026-syllabus.pdf` },
      { label: "2027 Syllabus",         url: `${BASE}/721302-2027-syllabus.pdf` },
      { label: "2028 – 2030 Syllabus", url: `${BASE}/743280-2028-2030-syllabus.pdf` },
    ],
  },
  {
    id: "food-nutrition",
    name: "Food & Nutrition",
    code: "0648",
    category: "Creative & Applied",
    color: "bg-mint",
    syllabuses: [
      { label: "2023 – 2025 Syllabus", url: `${BASE}/597055-2023-2025-syllabus.pdf` },
      { label: "2026 – 2028 Syllabus", url: `${BASE}/697228-2026-2028-syllabus.pdf` },
    ],
  },
  {
    id: "physical-education",
    name: "Physical Education",
    code: "0413",
    category: "Creative & Applied",
    color: "bg-lavender",
    syllabuses: [
      { label: "2025 – 2026 Syllabus", url: `${BASE}/664604-2025-2026-syllabus.pdf` },
      { label: "2027 – 2028 Syllabus", url: `${BASE}/721298-2027-2028-syllabus.pdf` },
    ],
  },
  {
    id: "travel-tourism",
    name: "Travel & Tourism",
    code: "0471",
    category: "Creative & Applied",
    color: "bg-lilac",
    syllabuses: [
      { label: "2024 – 2026 Syllabus", url: `${BASE}/634449-2024-2026-syllabus.pdf` },
      { label: "2027 – 2029 Syllabus", url: `${BASE}/721329-2027-2029-syllabus.pdf` },
    ],
  },

  // ── Additional Humanities ─────────────────────────────────────────────────────
  {
    id: "religious-studies",
    name: "Religious Studies",
    code: "0490",
    category: "Humanities",
    color: "bg-mint",
    syllabuses: [
      { label: "2025 – 2027 Syllabus", url: `${BASE}/663158-2025-2027-syllabus.pdf` },
      { label: "2028 Syllabus",         url: `${BASE}/744791-2028-syllabus.pdf` },
    ],
  },
  {
    id: "global-perspectives",
    name: "Global Perspectives",
    code: "0457",
    category: "Humanities",
    color: "bg-lavender",
    syllabuses: [
      { label: "2025 – 2027 Syllabus", url: `${BASE}/662457-2025-2027-syllabus.pdf` },
      { label: "2028 Syllabus",         url: `${BASE}/744776-2028-syllabus.pdf` },
    ],
  },
];

export const igcseCategories = [...new Set(igcseSubjects.map((s) => s.category))];

