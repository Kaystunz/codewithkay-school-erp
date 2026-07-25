import { useState } from "react";
import {
  ArrowLeft,
  BriefcaseBusiness,
  GraduationCap,
  Mail,
  MapPin,
  Phone,
  Users,
} from "lucide-react";
import {
  Link,
  useNavigate,
  useParams,
} from "react-router-dom";

import ConfirmDialog from "../../../components/ui/ConfirmDialog";
import { useToast } from "../../../components/ui/toast/useToast";
import { useParentsContext } from "../hooks/useParentsContext";
import { useStudentsContext } from "../../students/hooks/useStudentsContext";

function ParentDetailsPage() {
  const { parentId } = useParams();
  const navigate = useNavigate();

  const { showToast } = useToast();

  const {
    parents,
    startEditing,
    deleteParent,
  } = useParentsContext();

  const { students } = useStudentsContext();

  const [isDeleteDialogOpen, setIsDeleteDialogOpen] =
    useState(false);

  const parent = parents.find(
    (currentParent) =>
      currentParent.id === Number(parentId)
  );

  if (!parent) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center shadow-sm">
        <Users
          size={48}
          className="mx-auto text-slate-300"
        />

        <h2 className="mt-4 text-xl font-bold text-slate-900">
          Parent not found
        </h2>

        <p className="mt-2 text-slate-500">
          The parent or guardian record you requested
          does not exist.
        </p>

        <Link
          to="/parents"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-teal-700 px-5 py-3 font-semibold text-white hover:bg-teal-800"
        >
          <ArrowLeft size={18} />
          Back to Parents
        </Link>
      </div>
    );
  }

  /*
   * We've already checked that parent exists.
   * Keeping this reference also prevents TypeScript
   * from complaining inside handleDelete().
   */
  const currentParent = parent;

  const linkedStudents = students.filter((student) =>
    currentParent.studentIds.includes(student.id)
  );

  function handleDelete() {
    deleteParent(currentParent.id);

    setIsDeleteDialogOpen(false);

    showToast({
      type: "success",
      message: `${currentParent.name} was deleted successfully.`,
    });

    navigate("/parents");
  }

  const initials = currentParent.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

  return (
    <div className="space-y-6">
      <Link
        to="/parents"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-teal-700"
      >
        <ArrowLeft size={18} />
        Back to Parents
      </Link>

      {/* Parent profile */}
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-teal-100 text-2xl font-bold text-teal-700">
              {initials}
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                {currentParent.name}
              </h1>

              <p className="mt-1 text-slate-500">
                {currentParent.relationship}
              </p>

              <span
                className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                  currentParent.status === "Active"
                    ? "bg-emerald-100 text-emerald-700"
                    : "bg-slate-100 text-slate-600"
                }`}
              >
                {currentParent.status}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => {
                startEditing(currentParent);
                navigate("/parents");
              }}
              className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Edit Parent
            </button>

            <button
              type="button"
              onClick={() =>
                setIsDeleteDialogOpen(true)
              }
              className="rounded-xl bg-red-600 px-5 py-3 font-semibold text-white transition hover:bg-red-700"
            >
              Delete Parent
            </button>
          </div>
        </div>
      </section>

      {/* Parent information */}
      <section className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Contact Information
          </h2>

          <div className="mt-5 space-y-5">
            <InfoItem
              icon={<Phone size={19} />}
              label="Phone"
              value={currentParent.phone}
            />

            <InfoItem
              icon={<Phone size={19} />}
              label="Alternate Phone"
              value={
                currentParent.alternatePhone ||
                "Not provided"
              }
            />

            <InfoItem
              icon={<Mail size={19} />}
              label="Email"
              value={
                currentParent.email || "Not provided"
              }
            />

            <InfoItem
              icon={<MapPin size={19} />}
              label="Address"
              value={
                currentParent.address || "Not provided"
              }
            />
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">
            Additional Information
          </h2>

          <div className="mt-5 space-y-5">
            <InfoItem
              icon={<Users size={19} />}
              label="Relationship"
              value={currentParent.relationship}
            />

            <InfoItem
              icon={<BriefcaseBusiness size={19} />}
              label="Occupation"
              value={
                currentParent.occupation ||
                "Not provided"
              }
            />

            <InfoItem
              icon={<GraduationCap size={19} />}
              label="Linked Students"
              value={String(linkedStudents.length)}
            />
          </div>
        </div>
      </section>

      {/* Linked students */}
      <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="border-b border-slate-200 p-6">
          <h2 className="text-lg font-bold text-slate-900">
            Linked Students
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Students associated with this parent or
            guardian.
          </p>
        </div>

        {linkedStudents.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {linkedStudents.map((student) => (
              <div
                key={student.id}
                className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-teal-50 font-bold text-teal-700">
                    {student.name
                      .split(" ")
                      .map((part) => part[0])
                      .join("")
                      .slice(0, 2)}
                  </div>

                  <div>
                    <p className="font-semibold text-slate-900">
                      {student.name}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {student.admissionNumber} ·{" "}
                      {student.className}
                    </p>
                  </div>
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
            <GraduationCap
              size={40}
              className="mx-auto text-slate-300"
            />

            <p className="mt-3 font-semibold text-slate-700">
              No students linked
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Edit this parent to link them to a student.
            </p>
          </div>
        )}
      </section>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        title="Delete parent?"
        message={`Are you sure you want to delete ${currentParent.name}? This action cannot be undone.`}
        confirmText="Delete Parent"
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

export default ParentDetailsPage;1  