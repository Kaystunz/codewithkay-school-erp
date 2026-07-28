import { useClassesContext } from "../../classes/hooks/useClassesContext";

type ReportFiltersProps = {
  classFilter: string;
  termFilter: string;
  sessionFilter: string;

  onClassFilterChange: (value: string) => void;
  onTermFilterChange: (value: string) => void;
  onSessionFilterChange: (value: string) => void;
};

function ReportFilters({
  classFilter,
  termFilter,
  sessionFilter,
  onClassFilterChange,
  onTermFilterChange,
  onSessionFilterChange,
}: ReportFiltersProps) {
  const { classes } = useClassesContext();

  return (
    <section className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm md:grid-cols-3">
      <select
        value={classFilter}
        onChange={(event) =>
          onClassFilterChange(event.target.value)
        }
        className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600"
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
        className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600"
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
        className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600"
      >
        <option>All sessions</option>
        <option>2026/2027</option>
        <option>2025/2026</option>
      </select>
    </section>
  );
}

export default ReportFilters;