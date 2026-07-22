import { createContext } from "react";
import { useStudents } from "../hooks/useStudents";

export const StudentsContext =
  createContext<ReturnType<typeof useStudents> | null>(null);