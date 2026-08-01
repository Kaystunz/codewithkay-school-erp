import { useEffect, useMemo, useState } from "react";

import type {
  CreateNotificationData,
  Notification,
} from "../types/notification";

const STORAGE_KEY = "fareedah-notifications";

function loadNotifications(): Notification[] {
  const storedNotifications =
    localStorage.getItem(STORAGE_KEY);

  if (!storedNotifications) {
    return [];
  }

  try {
    return JSON.parse(
      storedNotifications
    ) as Notification[];
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return [];
  }
}

export function useNotifications() {
  const [notifications, setNotifications] =
    useState<Notification[]>(loadNotifications);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(notifications)
    );
  }, [notifications]);

  const unreadCount = useMemo(
    () =>
      notifications.filter(
        (notification) => !notification.isRead
      ).length,
    [notifications]
  );

  function addNotification(
    data: CreateNotificationData
  ) {
    const newNotification: Notification = {
      id: Date.now(),
      title: data.title,
      message: data.message,
      category: data.category,
      link: data.link,
      createdAt: new Date().toISOString(),
      isRead: false,
    };

    setNotifications((currentNotifications) => [
      newNotification,
      ...currentNotifications,
    ]);
  }

  function markAsRead(notificationId: number) {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) =>
        notification.id === notificationId
          ? {
              ...notification,
              isRead: true,
            }
          : notification
      )
    );
  }

  function markAllAsRead() {
    setNotifications((currentNotifications) =>
      currentNotifications.map((notification) => ({
        ...notification,
        isRead: true,
      }))
    );
  }

  function deleteNotification(
    notificationId: number
  ) {
    setNotifications((currentNotifications) =>
      currentNotifications.filter(
        (notification) =>
          notification.id !== notificationId
      )
    );
  }

  function clearNotifications() {
    setNotifications([]);
  }

  return {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearNotifications,
  };
}