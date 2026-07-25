import { useContext } from "react";
import { ClassesContext } from "../context/ClassesContext";

export function useClassesContext() {
  const context = useContext(ClassesContext);

  if (!context) {
    throw new Error(
      "useClassesContext must be used inside ClassesProvider"
    );
  }

  return context;
}