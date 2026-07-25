import {
  BookOpen,
  DoorOpen,
  Users,
  UserCheck,
} from "lucide-react";

type ClassStatsProps = {
  totalClasses: number;
  activeClasses: number;
  totalStudents: number;
  totalCapacity: number;
};

function ClassStats({
  totalClasses,
  activeClasses,
  totalStudents,
  totalCapacity,
}: ClassStatsProps) {
  const stats = [
    {
      label: "Total Classes",
      value: totalClasses,
      icon: BookOpen,
    },
    {
      label: "Active Classes",
      value: activeClasses,
      icon: UserCheck,
    },
    {
      label: "Students Assigned",
      value: totalStudents,
      icon: Users,
    },
    {
      label: "Total Capacity",
      value: totalCapacity,
      icon: DoorOpen,
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

export default ClassStats;