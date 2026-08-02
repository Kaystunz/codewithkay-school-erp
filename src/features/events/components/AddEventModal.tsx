import { X } from "lucide-react";

import type {
  EventAudience,
  EventFormData,
  EventStatus,
  EventType,
} from "../types/event";

import { useClassesContext } from "../../classes/hooks/useClassesContext";

type AddEventModalProps = {
  isOpen: boolean;
  isEditing: boolean;
  formData: EventFormData;
  onClose: () => void;
  onSubmit: (
    event: React.FormEvent<HTMLFormElement>
  ) => void;
  onFormChange: (
    formData: EventFormData
  ) => void;
};

function AddEventModal({
  isOpen,
  isEditing,
  formData,
  onClose,
  onSubmit,
  onFormChange,
}: AddEventModalProps) {
  const { classes } = useClassesContext();

  if (!isOpen) {
    return null;
  }

  function handleAudienceChange(
    audience: EventAudience
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
      <div className="max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {isEditing
                ? "Edit Event"
                : "Create Event"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Add school meetings, examinations,
              holidays, sports and celebrations.
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
              Event title
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
              placeholder="e.g. Parent-Teacher Meeting"
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
                  description:
                    event.target.value,
                })
              }
              placeholder="Describe the event..."
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Event type
            </label>

            <select
              value={formData.eventType}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  eventType:
                    event.target.value as EventType,
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
            >
              <option value="Academic">
                Academic
              </option>
              <option value="Meeting">
                Meeting
              </option>
              <option value="Holiday">
                Holiday
              </option>
              <option value="Examination">
                Examination
              </option>
              <option value="Sports">
                Sports
              </option>
              <option value="Celebration">
                Celebration
              </option>
              <option value="Other">
                Other
              </option>
            </select>
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
                    .value as EventAudience
                )
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
            >
              <option value="Everyone">
                Everyone
              </option>
              <option value="Staff">
                Staff
              </option>
              <option value="Parents">
                Parents
              </option>
              <option value="Students">
                Students
              </option>
              <option value="Class">
                Class
              </option>
            </select>
          </div>

          {formData.audience === "Class" && (
            <div className="sm:col-span-2">
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
                      ? Number(
                          event.target.value
                        )
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
              Start date
            </label>

            <input
              required
              type="date"
              value={formData.startDate}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  startDate:
                    event.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Start time
            </label>

            <input
              type="time"
              value={formData.startTime}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  startTime:
                    event.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              End date
            </label>

            <input
              type="date"
              value={formData.endDate}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  endDate:
                    event.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              End time
            </label>

            <input
              type="time"
              value={formData.endTime}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  endTime:
                    event.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Location
            </label>

            <input
              value={formData.location}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  location:
                    event.target.value,
                })
              }
              placeholder="e.g. School Hall"
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
                      .value as EventStatus,
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
            >
              <option value="Scheduled">
                Scheduled
              </option>
              <option value="Completed">
                Completed
              </option>
              <option value="Cancelled">
                Cancelled
              </option>
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Created by
            </label>

            <input
              required
              value={formData.createdBy}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  createdBy:
                    event.target.value,
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
                ? "Update Event"
                : "Save Event"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddEventModal;