import {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Search,
  Settings,
  User,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../../features/auth/hooks/useAuthContext";
import { useNotificationsContext } from "../../features/notifications/hooks/useNotificationsContext";

import NotificationPanel from "../../features/notifications/components/NotificationPanel";

type TopbarProps = {
  onMenuClick: () => void;
};

function Topbar({
  onMenuClick,
}: TopbarProps) {
  const [
    isNotificationsOpen,
    setIsNotificationsOpen,
  ] = useState(false);

  const [
    isProfileOpen,
    setIsProfileOpen,
  ] = useState(false);

  const notificationsRef =
    useRef<HTMLDivElement | null>(null);

  const profileRef =
    useRef<HTMLDivElement | null>(null);

  const navigate = useNavigate();

  const { user, logout } =
    useAuthContext();

  const { notifications } =
  useNotificationsContext();

  const userNotifications =
  notifications.filter(
    (notification) =>
      notification.recipientId ===
        undefined ||
      notification.recipientId ===
        user?.id
  );

const unreadCount =
  userNotifications.filter(
    (notification) =>
      !notification.isRead
  ).length;

  useEffect(() => {
    function handleOutsideClick(
      event: MouseEvent
    ) {
      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target as Node
        )
      ) {
        setIsProfileOpen(false);
      }

      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(
          event.target as Node
        )
      ) {
        setIsNotificationsOpen(false);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  function handleLogout() {
    logout();

    navigate("/login", {
      replace: true,
    });
  }

  function getInitials(name?: string) {
    if (!name) {
      return "U";
    }

    return name
      .split(" ")
      .map((word) => word[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();
  }

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 sm:px-6">
      <div className="flex items-center gap-4">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu size={22} />
        </button>

        <div>
          <h2 className="text-lg font-bold text-slate-900">
            Welcome back,{" "}
            {user?.name ?? "User"}
          </h2>

          <p className="hidden text-sm text-slate-500 sm:block">
            Here is what is happening in your
            school today.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            placeholder="Search portal..."
            className="w-64 rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-teal-600 focus:bg-white focus:ring-4 focus:ring-teal-100"
          />
        </div>

        <div
          ref={notificationsRef}
          className="relative"
        >
          <button
            type="button"
            onClick={() => {
              setIsProfileOpen(false);

              setIsNotificationsOpen(
                (current) => !current
              );
            }}
            className="relative rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-100"
            aria-label="Notifications"
            aria-expanded={
              isNotificationsOpen
            }
          >
            <Bell size={20} />

            {unreadCount > 0 && (
              <span className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white">
                {unreadCount > 99
                  ? "99+"
                  : unreadCount}
              </span>
            )}
          </button>

          {isNotificationsOpen && (
            <NotificationPanel
              onClose={() =>
                setIsNotificationsOpen(
                  false
                )
              }
            />
          )}
        </div>

        <div
          ref={profileRef}
          className="relative"
        >
          <button
            type="button"
            onClick={() => {
              setIsNotificationsOpen(false);

              setIsProfileOpen(
                (current) => !current
              );
            }}
            className="flex items-center gap-3 rounded-xl border border-slate-200 p-1.5 pr-3 hover:bg-slate-50"
            aria-expanded={isProfileOpen}
            aria-haspopup="menu"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-700 text-sm font-bold text-white">
              {getInitials(user?.name)}
            </div>

            <div className="hidden text-left sm:block">
              <p className="max-w-40 truncate text-sm font-semibold text-slate-900">
                {user?.name ?? "User"}
              </p>

              <p className="text-xs text-slate-500">
                {user?.role ?? "Account"}
              </p>
            </div>

            <ChevronDown
              size={16}
              className={`hidden text-slate-500 transition sm:block ${
                isProfileOpen
                  ? "rotate-180"
                  : ""
              }`}
            />
          </button>

          {isProfileOpen && (
            <div
              role="menu"
              className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl"
            >
              <div className="border-b border-slate-100 px-4 py-4">
                <p className="font-semibold text-slate-900">
                  {user?.name}
                </p>

                <p className="mt-1 truncate text-sm text-slate-500">
                  {user?.email}
                </p>

                <span className="mt-3 inline-flex rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                  {user?.role}
                </span>
              </div>

              <div className="p-2">
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setIsProfileOpen(false);
                    navigate("/profile");
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50"
                >
                  <User size={18} />
                  Profile
                </button>

                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setIsProfileOpen(false);
                    navigate("/settings");
                  }}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm text-slate-700 hover:bg-slate-50"
                >
                  <Settings size={18} />
                  Settings
                </button>

                <button
                  type="button"
                  role="menuitem"
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOut size={18} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}

export default Topbar;