import { useContext } from "react";
import { ParentsContext } from "../context/ParentsContext";

export function useParentsContext() {
  const context = useContext(ParentsContext);

  if (!context) {
    throw new Error(
      "useParentsContext must be used inside ParentsProvider"
    );
  }

  return context;
}