import type { ReactNode } from "react";

import { AccountsContext } from "./AccountsContext";
import { useAccounts } from "../hooks/useAccounts";

type AccountsProviderProps = {
  children: ReactNode;
};

function AccountsProvider({
  children,
}: AccountsProviderProps) {
  const accountsValue = useAccounts();

  return (
    <AccountsContext.Provider
      value={accountsValue}
    >
      {children}
    </AccountsContext.Provider>
  );
}

export default AccountsProvider;