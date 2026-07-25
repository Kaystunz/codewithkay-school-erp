import { useMemo, useState } from "react";
import { initialParents } from "../data/parents";
import type {
  Parent,
  ParentFormData,
} from "../types/parents";

const emptyParentForm: ParentFormData = {
  name: "",
  relationship: "Father",
  phone: "",
  alternatePhone: "",
  email: "",
  address: "",
  occupation: "",
  studentIds: [],
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

export function useParents() {
  const [parents, setParents] =
    useState<Parent[]>(initialParents);

  const [searchTerm, setSearchTerm] = useState("");

  const [relationshipFilter, setRelationshipFilter] =
    useState("All relationships");

  const [statusFilter, setStatusFilter] =
    useState("All statuses");

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [editingParentId, setEditingParentId] =
    useState<number | null>(null);

  const [formData, setFormData] =
    useState<ParentFormData>(emptyParentForm);

  const isEditing = editingParentId !== null;

  const filteredParents = useMemo(() => {
    return parents.filter((parent) => {
      const normalizedSearch =
        searchTerm.toLowerCase();

      const matchesSearch =
        parent.name
          .toLowerCase()
          .includes(normalizedSearch) ||
        parent.phone
          .toLowerCase()
          .includes(normalizedSearch) ||
        parent.email
          .toLowerCase()
          .includes(normalizedSearch) ||
        parent.occupation
          .toLowerCase()
          .includes(normalizedSearch);

      const matchesRelationship =
        relationshipFilter === "All relationships" ||
        parent.relationship === relationshipFilter;

      const matchesStatus =
        statusFilter === "All statuses" ||
        parent.status === statusFilter;

      return (
        matchesSearch &&
        matchesRelationship &&
        matchesStatus
      );
    });
  }, [
    parents,
    searchTerm,
    relationshipFilter,
    statusFilter,
  ]);

  const activeParents = parents.filter(
    (parent) => parent.status === "Active"
  ).length;

  const inactiveParents = parents.filter(
    (parent) => parent.status === "Inactive"
  ).length;

  const guardians = parents.filter(
    (parent) => parent.relationship === "Guardian"
  ).length;

  function startEditing(parent: Parent) {
    setEditingParentId(parent.id);

    setFormData({
      name: parent.name,
      relationship: parent.relationship,
      phone: parent.phone,
      alternatePhone: parent.alternatePhone,
      email: parent.email,
      address: parent.address,
      occupation: parent.occupation,
      studentIds: parent.studentIds,
      status: parent.status,
    });

    setIsModalOpen(true);
  }

  function deleteParent(parentId: number) {
    setParents((currentParents) =>
      currentParents.filter(
        (parent) => parent.id !== parentId
      )
    );
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): SubmitResult {
    event.preventDefault();

    const trimmedName = formData.name.trim();
    const trimmedPhone = formData.phone.trim();
    const trimmedAlternatePhone =
      formData.alternatePhone.trim();
    const trimmedEmail = formData.email.trim();
    const trimmedAddress = formData.address.trim();
    const trimmedOccupation =
      formData.occupation.trim();

    if (!trimmedName) {
      return {
        success: false,
        message: "Parent or guardian name is required.",
      };
    }

    if (!trimmedPhone) {
      return {
        success: false,
        message: "Phone number is required.",
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

    if (!phonePattern.test(trimmedPhone)) {
      return {
        success: false,
        message: "Please enter a valid phone number.",
      };
    }

    if (
      trimmedAlternatePhone &&
      !phonePattern.test(trimmedAlternatePhone)
    ) {
      return {
        success: false,
        message:
          "Please enter a valid alternate phone number.",
      };
    }

    const cleanedFormData: ParentFormData = {
      ...formData,
      name: trimmedName,
      phone: trimmedPhone,
      alternatePhone: trimmedAlternatePhone,
      email: trimmedEmail,
      address: trimmedAddress,
      occupation: trimmedOccupation,
    };

    if (isEditing) {
      setParents((currentParents) =>
        currentParents.map((parent) =>
          parent.id === editingParentId
            ? {
                ...parent,
                ...cleanedFormData,
              }
            : parent
        )
      );
    } else {
      const newParent: Parent = {
        id: Date.now(),
        ...cleanedFormData,
      };

      setParents((currentParents) => [
        newParent,
        ...currentParents,
      ]);
    }

    const action = isEditing
      ? "updated"
      : "added";

    setFormData(emptyParentForm);
    setEditingParentId(null);
    setIsModalOpen(false);

    return {
      success: true,
      action,
    };
  }

  return {
    parents,
    filteredParents,

    activeParents,
    inactiveParents,
    guardians,

    searchTerm,
    setSearchTerm,

    relationshipFilter,
    setRelationshipFilter,

    statusFilter,
    setStatusFilter,

    isModalOpen,
    setIsModalOpen,

    formData,
    setFormData,

    handleSubmit,

    editingParentId,
    setEditingParentId,
    isEditing,
    startEditing,
    deleteParent,
  };
}