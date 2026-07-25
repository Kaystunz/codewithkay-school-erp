import { Eye, Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import type { Parent } from "../types/parents";
import { useParentsContext } from "../hooks/useParentsContext";

type ParentRowProps = {
  parent: Parent;
};

function ParentRow({ parent }: ParentRowProps) {
  const { startEditing } = useParentsContext();

  const initials = parent.name
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
              {parent.name}
            </p>

            <p className="text-sm text-slate-500">
              {parent.relationship}
            </p>
          </div>
        </div>
      </td>

      <td className="px-5 py-4 text-slate-600">
        {parent.occupation || "Not provided"}
      </td>

      <td className="px-5 py-4">
        <div>
          <p className="text-slate-700">
            {parent.phone}
          </p>

          <p className="text-sm text-slate-500">
            {parent.email || "No email"}
          </p>
        </div>
      </td>

      <td className="px-5 py-4 text-slate-600">
        {parent.studentIds.length}
      </td>

      <td className="px-5 py-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            parent.status === "Active"
              ? "bg-emerald-100 text-emerald-700"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {parent.status}
        </span>
      </td>

      <td className="px-5 py-4">
        <div className="flex justify-end gap-2">
          <Link
            to={`/parents/${parent.id}`}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-teal-50 hover:text-teal-700"
            title="View parent"
          >
            <Eye size={18} />
          </Link>

          <button
            type="button"
            onClick={() => startEditing(parent)}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-teal-50 hover:text-teal-700"
            title="Edit parent"
          >
            <Pencil size={18} />
          </button>
        </div>
      </td>
    </tr>
  );
}

export default ParentRow;