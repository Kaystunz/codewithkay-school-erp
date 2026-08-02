import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import DashboardLayout from "./layouts/DashboardLayout";
import DashboardPage from "./features/dashboard/pages/DashboardPage";

import ProfilePage from "./features/profile/pages/ProfilePage";

import LoginPage from "./features/auth/pages/LoginPage";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";

import StudentsPage from "./features/students/pages/StudentsPage";
import StudentDetailsPage from "./features/students/pages/StudentDetailsPage";
import StudentsProvider from "./features/students/context/StudentsProvider";

import TeachersPage from "./features/teachers/pages/TeachersPage";
import TeachersProvider from "./features/teachers/context/TeachersProvider";
import TeacherDetailsPage from "./features/teachers/pages/TeacherDetailsPage";

import ParentsPage from "./features/parents/pages/ParentsPage";
import ParentsProvider from "./features/parents/context/ParentsProvider";
import ParentDetailsPage from "./features/parents/pages/ParentDetailsPage";

import AccountsPage from "./features/accounts/pages/AccountsPage";

import ClassesPage from "./features/classes/pages/ClassesPage";
import ClassesProvider from "./features/classes/context/ClassesProvider";
import ClassDetailsPage from "./features/classes/pages/ClassDetailsPage";

import AttendancePage from "./features/attendance/pages/AttendancePage";
import AttendanceProvider from "./features/attendance/context/AttendanceProvider";

import ResultsPage from "./features/results/pages/ResultsPage";
import ResultsProvider from "./features/results/context/ResultsProvider";

import FeesPage from "./features/fees/pages/FeesPage";
import FeesProvider from "./features/fees/context/FeesProvider";

import TimetablePage from "./features/timetable/pages/TimetablePage";
import TimetableProvider from "./features/timetable/context/TimetableProvider";

import AssignmentsPage from "./features/assignments/pages/AssignmentsPage";
import AssignmentsProvider from "./features/assignments/context/AssignmentsProvider";
import AssignmentDetailsPage from "./features/assignments/pages/AssignmentDetailsPage";

import AnnouncementsPage from "./features/announcements/pages/AnnouncementsPage";
import AnnouncementsProvider from "./features/announcements/context/AnnouncementsProvider";

import ReportsPage from "./features/reports/pages/ReportsPage";
import { RoleGuard } from "./features/auth/components/RoleGuard";
import EventsProvider from "./features/events/context/EventsProvider";
import EventsPage from "./features/events/pages/EventsPage";

function App() {
  return (
    <StudentsProvider>
      <TeachersProvider>
        <ParentsProvider>
          <ClassesProvider>
            <AttendanceProvider>
              <ResultsProvider>
                <FeesProvider>
                  <TimetableProvider>
                    <AssignmentsProvider>
                      <AnnouncementsProvider>
                        <EventsProvider>
                        <BrowserRouter>
  <Routes>
    <Route path="/login" element={<LoginPage />} />

    <Route element={<ProtectedRoute />}>
      <Route element={<DashboardLayout />}>
        <Route
          index
          element={<Navigate to="/dashboard" replace />}
        />

        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />

        <Route element={<RoleGuard permission="students" />}>
          <Route path="/students" element={<StudentsPage />} />
          <Route
            path="/students/:studentId"
            element={<StudentDetailsPage />}
          />
        </Route>

        <Route element={<RoleGuard permission="teachers" />}>
          <Route path="/teachers" element={<TeachersPage />} />
          <Route
            path="/teachers/:teacherId"
            element={<TeacherDetailsPage />}
          />
        </Route>

        <Route element={<RoleGuard permission="parents" />}>
          <Route path="/parents" element={<ParentsPage />} />
          <Route
            path="/parents/:parentId"
            element={<ParentDetailsPage />}
          />
        </Route>

        <Route element={<RoleGuard permission="accounts" />}>
        <Route
          path="/accounts"
          element={<AccountsPage />}
        />
      </Route>

        <Route element={<RoleGuard permission="classes" />}>
          <Route path="/classes" element={<ClassesPage />} />
          <Route
            path="/classes/:classId"
            element={<ClassDetailsPage />}
          />
        </Route>

        <Route element={<RoleGuard permission="attendance" />}>
          <Route path="/attendance" element={<AttendancePage />} />
        </Route>

        <Route element={<RoleGuard permission="results" />}>
          <Route path="/results" element={<ResultsPage />} />
        </Route>

        <Route element={<RoleGuard permission="fees" />}>
          <Route path="/fees" element={<FeesPage />} />
        </Route>

        <Route element={<RoleGuard permission="timetable" />}>
          <Route path="/timetable" element={<TimetablePage />} />
        </Route>

        <Route element={<RoleGuard permission="assignments" />}>
          <Route path="/assignments" element={<AssignmentsPage />} />
          <Route
            path="/assignments/:assignmentId"
            element={<AssignmentDetailsPage />}
          />
        </Route>

        <Route element={<RoleGuard permission="announcements" />}>
          <Route
            path="/announcements"
            element={<AnnouncementsPage />}
          />
        </Route>

        <Route element={<RoleGuard permission="events" />}>
        <Route
          path="/events"
          element={<EventsPage />}
        />
      </Route>

        <Route element={<RoleGuard permission="reports" />}>
          <Route path="/reports" element={<ReportsPage />} />
        </Route>

        <Route
          path="*"
          element={<Navigate to="/dashboard" replace />}
        />
      </Route>
    </Route>
  </Routes>
</BrowserRouter>
</EventsProvider>
                      </AnnouncementsProvider>
                    </AssignmentsProvider>
                  </TimetableProvider>
                </FeesProvider>
              </ResultsProvider>
            </AttendanceProvider>
          </ClassesProvider>
        </ParentsProvider>
      </TeachersProvider>
    </StudentsProvider>
  );
}

export default App;