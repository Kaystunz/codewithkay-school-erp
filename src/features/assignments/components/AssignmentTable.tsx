import {
  ClipboardList,
  Eye,
  Pencil,
  Trash2,
} from "lucide-react";
import { Link } from "react-router-dom";

import type { Assignment } from "../types/assignment";
import { useClassesContext } from "../../classes/hooks/useClassesContext";
import { useTeachersContext } from "../../teachers/hooks/useTeachersContext";
import { useAssignmentsContext } from "../hooks/useAssignmentsContext";

type AssignmentTableProps = {
  assignments: Assignment[];
};

function AssignmentTable({
  assignments,
}: AssignmentTableProps) {
  const { classes } = useClassesContext();
  const { teachers } = useTeachersContext();

  const {
    startEditingAssignment,
    deleteAssignment,
  } = useAssignmentsContext();

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead className="bg-slate-50">
          <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
            <th className="px-5 py-4">Assignment</th>
            <th className="px-5 py-4">Class</th>
            <th className="px-5 py-4">Subject</th>
            <th className="px-5 py-4">Teacher</th>
            <th className="px-5 py-4">Due Date</th>
            <th className="px-5 py-4">Marks</th>
            <th className="px-5 py-4">Status</th>
            <th className="px-5 py-4 text-right">
              Action
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-slate-100">
          {assignments.map((assignment) => {
            const schoolClass = classes.find(
              (item) => item.id === assignment.classId
            );

            const teacher = teachers.find(
              (item) => item.id === assignment.teacherId
            );

            return (
              <tr
                key={assignment.id}
                className="hover:bg-slate-50"
              >
                <td className="px-5 py-4">
                  <p className="font-semibold text-slate-900">
                    {assignment.title}
                  </p>

                  <p className="mt-1 max-w-xs truncate text-sm text-slate-500">
                    {assignment.description || "No description"}
                  </p>
                </td>

                <td className="px-5 py-4 text-slate-600">
                  {schoolClass
                    ? `${schoolClass.name} ${schoolClass.section}`
                    : "Unknown class"}
                </td>

                <td className="px-5 py-4 text-slate-600">
                  {assignment.subject}
                </td>

                <td className="px-5 py-4 text-slate-600">
                  {teacher?.name ?? "Not assigned"}
                </td>

                <td className="px-5 py-4 text-slate-600">
                  {assignment.dueDate}
                </td>

                <td className="px-5 py-4 font-semibold text-slate-800">
                  {assignment.totalMarks}
                </td>

                <td className="px-5 py-4">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      assignment.status === "Published"
                        ? "bg-emerald-100 text-emerald-700"
                        : assignment.status === "Closed"
                          ? "bg-slate-200 text-slate-700"
                          : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {assignment.status}
                  </span>
                </td>

                <td className="px-5 py-4">
                  <div className="flex justify-end gap-2">
                    <Link
                      to={`/assignments/${assignment.id}`}
                      className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-700"
                      title="View assignment"
                    >
                      <Eye size={18} />
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        startEditingAssignment(
                          assignment
                        )
                      }
                      className="rounded-lg p-2 text-slate-500 hover:bg-teal-50 hover:text-teal-700"
                      title="Edit assignment"
                    >
                      <Pencil size={18} />
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        deleteAssignment(
                          assignment.id
                        )
                      }
                      className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                      title="Delete assignment"
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

      {assignments.length === 0 && (
        <div className="p-12 text-center">
          <ClipboardList
            size={42}
            className="mx-auto text-slate-300"
          />

          <h3 className="mt-4 font-semibold text-slate-700">
            No assignments found
          </h3>

          <p className="mt-2 text-sm text-slate-500">
            Try changing your search or filters.
          </p>
        </div>
      )}
    </div>
  );
}

export default AssignmentTable;