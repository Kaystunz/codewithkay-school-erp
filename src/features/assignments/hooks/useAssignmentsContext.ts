import { useContext } from "react";
import { AssignmentsContext } from "../context/AssignmentsContext";

export function useAssignmentsContext() {
  const context = useContext(AssignmentsContext);

  if (!context) {
    throw new Error(
      "useAssignmentsContext must be used inside AssignmentsProvider"
    );
  }

  return context;
}