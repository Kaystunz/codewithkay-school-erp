import type { ReactNode } from "react";

import { ActivityContext } from "./ActivityContext";

import { useActivity } from "../hooks/useActivity";

type Props = {
  children: ReactNode;
};

export function ActivityProvider({
  children,
}: Props) {
  const value = useActivity();

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  );
}