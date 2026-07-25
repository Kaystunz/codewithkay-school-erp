import { createContext } from "react";
import type { useParents } from "../hooks/useParents";

export type ParentsContextValue = ReturnType<
  typeof useParents
>;

export const ParentsContext =
  createContext<ParentsContextValue | null>(null);