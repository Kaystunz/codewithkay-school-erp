import { Search } from "lucide-react";

type ClassFiltersProps = {
  searchTerm: string;
  statusFilter: string;
  sessionFilter: string;
  onSearchChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
  onSessionFilterChange: (value: string) => void;
};

function ClassFilters({
  searchTerm,
  statusFilter,
  sessionFilter,
  onSearchChange,
  onStatusFilterChange,
  onSessionFilterChange,
}: ClassFiltersProps) {
  return (
    <div className="flex flex-col gap-4 border-b border-slate-200 p-5 lg:flex-row lg:items-center">
      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          value={searchTerm}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Search classes..."
          className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
        />
      </div>

      <select
        value={sessionFilter}
        onChange={(event) =>
          onSessionFilterChange(event.target.value)
        }
        className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600"
      >
        <option>All sessions</option>
        <option>2026/2027</option>
        <option>2025/2026</option>
      </select>

      <select
        value={statusFilter}
        onChange={(event) =>
          onStatusFilterChange(event.target.value)
        }
        className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600"
      >
        <option>All statuses</option>
        <option>Active</option>
        <option>Inactive</option>
      </select>
    </div>
  );
}

export default ClassFilters;