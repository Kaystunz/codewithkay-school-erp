import type { ReactNode } from "react";

import { FeesContext } from "./FeesContext";
import { useFees } from "../hooks/useFees";

type FeesProviderProps = {
  children: ReactNode;
};

function FeesProvider({
  children,
}: FeesProviderProps) {
  const feesValue = useFees();

  return (
    <FeesContext.Provider value={feesValue}>
      {children}
    </FeesContext.Provider>
  );
}

export default FeesProvider;