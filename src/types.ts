export type Grade = "O" | "A+" | "A" | "B+" | "B" | "U";

export interface Subject {
  sub_name: string;
  category: string;
  credit: number;
  grade: Grade | null;
}

export interface Semester {
  enabled: boolean;
  sem_no: number;
  subject_count: number;
  gpa: number;
  credits: number;
  subjects: Subject[];
}

export interface StudentData {
  reg_no: string | null;
  cgpa: number;
  credits: number;
  overall_credits: number;
  sems: Record<string, Semester>;
}
