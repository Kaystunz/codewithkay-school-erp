import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import ToastProvider from "./components/ui/toast/ToastProvider";

import { ActivityProvider } from "./features/activity/context/ActivityProvider";
import AccountsProvider from "./features/accounts/context/AccountsProvider";
import { AuthProvider } from "./features/auth/context/AuthProvider";
import { NotificationsProvider } from "./features/notifications/context/NotificationsProvider";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <React.StrictMode>
    <ToastProvider>
      <NotificationsProvider>
        <ActivityProvider>
          <AccountsProvider>
            <AuthProvider>
              <App />
            </AuthProvider>
          </AccountsProvider>
        </ActivityProvider>
      </NotificationsProvider>
    </ToastProvider>
  </React.StrictMode>
);