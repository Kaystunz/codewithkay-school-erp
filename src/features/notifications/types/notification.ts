import type { ActivityCategory } from "../../activity/types/activity";

export type Notification = {
  id: number;
  title: string;
  message: string;
  category: ActivityCategory;
  createdAt: string;
  isRead: boolean;
  link?: string;
  recipientId?: number;
};

export type CreateNotificationData = Omit<
  Notification,
  "id" | "createdAt" | "isRead"
>;