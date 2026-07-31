import { useEffect, useState } from "react";

import { initialActivities } from "../data/activities";

import type { Activity } from "../types/activity";


import type { ActivityLogData, } from "../utils/activityLogger";
const STORAGE_KEY = "fareedah-activities";

function loadActivities() {
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

export function useActivity() {
  const [activities, setActivities] =
    useState<Activity[]>(loadActivities);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(activities)
    );
  }, [activities]);

 function addActivity(activity: ActivityLogData) {
  setActivities((current) => [
    {
      id: Date.now(),
      createdAt: new Date().toISOString(),
      actor: activity.actor ?? "System",
      title: activity.title,
      description: activity.description,
      category: activity.category,
    },
    ...current,
  ]);
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