import { useContext } from "react";

import { AccountsContext } from "../context/AccountsContext";

export function useAccountsContext() {
  const context = useContext(AccountsContext);

  if (!context) {
    throw new Error(
      "useAccountsContext must be used inside AccountsProvider"
    );
  }

  return context;
}