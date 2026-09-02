export type BulletGroup = {
  subTitle?: string;
  bullets: string[];
};

export type SubHeading = {
  title: string;
  body: string;
  groups: BulletGroup[];
};

export type Chapter = {
  number: number;
  title: string;
  intro: string;
  subheadings: SubHeading[];
};

export type SubjectNotes = {
  id: string;
  name: string;
  code: string;
  color: string;
  chapters: Chapter[];
};
