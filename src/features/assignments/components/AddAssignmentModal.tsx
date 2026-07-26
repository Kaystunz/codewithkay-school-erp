import { X } from "lucide-react";

import type {
  AssignmentFormData,
  AssignmentStatus,
} from "../types/assignment";

import { useClassesContext } from "../../classes/hooks/useClassesContext";
import { useTeachersContext } from "../../teachers/hooks/useTeachersContext";

type AddAssignmentModalProps = {
  isOpen: boolean;
  isEditing: boolean;
  formData: AssignmentFormData;
  onClose: () => void;
  onSubmit: (
    event: React.FormEvent<HTMLFormElement>
  ) => void;
  onFormChange: (
    formData: AssignmentFormData
  ) => void;
};

function AddAssignmentModal({
  isOpen,
  isEditing,
  formData,
  onClose,
  onSubmit,
  onFormChange,
}: AddAssignmentModalProps) {
  const { classes } = useClassesContext();
  const { teachers } = useTeachersContext();

  if (!isOpen) {
    return null;
  }

  const selectedClass = classes.find(
    (schoolClass) =>
      schoolClass.id === formData.classId
  );

  function handleClassChange(classId: number) {
    onFormChange({
      ...formData,
      classId,
      subject: "",
    });
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {isEditing
                ? "Edit Assignment"
                : "Add Assignment"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Create homework or assignments for a class.
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
          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Title
            </label>

            <input
              required
              value={formData.title}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  title: event.target.value,
                })
              }
              placeholder="e.g. Fractions Practice"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Description
            </label>

            <textarea
              rows={4}
              value={formData.description}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  description: event.target.value,
                })
              }
              placeholder="Enter assignment instructions..."
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            />
          </div>

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
              <option value="">
                Select class
              </option>

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
              Subject
            </label>

            <select
              required
              disabled={!selectedClass}
              value={formData.subject}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  subject: event.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none disabled:bg-slate-100"
            >
              <option value="">
                Select subject
              </option>

              {selectedClass?.subjects.map(
                (subject) => (
                  <option
                    key={subject}
                    value={subject}
                  >
                    {subject}
                  </option>
                )
              )}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Teacher
            </label>

            <select
              required
              value={formData.teacherId ?? ""}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  teacherId: event.target.value
                    ? Number(event.target.value)
                    : null,
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
            >
              <option value="">
                Select teacher
              </option>

              {teachers.map((teacher) => (
                <option
                  key={teacher.id}
                  value={teacher.id}
                >
                  {teacher.name} - {teacher.subject}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Total Marks
            </label>

            <input
              required
              type="number"
              min="1"
              value={formData.totalMarks}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  totalMarks: Number(
                    event.target.value
                  ),
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Assigned Date
            </label>

            <input
              required
              type="date"
              value={formData.assignedDate}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  assignedDate:
                    event.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
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
                  dueDate:
                    event.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Status
            </label>

            <select
              value={formData.status}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  status:
                    event.target
                      .value as AssignmentStatus,
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
            >
              <option>Draft</option>
              <option>Published</option>
              <option>Closed</option>
            </select>
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
                ? "Update Assignment"
                : "Save Assignment"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddAssignmentModal;