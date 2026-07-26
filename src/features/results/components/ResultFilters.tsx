import { Search } from "lucide-react";
import { useClassesContext } from "../../classes/hooks/useClassesContext";

type ResultFiltersProps = {
  searchTerm: string;
  classFilter: string;
  termFilter: string;
  sessionFilter: string;
  statusFilter: string;

  onSearchChange: (value: string) => void;
  onClassFilterChange: (value: string) => void;
  onTermFilterChange: (value: string) => void;
  onSessionFilterChange: (value: string) => void;
  onStatusFilterChange: (value: string) => void;
};

function ResultFilters({
  searchTerm,
  classFilter,
  termFilter,
  sessionFilter,
  statusFilter,

  onSearchChange,
  onClassFilterChange,
  onTermFilterChange,
  onSessionFilterChange,
  onStatusFilterChange,
}: ResultFiltersProps) {
  const { classes } = useClassesContext();

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
          placeholder="Search subject, grade or remark..."
          className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
        />
      </div>

      <select
        value={classFilter}
        onChange={(event) =>
          onClassFilterChange(event.target.value)
        }
        className="rounded-xl border border-slate-200 px-4 py-3 outline-none"
      >
        <option>All classes</option>

        {classes.map((schoolClass) => (
          <option
            key={schoolClass.id}
            value={schoolClass.id}
          >
            {schoolClass.name} {schoolClass.section}
          </option>
        ))}
      </select>

      <select
        value={termFilter}
        onChange={(event) =>
          onTermFilterChange(event.target.value)
        }
        className="rounded-xl border border-slate-200 px-4 py-3 outline-none"
      >
        <option>All terms</option>
        <option>First Term</option>
        <option>Second Term</option>
        <option>Third Term</option>
      </select>

      <select
        value={sessionFilter}
        onChange={(event) =>
          onSessionFilterChange(event.target.value)
        }
        className="rounded-xl border border-slate-200 px-4 py-3 outline-none"
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
        className="rounded-xl border border-slate-200 px-4 py-3 outline-none"
      >
        <option>All statuses</option>
        <option>Draft</option>
        <option>Published</option>
      </select>
    </div>
  );
}

export default ResultFilters;