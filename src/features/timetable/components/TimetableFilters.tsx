import { useClassesContext } from "../../classes/hooks/useClassesContext";

type TimetableFiltersProps = {
  classFilter: string;
  dayFilter: string;
  onClassFilterChange: (value: string) => void;
  onDayFilterChange: (value: string) => void;
};

function TimetableFilters({
  classFilter,
  dayFilter,
  onClassFilterChange,
  onDayFilterChange,
}: TimetableFiltersProps) {
  const { classes } = useClassesContext();

  return (
    <div className="grid gap-4 border-b border-slate-200 p-5 sm:grid-cols-2">
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
        value={dayFilter}
        onChange={(event) =>
          onDayFilterChange(event.target.value)
        }
        className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600"
      >
        <option>All days</option>
        <option>Monday</option>
        <option>Tuesday</option>
        <option>Wednesday</option>
        <option>Thursday</option>
        <option>Friday</option>
      </select>
    </div>
  );
}

export default TimetableFilters;