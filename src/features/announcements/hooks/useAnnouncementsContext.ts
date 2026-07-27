import { useContext } from "react";
import { AnnouncementsContext } from "../context/AnnouncementsContext";

export function useAnnouncementsContext() {
  const context = useContext(AnnouncementsContext);

  if (!context) {
    throw new Error(
      "useAnnouncementsContext must be used inside AnnouncementsProvider"
    );
  }

  return context;
}