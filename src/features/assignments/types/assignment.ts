export type AssignmentStatus =
  | "Draft"
  | "Published"
  | "Closed";

export type SubmissionStatus =
  | "Not Submitted"
  | "Submitted"
  | "Late"
  | "Graded";

export type Assignment = {
  id: number;

  title: string;
  description: string;

  classId: number;
  teacherId: number | null;

  subject: string;

  assignedDate: string;
  dueDate: string;

  totalMarks: number;

  status: AssignmentStatus;
};

export type AssignmentSubmission = {
  id: number;

  assignmentId: number;
  studentId: number;

  submittedDate: string;

  submissionText: string;

  status: SubmissionStatus;

  score: number | null;
  feedback: string;
};

export type AssignmentFormData = Omit<
  Assignment,
  "id"
>;

export type SubmissionFormData = Omit<
  AssignmentSubmission,
  "id"
>;