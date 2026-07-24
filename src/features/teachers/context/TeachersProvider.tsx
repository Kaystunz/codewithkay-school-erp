import type { ReactNode } from "react";
import { TeachersContext } from "./TeachersContext";
import { useTeachers } from "../hooks/useTeachers";

type TeachersProviderProps = {
  children: ReactNode;
};

function TeachersProvider({
  children,
}: TeachersProviderProps) {
  const teachersValue = useTeachers();

  return (
    <TeachersContext.Provider value={teachersValue}>
      {children}
    </TeachersContext.Provider>
  );
}

export default TeachersProvider;