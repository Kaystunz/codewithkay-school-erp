import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { useNotificationsContext } from "../hooks/useNotificationsContext";

type NotificationPanelProps = {
  onClose: () => void;
};

function NotificationPanel({
  onClose,
}: NotificationPanelProps) {
  const navigate = useNavigate();

  const {
    notifications,
    unreadCount,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearNotifications,
  } = useNotificationsContext();

  return (
    <div className="absolute right-0 mt-3 w-[360px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-4">
        <div>
          <h3 className="font-bold text-slate-900">
            Notifications
          </h3>

          <p className="mt-1 text-xs text-slate-500">
            {unreadCount} unread
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            type="button"
            onClick={markAllAsRead}
            className="text-xs font-semibold text-teal-700 hover:text-teal-800"
          >
            Mark all as read
          </button>
        )}
      </div>

      <div className="max-h-96 overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="px-6 py-12 text-center">
            <Bell
              size={36}
              className="mx-auto text-slate-300"
            />

            <p className="mt-4 font-semibold text-slate-700">
              No notifications
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Important school updates will appear here.
            </p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div
              key={notification.id}
              className={`border-b border-slate-100 px-4 py-4 ${
                notification.isRead
                  ? "bg-white"
                  : "bg-teal-50/60"
              }`}
            >
              <button
                type="button"
                onClick={() => {
                  markAsRead(notification.id);

                  if (notification.link) {
                    onClose();
                    navigate(notification.link);
                  }
                }}
                className="w-full text-left"
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`mt-2 h-2.5 w-2.5 shrink-0 rounded-full ${
                      notification.isRead
                        ? "bg-slate-300"
                        : "bg-teal-600"
                    }`}
                  />

                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-slate-800">
                      {notification.title}
                    </p>

                    <p className="mt-1 text-sm leading-5 text-slate-500">
                      {notification.message}
                    </p>

                    <p className="mt-2 text-xs text-slate-400">
                      {new Date(
                        notification.createdAt
                      ).toLocaleString()}
                    </p>
                  </div>
                </div>
              </button>

              <div className="mt-3 flex justify-end gap-3">
                {!notification.isRead && (
                  <button
                    type="button"
                    onClick={() =>
                      markAsRead(notification.id)
                    }
                    className="text-xs font-semibold text-teal-700"
                  >
                    Mark as read
                  </button>
                )}

                <button
                  type="button"
                  onClick={() =>
                    deleteNotification(
                      notification.id
                    )
                  }
                  className="text-xs font-semibold text-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {notifications.length > 0 && (
        <div className="border-t border-slate-100 p-3">
          <button
            type="button"
            onClick={clearNotifications}
            className="w-full rounded-xl px-3 py-2 text-sm font-semibold text-red-600 hover:bg-red-50"
          >
            Clear all notifications
          </button>
        </div>
      )}
    </div>
  );
}

export default NotificationPanel;