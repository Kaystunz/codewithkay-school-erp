import {
  GraduationCap,
  UserCheck,
  UserRound,
} from "lucide-react";

type StudentStatsProps = {
  totalStudents: number;
  activeStudents: number;
  inactiveStudents: number;
};

function StudentStats({
  totalStudents,
  activeStudents,
  inactiveStudents,
}: StudentStatsProps) {
  return (
    <section className="grid gap-5 sm:grid-cols-3">
      <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Total students
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {totalStudents}
            </p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-teal-50 text-teal-700">
            <GraduationCap size={24} />
          </div>
        </div>
      </article>

      <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Active students
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {activeStudents}
            </p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
            <UserCheck size={24} />
          </div>
        </div>
      </article>

      <article className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-500">
              Inactive students
            </p>

            <p className="mt-2 text-3xl font-bold text-slate-900">
              {inactiveStudents}
            </p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-50 text-amber-700">
            <UserRound size={24} />
          </div>
        </div>
      </article>
    </section>
  );
}

export default StudentStats;