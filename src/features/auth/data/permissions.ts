import type { UserRole } from "../types/auth";

export const permissions: Record<
  UserRole,
  string[]
> = {
    Admin: [
    "dashboard",
    "students",
    "teachers",
    "parents",
    "accounts",
    "classes",
    "attendance",
    "results",
    "fees",
    "timetable",
    "assignments",
    "announcements",
    "reports",
    "settings",
    ],

  Teacher: [
    "dashboard",
    "students",
     "classes",
    "attendance",
    "results",
    "timetable",
    "assignments",
    "announcements",
  ],

  Parent: [
    "dashboard",
    "results",
    "attendance",
    "fees",
    "timetable",
    "assignments",
    "announcements",
  ],

  Student: [
    "dashboard",
    "results",
    "attendance",
    "timetable",
    "assignments",
    "announcements",
  ],
};
