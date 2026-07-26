import {
  ClipboardList,
  CheckCircle2,
  FileClock,
  LockKeyhole,
} from "lucide-react";

type AssignmentStatsProps = {
  totalAssignments: number;
  publishedAssignments: number;
  draftAssignments: number;
  closedAssignments: number;
};

function AssignmentStats({
  totalAssignments,
  publishedAssignments,
  draftAssignments,
  closedAssignments,
}: AssignmentStatsProps) {
  const stats = [
    {
      label: "Total Assignments",
      value: totalAssignments,
      icon: ClipboardList,
    },
    {
      label: "Published",
      value: publishedAssignments,
      icon: CheckCircle2,
    },
    {
      label: "Drafts",
      value: draftAssignments,
      icon: FileClock,
    },
    {
      label: "Closed",
      value: closedAssignments,
      icon: LockKeyhole,
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

export default AssignmentStats;