import type { ReactNode } from "react";

import { AttendanceContext } from "./AttendanceContext";
import { useAttendance } from "../hooks/useAttendance";

type AttendanceProviderProps = {
  children: ReactNode;
};

function AttendanceProvider({
  children,
}: AttendanceProviderProps) {
  const attendanceValue = useAttendance();

  return (
    <AttendanceContext.Provider value={attendanceValue}>
      {children}
    </AttendanceContext.Provider>
  );
}

export default AttendanceProvider;