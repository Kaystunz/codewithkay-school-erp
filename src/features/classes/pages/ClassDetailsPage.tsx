import { useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  DoorOpen,
  GraduationCap,
  UserRound,
  Users,
} from "lucide-react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import ConfirmDialog from "../../../components/ui/ConfirmDialog";
import { useToast } from "../../../components/ui/toast/useToast";

import { useClassesContext } from "../hooks/useClassesContext";
import { useTeachersContext } from "../../teachers/hooks/useTeachersContext";
import { useStudentsContext } from "../../students/hooks/useStudentsContext";

function ClassDetailsPage() {
  const { classId } = useParams();
  const navigate = useNavigate();

  const { showToast } = useToast();

  const {
    classes,
    startEditing,
    deleteClass,
  } = useClassesContext();

  const { teachers } = useTeachersContext();
  const { students } = useStudentsContext();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
    useState(false);

  const schoolClass = classes.find(
    (currentClass) =>
      currentClass.id === Number(classId)
  );

  if (!schoolClass) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <BookOpen
          size={48}
          className="mx-auto text-slate-300"
        />

        <h2 className="mt-4 text-xl font-bold text-slate-900">
          Class not found
        </h2>

        <p className="mt-2 text-slate-500">
          The class record you are looking for does not exist.
        </p>

        <Link
          to="/classes"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800"
        >
          <ArrowLeft size={18} />
          Back to Classes
        </Link>
      </div>
    );
  }

  const currentClass = schoolClass;

  const classTeacher = teachers.find(
    (teacher) =>
      teacher.id === currentClass.classTeacherId
  );

  const linkedStudents = students.filter(
    (student) =>
      currentClass.studentIds.includes(student.id)
  );

  function handleDelete() {
    deleteClass(currentClass.id);

    setIsDeleteDialogOpen(false);

    showToast({
      type: "success",
      message: `${currentClass.name} ${currentClass.section} was deleted successfully.`,
    });

    navigate("/classes");
  }

  return (
    <div className="space-y-6">
      <Link
        to="/classes"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-teal-700"
      >
        <ArrowLeft size={18} />
        Back to Classes
      </Link>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {currentClass.name} {currentClass.section}
            </h1>

            <p className="mt-2 text-slate-500">
              {currentClass.academicSession}
            </p>

            <span
              className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                currentClass.status === "Active"
                  ? "bg-emerald-100 text-emerald-700"
                  : "bg-slate-100 text-slate-600"
              }`}
            >
              {currentClass.status}
            </span>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                startEditing(currentClass);
                navigate("/classes");
              }}
              className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Edit Class
            </button>

            <button
              type="button"
              onClick={() =>
                setIsDeleteDialogOpen(true)
              }
              className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700"
            >
              Delete Class
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Class Information
          </h2>

          <div className="mt-5 space-y-5">
            <InfoItem
              icon={<UserRound size={19} />}
              label="Class Teacher"
              value={
                classTeacher
                  ? classTeacher.name
                  : "Not assigned"
              }
            />

            <InfoItem
              icon={<DoorOpen size={19} />}
              label="Room"
              value={
                currentClass.room || "Not assigned"
              }
            />

            <InfoItem
              icon={<Users size={19} />}
              label="Students"
              value={`${linkedStudents.length} / ${currentClass.capacity}`}
            />

            <InfoItem
              icon={<GraduationCap size={19} />}
              label="Academic Session"
              value={currentClass.academicSession}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Subjects
          </h2>

          {currentClass.subjects.length > 0 ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {currentClass.subjects.map(
                (subject) => (
                  <span
                    key={subject}
                    className="rounded-full bg-teal-50 px-3 py-2 text-sm font-semibold text-teal-700"
                  >
                    {subject}
                  </span>
                )
              )}
            </div>
          ) : (
            <p className="mt-5 text-sm text-slate-500">
              No subjects assigned.
            </p>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900">
            Students in this class
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Students currently assigned to this class.
          </p>
        </div>

        {linkedStudents.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {linkedStudents.map((student) => (
              <div
                key={student.id}
                className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold text-slate-900">
                    {student.name}
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    {student.admissionNumber} ·{" "}
                    {student.className}
                  </p>
                </div>

                <Link
                  to={`/students/${student.id}`}
                  className="text-sm font-semibold text-teal-700 hover:text-teal-800"
                >
                  View Student
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-10 text-center">
            <Users
              size={40}
              className="mx-auto text-slate-300"
            />

            <p className="mt-3 font-semibold text-slate-700">
              No students assigned
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Edit this class to assign students.
            </p>
          </div>
        )}
      </section>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        title="Delete class?"
        message={`Are you sure you want to delete ${currentClass.name} ${currentClass.section}? This action cannot be undone.`}
        confirmText="Delete Class"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() =>
          setIsDeleteDialogOpen(false)
        }
      />
    </div>
  );
}

type InfoItemProps = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

function InfoItem({
  icon,
  label,
  value,
}: InfoItemProps) {
  return (
    <div className="flex gap-3">
      <div className="mt-1 text-teal-700">
        {icon}
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </p>

        <p className="mt-1 font-medium text-slate-700">
          {value}
        </p>
      </div>
    </div>
  );
}

export default ClassDetailsPage;