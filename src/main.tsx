import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import ToastProvider from "./components/ui/toast/ToastProvider";
import { AuthProvider } from "./features/auth/context/AuthProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ToastProvider>
  </React.StrictMode>
);