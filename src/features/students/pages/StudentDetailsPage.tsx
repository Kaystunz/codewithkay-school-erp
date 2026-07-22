import {
  ArrowLeft,
  GraduationCap,
  Mail,
  Phone,
  Trash2,
  User,
  Users,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useStudentsContext } from "../hooks/useStudentsContext";
import type { ReactNode } from "react";
import { useState } from "react";
import ConfirmDialog from "../../../components/ui/ConfirmDialog";
import { useToast } from "../../../components/ui/toast/useToast";


function StudentDetailsPage() {
  const { studentId } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToast();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
    useState(false);
 const { students, deleteStudent } =
  useStudentsContext();

const student = students.find(
  (currentStudent) => currentStudent.id === Number(studentId)
);

  if (!student) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <GraduationCap
          size={48}
          className="mx-auto text-slate-300"
        />

        <h1 className="mt-4 text-xl font-bold text-slate-900">
          Student not found
        </h1>

        <p className="mt-2 text-slate-500">
          The student record you requested does not exist.
        </p>

        <Link
          to="/students"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800"
        >
          <ArrowLeft size={18} />
          Back to students
        </Link>
      </div>
    );
  }



const handleDelete = () => {
  deleteStudent(student.id);
  setIsDeleteDialogOpen(false);

  showToast({
    type: "success",
    message: `${student.name} was deleted successfully.`,
  });

  navigate("/students");
};

  const initials = student.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="space-y-6">
      <Link
        to="/students"
        className="inline-flex items-center gap-2 font-semibold text-slate-600 transition hover:text-teal-700"
      >
        <ArrowLeft size={18} />
        Back to students
      </Link>

      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex flex-col gap-5 border-b border-slate-200 p-6 sm:flex-row sm:items-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-teal-100 text-2xl font-bold text-teal-700">
            {initials}
          </div>

          <div className="flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900">
                {student.name}
              </h1>

              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  student.status === "Active"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {student.status}
              </span>
            </div>

            <p className="mt-2 text-slate-500">
              {student.admissionNumber}
            </p>

            <button
            type="button"
            onClick={() => setIsDeleteDialogOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-red-200 px-4 py-2 font-semibold text-red-600 transition hover:bg-red-50"
          >
            <Trash2 size={18} />
            Delete Student
          </button>
          </div>
        </div>

        <div className="grid gap-5 p-6 md:grid-cols-2">
          <ProfileItem
            icon={<GraduationCap size={20} />}
            label="Class"
            value={student.className}
          />

          <ProfileItem
            icon={<User size={20} />}
            label="Gender"
            value={student.gender}
          />

          <ProfileItem
            icon={<Users size={20} />}
            label="Parent or guardian"
            value={student.parentName}
          />

          <ProfileItem
            icon={<Phone size={20} />}
            label="Phone number"
            value={student.phone}
          />

          <ProfileItem
            icon={<Mail size={20} />}
            label="Email address"
            value={student.email}
          />
        </div>
      </section>
       <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        title="Delete student?"
        message={`Are you sure you want to delete ${student.name}? This action cannot be undone.`}
        confirmText="Delete Student"
        onCancel={() => setIsDeleteDialogOpen(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}

type ProfileItemProps = {
  icon: ReactNode;
  label: string;
  value: string;
};

function ProfileItem({
  icon,
  label,
  value,
}: ProfileItemProps) {
  return (
    <div className="flex gap-4 rounded-xl bg-slate-50 p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-teal-700 shadow-sm">
        {icon}
      </div>

      <div>
        <p className="text-sm font-medium text-slate-500">
          {label}
        </p>

        <p className="mt-1 font-semibold text-slate-900">
          {value}
        </p>
      </div>
    </div>
  );
}

export default StudentDetailsPage;