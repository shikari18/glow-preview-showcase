// Syllabus Notes — full document-style notes matching Cambridge IGCSE syllabus
// Re-exports all subjects from modular note collections

export * from "./notes/types";
import { BIOLOGY } from "./notes/biology";
import { CHEMISTRY } from "./notes/chemistry";
import { PHYSICS } from "./notes/physics";
import { ENVIRONMENTAL_MANAGEMENT } from "./notes/environmental-management";
import { MATHEMATICS } from "./notes/mathematics";
import { ADDITIONAL_MATHEMATICS } from "./notes/additional-mathematics";
import { FIRST_LANGUAGE_ENGLISH } from "./notes/first-language-english";
import { ENGLISH_SECOND_LANGUAGE } from "./notes/english-second-language";
import { LITERATURE_IN_ENGLISH } from "./notes/literature-in-english";
import { ACCOUNTING } from "./notes/accounting";
import { BUSINESS_STUDIES } from "./notes/business-studies";
import type { SubjectNotes } from "./notes/types";

export {
  BIOLOGY,
  CHEMISTRY,
  PHYSICS,
  ENVIRONMENTAL_MANAGEMENT,
  MATHEMATICS,
  ADDITIONAL_MATHEMATICS,
  FIRST_LANGUAGE_ENGLISH,
  ENGLISH_SECOND_LANGUAGE,
  LITERATURE_IN_ENGLISH,
  ACCOUNTING,
  BUSINESS_STUDIES
};

export const SYLLABUS_NOTES: SubjectNotes[] = [
  BIOLOGY,
  CHEMISTRY,
  PHYSICS,
  ENVIRONMENTAL_MANAGEMENT,
  MATHEMATICS,
  ADDITIONAL_MATHEMATICS,
  FIRST_LANGUAGE_ENGLISH,
  ENGLISH_SECOND_LANGUAGE,
  LITERATURE_IN_ENGLISH,
  ACCOUNTING,
  BUSINESS_STUDIES,
];
