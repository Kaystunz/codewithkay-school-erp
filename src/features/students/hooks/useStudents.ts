import { useMemo, useState } from "react";
import { initialStudents } from "../data/students";
import type {
  Student,
  StudentFormData,
} from "../types/student";
import { useActivityContext } from "../../activity/hooks/useActivityContext";
import { activityEvents } from "../../activity/utils/activityEvents";
const emptyStudentForm: StudentFormData = {
  name: "",
  admissionNumber: "",
  className: "Year 1",
  gender: "Male",
  parentName: "",
  phone: "",
  email: "",
  status: "Active",
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

export function useStudents() {
  const { addActivity } = useActivityContext();
  const [students, setStudents] =
    useState<Student[]>(initialStudents);

  const [searchTerm, setSearchTerm] = useState("");

  const [classFilter, setClassFilter] =
    useState("All classes");

  const [statusFilter, setStatusFilter] =
    useState("All statuses");

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [editingStudentId, setEditingStudentId] =
    useState<number | null>(null);

  const [formData, setFormData] =
    useState<StudentFormData>(emptyStudentForm);

  const isEditing = editingStudentId !== null;

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const normalizedSearchTerm =
        searchTerm.toLowerCase();

      const matchesSearch =
        student.name
          .toLowerCase()
          .includes(normalizedSearchTerm) ||
        student.admissionNumber
          .toLowerCase()
          .includes(normalizedSearchTerm) ||
        student.parentName
          .toLowerCase()
          .includes(normalizedSearchTerm);

      const matchesClass =
        classFilter === "All classes" ||
        student.className === classFilter;

      const matchesStatus =
        statusFilter === "All statuses" ||
        student.status === statusFilter;

      return (
        matchesSearch &&
        matchesClass &&
        matchesStatus
      );
    });
  }, [
    students,
    searchTerm,
    classFilter,
    statusFilter,
  ]);

  const activeStudents = students.filter(
    (student) => student.status === "Active"
  ).length;

  const inactiveStudents = students.filter(
    (student) => student.status === "Inactive"
  ).length;

  function startEditing(student: Student) {
    setEditingStudentId(student.id);

    setFormData({
      name: student.name,
      admissionNumber: student.admissionNumber,
      className: student.className,
      gender: student.gender,
      parentName: student.parentName,
      phone: student.phone,
      email: student.email,
      status: student.status,
    });

    setIsModalOpen(true);
  }

  function deleteStudent(studentId: number) {
  const studentToDelete = students.find(
    (student) => student.id === studentId
  );

  if (!studentToDelete) {
    return;
  }

  setStudents((currentStudents) =>
    currentStudents.filter(
      (student) => student.id !== studentId
    )
  );

 addActivity(
  activityEvents.studentDeleted(studentToDelete)
);
}

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): SubmitResult {
    event.preventDefault();

    const trimmedName = formData.name.trim();
    const trimmedAdmissionNumber =
      formData.admissionNumber.trim();
    const trimmedParentName =
      formData.parentName.trim();
    const trimmedPhone = formData.phone.trim();
    const trimmedEmail = formData.email.trim();

    if (!trimmedName) {
      return {
        success: false,
        message: "Student name is required.",
      };
    }

    if (!trimmedAdmissionNumber) {
      return {
        success: false,
        message: "Admission number is required.",
      };
    }

    if (!trimmedParentName) {
      return {
        success: false,
        message:
          "Parent or guardian name is required.",
      };
    }

    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      trimmedEmail &&
      !emailPattern.test(trimmedEmail)
    ) {
      return {
        success: false,
        message:
          "Please enter a valid email address.",
      };
    }

    const phonePattern =
      /^[0-9+\-\s()]{7,20}$/;

    if (
      trimmedPhone &&
      !phonePattern.test(trimmedPhone)
    ) {
      return {
        success: false,
        message:
          "Please enter a valid phone number.",
      };
    }

    const admissionNumberExists = students.some(
      (student) =>
        student.admissionNumber.toLowerCase() ===
          trimmedAdmissionNumber.toLowerCase() &&
        student.id !== editingStudentId
    );

    if (admissionNumberExists) {
      return {
        success: false,
        message:
          "A student with this admission number already exists.",
      };
    }

    const cleanedFormData: StudentFormData = {
      ...formData,
      name: trimmedName,
      admissionNumber: trimmedAdmissionNumber,
      parentName: trimmedParentName,
      phone: trimmedPhone,
      email: trimmedEmail,
    };

   if (isEditing && editingStudentId !== null) {
  setStudents((currentStudents) =>
    currentStudents.map((student) =>
      student.id === editingStudentId
        ? {
            ...student,
            ...cleanedFormData,
          }
        : student
    )
  );

  addActivity(
  activityEvents.studentUpdated(cleanedFormData)
);
} else {
  const newStudent: Student = {
    id: Date.now(),
    ...cleanedFormData,
  };

  setStudents((currentStudents) => [
    newStudent,
    ...currentStudents,
  ]);

 addActivity(
  activityEvents.studentAdded(newStudent)
);
}

    const action = isEditing
      ? "updated"
      : "added";

    setFormData(emptyStudentForm);
    setEditingStudentId(null);
    setIsModalOpen(false);

    return {
      success: true,
      action,
    };
  }

  return {
    students,
    filteredStudents,

    activeStudents,
    inactiveStudents,

    searchTerm,
    setSearchTerm,

    classFilter,
    setClassFilter,

    statusFilter,
    setStatusFilter,

    isModalOpen,
    setIsModalOpen,

    formData,
    setFormData,

    handleSubmit,

    editingStudentId,
    setEditingStudentId,
    isEditing,
    startEditing,
    deleteStudent,
  };
}