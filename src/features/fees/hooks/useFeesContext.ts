import { useContext } from "react";
import { FeesContext } from "../context/FeesContext";

export function useFeesContext() {
  const context = useContext(FeesContext);

  if (!context) {
    throw new Error(
      "useFeesContext must be used inside FeesProvider"
    );
  }

  return context;
}