import { X } from "lucide-react";

import type {
  AnnouncementAudience,
  AnnouncementFormData,
  AnnouncementPriority,
  AnnouncementStatus,
} from "../types/announcement";

import { useClassesContext } from "../../classes/hooks/useClassesContext";

type AddAnnouncementModalProps = {
  isOpen: boolean;
  isEditing: boolean;
  formData: AnnouncementFormData;
  onClose: () => void;
  onSubmit: (
    event: React.FormEvent<HTMLFormElement>
  ) => void;
  onFormChange: (
    formData: AnnouncementFormData
  ) => void;
};

function AddAnnouncementModal({
  isOpen,
  isEditing,
  formData,
  onClose,
  onSubmit,
  onFormChange,
}: AddAnnouncementModalProps) {
  const { classes } = useClassesContext();

  if (!isOpen) {
    return null;
  }

  function handleAudienceChange(
    audience: AnnouncementAudience
  ) {
    onFormChange({
      ...formData,
      audience,
      classId:
        audience === "Class"
          ? formData.classId
          : null,
    });
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-4">
      <div className="max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {isEditing
                ? "Edit Announcement"
                : "Create Announcement"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Send information to students,
              parents, teachers or a class.
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
              placeholder="e.g. School Resumption Notice"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            />
          </div>

          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Message
            </label>

            <textarea
              required
              rows={5}
              value={formData.message}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  message: event.target.value,
                })
              }
              placeholder="Write your announcement..."
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Audience
            </label>

            <select
              value={formData.audience}
              onChange={(event) =>
                handleAudienceChange(
                  event.target
                    .value as AnnouncementAudience
                )
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
            >
              <option>Everyone</option>
              <option>Students</option>
              <option>Parents</option>
              <option>Teachers</option>
              <option>Class</option>
            </select>
          </div>

          {formData.audience === "Class" && (
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Class
              </label>

              <select
                required
                value={formData.classId ?? ""}
                onChange={(event) =>
                  onFormChange({
                    ...formData,
                    classId: event.target.value
                      ? Number(event.target.value)
                      : null,
                  })
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
          )}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Priority
            </label>

            <select
              value={formData.priority}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  priority:
                    event.target
                      .value as AnnouncementPriority,
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
            >
              <option>Normal</option>
              <option>Important</option>
              <option>Urgent</option>
            </select>
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
                      .value as AnnouncementStatus,
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
            >
              <option>Draft</option>
              <option>Published</option>
              <option>Archived</option>
            </select>
          </div>

          {formData.status === "Published" && (
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Published Date
              </label>

              <input
                type="date"
                value={formData.publishedDate}
                onChange={(event) =>
                  onFormChange({
                    ...formData,
                    publishedDate:
                      event.target.value,
                  })
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
              />
            </div>
          )}

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Created By
            </label>

            <input
              required
              value={formData.createdBy}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  createdBy: event.target.value,
                })
              }
              placeholder="Administrator"
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
                ? "Update Announcement"
                : "Save Announcement"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddAnnouncementModal;