import type { ReactNode } from "react";

import { AnnouncementsContext } from "./AnnouncementsContext";
import { useAnnouncements } from "../hooks/useAnnouncements";

type AnnouncementsProviderProps = {
  children: ReactNode;
};

function AnnouncementsProvider({
  children,
}: AnnouncementsProviderProps) {
  const announcementsValue = useAnnouncements();

  return (
    <AnnouncementsContext.Provider value={announcementsValue}>
      {children}
    </AnnouncementsContext.Provider>
  );
}

export default AnnouncementsProvider;