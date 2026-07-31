import { createContext } from "react";

import type { useActivity } from "../hooks/useActivity";

export const ActivityContext =
  createContext<
    ReturnType<typeof useActivity> | undefined
  >(undefined);