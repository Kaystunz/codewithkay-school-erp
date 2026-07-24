import { createContext } from "react";
import type { useTeachers } from "../hooks/useTeachers";

export type TeachersContextValue = ReturnType<
  typeof useTeachers
>;

export const TeachersContext =
  createContext<TeachersContextValue | null>(null);