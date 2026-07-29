import { createContext } from "react";

import type { useAccounts } from "../hooks/useAccounts";

type AccountsContextValue =
  ReturnType<typeof useAccounts>;

export const AccountsContext =
  createContext<AccountsContextValue | null>(
    null
  );