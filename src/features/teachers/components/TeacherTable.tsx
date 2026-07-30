import { Users } from "lucide-react";
import type { Teacher } from "../types/teacher";
import TeacherRow from "./TeacherRow";

type TeacherTableProps = {
  teachers: Teacher[];
};

function TeacherTable({
  teachers,
}: TeacherTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-slate-50">
          <tr className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
            <th className="px-5 py-4">Teacher</th>
            <th className="px-5 py-4">Department</th>
            <th className="px-5 py-4">Subject</th>
            <th className="px-5 py-4">Contact</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4">Login Account</th>

            <th className="px-5 py-4 text-right">
              Action
            </th>
            <th className="px-5 py-4 text-right">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {teachers.map((teacher) => (
            <TeacherRow
              key={teacher.id}
              teacher={teacher}
            />
          ))}
        </tbody>
      </table>

      {teachers.length === 0 && (
        <div className="p-12 text-center">
          <Users
            size={42}
            className="mx-auto text-slate-300"
          />

          <h3 className="mt-4 font-semibold text-slate-700">
            No teachers found
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Try changing your search or filters.
          </p>
        </div>
      )}
    </div>
  );
}

export default TeacherTable;