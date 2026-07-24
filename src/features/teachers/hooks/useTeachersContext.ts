import { useContext } from "react";
import { TeachersContext } from "../context/TeachersContext";

export function useTeachersContext() {
  const context = useContext(TeachersContext);

  if (!context) {
    throw new Error(
      "useTeachersContext must be used inside TeachersProvider"
    );
  }

  return context;
}