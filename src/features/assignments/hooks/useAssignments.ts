import { useMemo, useState } from "react";

import {
  initialAssignments,
  initialSubmissions,
} from "../data/assignments";

import type {
  Assignment,
  AssignmentFormData,
  AssignmentSubmission,
  SubmissionFormData,
} from "../types/assignment";

const emptyAssignmentForm: AssignmentFormData = {
  title: "",
  description: "",
  classId: 0,
  teacherId: null,
  subject: "",
  assignedDate: "",
  dueDate: "",
  totalMarks: 20,
  status: "Draft",
};

const emptySubmissionForm: SubmissionFormData = {
  assignmentId: 0,
  studentId: 0,
  submittedDate: "",
  submissionText: "",
  status: "Not Submitted",
  score: null,
  feedback: "",
};

type SubmitResult =
  | {
      success: true;
      action: "added" | "updated";
    }
  | {
      success: false;
      message: string;
    };

type GradeResult =
  | {
      success: true;
    }
  | {
      success: false;
      message: string;
    };

export function useAssignments() {
  const [assignments, setAssignments] =
    useState<Assignment[]>(initialAssignments);

  const [submissions, setSubmissions] =
    useState<AssignmentSubmission[]>(
      initialSubmissions
    );

  const [searchTerm, setSearchTerm] = useState("");

  const [classFilter, setClassFilter] =
    useState("All classes");

  const [statusFilter, setStatusFilter] =
    useState("All statuses");

  const [isAssignmentModalOpen, setIsAssignmentModalOpen] =
    useState(false);

  const [editingAssignmentId, setEditingAssignmentId] =
    useState<number | null>(null);

  const [assignmentFormData, setAssignmentFormData] =
    useState<AssignmentFormData>(emptyAssignmentForm);

  const [submissionFormData, setSubmissionFormData] =
    useState<SubmissionFormData>(emptySubmissionForm);

  const isEditingAssignment =
    editingAssignmentId !== null;

  const filteredAssignments = useMemo(() => {
    return assignments.filter((assignment) => {
      const normalizedSearch =
        searchTerm.toLowerCase();

      const matchesSearch =
        assignment.title
          .toLowerCase()
          .includes(normalizedSearch) ||
        assignment.subject
          .toLowerCase()
          .includes(normalizedSearch) ||
        assignment.description
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesClass =
        classFilter === "All classes" ||
        assignment.classId === Number(classFilter);

      const matchesStatus =
        statusFilter === "All statuses" ||
        assignment.status === statusFilter;

      return (
        matchesSearch &&
        matchesClass &&
        matchesStatus
      );
    });
  }, [
    assignments,
    searchTerm,
    classFilter,
    statusFilter,
  ]);

  const publishedAssignments = assignments.filter(
    (assignment) =>
      assignment.status === "Published"
  ).length;

  const draftAssignments = assignments.filter(
    (assignment) =>
      assignment.status === "Draft"
  ).length;

  const closedAssignments = assignments.filter(
    (assignment) =>
      assignment.status === "Closed"
  ).length;

  const gradedSubmissions = submissions.filter(
    (submission) =>
      submission.status === "Graded"
  ).length;

  function startEditingAssignment(
    assignment: Assignment
  ) {
    setEditingAssignmentId(assignment.id);

    setAssignmentFormData({
      title: assignment.title,
      description: assignment.description,
      classId: assignment.classId,
      teacherId: assignment.teacherId,
      subject: assignment.subject,
      assignedDate: assignment.assignedDate,
      dueDate: assignment.dueDate,
      totalMarks: assignment.totalMarks,
      status: assignment.status,
    });

    setIsAssignmentModalOpen(true);
  }

  function openAddAssignmentModal() {
    setEditingAssignmentId(null);
    setAssignmentFormData(emptyAssignmentForm);
    setIsAssignmentModalOpen(true);
  }

  function closeAssignmentModal() {
    setEditingAssignmentId(null);
    setAssignmentFormData(emptyAssignmentForm);
    setIsAssignmentModalOpen(false);
  }

  function deleteAssignment(
    assignmentId: number
  ) {
    setAssignments((currentAssignments) =>
      currentAssignments.filter(
        (assignment) =>
          assignment.id !== assignmentId
      )
    );

    setSubmissions((currentSubmissions) =>
      currentSubmissions.filter(
        (submission) =>
          submission.assignmentId !== assignmentId
      )
    );
  }

  function handleAssignmentSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): SubmitResult {
    event.preventDefault();

    const title =
      assignmentFormData.title.trim();

    const description =
      assignmentFormData.description.trim();

    const subject =
      assignmentFormData.subject.trim();

    if (!title) {
      return {
        success: false,
        message: "Assignment title is required.",
      };
    }

    if (!assignmentFormData.classId) {
      return {
        success: false,
        message: "Please select a class.",
      };
    }

    if (!assignmentFormData.teacherId) {
      return {
        success: false,
        message: "Please select a teacher.",
      };
    }

    if (!subject) {
      return {
        success: false,
        message: "Please select a subject.",
      };
    }

    if (!assignmentFormData.assignedDate) {
      return {
        success: false,
        message: "Assigned date is required.",
      };
    }

    if (!assignmentFormData.dueDate) {
      return {
        success: false,
        message: "Due date is required.",
      };
    }

    if (
      assignmentFormData.dueDate <
      assignmentFormData.assignedDate
    ) {
      return {
        success: false,
        message:
          "Due date cannot be earlier than assigned date.",
      };
    }

    if (assignmentFormData.totalMarks <= 0) {
      return {
        success: false,
        message:
          "Total marks must be greater than zero.",
      };
    }

    const cleanedFormData: AssignmentFormData = {
      ...assignmentFormData,
      title,
      description,
      subject,
    };

    if (isEditingAssignment) {
      setAssignments((currentAssignments) =>
        currentAssignments.map((assignment) =>
          assignment.id ===
          editingAssignmentId
            ? {
                ...assignment,
                ...cleanedFormData,
              }
            : assignment
        )
      );
    } else {
      const newAssignment: Assignment = {
        id: Date.now(),
        ...cleanedFormData,
      };

      setAssignments((currentAssignments) => [
        newAssignment,
        ...currentAssignments,
      ]);
    }

    const action = isEditingAssignment
      ? "updated"
      : "added";

    closeAssignmentModal();

    return {
      success: true,
      action,
    };
  }

  function startSubmission(
    assignmentId: number,
    studentId: number
  ) {
    const existingSubmission =
      submissions.find(
        (submission) =>
          submission.assignmentId ===
            assignmentId &&
          submission.studentId === studentId
      );

    setSubmissionFormData(
      existingSubmission
        ? {
            assignmentId:
              existingSubmission.assignmentId,
            studentId:
              existingSubmission.studentId,
            submittedDate:
              existingSubmission.submittedDate,
            submissionText:
              existingSubmission.submissionText,
            status: existingSubmission.status,
            score: existingSubmission.score,
            feedback:
              existingSubmission.feedback,
          }
        : {
            ...emptySubmissionForm,
            assignmentId,
            studentId,
          }
    );
  }

  function saveSubmission() {
    const existingSubmission =
      submissions.find(
        (submission) =>
          submission.assignmentId ===
            submissionFormData.assignmentId &&
          submission.studentId ===
            submissionFormData.studentId
      );

    if (existingSubmission) {
      setSubmissions((currentSubmissions) =>
        currentSubmissions.map((submission) =>
          submission.id ===
          existingSubmission.id
            ? {
                ...submission,
                ...submissionFormData,
              }
            : submission
        )
      );

      return;
    }

    const newSubmission: AssignmentSubmission = {
      id: Date.now(),
      ...submissionFormData,
    };

    setSubmissions((currentSubmissions) => [
      newSubmission,
      ...currentSubmissions,
    ]);
  }

  function gradeSubmission(
    submissionId: number,
    score: number,
    feedback: string
  ): GradeResult {
    const submission = submissions.find(
      (item) => item.id === submissionId
    );

    if (!submission) {
      return {
        success: false,
        message: "Submission not found.",
      };
    }

    const assignment = assignments.find(
      (item) =>
        item.id === submission.assignmentId
    );

    if (!assignment) {
      return {
        success: false,
        message: "Assignment not found.",
      };
    }

    if (
      score < 0 ||
      score > assignment.totalMarks
    ) {
      return {
        success: false,
        message: `Score must be between 0 and ${assignment.totalMarks}.`,
      };
    }

    setSubmissions((currentSubmissions) =>
      currentSubmissions.map((item) =>
        item.id === submissionId
          ? {
              ...item,
              score,
              feedback: feedback.trim(),
              status: "Graded",
            }
          : item
      )
    );

    return {
      success: true,
    };
  }

  return {
    assignments,
    submissions,
    filteredAssignments,

    publishedAssignments,
    draftAssignments,
    closedAssignments,
    gradedSubmissions,

    searchTerm,
    setSearchTerm,

    classFilter,
    setClassFilter,

    statusFilter,
    setStatusFilter,

    isAssignmentModalOpen,

    assignmentFormData,
    setAssignmentFormData,

    submissionFormData,
    setSubmissionFormData,

    isEditingAssignment,

    openAddAssignmentModal,
    closeAssignmentModal,
    startEditingAssignment,
    deleteAssignment,
    handleAssignmentSubmit,

    startSubmission,
    saveSubmission,
    gradeSubmission,
  };
}