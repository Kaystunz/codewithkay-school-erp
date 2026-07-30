import type { UserRole } from "../../auth/types/auth";

export type DirectoryRole = Extract<
  UserRole,
  "Teacher" | "Student" | "Parent"
>;

export type DirectoryPerson = {
  id: string;
  name: string;
  email: string;
  role: DirectoryRole;
  linkedRecordId: number;
  secondaryLabel?: string;
};