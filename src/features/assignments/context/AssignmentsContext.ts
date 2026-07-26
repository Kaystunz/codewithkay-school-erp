import { createContext } from "react";
import type { useAssignments } from "../hooks/useAssignments";

export type AssignmentsContextValue = ReturnType<
  typeof useAssignments
>;

export const AssignmentsContext =
  createContext<AssignmentsContextValue | null>(null);