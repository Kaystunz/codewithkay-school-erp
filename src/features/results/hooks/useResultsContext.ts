import { useContext } from "react";
import { ResultsContext } from "../context/ResultsContext";

export function useResultsContext() {
  const context = useContext(ResultsContext);

  if (!context) {
    throw new Error(
      "useResultsContext must be used inside ResultsProvider"
    );
  }

  return context;
}