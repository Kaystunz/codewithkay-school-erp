import { createContext } from "react";

import type { useNotifications } from "../hooks/useNotifications";

export const NotificationsContext =
  createContext<
    ReturnType<typeof useNotifications> | undefined
  >(undefined);