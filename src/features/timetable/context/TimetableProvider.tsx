import type { ReactNode } from "react";

import { TimetableContext } from "./TimetableContext";
import { useTimetable } from "../hooks/useTimetable";

type TimetableProviderProps = {
  children: ReactNode;
};

function TimetableProvider({
  children,
}: TimetableProviderProps) {
  const timetableValue = useTimetable();

  return (
    <TimetableContext.Provider value={timetableValue}>
      {children}
    </TimetableContext.Provider>
  );
}

export default TimetableProvider;