export type Weekday =
  | "Monday"
  | "Tuesday"
  | "Wednesday"
  | "Thursday"
  | "Friday";

export type TimetableEntry = {
  id: number;

  classId: number;
  teacherId: number | null;

  subject: string;

  day: Weekday;

  startTime: string;
  endTime: string;

  room: string;
};

export type TimetableFormData = Omit<
  TimetableEntry,
  "id"
>;