import { useMemo, useState } from "react";
import { initialStudents } from "../data/students";
import type {
  Student,
  StudentFormData,
} from "../types/student";

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

export function useStudents() {
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

  const isEditing = editingStudentId !== null;

  const [formData, setFormData] =
    useState<StudentFormData>(emptyStudentForm);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        student.admissionNumber
          .toLowerCase()
          .includes(searchTerm.toLowerCase()) ||
        student.parentName
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

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
  setStudents((currentStudents) =>
    currentStudents.filter(
      (student) => student.id !== studentId
    )
  );
}

 function handleSubmit(
  event: React.FormEvent<HTMLFormElement>
) {
  event.preventDefault();

  if (isEditing) {
    setStudents((currentStudents) =>
      currentStudents.map((student) =>
        student.id === editingStudentId
          ? {
              ...student,
              ...formData,
            }
          : student
      )
    );
  } else {
    const newStudent: Student = {
      id: Date.now(),
      ...formData,
    };

    setStudents((currentStudents) => [
      newStudent,
      ...currentStudents,
    ]);
  }

  setFormData(emptyStudentForm);
  setEditingStudentId(null);
  setIsModalOpen(false);
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