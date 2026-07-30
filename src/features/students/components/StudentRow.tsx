import { Mail, MoreHorizontal, Phone } from "lucide-react";
import type { Student } from "../types/student";
import { useNavigate } from "react-router-dom";
import { useStudentsContext } from "../hooks/useStudentsContext";
import AccountStatusBadge from "../../accounts/components/AccountStatusBadge";

type StudentRowProps = {
  student: Student;
};

function StudentRow({ student }: StudentRowProps) {
     const navigate = useNavigate();
    const { startEditing } = useStudentsContext();
  const initials = student.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
   <tr
     onClick={() => navigate(`/students/${student.id}`)}
    className="cursor-pointer transition hover:bg-slate-50"
    >
      <td className="px-5 py-5">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-100 font-bold text-teal-700">
            {initials}
          </div>

          <div>
            <p className="font-semibold text-slate-900">{student.name}</p>

            <p className="mt-1 text-sm text-slate-500">
              {student.admissionNumber}
            </p>
          </div>
        </div>
      </td>

      <td className="px-5 py-5 text-sm text-slate-600">
        {student.className}
      </td>

      <td className="px-5 py-5 text-sm text-slate-600">
        {student.parentName}
      </td>

      <td className="px-5 py-5">
        <div className="space-y-1 text-sm text-slate-500">
          <p className="flex items-center gap-2">
            <Phone size={15} />
            {student.phone}
          </p>

          <p className="flex items-center gap-2">
            <Mail size={15} />
            {student.email}
          </p>
        </div>
      </td>

      <td className="px-5 py-5">
        <span
          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
            student.status === "Active"
              ? "bg-emerald-100 text-emerald-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {student.status}
        </span>
      </td>

      <td className="px-5 py-5">
      <AccountStatusBadge
        role="Student"
        linkedRecordId={student.id}
      />
    </td>

      <td className="px-5 py-5 text-right">
            <button
        type="button"
        onClick={(event) => {
            event.stopPropagation();
            startEditing(student);
        }}
        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
        >
        <MoreHorizontal size={20} />
        </button>
      </td>
    </tr>
  );
}

export default StudentRow;