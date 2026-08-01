import type { ReactNode } from "react";

import { NotificationsContext } from "./NotificationsContext";
import { useNotifications } from "../hooks/useNotifications";

type NotificationsProviderProps = {
  children: ReactNode;
};

export function NotificationsProvider({
  children,
}: NotificationsProviderProps) {
  const value = useNotifications();

  return (
    <NotificationsContext.Provider value={value}>
      {children}
    </NotificationsContext.Provider>
  );
}