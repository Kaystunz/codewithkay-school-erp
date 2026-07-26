import { X } from "lucide-react";

import type {
  ResultFormData,
  ResultStatus,
} from "../types/result";

import { useClassesContext } from "../../classes/hooks/useClassesContext";
import { useStudentsContext } from "../../students/hooks/useStudentsContext";
import { calculateGrade } from "../utils/grading";

type AddResultModalProps = {
  isOpen: boolean;
  isEditing: boolean;
  formData: ResultFormData;
  onClose: () => void;
  onSubmit: (
    event: React.FormEvent<HTMLFormElement>
  ) => void;
  onFormChange: (
    formData: ResultFormData
  ) => void;
};

function AddResultModal({
  isOpen,
  isEditing,
  formData,
  onClose,
  onSubmit,
  onFormChange,
}: AddResultModalProps) {
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

  const totalScore =
    formData.caScore + formData.examScore;

  const { grade, remark } =
    calculateGrade(totalScore);

  function handleClassChange(classId: number) {
    onFormChange({
      ...formData,
      classId,
      studentId: 0,
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
                ? "Edit Result"
                : "Add Result"}
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Enter the student's assessment and examination scores.
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
          {/* Class */}
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
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600"
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

          {/* Student */}
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

          {/* Subject */}
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

          {/* Term */}
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

          {/* Academic session */}
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

          {/* Status */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Result Status
            </label>

            <select
              value={formData.status}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  status:
                    event.target
                      .value as ResultStatus,
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none"
            >
              <option>Draft</option>
              <option>Published</option>
            </select>
          </div>

          {/* CA */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              CA Score
            </label>

            <input
              required
              type="number"
              min="0"
              max="40"
              value={formData.caScore}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  caScore: Number(
                    event.target.value
                  ),
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            />

            <p className="mt-1 text-xs text-slate-400">
              Maximum: 40
            </p>
          </div>

          {/* Exam */}
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Exam Score
            </label>

            <input
              required
              type="number"
              min="0"
              max="60"
              value={formData.examScore}
              onChange={(event) =>
                onFormChange({
                  ...formData,
                  examScore: Number(
                    event.target.value
                  ),
                })
              }
              className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600 focus:ring-4 focus:ring-teal-100"
            />

            <p className="mt-1 text-xs text-slate-400">
              Maximum: 60
            </p>
          </div>

          {/* Automatic preview */}
          <div className="sm:col-span-2">
            <div className="grid gap-4 rounded-2xl bg-slate-50 p-5 sm:grid-cols-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Total Score
                </p>

                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {totalScore}/100
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Grade
                </p>

                <p className="mt-2 text-2xl font-bold text-teal-700">
                  {grade}
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Remark
                </p>

                <p className="mt-2 font-semibold text-slate-700">
                  {remark}
                </p>
              </div>
            </div>
          </div>

          {/* Buttons */}
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
                ? "Update Result"
                : "Save Result"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddResultModal;