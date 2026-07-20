import { Bell, Menu, Search } from "lucide-react";

type TopbarProps = {
  onMenuClick: () => void;
};

function Topbar({ onMenuClick }: TopbarProps) {
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
            Welcome back, Administrator
          </h2>
          <p className="hidden text-sm text-slate-500 sm:block">
            Here is what is happening in your school today.
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

        <button
          type="button"
          className="relative rounded-xl border border-slate-200 p-2.5 text-slate-600 hover:bg-slate-100"
          aria-label="Notifications"
        >
          <Bell size={20} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" />
        </button>

        <button
          type="button"
          className="flex items-center gap-3 rounded-xl border border-slate-200 p-1.5 pr-3 hover:bg-slate-50"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-700 text-sm font-bold text-white">
            AK
          </div>

          <div className="hidden text-left sm:block">
            <p className="text-sm font-semibold text-slate-900">
              Admin User
            </p>
            <p className="text-xs text-slate-500">Administrator</p>
          </div>
        </button>
      </div>
    </header>
  );
}

export default Topbar;