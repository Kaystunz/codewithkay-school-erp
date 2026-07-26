import { createContext } from "react";
import type { useTimetable } from "../hooks/useTimetable";

export type TimetableContextValue = ReturnType<
  typeof useTimetable
>;

export const TimetableContext =
  createContext<TimetableContextValue | null>(null);