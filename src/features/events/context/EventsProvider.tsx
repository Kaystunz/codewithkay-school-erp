import type { ReactNode } from "react";

import { EventsContext } from "./EventsContext";
import { useEvents } from "../hooks/useEvents";

type EventsProviderProps = {
  children: ReactNode;
};

function EventsProvider({
  children,
}: EventsProviderProps) {
  const value = useEvents();

  return (
    <EventsContext.Provider value={value}>
      {children}
    </EventsContext.Provider>
  );
}

export default EventsProvider;