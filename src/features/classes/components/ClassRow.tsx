import { Eye, Pencil } from "lucide-react";
import { Link } from "react-router-dom";

import type { SchoolClass } from "../types/class";
import { useClassesContext } from "../hooks/useClassesContext";
import { useTeachersContext } from "../../teachers/hooks/useTeachersContext";

type ClassRowProps = {
  schoolClass: SchoolClass;
};

function ClassRow({
  schoolClass,
}: ClassRowProps) {
  const { startEditing } = useClassesContext();
  const { teachers } = useTeachersContext();

  const classTeacher = teachers.find(
    (teacher) =>
      teacher.id === schoolClass.classTeacherId
  );

  return (
    <tr className="transition hover:bg-slate-50">
      <td className="px-5 py-4">
        <div>
          <p className="font-semibold text-slate-900">
            {schoolClass.name} {schoolClass.section}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            {schoolClass.academicSession}
          </p>
        </div>
      </td>

      <td className="px-5 py-4 text-slate-600">
        {classTeacher
          ? classTeacher.name
          : "Not assigned"}
      </td>

      <td className="px-5 py-4 text-slate-600">
        {schoolClass.studentIds.length}
      </td>

      <td className="px-5 py-4 text-slate-600">
        {schoolClass.capacity}
      </td>

      <td className="px-5 py-4 text-slate-600">
        {schoolClass.room || "Not assigned"}
      </td>

      <td className="px-5 py-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            schoolClass.status === "Active"
              ? "bg-emerald-100 text-emerald-700"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {schoolClass.status}
        </span>
      </td>

      <td className="px-5 py-4">
        <div className="flex justify-end gap-2">
          <Link
            to={`/classes/${schoolClass.id}`}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-teal-50 hover:text-teal-700"
            title="View class"
          >
            <Eye size={18} />
          </Link>

          <button
            type="button"
            onClick={() =>
              startEditing(schoolClass)
            }
            className="rounded-lg p-2 text-slate-500 transition hover:bg-teal-50 hover:text-teal-700"
            title="Edit class"
          >
            <Pencil size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default ClassRow;