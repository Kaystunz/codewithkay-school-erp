import { Search } from "lucide-react";

type AnnouncementFiltersProps = {
  searchTerm: string;
  audienceFilter: string;
  priorityFilter: string;
  statusFilter: string;

  onSearchChange: (value: string) => void;
  onAudienceFilterChange: (value: string) => void;
  onPriorityFilterChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
};

function AnnouncementFilters({
  searchTerm,
  audienceFilter,
  priorityFilter,
  statusFilter,
  onSearchChange,
  onAudienceFilterChange,
  onPriorityFilterChange,
  onStatusFilterChange,
}: AnnouncementFiltersProps) {
  return (
    <div className="grid gap-4 border-b border-slate-200 p-5 lg:grid-cols-5">
      <div className="relative lg:col-span-2">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          value={searchTerm}
          onChange={(event) =>
            onSearchChange(event.target.value)
          }
          placeholder="Search announcements..."
          className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
        />
      </div>

      <select
        value={audienceFilter}
        onChange={(event) =>
          onAudienceFilterChange(event.target.value)
        }
        className="rounded-xl border border-slate-200 px-4 py-3 outline-none"
      >
        <option>All audiences</option>
        <option>Everyone</option>
        <option>Students</option>
        <option>Parents</option>
        <option>Teachers</option>
        <option>Class</option>
      </select>

      <select
        value={priorityFilter}
        onChange={(event) =>
          onPriorityFilterChange(event.target.value)
        }
        className="rounded-xl border border-slate-200 px-4 py-3 outline-none"
      >
        <option>All priorities</option>
        <option>Normal</option>
        <option>Important</option>
        <option>Urgent</option>
      </select>

      <select
        value={statusFilter}
        onChange={(event) =>
          onStatusFilterChange(event.target.value)
        }
        className="rounded-xl border border-slate-200 px-4 py-3 outline-none"
      >
        <option>All statuses</option>
        <option>Draft</option>
        <option>Published</option>
        <option>Archived</option>
      </select>
    </div>
  );
}

export default AnnouncementFilters;