import { BookOpen } from "lucide-react";

import type { SchoolClass } from "../types/class";
import ClassRow from "./ClassRow";

type ClassTableProps = {
  classes: SchoolClass[];
};

function ClassTable({
  classes,
}: ClassTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-slate-50">
          <tr className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
            <th className="px-5 py-4">Class</th>
            <th className="px-5 py-4">
              Class Teacher
            </th>
            <th className="px-5 py-4">
              Students
            </th>
            <th className="px-5 py-4">
              Capacity
            </th>
            <th className="px-5 py-4">Room</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4 text-right">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {classes.map((schoolClass) => (
            <ClassRow
              key={schoolClass.id}
              schoolClass={schoolClass}
            />
          ))}
        </tbody>
      </table>

      {classes.length === 0 && (
        <div className="p-12 text-center">
          <BookOpen
            size={42}
            className="mx-auto text-slate-300"
          />

          <h3 className="mt-4 font-semibold text-slate-700">
            No classes found
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Try changing your search or filters.
          </p>
        </div>
      )}
    </div>
  );
}

export default ClassTable;