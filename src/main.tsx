import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import ToastProvider from "./components/ui/toast/ToastProvider";

import { AuthProvider } from "./features/auth/context/AuthProvider";
import AccountsProvider from "./features/accounts/context/AccountsProvider";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ToastProvider>
      <AccountsProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </AccountsProvider>
    </ToastProvider>
  </React.StrictMode>
);