import { useMemo, useState } from "react";
import { initialResults } from "../data/results";
import type {
  ResultFormData,
  ResultRecord,
} from "../types/result";
import { calculateGrade } from "../utils/grading";
import { useActivityContext } from "../../activity/hooks/useActivityContext";
import { activityEvents } from "../../activity/utils/activityEvents";

const emptyResultForm: ResultFormData = {
  studentId: 0,
  classId: 0,
  subject: "",
  academicSession: "2026/2027",
  term: "First Term",
  caScore: 0,
  examScore: 0,
  status: "Draft",
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

export function useResults() {
  const { addActivity } = useActivityContext();

  const [results, setResults] =
    useState<ResultRecord[]>(initialResults);

  const [searchTerm, setSearchTerm] = useState("");

  const [classFilter, setClassFilter] =
    useState("All classes");

  const [termFilter, setTermFilter] =
    useState("All terms");

  const [sessionFilter, setSessionFilter] =
    useState("All sessions");

  const [statusFilter, setStatusFilter] =
    useState("All statuses");

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [editingResultId, setEditingResultId] =
    useState<number | null>(null);

  const [formData, setFormData] =
    useState<ResultFormData>(emptyResultForm);

  const isEditing = editingResultId !== null;

  const filteredResults = useMemo(() => {
    return results.filter((result) => {
      const normalizedSearch =
        searchTerm.toLowerCase();

      const matchesSearch =
        result.subject
          .toLowerCase()
          .includes(normalizedSearch) ||
        result.grade
          .toLowerCase()
          .includes(normalizedSearch) ||
        result.remark
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesClass =
        classFilter === "All classes" ||
        result.classId === Number(classFilter);

      const matchesTerm =
        termFilter === "All terms" ||
        result.term === termFilter;

      const matchesSession =
        sessionFilter === "All sessions" ||
        result.academicSession === sessionFilter;

      const matchesStatus =
        statusFilter === "All statuses" ||
        result.status === statusFilter;

      return (
        matchesSearch &&
        matchesClass &&
        matchesTerm &&
        matchesSession &&
        matchesStatus
      );
    });
  }, [
    results,
    searchTerm,
    classFilter,
    termFilter,
    sessionFilter,
    statusFilter,
  ]);

  const publishedResults = results.filter(
    (result) => result.status === "Published"
  ).length;

  const draftResults = results.filter(
    (result) => result.status === "Draft"
  ).length;

  const averageScore =
    results.length > 0
      ? Math.round(
          results.reduce(
            (total, result) =>
              total + result.totalScore,
            0
          ) / results.length
        )
      : 0;

  const passCount = results.filter(
    (result) => result.totalScore >= 40
  ).length;

  const passRate =
    results.length > 0
      ? Math.round(
          (passCount / results.length) * 100
        )
      : 0;

  function startEditing(result: ResultRecord) {
    setEditingResultId(result.id);

    setFormData({
      studentId: result.studentId,
      classId: result.classId,
      subject: result.subject,
      academicSession: result.academicSession,
      term: result.term,
      caScore: result.caScore,
      examScore: result.examScore,
      status: result.status,
    });

    setIsModalOpen(true);
  }

  function deleteResult(resultId: number) {
  const resultToDelete = results.find(
    (result) => result.id === resultId
  );

  if (!resultToDelete) {
    return;
  }

  setResults((currentResults) =>
    currentResults.filter(
      (result) => result.id !== resultId
    )
  );

  addActivity(
    activityEvents.resultDeleted({
      studentId: resultToDelete.studentId,
      subject: resultToDelete.subject,
      totalScore: resultToDelete.totalScore,
      grade: resultToDelete.grade,
      status: resultToDelete.status,
    })
  );
}
  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): SubmitResult {
    event.preventDefault();

    const trimmedSubject =
      formData.subject.trim();

    const trimmedSession =
      formData.academicSession.trim();

    const trimmedTerm =
      formData.term.trim();

    if (!formData.studentId) {
      return {
        success: false,
        message: "Please select a student.",
      };
    }

    if (!formData.classId) {
      return {
        success: false,
        message: "Please select a class.",
      };
    }

    if (!trimmedSubject) {
      return {
        success: false,
        message: "Subject is required.",
      };
    }

    if (!trimmedSession) {
      return {
        success: false,
        message:
          "Academic session is required.",
      };
    }

    if (!trimmedTerm) {
      return {
        success: false,
        message: "Term is required.",
      };
    }

    if (
      formData.caScore < 0 ||
      formData.caScore > 40
    ) {
      return {
        success: false,
        message:
          "CA score must be between 0 and 40.",
      };
    }

    if (
      formData.examScore < 0 ||
      formData.examScore > 60
    ) {
      return {
        success: false,
        message:
          "Exam score must be between 0 and 60.",
      };
    }

    const duplicateResult = results.some(
      (result) =>
        result.studentId ===
          formData.studentId &&
        result.classId === formData.classId &&
        result.subject.toLowerCase() ===
          trimmedSubject.toLowerCase() &&
        result.academicSession.toLowerCase() ===
          trimmedSession.toLowerCase() &&
        result.term.toLowerCase() ===
          trimmedTerm.toLowerCase() &&
        result.id !== editingResultId
    );

    if (duplicateResult) {
      return {
        success: false,
        message:
          "A result already exists for this student, subject, term and session.",
      };
    }

    const totalScore =
      formData.caScore + formData.examScore;

    const { grade, remark } =
      calculateGrade(totalScore);

    const cleanedFormData = {
      ...formData,
      subject: trimmedSubject,
      academicSession: trimmedSession,
      term: trimmedTerm,
    };

    if (isEditing && editingResultId !== null) {
  setResults((currentResults) =>
    currentResults.map((result) =>
      result.id === editingResultId
        ? {
            ...result,
            ...cleanedFormData,
            totalScore,
            grade,
            remark,
          }
        : result
    )
  );

  addActivity(
    activityEvents.resultUpdated({
      studentId: cleanedFormData.studentId,
      subject: cleanedFormData.subject,
      totalScore,
      grade,
      status: cleanedFormData.status,
    })
  );
} else {
  const newResult: ResultRecord = {
    id: Date.now(),
    ...cleanedFormData,
    totalScore,
    grade,
    remark,
  };

  setResults((currentResults) => [
    newResult,
    ...currentResults,
  ]);

  addActivity(
    activityEvents.resultAdded({
      studentId: newResult.studentId,
      subject: newResult.subject,
      totalScore: newResult.totalScore,
      grade: newResult.grade,
      status: newResult.status,
    })
  );
}

    const action = isEditing
      ? "updated"
      : "added";

    setFormData(emptyResultForm);
    setEditingResultId(null);
    setIsModalOpen(false);

    return {
      success: true,
      action,
    };
  }

  return {
    results,
    filteredResults,

    publishedResults,
    draftResults,
    averageScore,
    passRate,

    searchTerm,
    setSearchTerm,

    classFilter,
    setClassFilter,

    termFilter,
    setTermFilter,

    sessionFilter,
    setSessionFilter,

    statusFilter,
    setStatusFilter,

    isModalOpen,
    setIsModalOpen,

    formData,
    setFormData,

    handleSubmit,

    editingResultId,
    setEditingResultId,
    isEditing,
    startEditing,
    deleteResult,
  };
}