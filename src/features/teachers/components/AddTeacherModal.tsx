import { X } from "lucide-react";
import type {
  TeacherFormData,
  TeacherGender,
  TeacherStatus,
} from "../types/teacher";

type AddTeacherModalProps = {
  isOpen: boolean;
  isEditing: boolean;
  formData: TeacherFormData;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onFormChange: (formData: TeacherFormData) => void;
};

function AddTeacherModal({
  isOpen,
  isEditing,
  formData,
  onClose,
  onSubmit,
  onFormChange,
}: AddTeacherModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4">
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="sticky top-0 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {isEditing ? "Edit Teacher" : "Add Teacher"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Enter the teacher's employment and contact details.
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
              Teacher name
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
              Staff ID
            </label>

            <input
              required
              value={formData.staffId}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  staffId: event.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Department
            </label>

            <input
              required
              value={formData.department}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  department: event.target.value,
                })
              }
              placeholder="e.g. Science"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Subject
            </label>

            <input
              required
              value={formData.subject}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  subject: event.target.value,
                })
              }
              placeholder="e.g. Mathematics"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Gender
            </label>

            <select
              value={formData.gender}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  gender: event.target.value as TeacherGender,
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
            >
              <option>Male</option>
              <option>Female</option>
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
              Email address
            </label>

            <input
              required
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
              Qualification
            </label>

            <input
              value={formData.qualification}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  qualification: event.target.value,
                })
              }
              placeholder="e.g. B.Ed Mathematics"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Employment date
            </label>

            <input
              type="date"
              value={formData.employmentDate}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  employmentDate: event.target.value,
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
                  status: event.target.value as TeacherStatus,
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
            >
              <option>Active</option>
              <option>Inactive</option>
              <option>On Leave</option>
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
              {isEditing ? "Update Teacher" : "Save Teacher"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTeacherModal;