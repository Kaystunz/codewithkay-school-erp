import { X } from "lucide-react";

import type { FeeFormData } from "../types/fee";

import { useClassesContext } from "../../classes/hooks/useClassesContext";
import { useStudentsContext } from "../../students/hooks/useStudentsContext";

type AddFeeModalProps = {
  isOpen: boolean;
  isEditing: boolean;
  formData: FeeFormData;
  onClose: () => void;
  onSubmit: (
    event: React.FormEvent<HTMLFormElement>
  ) => void;
  onFormChange: (
    formData: FeeFormData
  ) => void;
};

function AddFeeModal({
  isOpen,
  isEditing,
  formData,
  onClose,
  onSubmit,
  onFormChange,
}: AddFeeModalProps) {
  const { classes } = useClassesContext();
  const { students } = useStudentsContext();

  if (!isOpen) {
    return null;
  }

  const selectedClass = classes.find(
    (schoolClass) =>
      schoolClass.id === formData.classId
  );

  const classStudents = selectedClass
    ? students.filter((student) =>
        selectedClass.studentIds.includes(
          student.id
        )
      )
    : [];

  function handleClassChange(classId: number) {
    onFormChange({
      ...formData,
      classId,
      studentId: 0,
    });
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {isEditing ? "Edit Fee" : "Add Fee"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Create and manage student fee obligations.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Close modal"
          >
            <X size={22} />
          </button>
        </div>

        <form
          onSubmit={onSubmit}
          className="grid gap-5 p-6 sm:grid-cols-2"
        >
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Class
            </label>

            <select
              required
              value={formData.classId || ""}
              onChange={(event) =>
                handleClassChange(
                  Number(event.target.value)
                )
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
            >
              <option value="">Select class</option>

              {classes.map((schoolClass) => (
                <option
                  key={schoolClass.id}
                  value={schoolClass.id}
                >
                  {schoolClass.name}{" "}
                  {schoolClass.section}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Student
            </label>

            <select
              required
              disabled={!selectedClass}
              value={formData.studentId || ""}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  studentId: Number(
                    event.target.value
                  ),
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none disabled:bg-slate-100"
            >
              <option value="">
                Select student
              </option>

              {classStudents.map((student) => (
                <option
                  key={student.id}
                  value={student.id}
                >
                  {student.name} -{" "}
                  {student.admissionNumber}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Fee Type
            </label>

            <input
              required
              value={formData.feeType}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  feeType: event.target.value,
                })
              }
              placeholder="e.g. Tuition"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Term
            </label>

            <select
              value={formData.term}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  term: event.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
            >
              <option>First Term</option>
              <option>Second Term</option>
              <option>Third Term</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Academic Session
            </label>

            <input
              required
              value={formData.academicSession}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  academicSession:
                    event.target.value,
                })
              }
              placeholder="2026/2027"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Due Date
            </label>

            <input
              required
              type="date"
              value={formData.dueDate}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  dueDate: event.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Amount Due
            </label>

            <input
              required
              type="number"
              min="1"
              value={formData.amountDue}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  amountDue: Number(
                    event.target.value
                  ),
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Amount Already Paid
            </label>

            <input
              type="number"
              min="0"
              value={formData.amountPaid}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  amountPaid: Number(
                    event.target.value
                  ),
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 border-t border-slate-200 pt-5 sm:col-span-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800"
            >
              {isEditing
                ? "Update Fee"
                : "Save Fee"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddFeeModal;