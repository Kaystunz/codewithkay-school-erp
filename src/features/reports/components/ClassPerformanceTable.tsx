import { BarChart3 } from "lucide-react";

import type { ClassPerformance } from "../types/report";
import { useClassesContext } from "../../classes/hooks/useClassesContext";

type ClassPerformanceTableProps = {
  performance: ClassPerformance[];
};

function ClassPerformanceTable({
  performance,
}: ClassPerformanceTableProps) {
  const { classes } = useClassesContext();

  return (
    <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-200 p-5">
        <h2 className="text-lg font-bold text-slate-900">
          Class Performance
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Compare academic performance and attendance across classes.
        </p>
      </div>

      {performance.length === 0 ? (
        <div className="p-12 text-center">
          <BarChart3
            size={42}
            className="mx-auto text-slate-300"
          />

          <h3 className="mt-4 font-semibold text-slate-700">
            No performance data
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Class analytics will appear once data becomes available.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-slate-50">
              <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                <th className="px-5 py-4">Class</th>
                <th className="px-5 py-4">
                  Students
                </th>
                <th className="px-5 py-4">
                  Average Score
                </th>
                <th className="px-5 py-4">
                  Attendance Rate
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100">
              {performance.map((item) => {
                const schoolClass = classes.find(
                  (currentClass) =>
                    currentClass.id === item.classId
                );

                return (
                  <tr
                    key={item.classId}
                    className="hover:bg-slate-50"
                  >
                    <td className="px-5 py-4 font-semibold text-slate-900">
                      {schoolClass
                        ? `${schoolClass.name} ${schoolClass.section}`
                        : "Unknown class"}
                    </td>

                    <td className="px-5 py-4 text-slate-600">
                      {item.studentCount}
                    </td>

                    <td className="px-5 py-4">
                      <span className="font-bold text-slate-900">
                        {item.averageScore}%
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span className="font-bold text-slate-900">
                        {item.attendanceRate}%
                      </span>
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

export default ClassPerformanceTable;