import type { ReactNode } from "react";;
import { StudentsContext } from "./StudentsContext";
import { useStudents } from "../hooks/useStudents";

type StudentsProviderProps = {
  children: ReactNode;
};

function StudentsProvider({
  children,
}: StudentsProviderProps) {
  const students = useStudents();

  return (
    <StudentsContext.Provider value={students}>
      {children}
    </StudentsContext.Provider>
  );
}

export default StudentsProvider;