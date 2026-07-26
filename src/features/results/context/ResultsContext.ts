import { createContext } from "react";
import type { useResults } from "../hooks/useResults";

export type ResultsContextValue = ReturnType<
  typeof useResults
>;

export const ResultsContext =
  createContext<ResultsContextValue | null>(null);