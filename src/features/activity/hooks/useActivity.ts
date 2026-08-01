import { useEffect, useState } from "react";

import { initialActivities } from "../data/activities";

import type { Activity } from "../types/activity";
import type { ActivityLogData } from "../utils/activityLogger";
import type { CreateNotificationData } from "../../notifications/types/notification";

const STORAGE_KEY = "fareedah-activities";

type AddNotification = (
  notification: CreateNotificationData
) => void;

function loadActivities(): Activity[] {
  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return initialActivities;
  }

  try {
    return JSON.parse(stored) as Activity[];
  } catch {
    localStorage.removeItem(STORAGE_KEY);

    return initialActivities;
  }
}

function getNotificationLink(
  category: Activity["category"]
) {
  switch (category) {
    case "Student":
      return "/students";

    case "Teacher":
      return "/teachers";

    case "Parent":
      return "/parents";

    case "Attendance":
      return "/attendance";

    case "Fees":
      return "/fees";

    case "Account":
      return "/accounts";

    case "Result":
      return "/results";

    case "Announcement":
      return "/announcements";

    default:
      return "/dashboard";
  }
}

function shouldCreateNotification(
  activity: ActivityLogData
) {
  switch (activity.category) {
    case "Student":
      return activity.title === "Student Added";

    case "Teacher":
      return activity.title === "Teacher Added";

    case "Parent":
      return activity.title === "Parent Added";

    case "Account":
      return (
        activity.title === "Account Created" ||
        activity.title === "Account Disabled"
      );

    case "Attendance":
      return activity.title === "Attendance Saved";

    case "Fees":
      return (
        activity.title === "Payment Recorded" ||
        activity.title === "Fee Added"
      );

    case "Result":
      return (
        activity.title === "Result Published" ||
        activity.title === "Published Result Updated"
      );

    case "Announcement":
      return (
        activity.title === "Announcement Published" ||
        activity.title === "Announcement Added"
      );

    default:
      return false;
  }
}

export function useActivity(
  addNotification?: AddNotification
) {
  const [activities, setActivities] =
    useState<Activity[]>(loadActivities);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(activities)
    );
  }, [activities]);

  function addActivity(
    activity: ActivityLogData
  ) {
    const newActivity: Activity = {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      actor: activity.actor ?? "System",
      title: activity.title,
      description: activity.description,
      category: activity.category,
    };

    setActivities((currentActivities) => [
      newActivity,
      ...currentActivities,
    ]);

    if (
      addNotification &&
      shouldCreateNotification(activity)
    ) {
      addNotification({
        title: newActivity.title,
        message: newActivity.description,
        category: newActivity.category,
        link: getNotificationLink(
          newActivity.category
        ),
      });
    }
  }

  function clearActivities() {
    setActivities([]);
  }

  const recentActivities =
    activities.slice(0, 15);

  return {
    activities,
    recentActivities,
    addActivity,
    clearActivities,
  };
}