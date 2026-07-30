import { Eye, Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import type { Teacher } from "../types/teacher";
import { useTeachersContext } from "../hooks/useTeachersContext";
import AccountStatusBadge from "../../accounts/components/AccountStatusBadge";

type TeacherRowProps = {
  teacher: Teacher;
};

function TeacherRow({ teacher }: TeacherRowProps) {
  const { startEditing } = useTeachersContext();

  const initials = teacher.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <tr className="transition hover:bg-slate-50">
      <td className="px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-teal-100 font-bold text-teal-700">
            {initials}
          </div>

          <div>
            <p className="font-semibold text-slate-900">
              {teacher.name}
            </p>

            <p className="text-sm text-slate-500">
              {teacher.staffId}
            </p>
          </div>
        </div>
      </td>

      <td className="px-5 py-4 text-slate-600">
        {teacher.department}
      </td>

      <td className="px-5 py-4 text-slate-600">
        {teacher.subject}
      </td>

      <td className="px-5 py-4">
        <div>
          <p className="text-slate-700">
            {teacher.phone}
          </p>

          <p className="text-sm text-slate-500">
            {teacher.email}
          </p>
        </div>
      </td>

      <td className="px-5 py-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            teacher.status === "Active"
              ? "bg-emerald-100 text-emerald-700"
              : teacher.status === "On Leave"
                ? "bg-amber-100 text-amber-700"
                : "bg-slate-100 text-slate-600"
          }`}
        >
          {teacher.status}
        </span>
      </td>

      <td className="px-5 py-4">
      <AccountStatusBadge
        role="Teacher"
        linkedRecordId={teacher.id}
      />
    </td>

      <td className="px-5 py-4">
        <div className="flex justify-end gap-2">
          <Link
            to={`/teachers/${teacher.id}`}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-teal-50 hover:text-teal-700"
            title="View teacher"
          >
            <Eye size={18} />
          </Link>

          <button
            type="button"
            onClick={() => startEditing(teacher)}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-teal-50 hover:text-teal-700"
            title="Edit teacher"
          >
            <Pencil size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default TeacherRow;