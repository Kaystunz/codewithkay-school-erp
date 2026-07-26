import type {
  Assignment,
  AssignmentSubmission,
} from "../types/assignment";

export const initialAssignments: Assignment[] = [
  {
    id: 1,
    title: "Fractions Practice",
    description:
      "Complete the fraction exercises given in class.",
    classId: 1,
    teacherId: 1,
    subject: "Mathematics",
    assignedDate: "2026-07-20",
    dueDate: "2026-07-27",
    totalMarks: 20,
    status: "Published",
  },
  {
    id: 2,
    title: "Computer Hardware",
    description:
      "List five input devices and five output devices.",
    classId: 2,
    teacherId: 2,
    subject: "ICT",
    assignedDate: "2026-07-22",
    dueDate: "2026-07-29",
    totalMarks: 20,
    status: "Published",
  },
  {
    id: 3,
    title: "Creative Writing",
    description:
      "Write a short story about your favourite school day.",
    classId: 3,
    teacherId: 3,
    subject: "English Language",
    assignedDate: "2026-07-23",
    dueDate: "2026-07-30",
    totalMarks: 30,
    status: "Draft",
  },
];

export const initialSubmissions: AssignmentSubmission[] = [
  {
    id: 1,
    assignmentId: 1,
    studentId: 1,
    submittedDate: "2026-07-25",
    submissionText:
      "Completed all the fraction exercises.",
    status: "Graded",
    score: 18,
    feedback: "Excellent work.",
  },
  {
    id: 2,
    assignmentId: 2,
    studentId: 2,
    submittedDate: "2026-07-25",
    submissionText:
      "Keyboard, mouse, microphone, scanner and webcam are input devices.",
    status: "Submitted",
    score: null,
    feedback: "",
  },
];