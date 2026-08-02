import { useContext } from "react";

import { EventsContext } from "../context/EventsContext";

export function useEventsContext() {
  const context =
    useContext(EventsContext);

  if (!context) {
    throw new Error(
      "useEventsContext must be used inside EventsProvider."
    );
  }

  return context;
}