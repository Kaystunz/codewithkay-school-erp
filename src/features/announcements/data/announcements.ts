import type { Announcement } from "../types/announcement";

export const initialAnnouncements: Announcement[] = [
  {
    id: 1,
    title: "School Resumption Notice",
    message:
      "Fareedah Schools will resume for the new academic session on Monday.",
    audience: "Everyone",
    classId: null,
    priority: "Important",
    status: "Published",
    publishedDate: "2026-09-07",
    createdBy: "Administrator",
    createdAt: "2026-08-30",
  },
  {
    id: 2,
    title: "Year 4 Mathematics Test",
    message:
      "Year 4 students will have a Mathematics test on Friday.",
    audience: "Class",
    classId: 4,
    priority: "Normal",
    status: "Published",
    publishedDate: "2026-09-10",
    createdBy: "Administrator",
    createdAt: "2026-09-08",
  },
  {
    id: 3,
    title: "Outstanding School Fees",
    message:
      "Parents with outstanding school fees are encouraged to complete payment before the deadline.",
    audience: "Parents",
    classId: null,
    priority: "Urgent",
    status: "Published",
    publishedDate: "2026-09-12",
    createdBy: "Accounts Department",
    createdAt: "2026-09-10",
  },
  {
    id: 4,
    title: "Staff Meeting",
    message:
      "All teaching staff should attend the staff meeting after school on Thursday.",
    audience: "Teachers",
    classId: null,
    priority: "Important",
    status: "Draft",
    publishedDate: "",
    createdBy: "Administrator",
    createdAt: "2026-09-11",
  },
];