import type { ReactNode } from "react";

import { ActivityContext } from "./ActivityContext";
import { useActivity } from "../hooks/useActivity";
import { useNotificationsContext } from "../../notifications/hooks/useNotificationsContext";

type Props = {
  children: ReactNode;
};

export function ActivityProvider({
  children,
}: Props) {
  const { addNotification } =
    useNotificationsContext();

  const value = useActivity(
    addNotification
  );

  return (
    <ActivityContext.Provider value={value}>
      {children}
    </ActivityContext.Provider>
  );
}