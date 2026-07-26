import type { ReactNode } from "react";

import { ResultsContext } from "./ResultsContext";
import { useResults } from "../hooks/useResults";

type ResultsProviderProps = {
  children: ReactNode;
};

function ResultsProvider({
  children,
}: ResultsProviderProps) {
  const resultsValue = useResults();

  return (
    <ResultsContext.Provider value={resultsValue}>
      {children}
    </ResultsContext.Provider>
  );
}

export default ResultsProvider;