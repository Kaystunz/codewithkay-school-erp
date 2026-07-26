import { useMemo, useState } from "react";
import { initialAttendance } from "../data/attendance";
import type {
  AttendanceRecord,
  AttendanceStatus,
} from "../types/attendance";

type AttendanceDraft = {
  studentId: number;
  status: AttendanceStatus;
  note: string;
};

type SaveResult =
  | {
      success: true;
      savedCount: number;
    }
  | {
      success: false;
      message: string;
    };

export function useAttendance() {
  const [attendanceRecords, setAttendanceRecords] =
    useState<AttendanceRecord[]>(initialAttendance);

  const [selectedClassId, setSelectedClassId] =
    useState<number | null>(null);

  const [selectedDate, setSelectedDate] =
    useState("2026-07-25");

  const [draftAttendance, setDraftAttendance] =
    useState<AttendanceDraft[]>([]);

  const recordsForSelectedDateAndClass = useMemo(() => {
    if (!selectedClassId) {
      return [];
    }

    return attendanceRecords.filter(
      (record) =>
        record.classId === selectedClassId &&
        record.date === selectedDate
    );
  }, [
    attendanceRecords,
    selectedClassId,
    selectedDate,
  ]);

 const presentCount = draftAttendance.filter(
  (item) => item.status === "Present"
).length;

const absentCount = draftAttendance.filter(
  (item) => item.status === "Absent"
).length;

const lateCount = draftAttendance.filter(
  (item) => item.status === "Late"
).length;

const excusedCount = draftAttendance.filter(
  (item) => item.status === "Excused"
).length;

const totalMarked = draftAttendance.length;

const attendancePercentage =
  totalMarked > 0
    ? Math.round(
        ((presentCount + lateCount) / totalMarked) * 100
      )
    : 0;

  function initializeAttendance(
    studentIds: number[]
  ) {
    const drafts = studentIds.map((studentId) => {
      const existingRecord = attendanceRecords.find(
        (record) =>
          record.studentId === studentId &&
          record.classId === selectedClassId &&
          record.date === selectedDate
      );

      return {
        studentId,
        status: existingRecord?.status ?? "Present",
        note: existingRecord?.note ?? "",
      };
    });

    setDraftAttendance(drafts);
  }

  function updateStudentStatus(
    studentId: number,
    status: AttendanceStatus
  ) {
    setDraftAttendance((currentDraft) =>
      currentDraft.map((item) =>
        item.studentId === studentId
          ? {
              ...item,
              status,
            }
          : item
      )
    );
  }

  function updateStudentNote(
    studentId: number,
    note: string
  ) {
    setDraftAttendance((currentDraft) =>
      currentDraft.map((item) =>
        item.studentId === studentId
          ? {
              ...item,
              note,
            }
          : item
      )
    );
  }

  function markAllPresent() {
    setDraftAttendance((currentDraft) =>
      currentDraft.map((item) => ({
        ...item,
        status: "Present",
      }))
    );
  }

  function saveAttendance(): SaveResult {
    if (!selectedClassId) {
      return {
        success: false,
        message: "Please select a class.",
      };
    }

    if (!selectedDate) {
      return {
        success: false,
        message: "Please select a date.",
      };
    }

    if (draftAttendance.length === 0) {
      return {
        success: false,
        message:
          "There are no students to mark attendance for.",
      };
    }

    setAttendanceRecords((currentRecords) => {
      const recordsWithoutCurrentSelection =
        currentRecords.filter(
          (record) =>
            !(
              record.classId === selectedClassId &&
              record.date === selectedDate &&
              draftAttendance.some(
                (item) =>
                  item.studentId === record.studentId
              )
            )
        );

      const savedRecords: AttendanceRecord[] =
        draftAttendance.map((item) => ({
          id: Date.now() + item.studentId,
          studentId: item.studentId,
          classId: selectedClassId,
          date: selectedDate,
          status: item.status,
          note: item.note.trim(),
        }));

      return [
        ...recordsWithoutCurrentSelection,
        ...savedRecords,
      ];
    });

    return {
      success: true,
      savedCount: draftAttendance.length,
    };
  }

  return {
    attendanceRecords,

    selectedClassId,
    setSelectedClassId,

    selectedDate,
    setSelectedDate,

    draftAttendance,

    recordsForSelectedDateAndClass,

    presentCount,
    absentCount,
    lateCount,
    excusedCount,
     attendancePercentage,

    initializeAttendance,
    updateStudentStatus,
    updateStudentNote,
    markAllPresent,
    saveAttendance,
  };
}