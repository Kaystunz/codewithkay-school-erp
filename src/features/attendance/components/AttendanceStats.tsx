import {
  CheckCircle2,
  Clock3,
  UserMinus,
  UserRoundCheck,
} from "lucide-react";

type AttendanceStatsProps = {
  presentCount: number;
  absentCount: number;
  lateCount: number;
  excusedCount: number;
};

function AttendanceStats({
  presentCount,
  absentCount,
  lateCount,
  excusedCount,
}: AttendanceStatsProps) {
  const stats = [
    {
      label: "Present",
      value: presentCount,
      icon: UserRoundCheck,
    },
    {
      label: "Absent",
      value: absentCount,
      icon: UserMinus,
    },
    {
      label: "Late",
      value: lateCount,
      icon: Clock3,
    },
    {
      label: "Excused",
      value: excusedCount,
      icon: CheckCircle2,
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

export default AttendanceStats;