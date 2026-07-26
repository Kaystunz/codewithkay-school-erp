import { useContext } from "react";
import { AttendanceContext } from "../context/AttendanceContext";

export function useAttendanceContext() {
  const context = useContext(AttendanceContext);

  if (!context) {
    throw new Error(
      "useAttendanceContext must be used inside AttendanceProvider"
    );
  }

  return context;
}