import { useMemo, useState } from "react";
import { initialClasses } from "../data/classes";
import type {
  ClassFormData,
  SchoolClass,
} from "../types/class";

const emptyClassForm: ClassFormData = {
  name: "",
  section: "A",
  classTeacherId: null,
  studentIds: [],
  subjects: [],
  capacity: 30,
  academicSession: "2026/2027",
  room: "",
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

export function useClasses() {
  const [classes, setClasses] =
    useState<SchoolClass[]>(initialClasses);

  const [searchTerm, setSearchTerm] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All statuses");

  const [sessionFilter, setSessionFilter] =
    useState("All sessions");

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [editingClassId, setEditingClassId] =
    useState<number | null>(null);

  const [formData, setFormData] =
    useState<ClassFormData>(emptyClassForm);

  const isEditing = editingClassId !== null;

  const filteredClasses = useMemo(() => {
    return classes.filter((schoolClass) => {
      const normalizedSearch =
        searchTerm.toLowerCase();

      const matchesSearch =
        schoolClass.name
          .toLowerCase()
          .includes(normalizedSearch) ||
        schoolClass.section
          .toLowerCase()
          .includes(normalizedSearch) ||
        schoolClass.room
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesStatus =
        statusFilter === "All statuses" ||
        schoolClass.status === statusFilter;

      const matchesSession =
        sessionFilter === "All sessions" ||
        schoolClass.academicSession === sessionFilter;

      return (
        matchesSearch &&
        matchesStatus &&
        matchesSession
      );
    });
  }, [
    classes,
    searchTerm,
    statusFilter,
    sessionFilter,
  ]);

  const activeClasses = classes.filter(
    (schoolClass) => schoolClass.status === "Active"
  ).length;

  const inactiveClasses = classes.filter(
    (schoolClass) => schoolClass.status === "Inactive"
  ).length;

  const totalStudents = classes.reduce(
    (total, schoolClass) =>
      total + schoolClass.studentIds.length,
    0
  );

  const totalCapacity = classes.reduce(
    (total, schoolClass) =>
      total + schoolClass.capacity,
    0
  );

  function startEditing(schoolClass: SchoolClass) {
    setEditingClassId(schoolClass.id);

    setFormData({
      name: schoolClass.name,
      section: schoolClass.section,
      classTeacherId: schoolClass.classTeacherId,
      studentIds: schoolClass.studentIds,
      subjects: schoolClass.subjects,
      capacity: schoolClass.capacity,
      academicSession: schoolClass.academicSession,
      room: schoolClass.room,
      status: schoolClass.status,
    });

    setIsModalOpen(true);
  }

  function deleteClass(classId: number) {
    setClasses((currentClasses) =>
      currentClasses.filter(
        (schoolClass) =>
          schoolClass.id !== classId
      )
    );
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): SubmitResult {
    event.preventDefault();

    const trimmedName = formData.name.trim();
    const trimmedSection = formData.section.trim();
    const trimmedSession =
      formData.academicSession.trim();
    const trimmedRoom = formData.room.trim();

    if (!trimmedName) {
      return {
        success: false,
        message: "Class name is required.",
      };
    }

    if (!trimmedSection) {
      return {
        success: false,
        message: "Class section is required.",
      };
    }

    if (!trimmedSession) {
      return {
        success: false,
        message: "Academic session is required.",
      };
    }

    if (formData.capacity <= 0) {
      return {
        success: false,
        message:
          "Class capacity must be greater than zero.",
      };
    }

    if (
      formData.studentIds.length >
      formData.capacity
    ) {
      return {
        success: false,
        message:
          "The number of assigned students cannot exceed class capacity.",
      };
    }

    const classAlreadyExists = classes.some(
      (schoolClass) =>
        schoolClass.name.toLowerCase() ===
          trimmedName.toLowerCase() &&
        schoolClass.section.toLowerCase() ===
          trimmedSection.toLowerCase() &&
        schoolClass.academicSession.toLowerCase() ===
          trimmedSession.toLowerCase() &&
        schoolClass.id !== editingClassId
    );

    if (classAlreadyExists) {
      return {
        success: false,
        message:
          "This class and section already exists for the selected academic session.",
      };
    }

    const cleanedFormData: ClassFormData = {
      ...formData,
      name: trimmedName,
      section: trimmedSection,
      academicSession: trimmedSession,
      room: trimmedRoom,
    };

    if (isEditing) {
      setClasses((currentClasses) =>
        currentClasses.map((schoolClass) =>
          schoolClass.id === editingClassId
            ? {
                ...schoolClass,
                ...cleanedFormData,
              }
            : schoolClass
        )
      );
    } else {
      const newClass: SchoolClass = {
        id: Date.now(),
        ...cleanedFormData,
      };

      setClasses((currentClasses) => [
        newClass,
        ...currentClasses,
      ]);
    }

    const action = isEditing
      ? "updated"
      : "added";

    setFormData(emptyClassForm);
    setEditingClassId(null);
    setIsModalOpen(false);

    return {
      success: true,
      action,
    };
  }

  return {
    classes,
    filteredClasses,

    activeClasses,
    inactiveClasses,
    totalStudents,
    totalCapacity,

    searchTerm,
    setSearchTerm,

    statusFilter,
    setStatusFilter,

    sessionFilter,
    setSessionFilter,

    isModalOpen,
    setIsModalOpen,

    formData,
    setFormData,

    handleSubmit,

    editingClassId,
    setEditingClassId,
    isEditing,
    startEditing,
    deleteClass,
  };
}