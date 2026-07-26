import type { ReactNode } from "react";

import { AssignmentsContext } from "./AssignmentsContext";
import { useAssignments } from "../hooks/useAssignments";

type AssignmentsProviderProps = {
  children: ReactNode;
};

function AssignmentsProvider({
  children,
}: AssignmentsProviderProps) {
  const assignmentsValue = useAssignments();

  return (
    <AssignmentsContext.Provider value={assignmentsValue}>
      {children}
    </AssignmentsContext.Provider>
  );
}

export default AssignmentsProvider;