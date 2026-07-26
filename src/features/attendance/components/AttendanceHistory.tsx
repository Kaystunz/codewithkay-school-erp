import { History } from "lucide-react";
import { useMemo, useState } from "react";

import type {
  AttendanceRecord,
  AttendanceStatus,
} from "../types/attendance";
import { useStudentsContext } from "../../students/hooks/useStudentsContext";
import { useClassesContext } from "../../classes/hooks/useClassesContext";

type AttendanceHistoryProps = {
  records: AttendanceRecord[];
};

function AttendanceHistory({
  records,
}: AttendanceHistoryProps) {
  const { students } = useStudentsContext();
  const { classes } = useClassesContext();

  const [classFilter, setClassFilter] =
    useState("All classes");

  const [statusFilter, setStatusFilter] =
    useState("All statuses");

  const [dateFilter, setDateFilter] =
    useState("");

  const filteredRecords = useMemo(() => {
    return [...records]
      .filter((record) => {
        const matchesClass =
          classFilter === "All classes" ||
          record.classId === Number(classFilter);

        const matchesStatus =
          statusFilter === "All statuses" ||
          record.status === statusFilter;

        const matchesDate =
          !dateFilter ||
          record.date === dateFilter;

        return (
          matchesClass &&
          matchesStatus &&
          matchesDate
        );
      })
      .sort(
        (a, b) =>
          new Date(b.date).getTime() -
          new Date(a.date).getTime()
      );
  }, [
    records,
    classFilter,
    statusFilter,
    dateFilter,
  ]);

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-5">
        <h2 className="text-lg font-bold text-slate-900">
          Attendance History
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          View and filter saved attendance records.
        </p>
      </div>

      <div className="grid gap-4 border-b border-slate-200 p-5 md:grid-cols-3">
        <select
          value={classFilter}
          onChange={(event) =>
            setClassFilter(event.target.value)
          }
          className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600"
        >
          <option>All classes</option>

          {classes.map((schoolClass) => (
            <option
              key={schoolClass.id}
              value={schoolClass.id}
            >
              {schoolClass.name}{" "}
              {schoolClass.section}
            </option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(event) =>
            setStatusFilter(event.target.value)
          }
          className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600"
        >
          <option>All statuses</option>
          <option>Present</option>
          <option>Absent</option>
          <option>Late</option>
          <option>Excused</option>
        </select>

        <input
          type="date"
          value={dateFilter}
          onChange={(event) =>
            setDateFilter(event.target.value)
          }
          className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600"
        />
      </div>

      {filteredRecords.length === 0 ? (
        <div className="p-12 text-center">
          <History
            size={42}
            className="mx-auto text-slate-300"
          />

          <h3 className="mt-4 font-semibold text-slate-700">
            No attendance records found
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Try changing your filters.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-50">
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-5 py-4">Date</th>
                <th className="px-5 py-4">Student</th>
                <th className="px-5 py-4">Class</th>
                <th className="px-5 py-4">Status</th>
                <th className="px-5 py-4">Note</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {filteredRecords.map((record) => {
                const student = students.find(
                  (item) =>
                    item.id === record.studentId
                );

                const schoolClass = classes.find(
                  (item) =>
                    item.id === record.classId
                );

                const status =
                  record.status as AttendanceStatus;

                return (
                  <tr
                    key={record.id}
                    className="hover:bg-slate-50"
                  >
                    <td className="px-5 py-4 text-slate-600">
                      {record.date}
                    </td>

                    <td className="px-5 py-4 font-semibold text-slate-900">
                      {student?.name ??
                        "Unknown student"}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {schoolClass
                        ? `${schoolClass.name} ${schoolClass.section}`
                        : "Unknown class"}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          status === "Present"
                            ? "bg-emerald-100 text-emerald-700"
                            : status === "Absent"
                              ? "bg-red-100 text-red-700"
                              : status === "Late"
                                ? "bg-amber-100 text-amber-700"
                                : "bg-blue-100 text-blue-700"
                        }`}
                      >
                        {status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-slate-500">
                      {record.note || "—"}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default AttendanceHistory;