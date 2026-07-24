import {
  Users,
  UserCheck,
  UserX,
  CalendarDays,
} from "lucide-react";

type TeacherStatsProps = {
  totalTeachers: number;
  activeTeachers: number;
  inactiveTeachers: number;
  teachersOnLeave: number;
};

function TeacherStats({
  totalTeachers,
  activeTeachers,
  inactiveTeachers,
  teachersOnLeave,
}: TeacherStatsProps) {
  const stats = [
    {
      label: "Total Teachers",
      value: totalTeachers,
      icon: Users,
    },
    {
      label: "Active Teachers",
      value: activeTeachers,
      icon: UserCheck,
    },
    {
      label: "Inactive Teachers",
      value: inactiveTeachers,
      icon: UserX,
    },
    {
      label: "On Leave",
      value: teachersOnLeave,
      icon: CalendarDays,
    },
  ];

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon;

        return (
          <div
            key={stat.label}
            className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500">
                  {stat.label}
                </p>

                <p className="mt-2 text-3xl font-bold text-slate-900">
                  {stat.value}
                </p>
              </div>

              <div className="rounded-2xl bg-teal-50 p-3 text-teal-700">
                <Icon size={24} />
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}

export default TeacherStats;