import { Navigate, Outlet } from "react-router-dom";
import { usePermissions } from "../hooks/usePermissions";

type RoleGuardProps = {
  permission: string;
};

export function RoleGuard({ permission }: RoleGuardProps) {
  const permissions = usePermissions();

  if (!permissions.includes(permission)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}