export type ActivityCategory =
  | "Student"
  | "Teacher"
  | "Parent"
  | "Attendance"
  | "Fees"
  | "Account"
  | "Result"
  | "Announcement"
  | "Event";

export type Activity = {
  id: number;
  title: string;
  description: string;
  actor: string;
  category: ActivityCategory;
  createdAt: string;
};