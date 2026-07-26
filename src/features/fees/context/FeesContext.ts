import { createContext } from "react";
import type { useFees } from "../hooks/useFees";

export type FeesContextValue = ReturnType<
  typeof useFees
>;

export const FeesContext =
  createContext<FeesContextValue | null>(null);