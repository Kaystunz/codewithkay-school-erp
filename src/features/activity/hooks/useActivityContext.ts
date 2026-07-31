import { useContext } from "react";

import { ActivityContext } from "../context/ActivityContext";

export function useActivityContext() {
  const context =
    useContext(ActivityContext);

  if (!context) {
    throw new Error(
      "useActivityContext must be used inside ActivityProvider."
    );
  }

  return context;
}