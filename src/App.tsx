import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import DashboardLayout from "./layouts/DashboardLayout";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import PlaceholderPage from "./pages/PlaceholderPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<LoginPage />} />

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/students" element={<PlaceholderPage />} />
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
  );
}

export default App;