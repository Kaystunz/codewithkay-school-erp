export type EventType =
  | "Academic"
  | "Meeting"
  | "Holiday"
  | "Examination"
  | "Sports"
  | "Celebration"
  | "Other";

export type EventAudience =
  | "Everyone"
  | "Staff"
  | "Parents"
  | "Students"
  | "Class";

export type EventStatus =
  | "Scheduled"
  | "Completed"
  | "Cancelled";

export type SchoolEvent = {
  id: number;
  title: string;
  description: string;
  eventType: EventType;
  audience: EventAudience;
  classId: number | null;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  location: string;
  status: EventStatus;
  createdBy: string;
  createdAt: string;
};

export type EventFormData = Omit<
  SchoolEvent,
  "id" | "createdAt"
>;