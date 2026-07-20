import { Filter, Search } from "lucide-react";

type StudentFiltersProps = {
  searchTerm: string;
  classFilter: string;
  statusFilter: string;
  onSearchChange: (value: string) => void;
  onClassFilterChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
};

function StudentFilters({
  searchTerm,
  classFilter,
  statusFilter,
  onSearchChange,
  onClassFilterChange,
  onStatusFilterChange,
}: StudentFiltersProps) {
  return (
    <div className="border-b border-slate-200 p-5">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="search"
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search by name, admission number or parent..."
            className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none transition focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative">
            <Filter
              size={17}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={classFilter}
              onChange={(event) => onClassFilterChange(event.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 py-3 pl-10 pr-10 outline-none sm:w-44"
            >
              <option>All classes</option>
              <option>Year 1</option>
              <option>Year 2</option>
              <option>Year 3</option>
              <option>Year 4</option>
              <option>Year 5</option>
              <option>Year 6</option>
            </select>
          </div>

          <select
            value={statusFilter}
            onChange={(event) => onStatusFilterChange(event.target.value)}
            className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none sm:w-44"
          >
            <option>All statuses</option>
            <option>Active</option>
            <option>Inactive</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default StudentFilters;