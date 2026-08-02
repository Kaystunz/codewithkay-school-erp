import { Search } from "lucide-react";

type EventFiltersProps = {
  searchTerm: string;
  typeFilter: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onTypeFilterChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
};

function EventFilters({
  searchTerm,
  typeFilter,
  statusFilter,
  onSearchChange,
  onTypeFilterChange,
  onStatusFilterChange,
}: EventFiltersProps) {
  return (
    <div className="grid gap-4 border-b border-slate-200 p-5 md:grid-cols-3">
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="search"
          value={searchTerm}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Search events..."
          className="w-full rounded-xl border border-slate-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
        />
      </div>

      <select
        value={typeFilter}
        onChange={(event) =>
          onTypeFilterChange(event.target.value)
        }
        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
      >
        <option value="All types">
          All event types
        </option>
        <option value="Academic">
          Academic
        </option>
        <option value="Meeting">
          Meeting
        </option>
        <option value="Holiday">
          Holiday
        </option>
        <option value="Examination">
          Examination
        </option>
        <option value="Sports">
          Sports
        </option>
        <option value="Celebration">
          Celebration
        </option>
        <option value="Other">
          Other
        </option>
      </select>

      <select
        value={statusFilter}
        onChange={(event) =>
          onStatusFilterChange(event.target.value)
        }
        className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
      >
        <option value="All statuses">
          All statuses
        </option>
        <option value="Scheduled">
          Scheduled
        </option>
        <option value="Completed">
          Completed
        </option>
        <option value="Cancelled">
          Cancelled
        </option>
      </select>
    </div>
  );
}

export default EventFilters;