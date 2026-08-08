import { useContext } from "react";

import { MessagesContext } from "../context/MessagesContext";

export function useMessagesContext() {
  const context =
    useContext(MessagesContext);

  if (!context) {
    throw new Error(
      "useMessagesContext must be used within a MessagesProvider"
    );
  }

  return context;
}