import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import PlaceholderPage from "./pages/PlaceholderPage";
import StudentsPage from "./features/students/pages/StudentsPage";
import StudentDetailsPage from "./features/students/pages/StudentDetailsPage";
import StudentsProvider from "./features/students/context/StudentsProvider";
import TeachersPage from "./features/teachers/pages/TeachersPage";
import TeachersProvider from "./features/teachers/context/TeachersProvider";
import TeacherDetailsPage from "./features/teachers/pages/TeacherDetailsPage";
import ParentsPage from "./features/parents/pages/ParentsPage";
import ParentsProvider from "./features/parents/context/ParentsProvider";
import ParentDetailsPage from "./features/parents/pages/ParentDetailsPage";
import ClassesPage from "./features/classes/pages/ClassesPage";
import ClassesProvider from "./features/classes/context/ClassesProvider";
import ClassDetailsPage from "./features/classes/pages/ClassDetailsPage";
import AttendancePage from "./features/attendance/pages/AttendancePage";
import AttendanceProvider from "./features/attendance/context/AttendanceProvider";
import ResultsPage from "./features/results/pages/ResultsPage";
import ResultsProvider from "./features/results/context/ResultsProvider";
import FeesPage from "./features/fees/pages/FeesPage";
import FeesProvider from "./features/fees/context/FeesProvider";

function App() {
  return (
   <StudentsProvider>
  <TeachersProvider>
    <ParentsProvider>
       <ClassesProvider>
        <AttendanceProvider>
          <ResultsProvider>
            <FeesProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />

          <Route path="/login" element={<LoginPage />} />

          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/students" element={<StudentsPage />} />
            <Route
              path="/students/:studentId"
              element={<StudentDetailsPage />}
            />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route path="/teachers/:teacherId" element={<TeacherDetailsPage />} />
            <Route path="/parents" element={<ParentsPage />} />
            <Route path="/parents/:parentId" element={<ParentDetailsPage />} />
            <Route path="/classes" element={<ClassesPage />} />
            <Route path="/classes/:classId" element={<ClassDetailsPage />} />
            <Route path="/attendance" element={<AttendancePage />} />
            <Route path="/results" element={<ResultsPage />} />
            <Route path="/fees" element={<FeesPage />} />
            <Route path="/settings" element={<PlaceholderPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
          </BrowserRouter>
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