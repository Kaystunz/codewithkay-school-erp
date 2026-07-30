import { GraduationCap } from "lucide-react";
import type { Student } from "../types/student";
import StudentRow from "./StudentRow";

type StudentTableProps = {
  students: Student[];
};

function StudentTable({ students }: StudentTableProps) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-slate-50">
          <tr className="text-left text-xs font-semibold uppercase tracking-wider text-slate-500">
            <th className="px-5 py-4">Student</th>
            <th className="px-5 py-4">Class</th>
            <th className="px-5 py-4">Parent</th>
            <th className="px-5 py-4">Contact</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4">Login Account</th>
            <th className="px-5 py-4 text-right">Action</th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {students.map((student) => (
            <StudentRow key={student.id} student={student} />
          ))}
        </tbody>
      </table>

      {students.length === 0 && (
        <div className="p-12 text-center">
          <GraduationCap
            size={42}
            className="mx-auto text-slate-300"
          />

          <h3 className="mt-4 font-semibold text-slate-700">
            No students found
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Try changing your search or filter.
          </p>
        </div>
      )}
    </div>
  );
}

export default StudentTable;