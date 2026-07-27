import { createContext } from "react";
import type { useAnnouncements } from "../hooks/useAnnouncements";

export type AnnouncementsContextValue =
  ReturnType<typeof useAnnouncements>;

export const AnnouncementsContext =
  createContext<AnnouncementsContextValue | null>(null);