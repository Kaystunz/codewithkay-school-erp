import {
  CalendarDays,
  Pencil,
  Trash2,
} from "lucide-react";

import type { TimetableEntry } from "../types/timetable";
import { useClassesContext } from "../../classes/hooks/useClassesContext";
import { useTeachersContext } from "../../teachers/hooks/useTeachersContext";
import { useTimetableContext } from "../hooks/useTimetableContext";

type TimetableTableProps = {
  entries: TimetableEntry[];
};

function TimetableTable({
  entries,
}: TimetableTableProps) {
  const { classes } = useClassesContext();
  const { teachers } = useTeachersContext();

  const {
    startEditing,
    deleteEntry,
  } = useTimetableContext();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-slate-50">
          <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <th className="px-5 py-4">Day</th>
            <th className="px-5 py-4">Time</th>
            <th className="px-5 py-4">Class</th>
            <th className="px-5 py-4">Subject</th>
            <th className="px-5 py-4">Teacher</th>
            <th className="px-5 py-4">Room</th>
            <th className="px-5 py-4 text-right">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {entries.map((entry) => {
            const schoolClass = classes.find(
              (item) => item.id === entry.classId
            );

            const teacher = teachers.find(
              (item) => item.id === entry.teacherId
            );

            return (
              <tr
                key={entry.id}
                className="hover:bg-slate-50"
              >
                <td className="px-5 py-4 font-semibold text-slate-900">
                  {entry.day}
                </td>

                <td className="px-5 py-4 text-slate-600">
                  {entry.startTime} - {entry.endTime}
                </td>

                <td className="px-5 py-4 text-slate-600">
                  {schoolClass
                    ? `${schoolClass.name} ${schoolClass.section}`
                    : "Unknown class"}
                </td>

                <td className="px-5 py-4 font-medium text-slate-800">
                  {entry.subject}
                </td>

                <td className="px-5 py-4 text-slate-600">
                  {teacher?.name ?? "Not assigned"}
                </td>

                <td className="px-5 py-4 text-slate-600">
                  {entry.room || "Not assigned"}
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        startEditing(entry)
                      }
                      className="rounded-lg p-2 text-slate-500 hover:bg-teal-50 hover:text-teal-700"
                      title="Edit timetable entry"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        deleteEntry(entry.id)
                      }
                      className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                      title="Delete timetable entry"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {entries.length === 0 && (
        <div className="p-12 text-center">
          <CalendarDays
            size={42}
            className="mx-auto text-slate-300"
          />

          <h3 className="mt-4 font-semibold text-slate-700">
            No timetable entries found
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Try changing your filters or add a new lesson.
          </p>
        </div>
      )}
    </div>
  );
}

export default TimetableTable;