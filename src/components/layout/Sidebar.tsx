import {
  BarChart3,
  BookOpen,
  CalendarCheck,
  CalendarDays,
  ClipboardList,
  CreditCard,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Megaphone,
  Menu,
  School,
  Settings,
  UserRound,
  Users,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

type SidebarProps = {
  isOpen: boolean;
  onClose: () => void;
};

const navigationItems = [
  {
    label: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Students",
    path: "/students",
    icon: GraduationCap,
  },
  {
    label: "Teachers",
    path: "/teachers",
    icon: Users,
  },
  {
    label: "Parents",
    path: "/parents",
    icon: UserRound,
  },
  {
    label: "Classes",
    path: "/classes",
    icon: School,
  },
  {
    label: "Attendance",
    path: "/attendance",
    icon: CalendarCheck,
  },
  {
    label: "Results",
    path: "/results",
    icon: BookOpen,
  },
  {
    label: "Fees",
    path: "/fees",
    icon: CreditCard,
  },
  {
  label: "Timetable",
  path: "/timetable",
  icon: CalendarDays,
},
{
  label: "Assignments",
  path: "/assignments",
  icon: ClipboardList,
},
{
  label: "Announcements",
  path: "/announcements",
  icon: Megaphone,
},

  {
  label: "Reports",
  path: "/reports",
  icon: BarChart3,
},
];

function Sidebar({ isOpen, onClose }: SidebarProps) {
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
            {navigationItems.map((item) => {
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

          <p className="mb-3 mt-8 px-3 text-xs font-semibold uppercase tracking-widest text-teal-300">
            System
          </p>

          <div className="space-y-1">
            <NavLink
              to="/settings"
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  isActive
                    ? "bg-white text-teal-900"
                    : "text-teal-100 hover:bg-white/10 hover:text-white"
                }`
              }
            >
              <Settings size={20} />
              Settings
            </NavLink>
          </div>
        </nav>

        <div className="border-t border-white/10 p-4">
          <button
            type="button"
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