import { createContext } from "react";
import type { useClasses } from "../hooks/useClasses";

export type ClassesContextValue = ReturnType<
  typeof useClasses
>;

export const ClassesContext =
  createContext<ClassesContextValue | null>(null);