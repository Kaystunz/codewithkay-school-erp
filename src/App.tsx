import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import PlaceholderPage from "./pages/PlaceholderPage";
import StudentsPage from "./features/students/pages/StudentsPage";
import StudentDetailsPage from "./features/students/pages/StudentDetailsPage";
import StudentsProvider from "./features/students/context/StudentsProvider";

function App() {
  return (
    <StudentsProvider>
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
            <Route path="/teachers" element={<PlaceholderPage />} />
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
    </StudentsProvider>
  );
}

export default App;