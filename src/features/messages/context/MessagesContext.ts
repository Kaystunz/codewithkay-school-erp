import { createContext } from "react";

import type { useMessages } from "../hooks/useMessages";

export type MessagesContextValue =
  ReturnType<typeof useMessages>;

export const MessagesContext =
  createContext<MessagesContextValue | null>(
    null
  );