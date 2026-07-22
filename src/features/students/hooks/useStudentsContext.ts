import { useContext } from "react";
import { StudentsContext } from "../context/StudentsContext";

export function useStudentsContext() {
  const context = useContext(StudentsContext);

  if (!context) {
    throw new Error(
      "useStudentsContext must be used inside StudentsProvider"
    );
  }

  return context;
}