import { permissions } from "../data/permissions";
import { useAuthContext } from "./useAuthContext";

export function usePermissions() {
  const { user } = useAuthContext();

  if (!user) {
    return [];
  }

  return permissions[user.role];
}