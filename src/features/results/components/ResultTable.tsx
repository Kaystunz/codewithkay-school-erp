import { FileText, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

import type { ResultRecord } from "../types/result";
import { useStudentsContext } from "../../students/hooks/useStudentsContext";
import { useClassesContext } from "../../classes/hooks/useClassesContext";
import { useResultsContext } from "../hooks/useResultsContext";

import ConfirmDialog from "../../../components/ui/ConfirmDialog";
import { useToast } from "../../../components/ui/toast/useToast";

type ResultTableProps = {
  results: ResultRecord[];
};

function ResultTable({
  results,
}: ResultTableProps) {
  const { students } = useStudentsContext();
  const { classes } = useClassesContext();

  const {
    startEditing,
    deleteResult,
  } = useResultsContext();

  const { showToast } = useToast();

  const [
    resultToDelete,
    setResultToDelete,
  ] = useState<ResultRecord | null>(null);

  function handleDelete() {
    if (!resultToDelete) {
      return;
    }

    const student = students.find(
      (item) =>
        item.id === resultToDelete.studentId
    );

    deleteResult(resultToDelete.id);

    showToast({
      type: "success",
      message: `${
        student?.name ?? "Student"
      }'s ${resultToDelete.subject} result was deleted successfully.`,
    });

    setResultToDelete(null);
  }

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-slate-50">
            <tr className="text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
              <th className="px-5 py-4">
                Student
              </th>

              <th className="px-5 py-4">
                Class
              </th>

              <th className="px-5 py-4">
                Subject
              </th>

              <th className="px-5 py-4">
                CA
              </th>

              <th className="px-5 py-4">
                Exam
              </th>

              <th className="px-5 py-4">
                Total
              </th>

              <th className="px-5 py-4">
                Grade
              </th>

              <th className="px-5 py-4">
                Status
              </th>

              <th className="px-5 py-4 text-right">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {results.map((result) => {
              const student = students.find(
                (item) =>
                  item.id === result.studentId
              );

              const schoolClass = classes.find(
                (item) =>
                  item.id === result.classId
              );

              return (
                <tr
                  key={result.id}
                  className="hover:bg-slate-50"
                >
                  <td className="px-5 py-4 font-semibold text-slate-900">
                    {student?.name ??
                      "Unknown student"}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {schoolClass
                      ? `${schoolClass.name} ${schoolClass.section}`
                      : "Unknown class"}
                  </td>

                  <td className="px-5 py-4 text-slate-600">
                    {result.subject}
                  </td>

                  <td className="px-5 py-4">
                    {result.caScore}
                  </td>

                  <td className="px-5 py-4">
                    {result.examScore}
                  </td>

                  <td className="px-5 py-4 font-bold text-slate-900">
                    {result.totalScore}
                  </td>

                  <td className="px-5 py-4">
                    <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-bold text-teal-700">
                      {result.grade}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        result.status ===
                        "Published"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {result.status}
                    </span>
                  </td>

                  <td className="px-5 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          startEditing(result)
                        }
                        className="rounded-lg p-2 text-slate-500 hover:bg-teal-50 hover:text-teal-700"
                        title="Edit result"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          setResultToDelete(
                            result
                          )
                        }
                        className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                        title="Delete result"
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

        {results.length === 0 && (
          <div className="p-12 text-center">
            <FileText
              size={42}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-4 font-semibold text-slate-700">
              No results found
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Try changing your search or
              filters.
            </p>
          </div>
        )}
      </div>

      <ConfirmDialog
        isOpen={resultToDelete !== null}
        title="Delete result?"
        message={
          resultToDelete
            ? `Are you sure you want to delete this ${resultToDelete.subject} result? This action cannot be undone.`
            : ""
        }
        confirmText="Delete Result"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() =>
          setResultToDelete(null)
        }
      />
    </>
  );
}

export default ResultTable;