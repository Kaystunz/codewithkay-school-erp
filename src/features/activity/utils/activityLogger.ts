import type {
  ActivityCategory,
} from "../types/activity";

export type ActivityLogData = {
  title: string;
  description: string;
  category: ActivityCategory;
  actor?: string;
};

export function createActivityLog({
  title,
  description,
  category,
  actor = "System",
}: ActivityLogData) {
  return {
    title,
    description,
    category,
    actor,
  };
}