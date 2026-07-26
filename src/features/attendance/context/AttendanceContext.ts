import { createContext } from "react";
import type { useAttendance } from "../hooks/useAttendance";

export type AttendanceContextValue = ReturnType<
  typeof useAttendance
>;

export const AttendanceContext =
  createContext<AttendanceContextValue | null>(null);