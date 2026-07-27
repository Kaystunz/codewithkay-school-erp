export type AnnouncementAudience =
  | "Everyone"
  | "Students"
  | "Parents"
  | "Teachers"
  | "Class";

export type AnnouncementPriority =
  | "Normal"
  | "Important"
  | "Urgent";

export type AnnouncementStatus =
  | "Draft"
  | "Published"
  | "Archived";

export type Announcement = {
  id: number;

  title: string;
  message: string;

  audience: AnnouncementAudience;

  // Used only when audience === "Class"
  classId: number | null;

  priority: AnnouncementPriority;
  status: AnnouncementStatus;

  publishedDate: string;

  createdBy: string;
  createdAt: string;
};

export type AnnouncementFormData = Omit<
  Announcement,
  "id" | "createdAt"
>;