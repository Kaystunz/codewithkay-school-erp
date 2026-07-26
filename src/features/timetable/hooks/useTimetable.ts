import { useMemo, useState } from "react";

import { initialTimetable } from "../data/timetable";

import type {
  TimetableEntry,
  TimetableFormData,
} from "../types/timetable";

const emptyTimetableForm: TimetableFormData = {
  classId: 0,
  teacherId: null,
  subject: "",
  day: "Monday",
  startTime: "",
  endTime: "",
  room: "",
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

export function useTimetable() {
  const [entries, setEntries] =
    useState<TimetableEntry[]>(initialTimetable);

  const [classFilter, setClassFilter] =
    useState("All classes");

  const [dayFilter, setDayFilter] =
    useState("All days");

  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const [editingEntryId, setEditingEntryId] =
    useState<number | null>(null);

  const [formData, setFormData] =
    useState<TimetableFormData>(
      emptyTimetableForm
    );

  const isEditing = editingEntryId !== null;

  const filteredEntries = useMemo(() => {
    return entries
      .filter((entry) => {
        const matchesClass =
          classFilter === "All classes" ||
          entry.classId === Number(classFilter);

        const matchesDay =
          dayFilter === "All days" ||
          entry.day === dayFilter;

        return matchesClass && matchesDay;
      })
      .sort((a, b) =>
        a.startTime.localeCompare(b.startTime)
      );
  }, [entries, classFilter, dayFilter]);

  function startEditing(entry: TimetableEntry) {
    setEditingEntryId(entry.id);

    setFormData({
      classId: entry.classId,
      teacherId: entry.teacherId,
      subject: entry.subject,
      day: entry.day,
      startTime: entry.startTime,
      endTime: entry.endTime,
      room: entry.room,
    });

    setIsModalOpen(true);
  }

  function deleteEntry(entryId: number) {
    setEntries((currentEntries) =>
      currentEntries.filter(
        (entry) => entry.id !== entryId
      )
    );
  }

  function timesOverlap(
    firstStart: string,
    firstEnd: string,
    secondStart: string,
    secondEnd: string
  ) {
    return (
      firstStart < secondEnd &&
      firstEnd > secondStart
    );
  }

  function handleSubmit(
    event: React.FormEvent<HTMLFormElement>
  ): SubmitResult {
    event.preventDefault();

    const subject = formData.subject.trim();
    const room = formData.room.trim();

    if (!formData.classId) {
      return {
        success: false,
        message: "Please select a class.",
      };
    }

    if (!formData.teacherId) {
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

    if (!formData.startTime || !formData.endTime) {
      return {
        success: false,
        message:
          "Start time and end time are required.",
      };
    }

    if (formData.startTime >= formData.endTime) {
      return {
        success: false,
        message:
          "End time must be later than start time.",
      };
    }

    const conflictingEntry = entries.find(
      (entry) => {
        if (entry.id === editingEntryId) {
          return false;
        }

        if (entry.day !== formData.day) {
          return false;
        }

        return timesOverlap(
          formData.startTime,
          formData.endTime,
          entry.startTime,
          entry.endTime
        );
      }
    );

    if (conflictingEntry) {
      const sameClass =
        conflictingEntry.classId ===
        formData.classId;

      const sameTeacher =
        conflictingEntry.teacherId ===
        formData.teacherId;

      const sameRoom =
        room &&
        conflictingEntry.room
          .trim()
          .toLowerCase() ===
          room.toLowerCase();

      if (sameClass) {
        return {
          success: false,
          message:
            "This class already has another lesson during that time.",
        };
      }

      if (sameTeacher) {
        return {
          success: false,
          message:
            "This teacher is already assigned to another class during that time.",
        };
      }

      if (sameRoom) {
        return {
          success: false,
          message:
            "This room is already being used during that time.",
        };
      }
    }

    const cleanedFormData: TimetableFormData = {
      ...formData,
      subject,
      room,
    };

    if (isEditing) {
      setEntries((currentEntries) =>
        currentEntries.map((entry) =>
          entry.id === editingEntryId
            ? {
                ...entry,
                ...cleanedFormData,
              }
            : entry
        )
      );
    } else {
      const newEntry: TimetableEntry = {
        id: Date.now(),
        ...cleanedFormData,
      };

      setEntries((currentEntries) => [
        ...currentEntries,
        newEntry,
      ]);
    }

    const action = isEditing
      ? "updated"
      : "added";

    setFormData(emptyTimetableForm);
    setEditingEntryId(null);
    setIsModalOpen(false);

    return {
      success: true,
      action,
    };
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingEntryId(null);
    setFormData(emptyTimetableForm);
  }

  function openAddModal() {
    setEditingEntryId(null);
    setFormData(emptyTimetableForm);
    setIsModalOpen(true);
  }

  return {
    entries,
    filteredEntries,

    classFilter,
    setClassFilter,

    dayFilter,
    setDayFilter,

    isModalOpen,
    setIsModalOpen,

    formData,
    setFormData,

    editingEntryId,
    isEditing,

    openAddModal,
    closeModal,
    startEditing,
    deleteEntry,
    handleSubmit,
  };
}