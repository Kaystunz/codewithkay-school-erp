import { X } from "lucide-react";

import type {
  TimetableFormData,
  Weekday,
} from "../types/timetable";

import { useClassesContext } from "../../classes/hooks/useClassesContext";
import { useTeachersContext } from "../../teachers/hooks/useTeachersContext";

type AddTimetableModalProps = {
  isOpen: boolean;
  isEditing: boolean;
  formData: TimetableFormData;
  onClose: () => void;
  onSubmit: (
    event: React.FormEvent<HTMLFormElement>
  ) => void;
  onFormChange: (
    formData: TimetableFormData
  ) => void;
};

function AddTimetableModal({
  isOpen,
  isEditing,
  formData,
  onClose,
  onSubmit,
  onFormChange,
}: AddTimetableModalProps) {
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
      <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-900">
              {isEditing
                ? "Edit Timetable Entry"
                : "Add Timetable Entry"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Assign a subject, teacher and time slot.
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
              <option value="">Select subject</option>

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
              Day
            </label>

            <select
              value={formData.day}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  day: event.target.value as Weekday,
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
            >
              <option>Monday</option>
              <option>Tuesday</option>
              <option>Wednesday</option>
              <option>Thursday</option>
              <option>Friday</option>
            </select>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Start Time
            </label>

            <input
              required
              type="time"
              value={formData.startTime}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  startTime: event.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              End Time
            </label>

            <input
              required
              type="time"
              value={formData.endTime}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  endTime: event.target.value,
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
            />
          </div>

          <div className="sm:col-span-2">
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
                ? "Update Entry"
                : "Save Entry"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddTimetableModal;