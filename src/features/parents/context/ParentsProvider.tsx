import type { ReactNode } from "react";
import { ParentsContext } from "./ParentsContext";
import { useParents } from "../hooks/useParents";

type ParentsProviderProps = {
  children: ReactNode;
};

function ParentsProvider({
  children,
}: ParentsProviderProps) {
  const parentsValue = useParents();

  return (
    <ParentsContext.Provider value={parentsValue}>
      {children}
    </ParentsContext.Provider>
  );
}

export default ParentsProvider;