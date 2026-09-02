// Syllabus Notes — full document-style notes matching Cambridge IGCSE syllabus
// Re-exports all subjects from modular note collections

export * from "./notes/types";
import { BIOLOGY } from "./notes/biology";
import { CHEMISTRY } from "./notes/chemistry";
import { PHYSICS } from "./notes/physics";
import { ENVIRONMENTAL_MANAGEMENT } from "./notes/environmental-management";
import { MATHEMATICS } from "./notes/mathematics";
import { ADDITIONAL_MATHEMATICS } from "./notes/additional-mathematics";
import type { SubjectNotes } from "./notes/types";

export {
  BIOLOGY,
  CHEMISTRY,
  PHYSICS,
  ENVIRONMENTAL_MANAGEMENT,
  MATHEMATICS,
  ADDITIONAL_MATHEMATICS
};

export const SYLLABUS_NOTES: SubjectNotes[] = [
  BIOLOGY,
  CHEMISTRY,
  PHYSICS,
  ENVIRONMENTAL_MANAGEMENT,
  MATHEMATICS,
  ADDITIONAL_MATHEMATICS,
];
