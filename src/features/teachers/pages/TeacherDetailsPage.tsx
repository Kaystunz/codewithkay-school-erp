import { useState } from "react";
import { ArrowLeft, Mail, Phone, UserRound } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

import ConfirmDialog from "../../../components/ui/ConfirmDialog";
import { useToast } from "../../../components/ui/toast/useToast";
import { useTeachersContext } from "../hooks/useTeachersContext";


function TeacherDetailsPage() {
  const { teacherId } = useParams();
  const navigate = useNavigate();

  const { showToast } = useToast();

  const {
    teachers,
    startEditing,
    deleteTeacher,
  } = useTeachersContext();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
    useState(false);

  const teacher = teachers.find(
    (currentTeacher) =>
      currentTeacher.id === Number(teacherId)
  );

  if (!teacher) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <UserRound
          size={48}
          className="mx-auto text-slate-300"
        />

        <h2 className="mt-4 text-xl font-bold text-slate-900">
          Teacher not found
        </h2>

        <p className="mt-2 text-slate-500">
          The teacher record you are looking for does not exist.
        </p>

        <Link
          to="/teachers"
          className="mt-6 inline-flex rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800"
        >
          Back to Teachers
        </Link>
      </div>
    );
  }
  const currentTeacher = teacher;

function handleDelete() {
  deleteTeacher(currentTeacher.id);

  setIsDeleteDialogOpen(false);

  showToast({
    type: "success",
    message: `${currentTeacher.name} was deleted successfully.`,
  });

  navigate("/teachers");
}
  const initials = teacher.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="space-y-6">
      <Link
        to="/teachers"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-teal-700"
      >
        <ArrowLeft size={18} />
        Back to Teachers
      </Link>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-teal-100 text-2xl font-bold text-teal-700">
              {initials}
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                {teacher.name}
              </h1>

              <p className="mt-1 text-slate-500">
                {teacher.staffId}
              </p>

              <span
                className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                  teacher.status === "Active"
                    ? "bg-emerald-100 text-emerald-700"
                    : teacher.status === "On Leave"
                      ? "bg-amber-100 text-amber-700"
                      : "bg-slate-100 text-slate-600"
                }`}
              >
                {teacher.status}
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => {
                startEditing(teacher);
                navigate("/teachers");
              }}
              className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 hover:bg-slate-50"
            >
              Edit Teacher
            </button>

            <button
              type="button"
              onClick={() => setIsDeleteDialogOpen(true)}
              className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white hover:bg-red-700"
            >
              Delete Teacher
            </button>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Employment Information
          </h2>

          <div className="mt-5 space-y-4 text-sm">
            <DetailRow
              label="Department"
              value={teacher.department}
            />

            <DetailRow
              label="Subject"
              value={teacher.subject}
            />

            <DetailRow
              label="Qualification"
              value={teacher.qualification || "Not provided"}
            />

            <DetailRow
              label="Employment Date"
              value={teacher.employmentDate || "Not provided"}
            />

            <DetailRow
              label="Gender"
              value={teacher.gender}
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Contact Information
          </h2>

          <div className="mt-5 space-y-4">
            <div className="flex items-center gap-3">
              <Phone
                size={19}
                className="text-teal-700"
              />

              <div>
                <p className="text-xs font-semibold uppercase text-slate-400">
                  Phone
                </p>

                <p className="text-slate-700">
                  {teacher.phone}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Mail
                size={19}
                className="text-teal-700"
              />

              <div>
                <p className="text-xs font-semibold uppercase text-slate-400">
                  Email
                </p>

                <p className="text-slate-700">
                  {teacher.email}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        title="Delete teacher?"
        message={`Are you sure you want to delete ${teacher.name}? This action cannot be undone.`}
        confirmText="Delete Teacher"
        cancelText="Cancel"
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteDialogOpen(false)}
      />
    </div>
  );
}

type DetailRowProps = {
  label: string;
  value: string;
};

function DetailRow({
  label,
  value,
}: DetailRowProps) {
  return (
    <div className="flex items-center justify-between gap-4 border-b border-slate-100 pb-3 last:border-none">
      <span className="text-slate-500">
        {label}
      </span>

      <span className="text-right font-semibold text-slate-800">
        {value}
      </span>
    </div>
  );
}

export default TeacherDetailsPage;