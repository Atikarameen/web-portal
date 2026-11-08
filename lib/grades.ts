import type { Assessment, Course } from "./data";

export type Grade = "A" | "A-" | "B+" | "B" | "B-" | "C+" | "C" | "D" | "F" | "—";

const GRADE_POINTS: Record<Grade, number> = {
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  D: 1.0,
  F: 0,
  "—": 0,
};

export function letterGrade(percent: number | null): Grade {
  if (percent === null) return "—";
  if (percent >= 90) return "A";
  if (percent >= 85) return "A-";
  if (percent >= 80) return "B+";
  if (percent >= 75) return "B";
  if (percent >= 70) return "B-";
  if (percent >= 65) return "C+";
  if (percent >= 60) return "C";
  if (percent >= 50) return "D";
  return "F";
}

export function gradePoint(grade: Grade): number {
  return GRADE_POINTS[grade];
}

/** Percentage of points earned across every graded item in a course. */
export function coursePercent(courseCode: string, items: Assessment[]): number | null {
  const graded = items.filter(
    (a) => a.courseCode === courseCode && a.score !== null,
  );
  if (graded.length === 0) return null;

  const earned = graded.reduce((sum, a) => sum + (a.score ?? 0), 0);
  const possible = graded.reduce((sum, a) => sum + a.max, 0);
  return possible === 0 ? null : (earned / possible) * 100;
}

export type CourseSummary = {
  course: Course;
  percent: number | null;
  grade: Grade;
  gradedCount: number;
  totalCount: number;
};

export function summarise(courseList: Course[], items: Assessment[]): CourseSummary[] {
  return courseList.map((course) => {
    const percent = coursePercent(course.code, items);
    const courseItems = items.filter((a) => a.courseCode === course.code);
    return {
      course,
      percent,
      grade: letterGrade(percent),
      gradedCount: courseItems.filter((a) => a.score !== null).length,
      totalCount: courseItems.length,
    };
  });
}

/** Credit-weighted GPA over the courses that already have graded work. */
export function gpa(summaries: CourseSummary[]): number | null {
  const counted = summaries.filter((s) => s.percent !== null);
  if (counted.length === 0) return null;

  const credits = counted.reduce((sum, s) => sum + s.course.credits, 0);
  const points = counted.reduce(
    (sum, s) => sum + gradePoint(s.grade) * s.course.credits,
    0,
  );
  return points / credits;
}

export function overallPercent(items: Assessment[]): number | null {
  const graded = items.filter((a) => a.score !== null);
  if (graded.length === 0) return null;

  const earned = graded.reduce((sum, a) => sum + (a.score ?? 0), 0);
  const possible = graded.reduce((sum, a) => sum + a.max, 0);
  return possible === 0 ? null : (earned / possible) * 100;
}

export function formatPercent(value: number | null, digits = 1): string {
  return value === null ? "—" : `${value.toFixed(digits)}%`;
}
