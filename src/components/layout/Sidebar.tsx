import {
  BarChart3,
  BookOpen,
  CalendarCheck,
  CalendarDays,
  CalendarRange,
  ClipboardList,
  CreditCard,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Menu,
  School,
  UserRound,
  Users,
  X,
  MessageSquare,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { usePermissions } from "../../features/auth/hooks/usePermissions";
import { useAuthContext } from "../../features/auth/hooks/useAuthContext";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const navigationItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
    permission: "dashboard",
  },
  {
  label: "My Profile",
  path: "/profile",
  icon: UserRound,
  permission: "dashboard",
},

  {
    label: "Students",
    path: "/students",
    icon: GraduationCap,
    permission: "students",
  },
  {
    label: "Teachers",
    path: "/teachers",
    icon: Users,
    permission: "teachers",
  },
  {
    label: "Parents",
    path: "/parents",
    icon: UserRound,
    permission: "parents",
  },
  {
  label: "Accounts",
  path: "/accounts",
  icon: Users,
  permission: "accounts",
  },
  {
    label: "Classes",
    path: "/classes",
    icon: School,
    permission: "classes",
  },
  {
    label: "Attendance",
    path: "/attendance",
    icon: CalendarCheck,
    permission: "attendance",
  },
  {
    label: "Results",
    path: "/results",
    icon: BookOpen,
    permission: "results",
  },
  {
    label: "Fees",
    path: "/fees",
    icon: CreditCard,
    permission: "fees",
  },
  {
    label: "Timetable",
    path: "/timetable",
    icon: CalendarDays,
    permission: "timetable",
  },
  {
    label: "Assignments",
    path: "/assignments",
    icon: ClipboardList,
    permission: "assignments",
  },
  {
  label: "Messages",
  path: "/messages",
  icon: MessageSquare,
  permission: "messages",
},
  {
    label: "Announcements",
    path: "/announcements",
    icon: Megaphone,
    permission: "announcements",
  },
  {
  label: "Events",
  path: "/events",
  icon: CalendarRange,
  permission: "events",
},
  {
    label: "Reports",
    path: "/reports",
    icon: BarChart3,
    permission: "reports",
  },
];

function Sidebar({ isOpen, onClose }: SidebarProps) {
  const permissions = usePermissions();
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

   const visibleNavigationItems = navigationItems.filter((item) =>
    permissions.includes(item.permission)
  );
   

  const handleLogout = () => {
    logout();
     onClose();
    navigate("/login", { replace: true });
  };

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col bg-teal-900 text-white transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-white/10 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
              <GraduationCap size={25} />
            </div>

            <div>
              <h1 className="font-bold">Fareedah School</h1>
              <p className="text-xs text-teal-200">Management Portal</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 hover:bg-white/10 lg:hidden"
            aria-label="Close sidebar"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-teal-300">
            Main menu
          </p>

          <div className="space-y-1">
           {visibleNavigationItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isActive
                        ? "bg-white text-teal-900 shadow-sm"
                        : "text-teal-100 hover:bg-white/10 hover:text-white"
                    }`
                  }
                >
                  <Icon size={20} />
                  {item.label}
                </NavLink>
              );
            })}
          </div>
        </nav>

        <div className="border-t border-white/10 p-4">
        {user && (
  <NavLink
    to="/profile"
    onClick={onClose}
    className="mb-3 flex items-center gap-3 rounded-xl bg-white/10 px-4 py-3 transition hover:bg-white/15"
  >
    {user.profileImage ? (
      <img
        src={user.profileImage}
        alt={user.name}
        className="h-10 w-10 rounded-full object-cover"
      />
    ) : (
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-teal-900">
        {user.name
          .split(" ")
          .map((word) => word.charAt(0))
          .join("")
          .slice(0, 2)
          .toUpperCase()}
      </div>
    )}

    <div className="min-w-0 text-left">
      <p className="truncate text-sm font-semibold text-white">
        {user.name}
      </p>

      <p className="text-xs text-teal-200">
        {user.role}
      </p>
    </div>
  </NavLink>
)}
          <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-teal-100 transition hover:bg-red-500/20 hover:text-white"
        >
          <LogOut size={20} />
          Logout
        </button>
        </div>
      </aside>

      <button
        type="button"
        className="hidden"
        aria-label="Menu"
      >
        <Menu />
      </button>
    </>
  );
}

export default Sidebar;