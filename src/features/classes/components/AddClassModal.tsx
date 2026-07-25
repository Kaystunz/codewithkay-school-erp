import { X } from "lucide-react";

import type {
  ClassFormData,
  ClassStatus,
} from "../types/class";

import { useStudentsContext } from "../../students/hooks/useStudentsContext";
import { useTeachersContext } from "../../teachers/hooks/useTeachersContext";

type AddClassModalProps = {
  isOpen: boolean;
  isEditing: boolean;
  formData: ClassFormData;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onFormChange: (formData: ClassFormData) => void;
};

function AddClassModal({
  isOpen,
  isEditing,
  formData,
  onClose,
  onSubmit,
  onFormChange,
}: AddClassModalProps) {
  const { students } = useStudentsContext();
  const { teachers } = useTeachersContext();

  if (!isOpen) {
    return null;
  }

  function handleStudentToggle(studentId: number) {
    const isSelected =
      formData.studentIds.includes(studentId);

    const updatedStudentIds = isSelected
      ? formData.studentIds.filter(
          (id) => id !== studentId
        )
      : [...formData.studentIds, studentId];

    onFormChange({
      ...formData,
      studentIds: updatedStudentIds,
    });
  }

  function handleSubjectChange(value: string) {
    const subjects = value
      .split(",")
      .map((subject) => subject.trim())
      .filter(Boolean);

    onFormChange({
      ...formData,
      subjects,
    });
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {isEditing ? "Edit Class" : "Add Class"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Manage class details, teacher, students and subjects.
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
              Class name
            </label>

            <input
              required
              value={formData.name}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  name: event.target.value,
                })
              }
              placeholder="e.g. Year 4"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Section
            </label>

            <input
              required
              value={formData.section}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  section: event.target.value,
                })
              }
              placeholder="e.g. A"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Class teacher
            </label>

            <select
              value={formData.classTeacherId ?? ""}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  classTeacherId: event.target.value
                    ? Number(event.target.value)
                    : null,
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
            >
              <option value="">Not assigned</option>

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
              Capacity
            </label>

            <input
              required
              type="number"
              min="1"
              value={formData.capacity}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  capacity: Number(event.target.value),
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Academic session
            </label>

            <input
              required
              value={formData.academicSession}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  academicSession: event.target.value,
                })
              }
              placeholder="2026/2027"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Room
            </label>

            <input
              value={formData.room}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  room: event.target.value,
                })
              }
              placeholder="e.g. Room 104"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Subjects
            </label>

            <input
              value={formData.subjects.join(", ")}
              onChange={(event) =>
                handleSubjectChange(event.target.value)
              }
              placeholder="English Language, Mathematics, ICT"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            />

            <p className="mt-2 text-xs text-slate-500">
              Separate subjects with commas.
            </p>
          </div>

          <div className="sm:col-span-2">
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              Assigned students
            </label>

            <div className="max-h-60 space-y-2 overflow-y-auto rounded-2xl border border-slate-200 p-3">
              {students.length === 0 ? (
                <p className="p-3 text-sm text-slate-500">
                  No students are available.
                </p>
              ) : (
                students.map((student) => (
                  <label
                    key={student.id}
                    className="flex cursor-pointer items-center gap-3 rounded-xl p-3 transition hover:bg-slate-50"
                  >
                    <input
                      type="checkbox"
                      checked={formData.studentIds.includes(
                        student.id
                      )}
                      onChange={() =>
                        handleStudentToggle(student.id)
                      }
                      className="h-4 w-4 accent-teal-700"
                    />

                    <div>
                      <p className="font-semibold text-slate-800">
                        {student.name}
                      </p>

                      <p className="text-sm text-slate-500">
                        {student.admissionNumber} ·{" "}
                        {student.className}
                      </p>
                    </div>
                  </label>
                ))
              )}
            </div>

            <p className="mt-2 text-xs text-slate-500">
              {formData.studentIds.length} of{" "}
              {formData.capacity} students assigned.
            </p>
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
                    event.target.value as ClassStatus,
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
            >
              <option>Active</option>
              <option>Inactive</option>
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
                ? "Update Class"
                : "Save Class"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddClassModal;