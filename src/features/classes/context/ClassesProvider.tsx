import type { ReactNode } from "react";
import { ClassesContext } from "./ClassesContext";
import { useClasses } from "../hooks/useClasses";

type ClassesProviderProps = {
  children: ReactNode;
};

function ClassesProvider({
  children,
}: ClassesProviderProps) {
  const classesValue = useClasses();

  return (
    <ClassesContext.Provider value={classesValue}>
      {children}
    </ClassesContext.Provider>
  );
}

export default ClassesProvider;