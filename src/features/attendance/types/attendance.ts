export type AttendanceStatus =
  | "Present"
  | "Absent"
  | "Late"
  | "Excused";

export type AttendanceRecord = {
  id: number;
  studentId: number;
  classId: number;
  date: string;
  status: AttendanceStatus;
  note: string;
};

export type AttendanceFormData = Omit<
  AttendanceRecord,
  "id"
>;