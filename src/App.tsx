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

function App() {
  return (
    <StudentsProvider>
    <TeachersProvider>
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
            <Route path="/parents" element={<PlaceholderPage />} />
            <Route path="/classes" element={<PlaceholderPage />} />
            <Route path="/attendance" element={<PlaceholderPage />} />
            <Route path="/results" element={<PlaceholderPage />} />
            <Route path="/fees" element={<PlaceholderPage />} />
            <Route path="/settings" element={<PlaceholderPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
          </BrowserRouter>
  </TeachersProvider>
</StudentsProvider>
  );
}

export default App;