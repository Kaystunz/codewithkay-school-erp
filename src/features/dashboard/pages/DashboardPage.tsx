import { useAuthContext } from "../../auth/hooks/useAuthContext";

import AdminDashboard from "../components/AdminDashboard";
import ParentDashboard from "../components/ParentDashboard";
import StudentDashboard from "../components/StudentDashboard";
import TeacherDashboard from "../components/TeacherDashboard";

function DashboardPage() {
  const { user } = useAuthContext();

  if (!user) {
    return null;
  }

  switch (user.role) {
    case "Admin":
      return <AdminDashboard />;

    case "Teacher":
      return <TeacherDashboard />;

    case "Parent":
      return <ParentDashboard />;

    case "Student":
      return <StudentDashboard />;

    default:
      return null;
  }
}

export default DashboardPage;