import type { Grade, Subject, Semester } from './types';

const gradeToPoint: Record<Grade, number> = {
  O: 10,
  'A+': 9,
  A: 8,
  'B+': 7,
  B: 6,
  U: 0,
};

export function calculateGPA(subjects: Subject[]): { gpa: number; credits: number } {
  let totalCredits = 0;
  let weightedPoints = 0;

  for (const subject of subjects) {
    if (subject.grade && subject.grade in gradeToPoint) {
      const points = gradeToPoint[subject.grade];
      totalCredits += subject.credit;
      weightedPoints += subject.credit * points;
    }
  }

  const gpa = totalCredits > 0 ? weightedPoints / totalCredits : 0;
  return { gpa, credits: totalCredits };
}

export function calculateCGPA(sems: Record<string, Semester>): number {
  let totalCredits = 0;
  let totalPoints = 0;

  for (const sem of Object.values(sems)) {
    if (!sem.enabled) continue;
    totalCredits += sem.credits;
    totalPoints += sem.credits * sem.gpa;
  }

  return totalCredits > 0 ? totalPoints / totalCredits : 0;
}

export function calculateEarnedCredits(sems: Record<string, Semester>): number {
  let credits = 0;
  for (const sem of Object.values(sems)) {
    if (!sem.enabled) continue;
    credits += sem.credits;
  }
  return credits;
}
