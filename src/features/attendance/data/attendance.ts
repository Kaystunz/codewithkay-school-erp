import type { AttendanceRecord } from "../types/attendance";

export const initialAttendance: AttendanceRecord[] = [
  {
    id: 1,
    studentId: 1,
    classId: 1,
    date: "2026-07-24",
    status: "Present",
    note: "",
  },
  {
    id: 2,
    studentId: 2,
    classId: 2,
    date: "2026-07-24",
    status: "Late",
    note: "Arrived after morning assembly.",
  },
  {
    id: 3,
    studentId: 3,
    classId: 3,
    date: "2026-07-24",
    status: "Absent",
    note: "Parent informed the school.",
  },
  {
    id: 4,
    studentId: 4,
    classId: 4,
    date: "2026-07-24",
    status: "Present",
    note: "",
  },
  {
    id: 5,
    studentId: 5,
    classId: 5,
    date: "2026-07-24",
    status: "Excused",
    note: "Medical appointment.",
  },
];