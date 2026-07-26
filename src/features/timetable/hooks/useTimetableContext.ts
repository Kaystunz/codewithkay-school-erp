import { useContext } from "react";
import { TimetableContext } from "../context/TimetableContext";

export function useTimetableContext() {
  const context = useContext(TimetableContext);

  if (!context) {
    throw new Error(
      "useTimetableContext must be used inside TimetableProvider"
    );
  }

  return context;
}