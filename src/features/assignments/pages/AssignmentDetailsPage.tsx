import { useState } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  ClipboardList,
  GraduationCap,
  UserRound,
} from "lucide-react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import ConfirmDialog from "../../../components/ui/ConfirmDialog";
import { useToast } from "../../../components/ui/toast/useToast";

import { useAssignmentsContext } from "../hooks/useAssignmentsContext";
import { useClassesContext } from "../../classes/hooks/useClassesContext";
import { useTeachersContext } from "../../teachers/hooks/useTeachersContext";
import { useStudentsContext } from "../../students/hooks/useStudentsContext";

function AssignmentDetailsPage() {
  const { assignmentId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();

  const {
    assignments,
    submissions,
    startEditingAssignment,
    deleteAssignment,
    gradeSubmission,
  } = useAssignmentsContext();

  const { classes } = useClassesContext();
  const { teachers } = useTeachersContext();
  const { students } = useStudentsContext();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
    useState(false);

  const [gradingSubmissionId, setGradingSubmissionId] =
    useState<number | null>(null);

  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");

  const assignment = assignments.find(
    (item) => item.id === Number(assignmentId)
  );

  if (!assignment) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <ClipboardList
          size={48}
          className="mx-auto text-slate-300"
        />

        <h2 className="mt-4 text-xl font-bold text-slate-900">
          Assignment not found
        </h2>

        <Link
          to="/assignments"
          className="mt-6 inline-flex rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white"
        >
          Back to Assignments
        </Link>
      </div>
    );
  }

  const currentAssignment = assignment;

  const schoolClass = classes.find(
    (item) => item.id === currentAssignment.classId
  );

  const teacher = teachers.find(
    (item) => item.id === currentAssignment.teacherId
  );

  const classStudents = schoolClass
    ? students.filter((student) =>
        schoolClass.studentIds.includes(student.id)
      )
    : [];

  function handleDelete() {
    deleteAssignment(currentAssignment.id);

    showToast({
      type: "success",
      message: "Assignment deleted successfully.",
    });

    navigate("/assignments");
  }

  function openGrading(submissionId: number) {
    const submission = submissions.find(
      (item) => item.id === submissionId
    );

    if (!submission) return;

    setGradingSubmissionId(submission.id);
    setScore(submission.score ?? 0);
    setFeedback(submission.feedback);
  }

  function handleGrade() {
    if (!gradingSubmissionId) return;

    const result = gradeSubmission(
      gradingSubmissionId,
      score,
      feedback
    );

    if (!result.success) {
      showToast({
        type: "error",
        message: result.message,
      });

      return;
    }

    showToast({
      type: "success",
      message: "Submission graded successfully.",
    });

    setGradingSubmissionId(null);
    setScore(0);
    setFeedback("");
  }

  return (
    <div className="space-y-6">
      <Link
        to="/assignments"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-teal-700"
      >
        <ArrowLeft size={18} />
        Back to Assignments
      </Link>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {currentAssignment.title}
            </h1>

            <p className="mt-2 max-w-2xl text-slate-500">
              {currentAssignment.description ||
                "No description provided."}
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              <span className="rounded-full bg-teal-50 px-3 py-1 text-sm font-semibold text-teal-700">
                {currentAssignment.subject}
              </span>

              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600">
                {currentAssignment.status}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                startEditingAssignment(currentAssignment);
                navigate("/assignments");
              }}
              className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Edit Assignment
            </button>

            <button
              type="button"
              onClick={() =>
                setIsDeleteDialogOpen(true)
              }
              className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700"
            >
              Delete Assignment
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <InfoCard
          icon={<GraduationCap size={20} />}
          label="Class"
          value={
            schoolClass
              ? `${schoolClass.name} ${schoolClass.section}`
              : "Unknown class"
          }
        />

        <InfoCard
          icon={<UserRound size={20} />}
          label="Teacher"
          value={teacher?.name ?? "Not assigned"}
        />

        <InfoCard
          icon={<CheckCircle2 size={20} />}
          label="Total Marks"
          value={String(currentAssignment.totalMarks)}
        />
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900">
            Student Submissions
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Review and grade submissions for this assignment.
          </p>
        </div>

        {classStudents.length === 0 ? (
          <div className="p-12 text-center">
            <GraduationCap
              size={42}
              className="mx-auto text-slate-300"
            />

            <p className="mt-4 font-semibold text-slate-700">
              No students assigned
            </p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {classStudents.map((student) => {
              const submission = submissions.find(
                (item) =>
                  item.assignmentId ===
                    currentAssignment.id &&
                  item.studentId === student.id
              );

              return (
                <div
                  key={student.id}
                  className="grid gap-4 p-5 lg:grid-cols-[1.2fr_1fr_1fr_auto]"
                >
                  <div>
                    <p className="font-semibold text-slate-900">
                      {student.name}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {student.admissionNumber}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-400">
                      Status
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {submission?.status ??
                        "Not Submitted"}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase text-slate-400">
                      Score
                    </p>

                    <p className="mt-1 font-semibold text-slate-800">
                      {submission?.score !== null &&
                      submission?.score !== undefined
                        ? `${submission.score}/${currentAssignment.totalMarks}`
                        : "Not graded"}
                    </p>
                  </div>

                  <div>
                    {submission &&
                    submission.status !==
                      "Not Submitted" ? (
                      <button
                        type="button"
                        onClick={() =>
                          openGrading(submission.id)
                        }
                        className="rounded-xl bg-teal-700 px-4 py-2 text-sm font-semibold text-white hover:bg-teal-800"
                      >
                        {submission.status === "Graded"
                          ? "Edit Grade"
                          : "Grade"}
                      </button>
                    ) : (
                      <span className="text-sm text-slate-400">
                        No submission
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {gradingSubmissionId && (
        <section className="rounded-2xl border border-teal-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Grade Submission
          </h2>

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Score
              </label>

              <input
                type="number"
                min="0"
                max={currentAssignment.totalMarks}
                value={score}
                onChange={(event) =>
                  setScore(Number(event.target.value))
                }
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">
                Feedback
              </label>

              <input
                value={feedback}
                onChange={(event) =>
                  setFeedback(event.target.value)
                }
                placeholder="Teacher feedback..."
                className="w-full rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-teal-600"
              />
            </div>
          </div>

          <div className="mt-5 flex justify-end gap-3">
            <button
              type="button"
              onClick={() =>
                setGradingSubmissionId(null)
              }
              className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleGrade}
              className="rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800"
            >
              Save Grade
            </button>
          </div>
        </section>
      )}

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        title="Delete assignment?"
        message={`Are you sure you want to delete "${currentAssignment.title}"? Its submissions will also be removed.`}
        confirmText="Delete Assignment"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() =>
          setIsDeleteDialogOpen(false)
        }
      />
    </div>
  );
}

type InfoCardProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function InfoCard({
  icon,
  label,
  value,
}: InfoCardProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="text-teal-700">
        {icon}
      </div>

      <p className="mt-3 text-xs font-semibold uppercase text-slate-400">
        {label}
      </p>

      <p className="mt-1 font-bold text-slate-900">
        {value}
      </p>
    </div>
  );
}

export default AssignmentDetailsPage;