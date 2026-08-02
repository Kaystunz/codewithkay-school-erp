import { createContext } from "react";

import type { useEvents } from "../hooks/useEvents";

export const EventsContext =
  createContext<
    ReturnType<typeof useEvents> | undefined
  >(undefined);