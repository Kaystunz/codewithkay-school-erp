export type ReportPeriod =
  | "This Term"
  | "This Session"
  | "All Time";

export type ReportSummary = {
  totalStudents: number;

  attendanceRate: number;

  averageScore: number;

  totalFeesExpected: number;
  totalFeesCollected: number;
  totalFeesOutstanding: number;

  assignmentCompletionRate: number;
};

export type ClassPerformance = {
  classId: number;
  averageScore: number;
  attendanceRate: number;
  studentCount: number;
};

export type FeeReport = {
  expected: number;
  collected: number;
  outstanding: number;
  collectionRate: number;
};

export type AttendanceReport = {
  present: number;
  absent: number;
  late: number;
  excused: number;
  attendanceRate: number;
};

export type AcademicReport = {
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  totalResults: number;
};

export type AssignmentReport = {
  totalAssignments: number;
  totalSubmissions: number;
  gradedSubmissions: number;
  completionRate: number;
};