import { X } from "lucide-react";

import type {
  ParentFormData,
  ParentRelationship,
  ParentStatus,
} from "../types/parents";

import { useStudentsContext } from "../../students/hooks/useStudentsContext";

type AddParentModalProps = {
  isOpen: boolean;
  isEditing: boolean;
  formData: ParentFormData;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onFormChange: (formData: ParentFormData) => void;
};

function AddParentModal({
  isOpen,
  isEditing,
  formData,
  onClose,
  onSubmit,
  onFormChange,
}: AddParentModalProps) {
  const { students } = useStudentsContext();

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

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {isEditing
                ? "Edit Parent or Guardian"
                : "Add Parent or Guardian"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Enter the parent details and link their children.
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
              Parent or guardian name
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
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Relationship
            </label>

            <select
              value={formData.relationship}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  relationship:
                    event.target.value as ParentRelationship,
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
            >
              <option>Father</option>
              <option>Mother</option>
              <option>Guardian</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Phone number
            </label>

            <input
              required
              value={formData.phone}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  phone: event.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Alternate phone
            </label>

            <input
              value={formData.alternatePhone}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  alternatePhone: event.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Email
            </label>

            <input
              type="email"
              value={formData.email}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  email: event.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Occupation
            </label>

            <input
              value={formData.occupation}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  occupation: event.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Address
            </label>

            <textarea
              rows={3}
              value={formData.address}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  address: event.target.value,
                })
              }
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-3 block text-sm font-semibold text-slate-700">
              Linked students
            </label>

            <div className="max-h-56 space-y-2 overflow-y-auto rounded-2xl border border-slate-200 p-3">
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
                    event.target.value as ParentStatus,
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
                ? "Update Parent"
                : "Save Parent"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddParentModal;