import type { ReactNode } from "react";

import { MessagesContext } from "./MessagesContext";
import { useMessages } from "../hooks/useMessages";

type MessagesProviderProps = {
  children: ReactNode;
};

function MessagesProvider({
  children,
}: MessagesProviderProps) {
  const value = useMessages();

  return (
    <MessagesContext.Provider value={value}>
      {children}
    </MessagesContext.Provider>
  );
}

export default MessagesProvider;