import { useMemo, useState } from "react";
import { initialTeachers } from "../data/teachers";
import type {
  Teacher,
  TeacherFormData,
} from "../types/teacher";

const emptyTeacherForm: TeacherFormData = {
  name: "",
  staffId: "",
  department: "",
  subject: "",
  gender: "Male",
  phone: "",
  email: "",
  qualification: "",
  employmentDate: "",
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

export function useTeachers() {
  const [teachers, setTeachers] =
    useState<Teacher[]>(initialTeachers);

  const [searchTerm, setSearchTerm] = useState("");

  const [departmentFilter, setDepartmentFilter] =
    useState("All departments");

  const [statusFilter, setStatusFilter] =
    useState("All statuses");

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [editingTeacherId, setEditingTeacherId] =
    useState<number | null>(null);

  const [formData, setFormData] =
    useState<TeacherFormData>(emptyTeacherForm);

  const isEditing = editingTeacherId !== null;

  const filteredTeachers = useMemo(() => {
    return teachers.filter((teacher) => {
      const normalizedSearch =
        searchTerm.toLowerCase();

      const matchesSearch =
        teacher.name
          .toLowerCase()
          .includes(normalizedSearch) ||
        teacher.staffId
          .toLowerCase()
          .includes(normalizedSearch) ||
        teacher.subject
          .toLowerCase()
          .includes(normalizedSearch) ||
        teacher.email
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesDepartment =
        departmentFilter === "All departments" ||
        teacher.department === departmentFilter;

      const matchesStatus =
        statusFilter === "All statuses" ||
        teacher.status === statusFilter;

      return (
        matchesSearch &&
        matchesDepartment &&
        matchesStatus
      );
    });
  }, [
    teachers,
    searchTerm,
    departmentFilter,
    statusFilter,
  ]);

  const activeTeachers = teachers.filter(
    (teacher) => teacher.status === "Active"
  ).length;

  const inactiveTeachers = teachers.filter(
    (teacher) => teacher.status === "Inactive"
  ).length;

  const teachersOnLeave = teachers.filter(
    (teacher) => teacher.status === "On Leave"
  ).length;

  function startEditing(teacher: Teacher) {
    setEditingTeacherId(teacher.id);

    setFormData({
      name: teacher.name,
      staffId: teacher.staffId,
      department: teacher.department,
      subject: teacher.subject,
      gender: teacher.gender,
      phone: teacher.phone,
      email: teacher.email,
      qualification: teacher.qualification,
      employmentDate: teacher.employmentDate,
      status: teacher.status,
    });

    setIsModalOpen(true);
  }

  function deleteTeacher(teacherId: number) {
    setTeachers((currentTeachers) =>
      currentTeachers.filter(
        (teacher) => teacher.id !== teacherId
      )
    );
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): SubmitResult {
    event.preventDefault();

    const trimmedName = formData.name.trim();
    const trimmedStaffId = formData.staffId.trim();
    const trimmedDepartment =
      formData.department.trim();
    const trimmedSubject = formData.subject.trim();
    const trimmedPhone = formData.phone.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedQualification =
      formData.qualification.trim();

    if (!trimmedName) {
      return {
        success: false,
        message: "Teacher name is required.",
      };
    }

    if (!trimmedStaffId) {
      return {
        success: false,
        message: "Staff ID is required.",
      };
    }

    if (!trimmedDepartment) {
      return {
        success: false,
        message: "Department is required.",
      };
    }

    if (!trimmedSubject) {
      return {
        success: false,
        message: "Subject is required.",
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
        message: "Please enter a valid email address.",
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
        message: "Please enter a valid phone number.",
      };
    }

    const staffIdExists = teachers.some(
      (teacher) =>
        teacher.staffId.toLowerCase() ===
          trimmedStaffId.toLowerCase() &&
        teacher.id !== editingTeacherId
    );

    if (staffIdExists) {
      return {
        success: false,
        message:
          "A teacher with this staff ID already exists.",
      };
    }

    const cleanedFormData: TeacherFormData = {
      ...formData,
      name: trimmedName,
      staffId: trimmedStaffId,
      department: trimmedDepartment,
      subject: trimmedSubject,
      phone: trimmedPhone,
      email: trimmedEmail,
      qualification: trimmedQualification,
    };

    if (isEditing) {
      setTeachers((currentTeachers) =>
        currentTeachers.map((teacher) =>
          teacher.id === editingTeacherId
            ? {
                ...teacher,
                ...cleanedFormData,
              }
            : teacher
        )
      );
    } else {
      const newTeacher: Teacher = {
        id: Date.now(),
        ...cleanedFormData,
      };

      setTeachers((currentTeachers) => [
        newTeacher,
        ...currentTeachers,
      ]);
    }

    const action = isEditing
      ? "updated"
      : "added";

    setFormData(emptyTeacherForm);
    setEditingTeacherId(null);
    setIsModalOpen(false);

    return {
      success: true,
      action,
    };
  }

  return {
    teachers,
    filteredTeachers,

    activeTeachers,
    inactiveTeachers,
    teachersOnLeave,

    searchTerm,
    setSearchTerm,

    departmentFilter,
    setDepartmentFilter,

    statusFilter,
    setStatusFilter,

    isModalOpen,
    setIsModalOpen,

    formData,
    setFormData,

    handleSubmit,

    editingTeacherId,
    setEditingTeacherId,
    isEditing,
    startEditing,
    deleteTeacher,
  };
}